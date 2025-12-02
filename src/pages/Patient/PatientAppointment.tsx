/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  useMediaQuery,
  Autocomplete,
  TextField,
  Collapse,
  IconButton,
} from "@mui/material";
import BookAppointment from "../../components/BookAppointment";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useThemeContext } from "../../context/ThemeContext";
import { getPatientStyles, TypedButton } from "../../themes/theme";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Doctor {
  _id: string;
  fullName: string;
}
interface Prescription {
  _id: string;
  diagnosis: string;
  advice?: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
  }[];
}
interface Appointment {
  _id: string;
  doctor: Doctor;
  date: string;
  time: string;
  reason: string;
  status: string;
  prescription?: Prescription | null;
}
const PatientAppointment = ({ patientId }: { patientId: string }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const { mode } = useThemeContext();
  const styles = getPatientStyles(mode);
  const isMobile = useMediaQuery("(max-width:700px)");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterDoctor, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    setCurrentPage(1);
  }, [filterDoctor, filterDate, filterStatus]);
  const filteredAppointments = appointments.filter((a) => {
    const matchesDoctor =
      filterDoctor.trim() === "" ||
      a.doctor?.fullName.toLowerCase().includes(filterDoctor.toLowerCase());
    const matchesDate = filterDate === "" || a.date === filterDate;
    const matchesStatus = filterStatus === "" || a.status === filterStatus;
    return matchesDoctor && matchesDate && matchesStatus;
  });
  useEffect(() => {
    if (!patientId) return;
    const fetchData = async () => {
      try {
        const [appointmentsRes, prescriptionsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACK_URL}/appointment/patient/${patientId}`),
          fetch(`${import.meta.env.VITE_BACK_URL}/prescription/patient/${patientId}`),
        ]);
        const appointmentsData = await appointmentsRes.json();
        const prescriptionsData = await prescriptionsRes.json();
        const merged = appointmentsData.map((apt: Appointment) => {
          const found = prescriptionsData.find(
            (p: any) => p.appointment._id === apt._id
          );
          return { ...apt, prescription: found || null };
        });
        setAppointments(merged);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [patientId]);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginateditems = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleOpenPrescription = (p: Prescription) => {
    setSelectedPrescription(p);
  };
  return (
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        My Appointments
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Filters</Typography>
          <IconButton
            onClick={() => setFilterOpen((prev) => !prev)}
            size="small"
          >
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <TypedButton btntype="primary" onClick={() => setShowBooking(true)}>
          + Book Appointmnet
        </TypedButton>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <Box sx={styles.filterBox}>
          <Autocomplete
            options={[...new Set(appointments.map((a) => a.doctor.fullName))]}
            value={filterDoctor}
            onInputChange={(_, value) => setSearchName(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Doctor Name"
                size="small"
              />
            )}
            sx={styles.filterField}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <DatePicker
  label="Select Date"
  value={filterDate ? dayjs(filterDate) : null}
  onChange={(newValue) => {
    setFilterDate(newValue ? newValue.format("YYYY-MM-DD") : "");
  }}
  slotProps={{
    textField: {
      size: "small",
    },
  }}
/> */}
<DatePicker
  label="Select Date"
  value={filterDate ? dayjs(filterDate) : null}
  onChange={(newValue) => {
    if (!newValue) {
      setFilterDate("");
      return;
    }

    // Ensure the value is Dayjs before calling .format()
    if (dayjs.isDayjs(newValue)) {
      setFilterDate(newValue.format("YYYY-MM-DD"));
    } else {
      // If newValue is a Date fallback
      setFilterDate(dayjs(newValue).format("YYYY-MM-DD"));
    }
  }}
  slotProps={{
    textField: {
      size: "small",
    },
  }}
/>

</LocalizationProvider>

          <Autocomplete
            options={["Pending", "Approved", "Completed", "Cancelled"]}
            value={filterStatus || ""}
            onChange={(_, value) => setFilterStatus(value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Status" size="small" fullWidth />
            )}
            sx={styles.filterField}
          /><TypedButton
  btntype="delete"
  size="small"
  onClick={() => {
    setFilterDate("");
    setFilterStatus("");
    setSearchName("");
  }}
>
  Clear
</TypedButton>

        </Box>
      </Collapse>
      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {paginateditems.length ? (
            paginateditems.map((a) => (
              <Card key={a._id} sx={styles.patientCard} >
                <CardContent sx={styles.cardContent}>
                  <Typography variant="h6" fontWeight={600}>
                    {a.doctor?.fullName}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>
                    <strong>Date:</strong> {a.date}
                  </Typography>
                  <Typography>
                    <strong>Time:</strong> {a.time}
                  </Typography>
                  <Typography>
                    <strong>Reason:</strong> {a.reason}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {a.status}
                  </Typography>
                  <Box mt={1}>
                    {a.prescription ? (
                      <TypedButton btntype="secondary"
                        onClick={() => handleOpenPrescription(a.prescription!)}
                      >
                        View Prescription
                      </TypedButton>
                    ) : (
                      <Typography color="text.secondary">
                        No Prescription
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography align="center" mt={4}>
              No appointments found
            </Typography>
          )}
        </Box>
      ) : (
        <Box>
          <Paper sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead sx={styles.tableHead}>
                <TableRow sx={{
                  "& .MuiTableCell-root": {
                    py: 1,
                    height: 24,
                  },
                }}>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Prescription</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginateditems.length ? (
                  paginateditems.map((a) => (
                    <TableRow key={a._id} sx={{
                  "& .MuiTableCell-root": {
                    py: 1,
                    height: 24,
                  },
                }}>
                      <TableCell>{a.doctor?.fullName}</TableCell>
                      <TableCell>{a.date}</TableCell>
                      <TableCell>{a.time}</TableCell>
                      <TableCell>{a.reason}</TableCell>
                      <TableCell>{a.status}</TableCell>
                      <TableCell>
                        {a.prescription ? (
                         <TypedButton btntype="secondary"
                            onClick={() =>
                              handleOpenPrescription(a.prescription!)
                            }
                            size="small"
                          >
                            View
                          </TypedButton>
                        ) : (
                          <Typography color="text.secondary">
                            Not issued
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No appointments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}
      <Box sx={styles.paginationBox} mt={2}>
        <Typography variant="body2">
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of{" "}
          {filteredAppointments.length}
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <Button
            variant="outlined"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
      <Dialog
        open={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ justifyContent: "center", display: "flex" }}>Prescription Details</DialogTitle>
        <DialogContent dividers>
          {selectedPrescription && (
            <>
              <Typography>
                <strong>Diagnosis:</strong> {selectedPrescription.diagnosis}
              </Typography>
              {selectedPrescription.advice && (
                <Typography sx={{ mt: 1 }}>
                  <strong>Advice:</strong> {selectedPrescription.advice}
                </Typography>
              )}
              <Typography mt={2} variant="h6">
                Medicines
              </Typography>
              <Paper>
                <Table size="small">
                  <TableHead sx={styles.tableHead}>
                    <TableRow sx={{
                      "& .MuiTableCell-root": {
                        py: 0.3,
                        height: 24,
                      },
                    }}>
                      <TableCell>Name</TableCell>
                      <TableCell>Dosage</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPrescription.medicines.map((m, i) => (
                      <TableRow key={i} sx={{
                      "& .MuiTableCell-root": {
                        py: 1,
                        height: 24,
                      },
                    }}>
                        <TableCell>{m.name}</TableCell>
                        <TableCell>{m.dosage}</TableCell>
                        <TableCell>{m.frequency}</TableCell>
                        <TableCell>{m.duration}</TableCell>
                        <TableCell>{m.notes || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <TypedButton btntype="delete" onClick={() => setSelectedPrescription(null)}>Close</TypedButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showBooking}
        onClose={() => setShowBooking(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ justifyContent: "center", display: "flex" }}>Book Appointment</DialogTitle>
        <DialogContent dividers>
          <BookAppointment
            patientId={patientId}
            onSuccess={() => {
              setShowBooking(false);
              fetch(`${import.meta.env.VITE_BACK_URL}/appointment/patient/${patientId}`)
                .then((r) => r.json())
                .then((d) => setAppointments(d));
            }}
            onCancel={() => setShowBooking(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default PatientAppointment;
