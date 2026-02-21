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
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import type { IDoctor, Gender, WeekDay } from "../../types/DoctorType";
import { useDoctorForm } from "../../hooks/useDoctorForm";
import { useEffect, useState } from "react";
const GenderOptions: Gender[] = ["Male", "Female", "Other"];
const weekDays: WeekDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
interface DoctorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (doctor: IDoctor, id?: string) => Promise<void>;
  editingDoctor?: IDoctor | null;
}
const DoctorForm = ({
  open,
  onClose,
  onSave,
  editingDoctor,
}: DoctorFormDialogProps) => {
  const form = useDoctorForm();
  const { formData, setFormData, errors, validate, reset } = form;
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (editingDoctor) {
      setFormData(editingDoctor);
    } else {
      reset();
    }
  }, [editingDoctor, open, reset, setFormData]);
  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await onSave(formData, editingDoctor?._id);
      onClose();
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{editingDoctor ? "Edit Doctor" : "Add Doctor"}</DialogTitle>
      <DialogContent dividers>
        <Box mt={1}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    fullName: e.target.value,
                  }))
                }
                size="small"
                margin="dense"
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                options={GenderOptions}
                value={formData.gender ?? null}
                onChange={(_, value) =>
                  setFormData((p) => ({
                    ...p,
                    gender: value ?? undefined,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    error={!!errors.gender}
                    helperText={errors.gender}
                    size="small"
                    margin="dense"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.contact.phone}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    contact: {
                      ...p.contact,
                      phone: e.target.value,
                    },
                  }))
                }
                error={!!errors["contact.phone"]}
                helperText={errors["contact.phone"]}
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Email"
                value={formData.contact.email}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    contact: {
                      ...p.contact,
                      email: e.target.value,
                    },
                  }))
                }
                error={!!errors["contact.email"]}
                helperText={errors["contact.email"]}
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    department: e.target.value,
                  }))
                }
                error={!!errors.department}
                helperText={errors.department}
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Specialization (comma separated)"
                value={formData.specialization.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specialization: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
                size="small"
                margin="dense"
                error={!!errors["specialization"]}
                helperText={errors["specialization"]}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                type="number"
                label="Experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    experience: e.target.value,
                  }))
                }
                error={!!errors.experience}
                helperText={errors.experience}
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Joining Date"
                value={dayjs(formData.joiningDate).format("DD/MM/YYYY")}
                fullWidth
                size="small"
                margin="dense"
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="In-person Fee (₹)"
                type="number"
                value={formData.consultationFee.inPerson}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    consultationFee: {
                      ...prev.consultationFee,
                      inPerson: e.target.value,
                    },
                  }))
                }
                error={!!errors["consultationFee.inPerson"]}
                helperText={errors["consultationFee.inPerson"]}
                size="small"
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="Online Fee (₹)"
                type="number"
                value={formData.consultationFee.online}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    consultationFee: {
                      ...prev.consultationFee,
                      online: e.target.value,
                    },
                  }))
                }
                error={!!errors["consultationFee.online"]}
                helperText={errors["consultationFee.online"]}
                size="small"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Box display="flex" alignItems="center" gap={1.5} mt={3} mb={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              Working Hours
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{ textTransform: "none", px: 1.5, py: 0.5 }}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  workingHours: [
                    ...prev.workingHours,
                    {
                      day: "",
                      startTime: "09:00",
                      endTime: "17:00",
                      isAvailable: true,
                    },
                  ],
                }))
              }
            >
              + Add
            </Button>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {formData.workingHours.map((wh, i) => (
              <Grid container spacing={1} key={i} alignItems="center" mb={1}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Autocomplete<WeekDay, false, false, false>
                    options={weekDays}
                    value={wh.day || null}
                    onChange={(_, value) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: prev.workingHours.map((slot, index) =>
                          index === i ? { ...slot, day: value ?? "" } : slot,
                        ),
                      }))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Day"
                        size="small"
                        error={!!errors[`workingHours.${i}.day`]}
                        helperText={errors[`workingHours.${i}.day`]}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TimePicker
                    label="Start Time"
                    value={dayjs(wh.startTime, "HH:mm")}
                    onChange={(val) =>
                      val &&
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: prev.workingHours.map((slot, index) =>
                          index === i
                            ? {
                                ...slot,
                                startTime: (val as Dayjs).format("HH:mm"),
                              }
                            : slot,
                        ),
                      }))
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TimePicker
                    label="End Time"
                    value={dayjs(wh.endTime, "HH:mm")}
                    onChange={(val) =>
                      val &&
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: prev.workingHours.map((slot, index) =>
                          index === i
                            ? {
                                ...slot,
                                endTime: (val as Dayjs).format("HH:mm"),
                              }
                            : slot,
                        ),
                      }))
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 1 }}>
                  <Button
                    color="error"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: prev.workingHours.filter(
                          (_, index) => index !== i,
                        ),
                      }))
                    }
                  >
                    X
                  </Button>
                </Grid>
              </Grid>
            ))}
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={saving}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DoctorForm;
