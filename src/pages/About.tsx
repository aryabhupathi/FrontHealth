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
  const navigate=useNavigate();
  const values = [
    {
      icon: <FaHeartbeat size={40} color={theme.palette.primary.main} />,
      title: "Patient First",
      desc: "Your health is our priority—always.",
    },
    {
      icon: <FaUserMd size={40} color={theme.palette.primary.main} />,
      title: "Medical Excellence",
      desc: "Board-certified specialists & evidence-based care.",
    },
    {
      icon: <FaShieldAlt size={40} color={theme.palette.primary.main} />,
      title: "Integrity & Trust",
      desc: "Transparent, ethical, and secure.",
    },
    {
      icon: <FaHandsHelping size={40} color={theme.palette.primary.main} />,
      title: "Community Care",
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
    { year: "2025", event: "AI-powered diagnostics & telehealth expansion." },
  ];
  const stats = [
    { value: "50K+", label: "Patients Served" },
    { value: "200+", label: "Medical Experts" },
    { value: "98%", label: "Patient Satisfaction" },
    { value: "24/7", label: "Care Availability" },
  ];
  return (
    <MainLayout>
      <Box
        sx={{
          py: 8,
          background: theme.palette.mode === "light" ? "#f8f9fa" : "#1a1a1a",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
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
            Delivering compassionate, cutting-edge healthcare since 2010.
            Trusted by over 50,000 patients nationwide.
          </Typography>
        </Container>
      </Box>
      <Box sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Our Mission
                </Typography>
                <Typography color="text.secondary" paragraph>
                  To provide accessible, high-quality, and patient-centered care
                  using advanced medical technology and a team of dedicated
                  professionals.
                </Typography>
                <Typography color="text.secondary">
                  We believe every individual deserves dignity, empathy, and
                  timely treatment—regardless of background or circumstance.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Our Vision
                </Typography>
                <Typography color="text.secondary" paragraph>
                  To be the most trusted digital-first healthcare provider in
                  the region—where innovation meets humanity.
                </Typography>
                <Typography color="text.secondary">
                  By 2030, we aim to serve 1 million patients through integrated
                  telehealth, AI-assisted diagnostics, and community wellness
                  programs.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 8,
          background:
            theme.palette.mode === "light"
              ? "#f3f6fc"
              : theme.palette.background.paper,
        }}
      >
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" mb={6}>
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    textAlign: "center",
                    p: 2,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Box mb={2}>{item.icon}</Box>
                    <Typography variant="h6" fontWeight="600">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" mb={6}>
            Our Journey
          </Typography>
          <Grid container justifyContent="center">
            <Grid size={{ xs: 12, md: 10 }}>
              {timeline.map((step, i) => (
                <Box
                  key={i}
                  sx={{
                    position: "relative",
                    pl: 4,
                    mb: 4,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 16,
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      backgroundColor: theme.palette.primary.main,
                      opacity: 0.3,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: 8,
                      top: 8,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.primary.main,
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
              ? "#f8f9fa"
              : theme.palette.background.default,
        }}
      >
        <Container>
          <Grid container spacing={4}>
            {stats.map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Typography variant="h3" fontWeight="bold" color="primary.main">
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          color: "#fff",
          background: theme.palette.primary.main,
        }}
      >
        <Container>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Ready to Experience Trusted Care?
          </Typography>
          <Typography mb={3}>
            Book your first consultation today—online or in-person.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFC107",
              color: "#000",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 50,
              "&:hover": { backgroundColor: "#ffb300" },
            }}
            onClick={()=>{
              navigate("/login")
            }}
          >
            Book Appointment
          </Button>
        </Container>
      </Box>
    </MainLayout>
  );
};
export default About;
