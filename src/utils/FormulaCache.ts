import { ICellIdType } from "./CellProps";

export const formulaCache: Map<string, { formula: string , dependentCells: ICellIdType }> = new Map();


