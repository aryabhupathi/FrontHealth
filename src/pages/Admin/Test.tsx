import { useState } from "react";
import { useMediaQuery, Box, Typography } from "@mui/material";
import {
  AddButton,
  PageTitle,
  PatientContainer,
} from "../../components/styledcomp";
import { useLabTests } from "../../hooks/useLabTest";
import { LabTestsFilters } from "../../components/Filters/LabTestFilters";
import LabTestsCards from "../../components/Cards/LabTestsCard";
import LabTestsTable from "../../components/Tables/LabTestTable";
import LabTestFormDialog from "../../components/Forms/LabTestForm";
const LabTestsAdmin = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [filterOpen, setFilterOpen] = useState(false);
  const lab = useLabTests();
  return (
    <PatientContainer>
      <PageTitle variant="h5">Test Catalog</PageTitle>
      <Box display="flex" justifyContent="right" mb={1}>
        <AddButton size="small" onClick={lab.openAdd}>
          + Add Test
        </AddButton>
      </Box>
      <LabTestsFilters
        filter={lab.filter}
        setFilter={lab.setFilter}
        tests={lab.rawTests}
      />
      <Typography variant="subtitle1" mt={1} mb={1}>
        Tests available ({lab.tests.length})
      </Typography>
      {isMobile ? (
        <LabTestsCards
          tests={lab.tests}
          onEdit={lab.openEdit}
          onToggle={lab.toggleActive}
        />
      ) : (
        <LabTestsTable
          tests={lab.tests}
          onEdit={lab.openEdit}
          onToggle={lab.toggleActive}
        />
      )}
      <LabTestFormDialog
        open={lab.open}
        editing={lab.editing}
        onClose={lab.closeDialog}
        onSave={lab.saveTest}
      />
    </PatientContainer>
  );
};
export default LabTestsAdmin;
