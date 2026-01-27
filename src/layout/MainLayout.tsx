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
    if (location.pathname.startsWith("/about")) return "About";
    if (location.pathname.startsWith("/services")) return "Services";
    return "";
  };
  const active = getActivePage();
  const handleNavClick = (item: string) => {
    setDrawerOpen(false);
    navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
  };
  const Brand = (
    <Typography
      variant="h5"
      onClick={() => navigate("/")}
      sx={{
        fontWeight: 800,
        cursor: "pointer",
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <Box component="span" sx={{ color: theme.palette.primary.light }}>
        HOS
      </Box>
      <Box component="span" sx={{ color: theme.palette.secondary.main }}>
        PITAL
      </Box>
    </Typography>
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "auto",
        backgroundImage: theme.palette.layout.authBg,
      }}
    >
      <AppBar position="sticky" enableColorOnDark>
        <Toolbar
          sx={{
            minHeight: 72,
            px: { xs: 2, md: 4 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {Brand}
          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {navItems.map((item) => {
                const selected = active === item;
                return (
                  <Button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    color="inherit"
                    sx={{
                      position: "relative",
                      px: 1.5,
                      fontWeight: 500,
                      ...(selected && {
                        color: theme.palette.primary.light,
                      }),
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: "20%",
                        right: "20%",
                        bottom: 4,
                        height: 2,
                        borderRadius: 999,
                        background: selected
                          ? theme.palette.gradient.primary
                          : "transparent",
                        transition: "background 0.25s ease",
                      },
                      "&:hover::after": {
                        background: theme.palette.gradient.primary,
                      },
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/login")}
                sx={{
                  borderRadius: 999,
                  px: 3,
                  py: 0.75,
                }}
              >
                Login
              </Button>
              <IconButton onClick={toggleTheme}>
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={toggleTheme}>
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <IconButton onClick={() => setDrawerOpen(true)}>
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
          sx: {
            width: 260,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
        }}
      >
        <Box sx={{ mb: 2 }}>{Brand}</Box>
        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item}
              selected={active === item}
              onClick={() => handleNavClick(item)}
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
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
