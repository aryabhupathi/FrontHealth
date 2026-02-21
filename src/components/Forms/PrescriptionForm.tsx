import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import type {
  Doctor,
  Medicine,
  Patient,
  Prescription,
} from "../../types/PrescriptionType";
interface PrescriptionFormProps {
  initialData?: Prescription | null;
  patients: Patient[];
  doctors: Doctor[];
  onSubmit: (data: Omit<Prescription, "_id">, id?: string) => Promise<void>;
  onCancel: () => void;
}
const emptyMedicine: Medicine = {
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
  notes: "",
};
const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  initialData,
  patients,
  doctors,
  onSubmit,
  onCancel,
}) => {
  const isEditMode = !!initialData;
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([emptyMedicine]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (initialData) {
      setPatientId(initialData.patient._id);
      setDoctorId(initialData.doctor._id);
      setDiagnosis(initialData.diagnosis);
      setAdvice(initialData.advice || "");
      setMedicines(
        initialData.medicines.length > 0
          ? initialData.medicines
          : [emptyMedicine],
      );
    }
  }, [initialData]);
  const handleMedicineChange = (
    index: number,
    field: keyof Medicine,
    value: string,
  ) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };
  const addMedicine = () => {
    setMedicines((prev) => [...prev, { ...emptyMedicine }]);
  };
  const removeMedicine = (index: number) => {
    if (medicines.length === 1) return;
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = async () => {
    if (!patientId || !doctorId || !diagnosis) return;
    const selectedPatient = patients.find((p) => p._id === patientId);
    const selectedDoctor = doctors.find((d) => d._id === doctorId);
    if (!selectedPatient || !selectedDoctor) return;
    const payload: Omit<Prescription, "_id"> = {
      patient: selectedPatient,
      doctor: selectedDoctor,
      diagnosis,
      advice,
      medicines: medicines.filter((m) => m.name.trim() !== ""),
    };
    try {
      setLoading(true);
      await onSubmit(payload, initialData?._id);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {isEditMode ? "Update Prescription" : "Create Prescription"}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            label="Patient"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="" />
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.fullName}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            label="Doctor"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="" />
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.fullName}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Advice"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle1" mt={3} mb={1}>
        Medicines
      </Typography>
      {medicines.map((med, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            {(
              ["name", "dosage", "frequency", "duration"] as (keyof Medicine)[]
            ).map((field) => (
              <Grid key={field} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label={field}
                  value={med[field] || ""}
                  onChange={(e) =>
                    handleMedicineChange(index, field, e.target.value)
                  }
                />
              </Grid>
            ))}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="notes"
                value={med.notes || ""}
                onChange={(e) =>
                  handleMedicineChange(index, "notes", e.target.value)
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }} textAlign="right">
              <IconButton onClick={() => removeMedicine(index)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Button startIcon={<Add />} onClick={addMedicine}>
        Add Medicine
      </Button>
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {isEditMode ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};
export default PrescriptionForm;
