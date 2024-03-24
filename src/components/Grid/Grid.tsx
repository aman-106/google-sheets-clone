"use client";

import React, { useState, useCallback } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridToolbar,
  GridCellParams,
  MuiEvent,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";

import { IconButton, Paper } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";
import { useDataGridView } from "@/data/DataHooks";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
}));

function isKeyboardEvent(event: any): event is React.KeyboardEvent {
  return !!event.key;
}

const EditableGrid: React.FC = () => {
  const { data, addRow, addColumn, updateCellFormula, handleColumnChange } =
    useDataGridView(30, 30);

  const { rows, columns } = data;

  return (
    <Paper>
      <IconButton aria-label="add column" onClick={addColumn}>
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton aria-label="add row" onClick={addRow}>
        <ArrowForwardIcon />
      </IconButton>
      <div style={{ height: "100%", width: "100%" }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          columnBuffer={50}
          onCellEditStop={(params, event) => {
            if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
              return;
            }
            if (isKeyboardEvent(event) && !event.ctrlKey && !event.metaKey) {
              event.defaultMuiPrevented = true;
            }
            handleColumnChange(
              params.id as unknown as number,
              params.field,
              event?.target.value
            );
          }}
        />
      </div>
    </Paper>
  );
};

export default EditableGrid;
