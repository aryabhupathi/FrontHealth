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
import { useAuth } from "../../context/AuthContext";
import { cardHover, subtleGlow } from "../../themes/theme";
export default function DoctorDashboard() {
  const theme = useTheme();
  const { user } = useAuth();
  console.log(user, "ooooooooooooooooo");
  const gradient = (c1: string, c2: string) =>
    `linear-gradient(135deg, ${c1}, ${c2})`;
  const todayAppointments = [
    { patient: "John Doe", dept: "Cardiology", time: "10:00 AM" },
    { patient: "Jane Smith", dept: "Physiotherapy", time: "11:30 AM" },
  ];
  const vitals = [
    { patient: "John Doe", bp: "130/85", hr: "78 bpm", sugar: "95 mg/dL" },
    { patient: "Jane Smith", bp: "120/80", hr: "72 bpm", sugar: "100 mg/dL" },
  ];
  const messages = [
    {
      from: "Nurse Anna",
      msg: "Check lab results for John Doe",
      time: "2 hours ago",
    },
    {
      from: "Admin",
      msg: "New patient case assigned",
      time: "1 day ago",
    },
  ];
  const bills = [
    { patient: "John Doe", amount: "₹1,200", status: "Paid" },
    { patient: "Jane Smith", amount: "₹1,500", status: "Pending" },
  ];
  return (
    <Box p={3}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome, {user?.name}
        </Typography>
        <Typography color="text.secondary">
          Here’s a quick overview of your day.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {[
          {
            title: "Today's Appointments",
            value: todayAppointments.length,
            badge: `Next: ${todayAppointments[0].time}`,
            color: gradient("#2193b0", "#6dd5ed"),
            badgeColor: "info",
          },
          {
            title: "New Patients",
            value: "4 Today",
            badge: "2 Follow-ups",
            color: gradient("#11998e", "#38ef7d"),
            badgeColor: "success",
          },
          {
            title: "Pending Reports",
            value: "3",
            badge: "2 Lab | 1 Scan",
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
                boxShadow: 3,
                ...cardHover,
                ...subtleGlow,
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {item.title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
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
          <Card
            sx={{
              background: gradient("#6a11cb", "#2575fc"),
              color: "#fff",
              textAlign: "center",
              height: "100%",
              ...cardHover,
              ...subtleGlow,
            }}
          >
            <CardContent>
              <Typography variant="h6" color="primary" fontWeight="bold" mb={2}>
                Today’s Appointments
              </Typography>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: theme.palette.primary.light }}
                    >
                      <TableCell>Patient</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todayAppointments.map((a, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{a.patient}</TableCell>
                        <TableCell>{a.dept}</TableCell>
                        <TableCell>
                          <Chip label={a.time} color="info" size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
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
              ...cardHover,
              ...subtleGlow,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Recent Patient Vitals
              </Typography>
              {vitals.map((v, i) => (
                <Box
                  key={i}
                  mt={2}
                  p={1}
                  bgcolor="rgba(255,255,255,0.15)"
                  borderRadius={2}
                >
                  <Typography fontWeight="bold">{v.patient}</Typography>
                  <Typography>BP: {v.bp}</Typography>
                  <Typography>HR: {v.hr}</Typography>
                  <Typography>Sugar: {v.sugar}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              ...cardHover,
              ...subtleGlow,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                color="secondary"
                fontWeight="bold"
                mb={2}
              >
                Billing Overview
              </Typography>
              {bills.map((b, i) => (
                <Box
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  py={1}
                  borderBottom="1px solid"
                  borderColor="divider"
                >
                  <Typography>{b.patient}</Typography>
                  <Chip
                    label={b.status}
                    color={b.status === "Paid" ? "success" : "warning"}
                    size="small"
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              ...cardHover,
              ...subtleGlow,
            }}
          >
            <CardContent>
              <Typography variant="h6" color="error" fontWeight="bold" mb={2}>
                Notifications & Messages
              </Typography>
              {messages.map((m, i) => (
                <Box
                  key={i}
                  mb={2}
                  p={1}
                  borderRadius={2}
                  bgcolor="rgba(255,0,0,0.06)"
                >
                  <Typography>
                    <strong>{m.from}</strong>: {m.msg}
                  </Typography>
                  <Typography className="text-muted" fontSize="13px">
                    {m.time}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
