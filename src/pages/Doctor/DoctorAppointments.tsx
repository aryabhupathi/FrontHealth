/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useDebounce from "../../components/Debounce";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  AutoText,
  CardContentBox,
  CardHeaderBox,
  CardTitle,
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
interface LabTest {
  _id: string;
  name: string;
  instructions?: string;
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
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [selectedTests, setSelectedTests] = useState<LabTest[]>([]);
  const [selectedTestName, setSelectedTestName] = useState("");
  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, appointmentDate, condition]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACK_URL}/labtests`)
      .then((res) => res.json())
      .then((data) => setLabTests(data.filter((t: any) => t.isActive)))
      .catch(console.error);
  }, []);
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
  const resetPrescriptionState = () => {
    setDiagnosis("");
    setAdvice("");
    setMedicines([{ name: "", dosage: "", frequency: "", duration: "" }]);
    setSelectedTests([]);
    setSelectedAppointment(null);
  };
  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };
  const handleSavePrescription = async () => {
    if (!selectedAppointment) return;
    try {
      const payload = {
        appointment: selectedAppointment._id,
        doctor: doctorId,
        patient: selectedAppointment.patient._id,
        diagnosis,
        advice,
        medicines,
        tests: selectedTests.map((t) => ({
          test: t._id,
          instructions: t.instructions || "",
        })),
      };
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/prescription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save prescription");
      alert("Prescription saved successfully");
      resetPrescriptionState();
      setShowModal(false);
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === selectedAppointment._id ? { ...a, status: "Completed" } : a
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error saving prescription");
    }
  };
  const fetchPrescription = async (appointmentId: string) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACK_URL
        }/prescription/appointment/${appointmentId}`
      );
      const data = await res.json();
      if (res.ok) setViewPrescription(data);
      else alert(data.error || "No prescription found");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <PatientContainer>
      <PageTitle variant="h5">My Appointments</PageTitle>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6">Filters</Typography>
        <IconButton size="small" onClick={() => setFilterOpen((p) => !p)}>
          {filterOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <FilterWrapper>
          <FilterAutocomplete
            options={[...new Set(appointments.map((a) => a.patient.fullName))]}
            value={searchName}
            onInputChange={(_, v) => setSearchName(v)}
            renderInput={(params) => (
              <AutoText
                {...params}
                label="Patient Name"
                size="small"
                fullWidth
                sx={{ minWidth: { sm: 180 } }}
              />
            )}
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
          <FilterAutocomplete
            options={conditionOptions}
            value={condition}
            onChange={(_, v) => setCondition(v || "")}
            renderInput={(params) => (
              <AutoText {...params} label="Condition" size="small" />
            )}
            fullWidth
            size="small"
          />
          <DeleteButton
            size="small"
            onClick={() => {
              setSearchName("");
              setAppointmentDate("");
              setCondition("");
            }}
          >
            Clear
          </DeleteButton>
        </FilterWrapper>
      </Collapse>
      {!isMobile ? (
        <Paper
          elevation={1}
          sx={{
            borderRadius: 1,
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
                <TableCell>Patient</TableCell>
                <TableCell>Conditions</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Prescription</TableCell>
              </TableRow>
            </PatientTableHead>
            <TableBody>
              {paginateditems.length ? (
                paginateditems.map((a) => (
                  <TableRow
                    hover
                    key={a._id}
                    sx={{
                      "& .MuiTableCell-root": {
                        py: 0.3,
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
                        <SaveButton
                          onClick={() => {
                            setSelectedAppointment(a);
                            setShowModal(true);
                          }}
                        >
                          Add Prescription
                        </SaveButton>
                      ) : (
                        <DefaultButton onClick={() => fetchPrescription(a._id)}>
                          View Prescription
                        </DefaultButton>
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
            <PatientCard key={a._id}>
              <CardHeaderBox>
                <CardTitle>{a.patient.fullName}</CardTitle>
              </CardHeaderBox>
              <CardContentBox>
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
              </CardContentBox>
            </PatientCard>
          ))}
        </Box>
      )}
      <PaginationBox>
        <Typography variant="body2">
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, paginateditems.length)} of{" "}
          {paginateditems.length}
        </Typography>
        <Box display="flex" gap={1}>
          <DefaultButton
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <Typography variant="body2">Prev</Typography>
          </DefaultButton>
          <DefaultButton
            variant="outlined"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <Typography variant="body2">Next</Typography>
          </DefaultButton>
        </Box>
      </PaginationBox>
      <Dialog
        open={showModal}
        onClose={() => {
          resetPrescriptionState();
          setShowModal(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Prescription for {selectedAppointment?.patient.fullName}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Diagnosis *"
            multiline
            rows={2}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Doctor's Advice"
            multiline
            rows={2}
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            size="small"
            sx={{ mb: 3 }}
          />
          <Box mb={3}>
            <Typography variant="h6" mb={1}>
              Prescribed Tests
            </Typography>
            <FilterAutocomplete
              options={[...new Set(labTests.map((t) => t.name))]}
              inputValue={selectedTestName}
              onInputChange={(_, newInputValue) => {
                setSelectedTestName(newInputValue);
              }}
              onChange={(_, value) => {
                if (!value) return;
                const test = labTests.find((t) => t.name === value);
                if (!test) return;
                setSelectedTests((prev) =>
                  prev.some((t) => t._id === test._id)
                    ? prev
                    : [...prev, { ...test }]
                );
                setSelectedTestName("");
              }}
              renderInput={(params) => (
                <AutoText
                  {...params}
                  label="Select Test"
                  size="small"
                  placeholder="Choose lab test"
                />
              )}
            />
            {selectedTests.map((t, index) => (
              <TextField
                key={t._id}
                fullWidth
                size="small"
                label={`Instructions for ${t.name}`}
                placeholder="e.g. 12 hours fasting"
                value={t.instructions || ""}
                sx={{ mt: 1 }}
                onChange={(e) => {
                  const copy = [...selectedTests];
                  copy[index] = {
                    ...copy[index],
                    instructions: e.target.value,
                  };
                  setSelectedTests(copy);
                }}
              />
            ))}
          </Box>
          <Box mb={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Medicines</Typography>
              <SaveButton size="small" onClick={addMedicine}>
                + Add Medicine
              </SaveButton>
            </Box>
            {medicines.map((m, index) => (
              <Box key={index} mt={2}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle1">
                    Medicine {index + 1}
                  </Typography>
                  {medicines.length > 1 && (
                    <DeleteButton
                      size="small"
                      onClick={() => removeMedicine(index)}
                    >
                      Remove
                    </DeleteButton>
                  )}
                </Box>
                <Grid container spacing={1}>
                  {(["name", "dosage", "frequency", "duration"] as const).map(
                    (field) => (
                      <Grid key={field} size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label={field.toUpperCase()}
                          value={m[field]}
                          onChange={(e) =>
                            handleMedicineChange(index, field, e.target.value)
                          }
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <DeleteButton
            onClick={() => {
              resetPrescriptionState();
              setShowModal(false);
            }}
          >
            Cancel
          </DeleteButton>
          <SaveButton
            onClick={handleSavePrescription}
            disabled={!diagnosis.trim()}
          >
            Save Prescription
          </SaveButton>
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
    </PatientContainer>
  );
};
export default DoctorAppointments;
