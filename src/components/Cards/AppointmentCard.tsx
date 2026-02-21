import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import {
  SaveButton,
  DeleteButton,
  DefaultButton,
  PatientCard,
  CardHeaderBox,
  CardActions,
  CardContentBox,
} from "../../components/styledcomp";
import type { Appointment } from "../../hooks/useAppointment";
interface AppointmentCardsProps {
  appointments: Appointment[];
  currentPage: number;
  itemsPerPage: number;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onReschedule: (appointment: Appointment) => void;
}
const AppointmentCards: React.FC<AppointmentCardsProps> = ({
  appointments,
  currentPage,
  itemsPerPage,
  onConfirm,
  onCancel,
  onReschedule,
}) => {
  if (!appointments.length) {
    return (
      <Typography align="center" color="text.secondary" py={3}>
        No Appointments found
      </Typography>
    );
  }
  const statusColorMap: Record<
    string,
    "default" | "success" | "warning" | "error"
  > = {
    Confirmed: "success",
    Cancelled: "error",
    Pending: "warning",
  };
  return (
    <Box>
      {appointments.map((a, i) => {
        const serial = (currentPage - 1) * itemsPerPage + i + 1;
        const date = new Date(a.date).toLocaleDateString();
        return (
          <PatientCard key={a._id}>
            <CardHeaderBox>
              <Typography variant="subtitle2" color="text.secondary">
                #{serial}
              </Typography>
              <CardActions>
                <SaveButton
                  disabled={
                    a.status === "Confirmed" || a.status === "Completed"
                  }
                  onClick={() => onConfirm(a._id)}
                  size="small"
                >
                  confirm
                </SaveButton>
                <DeleteButton
                  disabled={
                    a.status === "Cancelled" || a.status === "Completed"
                  }
                  onClick={() => onCancel(a._id)}
                  size="small"
                >
                  cancel
                </DeleteButton>
                <DefaultButton
                  size="small"
                  onClick={() => onReschedule(a)}
                  disabled={
                    a.status === "Completed" || a.status === "Cancelled"
                  }
                >
                  Reschedule
                </DefaultButton>
              </CardActions>
            </CardHeaderBox>
            <CardContentBox>
              <div>
                <Typography variant="body2" color="text.secondary">
                  Patient
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {a.patient?.fullName || "—"}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  Doctor
                </Typography>
                <Typography variant="body1">
                  {a.doctor?.fullName || "—"}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  Date & Time
                </Typography>
                <Typography variant="body1">
                  {date} • {a.time}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={a.status}
                  size="small"
                  color={statusColorMap[a.status] || "default"}
                  sx={{
                    height: "auto",
                    borderRadius: 1,
                    px: 1,
                    py: 0.25,
                  }}
                />
              </div>
              <div>
                <Typography variant="body2" color="text.secondary">
                  Mode
                </Typography>
                <Typography variant="body1">
                  {a.appointmentType || "—"}
                </Typography>
              </div>
            </CardContentBox>
          </PatientCard>
        );
      })}
    </Box>
  );
};
export default AppointmentCards;
