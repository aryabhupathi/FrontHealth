/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  FormControlLabel,
  Paper,
  IconButton,
  Collapse,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  useMediaQuery,
  Button,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ExpandLess,
  ExpandMore,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import useDebounce from "../../components/Debounce";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ZodError } from "zod";
import { FormAdminSchema } from "../../schemas/patient.schema";
import {
  AddButton,
  AutoText,
  CardActions,
  CardContentBox,
  CardHeaderBox,
  CardTitle,
  DefaultButton,
  DeleteButton,
  FilterAutocomplete,
  FilterWrapper,
  ModalActions,
  PageTitle,
  PaginationBox,
  PatientCard,
  PatientContainer,
  PatientTableHead,
  SaveButton,
  UpdateButton,
} from "../../components/styledcomp";
interface IPatient {
  _id?: string;
  patientId?: string;
  fullName: string;
  email?: string;
  gender?: string;
  dob?: Dayjs | null;
  bloodGroup?: string;
  contact: {
    phone: string;
    address?: string;
  };
  allergies: string[];
  conditions: string[];
  medications: string[];
  createdAt?: string;
}
export default function PatientPage() {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<IPatient | null>(null);
  const [createLogin, setCreateLogin] = useState(false);
  const [filter, setFilter] = useState({
    bloodGroup: "",
    condition: "",
    patientName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;
  const emptyForm: IPatient = {
    fullName: "",
    email: "",
    gender: "",
    dob: null as Dayjs | null,
    bloodGroup: "",
    contact: { phone: "", address: "" },
    allergies: [],
    conditions: [],
    medications: [],
  };
  const [formData, setFormData] = useState<IPatient>(emptyForm);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const debouncedName = useDebounce(filter.patientName, 400);
  const debouncedCondition = useDebounce(filter.condition, 400);
  useEffect(() => {
    fetchPatients();
  }, []);
  const fetchPatients = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/patient`);
      console.log(res, "lllllllllllllllllllllll");
      const data = await res.json();
      setPatients(
        (data.data || []).map((p: any) => ({
          ...p,
          dob: p.dob ? dayjs(p.dob) : null,
        }))
      );
    } catch {
      setPatients([]);
    }
  };
  type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  type SelectEvent = SelectChangeEvent<string>;
  const handleChange = (e: InputEvent | SelectEvent) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const validateForm = () => {
    try {
      console.log("aaaaaaaaaaaaaaaaaa");
      FormAdminSchema.parse({
        ...formData,
        dob: formData.dob ? formData.dob.toDate() : null,
      });
      setErrors({});
      console.log(errors, "wwwwwwwwwwwww");
      return true;
    } catch (err) {
      const fieldErrors: Record<string, string> = {};
      if (err instanceof ZodError) {
        err.issues.forEach((issue) => {
          const path = issue.path.join(".");
          fieldErrors[path] = issue.message;
        });
      } else {
        console.error("Unexpected validation error:", err);
      }
      setErrors(fieldErrors);
      return false;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) console.log("abc");
    setIsSubmitting(true);
    const method = editingPatient ? "PUT" : "POST";
    const url = editingPatient
      ? `${import.meta.env.VITE_BACK_URL}/patient/${editingPatient._id}`
      : `${import.meta.env.VITE_BACK_URL}/patient/add-patient`;
    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email,
      phone: formData.contact.phone.trim(),
      address: formData.contact.address,
      gender: formData.gender,
      dob: formData.dob ? formData.dob.format("YYYY-MM-DD") : "",
      bloodGroup: formData.bloodGroup,
      allergies: formData.allergies || [],
      conditions: formData.conditions || [],
      medications: formData.medications || [],
      createLogin,
    };
    console.log("Submitting payload:", payload);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Error saving patient");
      }
      await fetchPatients();
      resetForm();
    } catch (err: any) {
      alert(err.message || "Error saving patient");
    }
  };
  const resetForm = () => {
    setFormData(emptyForm);
    setEditingPatient(null);
    setShowModal(false);
    setCreateLogin(false);
    setIsSubmitting(false);
  };
  const handleEdit = (p: IPatient) => {
    setIsSubmitting(false);
    setEditingPatient(p);
    setFormData({
      ...p,
      dob: p.dob ? dayjs(p.dob) : null,
      contact: p.contact || { phone: "", address: "" },
      allergies: p.allergies || [],
      conditions: p.conditions || [],
      medications: p.medications || [],
    });
    setShowModal(true);
  };
  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm("Are you sure you want to delete this patient?"))
      return;
    await fetch(`${import.meta.env.VITE_BACK_URL}/patient/${id}`, {
      method: "DELETE",
    });
    fetchPatients();
  };
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const nameMatch = p.fullName
        ?.toLowerCase()
        .includes(debouncedName.toLowerCase());
      const bloodMatch =
        !filter.bloodGroup || p.bloodGroup === filter.bloodGroup;
      const conditionMatch =
        !debouncedCondition ||
        (Array.isArray(p.conditions) &&
          p.conditions.some((c) =>
            c.toLowerCase().includes(debouncedCondition.toLowerCase())
          ));
      return nameMatch && bloodMatch && conditionMatch;
    });
  }, [patients, debouncedName, debouncedCondition, filter.bloodGroup]);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  );
  return (
    <PatientContainer>
      <PageTitle variant="h5">Patient</PageTitle>
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
        <AddButton onClick={() => setShowModal(true)} size="small">
          + Add Patient
        </AddButton>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <FilterWrapper>
          <FilterAutocomplete
            options={[...new Set(patients.map((p) => p.fullName))]}
            value={filter.patientName || ""}
            onChange={(_, value) =>
              setFilter((f) => ({ ...f, patientName: value || "" }))
            }
            renderInput={(params) => (
              <AutoText {...params} label="Patient Name" size="small" />
            )}
          />
          <FilterAutocomplete
            options={[...new Set(patients.flatMap((p) => p.conditions || []))]}
            value={filter.condition || ""}
            onChange={(_, value) =>
              setFilter((f) => ({ ...f, condition: value || "" }))
            }
            renderInput={(params) => (
              <AutoText {...params} label="Condition" size="small" />
            )}
          />
          <FilterAutocomplete
            options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            value={filter.bloodGroup || ""}
            onChange={(_, value) =>
              setFilter((f) => ({ ...f, bloodGroup: value || "" }))
            }
            renderInput={(params) => (
              <AutoText {...params} label="Blood Group" size="small" />
            )}
          />
          <DeleteButton
            sx={{
              mt: { xs: 0.5, md: 0 },
              width: { xs: "100%", md: "auto" },
            }}
            size="small"
            onClick={() =>
              setFilter({ bloodGroup: "", condition: "", patientName: "" })
            }
          >
            Clear
          </DeleteButton>
        </FilterWrapper>
      </Collapse>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" mb={1}>
        Patients ({filteredPatients.length})
      </Typography>
      {isMobile ? (
        <Box>
          {paginatedPatients.length > 0 ? (
            paginatedPatients.map((p, i) => (
              <PatientCard key={p._id || i}>
                <CardHeaderBox>
                  <CardTitle variant="subtitle2">
                    {(currentPage - 1) * patientsPerPage + i + 1}. {p.fullName}
                  </CardTitle>
                  <CardActions>
                    <Button size="small" onClick={() => handleEdit(p)}>
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDelete(p._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </CardActions>
                </CardHeaderBox>
                <CardContentBox>
                  <div>
                    <strong>Blood Group:</strong> {p.bloodGroup}
                  </div>
                  <div>
                    <strong>Phone:</strong> {p.contact?.phone || "—"}
                  </div>
                  <div>
                    <strong>Conditions:</strong>{" "}
                    {p.conditions?.join(", ") || "—"}
                  </div>
                </CardContentBox>
              </PatientCard>
            ))
          ) : (
            <Typography align="center" color="text.secondary" py={3}>
              No patients found
            </Typography>
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
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Conditions</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </PatientTableHead>
            <TableBody>
              {paginatedPatients.length > 0 ? (
                paginatedPatients.map((p, i) => (
                  <TableRow
                    key={p._id || i}
                    sx={{
                      "& .MuiTableCell-root": {
                        py: 0.3,
                        height: 24,
                      },
                    }}
                  >
                    <TableCell>
                      {(currentPage - 1) * patientsPerPage + i + 1}
                    </TableCell>
                    <TableCell>{p.fullName}</TableCell>
                    <TableCell>{p.gender}</TableCell>
                    <TableCell>{p.bloodGroup}</TableCell>
                    <TableCell>{p.contact?.phone}</TableCell>
                    <TableCell>{p.conditions?.join(", ")}</TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        <Button
                          sx={{ minWidth: 0 }}
                          color="primary"
                          size="small"
                          onClick={() => handleEdit(p)}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                        <Button
                          sx={{ minWidth: 0 }}
                          color="error"
                          size="small"
                          onClick={() => handleDelete(p._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No patients found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
      <PaginationBox>
        <Typography variant="body2">
          Showing {(currentPage - 1) * patientsPerPage + 1}–
          {Math.min(currentPage * patientsPerPage, filteredPatients.length)} of{" "}
          {filteredPatients.length}
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
      <Dialog open={showModal} onClose={resetForm} fullWidth maxWidth="md">
        <DialogTitle sx={{ justifyContent: "center", display: "flex" }}>
          {editingPatient ? "Edit Patient" : "Add New Patient"}
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  margin="dense"
                  size="small"
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  type="email"
                  fullWidth
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(newValue) =>
                      setFormData((prev) => ({
                        ...prev,
                        dob: newValue as Dayjs | null,
                      }))
                    }
                    maxDate={dayjs()}
                    slotProps={{
                      textField: {
                        margin: "dense",
                        fullWidth: true,
                        size: "small",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth margin="dense" size="small">
                  <InputLabel
                    id="gender-label"
                    sx={{
                      width: "max-content",
                      textAlign: "center",
                    }}
                  >
                    Gender
                  </InputLabel>
                  <Select
                    name="gender"
                    labelId="gender-label"
                    value={formData.gender || ""}
                    label="Gender"
                    onChange={handleChange}
                    error={!!errors.gender}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography color="error" fontSize={12}>
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth margin="dense" size="small">
                  <InputLabel id="blood-label">Blood Group</InputLabel>
                  <Select
                    name="bloodGroup"
                    labelId="blood-label"
                    value={formData.bloodGroup || ""}
                    label="Blood Group"
                    onChange={handleChange}
                    error={!!errors.bloodGroup}
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                      (bg) => (
                        <MenuItem key={bg} value={bg}>
                          {bg}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {errors.bloodGroup && (
                    <Typography color="error" fontSize={12}>
                      {errors.bloodGroup}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  name="contact.phone"
                  label="Phone"
                  value={formData.contact.phone}
                  onChange={handleChange}
                  required
                  size="small"
                  margin="dense"
                  error={!!errors["contact.phone"]}
                  helperText={errors["contact.phone"]}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  name="contact.address"
                  label="Address"
                  value={formData.contact.address}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                  error={!!errors["contact.address"]}
                  helperText={errors["contact.address"]}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  name="allergies"
                  label="Allergies (comma separated)"
                  size="small"
                  value={formData.allergies?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      allergies: e.target.value.split(",").map((s) => s.trim()),
                    }))
                  }
                  margin="dense"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  name="conditions"
                  label="Conditions (comma separated)"
                  size="small"
                  value={formData.conditions?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      conditions: e.target.value
                        .split(",")
                        .map((s) => s.trim()),
                    })
                  }
                  margin="dense"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  name="medications"
                  size="small"
                  label="Medications (comma separated)"
                  value={formData.medications?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      medications: e.target.value
                        .split(",")
                        .map((s) => s.trim()),
                    })
                  }
                  margin="dense"
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Switch
                  checked={createLogin}
                  onChange={() => setCreateLogin(!createLogin)}
                />
              }
              label="Create Login for Patient"
              sx={{ mt: 2 }}
            />
            <ModalActions>
              <DeleteButton onClick={resetForm} size="small">
                Cancel
              </DeleteButton>
              {isSubmitting ? (
                <SaveButton size="small" type="submit" disabled={isSubmitting}>
                  Saving...
                </SaveButton>
              ) : editingPatient ? (
                <UpdateButton size="small" type="submit">
                  Update
                </UpdateButton>
              ) : (
                <SaveButton size="small" type="submit">
                  Save
                </SaveButton>
              )}
            </ModalActions>
          </Box>
        </DialogContent>
      </Dialog>
    </PatientContainer>
  );
}
