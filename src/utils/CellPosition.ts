import { ICell, ICellProps } from './CellProps'; 

import { startRowAndColumnInfoManager } from "./StartRowAndColumnInfoManager";

const cellCachePostion = new Map<string,number[]>();
const colCacheRes = new Map<string,number>;


const {r:rowStartIndex,c:columnStartIndex} = startRowAndColumnInfoManager.startRowAndColumnInfo;

export function getCellPosition(cellRef: string): number[] {
    const key = `${cellRef}-${rowStartIndex}-${columnStartIndex}`;
    if(cellCachePostion.get(key)){
        return cellCachePostion.get(key)
    }
    const colChar = cellRef.match(/[A-Z]+/)[0];
    const rowNumber = parseInt(cellRef.match(/\d+/)[0]);
    const colIndex = columnNameToIndex(colChar) - columnNameToIndex(columnStartIndex);
    const rowIndex = rowNumber - rowStartIndex;
    const post =  [colIndex, rowIndex];
    cellCachePostion.set(key,post);
    return post;
}

export function columnNameToIndex(columnName: string): number {
    if(colCacheRes.get(columnName)){
        return colCacheRes.get(columnName);
    }
    let index = 0;
    const characters = columnName.toUpperCase().split('').reverse();

    for (let i = 0; i < characters.length; i++) {
        const charCode = characters[i].charCodeAt(0) - 65 + 1; // Convert 'A' to 1, 'B' to 2, ...
        index += charCode * Math.pow(26, i);
    }

    const res =  index - 1; // Subtract 1 to make it zero-based index

    colCacheRes.set(columnName,res);
    return res;
}

export function getCellNodeValue(cell: ICell,displayFormula:boolean=false): string {
    if (!cell) return "";
  
    if (typeof cell === "number") {
      return cell.toString();
    } else if (typeof cell === "string") {
      return cell;
    } else if(cell.formula && displayFormula){
      return cell.formula;
    }
    else {
      // cellProps
      return cell.value.value != null ? String(cell.value.value) : "";
    }
  }
  