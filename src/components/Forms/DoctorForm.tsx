/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Autocomplete,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { IDoctor } from "../../types/DoctorType";
import { AddButton, DeleteButton } from "../styledcomp";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
interface DoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (doctor: IDoctor, id?: string) => Promise<void>;
  editingDoctor?: IDoctor | null;
}
const defaultDoctor: IDoctor = {
  fullName: "",
  department: "",
  specialization: [],
  experience: 0,
  qualification: "",
  languagesSpoken: [],
  contact: { phone: "", email: "" },
  consultationFee: { inPerson: 0, online: 0, currency: "INR" },
  workingHours: [],
  accountStatus: "pending",
};
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DoctorForm = ({
  open,
  onClose,
  onSave,
  editingDoctor,
}: DoctorFormDialogProps) => {
  const [formData, setFormData] = useState<IDoctor>(defaultDoctor);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (editingDoctor) {
      setFormData(editingDoctor);
    } else {
      setFormData(defaultDoctor);
    }
  }, [editingDoctor, open]);
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      await onSave(formData, editingDoctor?._id);
      onClose();
    } finally {
      // setSaving(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        {editingDoctor ? "Edit Doctor" : "Add Doctor"}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} mt={1}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.fullName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                size="small"
                margin="dense"
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
              <TextField
                fullWidth
                label="Department"
                value={formData.department || ""}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                required
                size="small"
                margin="dense"
                error={!!errors.department}
                helperText={errors.department}
              />
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.specialization || []}
                onChange={(_, value) =>
                  setFormData({ ...formData, specialization: value })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Specialization"
                    size="small"
                    margin="dense"
                  />
                )}
              />
              <TextField
                fullWidth
                label="Experience (Years)"
                type="number"
                value={formData.experience ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience: Number(e.target.value),
                  })
                }
                required
                size="small"
                margin="dense"
                error={!!errors.experience}
                helperText={errors.experience}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.contact?.phone || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      phone: e.target.value,
                    },
                  })
                }
                size="small"
                margin="dense"
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.contact?.email || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: {
                      ...formData.contact,
                      email: e.target.value,
                    },
                  })
                }
                size="small"
                margin="dense"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                label="In-person Fee (₹)"
                type="number"
                value={formData.consultationFee?.inPerson ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    consultationFee: {
                      ...formData.consultationFee,
                      inPerson: Number(e.target.value),
                    },
                  })
                }
                size="small"
                margin="dense"
                error={!!errors.inPerson}
                helperText={errors.inPerson}
              />
              <TextField
                fullWidth
                label="Online Fee (₹)"
                type="number"
                value={formData.consultationFee?.online ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    consultationFee: {
                      ...formData.consultationFee,
                      online: Number(e.target.value),
                    },
                  })
                }
                size="small"
                margin="dense"
                error={!!errors.online}
                helperText={errors.online}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle1" mt={3} mb={1} fontWeight={600}>
            Working Hours
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {formData.workingHours?.map((wh, i) => (
              <Grid container spacing={1} key={i} alignItems="center" mb={1}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Autocomplete
                    options={weekDays}
                    value={wh.day || ""}
                    onChange={(_, value) => {
                      const updated = [...formData.workingHours];
                      updated[i].day = value || "";
                      setFormData({ ...formData, workingHours: updated });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Day" size="small" />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TimePicker
                    label="Start Time"
                    value={wh.startTime ? dayjs(wh.startTime, "HH:mm") : null}
                    onChange={(val) => {
                      if (!val) return;
                      const updated = [...formData.workingHours];
                      updated[i].startTime = val.format("HH:mm");
                      setFormData({ ...formData, workingHours: updated });
                    }}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TimePicker
                    label="End Time"
                    value={wh.endTime ? dayjs(wh.endTime, "HH:mm") : null}
                    onChange={(val) => {
                      if (!val) return;
                      const updated = [...formData.workingHours];
                      updated[i].endTime = val.format("HH:mm");
                      setFormData({ ...formData, workingHours: updated });
                    }}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 1 }}>
                  <DeleteButton
                    size="small"
                    onClick={() => {
                      const updated = formData.workingHours.filter(
                        (_, index) => index !== i,
                      );
                      setFormData({ ...formData, workingHours: updated });
                    }}
                  >
                    X
                  </DeleteButton>
                </Grid>
              </Grid>
            ))}
          </LocalizationProvider>
          <AddButton
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                workingHours: [
                  ...formData.workingHours,
                  {
                    day: "",
                    startTime: "09:00",
                    endTime: "17:00",
                    isAvailable: true,
                  },
                ],
              })
            }
          >
            + Add Slot
          </AddButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <DeleteButton onClick={onClose} color="error">
          Cancel
        </DeleteButton>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          {editingDoctor ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DoctorForm;
