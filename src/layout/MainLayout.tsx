import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navItems = ["Home", "About", "Services"];
  const getActivePage = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/about") return "About";
    if (location.pathname === "/services") return "Services";
    return "";
  };
  const active = getActivePage();
  const handleNavClick = (item: string) => {
    setDrawerOpen(false);
    navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", cursor: "pointer", color: "#fff" }}
            onClick={() => navigate("/")}
          >
            <span style={{ color: "#fff" }}>HOS</span>
            <span style={{ color: "#ffeb3b" }}>PITAL</span>
          </Typography>
          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    borderBottom:
                      active === item
                        ? "2px solid #fff"
                        : "2px solid transparent",
                    "&:hover": { borderBottom: "2px solid #ffeb3b" },
                    transition: "border-color 0.3s",
                  }}
                >
                  {item}
                </Button>
              ))}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/login")}
                sx={{ borderRadius: "50px", fontWeight: 600 }}
              >
                Login
              </Button>
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <Menu />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 250, p: 2 },
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          <span style={{ color: theme.palette.primary.main }}>HOS</span>PITAL
        </Typography>
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item}
              onClick={() => handleNavClick(item)}
              selected={active === item}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              navigate("/login");
            }}
          >
            <ListItemText primary="Login" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        {children}
      </Box>
    </Box>
  );
}
