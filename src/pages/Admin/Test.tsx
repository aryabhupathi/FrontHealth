// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Grid,
//   Typography,
//   Switch,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// const API = `${import.meta.env.VITE_BACK_URL}/labtests`;
// type LabTest = {
//   _id: string;
//   name: string;
//   code: string;
//   department: string;
//   sampleType: string;
//   price: number;
//   turnaroundTime: string;
//   isActive: boolean;
// };
// const EMPTY_FORM = {
//   name: "",
//   code: "",
//   department: "",
//   sampleType: "Blood",
//   price: "",
//   turnaroundTime: "",
// };
// export default function LabTestsAdmin() {
//   const [tests, setTests] = useState<LabTest[]>([]);
//   const [open, setOpen] = useState(false);
//   const [editingTest, setEditingTest] = useState<LabTest | null>(null);
//   const [form, setForm] = useState<any>(EMPTY_FORM);
//   const loadTests = async () => {
//     try {
//       const res = await fetch(API);
//       const data = await res.json();
//       setTests(data);
//     } catch (err) {
//       console.error("Failed to load tests", err);
//     }
//   };
//   useEffect(() => {
//     loadTests();
//   }, []);
//   const saveTest = async () => {
//     try {
//       const isEdit = Boolean(editingTest);
//       const url = isEdit ? `${API}/${editingTest!._id}` : API;
//       await fetch(url, {
//         method: isEdit ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...form,
//           price: Number(form.price),
//         }),
//       });
//       closeDialog();
//       loadTests();
//     } catch (err) {
//       console.error("Failed to save test", err);
//     }
//   };
//   const toggleActive = async (id: string) => {
//     try {
//       await fetch(`${API}/${id}/toggle`, { method: "PATCH" });
//       loadTests();
//     } catch (err) {
//       console.error("Failed to toggle test", err);
//     }
//   };
//   const openAddDialog = () => {
//     setEditingTest(null);
//     setForm(EMPTY_FORM);
//     setOpen(true);
//   };
//   const openEditDialog = (test: LabTest) => {
//     setEditingTest(test);
//     setForm(test);
//     setOpen(true);
//   };
//   const closeDialog = () => {
//     setOpen(false);
//     setEditingTest(null);
//     setForm(EMPTY_FORM);
//   };
//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <Typography variant="h6">Lab Test Catalog</Typography>
//         <Button variant="contained" onClick={openAddDialog}>
//           + Add Test
//         </Button>
//       </Box>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Code</TableCell>
//             <TableCell>Department</TableCell>
//             <TableCell>Sample</TableCell>
//             <TableCell>Price</TableCell>
//             <TableCell>TAT</TableCell>
//             <TableCell>Active</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tests.length ? (
//             tests.map((t) => (
//               <TableRow key={t._id}>
//                 <TableCell>{t.name}</TableCell>
//                 <TableCell>{t.code}</TableCell>
//                 <TableCell>{t.department}</TableCell>
//                 <TableCell>{t.sampleType}</TableCell>
//                 <TableCell>₹{t.price}</TableCell>
//                 <TableCell>{t.turnaroundTime}</TableCell>
//                 <TableCell>
//                   <Switch
//                     checked={t.isActive}
//                     onChange={() => toggleActive(t._id)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button size="small" onClick={() => openEditDialog(t)}>
//                     Edit
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={8} align="center">
//                 No lab tests found
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
//         <DialogTitle>
//           {editingTest ? "Edit Lab Test" : "Add Lab Test"}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} mt={1}>
//             {[
//               "name",
//               "code",
//               "department",
//               "sampleType",
//               "price",
//               "turnaroundTime",
//             ].map((field) => (
//               <Grid size={{ xs: 12, sm: 6 }} key={field}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   label={field.toUpperCase()}
//                   value={form[field]}
//                   onChange={(e) =>
//                     setForm({ ...form, [field]: e.target.value })
//                   }
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDialog}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={saveTest}
//             disabled={!form.name || !form.code}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }


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
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddButton, PageTitle, PatientContainer, PatientTableHead } from "../../components/styledcomp";

const API = `${import.meta.env.VITE_BACK_URL}/labtests`;

const EMPTY_FORM = {
  code: "",
  billingCode: "",
  name: "",
  department: "",
  sampleType: "Blood",
  price: "",
  priceType: "FIXED",
  turnaroundTime: "",
  homeCollectionAllowed: false,
  preparationInstructions: "",
};

