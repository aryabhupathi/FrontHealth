/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  FormControlLabel,
  Switch,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import type { usePatientForm } from "../../hooks/usePatientForm";
import { DeleteButton, SaveButton, UpdateButton } from "../styledcomp";
interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  editing: boolean;
  form: ReturnType<typeof usePatientForm>;
  createLogin: boolean;
  setCreateLogin: (val: boolean) => void;
}
export function PatientForm({
  open,
  onClose,
  onSubmit,
  editing,
  form,
  createLogin,
  setCreateLogin,
}: Props) {
  const { formData, setFormData, errors, isSubmitting } = form;
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setFormData((p) => ({
        ...p,
        contact: { ...p.contact, [key]: value },
      }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ justifyContent: "center", display: "flex" }}>
        {editing ? "Edit Patient" : "Add Patient"}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="patient-form" onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                fullWidth
                size="small"
                required
                id="outlined-required"
                // margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                size="small"
                required
                // margin="dense"
                id="outlined-required"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="contact.phone"
                label="Phone"
                value={formData.contact.phone}
                onChange={handleChange}
                error={!!errors["contact.phone"]}
                helperText={errors["contact.phone"]}
                fullWidth
                size="small"
                required
                id="outlined-required"
                // margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="contact.address"
                label="Address"
                value={formData.contact.address}
                onChange={handleChange}
                error={!!errors["contact.address"]}
                helperText={errors["contact.address"]}
                fullWidth
                size="small"
                required
                id="outlined-required"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob}
                  maxDate={dayjs()}
                  onChange={(newValue) =>
                    setFormData((prev) => ({
                      ...prev,
                      dob: newValue as Dayjs | null,
                    }))
                  }
                  slotProps={{
                    textField: {
                      error: !!errors.dob,
                      helperText: errors.dob,
                      size: "small",
                      fullWidth: true,
                      required: true,
                      margin: "dense",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl
                fullWidth
                size="small"
                error={!!errors.gender}
                required
                margin="dense"
              >
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                  margin="dense"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText>{errors.gender}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl
                fullWidth
                size="small"
                error={!!errors.bloodGroup}
                required
                margin="dense"
              >
                <InputLabel>Blood Group</InputLabel>
                <Select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  label="Blood Group"
                >
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (bg) => (
                      <MenuItem key={bg} value={bg}>
                        {bg}
                      </MenuItem>
                    ),
                  )}
                </Select>
                {errors.bloodGroup && (
                  <FormHelperText>{errors.bloodGroup}</FormHelperText>
                )}
              </FormControl>
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
                    conditions: e.target.value.split(",").map((s) => s.trim()),
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
                    medications: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                margin="dense"
              />
            </Grid>
            <FormControlLabel
              sx={{ marginTop: "2px" }}
              control={
                <Switch
                  checked={createLogin}
                  onChange={() => setCreateLogin(!createLogin)}
                />
              }
              label="Create Login for Patient"
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <DeleteButton onClick={onClose} size="small">
          Cancel
        </DeleteButton>
        {isSubmitting ? (
          <SaveButton size="small" type="submit" form="patient-form" disabled>
            Saving...
          </SaveButton>
        ) : editing ? (
          <UpdateButton size="small" type="submit" form="patient-form">
            Update
          </UpdateButton>
        ) : (
          <SaveButton size="small" type="submit" form="patient-form"  >
            Save
          </SaveButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
