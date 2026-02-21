import { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  useMediaQuery,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  AddButton,
  DefaultButton,
  PageTitle,
  PaginationBox,
  PatientContainer,
} from "../../components/styledcomp";
import { DoctorFilters } from "../../components/Filters/DoctorFilters";
import { DoctorCards } from "../../components/Cards/DoctorCard";
import { DoctorTable } from "../../components/Tables/DoctorTable";
import { useDoctor } from "../../hooks/useDoctor";
import type { IDoctor } from "../../types/DoctorType";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DoctorForm from "../../components/Forms/DoctorForm";
export default function DoctorPage() {
  const {
    paginatedDoctors,
    filteredDoctors,
    fetchDoctors,
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    doctorsPerPage,
    doctors,
  } = useDoctor();
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const handleAdd = () => {
    setEditingDoctor(null);
    setShowModal(true);
  };
  const handleEdit = (doctor: IDoctor) => {
    setEditingDoctor(doctor);
    setShowModal(true);
  };
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this doctor?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/doctor/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete doctor");
      }
      await fetchDoctors();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Unexpected error occurred",
      );
    }
  };
  const handleSubmit = async (doctor: IDoctor, id?: string) => {
    const method = id ? "PUT" : "POST";
    const url = id
      ? `${import.meta.env.VITE_BACK_URL}/doctor/${id}`
      : `${import.meta.env.VITE_BACK_URL}/doctor`;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to save doctor");
      }
      await fetchDoctors();
      setShowModal(false);
      setEditingDoctor(null);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Unexpected error occurred",
      );
    }
  };
  return (
    <PatientContainer>
      <PageTitle variant="h5">Doctors</PageTitle>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Filters</Typography>
          <IconButton
            onClick={() => setFilterOpen((prev) => !prev)}
            size="small"
          >
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        <AddButton size="small" onClick={handleAdd}>
          + Add Doctor
        </AddButton>
      </Box>
      <Collapse in={filterOpen}>
        <DoctorFilters
          filter={filter}
          setFilter={setFilter}
          doctors={doctors}
        />
      </Collapse>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body1" mb={2}>
        Doctors ({filteredDoctors.length})
      </Typography>
      {isMobile ? (
        <DoctorCards
          doctors={paginatedDoctors}
          currentPage={currentPage}
          doctorsPerPage={doctorsPerPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Paper variant="outlined" sx={{ overflow: "auto" }}>
          <DoctorTable
            doctors={paginatedDoctors}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            doctorsPerPage={doctorsPerPage}
          />
        </Paper>
      )}
      <PaginationBox>
        <Typography variant="body2">
          Showing {(currentPage - 1) * doctorsPerPage + 1}–
          {Math.min(currentPage * doctorsPerPage, filteredDoctors.length)} of{" "}
          {filteredDoctors.length}
        </Typography>
        <Box>
          <DefaultButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </DefaultButton>
          <DefaultButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </DefaultButton>
        </Box>
      </PaginationBox>
      <DoctorForm
        open={showModal}
        editingDoctor={editingDoctor}
        onClose={() => setShowModal(false)}
        onSave={handleSubmit}
      />
    </PatientContainer>
  );
}
