/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import { getPatientStyles } from "../../themes/theme";
import useDebounce from "../../components/Debounce";
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
  const { mode } = useThemeContext();
  const styles = getPatientStyles(mode);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width:768px)");
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
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        Doctors You’ve Consulted
      </Typography>
      <Box>
        <Autocomplete
          value={searchValue}
          onInputChange={(_e, newValue) => setSearchValue(newValue)}
          options={doctors.map((d) => d.fullName)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Doctor"
              variant="outlined"
              size="small"
              placeholder="Type doctor name..."
            />
          )}
          sx={styles.filterField}
        />
      </Box>
      <Divider sx={{ m: 2 }} />
      {isMobile ? (
        <Box>
          {currentDoctors.length > 0 ? (
            currentDoctors.map((p, i) => (
              <Paper key={p._id} sx={styles.patientCard}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
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
              </Paper>
            ))
          ) : (
            <Typography align="center" color="text.secondary" py={3}>
              No doctors found
            </Typography>
          )}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead sx={styles.tableHead}>
              <TableRow
                sx={{
                  "& .MuiTableCell-root": { py: 1, height: 24 },
                }}
              >
                <TableCell>Doctor Name</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Account Status</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentDoctors.map((d) => (
                <TableRow
                  key={d._id}
                  hover
                  sx={{
                    "& .MuiTableCell-root": { py: 1, height: 24 },
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
      <Box sx={styles.paginationBox}>
        <Typography variant="body2">
          Showing {(currentPage - 1) * doctorsPerPage + 1}–
          {Math.min(currentPage * doctorsPerPage, filtered.length)} of{" "}
          {filtered.length}
        </Typography>
        <Box>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default PatientDoctors;
