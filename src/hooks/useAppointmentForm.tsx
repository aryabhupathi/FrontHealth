import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { IDoctor } from "./useAppointment";
type FormErrors = {
  patient?: string;
  doctor?: string;
  date?: string;
  time?: string;
  appointmentType?: string;
};
export const useAppointmentHookForm = (
  refreshAppointments: () => Promise<void>,
) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    appointmentType: "Online" as "Online" | "In-person",
  });
  const [displayFee, setDisplayFee] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.patient) newErrors.patient = "Patient is required";
    if (!formData.doctor) newErrors.doctor = "Doctor is required";
    if (!selectedDate) newErrors.date = "Date is required";
    if (!selectedTime) newErrors.time = "Time is required";
    if (!formData.appointmentType)
      newErrors.appointmentType = "Consultation mode is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleDoctorChange = (doctor: IDoctor | null) => {
    setSelectedDoctor(doctor);
    const fee =
      formData.appointmentType === "Online"
        ? doctor?.consultationFee?.online
        : doctor?.consultationFee?.inPerson;
    setDisplayFee(fee ?? 0);
    setFormData({
      ...formData,
      doctor: doctor?._id || "",
    });
    setSelectedDate(null);
    setSelectedTime("");
  };
  const handleModeChange = (mode: "Online" | "In-person") => {
    const fee =
      selectedDoctor &&
      (mode === "Online"
        ? selectedDoctor.consultationFee?.online
        : selectedDoctor.consultationFee?.inPerson);
    setDisplayFee(fee ?? 0);
    setFormData({
      ...formData,
      appointmentType: mode,
    });
  };
  const handleSubmit = async () => {
    if (!validateForm()) return false;
    const payload = {
      doctor: formData.doctor,
      patient: formData.patient,
      appointmentType: formData.appointmentType,
      date: dayjs(selectedDate).toISOString(),
      time: selectedTime,
      paidAmount,
    };
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Server error:", data);
        return false;
      }
      await refreshAppointments();
      return true;
    } catch (err) {
      console.error("Network error:", err);
      return false;
    }
  };
  return {
    formData,
    setFormData,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    handleDoctorChange,
    handleModeChange,
    displayFee,
    paidAmount,
    setPaidAmount,
    errors,
    handleSubmit,
  };
};
