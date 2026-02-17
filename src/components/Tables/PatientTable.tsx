import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  Button,
  TableRow,
  Box,
  Tooltip,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type IPatient from "../../types/PatientType";
import { StyledTableRow } from "../styledcomp";
interface Props {
  patients: IPatient[];
  onEdit: (p: IPatient) => void;
  onDelete: (id?: string) => void;
  currentPage: number;
  patientsPerPage: number;
}
export function PatientTable({
  patients,
  currentPage,
  patientsPerPage,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Table size="small">
      <TableHead sx={{ backgroundColor: "action.hover" }}>
        <TableRow>
          <TableCell width={60}>No</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Blood Group</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((p, index) => (
          <StyledTableRow key={p._id}>
            <TableCell>
              {(currentPage - 1) * patientsPerPage + index + 1}
            </TableCell>
            <TableCell>{p.fullName}</TableCell>
            <TableCell>{p.gender}</TableCell>
            <TableCell>{p.bloodGroup}</TableCell>
            <TableCell>{p.contact?.phone}</TableCell>
            <TableCell align="center">
              <Box display="flex" justifyContent="center" gap={1}>
                <Tooltip title="Edit">
                  <Button
                    sx={{ minWidth: 0 }}
                    size="small"
                    onClick={() => onEdit(p)}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </Tooltip>
                <Tooltip title="Delete">
                  <Button
                    sx={{ minWidth: 0 }}
                    size="small"
                    color="error"
                    onClick={() => onDelete(p._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Tooltip>
              </Box>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
