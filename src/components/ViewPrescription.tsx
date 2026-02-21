import React from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import type { Prescription } from "../types/PrescriptionType";
import { DeleteButton } from "./styledcomp";
interface ViewPrescriptionModalProps {
  prescription: Prescription | null;
  onClose: () => void;
}
const ViewPrescriptionModal: React.FC<ViewPrescriptionModalProps> = ({
  prescription,
  onClose,
}) => {
  return (
    <Modal open={!!prescription} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
        }}
      >
        {prescription && (
          <>
            <Typography
              variant="h6"
              component="h2"
              mb={2}
              sx={{
                justifyContent: "center",
                display: "flex",
                fontWeight: "bold",
              }}
            >
              Prescription Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body1">
                  <strong>Patient:</strong> {prescription.patient.fullName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body1">
                  <strong>Doctor:</strong> {prescription.doctor.fullName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body1">
                  <strong>Diagnosis:</strong> {prescription.diagnosis || "—"}
                </Typography>
              </Grid>
              {prescription.advice && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body1">
                    <strong>Advice:</strong> {prescription.advice}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Typography variant="subtitle1" gutterBottom>
              Medicines
            </Typography>
            <Box sx={{ overflowX: "auto", mb: 2 }}>
              <Table size="small" sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      "& .MuiTableCell-root": {
                        py: 1,
                        height: 24,
                      },
                    }}
                  >
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                    >
                      Dosage
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                    >
                      Frequency
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                    >
                      Duration
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "0.875rem" }}
                    >
                      Notes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prescription.medicines.map((m, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "& .MuiTableCell-root": {
                          py: 1,
                          height: 24,
                        },
                      }}
                    >
                      <TableCell>{m.name || "—"}</TableCell>
                      <TableCell>{m.dosage || "—"}</TableCell>
                      <TableCell>{m.frequency || "—"}</TableCell>
                      <TableCell>{m.duration || "—"}</TableCell>
                      <TableCell>{m.notes || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box textAlign="right">
              <DeleteButton
                onClick={onClose}
                sx={{ minWidth: { xs: "100%", sm: "auto" } }}
              >
                Close
              </DeleteButton>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
export default ViewPrescriptionModal;
