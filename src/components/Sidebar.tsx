import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FaMoon,
  FaSun,
  FaUser,
  FaUserDoctor,
  FaDeleteLeft,
  FaAlignLeft,
} from "react-icons/fa6";
import { BsFillHospitalFill } from "react-icons/bs";
import { PiUserCirclePlusDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import { collapsedWidth, drawerWidth } from "../constants/constant";
import { FaAngleDoubleLeft, FaHome } from "react-icons/fa";
import { DeleteButton } from "./styledcomp";
export default function Sidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const basePath =
    user?.role === "Admin"
      ? "/admin"
      : user?.role === "Doctor"
      ? "/doctor"
      : "/patient";
  const links =
    user?.role === "Admin"
      ? [
          {
            label: "Dashboard",
            icon: <FaHome />,
            path: `${basePath}/dashboard`,
          },
          {
            label: "Patients",
            icon: <BsFillHospitalFill />,
            path: `${basePath}/patients`,
          },
          {
            label: "Doctors",
            icon: <FaUserDoctor />,
            path: `${basePath}/doctors`,
          },
          {
            label: "Appointments",
            icon: <BsFillHospitalFill />,
            path: `${basePath}/appointments`,
          },
          {
            label: "Prescriptions",
            icon: <BsFillHospitalFill />,
            path: `${basePath}/prescriptions`,
          },
          {
            label: "Tests",
            icon: <BsFillHospitalFill />,
            path: `${basePath}/tests`,
          },
        ]
      : user?.role === "Doctor"
      ? [
          {
            label: "Dashboard",
            icon: <FaHome />,
            path: `${basePath}/dashboard`,
          },
          {
            label: "Patients",
            icon: <FaUser />,
            path: `${basePath}/patients`,
          },
          {
            label: "Appointments",
            icon: <BsFillHospitalFill />,
            path: `${basePath}/appointments`,
          },
        ]
      : [
          {
            label: "Dashboard",
            icon: <FaHome />,
            path: `${basePath}/dashboard`,
          },
          {
            label: "Doctors",
            icon: <FaUserDoctor />,
            path: `${basePath}/doctors`,
          },
          {
            label: "Appointments",
            icon: <BsFillHospitalFill />,
            path: `${basePath}/appointments`,
          },
          {
            label: "Tests",
            icon: <BsFillHospitalFill />,
            path: `${basePath}/tests`,
          },
        ];
  const drawerPaperSx = {
    width: open ? drawerWidth : collapsedWidth,
    border: "none",
    overflowX: "hidden",
    transition: "width 0.25s ease-out",
    background: theme.palette.glass.soft,
    borderRight: `1px solid ${theme.palette.glass.cardBorder}`,
    boxShadow: theme.palette.glass.cardShadow,
    backdropFilter: "blur(22px)",
    color: theme.palette.text.primary,
  } as const;
  const headerSx = {
    display: "flex",
    alignItems: "center",
    justifyContent: open ? "space-between" : "center",
    px: open ? 2 : 1,
    py: 1.5,
    borderBottom: `1px solid ${theme.palette.glass.cardBorder}`,
    minHeight: 64,
  } as const;
  const listItemButtonSx = (isOpen: boolean) =>
    ({
      px: isOpen ? 2 : 1,
      py: 1,
      borderRadius: 999,
      mx: isOpen ? 1 : 0.5,
      my: 0.5,
      minHeight: 44,
      justifyContent: isOpen ? "flex-start" : "center",
      "&.active": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(129,140,248,0.22)"
            : "rgba(191,219,254,0.9)",
        color:
          theme.palette.mode === "dark"
            ? theme.palette.primary.light
            : theme.palette.primary.main,
      },
      "&:hover": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(148,163,184,0.18)"
            : "rgba(226,232,240,0.9)",
      },
    } as const);
  const listItemIconSx = (isOpen: boolean) =>
    ({
      minWidth: 0,
      mr: isOpen ? 1.5 : 0,
      justifyContent: "center",
      color: theme.palette.text.secondary,
    } as const);
  const overlayBgSx = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15,23,42,0.6)",
    backdropFilter: "blur(4px)",
    zIndex: theme.zIndex.drawer - 1,
  } as const;
  return (
    <>
      {isMobile && !open && (
        <IconButton
          onClick={onToggle}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            borderRadius: 999,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(15,23,42,0.9)"
                : "rgba(248,250,252,0.95)",
            boxShadow: "0 10px 30px rgba(15,23,42,0.55)",
          }}
        >
          <FaAlignLeft />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={onToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": drawerPaperSx,
        }}
      >
        <Box sx={headerSx}>
          {open ? (
            <>
              <Box display="flex" alignItems="center" gap={1}>
                <FaUser size={20} />
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                  {user?.name || "User"}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Tooltip
                  title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
                >
                  <IconButton
                    onClick={toggleTheme}
                    size="small"
                    sx={{
                      borderRadius: 999,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(248,250,252,0.95)",
                    }}
                  >
                    {mode === "dark" ? <FaSun /> : <FaMoon />}
                  </IconButton>
                </Tooltip>
                <IconButton onClick={onToggle} size="small">
                  <FaAngleDoubleLeft />
                </IconButton>
              </Box>
            </>
          ) : (
            <IconButton onClick={onToggle} aria-label="Expand sidebar">
              <PiUserCirclePlusDuotone size={32} />
            </IconButton>
          )}
        </Box>
        <List sx={{ mt: 1, px: open ? 1 : 0.5 }}>
          {links.map((link, i) => (
            <ListItem key={i} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={NavLink}
                to={link.path}
                onClick={() => isMobile && onToggle()}
                sx={listItemButtonSx(open)}
              >
                <ListItemIcon sx={listItemIconSx(open)}>
                  {link.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      noWrap: true,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mt: "auto" }} />
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          <DeleteButton onClick={logout} aria-label="Logout">
            {" "}
            <FaDeleteLeft size={20} />
            {open && <span style={{ paddingLeft: "20px" }}>LOGOUT</span>}
          </DeleteButton>
        </Box>
      </Drawer>
      {isMobile && open && <Box onClick={onToggle} sx={overlayBgSx} />}
    </>
  );
}
