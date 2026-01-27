import {
  styled,
  Button,
  Box,
  Typography,
  Paper,
  TableHead,
  Card,
  CardContent,
  Autocomplete,
  CardHeader,
  TextField,
  Container,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Drawer,
} from "@mui/material";
export const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
  textTransform: "none",
  borderRadius: 999,
}));
export const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  borderRadius: 999,
}));
export const UpdateButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  borderRadius: 999,
}));
export const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textTransform: "none",
  borderRadius: 999,
}));
export const DefaultButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: 2,
}));
export const PatientContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#ecf1f9ff" : "#1e1e1eff",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
}));
export const PageTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
  fontWeight: 700,
}));
export const FilterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.glass.soft,
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  "& > *": {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  [theme.breakpoints.up("md")]: {
    flexWrap: "nowrap",
    alignItems: "center",
    gap: theme.spacing(1),
    "& > *": {
      width: "auto",
    },
  },
}));
export const FilterAutocomplete = styled(
  Autocomplete<string, false, false, false>,
)(({ theme }) => ({
  width: "100%",
  flex: "1 1 100%",
  padding: 2,
  "& .MuiOutlinedInput-root": {
    background: theme.palette.background.paper,
    height: 40,
  },
}));
export const PatientTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#f1f3f4" : "#2d2d2d",
  "& th": {
    fontWeight: 600,
    paddingTop: 8,
    paddingBottom: 8,
  },
}));
export const PatientCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  "&:last-child": {
    marginBottom: 0,
  },
}));
export const CardHeaders = styled(CardHeader)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 1.5),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  border: `1px solid ${theme.palette.divider}`,
  minWidth: 0,
}));
export const CardTitle = styled(Typography)(() => ({
  flex: 1,
  minWidth: 0,
  fontWeight: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));
export const CardHeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 1.5),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  border: `1px solid ${theme.palette.divider}`,
  minWidth: 0,
}));
export const CardActions = styled(Box)(() => ({
  display: "flex",
  gap: 4,
  flexShrink: 0,
  alignItems: "center",
}));
export const CardContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  "& > div": {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.875rem",
  },
}));
export const PaginationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
}));
export const ModalActions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));
export const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "100%",
  animation: "fade-up 0.3s ease-out",
  backgroundImage: theme.palette.layout.authBg,
  "@keyframes fade-up": {
    "0%": { opacity: 0, transform: "translateY(8px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
}));
export const StatCard = styled(Card)<{ gradient: string }>(({ gradient }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 12,
  background: gradient,
  color: "#fff",
  padding: "20px",
  transition: "all 0.25s ease",
  boxShadow: "0 18px 45px rgba(15,23,42,0.6), 0 0 0 1px rgba(15,23,42,0.8)",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 55%)",
    pointerEvents: "none",
  },
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      "0 24px 55px rgba(15,23,42,0.8), 0 0 0 1px rgba(226,232,240,0.4)",
  },
}));
export const GlassCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  height: "100%",
  background: theme.palette.glass.soft,
  border: `1px solid ${theme.palette.glass.cardBorder}`,
  boxShadow: theme.palette.glass.cardShadow,
  backdropFilter: "blur(18px)",
}));
export const GlassCardContent = styled(CardContent)(() => ({
  padding: 16,
}));
export const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700,
  marginBottom: 16,
}));
export const CalendarBox = styled(Box)(({ theme }) => ({
  height: 220,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  border: `1px dashed ${theme.palette.glass.cardBorder}`,
  background:
    theme.palette.mode === "dark"
      ? "rgba(15,23,42,0.9)"
      : "rgba(248,250,252,0.9)",
}));
export const RowItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1.2, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));
export const MobileMiniCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background:
    theme.palette.mode === "dark"
      ? "rgba(15,23,42,0.85)"
      : "rgba(248,250,252,0.95)",
  border: `1px solid ${theme.palette.divider}`,
}));
export const SuccessTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(22,163,74,0.15)"
      : "rgba(187,247,208,0.6)",
}));
export const WarningTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(234,179,8,0.15)"
      : "rgba(254,243,199,0.8)",
}));
export const AutoText = styled(TextField)(() => ({
  margin: 0,
}));
export const HeroContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));
export const GlassCardA = styled(Card)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(3),
  overflow: "hidden",
  border: `1px solid ${theme.palette.glass.cardBorder}`,
  background: theme.palette.glass.soft,
  boxShadow: theme.palette.glass.cardShadow,
  backdropFilter: "blur(18px)",
}));
export const Badge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1.5),
  marginBottom: theme.spacing(2),
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.5)",
  backgroundColor: "rgba(15,23,42,0.65)",
  backdropFilter: "blur(16px)",
}));
export const GlowBackground = styled(Box)(() => ({
  position: "absolute",
  inset: "12%",
  borderRadius: 24,
  background:
    "radial-gradient(circle at 10% 0, rgba(56,189,248,0.4), transparent 60%)",
  filter: "blur(26px)",
}));
export const ImageWrapper = styled("img")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(6),
  objectFit: "contain",
  background:
    "radial-gradient(circle at top, rgba(59,130,246,0.15), transparent 65%)",
}));
export const LoginWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  backgroundImage: theme.palette.layout.authBg,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-40%",
    background:
      "conic-gradient(from 140deg at 20% 20%, rgba(59,130,246,0.35), transparent 40%, rgba(236,72,153,0.4), transparent 70%, rgba(56,189,248,0.35))",
    opacity: 0.8,
    filter: "blur(60px)",
  },
}));
export const LoginCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 420,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  borderRadius: theme.spacing(3),
  backdropFilter: "blur(20px)",
}));
export const MobileToggleButton = styled(IconButton)(({ theme }) => ({
  // position: "fixed",
  // top: 16,
  // left: 16,
  zIndex: theme.zIndex.drawer + 1,
  borderRadius: 999,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(15,23,42,0.9)"
      : "rgba(248,250,252,0.95)",
  boxShadow: "0 10px 30px rgba(15,23,42,0.55)",
}));
export const SidebarDrawer = styled(Drawer)<{ open: boolean }>(
  ({ theme, open }) => ({
    width: open ? 240 : 72,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: open ? 240 : 72,
      border: "none",
      overflowX: "hidden",
      transition: "width 0.25s ease-out",
      background: theme.palette.glass.soft,
      borderRight: `1px solid ${theme.palette.glass.cardBorder}`,
      boxShadow: theme.palette.glass.cardShadow,
      backdropFilter: "blur(22px)",
      color: theme.palette.text.primary,
    },
  }),
);
export const SidebarHeader = styled(Box)<{ open: boolean }>(
  ({ theme, open }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: open ? "space-between" : "center",
    padding: open ? theme.spacing(2) : theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.glass.cardBorder}`,
    minHeight: 64,
  }),
);
export const SidebarListButton = styled(ListItemButton)<{ open: boolean }>(
  ({ theme, open }) => ({
    padding: open ? theme.spacing(1.5, 2) : theme.spacing(1),
    borderRadius: 999,
    margin: open ? theme.spacing(0.5, 1) : theme.spacing(0.5),
    minHeight: 44,
    justifyContent: open ? "flex-start" : "center",
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
  }),
);
export const SidebarListIcon = styled(ListItemIcon)<{ open: boolean }>(
  ({ theme, open }) => ({
    minWidth: 0,
    marginRight: open ? theme.spacing(1.5) : 0,
    justifyContent: "center",
    color: theme.palette.text.secondary,
  }),
);
export const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15,23,42,0.6)",
  backdropFilter: "blur(4px)",
  zIndex: theme.zIndex.drawer - 1,
}));
