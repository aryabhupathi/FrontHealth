/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import PrescriptionTests from "../../components/PrescriptionTests";
export default function PatientTests({ patientId }: { patientId: string }) {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [activePrescription, setActivePrescription] = useState<string | null>(
    null
  );
  useEffect(() => {
    if (!patientId) return;
    fetch(`${import.meta.env.VITE_BACK_URL}/prescription/patient/${patientId}`)
      .then((res) => res.json())
      .then(setPrescriptions)
      .catch(() => alert("Failed to load prescriptions"));
  }, [patientId]);
  if (activePrescription) {
    return <PrescriptionTests prescriptionId={activePrescription} />;
  }
  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        Your Prescriptions
      </Typography>
      <Grid container spacing={2}>
        {prescriptions.map((p) => (
          <Grid size={{ xs: 12, sm: 6 }} key={p._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography fontWeight={600}>
                  Diagnosis: {p.diagnosis}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(p.createdAt).toLocaleDateString()}
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => setActivePrescription(p._id)}
                >
                  View & Book Tests
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