const LabTestsAdmin = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(EMPTY_FORM);
const isMobile = useMediaQuery("(max-width: 900px)");
  /* ---------------- Load Catalog ---------------- */

  const loadTests = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTests(data);
  };

  useEffect(() => {
    loadTests();
  }, []);

  /* ---------------- Save Test ---------------- */

  const saveTest = async () => {
    const method = editing ? "PATCH" : "POST";
    const url = editing ? `${API}/${editing._id}` : API;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    closeDialog();
    loadTests();
  };

  /* ---------------- Activate / Deactivate ---------------- */

  const toggleActive = async (id: string, active: boolean) => {
    await fetch(`${API}/${id}/toggle`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: active }),
    });
    loadTests();
  };

  /* ---------------- Dialog Control ---------------- */

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (test: any) => {
    setEditing(test);
    setForm(test);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  /* ---------------- UI ---------------- */

  return (
    <PatientContainer>
      <PageTitle variant="h5">Test Catalog</PageTitle>
      <Box display="flex" justifyContent="right" alignItems="center">
        <AddButton onClick={openAdd} size="small">
          + Add Tests
        </AddButton>
      </Box>
      <Typography variant="subtitle1" mb={1}>
        Tests available ({tests.length})
      </Typography>
      {/* ---------- Table ---------- */}
      {isMobile ? (
        <Grid container spacing={2}>
          {tests.map((t) => (
            <Grid size={{ xs: 12 }} key={t._id}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography fontWeight={600}>{t.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {t.department} • {t.sampleType}
                </Typography>

                <Typography mt={1}>
                  ₹{t.price} • {t.turnaroundTime}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={1}
                >
                  <Typography variant="body2">Active</Typography>
                  <Switch
                    checked={t.isActive}
                    onChange={(e) => toggleActive(t._id, e.target.checked)}
                  />
                </Box>

                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => openEdit(t)}
                >
                  Edit
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
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
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Sample</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>TAT</TableCell>
                <TableCell>Home</TableCell>
                <TableCell>Active</TableCell>
                <TableCell />
              </TableRow>
            </PatientTableHead>
            <TableBody>
              {tests.map((t) => (
                <TableRow
                  key={t._id}
                  sx={{
                    "& .MuiTableCell-root": {
                      py: 0.3,
                      height: 24,
                    },
                  }}
                >
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.code}</TableCell>
                  <TableCell>{t.department}</TableCell>
                  <TableCell>{t.sampleType}</TableCell>
                  <TableCell>₹{t.price}</TableCell>
                  <TableCell>{t.turnaroundTime}</TableCell>
                  <TableCell>
                    {t.homeCollectionAllowed ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={t.isActive}
                      onChange={(e) => toggleActive(t._id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => openEdit(t)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* ---------- Dialog ---------- */}
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>{editing ? "Edit Lab Test" : "Add Lab Test"}</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {[
              { key: "name", label: "Test Name" },
              { key: "code", label: "Test Code" },
              { key: "billingCode", label: "Billing Code" },
              { key: "department", label: "Department" },
              { key: "turnaroundTime", label: "Turnaround Time" },
              { key: "price", label: "Price", type: "number" },
            ].map(({ key, label, type }) => (
              <Grid size={{ xs: 12, sm: 6 }} key={key}>
                <TextField
                  fullWidth
                  size="small"
                  label={label}
                  type={type || "text"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </Grid>
            ))}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Sample Type"
                value={form.sampleType}
                onChange={(e) =>
                  setForm({ ...form, sampleType: e.target.value })
                }
              >
                {["Blood", "Urine", "Saliva", "Imaging", "Other"].map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Price Type"
                value={form.priceType}
                onChange={(e) =>
                  setForm({ ...form, priceType: e.target.value })
                }
              >
                <MenuItem value="FIXED">Fixed</MenuItem>
                <MenuItem value="VARIABLE">Variable</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                label="Preparation Instructions"
                multiline
                rows={2}
                value={form.preparationInstructions}
                onChange={(e) =>
                  setForm({
                    ...form,
                    preparationInstructions: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography>
                Home Collection Allowed
                <Switch
                  checked={form.homeCollectionAllowed}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      homeCollectionAllowed: e.target.checked,
                    })
                  }
                />
              </Typography>
            </Grid>
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
    </PatientContainer>
  );
}

export default LabTestsAdmin;
