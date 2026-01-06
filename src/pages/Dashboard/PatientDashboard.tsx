/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {
  DashboardContainer,
  GlassCard,
  GlassCardContent,
  SectionTitle,
} from "../../components/styledcomp";
export default function PatientDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();
  const gradient = (c1: string, c2: string) =>
    `linear-gradient(135deg, ${c1}, ${c2})`;
  const stats = [
    {
      title: "Appointments",
      value: "3",
      badge: "Next: 21 Oct",
      color: gradient("#2193b0", "#6dd5ed"),
      badgeColor: "info",
    },
    {
      title: "Prescriptions",
      value: "5 Active",
      badge: "Last Updated: 16 Oct",
      color: gradient("#11998e", "#38ef7d"),
      badgeColor: "success",
    },
    {
      title: "Bills",
      value: "₹2,450",
      badge: "Due: 20 Oct",
      color: gradient("#f7971e", "#ffd200"),
      badgeColor: "warning",
    },
  ];
  const appointments = [
    {
      date: "21 Oct 2025",
      doctor: "Dr. Mehta",
      department: "Cardiology",
      status: "Confirmed",
      statusColor: "info",
    },
    {
      date: "28 Oct 2025",
      doctor: "Dr. Nair",
      department: "Neurology",
      status: "Pending",
      statusColor: "warning",
    },
  ];
  return (
    <DashboardContainer>
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome Back, {user?.name}
        </Typography>
        <Typography color="text.secondary">
          Here’s a summary of your health today
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {stats.map((item, i) => (
          <Grid key={i} size={{ xs: 12, sm: 4 }}>
            <GlassCard>
              <GlassCardContent>
                <SectionTitle variant="h6" color="error.main">
                  {item.title}
                </SectionTitle>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>
                <Chip
                  label={item.badge}
                  color={item.badgeColor as any}
                  size="small"
                  sx={{ mt: 1, background: "#fff", color: "#000" }}
                />
              </GlassCardContent>
            </GlassCard>
          </Grid>
        ))}
        <Grid size={{ xs: 12, lg: 8 }}>
          <GlassCard>
            <GlassCardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Your Upcoming Appointments
              </Typography>
              {isMobile ? (
                <Box>
                  {appointments.map((a, i) => (
                    <Card
                      key={i}
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.15)",
                      }}
                    >
                      <CardContent>
                        <Typography fontWeight={600}>{a.date}</Typography>
                        <Typography variant="body2">
                          <strong>Doctor:</strong> {a.doctor}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Department:</strong> {a.department}
                        </Typography>
                        <Box mt={1}>
                          <Chip
                            label={a.status}
                            color={a.statusColor as any}
                            size="small"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                      }}
                    >
                      <TableCell>Date</TableCell>
                      <TableCell>Doctor</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.map((a, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{a.date}</TableCell>
                        <TableCell>{a.doctor}</TableCell>
                        <TableCell>{a.department}</TableCell>
                        <TableCell>
                          <Chip
                            label={a.status}
                            color={a.statusColor as any}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </GlassCardContent>
          </GlassCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <GlassCard>
            <GlassCardContent>
              <Typography variant="h6" fontWeight="bold">
                Health Summary
              </Typography>
              <Box mt={2}>
                {[
                  { key: "Blood Pressure", val: "118 / 75 mmHg" },
                  { key: "Heart Rate", val: "72 bpm" },
                  { key: "Blood Sugar", val: "92 mg/dL" },
                ].map((i, k) => (
                  <Typography key={k} mb={1}>
                    <strong>{i.key}:</strong> {i.val}
                  </Typography>
                ))}
                <Box mt={1}>
                  <Chip label="Stable" color="success" size="small" />
                </Box>
              </Box>
            </GlassCardContent>
          </GlassCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <GlassCard>
            <GlassCardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="success.main"
                mb={2}
              >
                Active Prescriptions
              </Typography>
              {[
                { med: "Atorvastatin 10mg", time: "Morning" },
                { med: "Metformin 500mg", time: "Evening" },
              ].map((p, i) => (
                <Box
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  py={1}
                  borderBottom="1px solid"
                  borderColor="divider"
                >
                  <Typography>{p.med}</Typography>
                  <Chip label={p.time} color="success" size="small" />
                </Box>
              ))}
            </GlassCardContent>
          </GlassCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <GlassCard>
            <GlassCardContent>
              <Typography variant="h6" fontWeight="bold" color="error" mb={2}>
                Notifications
              </Typography>
              <Box mb={1} display="flex" alignItems="center" gap={1}>
                <Chip label="!" color="error" size="small" />
                <Typography>
                  Upcoming bill due on <strong>20 Oct</strong>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Chip label="i" color="info" size="small" />
                <Typography>
                  Your next appointment is <strong>3 days away</strong>.
                </Typography>
              </Box>
            </GlassCardContent>
          </GlassCard>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}
