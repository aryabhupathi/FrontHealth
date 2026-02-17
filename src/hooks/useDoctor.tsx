import { useCallback, useEffect, useMemo, useState } from "react";
import type { IDoctor } from "../types/DoctorType";
import useDebounce from "../components/Debounce";
export function useDoctor() {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [filter, setFilter] = useState({
    doctorName: "",
    department: "",
    specialization: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 10;
  const debouncedFilter = useDebounce(filter, 400);
  const fetchDoctors = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/doctor`);
      if (!res.ok) throw new Error("Failed to fetch doctors");
      const data: IDoctor[] = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error(error);
      setDoctors([]);
    }
  }, []);
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);
  const filteredDoctors = useMemo(() => {
    const name = debouncedFilter.doctorName.trim().toLowerCase();
    const dept = debouncedFilter.department.trim().toLowerCase();
    const spec = debouncedFilter.specialization.trim().toLowerCase();
    return doctors.filter((doc) => {
      const nameMatch = !name || doc.fullName?.toLowerCase().includes(name);
      const departmentMatch =
        !dept || doc.department?.toLowerCase().includes(dept);
      const specializationMatch =
        !spec ||
        doc.specialization?.some((s) => s.toLowerCase().includes(spec));
      return nameMatch && departmentMatch && specializationMatch;
    });
  }, [doctors, debouncedFilter]);
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedFilter]);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDoctors.length / doctorsPerPage),
  );
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * doctorsPerPage;
    const end = currentPage * doctorsPerPage;
    return filteredDoctors.slice(start, end);
  }, [filteredDoctors, currentPage]);
  return {
    doctors,
    fetchDoctors,
    filter,
    setFilter,
    filteredDoctors,
    paginatedDoctors,
    currentPage,
    setCurrentPage,
    totalPages,
    doctorsPerPage,
  };
}
