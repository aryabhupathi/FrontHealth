/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Grid,
  Typography,
  Chip,
  Table,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  DashboardContainer,
  StatCard,
  GlassCard,
  GlassCardContent,
  SectionTitle,
  CalendarBox,
  RowItem,
  MobileMiniCard,
  SuccessTableHead,
  WarningTableHead,
} from "../../components/styledcomp";
const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const gradient = (c1: string, c2: string) =>
    `linear-gradient(135deg, ${c1}, ${c2})`;
  const stats = [
    {
      title: "Patients today",
      value: "120",
      color: gradient("#43cea2", "#185a9d"),
    },
    {
      title: "Appointments",
      value: "75",
      color: gradient("#2193b0", "#6dd5ed"),
    },
    {
      title: "Doctors on duty",
      value: "18",
      color: gradient("#ff758c", "#ff7eb3"),
    },
    {
      title: "Revenue",
      value: "₹2,45K",
      color: gradient("#f7971e", "#ffd200"),
    },
  ];
  const recentPatients = [
    { name: "Rahul Sharma", age: 35, dept: "Cardiology", color: "success" },
    { name: "Anita Desai", age: 42, dept: "Neurology", color: "info" },
  ];
  const pendingBills = [
    {
      patient: "Ravi Kumar",
      amount: "₹5,000",
      status: "Unpaid",
      color: "error",
    },
    {
      patient: "Sunita Patel",
      amount: "₹12,000",
      status: "Insurance",
      color: "warning",
    },
  ];
  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {stats.map((s, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard gradient={s.color}>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, textTransform: "uppercase" }}
              >
                {s.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {s.value}
              </Typography>
            </StatCard>
          </Grid>
        ))}
        <Grid size={{ xs: 12, lg: 8 }}>
          <GlassCard>
            <GlassCardContent>
              <SectionTitle variant="h6">Hospital calendar</SectionTitle>
              <CalendarBox>📅 Calendar widget placeholder</CalendarBox>
            </GlassCardContent>
          </GlassCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <GlassCard>
            <GlassCardContent>
              <SectionTitle variant="h6" color="error.main">
                Low stock alerts
              </SectionTitle>
              {[
                { name: "Paracetamol", qty: "5 left", color: "error" },
                { name: "Insulin", qty: "12 left", color: "warning" },
              ].map((i, k) => (
                <RowItem key={k}>
                  <Box display="flex" gap={1} alignItems="center">
                    <Chip label="!" color={i.color as any} size="small" />
                    <Typography>{i.name}</Typography>
                  </Box>
                  <Typography color={`${i.color}.main`} fontWeight="bold">
                    {i.qty}
                  </Typography>
                </RowItem>
              ))}
            </GlassCardContent>
          </GlassCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <GlassCard>
            <GlassCardContent>
              <SectionTitle variant="h6" color="success.main">
                Recent patients
              </SectionTitle>
              {isMobile ? (
                recentPatients.map((p, i) => (
                  <MobileMiniCard key={i}>
                    <GlassCardContent>
                      <Typography fontWeight="bold">{p.name}</Typography>
                      <Typography color="text.secondary">
                        Age: {p.age}
                      </Typography>
                      <Chip
                        label={p.dept}
                        color={p.color as any}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </GlassCardContent>
                  </MobileMiniCard>
                ))
              ) : (
                <Table size="small">
                  <SuccessTableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Department</TableCell>
                    </TableRow>
                  </SuccessTableHead>
                  <TableBody>
                    {recentPatients.map((p, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.age}</TableCell>
                        <TableCell>
                          <Chip
                            label={p.dept}
                            color={p.color as any}
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
        <Grid size={{ xs: 12, lg: 6 }}>
          <GlassCard>
            <GlassCardContent>
              <SectionTitle variant="h6" color="warning.main">
                Pending bills
              </SectionTitle>
              {isMobile ? (
                pendingBills.map((b, i) => (
                  <MobileMiniCard key={i}>
                    <GlassCardContent>
                      <Typography fontWeight="bold">{b.patient}</Typography>
                      <Typography color="text.secondary">
                        Amount: {b.amount}
                      </Typography>
                      <Chip
                        label={b.status}
                        color={b.color as any}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </GlassCardContent>
                  </MobileMiniCard>
                ))
              ) : (
                <Table size="small">
                  <WarningTableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </WarningTableHead>
                  <TableBody>
                    {pendingBills.map((b, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{b.patient}</TableCell>
                        <TableCell>{b.amount}</TableCell>
                        <TableCell>
                          <Chip
                            label={b.status}
                            color={b.color as any}
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
      </Grid>
    </DashboardContainer>
  );
};
export default AdminDashboard;
