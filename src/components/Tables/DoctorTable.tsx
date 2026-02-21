import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  Button,
  TableRow,
  Box,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { StyledTableRow } from "../styledcomp";
import type { IDoctor } from "../../types/DoctorType";
interface Props {
  doctors: IDoctor[];
  onEdit: (p: IDoctor) => void;
  onDelete: (id?: string) => void;
  currentPage: number;
  doctorsPerPage: number;
}
export function DoctorTable({
  doctors,
  currentPage,
  doctorsPerPage,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Table size="small">
      <TableHead sx={{ backgroundColor: "action.hover" }}>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Specialization</TableCell>
          <TableCell>Experience</TableCell>
          <TableCell>Contact</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {doctors.map((p, index) => (
          <StyledTableRow key={p._id}>
            <TableCell>
              {(currentPage - 1) * doctorsPerPage + index + 1}
            </TableCell>
            <TableCell>{p.fullName}</TableCell>
            <TableCell>{p.department}</TableCell>
            <TableCell>{p.specialization.join(", ")}</TableCell>
            <TableCell>{p.experience || "-"} yrs</TableCell>
            <TableCell>{p.contact?.phone}</TableCell>
            <TableCell>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  sx={{ minWidth: 0 }}
                  color="primary"
                  size="small"
                  onClick={() => onEdit(p)}
                >
                  <EditIcon />
                </Button>
                <Button
                  sx={{ minWidth: 0 }}
                  size="small"
                  color="error"
                  onClick={() => onDelete(p._id)}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
