import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useMediaQuery,
  Collapse,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import useDebounce from "../../components/Debounce";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  AutoText,
  CardContentBox,
  DefaultButton,
  DeleteButton,
  FilterAutocomplete,
  FilterWrapper,
  PageTitle,
  PaginationBox,
  PatientCard,
  PatientContainer,
  PatientTableHead,
} from "../../components/styledcomp";
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
  const isMobile = useMediaQuery("(max-width:900px)");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const debouncedSearch = useDebounce(query, 400);
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
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (loading) return <Box p={3}>Loading patients...</Box>;
  return (
    <PatientContainer>
      <PageTitle variant="h5">Patients You’ve Treated</PageTitle>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={() => setFilterOpen((prev) => !prev)} size="small">
          {filterOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={filterOpen} sx={{ py: 1 }}>
        <FilterWrapper>
          <FilterAutocomplete
            value={query}
            onInputChange={(_e, newValue) => setQuery(newValue)}
            options={patients.map((d) => d.fullName)}
            renderInput={(params) => (
              <AutoText
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ minWidth: { sm: 180 } }}
                placeholder="Type doctor name..."
              />
            )}
            size="small"
          />
          <FilterAutocomplete
            options={allConditions}
            value={condition}
            onChange={(_, val) => {
              setCondition(val || "");
              setCurrentPage(1);
            }}
            renderInput={(params) => (
              <AutoText {...params} label="Condition" size="small" />
            )}
            size="small"
          />
          <FilterAutocomplete
            options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            value={bloodGroup || ""}
            onChange={(_, val) => {
              setBloodGroup(val || "");
              setCurrentPage(1);
            }}
            renderInput={(params) => (
              <AutoText {...params} label="Blood Group" size="small" />
            )}
            size="small"
          />
          <DeleteButton
            size="small"
            onClick={() => {
              setBloodGroup("");
              setCondition("");
              setQuery("");
            }}
          >
            Clear
          </DeleteButton>
        </FilterWrapper>
      </Collapse>
      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {paginatedPatients.map((p) => (
            <PatientCard key={p._id}>
              <CardContentBox>
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
              </CardContentBox>
            </PatientCard>
          ))}
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
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Conditions</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </PatientTableHead>
            <TableBody>
              {paginatedPatients.map((p) => (
                <TableRow
                  key={p._id}
                  hover
                  sx={{
                    "& .MuiTableCell-root": {
                      py: 0.3,
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
      <PaginationBox>
        <Typography variant="body2">
          Showing {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of{" "}
          {filteredPatients.length}
        </Typography>
        <Box>
          <DefaultButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <Typography variant="body2">Prev</Typography>
          </DefaultButton>
          <DefaultButton
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <Typography variant="body2">Next</Typography>
          </DefaultButton>
        </Box>
      </PaginationBox>
    </PatientContainer>
  );
};
export default DoctorPatients;
