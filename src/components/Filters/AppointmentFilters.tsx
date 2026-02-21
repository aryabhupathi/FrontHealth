import React from "react";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  FilterAutocomplete,
  FilterWrapper,
  AutoText,
  DeleteButton,
} from "../../components/styledcomp";
export interface AppointmentFilterState {
  patient: string;
  doctor: string;
  mode: string;
  date: string;
}
interface AppointmentFiltersProps {
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filter: AppointmentFilterState;
  setFilter: React.Dispatch<React.SetStateAction<AppointmentFilterState>>;
  doctors: { _id?: string; fullName: string }[];
  patients: { _id?: string; fullName: string }[];
  onClear: () => void;
}
const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  filterOpen,
  setFilterOpen,
  filter,
  setFilter,
  doctors,
  patients,
  onClear,
}) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Filters</Typography>
          <IconButton
            onClick={() => setFilterOpen((prev) => !prev)}
            size="small"
          >
            {filterOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <FilterWrapper>
          <FilterAutocomplete
            options={[...new Set(doctors.map((d) => d.fullName))]}
            value={filter.doctor || null}
            onChange={(_, value) =>
              setFilter((prev) => ({
                ...prev,
                doctor: value || "",
              }))
            }
            renderInput={(params) => (
              <AutoText {...params} label="Doctor" size="small" />
            )}
          />
          <FilterAutocomplete
            options={[...new Set(patients.map((p) => p.fullName))]}
            value={filter.patient || null}
            onChange={(_, value) =>
              setFilter((prev) => ({
                ...prev,
                patient: value || "",
              }))
            }
            renderInput={(params) => (
              <AutoText {...params} label="Patient" size="small" />
            )}
          />
          <DatePicker
            label="Select Date"
            value={filter.date ? dayjs(filter.date) : null}
            onChange={(date) =>
              setFilter((prev) => ({
                ...prev,
                date: date ? dayjs(date).format("YYYY-MM-DD") : "",
              }))
            }
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
              },
            }}
          />
          <FilterAutocomplete
            options={["Online", "In-person"]}
            value={filter.mode || null}
            onChange={(_, value) =>
              setFilter((prev) => ({
                ...prev,
                mode: value || "",
              }))
            }
            renderInput={(params) => (
              <AutoText {...params} label="Mode" size="small" />
            )}
          />
          <DeleteButton
            sx={{
              mt: { xs: 0.5, md: 0 },
              width: { xs: "100%", md: "auto" },
            }}
            size="small"
            onClick={onClear}
          >
            CLEAR
          </DeleteButton>
        </FilterWrapper>
      </Collapse>
    </>
  );
};
export default AppointmentFilters;
