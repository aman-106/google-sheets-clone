import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import { Box, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Theme, styled } from "@mui/material/styles";
import {SheetsNameField} from '@/components/SheetsNameField/SheetsNameField'

const actions = [
  {
    label: "File",
    key: "file",
  },
  {
    label: "Edit",
    key: "edit",
  },
  {
    label: "View",
    key: "view",
  },
];


export default function MyAppBar() {
  return (
    <AppBar position="sticky" color="secondary" elevation={4}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Open main navigation"
        >
          <BorderAllIcon
            sx={{
              fontSize: "40px",
            }}
          />
        </IconButton>

        <Stack
          direction="column"
          spacing={2}
          alignItems="start"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          <Stack direction="row" spacing={2} alignItems="start">
            <SheetsNameField />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="start"
            sx={{ marginTop: "0 !important" }}
          >
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> */}
            {actions.map((action) => (
              <Button
                key={action.key}
                // onClick={handleCloseNavMenu}
                // sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {action.label}
              </Button>
            ))}
            {/* </Box> */}
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton aria-haspopup="true" aria-label="4 unread notifications">
            <Badge badgeContent={4} color="error">
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="Toggle settings drawer">
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton
            href="https://www.google.com/account/about/"
            aria-label="Google Account"
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
