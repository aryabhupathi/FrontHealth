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
const AdminDashboard = () => {
  const theme = useTheme();
  const gradient = (color1: string, color2: string) =>
    `linear-gradient(135deg, ${color1}, ${color2})`;
  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {[
          {
            title: "Patients Today",
            value: "120",
            color: gradient("#43cea2", "#185a9d"),
            textColor: "#fff",
          },
          {
            title: "Appointments",
            value: "75",
            color: gradient("#2193b0", "#6dd5ed"),
            textColor: "#fff",
          },
          {
            title: "Doctors on Duty",
            value: "18",
            color: gradient("#ff758c", "#ff7eb3"),
            textColor: "#fff",
          },
          {
            title: "Revenue",
            value: "₹2,45K",
            color: gradient("#f7971e", "#ffd200"),
            textColor: "#fff",
          },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <Card
              sx={{
                background: stat.color,
                color: stat.textColor,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 3, ...cardHover, ...subtleGlow
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              background: gradient("#6a11cb", "#2575fc"),
              color: "#fff",
              textAlign: "center", ...cardHover, ...subtleGlow 
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                User Feedback
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                98%
              </Typography>
              <Chip label="Excellent" color="success" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              background: gradient("#fceabb", "#f8b500"),
              color: "#000",
              textAlign: "center", ...cardHover, ...subtleGlow 
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Avg. Wait Time
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                8 min
              </Typography>
              <Chip label="Low" color="warning" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              background: gradient("#11998e", "#38ef7d"),
              color: "#fff",
              textAlign: "center", ...cardHover, ...subtleGlow 
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                System Health
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                Optimal
              </Typography>
              <Chip label="Active" color="info" sx={{ mt: 1, color: "#000" }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ borderRadius: 3, height: "100%", ...cardHover, ...subtleGlow  }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary" mb={2}>
                Hospital Calendar
              </Typography>
              <Box
                sx={{
                  height: 220,
                  bgcolor: theme.palette.action.hover,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                }}
              >
                📅 [Calendar Widget Placeholder]
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ borderRadius: 3, height: "100%", ...cardHover, ...subtleGlow  }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="error" mb={2}>
                Low Stock Alerts
              </Typography>
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={1}
                  borderBottom="1px solid"
                  borderColor="divider"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip label="!" color="error" size="small" />
                    <Typography>Paracetamol</Typography>
                  </Box>
                  <Typography color="error.main" fontWeight="bold">
                    5 left
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={1}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip label="!" color="warning" size="small" />
                    <Typography>Insulin</Typography>
                  </Box>
                  <Typography color="warning.main" fontWeight="bold">
                    12 left
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ borderRadius: 3, height: "100%", ...cardHover, ...subtleGlow  }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="success.main"
                mb={2}
              >
                Recent Patients
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow
                    sx={{ backgroundColor: theme.palette.success.light }}
                  >
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Department</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover>
                    <TableCell>Rahul Sharma</TableCell>
                    <TableCell>35</TableCell>
                    <TableCell>
                      <Chip label="Cardiology" color="success" size="small" />
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Anita Desai</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>
                      <Chip label="Neurology" color="info" size="small" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ borderRadius: 3, height: "100%", ...cardHover, ...subtleGlow  }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="warning.main"
                mb={2}
              >
                Pending Bills
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow
                    sx={{ backgroundColor: theme.palette.warning.light }}
                  >
                    <TableCell>Patient</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover>
                    <TableCell>Ravi Kumar</TableCell>
                    <TableCell>₹5,000</TableCell>
                    <TableCell>
                      <Chip label="Unpaid" color="error" size="small" />
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell>Sunita Patel</TableCell>
                    <TableCell>₹12,000</TableCell>
                    <TableCell>
                      <Chip label="Insurance" color="warning" size="small" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AdminDashboard;

