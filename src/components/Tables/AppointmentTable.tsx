import React from "react";
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
} from "@mui/material";
import { PatientTableHead } from "../../components/styledcomp";
import type { Appointment } from "../../hooks/useAppointment";
interface AppointmentTableProps {
  appointments: Appointment[];
  currentPage: number;
  itemsPerPage: number;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onReschedule: (appointment: Appointment) => void;
}
const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  currentPage,
  itemsPerPage,
  onConfirm,
  onCancel,
  onReschedule,
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
              backgroundColor: "action.hover",
              "& th": { fontWeight: 600 },
            }}
          >
            <TableCell>Id</TableCell>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </PatientTableHead>
        <TableBody>
          {appointments.length ? (
            appointments.map((a, i) => (
              <TableRow
                key={a._id}
                sx={{
                  "& .MuiTableCell-root": {
                    py: 0.3,
                    height: 24,
                  },
                }}
              >
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + i + 1}
                </TableCell>
                <TableCell>{a.patient?.fullName || "—"}</TableCell>
                <TableCell>{a.doctor?.fullName || "—"}</TableCell>
                <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                <TableCell>{a.time}</TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell>{a.appointmentType}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      color="success"
                      sx={{ minWidth: 0 }}
                      size="small"
                      disabled={
                        a.status === "Confirmed" || a.status === "Completed"
                      }
                      onClick={() => onConfirm(a._id)}
                    >
                      confirm
                    </Button>
                    <Button
                      color="error"
                      sx={{ minWidth: 0 }}
                      size="small"
                      disabled={
                        a.status === "Cancelled" || a.status === "Completed"
                      }
                      onClick={() => onCancel(a._id)}
                    >
                      cancel
                    </Button>
                    <Button
                      size="small"
                      disabled={
                        a.status === "Completed" || a.status === "Cancelled"
                      }
                      onClick={() => onReschedule(a)}
                    >
                      Reschedule
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No appointments
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default AppointmentTable;
