import React from "react";
import { Grid, Paper, Typography, Box, Switch, Button } from "@mui/material";
import type { LabTest } from "../../types/LabTestTypes";
interface LabTestsCardsProps {
  tests: LabTest[];
  onEdit: (test: LabTest) => void;
  onToggle: (id: string, active: boolean) => void;
}
const LabTestsCards: React.FC<LabTestsCardsProps> = ({
  tests,
  onEdit,
  onToggle,
}) => {
  return (
    <Grid container spacing={2}>
      {tests.map((test) => (
        <Grid size={{ xs: 12 }} key={test._id}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography fontWeight={600}>{test.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {test.department} • {test.sampleType}
            </Typography>
            <Typography mt={1}>
              ₹{test.price} • {test.turnaroundTime}
            </Typography>
            <Typography variant="body2" mt={0.5}>
              Home Collection: {test.homeCollectionAllowed ? "Yes" : "No"}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Typography variant="body2">Active</Typography>
              <Switch
                size="small"
                checked={test.isActive}
                onChange={(e) => onToggle(test._id, e.target.checked)}
              />
            </Box>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => onEdit(test)}
            >
              Edit
            </Button>
          </Paper>
        </Grid>
      ))}
      {tests.length === 0 && (
        <Grid size={{ xs: 12 }}>
          <Typography align="center">No lab tests available</Typography>
        </Grid>
      )}
    </Grid>
  );
};
export default LabTestsCards;
