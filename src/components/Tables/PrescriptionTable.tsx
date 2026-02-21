import React from "react";
import { Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { PatientTableHead, UpdateButton } from "../../components/styledcomp";
import type { Prescription } from "../../types/PrescriptionType";
interface PrescriptionTableProps {
  prescriptions: Prescription[];
  startIndex: number;
  onView: (prescription: Prescription) => void;
}
const PrescriptionTable: React.FC<PrescriptionTableProps> = ({
  prescriptions,
  startIndex,
  onView,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "auto",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Table>
        <PatientTableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                py: 1,
                height: 24,
              },
            }}
          >
            <TableCell>Id</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Diagnosis</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </PatientTableHead>
        <TableBody>
          {prescriptions.map((pres, index) => (
            <TableRow
              key={pres._id}
              sx={{
                "& .MuiTableCell-root": {
                  py: 1,
                  height: 24,
                },
              }}
            >
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell>
                {pres.patient.fullName} ({pres.patient.patientId})
              </TableCell>
              <TableCell>{pres.doctor.fullName}</TableCell>
              <TableCell>{pres.diagnosis || "—"}</TableCell>
              <TableCell>
                <UpdateButton
                  size="small"
                  variant="outlined"
                  onClick={() => onView(pres)}
                >
                  View
                </UpdateButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default PrescriptionTable;
