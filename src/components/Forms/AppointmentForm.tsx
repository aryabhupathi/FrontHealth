/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  SaveButton,
  DeleteButton,
  DefaultButton,
} from "../../components/styledcomp";
import type { IDoctor, IPatient } from "../../hooks/useAppointment";
interface AppointmentFormProps {
  open: boolean;
  onClose: () => void;
  patients: IPatient[];
  doctors: IDoctor[];
  availability: { date: string; times: string[] }[];
  fetchAvailability: (doctorId: string) => void;
  formHook: any;
}
const AppointmentForm: React.FC<AppointmentFormProps> = ({
  open,
  onClose,
  patients,
  doctors,
  availability,
  fetchAvailability,
  formHook,
}) => {
  const {
    formData,
    setFormData,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    handleDoctorChange,
    handleModeChange,
    errors,
    handleSubmit,
  } = formHook;
  const availableDates = availability.map((a) => a.date);
  const timesForDay =
    availability.find(
      (d) => d.date === dayjs(selectedDate).format("YYYY-MM-DD"),
    )?.times || [];
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        New Appointment
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={onFormSubmit}>
          <TextField
            select
            fullWidth
            margin="dense"
            size="small"
            label="Select Patient"
            value={formData.patient}
            onChange={(e) =>
              setFormData({ ...formData, patient: e.target.value })
            }
            error={!!errors.patient}
            helperText={errors.patient}
          >
            {patients.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.fullName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            margin="dense"
            size="small"
            label="Select Doctor"
            value={formData.doctor}
            onChange={(e) => {
              const doctor = doctors.find((d) => d._id === e.target.value);
              handleDoctorChange(doctor || null);
              if (doctor?._id) fetchAvailability(doctor._id);
            }}
            error={!!errors.doctor}
            helperText={errors.doctor}
          >
            {doctors.map((d) => (
              <MenuItem key={d._id} value={d._id}>
                {d.fullName}
              </MenuItem>
            ))}
          </TextField>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
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
                margin: "dense",
                error: !!errors.date,
                helperText: errors.date,
              },
            }}
          />
          {selectedDate && (
            <>
              <Typography mt={2} mb={1}>
                Available Times:
              </Typography>
              <Grid container spacing={1}>
                {timesForDay.map((t) => (
                  <Grid key={t}>
                    <DefaultButton
                      variant={selectedTime === t ? "contained" : "outlined"}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </DefaultButton>
                  </Grid>
                ))}
              </Grid>
              {errors.time && (
                <Typography color="error" variant="caption">
                  {errors.time}
                </Typography>
              )}
            </>
          )}
          <FormControl fullWidth margin="dense" size="small">
            <InputLabel>Consultation Mode</InputLabel>
            <Select
              value={formData.appointmentType}
              label="Consultation Mode"
              onChange={(e) =>
                handleModeChange(e.target.value as "Online" | "In-person")
              }
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="In-person">In-person</MenuItem>
            </Select>
          </FormControl>
          {errors.appointmentType && (
            <Typography color="error" variant="caption">
              {errors.appointmentType}
            </Typography>
          )}
          <TextField
            label="Consultation Fee (₹)"
            type="number"
            fullWidth
            margin="dense"
            size="small"
            value={formData.consultationFee}
            disabled
          />
          <DialogActions sx={{ mt: 2 }}>
            <DeleteButton onClick={onClose}>Cancel</DeleteButton>
            <SaveButton type="submit">Book</SaveButton>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default AppointmentForm;
