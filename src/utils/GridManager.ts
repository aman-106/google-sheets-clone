import { isNumber } from "@mui/x-data-grid/internals";
import { getCellPosition } from "./CellPosition";
import { IGrid, ICellId, ICell, ICellValue, ICellProps } from "./CellProps";

class GridManager {
  private static instance: GridManager;
  private dependencyGraph: Map<string, Set<string>>;

  private constructor() {
    this.dependencyGraph = new Map<string, Set<string>>();
  }

  static getInstance(): GridManager {
    if (!GridManager.instance) {
      GridManager.instance = new GridManager();
    }
    return GridManager.instance;
  }

  // Build dependency graph from the grid
  buildDependencyGraph(grid: IGrid): void {
    this.dependencyGraph.clear();

    // Iterate through the grid to build dependencies
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        // skip first row , first column
        if (rowIndex == 0 || colIndex == 0 || !cell) {
          // skip
        } else {
          const cellId = this.parseCellKey(rowIndex, colIndex);
          if (cell.formula && cell.dependents) {
            const dependencies = cell.dependents.map((dep) => {
              if (!isNumber(dep)) {
                return this.parseCellKey(dep.r, dep.c);
              }
            });
            this.dependencyGraph.set(cellId, new Set(dependencies));
          } else {
            this.dependencyGraph.set(cellId, new Set());
          }
        }
      });
    });
  }

  // Parse cell key from row and column indices
  private parseCellKey(row: number, col: number): string {
    return `${row}-${col}`;
  }

  // Topological sorting of cells based on dependencies and dependents
  private topologicalSort(startCellId: string): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    // Function to perform DFS starting from a cell ID
    const dfs = (cellId: string) => {
      if (visited.has(cellId)) return;
      visited.add(cellId);

      // Get both dependents and dependencies of the current cell
      const dependents = Array.from(this.dependencyGraph.get(cellId) || []);
      const dependencies = Array.from(this.getDependenciesOf(cellId));

      // Explore dependencies first
      for (const neighbor of dependents) {
        dfs(neighbor);
      }

      // Explore dependents next
      for (const neighbor of dependencies) {
        dfs(neighbor);
      }

      result.unshift(cellId); // Add to the result in reverse order
    };

    dfs(startCellId);

    return result;
  }

  // Helper function to get all cells that directly depend on the given cell
  private getDependenciesOf(cellId: string): Set<string> {
    const dependencies = new Set<string>();
    for (const [key, dependents] of this.dependencyGraph) {
      if (dependents.has(cellId)) {
        dependencies.add(key);
      }
    }
    return dependencies;
  }

  // Check for cyclic dependencies using DFS
  hasCyclicDependencies(): boolean {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = (cellId: string): boolean => {
      if (!visited.has(cellId)) {
        visited.add(cellId);
        recursionStack.add(cellId);

        for (const neighbor of this.dependencyGraph.get(cellId) || []) {
          if (!visited.has(neighbor) && dfs(neighbor)) {
            return true;
          } else if (recursionStack.has(neighbor)) {
            return true;
          }
        }
      }

      recursionStack.delete(cellId);
      return false;
    };

    for (const cellId of this.dependencyGraph.keys()) {
      if (dfs(cellId)) {
        return true;
      }
    }

    return false;
  }

  // Compute cell value based on its formula and dependencies
  getValueFromCellReference(cell: ICell, grid: IGrid): number | null {
    if (!cell || !("value" in cell) || !cell.value) {
      return null; // Invalid or empty cell
    }
    const { formula } = cell;
    const { value, isCalculated } = cell.value;

    if (!formula && typeof value === "number") {
      return value; // Return the value if it's already a number
    }

    // if (typeof value === "string" && /^\d+$/.test(value)) {
    //   return parseInt(value); // Parse and return the value if it's a string containing only digits
    // }

    // if (isCalculated) {
    //   return value as number; // Return the calculated value if available
    // }

    if (!formula) {
      return null; // No formula to calculate
    }

    // Calculate the value based on the formula and dependencies
    const [formulaName, argsList] = this.parseFormula(formula);
    const argsArray = argsList.map((arg) => arg.trim());

    // Calculate the value for the cell based on its formula, arguments, and dependencies
    const computedValue = this.computeFormulaValue(
      cell,
      grid,
      formulaName,
      argsArray
    );
    if (computedValue !== null) {
      const currentCellRef = Object.assign({}, cell);
      // const changedCellId = this.parseCellKey(cell.id.r, cell.id.c);
      currentCellRef.value = {
        value: computedValue,
        isCalculated: true,
      };
      currentCellRef.dependents = cell.dependents ? [...cell.dependents] : [];
      grid[cell.id.r][cell.id.c] = currentCellRef;
    }
    return computedValue;
  }

  parseFormula(formula: string): [string, string[]] {
    const parts = formula.split("(");
    const formulaName = parts[0].slice(1); // ignore eq char
    const argsList = parts[1].replace(")", "").split(",");
    return [formulaName, argsList];
  }

  getCellNode(
    id: ICellId,
    value: number | null,
    isCalculated: boolean,
    editable: boolean,
    formula?: string | null,
    dependents: ICellId[] = []
  ): ICellProps {
    const cellValue: ICellValue = { value, isCalculated };
    const newcell = { id, editable, formula, dependents, value: cellValue };
    if (formula) {
      const [formulaName, argsList] = this.parseFormula(formula);
      for (const arg of argsList) {
        if (/^\d+$/.test(arg)) {
          newcell.dependents.push(parseInt(arg, 10));
        } else {
          const [colIndex, rowIndex] = getCellPosition(arg);
          newcell.dependents.push({ r: rowIndex, c: colIndex });
        }
      }
    }

    return newcell;
  }

  computeFormulaValue(
    cell: ICell,
    grid: IGrid,
    formulaName: string,
    argsArray: string[]
  ): number | null {
    const parsedArgs: (number | null)[] = [];

    for (const arg of argsArray) {
      if (/^\d+$/.test(arg)) {
        parsedArgs.push(parseInt(arg, 10)); // Push the parsed number
      } else {
        const [colIndex, rowIndex] = getCellPosition(arg);
        const dependentCell = grid[rowIndex][colIndex];
        const cellValue = this.getValueFromCellReference(dependentCell, grid);
        parsedArgs.push(cellValue);
      }
    }

    let result: number | null = null;

    switch (formulaName.toLowerCase()) {
      case "sum":
        result = parsedArgs.reduce(
          (acc, val) => (acc !== null && val !== null ? acc + val : null),
          0
        );
        break;
      case "subtract":
        result = parsedArgs.reduce((acc, val) =>
          acc !== null && val !== null ? acc - val : null
        );
        break;
      case "multiply":
        result = parsedArgs.reduce(
          (acc, val) => (acc !== null && val !== null ? acc * val : null),
          1
        );
        break;
      case "divide":
        result = parsedArgs.reduce((acc, val) =>
          acc !== null && val !== null && val !== 0 ? acc / val : null
        );
        break;
      // Add more cases for other functions as needed
      default:
        console.error(`Unsupported formula: ${formulaName}`);
        break;
    }

    return result;
  }

  // Handle cell value change and update dependencies
  handleCellValueChange(grid: IGrid, changedCell: ICellProps): void {
    if (!changedCell.formula || !changedCell.dependents) {
      if (!Number(changedCell.value.value)) {
        return; // No formula or dependencies to update and value
      }
      //   return;
    }

    // Re-compute values for affected cells
    const changedCellId = this.parseCellKey(changedCell.id.r, changedCell.id.c);
    const topoSortOrder = this.topologicalSort(changedCellId);
    const visitedCells = new Set<string>();

    for (const cellId of topoSortOrder) {
      if (!visitedCells.has(cellId)) {
        visitedCells.add(cellId);

        const [row, col] = cellId.split("-").map(Number);
        const currentCell = grid[row][col];

        if (currentCell.formula && currentCell.dependents) {
          const computedValue = this.getValueFromCellReference(
            currentCell,
            grid
          );
          //   if (computedValue !== null) {
          //     const currentCellRef = Object.assign({},currentCell);
          //     currentCellRef.value={
          //         value:computedValue,
          //         isCalculated:true,
          //     };
          //     currentCellRef.dependents = [...currentCell.dependents];
          //     grid[row][col] = currentCellRef;
          //   }
        }
      }
    }
  }

  handleCellChangeManager(
    grid: IGrid,
    changedCell: ICellProps,
    rebuildGrid: boolean = true
  ): boolean {
    rebuildGrid && gridManager.buildDependencyGraph(grid);
    if (rebuildGrid && gridManager.hasCyclicDependencies()) {
      console.error("Cyclic dependencies detected!");
      return false;
    }
    console.log("handleCellChangeManager", Date.now().toString());
    gridManager.handleCellValueChange(grid, changedCell);
    return true;
  }
}

export const gridManager = GridManager.getInstance();
