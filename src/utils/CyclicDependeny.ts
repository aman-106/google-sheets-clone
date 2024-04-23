// import { ICellId, ICellProps, IGrid } from "./CellProps";


// export function hasCyclicDependencies(grid: IGrid, startCellId: ICellId): boolean {
//   const visited = new Set<string>();
//   const stack: { cellId: ICellId; index: number }[] = [];

//   stack.push({ cellId: startCellId, index: 0 });

//   while (stack.length > 0) {
//     const { cellId, index } = stack[stack.length - 1];
//     const cell = grid[cellId.r][cellId.c] as ICellProps;

//     if (index === 0) {
//       if (!cell || !cell.formula || !cell.dependents) {
//         stack.pop();
//         continue;
//       }
//       if (visited.has(`${cellId.r}-${cellId.c}`)) {
//         return true; // Cycle found
//       }
//       visited.add(`${cellId.r}-${cellId.c}`);
//     }

//     if (cell.dependents && index < cell.dependents.length) {
//       const dependentCellId = cell.dependents[index];
//       stack[stack.length - 1].index++;
//       stack.push({ cellId: dependentCellId, index: 0 });
//     } else {
//       stack.pop();
//     }
//   }

//   return false; // No cycle found
// }


// // Function to check for cyclic dependencies using DFS
// // function hasCyclicDependencies(grid: IGrid, startCellId: ICellId, visited: Set<string>, stack: Set<string>): boolean {
// //     const cell = grid[startCellId.r][startCellId.c] as ICellProps;

// //     if (!cell || !cell.formula || !cell.dependents) {
// //       return false; // If cell doesn't have formula or dependents, no cycle possible
// //     }

// //     if (!visited.has(`${startCellId.r}-${startCellId.c}`)) {
// //       visited.add(`${startCellId.r}-${startCellId.c}`);
// //       stack.add(`${startCellId.r}-${startCellId.c}`);

// //       for (const dependent of cell.dependents) {
// //         const dependentCell = grid[dependent.r][dependent.c] as ICellProps;

// //         if (!dependentCell) continue; // Skip if dependent cell doesn't exist

// //         if (stack.has(`${dependent.r}-${dependent.c}`)) {
// //           return true; // Cycle found
// //         }

// //         if (!visited.has(`${dependent.r}-${dependent.c}`) && hasCyclicDependencies(grid, dependent, visited, stack)) {
// //           return true;
// //         }
// //       }
// //     }

// //     stack.delete(`${startCellId.r}-${startCellId.c}`);
// //     return false;
// //   }

// // Function to check for cyclic dependencies in the entire grid
// // function gridHasCyclicDependencies(grid: IGrid): boolean {
// //   const rs = grid.length;
// //   const cs = grid[0].length;
// //   const visited = new Set<string>();

// //   for (let i = 0; i < rs; i++) {
// //     for (let j = 0; j < cs; j++) {
// //       const cellId: ICellId = { r: i, c: j };
// //       if (
// //         !visited.has(`${i}-${j}`) &&
// //         hasCyclicDependencies(grid, cellId, visited, new Set<string>())
// //       ) {
// //         return true;
// //       }
// //     }
// //   }

// //   return false;
// // }

// // // Usage
// // const grid: IGrid = [
// //   [
// //     {
// //       editable: true,
// //       formula: "=A1",
// //       dependents: [{ r: 1, c: 0 }],
// //       value: { value: null, calculated: false },
// //     },
// //     null,
// //   ],
// //   [null, null],
// // ];
