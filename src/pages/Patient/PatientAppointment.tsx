/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Divider,
  useMediaQuery,
  TextField,
  Collapse,
  IconButton,
} from "@mui/material";
import BookAppointment from "../../components/BookAppointment";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AddButton,
  AutoText,
  CardContentBox,
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
// import { PrescriptionPDF } from "../../components/PrescriptionPDF";
// import { PDFDownloadLink } from "@react-pdf/renderer";
interface Doctor {
  _id: string;
  fullName: string;
}
interface Patient {
  _id: string;
  fullName: string;
  gender: string;
  age: number;
}
interface Prescription {
  _id: string;
  diagnosis: string;
  advice?: string;

  patient: Patient;
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
  const isMobile = useMediaQuery("(max-width:900px)");
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
  // useEffect(() => {
  //   if (!patientId) return;
  //   const fetchData = async () => {
  //     try {
  //       const [appointmentsRes, prescriptionsRes] = await Promise.all([
  //         fetch(
  //           `${import.meta.env.VITE_BACK_URL}/appointment/patient/${patientId}`
  //         ),
  //         fetch(
  //           `${import.meta.env.VITE_BACK_URL}/prescription/patient/${patientId}`
  //         ),
  //       ]);
  //       const appointmentsData = await appointmentsRes.json();
  //       const prescriptionsData = await prescriptionsRes.json();
  //       console.log(prescriptionsData, "prescriptionsData");
  //       const merged = appointmentsData.map((apt: Appointment) => {
  //         const prescription = prescriptionsData.find(
  //           (p: any) => p.appointment && p.appointment._id === apt._id
  //         );
  //         return {
  //           ...apt,
  //           prescription: prescription ?? null,
  //         };
  //       });
  //       setAppointments(merged);
  //     } catch (err) {
  //       console.error("Failed to load appointments", err);
  //     }
  //   };
  //   fetchData();
  // }, [patientId]);

