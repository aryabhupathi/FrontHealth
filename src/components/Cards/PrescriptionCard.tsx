// PrescriptionCards.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { PatientCard, UpdateButton } from "../../components/styledcomp";
import type { Prescription } from "../../types/PrescriptionType";
interface PrescriptionCardsProps {
  prescriptions: Prescription[];
  startIndex: number;
  onView: (prescription: Prescription) => void;
}
const PrescriptionCards: React.FC<PrescriptionCardsProps> = ({
  prescriptions,
  startIndex,
  onView,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}>
      {prescriptions.map((pres, index) => (
        <PatientCard key={pres._id} sx={{ p: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 1.5, fontWeight: "medium" }}
          >
            {startIndex + index + 1}
          </Typography>
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              Patient
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {pres.patient.fullName}
            </Typography>
          </Box>
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              Doctor
            </Typography>
            <Typography variant="body1">{pres.doctor.fullName}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Diagnosis
            </Typography>
            <Typography variant="body1">{pres.diagnosis || "—"}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <UpdateButton size="small" onClick={() => onView(pres)}>
              View
            </UpdateButton>
          </Box>
        </PatientCard>
      ))}
    </Box>
  );
};
export default PrescriptionCards;
