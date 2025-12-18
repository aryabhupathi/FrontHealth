/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useThemeContext } from "../../context/ThemeContext";
import { getPatientStyles, TypedButton } from "../../themes/theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface IPatient {
  _id?: string;
  fullName: string;
}
interface IDoctor {
  _id?: string;
  fullName: string;
  department?: string;
  workingHours?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  consultationFee?: {
    online?: number;
    inPerson?: number;
  };
}
type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled";
type FormErrors = {
  patient?: string;
  doctor?: string;
  date?: string;
  time?: string;
  appointmentType?: string;
};
interface Appointment {
  _id: string;
  patient?: IPatient;
  doctor?: IDoctor;
  date: string;
  time: string;
  status: AppointmentStatus;
  appointmentType: "Online" | "In-person";
  consultationFee?: number;
}
interface AvailableSlot {
  date: string;
  times: string[];
}
const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [filterDate, setFilterDate] = useState<Dayjs | null>(null);
  const [filterMode, setFilterMode] = useState<string | null>(null);
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterPatient, setFilterPatient] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [availability, setAvailability] = useState<AvailableSlot[]>([]);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    appointmentType: "Online" as "Online" | "In-person",
    consultationFee: 0,
  });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mode } = useThemeContext();
  const styles = getPatientStyles(mode);
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.patient) newErrors.patient = "Patient is required";
    if (!formData.doctor) newErrors.doctor = "Doctor is required";
    if (!selectedDate) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.appointmentType)
      newErrors.appointmentType = "Consultation mode is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apptRes, patientRes, doctorRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACK_URL}/appointment`),
          fetch(`${import.meta.env.VITE_BACK_URL}/patient`),
          fetch(`${import.meta.env.VITE_BACK_URL}/doctor`),
        ]);
        setAppointments(await apptRes.json());
        const p = await patientRes.json();
        setPatients(Array.isArray(p.data) ? p.data : []);
        const d = await doctorRes.json();
        setDoctors(Array.isArray(d) ? d : []);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };
    fetchData();
  }, []);
  const fetchAvailability = async (doctorId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/doctor/${doctorId}/availability`
      );
      const data = await res.json();
      setAvailability(data.availableSlots || []);
    } catch (err) {
      console.error(err);
    }
  };
  const availableDates = availability.map((a) => a.date);
  const timesForDay =
    availability.find(
      (d) => d.date === dayjs(selectedDate).format("YYYY-MM-DD")
    )?.times || [];
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const doctorMatch = !filterDoctor || a.doctor?._id === filterDoctor;
      const patientMatch = !filterPatient || a.patient?._id === filterPatient;
      const dateMatch =
        !filterDate ||
        dayjs(a.date).format("YYYY-MM-DD") === filterDate.format("YYYY-MM-DD");
      const modeMatch = !filterMode || a.appointmentType === filterMode;
      return doctorMatch && patientMatch && dateMatch && modeMatch;
    });
  }, [appointments, filterDoctor, filterPatient, filterDate, filterMode]);
  const totalFiltered = filteredAppointments.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage);
  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(start, start + itemsPerPage);
  }, [filteredAppointments, currentPage]);
  const updateStatus = async (id: string, status: AppointmentStatus) => {
    try {
      await fetch(`${import.meta.env.VITE_BACK_URL}/appointment/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? { ...appt, status } : appt))
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleClear = () => {
    setFilterDate(null);
    setFilterDoctor("");
    setFilterPatient("");
    setFilterMode("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const finalPayload = {
      ...formData,
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      time: selectedTime,
    };
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });
      if (!res.ok) throw new Error("Failed");
      alert("Appointment booked!");
      setOpenDialog(false);
      const fresh = await fetch(
        "`${import.meta.env.VITE_BACK_URL}/appointment"
      );
      setAppointments(await fresh.json());
    } catch (err) {
      console.error(err);
    }
  };
  console.log(paginatedAppointments, "papapappapaapp");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.container}>
        <Typography variant="h5" sx={styles.title}>
          Appointment
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setFilterOpen(!filterOpen)} size="small">
              {filterOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          <TypedButton onClick={() => setOpenDialog(true)}>
            {" "}
            + New Appointment
          </TypedButton>
        </Box>
        <Collapse in={filterOpen} sx={{ py: 1 }}>
          <Box sx={styles.filterBox}>
            <Autocomplete
              options={doctors}
              getOptionLabel={(d) => d.fullName}
              onChange={(_, v) => setFilterDoctor(v?._id || "")}
              renderInput={(p) => (
                <TextField {...p} label="Doctor" size="small" />
              )}
              sx={styles.filterField}
            />
            <Autocomplete
              options={patients}
              getOptionLabel={(p) => p.fullName}
              onChange={(_, v) => setFilterPatient(v?._id || "")}
              renderInput={(p) => (
                <TextField {...p} label="Patient" size="small" />
              )}
              sx={styles.filterField}
            />
            <DatePicker
              label="Select Date"
              value={filterDate}
              onChange={(d) => setFilterDate(d as Dayjs | null)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
              sx={{ minWidth: { sm: 180 } }}
            />
            <Autocomplete
              options={["Online", "In-person"]}
              value={filterMode}
              onChange={(_, value) => setFilterMode(value)}
              size="small"
              sx={styles.filterField}
              renderInput={(params) => <TextField {...params} label="Mode" />}
            />
            <TypedButton btntype="delete" size="small" onClick={handleClear}>
              CLEAR
            </TypedButton>
          </Box>
        </Collapse>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" mb={1}>
          Appointments ({totalFiltered})
        </Typography>
        {isMobile ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}>
            {paginatedAppointments.length === 0 ? (
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                }}
              >
                <Typography color="text.secondary">No appointments</Typography>
              </Paper>
            ) : (
              paginatedAppointments.map((a, i) => {
                const serial = (currentPage - 1) * itemsPerPage + i + 1;
                const date = new Date(a.date).toLocaleDateString();
                const statusColorMap: Record<
                  string,
                  "default" | "success" | "warning" | "error"
                > = {
                  Confirmed: "success",
                  Cancelled: "error",
                  Pending: "warning",
                };
                return (
                  <Paper sx={styles.patientCard}>
                    <Box sx={styles.cardHeader}>
                      <Typography variant="subtitle2" color="text.secondary">
                        #{serial}
                      </Typography>
                      <Box sx={styles.cardActions}>
                        <IconButton
                          disabled={a.status === "Confirmed"}
                          onClick={() => updateStatus(a._id, "Confirmed")}
                          size="small"
                        >
                          <CheckCircleOutlineIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          disabled={a.status === "Cancelled"}
                          onClick={() => updateStatus(a._id, "Cancelled")}
                          size="small"
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={styles.cardContent}>
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          Patient
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {a.patient?.fullName || "—"}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          Doctor
                        </Typography>
                        <Typography variant="body1">
                          {a.doctor?.fullName || "—"}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          Date & Time
                        </Typography>
                        <Typography variant="body1">
                          {date} • {a.time}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                        <Chip
                          label={a.status}
                          size="small"
                          color={statusColorMap[a.status] || "default"}
                          sx={{
                            height: "auto",
                            borderRadius: 1,
                            px: 1,
                            py: 0.25,
                          }}
                        />
                      </div>
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          Mode
                        </Typography>
                        <Typography variant="body1">
                          {a.appointmentType || "—"}
                        </Typography>
                      </div>
                    </Box>
                  </Paper>
                );
              })
            )}
          </Box>
        ) : (
          <Paper>
            <Table>
              <TableHead sx={styles.tableHead}>
                <TableRow
                  sx={{
                    "& .MuiTableCell-root": {
                      py: 1,
                      height: 24,
                    },
                  }}
                >
                  <TableCell>Id</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedAppointments.length ? (
                  paginatedAppointments.map((a, i) => (
                    <TableRow
                      key={a._id}
                      sx={{
                        "& .MuiTableCell-root": {
                          py: 0.3,
                          height: 24,
                        },
                      }}
                    >
                      <TableCell>
                        {(currentPage - 1) * itemsPerPage + i + 1}
                      </TableCell>
                      <TableCell>{a.patient?.fullName}</TableCell>
                      <TableCell>{a.doctor?.fullName}</TableCell>
                      <TableCell>
                        {new Date(a.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{a.time}</TableCell>
                      <TableCell>{a.status}</TableCell>
                      <TableCell>{a.appointmentType}</TableCell>
                      <TableCell>
                        <IconButton
                          disabled={a.status === "Confirmed"}
                          onClick={() => updateStatus(a._id, "Confirmed")}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          disabled={a.status === "Cancelled"}
                          onClick={() => updateStatus(a._id, "Cancelled")}
                        >
                          <CancelIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No appointments
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
        <Box sx={styles.paginationBox}>
          <Typography variant="body2">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalFiltered)} of{" "}
            {totalFiltered}
          </Typography>
          <Box>
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </Button>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle sx={{ justifyContent: "center", display: "flex" }}>
            New Appointment
          </DialogTitle>
          <DialogContent dividers>
            <Box component="form" onSubmit={handleSubmit}>
              <Autocomplete
                options={patients}
                getOptionLabel={(p) => p.fullName}
                onChange={(_, v) =>
                  setFormData({ ...formData, patient: v?._id || "" })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Patient"
                    margin="dense"
                    error={!!errors.patient}
                    helperText={errors.patient}
                  />
                )}
                sx={styles.filterField}
              />
              <Autocomplete
                options={doctors}
                getOptionLabel={(d) => d.fullName}
                onChange={(_, v) => {
                  setSelectedDoctor(v);
                  const fee =
                    formData.appointmentType === "Online"
                      ? v?.consultationFee?.online
                      : v?.consultationFee?.inPerson;
                  setFormData({
                    ...formData,
                    doctor: v?._id || "",
                    consultationFee: fee ?? 0,
                  });
                  if (v?._id) fetchAvailability(v._id);
                  setSelectedDate(null);
                  setSelectedTime("");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Doctor"
                    margin="dense"
                    error={!!errors.doctor}
                    helperText={errors.doctor}
                  />
                )}
              />
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(d) => {
                  setSelectedDate(d as Dayjs | null);
                  setSelectedTime("");
                }}
                shouldDisableDate={(day) => {
                  const str = dayjs(day).format("YYYY-MM-DD");
                  return !availableDates.includes(str);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: !!errors.date,
                    helperText: errors.date,
                  },
                }}
                sx={{ minWidth: { sm: 180 } }}
              />
              {selectedDate && (
                <>
                  <Typography mb={1}>Available Times:</Typography>
                  <Grid container spacing={1}>
                    {timesForDay.map((t) => (
                      <Grid key={t}>
                        <Button
                          variant={
                            selectedTime === t ? "contained" : "outlined"
                          }
                          onClick={() => {
                            setSelectedTime(t);
                            setFormData({ ...formData, time: t });
                          }}
                        >
                          {t}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
              {errors.time && (
                <Typography color="error" variant="caption">
                  {errors.time}
                </Typography>
              )}
              <FormControl fullWidth margin="dense" size="small">
                <InputLabel>Consultation Mode</InputLabel>
                <Select
                  value={formData.appointmentType}
                  label="Consultation Mode"
                  onChange={(e) => {
                    const mode = e.target.value as "Online" | "In-person";
                    const fee = selectedDoctor
                      ? mode === "Online"
                        ? selectedDoctor.consultationFee?.online
                        : selectedDoctor.consultationFee?.inPerson
                      : 0;
                    setFormData({
                      ...formData,
                      appointmentType: mode,
                      consultationFee: fee ?? 0,
                    });
                  }}
                >
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="In-person">In-person</MenuItem>
                </Select>
                {errors.appointmentType && (
                  <Typography color="error" variant="caption">
                    {errors.appointmentType}
                  </Typography>
                )}
              </FormControl>
              <TextField
                label="Consultation Fee (₹)"
                type="number"
                fullWidth
                margin="dense"
                value={formData.consultationFee}
                disabled
              />
              <DialogActions sx={{ mt: 2 }}>
                <Button color="error" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Book
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};
export default Appointments;
