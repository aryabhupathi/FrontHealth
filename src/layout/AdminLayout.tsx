import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { collapsedWidth, drawerWidth } from "../constants/constant";
export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleToggle = () => setOpen((prev) => !prev);
  const mainWidth = isMobile
    ? "100%"
    : `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`;
  return (
    <Box
      sx={(t) => ({
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: t.palette.layout.authBg,
      })}
    >
      <CssBaseline />
      <Sidebar open={open} onToggle={handleToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: mainWidth,
          transition: "width 0.25s ease-out",
          p: { xs: 2, md: 3 },
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
