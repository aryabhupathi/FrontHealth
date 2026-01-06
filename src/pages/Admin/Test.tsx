/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Switch,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
const API = `${import.meta.env.VITE_BACK_URL}/labtests`;
type LabTest = {
  _id: string;
  name: string;
  code: string;
  department: string;
  sampleType: string;
  price: number;
  turnaroundTime: string;
  isActive: boolean;
};
const EMPTY_FORM = {
  name: "",
  code: "",
  department: "",
  sampleType: "Blood",
  price: "",
  turnaroundTime: "",
};
export default function LabTestsAdmin() {
  const [tests, setTests] = useState<LabTest[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<LabTest | null>(null);
  const [form, setForm] = useState<any>(EMPTY_FORM);
  const loadTests = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setTests(data);
    } catch (err) {
      console.error("Failed to load tests", err);
    }
  };
  useEffect(() => {
    loadTests();
  }, []);
  const saveTest = async () => {
    try {
      const isEdit = Boolean(editingTest);
      const url = isEdit ? `${API}/${editingTest!._id}` : API;
      await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      });
      closeDialog();
      loadTests();
    } catch (err) {
      console.error("Failed to save test", err);
    }
  };
  const toggleActive = async (id: string) => {
    try {
      await fetch(`${API}/${id}/toggle`, { method: "PATCH" });
      loadTests();
    } catch (err) {
      console.error("Failed to toggle test", err);
    }
  };
  const openAddDialog = () => {
    setEditingTest(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  };
  const openEditDialog = (test: LabTest) => {
    setEditingTest(test);
    setForm(test);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setEditingTest(null);
    setForm(EMPTY_FORM);
  };
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Lab Test Catalog</Typography>
        <Button variant="contained" onClick={openAddDialog}>
          + Add Test
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Sample</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>TAT</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.length ? (
            tests.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.code}</TableCell>
                <TableCell>{t.department}</TableCell>
                <TableCell>{t.sampleType}</TableCell>
                <TableCell>₹{t.price}</TableCell>
                <TableCell>{t.turnaroundTime}</TableCell>
                <TableCell>
                  <Switch
                    checked={t.isActive}
                    onChange={() => toggleActive(t._id)}
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" onClick={() => openEditDialog(t)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No lab tests found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingTest ? "Edit Lab Test" : "Add Lab Test"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {[
              "name",
              "code",
              "department",
              "sampleType",
              "price",
              "turnaroundTime",
            ].map((field) => (
              <Grid size={{ xs: 12, sm: 6 }} key={field}>
                <TextField
                  fullWidth
                  size="small"
                  label={field.toUpperCase()}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={saveTest}
            disabled={!form.name || !form.code}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
