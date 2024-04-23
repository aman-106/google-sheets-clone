// import { ICell, ICellValue, IGrid, ICellId } from '@/utils/CellProps'; // Import your types
// import { columnNameToIndex, getCellPosition } from './CellPosition';
// import { formulaCache } from './FormulaCache';


// export function getValueFromCellReference(cell: ICell, grid: IGrid): number | null {

//     if (!cell || !('value' in cell) || !cell.value) {
//         return null; // Invalid or empty cell
//     }
//     const {formula} = cell;
//     const { value, isCalculated } = cell.value;

//     if (typeof value === 'number') {
//         return value; // Return the value if it's already a number
//     }

//     if (typeof value === 'string' && /^\d+$/.test(value)) {
//         return parseInt(value); // Parse and return the value if it's a string containing only digits
//     }

//     if (isCalculated) {
//         return value as number; // Return the calculated value if available
//     }

//     if (!formula) {
//         return null; // No formula to calculate
//     }

//     // Calculate the value based on the formula and dependencies
//     const [formulaName, argsList] = parseFormula(formula);
//     const argsArray = argsList.map(arg => arg.trim());

//     // Calculate the value for the cell based on its formula, arguments, and dependencies
//     const computedValue = computeFormulaValue(cell, grid, formulaName, argsArray, rowStartIndex, columnStartIndex);
//     cell.value.value = computedValue; // Update cell's calculated value
//     cell.value.isCalculated = true; // Mark cell as calculated
//     return computedValue;
// }

// export function parseFormula(formula: string): [string, string[]] {
//     const parts = formula.split('(');
//     const formulaName = parts[0].slice(1); // ignore eq char
//     const argsList = parts[1].replace(')', '').split(',');
//     return [formulaName, argsList];
// }


// function computeFormulaValue(cell: ICell, grid: IGrid, formulaName: string, argsArray: string[]): number | null {
//     const parsedArgs: (number | null)[] = [];

//     for (const arg of argsArray) {
//         if (/^\d+$/.test(arg)) {
//             parsedArgs.push(parseInt(arg)); // Push the parsed number
//         } else {
//             const [colIndex, rowIndex] = getCellPosition(arg);
//             const dependentCell = grid[rowIndex][colIndex];
//             const cellValue = getValueFromCellReference(dependentCell, grid);
//             parsedArgs.push(cellValue);
//         }
//     }

//     let result: number | null = null;

//     switch (formulaName.toLowerCase()) {
//         case 'sum':
//             result = parsedArgs.reduce((acc, val) => (acc !== null && val !== null) ? acc + val : null, 0);
//             break;
//         case 'subtract':
//             result = parsedArgs.reduce((acc, val) => (acc !== null && val !== null) ? acc - val : null);
//             break;
//         case 'multiply':
//             result = parsedArgs.reduce((acc, val) => (acc !== null && val !== null) ? acc * val : null, 1);
//             break;
//         case 'divide':
//             result = parsedArgs.reduce((acc, val) => (acc !== null && val !== null && val !== 0) ? acc / val : null);
//             break;
//         // Add more cases for other functions as needed
//         default:
//             console.error(`Unsupported formula: ${formulaName}`);
//             break;
//     }

//     return result;
// }




// // Example usage:
// const grid: IGrid = [
//     [
//         { value: { value: 5, isCalculated: true }, editable: false },
//         { value: { value: 10, isCalculated: true }, editable: false },
//         { formula: 'SUM(A1, B1)', value: { value: null, isCalculated: false }, editable: false }
//         { formula: 'SUM(C1, B1)', value: { value: null, isCalculated: false }, editable: false }
//     ]
// ];

// const rowStartIndex = 1;
// const columnStartIndex = "A";
// const cellA = grid[0][2]; // Cell with formula 'SUM(A1, B1)'
// const cellC = grid[0][3]

// let say cellB grid[0][1] is changed to 11 
// and then 
// cellA should be recomputed and also cellC 

// write a algorithum to detect the change for which re compurting is needed ?


// export const computedValue =  () => getValueFromCellReference(cell, grid, rowStartIndex, columnStartIndex);
// // console.log("Computed Value:", computedValue()); // Expected output: 15
