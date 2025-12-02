import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  TextField,
  Divider,
  useTheme,
} from "@mui/material";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import MainLayout from "../layout/MainLayout";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
const AVATARS = {
  doctorMan: "https://cdn-icons-png.flaticon.com/512/3774/3774298.png",
  doctorWoman: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  fallback: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
};
const LandingPage: React.FC = () => {
  const navigate=useNavigate();
  const theme = useTheme();
  const handleView=()=>{
navigate("/login");
  }
  const testimonials = [
    {
      name: "John & Emma",
      text: "The doctors were kind and patient. Highly recommended!",
      rating: 4.5,
    },
    {
      name: "Alicia Brown",
      text: "Smooth booking and amazing consultation!",
      rating: 5,
    },
  ];
  const quickLinks=[{
    name:"Home",
    to:"/"
  },{
    name:"About",
    to:"/about"
  },{
    name:"Services",
    to:"/services"
  },{
    name:"Contact",
    to:"/contact"
  }]
  return (
    <MainLayout>
      <Box
        sx={{
          py: 8,
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #f5f7fa, #ffffff)"
              : "linear-gradient(180deg, #121212, #1c1c1c)",
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                We Care About Your{" "}
                <Box component="span" color="primary.main">
                  Health
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" mb={3}>
                Consult the best doctors from your comfort. Fast, reliable, and
                affordable care.
              </Typography>
              <Button variant="contained" size="large" sx={{ borderRadius: 5 }}>
                Contact Now
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} textAlign="center">
              <Box
                component="img"
                src={AVATARS.doctorMan}
                onError={(e: any) => (e.currentTarget.src = AVATARS.fallback)}
                alt="Doctor"
                sx={{
                  maxWidth: "80%",
                  borderRadius: 4,
                  mx: "auto",
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Container>
          <Typography variant="overline" color="primary.main">
            Our Solution
          </Typography>
          <Typography variant="h4" fontWeight={700} mb={4}>
            4-Step Care Journey
          </Typography>
          <Grid container spacing={3}>
            {[
              { icon: "📅", title: "Book", desc: "Easy online scheduling" },
              { icon: "❤️", title: "Consult", desc: "Expert doctors" },
              { icon: "💊", title: "Treat", desc: "Personalized care" },
              { icon: "😊", title: "Thrive", desc: "Live healthier" },
            ].map((item, idx) => (
              <Grid size={{ xs: 6, md: 3 }} key={idx}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    py: 3,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography variant="h3">{item.icon}</Typography>
                    <Typography variant="h6" fontWeight={600}>
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
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, sm: 6 }} textAlign="center">
              <CardMedia
                component="img"
                src={AVATARS.doctorWoman}
                onError={(e: any) => (e.currentTarget.src = AVATARS.fallback)}
                sx={{
                  borderRadius: 3,
                  maxWidth: "90%",
                  mx: "auto",
                  boxShadow: 4,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="overline" color="primary.main">
                About Us
              </Typography>
              <Typography variant="h4" fontWeight={700} mb={2}>
                We Help Your Health
              </Typography>
              <Typography variant="body1" mb={3} color="text.secondary">
                Connecting you with top healthcare professionals for timely,
                accurate, and compassionate care.
              </Typography>
              <Button variant="contained" onClick = {handleView} sx={{ borderRadius: 5 }}>
                View Doctors
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Container>
          <Typography variant="overline" color="primary.main">
            Our Doctors
          </Typography>
          <Typography variant="h4" fontWeight={700} mb={4}>
            Trusted Specialists
          </Typography>
          <Grid container spacing={3}>
            {[
              { name: "Dr. Johnson", role: "Cardiologist" },
              { name: "Dr. Leonard", role: "Neurologist" },
              { name: "Dr. Amelia", role: "Dermatologist" },
              { name: "Dr. Brown", role: "Dentist" },
            ].map((doc, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={AVATARS.fallback}
                    alt={doc.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {doc.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doc.role}
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
          <Typography
            variant="overline"
            color="primary.main"
            textAlign="center"
            display="block"
          >
            Testimonials
          </Typography>
          <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
            What Patients Say
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((t, idx) => (
              <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Avatar
                    src={AVATARS.fallback}
                    alt={t.name}
                    sx={{ width: 64, height: 64 }}
                  />
                  <Box>
                    <Typography variant="h6">{t.name}</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {t.text}
                    </Typography>
                    <Box color="warning.main" display="flex">
                      {Array.from({ length: 5 }).map((_, i) => {
                        if (t.rating >= i + 1)
                          return <FaStar key={i} size={16} />;
                        if (t.rating >= i + 0.5)
                          return <FaStarHalfAlt key={i} size={16} />;
                        return <FaRegStar key={i} size={16} />;
                      })}
                    </Box>
                  </Box>
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
          background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
        }}
      >
        <Container>
          <Typography variant="h4" fontWeight={700} mb={2}>
            Ready to Take Control of Your Health?
          </Typography>
          <Typography variant="body1" mb={3}>
            We’re here to support you every step of the way.
          </Typography>
          <Button
            variant="contained"
            color="warning"
            sx={{
              borderRadius: 5,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              color: "black",
            }}
            onClick={handleView}
          >
            Book a Consultation
          </Button>
        </Container>
      </Box>
      <Box sx={{ py: 4, backgroundColor: theme.palette.background.paper }}>
        <Container>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h5" fontWeight={700} color="primary">
                Hospital
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compassionate, tech-enabled healthcare for everyone.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Quick Links
              </Typography>
             {quickLinks.map((item, i) => (
  <Typography
    key={i}
    variant="body2"
    color="text.secondary"
    sx={{ mb: 0.5, cursor: "pointer" }}
    onClick={() => navigate(item.to)}
  >
    {item.name}
  </Typography>
))}

            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Stay Updated
              </Typography>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  type="email"
                  placeholder="Your email"
                />
                <Button variant="contained">Subscribe</Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" textAlign="center" color="text.secondary">
            © 2025 HealthCare. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </MainLayout>
  );
};
export default LandingPage;
