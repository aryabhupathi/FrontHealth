/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Box, Typography, Divider, useMediaQuery } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AddButton,
  PageTitle,
  PatientContainer,
  PaginationBox,
  DefaultButton,
} from "../../components/styledcomp";
import { useAppointmentHook } from "../../hooks/useAppointment";
import { useAppointmentHookForm } from "../../hooks/useAppointmentForm";
import AppointmentFilters from "../../components/Filters/AppointmentFilters";
import AppointmentCards from "../../components/Cards/AppointmentCard";
import AppointmentTable from "../../components/Tables/AppointmentTable";
import AppointmentForm from "../../components/Forms/AppointmentForm";
import RescheduleForm from "../../components/RescheduleForm";
const Appointments: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const {
    patients,
    doctors,
    availability,
    fetchAvailability,
    filter,
    setFilter,
    handleClear,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalFiltered,
    totalPages,
    paginatedAppointments,
    updateStatus,
    handleAdminReschedule,
  } = useAppointmentHook();
  const refreshAppointments = async () => {
    window.location.reload();
  };
  const formHook = useAppointmentHookForm(refreshAppointments);
  const [filterOpen, setFilterOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleAppt, setRescheduleAppt] = useState<any>(null);
  const [rescheduleDate, setRescheduleDate] = useState<Dayjs | null>(null);
  const [rescheduleTime, setRescheduleTime] = useState("");
  const openReschedule = (appt: any) => {
    setRescheduleAppt(appt);
    setRescheduleDate(null);
    setRescheduleTime("");
    setRescheduleOpen(true);
    if (appt?.doctor?._id) {
      fetchAvailability(appt.doctor._id);
    }
  };
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalFiltered);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PatientContainer>
        <PageTitle variant="h5">Appointment</PageTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <AppointmentFilters
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            filter={filter}
            setFilter={setFilter}
            doctors={doctors}
            patients={patients}
            onClear={handleClear}
          />
          <AddButton onClick={() => setOpenDialog(true)}>
            + New Appointment
          </AddButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" mb={1}>
          Appointments ({totalFiltered})
        </Typography>
        {isMobile ? (
          <AppointmentCards
            appointments={paginatedAppointments}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onConfirm={(id) => updateStatus(id, "Confirmed")}
            onCancel={(id) => updateStatus(id, "Cancelled")}
            onReschedule={openReschedule}
          />
        ) : (
          <AppointmentTable
            appointments={paginatedAppointments}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onConfirm={(id) => updateStatus(id, "Confirmed")}
            onCancel={(id) => updateStatus(id, "Cancelled")}
            onReschedule={openReschedule}
          />
        )}
        <PaginationBox>
          <Typography variant="body2">
            Showing {start}-{end} of {totalFiltered}
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
        <AppointmentForm
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          patients={patients}
          doctors={doctors}
          availability={availability}
          fetchAvailability={fetchAvailability}
          formHook={formHook}
        />
        <RescheduleForm
          open={rescheduleOpen}
          onClose={() => setRescheduleOpen(false)}
          selectedDate={rescheduleDate}
          setSelectedDate={setRescheduleDate}
          selectedTime={rescheduleTime}
          setSelectedTime={setRescheduleTime}
          availability={availability}
          onConfirm={async () => {
            if (!rescheduleAppt || !rescheduleDate || !rescheduleTime) return;
            await handleAdminReschedule(
              rescheduleAppt._id,
              dayjs(rescheduleDate).format("YYYY-MM-DD"),
              rescheduleTime,
            );
          }}
        />
      </PatientContainer>
    </LocalizationProvider>
  );
};
export default Appointments;
