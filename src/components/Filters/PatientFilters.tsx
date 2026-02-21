import { useEffect, useState } from "react";
import { FilterWrapper, AutoText, FilterAutocomplete } from "../styledcomp";
import useDebounce from "../Debounce";
import type IPatient from "../../types/PatientType";
type FilterState = {
  patientName: string;
  condition: string;
  bloodGroup: string;
};
interface Props {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  patients: IPatient[];
}
export function PatientFilters({ filter, setFilter, patients }: Props) {
  const [localFilter, setLocalFilter] = useState(filter);
  const debouncedName = useDebounce(localFilter.patientName, 400);
  const debouncedCondition = useDebounce(localFilter.condition, 400);
  const debouncedBloodGroup = useDebounce(localFilter.bloodGroup, 400);
  useEffect(() => {
    setFilter({
      patientName: debouncedName,
      condition: debouncedCondition,
      bloodGroup: debouncedBloodGroup,
    });
  }, [debouncedName, debouncedCondition, debouncedBloodGroup, setFilter]);
  const nameOptions = Array.from(
    new Set(patients.map((p) => p.fullName).filter(Boolean)),
  );
  const conditionOptions = Array.from(
    new Set(patients.flatMap((p) => p.conditions || [])),
  );
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  return (
    <FilterWrapper>
      <FilterAutocomplete
        options={nameOptions}
        value={localFilter.patientName}
        onInputChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, patientName: value }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Patient Name" size="small" />
        )}
      />
      <FilterAutocomplete
        options={conditionOptions}
        value={localFilter.condition}
        onInputChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, condition: value }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Condition" size="small" />
        )}
      />
      <FilterAutocomplete
        options={bloodGroupOptions}
        value={localFilter.bloodGroup}
        onInputChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, bloodGroup: value }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Blood Group" size="small" />
        )}
      />
    </FilterWrapper>
  );
}
