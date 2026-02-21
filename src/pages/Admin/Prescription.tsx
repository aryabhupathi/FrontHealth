import React, { useState } from "react";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import {
  PatientContainer,
  PageTitle,
  PaginationBox,
  DefaultButton,
} from "../../components/styledcomp";
import { usePrescriptions } from "../../hooks/usePrescription";
import PrescriptionFilters from "../../components/Filters/PrescriptionFilters";
import PrescriptionCards from "../../components/Cards/PrescriptionCard";
import PrescriptionTable from "../../components/Tables/PrescriptionTable";
import ViewPrescriptionModal from "../../components/ViewPrescription";
const Prescriptions: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    doctors,
    patients,
    allMedicineNames,
    doctorSearch,
    patientSearch,
    medicineSearch,
    setDoctorSearch,
    setPatientSearch,
    setMedicineSearch,
    clearFilters,
    paginatedPrescriptions,
    totalFiltered,
    totalPages,
    currentPage,
    setCurrentPage,
    startIndex,
    selected,
    setSelected,
  } = usePrescriptions();
  return (
    <PatientContainer>
      <PageTitle variant="h5">Prescription</PageTitle>
      <PrescriptionFilters
        doctors={doctors}
        patients={patients}
        allMedicineNames={allMedicineNames}
        doctorSearch={doctorSearch}
        patientSearch={patientSearch}
        medicineSearch={medicineSearch}
        setDoctorSearch={setDoctorSearch}
        setPatientSearch={setPatientSearch}
        setMedicineSearch={setMedicineSearch}
        onClear={clearFilters}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
      />
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="subtitle1" mb={1}>
        Prescriptions ({totalFiltered})
      </Typography>
      {isMobile ? (
        <PrescriptionCards
          prescriptions={paginatedPrescriptions}
          startIndex={startIndex}
          onView={setSelected}
        />
      ) : (
        <PrescriptionTable
          prescriptions={paginatedPrescriptions}
          startIndex={startIndex}
          onView={setSelected}
        />
      )}
      <PaginationBox>
        <Typography variant="body2" color="text.secondary">
          Showing {totalFiltered === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + 10, totalFiltered)} of {totalFiltered}
        </Typography>
        <Box>
          <DefaultButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            size="small"
          >
            <Typography variant="body2">Prev</Typography>
          </DefaultButton>
          <DefaultButton
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            size="small"
          >
            <Typography variant="body2">Next</Typography>
          </DefaultButton>
        </Box>
      </PaginationBox>
      <ViewPrescriptionModal
        prescription={selected}
        onClose={() => setSelected(null)}
      />
    </PatientContainer>
  );
};
export default Prescriptions;
