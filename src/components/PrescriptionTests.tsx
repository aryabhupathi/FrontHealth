import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
} from "@mui/material";
import { useEffect, useState } from "react";
type PrescribedTest = {
  test: {
    _id: string;
    name: string;
    sampleType: string;
    turnaroundTime: string;
  };
  instructions?: string;
  isBooked: boolean;
};
export default function PrescriptionTests({
  prescriptionId,
}: {
  prescriptionId: string;
}) {
  const [tests, setTests] = useState<PrescribedTest[]>([]);
  const [selected, setSelected] = useState<PrescribedTest[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACK_URL}/prescriptions/${prescriptionId}/tests`
    )
      .then((res) => res.json())
      .then(setTests)
      .catch(() => alert("Failed to load tests"));
  }, [prescriptionId]);
  const toggleSelect = (test: PrescribedTest) => {
    if (test.isBooked) return;
    const exists = selected.some((t) => t.test._id === test.test._id);
    setSelected(
      exists
        ? selected.filter((t) => t.test._id !== test.test._id)
        : [...selected, test]
    );
  };
  const confirmBooking = async () => {
    setLoading(true);
    try {
      await fetch("/api/lab-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prescriptionId,
          testIds: selected.map((t) => t.test._id),
        }),
      });
      alert("Tests booked successfully");
      setTests((prev) =>
        prev.map((t) =>
          selected.some((s) => s.test._id === t.test._id)
            ? { ...t, isBooked: true }
            : t
        )
      );
      setSelected([]);
      setOpen(false);
    } catch {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        Prescribed Lab Tests
      </Typography>
      <Grid container spacing={2}>
        {tests.map((t) => {
          const checked = selected.some((s) => s.test._id === t.test._id);
          return (
            <Grid size={{ xs: 12, md: 6 }} key={t.test._id}>
              <Card
                variant="outlined"
                sx={{
                  opacity: t.isBooked ? 0.6 : 1,
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Checkbox
                      disabled={t.isBooked}
                      checked={checked}
                      onChange={() => toggleSelect(t)}
                    />
                    <Stack spacing={0.5}>
                      <Typography fontWeight={600}>{t.test.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Sample: {t.test.sampleType} • {t.test.turnaroundTime}
                      </Typography>
                      {t.instructions && (
                        <Typography variant="caption" color="warning.main">
                          Instructions: {t.instructions}
                        </Typography>
                      )}
                      {t.isBooked && (
                        <Typography variant="caption" color="success.main">
                          Already Booked
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          disabled={!selected.length}
          onClick={() => setOpen(true)}
        >
          Book Selected Tests
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Confirm Test Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body2" mb={1}>
            You are about to book the following tests:
          </Typography>
          <List dense>
            {selected.map((t) => (
              <ListItem key={t.test._id}>{t.test.name}</ListItem>
            ))}
          </List>
          <Typography variant="caption" color="text.secondary">
            Please follow all preparation instructions before sample collection.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={confirmBooking}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
