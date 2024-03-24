type Value = number | string;

interface ICellValue {
  value: Value | null; // Actual cell value
  isCalculated: boolean; // Flag to indicate if value is calculated
}

export interface ICellId { r: number; c: number }
    

export interface ICellProps {
  id: ICellId; // Cell coordinates (required)
  formula?: string | null; // Formula for calculated values (optional)
  dependents?: ICellId[]; // Array of dependent cells (optional)
  value: ICellValue; // Cell value object with flags
}

type IGrid = ICellProps[][];
