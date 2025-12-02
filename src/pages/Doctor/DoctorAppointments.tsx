/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Autocomplete,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  useMediaQuery
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useDebounce from "../../components/Debounce";
import { useThemeContext } from "../../context/ThemeContext";
import { getPatientStyles, TypedButton } from "../../themes/theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
interface PatientData {
  _id: string;
  fullName: string;
  conditions?: string[];
}
interface Appointment {
  _id: string;
  patient: PatientData;
  date: string;
  time: string;
  reason: string;
  status: string;
}
interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}
const DoctorAppointments = ({ doctorId }: { doctorId: string }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filtered, setFiltered] = useState<Appointment[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [condition, setCondition] = useState("");
  const debouncedName = useDebounce(searchName, 350);
  const debouncedCondition = useDebounce(condition, 350);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [viewPrescription, setViewPrescription] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: "", dosage: "", frequency: "", duration: "" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { mode } = useThemeContext();
  const styles = getPatientStyles(mode);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, appointmentDate, condition]);
  useEffect(() => {
    if (!doctorId) return;
    fetch(`${import.meta.env.VITE_BACK_URL}/appointment/doctor/${doctorId}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setFiltered(data);
      })
      .catch(console.error);
  }, [doctorId]);
  useEffect(() => {
    let data = [...appointments];
    if (debouncedName.trim()) {
      data = data.filter((a) =>
        a.patient.fullName.toLowerCase().includes(debouncedName.toLowerCase())
      );
    }
    if (appointmentDate) {
      data = data.filter((a) => a.date === appointmentDate);
    }
    if (debouncedCondition) {
      data = data.filter((a) =>
        a.patient.conditions?.includes(debouncedCondition)
      );
    }
    setFiltered(data);
    setCurrentPage(1);
  }, [debouncedName, appointmentDate, debouncedCondition, appointments]);
  const conditionOptions = [
    ...new Set(appointments.flatMap((a) => a.patient.conditions || [])),
  ];
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginateditems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleMedicineChange = (
    index: number,
    field: keyof Medicine,
    value: string
  ) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };
  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", frequency: "", duration: "" },
    ]);
  };
  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };
  const handleSavePrescription = () => {
    alert("Prescription Saved!");
    setShowModal(false);
  };
  const fetchPrescription = async (appointmentId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/prescription/appointment/${appointmentId}`
      );
      const data = await res.json();
      if (res.ok) setViewPrescription(data);
      else alert(data.error || "No prescription found");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        My Appointments
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6">Filters</Typography>
        <IconButton size="small" onClick={() => setFilterOpen((p) => !p)}>
          {filterOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <Box sx={styles.filterBox}>
          <Autocomplete
            options={[...new Set(appointments.map((a) => a.patient.fullName))]}
            value={searchName}
            onInputChange={(_, v) => setSearchName(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Patient Name"
                size="small"
                fullWidth
                sx={{ minWidth: { sm: 180 } }}
              />
            )}
            sx={styles.filterField}
            size="small"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Appointment Date"
              value={appointmentDate ? new Date(appointmentDate) : null}
              onChange={(newValue) => {
                setAppointmentDate(
                  newValue ? newValue.toISOString().split("T")[0] : ""
                );
              }}
              slotProps={{
                textField: {
                  margin: "dense",
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>
          <Autocomplete
            options={conditionOptions}
            value={condition}
            onChange={(_, v) => setCondition(v || "")}
            renderInput={(params) => (
              <TextField {...params} label="Condition" size="small" />
            )}
            fullWidth
            size="small"
            sx={styles.filterField}
          />
          <TypedButton
            btntype="delete"
            size="small"
            onClick={() => {
              setSearchName("");
              setAppointmentDate("");
              setCondition("");
            }}
          >
            Clear
          </TypedButton>
        </Box>
      </Collapse>
      {!isMobile ? (
        <Paper>
          <Table>
            <TableHead sx={styles.tableHead}>
              <TableRow
                sx={{
                  "& .MuiTableCell-root": {
                    py: 0.3,
                    height: 24,
                  },
                }}
              >
                <TableCell>Patient</TableCell>
                <TableCell>Conditions</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Prescription</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginateditems.length ? (
                paginateditems.map((a) => (
                  <TableRow
                    hover
                    key={a._id}
                    sx={{
                      "& .MuiTableCell-root": {
                        py: 1,
                        height: 24,
                      },
                    }}
                  >
                    <TableCell>{a.patient.fullName}</TableCell>
                    <TableCell>
                      {a.patient.conditions?.map((c, i) => (
                        <Chip key={i} label={c} size="small" sx={{ mr: 0.5 }} />
                      ))}
                    </TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={a.status}
                        color={
                          a.status === "Completed"
                            ? "success"
                            : a.status === "Pending"
                            ? "warning"
                            : "default"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {a.status !== "Completed" ? (
                        <TypedButton
                          btntype="primary"
                          onClick={() => {
                            setSelectedAppointment(a);
                            setShowModal(true);
                          }}
                        >
                          Add Prescription
                        </TypedButton>
                      ) : (
                        <TypedButton
                          btntype="secondary"
                          onClick={() => fetchPrescription(a._id)}
                        >
                          View Prescription
                        </TypedButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No appointments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {paginateditems.map((a) => (
            <Paper key={a._id} sx={styles.patientCard}>
              <Box sx={styles.cardHeader}>
                <Typography variant="h6">{a.patient.fullName}</Typography>
              </Box>
              <Box sx={styles.cardContent}>
                <Typography>
                  <strong>Date:</strong> {a.date}
                </Typography>
                <Typography>
                  <strong>Time:</strong> {a.time}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Conditions:</strong>
                </Typography>
                {a.patient.conditions?.map((c, i) => (
                  <Chip key={i} label={c} size="small" sx={{ mr: 0.5 }} />
                ))}
                <Box mt={1}>
                  <Chip
                    label={a.status}
                    color={
                      a.status === "Completed"
                        ? "success"
                        : a.status === "Pending"
                        ? "warning"
                        : "default"
                    }
                  />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
      <Box sx={styles.paginationBox} mt={2}>
        <Typography variant="body2">
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, paginateditems.length)} of{" "}
          {paginateditems.length}
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
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Prescription for {selectedAppointment?.patient.fullName}
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => setShowModal(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Diagnosis *"
            multiline
            rows={2}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            sx={{ my: 1 }}
            size="small"
          />
          <TextField
            fullWidth
            label="Doctor's Advice"
            multiline
            rows={2}
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            sx={{ my: 1 }}
            size="small"
          />
          <Typography variant="subtitle1" mt={2}>
            Medicines
          </Typography>
          {medicines.map((m, index) => (
            <>
              <Typography variant="subtitle1" fontWeight="600">
                Medicine {index + 1}
              </Typography>
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Grid container spacing={2} sx={{ flex: 1 }}>
                  {["name", "dosage", "frequency", "duration"].map((field) => (
                    <Grid key={field} size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label={field.toUpperCase()}
                        value={(m as any)[field]}
                        size="small"
                        onChange={(e) =>
                          handleMedicineChange(
                            index,
                            field as keyof Medicine,
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
                {medicines.length > 1 && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TypedButton
                      btntype="delete"
                      size="small"
                      onClick={() => removeMedicine(index)}
                    >
                      X
                    </TypedButton>
                  </Box>
                )}
              </Box>
            </>
          ))}
          <TypedButton btntype="primary" onClick={addMedicine} sx={{ mt: 1 }}>
            + Add Medicine
          </TypedButton>
        </DialogContent>
        <DialogActions>
          <TypedButton btntype="delete" onClick={() => setShowModal(false)}>
            Cancel
          </TypedButton>
          <TypedButton
            btntype="primary"
            onClick={handleSavePrescription}
            disabled={!diagnosis.trim()}
          >
            Save
          </TypedButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={!!viewPrescription}
        onClose={() => setViewPrescription(null)}
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          Prescription Details
        </DialogTitle>
        <DialogContent>
          {viewPrescription ? (
            <>
              <p>
                <strong>Diagnosis:</strong> {viewPrescription.diagnosis}
              </p>
              <p>
                <strong>Advice:</strong> {viewPrescription.advice}
              </p>
              <Typography variant="subtitle1">Medicines:</Typography>
              <ul>
                {viewPrescription.medicines?.map((m: Medicine, i: number) => (
                  <li key={i}>
                    {m.name} – {m.dosage}, {m.frequency}, {m.duration}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            "Loading..."
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default DoctorAppointments;
