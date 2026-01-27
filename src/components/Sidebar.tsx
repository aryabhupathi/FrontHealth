import {
  Box,
  List,
  ListItem,
  Divider,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
  ListItemText,
  IconButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";
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
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import {
  DeleteButton,
  MobileToggleButton,
  Overlay,
  SidebarDrawer,
  SidebarHeader,
  SidebarListButton,
  SidebarListIcon,
} from "./styledcomp";
import { FaAngleDoubleLeft, FaHome } from "react-icons/fa";
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
  return (
    <>
      {isMobile && !open && (
        <MobileToggleButton onClick={onToggle}>
          <FaAlignLeft />
        </MobileToggleButton>
      )}
      <SidebarDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={onToggle}
        ModalProps={{ keepMounted: true }}
      >
        <SidebarHeader open={open}>
          {open ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={5}
            >
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
                  <MobileToggleButton size="small" onClick={toggleTheme}>
                    {mode === "dark" ? <FaSun /> : <FaMoon />}
                  </MobileToggleButton>
                </Tooltip>
                <IconButton size="small" onClick={onToggle}>
                  <FaAngleDoubleLeft />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <IconButton onClick={onToggle}>
              <PiUserCirclePlusDuotone size={32} />
            </IconButton>
          )}
        </SidebarHeader>
        <List disablePadding sx={{ mt: 1, px: open ? 1 : 0.5 }}>
          {links.map((link, i) => (
            <ListItem key={i} disablePadding>
              <SidebarListButton
                open={open}
                component={NavLink}
                to={link.path}
                onClick={() => isMobile && onToggle()}
              >
                <SidebarListIcon open={open}>{link.icon}</SidebarListIcon>
                {open && <ListItemText primary={link.label} />}
              </SidebarListButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          <DeleteButton onClick={logout}>
            <FaDeleteLeft size={20} />
            {open && <span style={{ paddingLeft: 20 }}>LOGOUT</span>}
          </DeleteButton>
        </Box>
      </SidebarDrawer>
      {isMobile && open && <Overlay onClick={onToggle} />}
    </>
  );
}
