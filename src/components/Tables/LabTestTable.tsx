import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Switch,
  Button,
} from "@mui/material";
import { PatientTableHead } from "../../components/styledcomp";
import type { LabTest } from "../../types/LabTestTypes";
interface LabTestsTableProps {
  tests: LabTest[];
  onEdit: (test: LabTest) => void;
  onToggle: (id: string, active: boolean) => void;
}
const LabTestsTable: React.FC<LabTestsTableProps> = ({
  tests,
  onEdit,
  onToggle,
}) => {
  return (
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
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Billing</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Sample</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>TAT</TableCell>
            <TableCell>Home</TableCell>
            <TableCell>Active</TableCell>
            <TableCell />
          </TableRow>
        </PatientTableHead>
        <TableBody>
          {tests.map((test) => (
            <TableRow
              key={test._id}
              sx={{
                "& .MuiTableCell-root": {
                  py: 0.6,
                  height: 28,
                },
              }}
            >
              <TableCell>{test.name}</TableCell>
              <TableCell>{test.code}</TableCell>
              <TableCell>{test.billingCode || "—"}</TableCell>
              <TableCell>{test.department}</TableCell>
              <TableCell>{test.sampleType}</TableCell>
              <TableCell>₹{test.price}</TableCell>
              <TableCell>{test.priceType}</TableCell>
              <TableCell>{test.turnaroundTime}</TableCell>
              <TableCell>{test.homeCollectionAllowed ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Switch
                  checked={test.isActive}
                  onChange={(e) => onToggle(test._id, e.target.checked)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onEdit(test)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {tests.length === 0 && (
            <TableRow>
              <TableCell colSpan={11} align="center">
                No lab tests available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};
export default LabTestsTable;
