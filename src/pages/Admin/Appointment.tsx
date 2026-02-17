/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
  Paper,
  Table,
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
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AddButton,
  AutoText,
  CardActions,
  CardContentBox,
  CardHeaderBox,
  DefaultButton,
  DeleteButton,
  FilterAutocomplete,
  FilterWrapper,
  PageTitle,
  PaginationBox,
  PatientCard,
  PatientContainer,
  PatientTableHead,
  SaveButton,
} from "../../components/styledcomp";
import useDebounce from "../../components/Debounce";
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
type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Rescheduled"
  | "Cancelled"
  | "Completed";

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
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [availability, setAvailability] = useState<AvailableSlot[]>([]);
  const [filter, setFilter] = useState({
    patient: "",
    doctor: "",
    mode: "",
    date: "",
  });
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    appointmentType: "Online" as "Online" | "In-person",
    consultationFee: 0,
  });
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
const [rescheduleAppt, setRescheduleAppt] = useState<Appointment | null>(null);
const [rescheduleDate, setRescheduleDate] = useState<Dayjs | null>(null);
const [rescheduleTime, setRescheduleTime] = useState("");

  const isMobile = useMediaQuery("(max-width: 900px)");
  const debouncedPatient = useDebounce(filter.patient, 400);
  const debouncedDoctor = useDebounce(filter.doctor, 400);
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
  const openReschedule = (appt: Appointment) => {
  setRescheduleAppt(appt);
  setSelectedDoctor(appt.doctor);
  setRescheduleDate(null);
  setRescheduleTime("");
  setRescheduleOpen(true);

  if (appt.doctor?._id) {
    fetchAvailability(appt.doctor._id);
  }
};

