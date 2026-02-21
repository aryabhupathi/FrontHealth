import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import useDebounce from "../components/Debounce";
export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Rescheduled"
  | "Cancelled"
  | "Completed";
export interface IPatient {
  _id?: string;
  fullName: string;
}
export interface IDoctor {
  _id?: string;
  fullName: string;
  department?: string;
  workingHours?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  consultationFee?: {
    online?: number;
    inPerson?: number;
  };
}
export interface Appointment {
  _id: string;
  patient?: IPatient;
  doctor?: IDoctor;
  date: string;
  time: string;
  status: AppointmentStatus;
  appointmentType: "Online" | "In-person";
  consultationFee?: number;
}
export interface AvailableSlot {
  date: string;
  times: string[];
}
export const useAppointmentHook = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [availability, setAvailability] = useState<AvailableSlot[]>([]);
  const [filter, setFilter] = useState({
    patient: "",
    doctor: "",
    mode: "",
    date: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const debouncedPatient = useDebounce(filter.patient, 400);
  const debouncedDoctor = useDebounce(filter.doctor, 400);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apptRes, patientRes, doctorRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACK_URL}/appointment`),
          fetch(`${import.meta.env.VITE_BACK_URL}/patient`),
          fetch(`${import.meta.env.VITE_BACK_URL}/doctor`),
        ]);
        setAppointments(await apptRes.json());
        const p = await patientRes.json();
        setPatients(Array.isArray(p.data) ? p.data : []);
        const d = await doctorRes.json();
        setDoctors(Array.isArray(d) ? d : []);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };
    fetchData();
  }, []);
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      const doctorMatch = !debouncedDoctor || a.doctor?._id === debouncedDoctor;
      const patientMatch =
        !debouncedPatient || a.patient?._id === debouncedPatient;
      const dateMatch =
        !filter.date || dayjs(a.date).format("YYYY-MM-DD") === filter.date;
      const modeMatch = !filter.mode || a.appointmentType === filter.mode;
      return doctorMatch && patientMatch && dateMatch && modeMatch;
    });
  }, [
    appointments,
    debouncedDoctor,
    debouncedPatient,
    filter.date,
    filter.mode,
  ]);
  const totalFiltered = filteredAppointments.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage);
  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(start, start + itemsPerPage);
  }, [filteredAppointments, currentPage]);
  const updateStatus = async (id: string, status: AppointmentStatus) => {
    try {
      await fetch(`${import.meta.env.VITE_BACK_URL}/appointment/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? { ...appt, status } : appt)),
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleAdminReschedule = async (
    appointmentId: string,
    date: string,
    time: string,
  ) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/appointment/reschedule/${appointmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            time,
            status: "Rescheduled",
            rescheduledBy: "admin",
          }),
        },
      );
      if (!res.ok) throw new Error("Failed to reschedule");
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === appointmentId
            ? { ...a, date, time, status: "Rescheduled" }
            : a,
        ),
      );
    } catch (err) {
      console.error("Reschedule failed", err);
    }
  };
  const fetchAvailability = async (doctorId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_URL}/doctor/${doctorId}/availability`,
      );
      const data = await res.json();
      setAvailability(data.availableSlots || []);
    } catch (err) {
      console.error(err);
    }
  };
  const availableDates = availability.map((a) => a.date);
  const handleClear = () => {
    setFilter({ patient: "", doctor: "", date: "", mode: "" });
  };
  return {
    appointments,
    patients,
    doctors,
    availability,
    availableDates,
    filter,
    setFilter,
    handleClear,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalFiltered,
    totalPages,
    paginatedAppointments,
    updateStatus,
    handleAdminReschedule,
    fetchAvailability,
  };
};
