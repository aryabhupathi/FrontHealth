import type { Theme } from "@mui/material/styles";
export const dashboardStyles = {
  page: (theme: Theme) => ({
    p: { xs: 2, md: 3 },
    minHeight: "100%",
    animation: "fade-up 0.3s ease-out",
    backgroundImage: theme.palette.layout.authBg,
    "@keyframes fade-up": {
      "0%": { opacity: 0, transform: "translateY(8px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
  }),
  glassCard: (theme: Theme) => ({
    borderRadius: 3,
    height: "100%",
    background: theme.palette.glass.soft,
    border: `1px solid ${theme.palette.glass.cardBorder}`,
    boxShadow: theme.palette.glass.cardShadow,
    backdropFilter: "blur(18px)",
  }),
  statCard: (_theme: Theme, gradient: string) => ({
    position: "relative",
    overflow: "hidden",
    borderRadius: 2,
    background: gradient,
    color: "#fff",
    px: 2.5,
    py: 2,
    transition: "all 0.25s ease",
    boxShadow:
      "0 18px 45px rgba(31, 34, 39, 0.6), 0 0 0 1px rgba(50, 53, 60, 0.8)",
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
  }),
  mobileListCard: (theme: Theme) => ({
    mb: 2,
    borderRadius: 2,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15,23,42,0.85)"
        : "rgba(248,250,252,0.95)",
    border: "1px solid",
    borderColor: "divider",
  }),
  tableHeader: (theme: Theme, color: "success" | "warning") => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? color === "success"
          ? "rgba(22,163,74,0.15)"
          : "rgba(234,179,8,0.15)"
        : color === "success"
        ? "rgba(187,247,208,0.6)"
        : "rgba(254,243,199,0.8)",
  }),
};