  useEffect(() => {
    console.log("useEffect triggered, patientId =", patientId);

    if (!patientId) return;

    const fetchData = async () => {
      try {
        const [appointmentsRes, prescriptionsRes] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_BACK_URL}/appointment/patient/${patientId}`,
          ),
          fetch(
            `${import.meta.env.VITE_BACK_URL}/prescription/patient/${patientId}`,
          ),
        ]);

        console.log("responses received");

        if (!appointmentsRes.ok || !prescriptionsRes.ok) {
          throw new Error("Fetch failed");
        }

        const appointmentsData = await appointmentsRes.json();
        const prescriptionsData = await prescriptionsRes.json();

        console.log("prescriptionsData 👉", prescriptionsData);

        const merged = appointmentsData.map((apt: Appointment) => ({
          ...apt,
          prescription:
            prescriptionsData.find(
              (p: any) => p.appointment?._id === apt._id,
            ) ?? null,
        }));

        setAppointments(merged);
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
    };

    fetchData();
  }, [patientId]);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
//   const pdfDocument = useMemo(() => {
//   if (!selectedPrescription) return null;
//   // return <PrescriptionPDF prescription={selectedPrescription} />;
// }, [selectedPrescription]);

  const paginateditems = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const handleOpenPrescription = (p: Prescription) => {
    setSelectedPrescription(p);
  }
  return (
    <PatientContainer>
      <PageTitle variant="h5">My Appointments</PageTitle>
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
        <AddButton onClick={() => setShowBooking(true)}>
          + Book Appointmnet
        </AddButton>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <FilterWrapper>
          <FilterAutocomplete
            options={[...new Set(appointments.map((a) => a.doctor.fullName))]}
            value={filterDoctor}
            onInputChange={(_, value) => setSearchName(value)}
            renderInput={(params) => (
              <AutoText {...params} label="Doctor Name" size="small" />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={filterDate ? dayjs(filterDate) : null}
              onChange={(newValue) => {
                if (!newValue) {
                  setFilterDate("");
                  return;
                }
                if (dayjs.isDayjs(newValue)) {
                  setFilterDate(newValue.format("YYYY-MM-DD"));
                } else {
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
          <FilterAutocomplete
            options={["Pending", "Approved", "Completed", "Cancelled"]}
            value={filterStatus || ""}
            onChange={(_, value) => setFilterStatus(value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Status" size="small" fullWidth />
            )}
          />
          <DeleteButton
            size="small"
            onClick={() => {
              setFilterDate("");
              setFilterStatus("");
              setSearchName("");
            }}
          >
            Clear
          </DeleteButton>
        </FilterWrapper>
      </Collapse>
      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {paginateditems.length ? (
            paginateditems.map((a) => (
              <PatientCard>
                <CardContentBox>
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
                      <>
                        <SaveButton
                          onClick={() =>
                            handleOpenPrescription(a.prescription!)
                          }
                        >
                          View Prescription
                        </SaveButton>{" "}
                      </>
                    ) : (
                      <Typography color="text.secondary">
                        No Prescription
                      </Typography>
                    )}
                  </Box>
                </CardContentBox>
              </PatientCard>
            ))
          ) : (
            <Typography align="center" mt={4}>
              No appointments found
            </Typography>
          )}
        </Box>
      ) : (
        <Box>
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
                  <TableCell>Doctor</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Prescription</TableCell>
                </TableRow>
              </PatientTableHead>
              <TableBody>
                {paginateditems.length ? (
                  paginateditems.map((a) => (
                    <TableRow
                      key={a._id}
                      sx={{
                        "& .MuiTableCell-root": {
                          py: 0.3,
                          height: 24,
                        },
                      }}
                    >
                      <TableCell>{a.doctor?.fullName}</TableCell>
                      <TableCell>{a.date}</TableCell>
                      <TableCell>{a.time}</TableCell>
                      <TableCell>{a.reason}</TableCell>
                      <TableCell>{a.status}</TableCell>
                      <TableCell>
                        {a.prescription ? (
                          <>
                            {" "}
                            <DefaultButton
                              onClick={() =>
                                handleOpenPrescription(a.prescription!)
                              }
                              size="small"
                            >
                              View
                            </DefaultButton>
                 
                          </>
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
      <PaginationBox>
        <Typography variant="body2">
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of{" "}
          {filteredAppointments.length}
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
        open={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ justifyContent: "center", display: "flex" }}>
          Prescription Details
        </DialogTitle>
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
                  <PatientTableHead>
                    <TableRow
                      sx={{
                        "& .MuiTableCell-root": {
                          py: 0.3,
                          height: 24,
                        },
                      }}
                    >
                      <TableCell>Name</TableCell>
                      <TableCell>Dosage</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </PatientTableHead>
                  <TableBody>
                    {selectedPrescription.medicines.map((m, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "& .MuiTableCell-root": {
                            py: 0.3,
                            height: 24,
                          },
                        }}
                      >
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
              {/* <SaveButton
              onClick={() =>
                handleDownloadPrescription(a.prescription!)
              }
              >
                Download Prescription
              </SaveButton> */}
              {/* {pdfDocument && (
  <PDFDownloadLink
    document={pdfDocument}
    fileName={`prescription_${selectedPrescription._id}.pdf`}
    style={{ textDecoration: "none" }}
  >
    {({ loading }) => (
      <DefaultButton disabled={loading}>
        {loading ? "Preparing PDF..." : "Download Prescription"}
      </DefaultButton>
    )}
  </PDFDownloadLink>
)} */}

            </>
          )}
        </DialogContent>
        <DialogActions>
          <DeleteButton onClick={() => setSelectedPrescription(null)}>
            Close
          </DeleteButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showBooking}
        onClose={() => setShowBooking(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ justifyContent: "center", display: "flex" }}>
          Book Appointment
        </DialogTitle>
        <DialogContent dividers>
          <BookAppointment
            patientId={patientId}
            onSuccess={() => {
              setShowBooking(false);
              fetch(
                `${
                  import.meta.env.VITE_BACK_URL
                }/appointment/patient/${patientId}`,
              )
                .then((r) => r.json())
                .then((d) => setAppointments(d));
            }}
            onCancel={() => setShowBooking(false)}
          />
        </DialogContent>
      </Dialog>
    </PatientContainer>
  );
};
export default PatientAppointment;