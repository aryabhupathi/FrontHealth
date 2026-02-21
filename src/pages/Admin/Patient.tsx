/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { usePatientForm } from "../../hooks/usePatientForm";
import { PatientFilters } from "../../components/Filters/PatientFilters";
import { PatientCards } from "../../components/Cards/PatientCard";
import { PatientTable } from "../../components/Tables/PatientTable";
import { usePatient } from "../../hooks/usePatient";
import type IPatient from "../../types/PatientType";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import dayjs from "dayjs";
import { PatientForm } from "../../components/Forms/PatientForm";
export default function PatientPage() {
  const {
    paginatedPatients,
    filteredPatients,
    fetchPatients,
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    patientsPerPage,
    patients,
  } = usePatient();
  const form = usePatientForm();
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<IPatient | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [createLogin, setCreateLogin] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const normalizePatientForForm = (patient: IPatient): IPatient => ({
    ...patient,
    fullName: String(patient.fullName ?? ""),
    email: String(patient.email ?? ""),
    gender: String(patient.gender ?? ""),
    bloodGroup: String(patient.bloodGroup ?? ""),
    dob: patient.dob ? dayjs(patient.dob) : null,
    contact: {
      phone: String(patient.contact?.phone ?? ""),
      address: String(patient.contact?.address ?? ""),
    },
    allergies: Array.isArray(patient.allergies) ? patient.allergies : [],
    conditions: Array.isArray(patient.conditions) ? patient.conditions : [],
    medications: Array.isArray(patient.medications) ? patient.medications : [],
  });
  const handleAdd = () => {
    setEditingPatient(null);
    setCreateLogin(false);
    form.reset();
    setShowModal(true);
  };
  const handleEdit = (patient: IPatient) => {
    setEditingPatient(patient);
    form.setFormData(normalizePatientForForm(patient));
    setShowModal(true);
  };
  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm("Delete this patient?")) return;
    await fetch(`${import.meta.env.VITE_BACK_URL}/patient/${id}`, {
      method: "DELETE",
    });
    fetchPatients();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validate()) return;
    form.setIsSubmitting(true);
    const payload = {
      fullName: form.formData.fullName.trim(),
      email: form.formData.email,
      phone: form.formData.contact.phone.trim(),
      address: form.formData.contact.address,
      gender: form.formData.gender,
      dob: form.formData.dob ? form.formData.dob.format("YYYY-MM-DD") : null,
      bloodGroup: form.formData.bloodGroup,
      allergies: form.formData.allergies,
      conditions: form.formData.conditions,
      medications: form.formData.medications,
      createLogin,
    };
    const method = editingPatient ? "PUT" : "POST";
    const url = editingPatient
      ? `${import.meta.env.VITE_BACK_URL}/patient/${editingPatient._id}`
      : `${import.meta.env.VITE_BACK_URL}/patient/add-patient`;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to save patient");
      }
      await fetchPatients();
      setShowModal(false);
      setEditingPatient(null);
      setCreateLogin(false);
      form.reset();
    } catch (err: any) {
      alert(err.message);
    } finally {
      form.setIsSubmitting(false);
    }
  };
  return (
    <PatientContainer>
      <PageTitle variant="h5">Patients</PageTitle>
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
          + Add Patient
        </AddButton>
      </Box>
      <Collapse in={filterOpen}>
        <PatientFilters
          filter={filter}
          setFilter={setFilter}
          patients={patients}
        />
      </Collapse>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body1" mb={2}>
        Patients ({filteredPatients.length})
      </Typography>
      {isMobile ? (
        <PatientCards
          patients={paginatedPatients}
          currentPage={currentPage}
          patientsPerPage={patientsPerPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Paper
          variant="outlined"
          sx={{
            overflow: "auto",
          }}
        >
          <PatientTable
            patients={paginatedPatients}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            patientsPerPage={patientsPerPage}
          />
        </Paper>
      )}
      <PaginationBox>
        <Typography variant="body2">
          Showing {(currentPage - 1) * patientsPerPage + 1}–
          {Math.min(currentPage * patientsPerPage, filteredPatients.length)} of{" "}
          {filteredPatients.length}
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
      <PatientForm
        open={showModal}
        editing={!!editingPatient}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        createLogin={createLogin}
        setCreateLogin={setCreateLogin}
      />
    </PatientContainer>
  );
}
