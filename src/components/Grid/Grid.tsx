"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import { FormulaBuilder } from "../FormulaBuilder/FormulaBuilder";
import { useSelectedCellContext } from "../context/SelectedCellProvider";
import { useGridDataContext } from "../context/GridDataContext";
import { useUserInputContext } from "../context/UserInputContext";
import { getCellNodeValue } from "@/utils/CellPosition";

interface CellIndex {
  x: number;
  y: number;
}

function GridVisualization() {
  const {cellInfo,setCellInfo} = useSelectedCellContext();
  const {data , setData} = useGridDataContext()
  const {setUserInput , inputContainerStyle , setInputContainerStyle } = useUserInputContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cellWidth] = useState<number>(80); // Adjust width for rectangular cells
  const [cellHeight] = useState<number>(40); // Adjust height for rectangular cells
  const [fontSize] = useState<number>(16);

  const N = data.length;
  const M = data[0].length;

  function getCellIndex(clickX: number, clickY: number): CellIndex | null {
    const cellX = Math.floor(clickX / cellWidth);
    const cellY = Math.floor(clickY / cellHeight);
    return cellY >= 0 && cellY < N && cellX >= 0 && cellX < M
      ? { x: cellX, y: cellY }
      : null;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = M * cellWidth;
    canvas.height = N * cellHeight;

    function drawGrid() {
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
          const value = data[y][x];
          const cellX = x * cellWidth;
          const cellY = y * cellHeight;

          ctx.fillStyle = "#fff";
          ctx.fillRect(cellX, cellY, cellWidth, cellHeight);

          ctx.strokeStyle = "#ccc";
          ctx.strokeRect(cellX, cellY, cellWidth, cellHeight);

          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            getCellNodeValue(value,false),
            cellX + cellWidth / 2,
            cellY + cellHeight / 2
          );
        }
      }
    }

    drawGrid();

    function handleCanvasClick(event: React.MouseEvent<HTMLCanvasElement>) {
      const clickX = event.offsetX;
      const clickY = event.offsetY;
      const clickedCell = getCellIndex(clickX, clickY);
  
      if (clickedCell) {
          const cellX = clickedCell.x * cellWidth;
          const cellY = clickedCell.y * cellHeight;
          const canvasRect = canvasRef.current?.getBoundingClientRect();
          const offsetX = canvasRect?.left || 0;
          const offsetY = canvasRect?.top || 0;
          
          // setCellInfo(`Clicked Cell: (${clickedCell.x}, ${clickedCell.y})`);
          setCellInfo({x:clickedCell.x,y:clickedCell.y});
          setUserInput(getCellNodeValue(data[clickedCell.y][clickedCell.x],true));
          setInputContainerStyle({
              ...inputContainerStyle,
              left: `${cellX + offsetX + 5}px`,
              top: `${cellY + offsetY + 5}px`,
              display: "block",
          });
      } else {
          setCellInfo({x:-1,y:-1});
          setInputContainerStyle({ ...inputContainerStyle, display: "none" });
      }
  }
  

    canvas.addEventListener("dblclick", handleCanvasClick);

    return () => {
      canvas.removeEventListener("dblclick", handleCanvasClick);
    };
  }, [cellHeight, cellWidth, data, fontSize, inputContainerStyle]);



  return (
    <div className={styles["grid_container"]}>
      <h1>2D Grid Data Visualization (Editable)</h1>
      {/* <div id="cellInfo">{`${cellInfo.x} ${cellInfo.y}`}</div> */}
      <canvas className={styles["grid_canvas"]} ref={canvasRef}></canvas>
        
      <div className={styles["cellValueInputContainer"]} style={inputContainerStyle}>
      {/* <input
        className={styles["cellValueInput"]}
        type="text"
        id="cellValueInput"
        placeholder="New Value"
        value={cellValue}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button id="updateCellValue" onClick={handleUpdate}>
        Update
      </button> */}
      <FormulaBuilder cls={styles['cell-value-input-container']} />
      </div>
    </div>
  );
}

export default GridVisualization;
