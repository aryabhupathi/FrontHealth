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
  const services = [
    {
      icon: <FaStethoscope size={40} color={theme.palette.primary.main} />,
      title: "General Medicine",
      desc: "Comprehensive primary care for all ages—diagnosis, treatment, and ongoing health management.",
    },
    {
      icon: <FaHeartbeat size={40} color={theme.palette.primary.main} />,
      title: "Cardiology",
      desc: "Advanced heart health services including ECG, stress tests, and preventive cardiology.",
    },
    {
      icon: <FaBrain size={40} color={theme.palette.primary.main} />,
      title: "Neurology",
      desc: "Expert care for conditions like migraines, epilepsy, stroke recovery, and nerve disorders.",
    },
    {
      icon: <FaTooth size={40} color={theme.palette.primary.main} />,
      title: "Dental Care",
      desc: "From routine cleanings to restorative procedures—gentle, modern dental services.",
    },
    {
      icon: <FaBaby size={40} color={theme.palette.primary.main} />,
      title: "Pediatrics",
      desc: "Child-friendly care for infants, toddlers, and teens—vaccinations, growth monitoring, and more.",
    },
    {
      icon: <FaUserMd size={40} color={theme.palette.primary.main} />,
      title: "Women’s Health",
      desc: "Gynecology, prenatal care, menopause support, and breast health screenings.",
    },
    {
      icon: <FaVideo size={40} color={theme.palette.primary.main} />,
      title: "Telehealth Consultations",
      desc: "24/7 virtual visits with licensed doctors—no travel, no waiting rooms.",
    },
    {
      icon: <FaShieldAlt size={40} color={theme.palette.primary.main} />,
      title: "Vaccinations & Immunizations",
      desc: "CDC-recommended vaccines for children and adults, including flu, HPV, and travel shots.",
    },
    {
      icon: <FaRunning size={40} color={theme.palette.primary.main} />,
      title: "Preventive Health",
      desc: "Annual check-ups, cancer screenings, cholesterol tests, and lifestyle counseling.",
    },
    {
      icon: <FaHeadSideVirus size={40} color={theme.palette.primary.main} />,
      title: "Mental Wellness",
      desc: "Confidential therapy and psychiatric support for anxiety, depression, and stress.",
    },
  ];
  return (
    <MainLayout>
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background:
            theme.palette.mode === "light"
              ? "#f5f7fb"
              : theme.palette.background.default,
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Our{" "}
            <Box component="span" color="primary.main">
              Healthcare Services
            </Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="md"
            mx="auto"
          >
            Expert medical care—online or in-person—designed around your needs.
          </Typography>
        </Container>
      </Box>
      <Box sx={{ py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            {services.map((service, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    boxShadow: 3,
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box mb={2}>{service.icon}</Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.desc}
                    </Typography>
                  </CardContent>
                </Card>
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
            Can’t Visit In Person?
          </Typography>
          <Typography mb={4}>
            Get care from home with our secure video consultations.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: theme.palette.primary.main,
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 50,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Start Virtual Visit
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
            <strong>Medical Emergency?</strong> Call local emergency services
            immediately. Our clinic handles non-life-threatening conditions
            only.
          </Typography>
        </Container>
      </Box>
    </MainLayout>
  );
};
export default ServicesPage;
