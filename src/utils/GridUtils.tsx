"use client";

import { columnGen } from "@/utils/ColsGen";
import { rowsGen } from "@/utils/RowsGen";
import { ICell, ICellId, ICellProps, ICellValue, IGrid, Value } from "@/utils/CellProps";
import { startRowAndColumnInfoManager } from "./StartRowAndColumnInfoManager";

export function initialData(rows: number, columns: number) {
  let data: IGrid = new Array();
  for (let index = 0; index < rows; index++) {
    data[index] = new Array();
    for (let j = 0; j < columns; j++) {
      if (index == 0 && j == 0) {
        startRowAndColumnInfoManager.startRowAndColumnInfo = {
          r:rowsGen.next().value,
          c: columnGen.next().value,
        }
        // console.log(startRowAndColumnInfo);
        // continue;
      } else if (index == 0) {
      
        data[index][j] = columnGen.next().value;
      } else if (j == 0) {
        data[index][j] = rowsGen.next().value;
      }
    }
  }
  return data;
}




