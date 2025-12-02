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
import { FaAngleDoubleLeft, FaHome } from "react-icons/fa";
import { collapsedWidth, drawerWidth } from "../constants/constant";
import {
  sidebarDrawer,
  sidebarHeader,
  sidebarMobileToggleBtn,
  listItemButton,
  listItemIcon,
  logoutButton,
  overlayBg,
  TypedButton,
} from "../themes/theme";
import Mobile from "./Mobile";
export default function Sidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeContext();
    const isMobile = Mobile();

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
        ]
      : user?.role === "Doctor"
      ? [
          {
            label: "Dashboard",
            icon: <FaHome />,
            path: `${basePath}/dashboard`,
          },
          { label: "Patients", icon: <FaUser />, path: `${basePath}/patients` },
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
        ];
  return (
    <>
      {isMobile && !open && (
        <IconButton onClick={onToggle} sx={sidebarMobileToggleBtn}>
          <FaAlignLeft />
        </IconButton>
      )}
      <Drawer
  variant={isMobile ? "temporary" : "permanent"}
  open={open}
  onClose={onToggle}
  sx={sidebarDrawer(open, drawerWidth, collapsedWidth)}
>
  <Box sx={sidebarHeader(open)}>
      
          {open ? (
            <>
              <Box display="flex" alignItems="center" gap={1}>
                <FaUser size={20} />
                <Typography variant="subtitle1" fontWeight= 'bold'>
                  {user?.name || "User"}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Tooltip
                  title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
                >
                  <IconButton onClick={toggleTheme} size="small">
                    {mode === "dark" ? <FaSun /> : <FaMoon />}
                  </IconButton>
                </Tooltip>
                <IconButton onClick={onToggle} size="small">
                  <FaAngleDoubleLeft />
                </IconButton>
              </Box>
            </>
          ) : (
            <IconButton onClick={onToggle}>
              <PiUserCirclePlusDuotone />
            </IconButton>
          )}
        </Box>
        <List sx={{ mt: 1 }}>
          {links.map((link, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton
                component={NavLink}
                to={link.path}
                onClick={() => isMobile && onToggle()}
                sx={listItemButton(open)}
              >
                <ListItemIcon sx={listItemIcon(open)}>{link.icon}</ListItemIcon>
                {open && <ListItemText primary={link.label} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mt: "auto" }} />
        <Box sx={{ p: 2 }}>
          <TypedButton btntype="delete"
            onClick={logout}
            sx={logoutButton(open)}
          >
            <FaDeleteLeft />
            {open && <span style={{ marginLeft: 8 }}>Logout</span>}
          </TypedButton>
        </Box>
      </Drawer>
      {isMobile && open && <Box onClick={onToggle} sx={overlayBg} />}
    </>
  );
}
