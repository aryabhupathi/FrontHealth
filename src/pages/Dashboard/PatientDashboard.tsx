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
} from "@mui/material";
import { cardHover, subtleGlow } from "../../themes/theme";
import { useAuth } from "../../context/AuthContext";
export default function PatientDashboard() {
  const theme = useTheme();
  const gradient = (c1: string, c2: string) =>
    `linear-gradient(135deg, ${c1}, ${c2})`;

  
    const { user } = useAuth();
    console.log(user, "uuuuu")
  return (
    <Box p={3}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome Back, {user?.name}
        </Typography>
        <Typography color="text.secondary">
          Here’s a summary of your health today 💙
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {[
          {
            title: "Upcoming Appointments",
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
            title: "Pending Bills",
            value: "₹2,450",
            badge: "Due: 20 Oct",
            color: gradient("#f7971e", "#ffd200"),
            badgeColor: "warning",
          },
        ].map((item, i) => (
          <Grid key={i} size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                   background: item.color,
                                color: item.color,
                                textAlign: "center",
                                borderRadius: 3,
                                boxShadow: 3, ...cardHover, ...subtleGlow
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {item.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
                <Chip
                  label={item.badge}
                  color={item.badgeColor as any}
                  sx={{ mt: 1, background: "#fff", color: "#000" }}
                  size="small"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{
              background: gradient("#6a11cb", "#2575fc"),
              color: "#fff",
              textAlign: "center", ...cardHover, ...subtleGlow 
            }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Your Upcoming Appointments
              </Typography>
             
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: theme.palette.primary.light }}
                    >
                      <TableCell>Date</TableCell>
                      <TableCell>Doctor</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>21 Oct 2025</TableCell>
                      <TableCell>Dr. Mehta</TableCell>
                      <TableCell>Cardiology</TableCell>
                      <TableCell>
                        <Chip label="Confirmed" color="info" size="small" />
                      </TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell>28 Oct 2025</TableCell>
                      <TableCell>Dr. Nair</TableCell>
                      <TableCell>Neurology</TableCell>
                      <TableCell>
                        <Chip label="Pending" color="warning" size="small" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
  
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              background: gradient("#6a11cb", "#2575fc"),
              color: "#fff",
              borderRadius: 3,
              height: "100%",
               ...cardHover, ...subtleGlow  
            }}
          >
            <CardContent>
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
                \<strong>Overall:</strong>{" "}
                <Chip label="Stable" color="success" size="small" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ borderRadius: 3, height: "100%",
               ...cardHover, ...subtleGlow  }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ borderRadius: 3, height: "100%",...cardHover, ...subtleGlow   }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
