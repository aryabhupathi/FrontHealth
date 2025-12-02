import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { collapsedWidth, drawerWidth } from "../constants/constant";
export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleToggle = () => setOpen((prev) => !prev);
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <Sidebar open={open} onToggle={handleToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin-left 0.3s ease, width 0.3s ease",
          ...(isMobile
            ? {
                marginLeft: 0,
                width: "100%",
              }
            : {
                width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
              }),
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
