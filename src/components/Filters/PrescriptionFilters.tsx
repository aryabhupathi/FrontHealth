import React from "react";
import { Collapse, Box, Typography, IconButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  AutoText,
  DeleteButton,
  FilterAutocomplete,
  FilterWrapper,
} from "../../components/styledcomp";
import type { Doctor, Patient } from "../../types/PrescriptionType";
interface PrescriptionFiltersProps {
  doctors: Doctor[];
  patients: Patient[];
  allMedicineNames: string[];
  doctorSearch: string;
  patientSearch: string;
  medicineSearch: string;
  setDoctorSearch: (value: string) => void;
  setPatientSearch: (value: string) => void;
  setMedicineSearch: (value: string) => void;
  onClear: () => void;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
}
const PrescriptionFilters: React.FC<PrescriptionFiltersProps> = ({
  doctors,
  patients,
  allMedicineNames,
  doctorSearch,
  patientSearch,
  medicineSearch,
  setDoctorSearch,
  setPatientSearch,
  setMedicineSearch,
  onClear,
  filterOpen,
  setFilterOpen,
}) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFilterOpen(!filterOpen)} size="small">
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <FilterWrapper>
          <FilterAutocomplete
            options={[...new Set(doctors.map((d) => d.fullName))]}
            value={doctorSearch || null}
            onChange={(_, value) => setDoctorSearch(value || "")}
            renderInput={(params) => (
              <AutoText {...params} label="Doctor" size="small" />
            )}
          />
          <FilterAutocomplete
            options={[...new Set(patients.map((p) => p.fullName))]}
            value={patientSearch || null}
            onChange={(_, value) => setPatientSearch(value || "")}
            renderInput={(params) => (
              <AutoText {...params} label="Patient" size="small" />
            )}
          />
          <FilterAutocomplete
            options={allMedicineNames}
            getOptionLabel={(option) => option}
            value={medicineSearch || null}
            onChange={(_, value) => setMedicineSearch(value || "")}
            renderInput={(params) => (
              <AutoText {...params} label="Medicine" size="small" />
            )}
          />
          <DeleteButton
            onClick={onClear}
            sx={{
              mt: { xs: 0.5, md: 0 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            CLEAR
          </DeleteButton>
        </FilterWrapper>
      </Collapse>
    </>
  );
};
export default PrescriptionFilters;
