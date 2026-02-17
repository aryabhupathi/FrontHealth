/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import type IPatient from "../types/PatientType";
import useDebounce from "../components/Debounce";

export function usePatient() {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [filter, setFilter] = useState({
    patientName: "",
    condition: "",
    bloodGroup: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 10;
const debouncedFilter = useDebounce(filter, 400);
  const fetchPatients = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/patient`);
      const data = await res.json();
      setPatients(
        (data.data || []).map((p: any) => ({
          ...p,
          dob: p.dob ? dayjs(p.dob) : null,
        })),
      );
    } catch {
      setPatients([]);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const nameMatch = p.fullName
        ?.toLowerCase()
        .includes(debouncedFilter.patientName.toLowerCase());

      const bloodMatch =
        !debouncedFilter.bloodGroup || p.bloodGroup === debouncedFilter.bloodGroup;

      const conditionMatch =
        !debouncedFilter.condition ||
        (Array.isArray(p.conditions) &&
          p.conditions.some((c) =>
            c.toLowerCase().includes(debouncedFilter.condition.toLowerCase()),
          ));

      return nameMatch && bloodMatch && conditionMatch;
    });
  }, [patients, debouncedFilter]);

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage,
  );

  return {
    patients,
    fetchPatients,
    filter,
    setFilter,
    paginatedPatients,
    filteredPatients,
    currentPage,
    setCurrentPage,
    totalPages,
    patientsPerPage,
  };
}
