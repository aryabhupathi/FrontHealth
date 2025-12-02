import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Autocomplete,
  Button,
  useMediaQuery,
  Collapse,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import useDebounce from "../../components/Debounce";
import { useThemeContext } from "../../context/ThemeContext";
import { getPatientStyles, TypedButton } from "../../themes/theme";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
interface Patient {
  _id: string;
  fullName: string;
  patientId: string;
  gender: string;
  bloodGroup?: string;
  conditions?: string[];
  contact?: {
    phone?: string;
    address?: string;
  };
}
interface DoctorPatientsProps {
  doctorId: string;
}
const DoctorPatients: React.FC<DoctorPatientsProps> = ({ doctorId }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const { mode } = useThemeContext();
  const styles = getPatientStyles(mode);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  // Filters
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  // Debounced search
  const debouncedSearch = useDebounce(query, 400);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filterOpen, setFilterOpen] = useState(false);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (!doctorId) return;
        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/appointment/${doctorId}/patients`
        );
        const data = await response.json();
        setPatients(data.patients || []);
      } catch (err) {
        console.error("Failed to Load Patients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, [doctorId, user]);
  const allConditions = useMemo(() => {
    const list = new Set<string>();
    patients.forEach((p) => {
      p.conditions?.forEach((c) => list.add(c));
    });
    return Array.from(list);
  }, [patients]);
  // FILTERING
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const q = debouncedSearch.toLowerCase();
      const matchesQuery = p.fullName.toLowerCase().includes(q);
      const matchesBlood = bloodGroup ? p.bloodGroup === bloodGroup : true;
      const matchesCondition = condition
        ? p.conditions?.includes(condition)
        : true;
      return matchesQuery && matchesBlood && matchesCondition;
    });
  }, [patients, debouncedSearch, bloodGroup, condition]);
  // PAGINATION
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (loading) return <Box p={3}>Loading patients...</Box>;
  return (
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        Doctors You’ve Consulted
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={() => setFilterOpen((prev) => !prev)} size="small">
          {filterOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      {/* Filters */}
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <Box sx={styles.filterBox}>
          <Autocomplete
            value={query}
            onInputChange={(_e, newValue) => setQuery(newValue)}
            options={patients.map((d) => d.fullName)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Doctor"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ minWidth: { sm: 180 } }}
                placeholder="Type doctor name..."
              />
            )}
            size="small"
            sx={styles.filterField}
          />
          <Autocomplete
            options={allConditions}
            value={condition}
            onChange={(_, val) => {
              setCondition(val || "");
              setCurrentPage(1);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Condition" size="small" />
            )}
            size="small"
            sx={styles.filterField}
          />
          <Autocomplete
            options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            value={bloodGroup || ""}
            onChange={(_, val) => {
              setBloodGroup(val || "");
              setCurrentPage(1);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Blood Group" size="small" />
            )}
            sx={styles.filterField}
            size="small"
          />
          <TypedButton
            btntype="delete"
            size="small"
            onClick={() => {
              setBloodGroup("");
              setCondition("");
              setQuery("");
            }}
          >
            Clear
          </TypedButton>
        </Box>
      </Collapse>
      {/* Desktop Table */}

      {/* Mobile Cards */}
      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {paginatedPatients.map((p) => (
            <Card
              key={p._id}
              sx={{ borderRadius: 3, boxShadow: theme.shadows[2] }}
            >
              <CardContent sx={styles.cardContent}>
                <Typography fontWeight={600}>{p.fullName}</Typography>
                <Typography variant="body2">ID: {p.patientId}</Typography>
                <Typography variant="body2">Gender: {p.gender}</Typography>
                <Typography variant="body2">
                  Blood: {p.bloodGroup || "-"}
                </Typography>
                <Typography variant="body2">
                  Conditions: {p.conditions?.join(", ") || "-"}
                </Typography>
                <Typography variant="body2">
                  Phone: {p.contact?.phone || "-"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Paper>
          <Table>
            <TableHead sx={styles.tableHead}>
              <TableRow
                sx={{
                  "& .MuiTableCell-root": {
                    py: 0.3,
                    height: 24,
                  },
                }}
              >
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Conditions</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPatients.map((p) => (
                <TableRow
                  key={p._id}
                  hover
                  sx={{
                    "& .MuiTableCell-root": {
                      py: 1,
                      height: 24,
                    },
                  }}
                >
                  <TableCell>{p.fullName}</TableCell>
                  <TableCell>{p.gender}</TableCell>
                  <TableCell>{p.bloodGroup || "-"}</TableCell>
                  <TableCell>{p.conditions?.join(", ") || "-"}</TableCell>
                  <TableCell>{p.contact?.phone || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      {/* PAGINATION */}
      <Box sx={styles.paginationBox}>
        <Typography variant="body2">
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of{" "}
          {filteredPatients.length}
        </Typography>
        <Box>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          <Button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default DoctorPatients;
