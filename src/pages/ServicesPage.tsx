import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import {
  FaStethoscope,
  FaHeartbeat,
  FaBrain,
  FaTooth,
  FaBaby,
  FaUserMd,
  FaVideo,
  FaShieldAlt,
  FaRunning,
  FaHeadSideVirus,
} from "react-icons/fa";
import MainLayout from "../layout/MainLayout";
const ServicesPage: React.FC = () => {
  const theme = useTheme();
  const iconColor =
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.primary.dark;
  const services = [
    {
      icon: FaStethoscope,
      title: "General medicine",
      desc: "Comprehensive primary care for all ages—diagnosis, treatment, and ongoing health management.",
    },
    {
      icon: FaHeartbeat,
      title: "Cardiology",
      desc: "Advanced heart health services including ECG, stress tests, and preventive cardiology.",
    },
    {
      icon: FaBrain,
      title: "Neurology",
      desc: "Expert care for migraines, epilepsy, stroke recovery, and nerve disorders.",
    },
    {
      icon: FaTooth,
      title: "Dental care",
      desc: "From routine cleanings to restorative procedures—gentle, modern dental services.",
    },
    {
      icon: FaBaby,
      title: "Pediatrics",
      desc: "Child‑friendly care for infants, toddlers, and teens—vaccinations, growth monitoring, and more.",
    },
    {
      icon: FaUserMd,
      title: "Women’s health",
      desc: "Gynecology, prenatal care, menopause support, and breast health screenings.",
    },
    {
      icon: FaVideo,
      title: "Telehealth consultations",
      desc: "24/7 virtual visits with licensed doctors—no travel, no waiting rooms.",
    },
    {
      icon: FaShieldAlt,
      title: "Vaccinations and immunizations",
      desc: "Recommended vaccines for children and adults, including flu, HPV, and travel shots.",
    },
    {
      icon: FaRunning,
      title: "Preventive health",
      desc: "Check‑ups, cancer screenings, cholesterol tests, and lifestyle counseling.",
    },
    {
      icon: FaHeadSideVirus,
      title: "Mental wellness",
      desc: "Confidential therapy and psychiatric support for anxiety, depression, and stress.",
    },
  ];
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
              "conic-gradient(from 150deg at 0% 0%, rgba(56,189,248,0.3), transparent 40%, rgba(129,140,248,0.28), transparent 70%, rgba(56,189,248,0.3))",
            opacity: 0.9,
            filter: "blur(70px)",
          },
        })}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ letterSpacing: 1.2 }}
          >
            Our services
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ mt: 1 }}
          >
            Our{" "}
            <Box component="span" color="primary.main">
              healthcare services
            </Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="md"
            mx="auto"
          >
            Expert medical care—online or in person—designed around your needs.
          </Typography>
        </Container>
      </Box>
      <Box sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      textAlign: "center",
                      background: theme.palette.glass.soft,
                      border: `1px solid ${theme.palette.glass.cardBorder}`,
                      boxShadow: theme.palette.glass.cardShadow,
                      backdropFilter: "blur(18px)",
                      transition:
                        "transform 0.25s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow:
                          "0 26px 60px rgba(15,23,42,0.85), 0 0 0 1px rgba(129,140,248,0.5)",
                        borderColor: "rgba(129,140,248,0.7)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
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
                              ? "rgba(37,99,235,0.18)"
                              : "rgba(191,219,254,0.7)",
                        }}
                      >
                        <Icon size={30} color={iconColor} />
                      </Box>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        gutterBottom
                        sx={{ mt: 1 }}
                      >
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
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
            Can’t visit in person?
          </Typography>
          <Typography mb={4}>
            Get care from home with secure, high‑quality video consultations.
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
          >
            Start virtual visit
          </Button>
        </Container>
      </Box>
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          background:
            theme.palette.mode === "light"
              ? "#f9fafb"
              : theme.palette.background.paper,
        }}
      >
        <Container>
          <Typography color="text.secondary" variant="body2">
            <Box component="span" sx={{ fontWeight: 600 }}>
              Medical emergency?
            </Box>{" "}
            Call local emergency services immediately. Our clinic handles
            non‑life‑threatening conditions only.
          </Typography>
        </Container>
      </Box>
    </MainLayout>
  );
};
export default ServicesPage;
