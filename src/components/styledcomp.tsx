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
  Autocomplete<string, false, false, false>
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
export const AutoText = styled(TextField)(({ theme }) => ({
  margin: 0,
}));
