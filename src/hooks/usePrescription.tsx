import { useEffect, useMemo, useState } from "react";
import type { Doctor, Patient, Prescription } from "../types/PrescriptionType";
import useDebounce from "../components/Debounce";
const ITEMS_PER_PAGE = 10;
export const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selected, setSelected] = useState<Prescription | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [medicineSearch, setMedicineSearch] = useState("");
  const debouncedDoctorSearch = useDebounce(doctorSearch, 300);
  const debouncedPatientSearch = useDebounce(patientSearch, 300);
  const debouncedMedicineSearch = useDebounce(medicineSearch, 300);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [presRes, patientRes, doctorRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACK_URL}/prescription`),
          fetch(`${import.meta.env.VITE_BACK_URL}/patient`),
          fetch(`${import.meta.env.VITE_BACK_URL}/doctor`),
        ]);
        const presData = await presRes.json();
        const patientData = await patientRes.json();
        const doctorData = await doctorRes.json();
        setPrescriptions(Array.isArray(presData) ? presData : []);
        setPatients(Array.isArray(patientData.data) ? patientData.data : []);
        setDoctors(Array.isArray(doctorData) ? doctorData : []);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };
    fetchData();
  }, []);
  const allMedicineNames = useMemo(() => {
    return Array.from(
      new Set(
        prescriptions.flatMap((p) =>
          p.medicines.map((m) => m.name.trim().toLowerCase()),
        ),
      ),
    )
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .sort();
  }, [prescriptions]);
  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((pres) => {
      const matchesDoctor = debouncedDoctorSearch
        ? pres.doctor.fullName
            .toLowerCase()
            .includes(debouncedDoctorSearch.toLowerCase())
        : true;
      const matchesPatient = debouncedPatientSearch
        ? pres.patient.fullName
            .toLowerCase()
            .includes(debouncedPatientSearch.toLowerCase()) ||
          pres.patient.patientId
            .toLowerCase()
            .includes(debouncedPatientSearch.toLowerCase())
        : true;
      const matchesMedicine = debouncedMedicineSearch
        ? pres.medicines.some((m) =>
            m.name
              .toLowerCase()
              .includes(debouncedMedicineSearch.toLowerCase()),
          )
        : true;
      return matchesDoctor && matchesPatient && matchesMedicine;
    });
  }, [
    prescriptions,
    debouncedDoctorSearch,
    debouncedPatientSearch,
    debouncedMedicineSearch,
  ]);
  const totalFiltered = filteredPrescriptions.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPrescriptions = useMemo(() => {
    return filteredPrescriptions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPrescriptions, startIndex]);
  const clearFilters = () => {
    setDoctorSearch("");
    setPatientSearch("");
    setMedicineSearch("");
    setCurrentPage(1);
  };
  return {
    prescriptions,
    patients,
    doctors,
    allMedicineNames,
    filteredPrescriptions,
    paginatedPrescriptions,
    totalFiltered,
    totalPages,
    startIndex,
    doctorSearch,
    patientSearch,
    medicineSearch,
    setDoctorSearch,
    setPatientSearch,
    setMedicineSearch,
    clearFilters,
    currentPage,
    setCurrentPage,
    selected,
    setSelected,
  };
};
