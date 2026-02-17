import { Typography, Button, Tooltip } from "@mui/material";
import {
  CardActions,
  CardContentBox,
  CardHeaderBox,
  CardTitle,
  PatientCard,
} from "../styledcomp";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { IDoctor } from "../../types/DoctorType";
export function DoctorCards({
  doctors,
  currentPage,
  doctorsPerPage,
  onEdit,
  onDelete,
}: {
  doctors: IDoctor[];
  currentPage: number;
  doctorsPerPage: number;
  onEdit: (p: IDoctor) => void;
  onDelete: (id?: string) => void;
}) {
  return (
    <>
      {doctors.map((p, i) => (
        <PatientCard key={p._id} sx={{ mb: 1 }}>
          <CardHeaderBox>
            <CardTitle variant="subtitle2">
              {(currentPage - 1) * doctorsPerPage + i + 1}. {p.fullName}
            </CardTitle>
            <CardActions>
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
            </CardActions>
          </CardHeaderBox>
          <CardContentBox>
            <div>
              <Typography variant="body2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="body2">{p.department || "—"}</Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">
                Specialization
              </Typography>
              <Typography variant="body2">
                {p.specialization?.join(", ") || "—"}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">
                Experience
              </Typography>
              <Typography variant="body2">
                {p.experience ? `${p.experience} yrs` : "—"}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">
                Contact
              </Typography>
              <Typography variant="body2">{p.contact?.phone || "—"}</Typography>
            </div>
          </CardContentBox>
        </PatientCard>
      ))}
    </>
  );
}
