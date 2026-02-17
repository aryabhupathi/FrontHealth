import { Typography, Button, Tooltip } from "@mui/material";
import type IPatient from "../../types/PatientType";
import {
  CardActions,
  CardContentBox,
  CardHeaderBox,
  CardTitle,
  PatientCard,
} from "../styledcomp";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
export function PatientCards({
  patients,
  currentPage,
  patientsPerPage,
  onEdit,
  onDelete,
}: {
  patients: IPatient[];
  currentPage: number;
  patientsPerPage: number;
  onEdit: (p: IPatient) => void;
  onDelete: (id?: string) => void;
}) {
  return (
    <>
      {patients.map((p, i) => (
        <PatientCard key={p._id} sx={{ mb: 1 }}>
          <CardHeaderBox>
            <CardTitle variant="subtitle2">
              {(currentPage - 1) * patientsPerPage + i + 1}. {p.fullName}
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
              <Typography fontWeight={600}>
                {" "}
                Gender : <strong>{p.contact?.phone}</strong>
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                {" "}
                Blood Group : <strong>{p.bloodGroup}</strong>
              </Typography>
            </div>
            <div>
              <Typography variant="body2">
                {" "}
                Conditions :{" "}
                <strong>{p.conditions?.slice(0, 3).join(", ")}</strong>
              </Typography>
            </div>
          </CardContentBox>
        </PatientCard>
      ))}
    </>
  );
}
