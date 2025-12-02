/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, type FormEvent } from "react";
import {
  TextField,
  Grid,
  Box,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TypedButton } from "../themes/theme";
interface WorkingHour {
  day: string;
  startTime: string;
  endTime: string;
}
interface Doctor {
  _id: string;
  fullName: string;
  workingHours: WorkingHour[];
}
interface BookAppointmentProps {
  patientId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}
const getDayName = (date: Date): string =>
  date.toLocaleDateString("en-US", { weekday: "long" });
const generateTimeSlots = (startStr: string, endStr: string): string[] => {
  const [startHour, startMin] = startStr.split(":").map(Number);
  const [endHour, endMin] = endStr.split(":").map(Number);
  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;
  const slots: string[] = [];
  for (let mins = startTime; mins < endTime; mins += 15) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const period = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    slots.push(`${displayHour}:${m.toString().padStart(2, "0")} ${period}`);
  }
  return slots;
};
const BookAppointment: React.FC<BookAppointmentProps> = ({
  patientId,
  onSuccess,
  onCancel,
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [apptype, setAppType] = useState("In-person");
  const selectedDoctorData = useMemo(
    () => doctors.find((doc) => doc._id === selectedDoctor),
    [doctors, selectedDoctor]
  );
  const availableDates = useMemo(() => {
    if (!selectedDoctorData?.workingHours) return [];
    const workingDays = selectedDoctorData.workingHours.map((wh) => wh.day);
    const dates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i <= 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (workingDays.includes(getDayName(d))) {
        dates.push(d);
      }
    }
    return dates;
  }, [selectedDoctorData]);
  const availableTimeSlots = useMemo(() => {
    if (!date || !selectedDoctorData?.workingHours) return [];
    const dayName = getDayName(date);
    const schedule = selectedDoctorData.workingHours.find(
      (wh) => wh.day === dayName
    );
    if (!schedule) return [];
    return generateTimeSlots(schedule.startTime, schedule.endTime);
  }, [date, selectedDoctorData]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACK_URL}/doctor`)
      .then((res) => res.json())
      .then(setDoctors)
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!date || !time || !selectedDoctor) return;
    const [timePart, period] = time.split(" ");
    const [h, m] = timePart.split(":").map(Number);
    let hour = h;
    const minute = m;
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    const time24 = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    const payload = {
      doctor: selectedDoctor,
      patient: patientId,
      date: date.toISOString().split("T")[0],
      time: time24,
      reason,
      appointmentType: apptype,
    };
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Booking failed");
      alert("Appointment booked successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Error booking appointment");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        
        <Grid size={{xs:12}}>
          <Autocomplete
            options={doctors}
            getOptionLabel={(opt) => opt.fullName}
            value={doctors.find((d) => d._id === selectedDoctor) || null}
            onChange={(_, val) => {
              setSelectedDoctor(val?._id || "");
              setDate(null);
              setTime("");
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Doctor" size="small" />
            )}
          />
        </Grid>

        <Grid size={{ xs:12, sm:6}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(d:any) => {
                setDate(d);
                setTime("");
              }}
              disabled={!selectedDoctor}
              shouldDisableDate={(d) =>
                !availableDates.some(
                  (allowed) => allowed.toDateString() === d?.toString()
                )
              }
              slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                      },
                    }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs:12, sm:6}}>
          <Autocomplete
            options={availableTimeSlots}
            value={time || null}
            onChange={(_, val) => setTime(val || "")}
            disabled={!date}
            renderInput={(params) => (
              <TextField {...params} label="Select Time" size="small" />
            )}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <Autocomplete
            options={["In-person", "Online"]}
            value={apptype}
            onChange={(_, val) => setAppType(val || "")}
            renderInput={(params) => (
              <TextField {...params} label="Appointment Type" size="small" />
            )}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Reason for Visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs:12}}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <TypedButton btntype="delete" onClick={onCancel}>
              Cancel
            </TypedButton>
           <TypedButton btntype="primary"
              type="submit"
              disabled={!selectedDoctor || !date || !time}
            >
              Book Appointment
            </TypedButton>
          </Box>
        </Grid>

      </Grid>
    </form>
);

};
export default BookAppointment;