const handleAdminReschedule = async () => {
  if (!rescheduleAppt || !rescheduleDate || !rescheduleTime) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACK_URL}/appointment/reschedule/${rescheduleAppt._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dayjs(rescheduleDate).format("YYYY-MM-DD"),
          time: rescheduleTime,
          status: "Rescheduled",
          rescheduledBy: "admin", // backend can infer from auth
        }),
      }
    );

    if (!res.ok) throw new Error("Failed to reschedule");

    setAppointments((prev) =>
      prev.map((a) =>
        a._id === rescheduleAppt._id
          ? {
              ...a,
              date: dayjs(rescheduleDate).toISOString(),
              time: rescheduleTime,
              status: "Rescheduled",
            }
          : a
      )
    );

    setRescheduleOpen(false);
  } catch (err) {
    alert("Reschedule failed");
  }
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
      const doctorMatch = !debouncedDoctor || a.doctor?._id === debouncedDoctor;
      const patientMatch =
        !debouncedPatient || a.patient?._id === debouncedPatient;
      const dateMatch =
        !filter.date || dayjs(a.date).format("YYYY-MM-DD") === filter.date;
      const modeMatch = !filter.mode || a.appointmentType === filter.mode;
      return doctorMatch && patientMatch && dateMatch && modeMatch;
    });
  }, [
    appointments,
    debouncedDoctor,
    debouncedPatient,
    filter.date,
    filter.mode,
  ]);
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
    setFilter({ patient: "", doctor: "", date: "", mode: "" });
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
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PatientContainer>
        <PageTitle variant="h5">Appointment</PageTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setFilterOpen(!filterOpen)} size="small">
              {filterOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          <AddButton onClick={() => setOpenDialog(true)}>
            + New Appointment
          </AddButton>
        </Box>
        <Collapse in={filterOpen} sx={{ py: 1 }}>
          <FilterWrapper>
            <FilterAutocomplete
              options={[...new Set(doctors.map((p) => p.fullName))]}
              value={filter.doctor}
              onChange={(_, value) =>
                setFilter((f) => ({ ...f, doctor: value || "" }))
              }
              renderInput={(p) => (
                <AutoText {...p} label="Doctor" size="small" />
              )}
            />
            <FilterAutocomplete
              options={[...new Set(patients.map((p) => p.fullName))]}
              value={filter.patient}
              onChange={(_, value) =>
                setFilter((f) => ({ ...f, patient: value || "" }))
              }
              renderInput={(p) => (
                <AutoText {...p} label="Patient" size="small" />
              )}
            />
            <DatePicker
              label="Select Date"
              value={filter.date ? dayjs(filter.date) : null}
              onChange={(d) =>
                setFilter((f) => ({
                  ...f,
                  date: d ? dayjs(d).format("YYYY-MM-DD") : "",
                }))
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
            <FilterAutocomplete
              options={["Online", "In-person"]}
              value={filter.mode || null}
              onChange={(_, value) =>
                setFilter((f) => ({ ...f, mode: value || "" }))
              }
              renderInput={(params) => (
                <AutoText {...params} label="Mode" size="small" />
              )}
            />
            <DeleteButton
              sx={{
                mt: { xs: 0.5, md: 0 },
                width: { xs: "100%", md: "auto" },
              }}
              size="small"
              onClick={handleClear}
            >
              CLEAR
            </DeleteButton>
          </FilterWrapper>
        </Collapse>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" mb={1}>
          Appointments ({totalFiltered})
        </Typography>
        {isMobile ? (
          <Box>
            {paginatedAppointments.length === 0 ? (
              <Typography align="center" color="text.secondary" py={3}>
                No Appointments found
              </Typography>
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
                  <PatientCard>
                    <CardHeaderBox>
                      <Typography variant="subtitle2" color="text.secondary">
                        #{serial}
                      </Typography>
                      <CardActions>
                        <SaveButton
                          disabled={a.status === "Confirmed" || a.status === "Completed"}
                          onClick={() => updateStatus(a._id, "Confirmed")}
                          size="small"
                        >
                          {/* <CheckCircleOutlineIcon fontSize="small" /> */}
                          confirm
                        </SaveButton>
                        <DeleteButton
                          disabled={a.status === "Cancelled" || a.status === "Completed"}
                          onClick={() => updateStatus(a._id, "Cancelled")}
                          size="small"
                        >
                          {/* <CancelIcon fontSize="small" /> */}
                          cancel
                        </DeleteButton>
                        <DefaultButton
  size="small"
  onClick={() => openReschedule(a)}
  disabled={a.status === "Completed" || a.status === "Cancelled"}
>
  Reschedule
</DefaultButton>

                      </CardActions>
                    </CardHeaderBox>
                    <CardContentBox>
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
                    </CardContentBox>
                  </PatientCard>
                );
              })
            )}
          </Box>
        ) : (
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              overflow: "auto",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Table>
              <PatientTableHead>
                <TableRow
                  sx={{
                    backgroundColor: "action.hover",
                    "& th": {
                      fontWeight: 600,
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
              </PatientTableHead>
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
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            color="success"
                            sx={{ minWidth: 0 }}
                            disabled={a.status === "Confirmed" || a.status === "Completed"}
                            onClick={() => updateStatus(a._id, "Confirmed")}
                            size="small"
                          >
                            {/* <CheckCircleOutlineIcon /> */}
                            confirm
                          </Button>
                          <Button
                            color="error"
                            sx={{ minWidth: 0 }}
                            disabled={a.status === "Cancelled" || a.status === "Completed"}
                            onClick={() => updateStatus(a._id, "Cancelled")}
                            size="small"
                          >
                            {/* <CancelIcon /> */}
                            cancel
                          </Button>
                          <Button
  size="small"
  onClick={() => openReschedule(a)}
  disabled={a.status === "Completed" || a.status === "Cancelled"}
>
  Reschedule
</Button>

                        </Box>
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
        <PaginationBox>
          <Typography variant="body2">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalFiltered)} of{" "}
            {totalFiltered}
          </Typography>
          <Box>
            <DefaultButton
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <Typography variant="body2">Prev</Typography>
            </DefaultButton>
            <DefaultButton
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <Typography variant="body2">Next</Typography>
            </DefaultButton>
          </Box>
        </PaginationBox>
        <Dialog open={rescheduleOpen} onClose={() => setRescheduleOpen(false)}>
  <DialogTitle align="center">Reschedule Appointment</DialogTitle>

  <DialogContent dividers>
    <DatePicker
      label="New Date"
      value={rescheduleDate}
      onChange={(d) => {
        setRescheduleDate(d);
        setRescheduleTime("");
      }}
      shouldDisableDate={(d) =>
        !availableDates.includes(dayjs(d).format("YYYY-MM-DD"))
      }
    />

    {rescheduleDate && (
      <>
        <Typography mt={2}>Available Time Slots</Typography>
        <Grid container spacing={1}>
          {availability
            .find(
              (a) =>
                a.date === dayjs(rescheduleDate).format("YYYY-MM-DD")
            )
            ?.times.map((t) => (
              <Grid key={t}>
                <DefaultButton
                  variant={rescheduleTime === t ? "contained" : "outlined"}
                  onClick={() => setRescheduleTime(t)}
                >
                  {t}
                </DefaultButton>
              </Grid>
            ))}
        </Grid>
      </>
    )}
  </DialogContent>

  <DialogActions>
    <DeleteButton onClick={() => setRescheduleOpen(false)}>
      Cancel
    </DeleteButton>
    <SaveButton
      disabled={!rescheduleDate || !rescheduleTime}
      onClick={async () => {
        await handleAdminReschedule();
      }}
    >
      Confirm
    </SaveButton>
  </DialogActions>
</Dialog>

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
                    size="small"
                    error={!!errors.patient}
                    helperText={errors.patient}
                  />
                )}
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
                    size="small"
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
                        <DefaultButton
                          variant={
                            selectedTime === t ? "contained" : "outlined"
                          }
                          onClick={() => {
                            setSelectedTime(t);
                            setFormData({ ...formData, time: t });
                          }}
                        >
                          {t}
                        </DefaultButton>
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
                  size="small"
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
                size="small"
                fullWidth
                margin="dense"
                value={formData.consultationFee}
                disabled
              />
              <DialogActions sx={{ mt: 2 }}>
                <DeleteButton
                  color="error"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </DeleteButton>
                <SaveButton type="submit">Book</SaveButton>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
        
      </PatientContainer>
    </LocalizationProvider>
  );
};
export default Appointments;
