import { useEffect, useState } from "react";
import { FilterWrapper, AutoText, FilterAutocomplete } from "../styledcomp";
import useDebounce from "../Debounce";
import type { IDoctor } from "../../types/DoctorType";
type FilterState = {
  doctorName: string;
  department: string;
  specialization: string;
};
interface Props {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  doctors: IDoctor[];
}
export function DoctorFilters({ filter, setFilter, doctors }: Props) {
  const [localFilter, setLocalFilter] = useState(filter);
  const debouncedName = useDebounce(localFilter.doctorName, 400);
  const debouncedDepartment = useDebounce(localFilter.department, 400);
  const debouncedSpecialization = useDebounce(localFilter.specialization, 400);
  useEffect(() => {
    setFilter({
      doctorName: debouncedName,
      department: debouncedDepartment,
      specialization: debouncedSpecialization,
    });
  }, [debouncedName, debouncedDepartment, debouncedSpecialization, setFilter]);
  const nameOptions = Array.from(
    new Set(doctors.map((p) => p.fullName).filter(Boolean)),
  );
  const departmentOptions = Array.from(
    new Set(doctors.flatMap((p) => p.department || [])),
  );
  const specializationOptions = Array.from(
    new Set(doctors.flatMap((p) => p.specialization || [])),
  );
  return (
    <FilterWrapper>
      <FilterAutocomplete
        options={nameOptions}
        value={filter.doctorName || ""}
        onChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, doctorName: value || "" }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Doctor Name" size="small" />
        )}
      />
      <FilterAutocomplete
        options={departmentOptions}
        value={filter.department || ""}
        onChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, department: value || "" }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Department" size="small" />
        )}
      />
      <FilterAutocomplete
        options={specializationOptions}
        value={filter.specialization || ""}
        onChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, specialization: value || "" }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Specialization" size="small" />
        )}
      />
    </FilterWrapper>
  );
}
