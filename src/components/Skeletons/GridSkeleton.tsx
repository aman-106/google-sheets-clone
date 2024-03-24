import React from 'react';
import { Paper } from "@mui/material";
import './GridSkeleton.module.css'

export const GridSkeleton = () => (
  <Paper>
    <div style={{ height: '100%', width: '100%' }}>
      <div className="data-grid-skeleton">
        {/* Rows */}
        {[...Array(5)].fill(null).map((_, rowIndex) => (
          <div key={rowIndex} className="data-grid-row">
            {/* Columns */}
            {[...Array(10)].fill(null).map((_, colIndex) => (
              <div key={colIndex} className="data-grid-cell" />
            ))}
          </div>
        ))}
      </div>
    </div>
  </Paper>
);


