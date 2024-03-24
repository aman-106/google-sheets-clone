import { useState, useCallback,useEffect } from "react";
import { rowsGen } from "@/data/RowsGen";
import { columnGen } from "@/data/ColsGen";

import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { ICellId, ICellProps } from "@/data/CellProps";

// rows = [
//     { id: 1, "A": 'Snow', "B": 'Jon', "C": 14 },
//     { id: 2, "A": 'Lannister', "B": 'Cersei', "C": 31 },
//   ];

// initaized with columns def {A , B , C}
// rows with empty data

interface GridData {
  columns: GridColDef[];
  rows: DataRowModel[];
}

interface DataRowModel {
  id: GridRowId;
  [key: string]: ICellProps | undefined;
}

function createRow() {
  const value = rowsGen.next().value as Number as GridRowId;
  const row: DataRowModel = {
    id: value,
  };
  return row;
}

const defaultId = { r: -1, c: -1 };
const cellValue = {
  value: null,
  isCalculated: false,
};
function createCell(cellProps: Partial<ICellProps>): ICellProps {
  const { id, formula, dependents, value } = cellProps;

  return {
    id: id || defaultId,
    formula,
    dependents,
    value: value || cellValue,
  };
}
function createColumn(columns: Array<GridColDef>) {
  const value = columnGen.next().value;
  columns.push({
    field: value,
    headerName: value,
    editable: true,
    type: "string",
  });
  return columns;
}

function createInitialGridView(
  rowCount: number,
  columnCount: number
): GridData {
  const rows: DataRowModel[] = [];

  for (let i = 0; i < rowCount; i += 1) {
    const row = createRow();
    rows.push(row);
  }

  const columns: GridColDef[] = [];
  columns.push({ field: "id", headerName: "id" });
  for (let j = 1; j <= columnCount; j += 1) {
    createColumn(columns);
  }

  return {
    rows,
    columns,
  };
}



export function useDataGridView(rowLength: number, columnLength: number) {
  const [data, setData] = useState<GridData>({ columns: [], rows: [] });

  useEffect(() => {
    const { rows, columns } = createInitialGridView(rowLength, columnLength);
    setData({
      rows,
      columns,
    });
  }, [rowLength, columnLength]);

  const addRow = useCallback(() => {
    setData((prevGrid) => {
      const newRow = createRow();
      return {
        columns: prevGrid.columns,
        rows: [...prevGrid.rows, newRow],
      };
    });
  }, []);

  const addColumn = useCallback(() => {
    setData((prevGrid) => {
      return {
        columns: createColumn([...prevGrid.columns]),
        rows: prevGrid.rows,
      };
    });
  }, []);

  const updateCellFormula = useCallback(
    (
      cellId: { r: number; c: number },
      formula: string,
      dependents: ICellId[],
      value: string
    ) => {
      setData((prevGrid) => {
        // const updatedGrid = Object.assign({},prevGrid);
        const { rows, columns } = prevGrid;
        const { r, c } = cellId;
        let updatedRows = [...rows];
        const cell = Object.assign({}, updatedRows[r][c]);
        if (cell && cell?.id) {
          cell.id = cellId;
          cell.formula = formula;
          if (cell.dependents) {
            cell.dependents = [...cell.dependents, ...dependents];
          } else {
            cell.dependents = dependents;
          }

          if (value) {
            cell.formula = null;
            cell.value = { value, isCalculated: false };
          }
        } else {
          // create a new cell
          const cell = createCell({ id: { r, c }, formula });

          if (cell.dependents) {
            cell.dependents = [...cell.dependents, ...dependents];
          } else {
            cell.dependents = dependents;
          }

          if (value) {
            cell.formula = null;
            cell.value = { value, isCalculated: false };
          }

          updatedRows[r][c] = cell;
        }

        return {
          rows: updatedRows,
          columns,
        };
      });
    },
    []
  );

  const handleColumnChange = async (id: number, field: string, value: any) => {
    const updatedRows = data.rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setData({
      rows: updatedRows,
      columns: data.columns,
    });
  };

  return {
    data,
    addRow,
    addColumn,
    updateCellFormula,
    handleColumnChange,
  };
}

function getDependents(grid: IGrid, cellId: { r: number; c: number }): ICell[] {
  // ... (Implement logic to find dependent cells based on formulas)
}

function calculateCellValue(
  grid: IGrid,
  cellId: { r: number; c: number }
): Value {
  // ... (Implement logic to calculate cell value based on formula and grid data)
}
