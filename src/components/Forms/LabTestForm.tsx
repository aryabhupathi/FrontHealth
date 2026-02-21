/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import type { LabTest } from "../../types/LabTestTypes";
import { useLabTestForm } from "../../hooks/useLabTestForm";
interface LabTestFormDialogProps {
  open: boolean;
  editing: LabTest | null;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}
const LabTestFormDialog: React.FC<LabTestFormDialogProps> = ({
  open,
  editing,
  onClose,
  onSave,
}) => {
  const {
    formData,
    setFormData,
    errors,
    validate,
    reset,
    isSubmitting,
    setIsSubmitting,
  } = useLabTestForm(editing ?? undefined);
  useEffect(() => {
    if (editing) {
      setFormData(editing);
    } else {
      reset();
    }
  }, [editing, reset, setFormData]);
  const updateField = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSave = async () => {
    if (!validate()) return;
    try {
      setIsSubmitting(true);
      await onSave(formData);
      reset();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
                value={formData[key as keyof typeof formData] ?? ""}
                onChange={(e) =>
                  updateField(
                    key as keyof typeof formData,
                    type === "number" ? Number(e.target.value) : e.target.value,
                  )
                }
                error={!!errors[key]}
                helperText={errors[key]}
              />
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              size="small"
              label="Sample Type"
              value={formData.sampleType}
              onChange={(e) => updateField("sampleType", e.target.value)}
              error={!!errors.sampleType}
              helperText={errors.sampleType}
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
              value={formData.priceType}
              onChange={(e) => updateField("priceType", e.target.value)}
            >
              <MenuItem value="FIXED">Fixed</MenuItem>
              <MenuItem value="VARIABLE">Variable</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label="Preparation Instructions"
              value={formData.preparationInstructions}
              onChange={(e) =>
                updateField("preparationInstructions", e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography display="flex" alignItems="center" gap={1}>
              Home Collection Allowed
              <Switch
                checked={formData.homeCollectionAllowed}
                onChange={(e) =>
                  updateField("homeCollectionAllowed", e.target.checked)
                }
              />
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          {editing ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LabTestFormDialog;
