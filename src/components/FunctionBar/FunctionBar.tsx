"use client";

import { IconButton, TextField, Toolbar, Typography } from "@mui/material";
import FunctionsIcon from "@mui/icons-material/Functions";
import { useState } from "react";
import { Theme, styled } from "@mui/material/styles";
import { FormulaBuilder } from "@/components/FormulaBuilder/FormulaBuilder";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  "&": {
    background: theme.palette.secondary.main,
    borderRadius: "2rem",
    margin: "0.2rem",
  },
}));

export function FunctionBar({ tracker = "" }) {
  return (
    <StyledToolbar>
      <Typography sx={{ minWidth: "2rem" }}>{tracker}</Typography>
      <IconButton edge="start" color="inherit" aria-label="Open Functions">
        <FunctionsIcon />
      </IconButton>
      <FormulaBuilder />
    </StyledToolbar>
  );
}
