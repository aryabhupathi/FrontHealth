/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  useMediaQuery,
} from "@mui/material";
import useDebounce from "../../components/Debounce";
import {
  AutoText,
  CardContentBox,
  DefaultButton,
  FilterAutocomplete,
  FilterWrapper,
  PageTitle,
  PaginationBox,
  PatientCard,
  PatientContainer,
  PatientTableHead,
} from "../../components/styledcomp";
interface Doctor {
  _id: string;
  fullName: string;
  specialization?: string[];
  contact?: {
    phone?: string;
    address?: string;
    email?: string;
  };
  experience?: number;
  licenseNumber?: string;
  accountStatus?: string;
}
const PatientDoctors: React.FC<{ patientId: string | null }> = ({
  patientId,
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width:900px)");
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 10;
  const debouncedSearch = useDebounce(searchValue, 400);
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!patientId) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACK_URL}/appointment/${patientId}/doctors`
        );
        const data = await res.json();
        if (!res.ok || !data.success)
          throw new Error(data.message || "Failed to fetch doctors");
        setDoctors(data.doctors || []);
        setFiltered(data.doctors || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [patientId]);
  useEffect(() => {
    const lower = debouncedSearch.toLowerCase();
    const result = doctors.filter((d) =>
      d.fullName.toLowerCase().includes(lower)
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [debouncedSearch, doctors]);
  const indexOfLast = currentPage * doctorsPerPage;
  const indexOfFirst = indexOfLast - doctorsPerPage;
  const currentDoctors = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / doctorsPerPage);
  if (loading)
    return (
      <Box p={4} display="flex" alignItems="center">
        <CircularProgress size={22} sx={{ mr: 2 }} />
        Loading consulted doctors...
      </Box>
    );
  if (error)
    return (
      <Box p={4} color="error.main">
        {error}
      </Box>
    );
  return (
    <PatientContainer>
      <PageTitle variant="h5">Doctors You’ve Consulted</PageTitle>
      <FilterWrapper>
        <FilterAutocomplete
          value={searchValue}
          onInputChange={(_e, newValue) => setSearchValue(newValue)}
          options={doctors.map((d) => d.fullName)}
          renderInput={(params) => (
            <AutoText
              {...params}
              label="Search Doctor"
              variant="outlined"
              size="small"
              placeholder="Type doctor name..."
            />
          )}
        />
      </FilterWrapper>
      <Divider sx={{ m: 2 }} />
      {isMobile ? (
        <Box>
          {currentDoctors.length > 0 ? (
            currentDoctors.map((p, i) => (
              <PatientCard key={p._id}>
                <CardContentBox>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 1 }}
                  >
                    {indexOfFirst + i + 1}. {p.fullName}
                  </Typography>
                  <div>
                    <strong>Specialty:</strong> {p.specialization || "-"}
                  </div>
                  <div>
                    <strong>License:</strong> {p.licenseNumber || "-"}
                  </div>
                  <div>
                    <strong>Phone:</strong> {p.contact?.phone || "-"}
                  </div>
                </CardContentBox>
              </PatientCard>
            ))
          ) : (
            <Typography align="center" color="text.secondary" py={3}>
              No doctors found
            </Typography>
          )}
        </Box>
      ) : (
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
                  "& th": {
                    fontWeight: 600,
                  },
                }}
              >
                <TableCell>Doctor Name</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Account Status</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </PatientTableHead>
            <TableBody>
              {currentDoctors.map((d) => (
                <TableRow
                  key={d._id}
                  hover
                  sx={{
                    "& .MuiTableCell-root": { py: 0.3, height: 24 },
                  }}
                >
                  <TableCell>{d.fullName}</TableCell>
                  <TableCell>{d.specialization?.join(", ") || "-"}</TableCell>
                  <TableCell>{d.accountStatus}</TableCell>
                  <TableCell>{d.experience} yrs</TableCell>
                  <TableCell>{d.contact?.phone || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      <PaginationBox>
        <Typography variant="body2">
          Showing {(currentPage - 1) * doctorsPerPage + 1}–
          {Math.min(currentPage * doctorsPerPage, filtered.length)} of{" "}
          {filtered.length}
        </Typography>
        <Box>
          <DefaultButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <Typography variant="body2">Prev</Typography>
          </DefaultButton>
          <DefaultButton
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <Typography variant="body2">Next</Typography>
          </DefaultButton>
        </Box>
      </PaginationBox>
    </PatientContainer>
  );
};
export default PatientDoctors;
