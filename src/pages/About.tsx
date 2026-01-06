import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
} from "@mui/material";
import {
  FaHeartbeat,
  FaUserMd,
  FaShieldAlt,
  FaHandsHelping,
} from "react-icons/fa";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
const About: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const values = [
    {
      icon: FaHeartbeat,
      title: "Patient first",
      desc: "Your health is our priority—always.",
    },
    {
      icon: FaUserMd,
      title: "Medical excellence",
      desc: "Board‑certified specialists and evidence‑based care.",
    },
    {
      icon: FaShieldAlt,
      title: "Integrity and trust",
      desc: "Transparent, ethical, and secure.",
    },
    {
      icon: FaHandsHelping,
      title: "Community care",
      desc: "Serving underserved areas with mobile clinics.",
    },
  ];
  const timeline = [
    { year: "2010", event: "Hospital founded with 10 beds in downtown." },
    { year: "2015", event: "Launched 24/7 emergency care unit." },
    { year: "2019", event: "Digital health platform launched." },
    {
      year: "2023",
      event: "Reached 50K+ patients; opened rural outreach centers.",
    },
    { year: "2025", event: "AI‑powered diagnostics and telehealth expansion." },
  ];
  const stats = [
    { value: "50K+", label: "Patients served" },
    { value: "200+", label: "Medical experts" },
    { value: "98%", label: "Patient satisfaction" },
    { value: "24/7", label: "Care availability" },
  ];
  const iconColor =
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.primary.dark;
  return (
    <MainLayout>
      <Box
        sx={(t) => ({
          py: { xs: 8, md: 10 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          backgroundImage: t.palette.layout.authBg,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-30%",
            background:
              "conic-gradient(from 160deg at 0% 0%, rgba(59,130,246,0.3), transparent 40%, rgba(236,72,153,0.28), transparent 70%, rgba(56,189,248,0.3))",
            opacity: 0.9,
            filter: "blur(70px)",
          },
        })}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 1.2 }}
            color="primary.main"
          >
            About us
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 1 }}
          >
            About{" "}
            <Box component="span" color="primary.main">
              Hospital
            </Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="md"
            mx="auto"
          >
            Delivering compassionate, cutting‑edge healthcare since 2010,
            trusted by thousands of patients across the country.
          </Typography>
        </Container>
      </Box>
      <Box sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  background: theme.palette.glass.soft,
                  border: `1px solid ${theme.palette.glass.cardBorder}`,
                  boxShadow: theme.palette.glass.cardShadow,
                  backdropFilter: "blur(18px)",
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="overline" color="primary.main">
                    Our mission
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Care that feels personal.
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    To provide accessible, high‑quality, and patient‑centered
                    care using advanced medical technology and a team of
                    dedicated professionals.
                  </Typography>
                  <Typography color="text.secondary">
                    Every individual deserves dignity, empathy, and timely
                    treatment—regardless of background or circumstance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  background: theme.palette.glass.soft,
                  border: `1px solid ${theme.palette.glass.cardBorder}`,
                  boxShadow: theme.palette.glass.cardShadow,
                  backdropFilter: "blur(18px)",
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="overline" color="primary.main">
                    Our vision
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Digital‑first, human‑always.
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    To be the most trusted digital‑first healthcare provider in
                    the region—where innovation meets humanity.
                  </Typography>
                  <Typography color="text.secondary">
                    By 2030, we aim to serve 1 million patients through
                    integrated telehealth, AI‑assisted diagnostics, and
                    community wellness programs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 8,
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #f8fafc, #e5edff)"
              : theme.palette.background.paper,
        }}
      >
        <Container>
          <Typography
            variant="overline"
            color="primary.main"
            textAlign="center"
            sx={{ letterSpacing: 1 }}
          >
            Our core values
          </Typography>
          <Typography variant="h4" textAlign="center" fontWeight="bold" mb={6}>
            What guides every decision.
          </Typography>
          <Grid container spacing={4}>
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      textAlign: "center",
                      background: theme.palette.glass.soft,
                      border: `1px solid ${theme.palette.glass.cardBorder}`,
                      boxShadow: theme.palette.glass.cardShadow,
                      backdropFilter: "blur(18px)",
                      p: 2,
                    }}
                  >
                    <CardContent>
                      <Box
                        mb={2}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(37,99,235,0.16)"
                              : "rgba(191,219,254,0.7)",
                        }}
                      >
                        <Icon size={32} color={iconColor} />
                      </Box>
                      <Typography variant="h6" fontWeight={600}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography
            variant="overline"
            color="primary.main"
            textAlign="center"
            sx={{ letterSpacing: 1 }}
          >
            Our journey
          </Typography>
          <Typography variant="h4" textAlign="center" fontWeight="bold" mb={6}>
            A decade of growing with you.
          </Typography>
          <Grid container justifyContent="center">
            <Grid size={{ xs: 12, md: 10 }}>
              {timeline.map((step, i) => (
                <Box
                  key={i}
                  sx={{
                    position: "relative",
                    pl: 5,
                    mb: i === timeline.length - 1 ? 0 : 4,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 18,
                      top: 0,
                      bottom: i === timeline.length - 1 ? "auto" : 0,
                      height: i === timeline.length - 1 ? 18 : "100%",
                      width: 2,
                      backgroundColor: theme.palette.primary.main,
                      opacity: 0.25,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: 10,
                      top: 4,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: theme.palette.gradient.primary,
                      boxShadow: "0 0 0 4px rgba(59,130,246,0.25)",
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {step.year}
                  </Typography>
                  <Typography color="text.secondary">{step.event}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background:
            theme.palette.mode === "light"
              ? "#f8fafc"
              : theme.palette.background.default,
        }}
      >
        <Container>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ letterSpacing: 1 }}
          >
            At a glance
          </Typography>
          <Typography variant="h4" fontWeight="bold" mb={4}>
            Impact that scales with trust.
          </Typography>
          <Grid container spacing={4}>
            {stats.map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box
        sx={(t) => ({
          py: 8,
          textAlign: "center",
          color: t.palette.text.primary,
          background: t.palette.gradient.primary,
        })}
      >
        <Container>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Ready to experience trusted care?
          </Typography>
          <Typography mb={3}>
            Book your first consultation today—online or in person.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: 999,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
            }}
            onClick={() => navigate("/login")}
          >
            Book appointment
          </Button>
        </Container>
      </Box>
    </MainLayout>
  );
};
export default About;
