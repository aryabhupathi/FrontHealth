/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  TableCell,
  TableRow,
  Paper,
  Table,
  TableHead,
  TableBody,
  Collapse,
  Autocomplete,
  Divider,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import useDebounce from "../../components/Debounce";
import { getPatientStyles, TypedButton } from "../../themes/theme";
import { useThemeContext } from "../../context/ThemeContext";
interface IWorkingHour {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}
interface IConsultationFee {
  inPerson?: number;
  online?: number;
  currency?: string;
}
interface IContact {
  phone?: string;
  email?: string;
}
export interface IDoctor {
  _id?: string;
  doctorId?: string;
  fullName: string;
  department: string;
  specialization: string[];
  experience?: number;
  qualification?: string;
  languagesSpoken?: string[];
  about?: string;
  contact?: IContact;
  consultationFee?: IConsultationFee;
  workingHours?: IWorkingHour[];
  licenseNumber?: string;
  accountStatus?: "pending" | "active" | "suspended";
}
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DoctorPage: React.FC = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<IDoctor[]>([]);
  const [search] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [filter, setFilter] = useState({
    doctorName: "",
    department: "",
    specialization: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);
  const debouncedSearch = useDebounce(search, 500);
  const [formData, setFormData] = useState<IDoctor>({
    fullName: "",
    department: "",
    specialization: [""],
    experience: undefined,
    qualification: "",
    languagesSpoken: [""],
    about: "",
    contact: { phone: "", email: "" },
    consultationFee: { inPerson: 0, online: 0, currency: "INR" },
    workingHours: [
      {
        day: "Monday",
        startTime: "09:00",
        endTime: "17:00",
        isAvailable: true,
      },
    ],
    accountStatus: "pending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { mode } = useThemeContext();
  const styles = getPatientStyles(mode);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/doctor`);
      const data = await res.json();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);
  useEffect(() => {
    const normalizedSearch = debouncedSearch.toLowerCase();
    const normalizedDoctorName = filter.doctorName.toLowerCase();
    const normalizedDepartment = filter.department.toLowerCase();
    const normalizedSpecialization = filter.specialization.toLowerCase();
    const filtered = doctors.filter((doctor) => {
      const matchesSearch =
        !normalizedSearch ||
        doctor.fullName.toLowerCase().includes(normalizedSearch);
      const matchesDoctorName =
        !normalizedDoctorName ||
        doctor.fullName.toLowerCase().includes(normalizedDoctorName);
      const matchesDepartment =
        !normalizedDepartment ||
        doctor.department.toLowerCase().includes(normalizedDepartment);
      const matchesSpecialization =
        !normalizedSpecialization ||
        doctor.specialization.some((spec) =>
          spec.toLowerCase().includes(normalizedSpecialization)
        );
      return (
        matchesSearch &&
        matchesDoctorName &&
        matchesDepartment &&
        matchesSpecialization
      );
    });
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  }, [debouncedSearch, filter, doctors]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as IDoctor));
  };
  const handleNestedChange = (
    path:
      | "contact.phone"
      | "contact.email"
      | "consultationFee.inPerson"
      | "consultationFee.online",
    value: string | number
  ) => {
    const [group, field] = path.split(".");
    setFormData((prev) => ({
      ...prev,
      [group]: { ...(prev as any)[group], [field]: value },
    }));
  };
  const handleWorkingHourChange = (
    index: number,
    field: keyof IWorkingHour,
    value: string
  ) => {
    const updated = [...(formData.workingHours || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, workingHours: updated }));
  };
  const addWorkingHour = () => {
    setFormData((prev) => ({
      ...prev,
      workingHours: [
        ...(prev.workingHours || []),
        { day: "", startTime: "09:00", endTime: "17:00", isAvailable: true },
      ],
    }));
  };
  const removeWorkingHour = (index: number) => {
    const updated = [...(formData.workingHours || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, workingHours: updated }));
  };
  const handleShowModal = (doctor?: IDoctor) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData(doctor);
    } else {
      setEditingDoctor(null);
      setFormData({
        fullName: "",
        department: "",
        specialization: [""],
        experience: undefined,
        qualification: "",
        languagesSpoken: [""],
        about: "",
        contact: { phone: "", email: "" },
        consultationFee: { inPerson: 0, online: 0, currency: "INR" },
        workingHours: [
          {
            day: "Monday",
            startTime: "09:00",
            endTime: "17:00",
            isAvailable: true,
          },
        ],
        accountStatus: "pending",
      });
    }
    setShowModal(true);
  };
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const url = editingDoctor
      ? `${import.meta.env.VITE_BACK_URL}/doctor/${editingDoctor._id}`
      : `${import.meta.env.VITE_BACK_URL}/doctor`;
    const method = editingDoctor ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save doctor");
      await res.json();
      alert(editingDoctor ? "Doctor updated!" : "Doctor added!");
      setShowModal(false);
      fetchDoctors();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/doctor/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      alert("Doctor deleted successfully!");
      fetchDoctors();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };
  return (
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        Doctor
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterOpen(!filterOpen)} size="small">
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <TypedButton
          btntype="primary"
          onClick={() => handleShowModal()}
          size="small"
        >
          + Add Doctor
        </TypedButton>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <Box sx={styles.filterBox}>
          <Autocomplete
            options={[...new Set(doctors.map((d) => d.fullName))]}
            value={filter.doctorName || ""}
            onChange={(_, value) =>
              setFilter((f) => ({ ...f, doctorName: value || "" }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Doctor Name" size="small" />
            )}
            fullWidth
            sx={styles.filterField}
          />
          <Autocomplete
            options={[...new Set(doctors.map((d) => d.department))]}
            value={filter.department || ""}
            onChange={(_, value) =>
              setFilter((f) => ({ ...f, department: value || "" }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Department" size="small" />
            )}
            sx={styles.filterField}
          />
          <Autocomplete
            options={[...new Set(doctors.flatMap((d) => d.specialization))]}
            value={filter.specialization || ""}
            onChange={(_, value) =>
              setFilter((f) => ({ ...f, specialization: value || "" }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Specialization" size="small" />
            )}
            sx={styles.filterField}
          />
          <TypedButton
            btntype="delete"
            size="small"
            onClick={() =>
              setFilter({ department: "", specialization: "", doctorName: "" })
            }
          >
            Clear
          </TypedButton>
        </Box>
      </Collapse>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" mb={1}>
        Doctors ({filteredDoctors.length})
      </Typography>
      {isMobile ? (
        <Box>
          {paginatedDoctors.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography>No doctors found</Typography>
            </Paper>
          ) : (
            paginatedDoctors.map((d, i) => (
              <Paper key={d._id} sx={styles.patientCard}>
                <Box sx={styles.cardHeader}>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{
                      flex: 1,
                      textAlign: "left",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontWeight: "medium",
                    }}
                  >
                    {(currentPage - 1) * itemsPerPage + i + 1}. {d.fullName}
                  </Typography>
                  <Box sx={styles.cardActions}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleShowModal(d)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(d._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={styles.cardContent}>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Department
                    </Typography>
                    <Typography variant="body2">
                      {d.department || "—"}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Specialization
                    </Typography>
                    <Typography variant="body2">
                      {d.specialization?.join(", ") || "—"}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Experience
                    </Typography>
                    <Typography variant="body2">
                      {d.experience ? `${d.experience} yrs` : "—"}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Contact
                    </Typography>
                    <Typography variant="body2">
                      {d.contact?.phone || "—"}
                    </Typography>
                  </div>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      ) : (
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
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDoctors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No doctors found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedDoctors.map((d, i) => (
                  <TableRow
                    key={d._id}
                    sx={{
                      "& .MuiTableCell-root": {
                        py: 1,
                        height: 24,
                      },
                    }}
                  >
                    <TableCell>
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </TableCell>
                    <TableCell>{d.fullName}</TableCell>
                    <TableCell>{d.department}</TableCell>
                    <TableCell>{d.specialization.join(", ")}</TableCell>
                    <TableCell>{d.experience || "-"} yrs</TableCell>
                    <TableCell>{d.contact?.phone}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleShowModal(d)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(d._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
      <Box sx={styles.paginationBox}>
        <Typography variant="body2">
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, filteredDoctors.length)} of{" "}
          {filteredDoctors.length}
        </Typography>
        <Box>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            size="small"
          >
            Prev
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            size="small"
          >
            Next
          </Button>
        </Box>
      </Box>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ justifyContent: "center", display: "flex" }}>
          {editingDoctor ? "Edit Doctor" : "Add Doctor"}
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit={handleSubmit} mt={1}>
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
                />
                <TextField
                  fullWidth
                  name="department"
                  label="Department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  margin="dense"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Specialization"
                  value={formData.specialization.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialization: e.target.value
                        .split(",")
                        .map((s) => s.trim()),
                    })
                  }
                  margin="dense"
                  size="small"
                />
                <TextField
                  fullWidth
                  type="number"
                  name="experience"
                  label="Experience (Years)"
                  value={formData.experience || ""}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.contact?.phone || ""}
                  onChange={(e) =>
                    handleNestedChange("contact.phone", e.target.value)
                  }
                  margin="dense"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.contact?.email || ""}
                  onChange={(e) =>
                    handleNestedChange("contact.email", e.target.value)
                  }
                  margin="dense"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="In-person Fee (₹)"
                  type="number"
                  value={formData.consultationFee?.inPerson || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "consultationFee.inPerson",
                      +e.target.value
                    )
                  }
                  size="small"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Online Fee (₹)"
                  type="number"
                  value={formData.consultationFee?.online || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "consultationFee.online",
                      +e.target.value
                    )
                  }
                  size="small"
                  margin="dense"
                />
              </Grid>
            </Grid>
            <Typography variant="subtitle1" mt={3} mb={1} fontWeight={600}>
              Working Hours
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {formData.workingHours?.map((wh, i) => (
                <Grid container spacing={1} key={i} alignItems="center" mb={1}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Autocomplete
                      options={weekDays}
                      value={wh.day || ""}
                      // onChange={(_, value) =>
                      //   handleWorkingHourChange(i, "day", value)
                      // }
                      onChange={(_, value) =>
                        handleWorkingHourChange(i, "day", value ?? "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Day"
                          size="small"
                          margin="dense"
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    {/* <TimePicker
                      label="Start Time"
                      value={wh.startTime ? dayjs(wh.startTime, "HH:mm") : null}
                      onChange={(val) =>
                        handleWorkingHourChange(
                          i,
                          "startTime",
                          val ? val.format("HH:mm") : ""
                        )
                      } */}
                    {/* <TimePicker<Dayjs>
                      label="Start Time"
                      value={wh.startTime ? dayjs(wh.startTime, "HH:mm") : null}
                      onChange={(val) =>
                        handleWorkingHourChange(
                          i,
                          "startTime",
                          val ? val.format("HH:mm") : ""
                        )
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: "dense",
                          size: "small",
                        },
                      }}
                    /> */}
                    <TimePicker
  label="Start Time"
  value={wh.startTime ? dayjs(wh.startTime, "HH:mm") : null}
  onChange={(val) =>
    handleWorkingHourChange(
      i,
      "startTime",
      val ? (val as Dayjs).format("HH:mm") : ""
    )
  }
  slotProps={{
    textField: {
      fullWidth: true,
      margin: "dense",
      size: "small",
    },
  }}
/>

                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    {/* <TimePicker
                      label="End Time"
                      value={wh.endTime ? dayjs(wh.endTime, "HH:mm") : null}
                      onChange={(val) =>
                        handleWorkingHourChange(
                          i,
                          "endTime",
                          val ? val.format("HH:mm") : ""
                        )
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: "dense",
                          size: "small",
                        },
                      }}
                    /> */}

                    <TimePicker
  label="End Time"
  value={wh.endTime ? dayjs(wh.endTime, "HH:mm") : null}
  onChange={(val) =>
    handleWorkingHourChange(
      i,
      "endTime",
      val ? (val as Dayjs).format("HH:mm") : ""
    )
  }
  slotProps={{
    textField: {
      fullWidth: true,
      margin: "dense",
      size: "small",
    },
  }}
/>

                  </Grid>
                  <Grid size={{ xs: 12, md: 2 }}>
                    <TypedButton
                      btntype="delete"
                      size="small"
                      onClick={() => removeWorkingHour(i)}
                    >
                      X
                    </TypedButton>
                  </Grid>
                </Grid>
              ))}
            </LocalizationProvider>
            <TypedButton btntype="primary" onClick={addWorkingHour}>
              + Add Slot
            </TypedButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <TypedButton
            btntype="delete"
            onClick={() => setShowModal(false)}
            color="error"
          >
            Cancel
          </TypedButton>
          {editingDoctor ? (
            <TypedButton
              btntype="secondary"
              size="small"
              onClick={handleSubmit}
            >
              Update
            </TypedButton>
          ) : (
            <TypedButton btntype="primary" size="small" onClick={handleSubmit}>
              Save
            </TypedButton>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default DoctorPage;
