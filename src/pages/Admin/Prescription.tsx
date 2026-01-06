import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Modal,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import useDebounce from "../../components/Debounce";
import {
  AutoText,
  DefaultButton,
  DeleteButton,
  FilterAutocomplete,
  FilterWrapper,
  PageTitle,
  PaginationBox,
  PatientCard,
  PatientContainer,
  PatientTableHead,
  UpdateButton,
} from "../../components/styledcomp";
interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}
interface Patient {
  _id: string;
  fullName: string;
  patientId: string;
}
interface Doctor {
  _id: string;
  fullName: string;
  specialization?: string[];
}
interface Prescription {
  _id: string;
  patient: Patient;
  doctor: Doctor;
  diagnosis: string;
  advice?: string;
  medicines: Medicine[];
}
const Prescriptions: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [filterOpen, setFilterOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selected, setSelected] = useState<Prescription | null>(null);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [medicineSearch, setMedicineSearch] = useState("");
  const debouncedDoctorSearch = useDebounce(doctorSearch, 300);
  const debouncedPatientSearch = useDebounce(patientSearch, 300);
  const debouncedMedicineSearch = useDebounce(medicineSearch, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [presRes, patientRes, doctorRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACK_URL}/prescription`),
          fetch(`${import.meta.env.VITE_BACK_URL}/patient`),
          fetch(`${import.meta.env.VITE_BACK_URL}/doctor`),
        ]);
        const presData = await presRes.json();
        const patientData = await patientRes.json();
        const doctorData = await doctorRes.json();
        setPrescriptions(Array.isArray(presData) ? presData : []);
        setPatients(Array.isArray(patientData.data) ? patientData.data : []);
        setDoctors(Array.isArray(doctorData) ? doctorData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);
  const allMedicineNames = useMemo(() => {
    return Array.from(
      new Set(
        prescriptions.flatMap((p) =>
          p.medicines.map((m) => m.name.trim().toLowerCase())
        )
      )
    )
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .sort();
  }, [prescriptions]);
  const filteredPrescriptions = prescriptions.filter((pres) => {
    const matchesDoctor = debouncedDoctorSearch
      ? pres.doctor.fullName
          .toLowerCase()
          .includes(debouncedDoctorSearch.toLowerCase())
      : true;
    const matchesPatient = debouncedPatientSearch
      ? pres.patient.fullName
          .toLowerCase()
          .includes(debouncedPatientSearch.toLowerCase()) ||
        pres.patient.patientId
          .toLowerCase()
          .includes(debouncedPatientSearch.toLowerCase())
      : true;
    const matchesMedicine = debouncedMedicineSearch
      ? pres.medicines.some((m) =>
          m.name.toLowerCase().includes(debouncedMedicineSearch.toLowerCase())
        )
      : true;
    return matchesDoctor && matchesPatient && matchesMedicine;
  });
  const totalFiltered = filteredPrescriptions.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrescriptions = filteredPrescriptions.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handleClear = () => {
    setDoctorSearch("");
    setPatientSearch("");
    setMedicineSearch("");
  };
  return (
    <PatientContainer>
      <PageTitle variant="h5">Prescription</PageTitle>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterOpen(!filterOpen)} size="small">
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <FilterWrapper>
          <FilterAutocomplete
            options={[...new Set(doctors.map((d) => d.fullName))]}
            value={doctorSearch || null}
            onChange={(_, val) => setDoctorSearch(val || "")}
            renderInput={(params) => (
              <AutoText {...params} label="Doctor" size="small" />
            )}
          />
          <FilterAutocomplete
            options={[...new Set(patients.map((p) => p.fullName))]}
            value={patientSearch || null}
            onChange={(_, val) => setPatientSearch(val || "")}
            renderInput={(params) => (
              <AutoText {...params} label="Patient" size="small" />
            )}
          />
          <FilterAutocomplete
            options={allMedicineNames}
            getOptionLabel={(option) => option}
            value={medicineSearch || null}
            onChange={(_, val) => setMedicineSearch(val || "")}
            renderInput={(params) => (
              <AutoText {...params} label="Medicine" size="small" />
            )}
          />
          <DeleteButton
            onClick={handleClear}
            sx={{
              mt: { xs: 0.5, md: 0 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            CLEAR
          </DeleteButton>
        </FilterWrapper>
      </Collapse>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="subtitle1" mb={1}>
        Prescriptions ({totalFiltered})
      </Typography>
      {isMobile ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}>
          {paginatedPrescriptions.map((pres, i) => (
            <PatientCard key={pres._id} sx={{ p: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1.5, fontWeight: "medium" }}
              >
                {startIndex + i + 1}
              </Typography>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Patient
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {pres.patient.fullName}
                </Typography>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Doctor
                </Typography>
                <Typography variant="body1">{pres.doctor.fullName}</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Diagnosis
                </Typography>
                <Typography variant="body1">{pres.diagnosis || "—"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <UpdateButton onClick={() => setSelected(pres)} size="small">
                  View
                </UpdateButton>
              </Box>
            </PatientCard>
          ))}
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
                  "& .MuiTableCell-root": {
                    py: 1,
                    height: 24,
                  },
                }}
              >
                <TableCell>Id</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </PatientTableHead>
            <TableBody>
              {paginatedPrescriptions.map((pres, i) => (
                <TableRow
                  key={pres._id}
                  sx={{
                    "& .MuiTableCell-root": {
                      py: 1,
                      height: 24,
                    },
                  }}
                >
                  <TableCell>{startIndex + i + 1}</TableCell>
                  <TableCell>
                    {pres.patient.fullName} ({pres.patient.patientId})
                  </TableCell>
                  <TableCell>{pres.doctor.fullName}</TableCell>
                  <TableCell>{pres.diagnosis || "—"}</TableCell>
                  <TableCell>
                    <UpdateButton
                      size="small"
                      variant="outlined"
                      onClick={() => setSelected(pres)}
                    >
                      View
                    </UpdateButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      <PaginationBox>
        <Typography variant="body2" color="text.secondary">
          Showing {startIndex + 1}–
          {Math.min(startIndex + itemsPerPage, totalFiltered)} of{" "}
          {totalFiltered}
        </Typography>
        <Box>
          <DefaultButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            size="small"
          >
            <Typography variant="body2">Prev</Typography>
          </DefaultButton>
          <DefaultButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            size="small"
          >
            <Typography variant="body2">Next</Typography>
          </DefaultButton>
        </Box>
      </PaginationBox>
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: 600,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: { xs: 2, sm: 3 },
          }}
        >
          {selected && (
            <>
              <Typography
                variant="h6"
                component="h2"
                mb={2}
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  fontWeight: "bold",
                }}
              >
                Prescription Details
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body1">
                    <strong>Patient:</strong> {selected.patient.fullName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body1">
                    <strong>Doctor:</strong> {selected.doctor.fullName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body1">
                    <strong>Diagnosis:</strong> {selected.diagnosis || "—"}
                  </Typography>
                </Grid>
                {selected.advice && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body1">
                      <strong>Advice:</strong> {selected.advice}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Typography variant="subtitle1" gutterBottom>
                Medicines
              </Typography>
              <Box sx={{ overflowX: "auto", mb: 2 }}>
                <Table size="small" sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow
                      sx={{
                        "& .MuiTableCell-root": {
                          py: 1,
                          height: 24,
                        },
                      }}
                    >
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                      >
                        Dosage
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                      >
                        Frequency
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                      >
                        Duration
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                      >
                        Notes
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selected.medicines.map((m, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "& .MuiTableCell-root": {
                            py: 1,
                            height: 24,
                          },
                        }}
                      >
                        <TableCell>{m.name || "—"}</TableCell>
                        <TableCell>{m.dosage || "—"}</TableCell>
                        <TableCell>{m.frequency || "—"}</TableCell>
                        <TableCell>{m.duration || "—"}</TableCell>
                        <TableCell>{m.notes || "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box textAlign="right">
                <DeleteButton
                  onClick={() => setSelected(null)}
                  sx={{ minWidth: { xs: "100%", sm: "auto" } }}
                >
                  Close
                </DeleteButton>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </PatientContainer>
  );
};
export default Prescriptions;
