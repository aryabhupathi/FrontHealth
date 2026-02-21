import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { DefaultButton, DeleteButton, SaveButton } from "./styledcomp";
interface AvailableSlot {
  date: string;
  times: string[];
}
interface RescheduleFormProps {
  open: boolean;
  onClose: () => void;
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  availability: AvailableSlot[];
  onConfirm: () => Promise<void>;
}
const RescheduleForm: React.FC<RescheduleFormProps> = ({
  open,
  onClose,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  availability,
  onConfirm,
}) => {
  const availableDates = availability.map((a) => a.date);
  const timesForDay =
    availability.find(
      (a) => a.date === dayjs(selectedDate).format("YYYY-MM-DD"),
    )?.times || [];
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle align="center">Reschedule Appointment</DialogTitle>
      <DialogContent dividers>
        <DatePicker
          label="New Date"
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date as Dayjs | null);
            setSelectedTime("");
          }}
          shouldDisableDate={(day) =>
            !availableDates.includes(dayjs(day as Dayjs).format("YYYY-MM-DD"))
          }
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
        {selectedDate && (
          <>
            <Typography mt={2} mb={1}>
              Available Time Slots
            </Typography>
            <Grid container spacing={1}>
              {timesForDay.map((time) => (
                <Grid key={time}>
                  <DefaultButton
                    variant={selectedTime === time ? "contained" : "outlined"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </DefaultButton>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <DeleteButton onClick={onClose}>Cancel</DeleteButton>
        <SaveButton
          disabled={!selectedDate || !selectedTime}
          onClick={handleConfirm}
        >
          Confirm
        </SaveButton>
      </DialogActions>
    </Dialog>
  );
};
export default RescheduleForm;
