export type Value = number | string;

export interface ICellValue {
  value: Value | null; // Actual cell value
  isCalculated: boolean; // Flag to indicate if value is calculated

}

export interface ICellId { r: number; c: number }

export type ICellIdType =  Array<number | ICellId>
    

export interface ICellProps {
  id: ICellId; // Cell coordinates (required)
  editable:boolean;
  formula?: string | null; // Formula for calculated values (optional)
  dependents?:ICellIdType; // Array of dependent cells (optional)
  value: ICellValue; // Cell value object with flags
}

export type ICell = ICellProps;

export type IGrid = ICell[][];
