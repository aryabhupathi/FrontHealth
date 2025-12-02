import { Button, styled, type SxProps } from "@mui/material";
type ThemeMode = "light" | "dark";
type ButtonType = "primary" | "secondary" | "delete";
export const getPatientStyles = (mode: "light" | "dark") => ({
  container: {
    backgroundColor: mode === "light" ? "#ecf1f9ff" : "#1e1e1eff",
    p: 3,
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center" as const,
    mb: 3,
    color: "primary.main",
    fontWeight: "bold",
  },
  tableHead: {
    backgroundColor: mode === "light" ? "#f1f3f4" : "#2d2d2d",
    "& th": {
      fontWeight: 600,
    },
  },
  paginationBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mt: 2,
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    mt: 3,
  },
  filterBox: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "stretch", sm: "center" },
    gap: 2,
    p: 2,
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    backgroundColor: mode === "light" ? "#f1f3f4" : "#2d2d2d",
  },
  modalBox: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
  },
  filterField: { minWidth: 180, flex: 1 },
  patientCard: {
    p: 2,
    mb: 1.5,
    borderRadius: 2,
    boxShadow: 1,
    "&:last-child": { mb: 0 },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
    "& > div": {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "0.875rem",
    },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    px: 1.5,
    py: 1,
    mb: 1,
    borderRadius: 1,
    bgcolor: "action.hover",
    boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
    border: "1px solid",
    borderColor: "divider",
  },
  cardActions: {
    display: "flex",
    gap: 0.5,
    flexShrink: 0,
  },
});
const colorMap: Record<ButtonType, Record<ThemeMode, string>> = {
  primary: {
    light: "#2e7d32",
    dark: "#2e7d32",
  },
  secondary: {
    light: "#be57f2",
    dark: "#be57f2",
  },
  delete: {
    light: "#d12929",
    dark: "#eb2020",
  },
};
export const TypedButton = styled(Button)<{ btntype?: ButtonType }>(
  ({ theme, btntype = "primary" }) => {
    const mode = theme.palette.mode as ThemeMode;
    const color = colorMap[btntype][mode];
    return {
      borderRadius: "8px",
      textTransform: "none",
      paddingLeft: "5px",
      paddingRight: "5px",
      fontWeight: 600,
      transition: "0.25s ease",
      border: `1px solid ${color}`,
      background: "transparent",
      color,
      "&:hover": {
        background: color,
        color: "#fff",
        borderColor: color,
        transform: "translateY(-2px)",
        boxShadow: theme.shadows[4],
      },
      "&:active": {
        transform: "scale(1)",
      },
    };
  }
);
export const sidebarDrawer = (
  open: boolean,
  drawerWidth: number,
  collapsedWidth: number
): SxProps => ({
  width: open ? drawerWidth : collapsedWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : collapsedWidth,
    boxSizing: "border-box",
    transition: "width 0.3s ease",
  },
});
export const sidebarHeader = (open: boolean): SxProps => ({
  borderBottom: 1,
  borderColor: "divider",
  px: 2,
  py: 1.5,
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "space-between" : "center",
});
export const sidebarMobileToggleBtn: SxProps = {
  position: "fixed",
  top: 16,
  left: 16,
  zIndex: 1400,
  bgcolor: "background.paper",
};
export const listItemButton = (open: boolean): SxProps => ({
  justifyContent: open ? "initial" : "center",
  px: open ? 2 : 1,
  "&.active": {
    bgcolor: "primary.main",
    color: "#fff",
    "& .MuiListItemIcon-root": { color: "#fff" },
  },
});
export const listItemIcon = (open: boolean): SxProps => ({
  minWidth: 0,
  mr: open ? 2 : 0,
  justifyContent: "center",
  color: "inherit",
});
export const logoutButton = (open: boolean): SxProps => ({
  justifyContent: "center",
  minWidth: 0,
  borderRadius: "12px",
  transition: "all 0.3s ease",
  width: open ? "100%" : "auto",
  color: "red",
  border: "1px solid red",
});
export const overlayBg: SxProps = {
  position: "fixed",
  inset: 0,
  bgcolor: "rgba(0,0,0,0.4)",
  zIndex: 1200,
};
export const cardHover = {
  position: "relative",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-6px) scale(1.02)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.18)",
  },
};
export const subtleGlow = {
  "&:hover::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background: "rgba(255,255,255,0.15)",
    animation: "pulse 1.3s infinite",
  },
};
