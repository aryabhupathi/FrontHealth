/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Grid,
} from "@mui/material";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
const AVATARS = {
  doctorMan: "https://cdn-icons-png.flaticon.com/512/3774/3774298.png",
  doctorWoman: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  fallback: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
};
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleView = () => {
    navigate("/login");
  };
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
  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Contact", to: "/contact" },
  ];
  return (
    <MainLayout>
      <Box
        sx={(t) => ({
          pt: { xs: 8, md: 10 },
          pb: { xs: 8, md: 10 },
          position: "relative",
          overflow: "hidden",
          backgroundImage: t.palette.layout.authBg,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-30%",
            background:
              "conic-gradient(from 150deg at 10% 0%, rgba(59,130,246,0.3), transparent 40%, rgba(236,72,153,0.32), transparent 70%, rgba(56,189,248,0.3))",
            opacity: 0.9,
            filter: "blur(70px)",
          },
        })}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 0.6,
                  mb: 2,
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,0.5)",
                  backgroundColor: "rgba(15,23,42,0.65)",
                  backdropFilter: "blur(16px)",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, #22c55e 0, rgba(22,163,74,0.1) 70%)",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                    color: theme.palette.text.default,
                  }}
                >
                  Smart, patient‑first care
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  mb: 1.5,
                  color: theme.palette.text.primary,
                }}
              >
                We care about your{" "}
                <Box
                  component="span"
                  sx={{ color: theme.palette.primary.main }}
                >
                  health
                </Box>
                .
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 520 }}
              >
                Consult top doctors from anywhere. Fast, secure, and tailored
                care for every patient journey.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ px: 3.5, py: 1.2 }}
                  onClick={handleView}
                >
                  Book consultation
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  size="large"
                  sx={{ px: 2.5 }}
                  onClick={() => navigate("/services")}
                >
                  View services
                </Button>
              </Box>
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                <Box>
                  <Typography variant="subtitle2" color="text.primary">
                    24/7 doctors
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    On‑call experts across specialties.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.primary">
                    4.9 patient score
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thousands of trusted reviews.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  maxWidth: 460,
                  mx: { xs: "auto", md: "unset" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: "12%",
                    borderRadius: 6,
                    background:
                      "radial-gradient(circle at 10% 0, rgba(56,189,248,0.4), transparent 60%)",
                    filter: "blur(26px)",
                  }}
                />
                <Card
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: `1px solid ${theme.palette.glass.cardBorder}`,
                    background: theme.palette.glass.soft,
                    boxShadow: theme.palette.glass.cardShadow,
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <Box
                    component="img"
                    src={AVATARS.doctorMan}
                    onError={(e: any) =>
                      (e.currentTarget.src = AVATARS.fallback)
                    }
                    alt="Doctor"
                    sx={{
                      width: "100%",
                      objectFit: "contain",
                      background:
                        "radial-gradient(circle at top, rgba(59,130,246,0.15), transparent 65%)",
                      p: 4,
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pt: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Next available
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        Today, 4:30 PM
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 999, px: 2.5 }}
                      onClick={handleView}
                    >
                      Check slots
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Container>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ letterSpacing: 1 }}
          >
            Our solution
          </Typography>
          <Typography variant="h4" fontWeight={700} mb={1.5}>
            4‑step care journey
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 520, mx: "auto" }}
          >
            From booking to recovery, every step is orchestrated around your
            comfort.
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
                    height: "100%",
                    background: theme.palette.glass.soft,
                    border: `1px solid ${theme.palette.glass.cardBorder}`,
                    boxShadow: theme.palette.glass.cardShadow,
                    backdropFilter: "blur(18px)",
                    py: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ mb: 1.5 }}>
                      {item.icon}
                    </Typography>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
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
          <Grid container spacing={5} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.glass.cardBorder}`,
                  background: theme.palette.glass.soft,
                  boxShadow: theme.palette.glass.cardShadow,
                  backdropFilter: "blur(18px)",
                  maxWidth: 480,
                  mx: { xs: "auto", md: 0 },
                }}
              >
                <CardMedia
                  component="img"
                  src={AVATARS.doctorWoman}
                  onError={(e: any) => (e.currentTarget.src = AVATARS.fallback)}
                  sx={{
                    borderRadius: 3,
                    maxHeight: 360,
                    objectFit: "contain",
                    background:
                      "radial-gradient(circle at top, rgba(248,250,252,0.04), transparent 65%)",
                    p: 4,
                  }}
                />
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="overline"
                color="primary.main"
                sx={{ letterSpacing: 1 }}
              >
                About us
              </Typography>
              <Typography variant="h4" fontWeight={700} mb={1.5}>
                Healthcare that feels human.
              </Typography>
              <Typography
                variant="body1"
                mb={3}
                color="text.secondary"
                sx={{ maxWidth: 480 }}
              >
                Connecting you with leading specialists for timely, accurate,
                and compassionate care—without the waiting room chaos.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 999, px: 3, py: 1 }}
                onClick={handleView}
              >
                View doctors
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Container>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ letterSpacing: 1 }}
          >
            Our doctors
          </Typography>
          <Typography variant="h4" fontWeight={700} mb={1.5}>
            Trusted specialists
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 520, mx: "auto" }}
          >
            A curated team across cardiology, neurology, dermatology, and more.
          </Typography>
          <Grid container spacing={3}>
            {[
              { name: "Dr. Johnson", role: "Cardiologist" },
              { name: "Dr. Leonard", role: "Neurologist" },
              { name: "Dr. Amelia", role: "Dermatologist" },
              { name: "Dr. Brown", role: "Dentist" },
            ].map((doc, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <Card
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    border: `1px solid ${theme.palette.glass.cardBorder}`,
                    background: theme.palette.glass.soft,
                    boxShadow: theme.palette.glass.cardShadow,
                    backdropFilter: "blur(18px)",
                  }}
                >
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
            sx={{ letterSpacing: 1 }}
          >
            Testimonials
          </Typography>
          <Typography variant="h4" fontWeight={700} mb={1.5} textAlign="center">
            What patients say
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 520, mx: "auto", textAlign: "center" }}
          >
            Real stories from people whose care journeys we have supported.
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((t, idx) => (
              <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                <Card
                  sx={{
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.glass.cardBorder}`,
                    background: theme.palette.glass.soft,
                    boxShadow: theme.palette.glass.cardShadow,
                    backdropFilter: "blur(18px)",
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    height: "100%",
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
                    <Box color="warning.main" display="flex" gap={0.2}>
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
        sx={(t) => ({
          py: 8,
          textAlign: "center",
          color: t.palette.text.primary,
          background: t.palette.gradient.primary,
        })}
      >
        <Container>
          <Typography variant="h4" fontWeight={700} mb={2}>
            Ready to take control of your health?
          </Typography>
          <Typography variant="body1" mb={3}>
            Start a consultation in minutes and meet your care team today.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 999, px: 4, py: 1.5, fontWeight: 600 }}
            onClick={handleView}
          >
            Book a consultation
          </Button>
        </Container>
      </Box>
      <Box
        sx={(t) => ({
          py: 4,
          backgroundColor: t.palette.background.paper,
        })}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h5" fontWeight={700} color="primary">
                Hospital
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Compassionate, tech‑enabled healthcare for everyone.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Quick links
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
                Stay updated
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
          <Divider sx={{ my: 3, borderColor: "rgba(51,65,85,0.9)" }} />
          <Typography variant="body2" textAlign="center" color="text.secondary">
            © 2025 HealthCare. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </MainLayout>
  );
};
export default LandingPage;
