import { useEffect, useState, useMemo } from "react";
import {
  FilterWrapper,
  AutoText,
  FilterAutocomplete,
} from "../../components/styledcomp";
import useDebounce from "../../components/Debounce";
import type { LabTest } from "../../types/LabTestTypes";
type FilterState = {
  name: string;
  department: string;
  sampleType: string;
  priceType: string;
};
interface Props {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  tests: LabTest[];
}
export function LabTestsFilters({ filter, setFilter, tests }: Props) {
  const [localFilter, setLocalFilter] = useState(filter);
  const debouncedName = useDebounce(localFilter.name, 400);
  const debouncedDepartment = useDebounce(localFilter.department, 400);
  const debouncedSampleType = useDebounce(localFilter.sampleType, 400);
  const debouncedPriceType = useDebounce(localFilter.priceType, 400);
  useEffect(() => {
    setFilter({
      name: debouncedName,
      department: debouncedDepartment,
      sampleType: debouncedSampleType,
      priceType: debouncedPriceType,
    });
  }, [
    debouncedName,
    debouncedDepartment,
    debouncedSampleType,
    debouncedPriceType,
    setFilter,
  ]);
  const nameOptions = useMemo(
    () => Array.from(new Set(tests.map((t) => t.name).filter(Boolean))),
    [tests],
  );
  const departmentOptions = useMemo(
    () => Array.from(new Set(tests.map((t) => t.department).filter(Boolean))),
    [tests],
  );
  const sampleTypeOptions = useMemo(
    () => Array.from(new Set(tests.map((t) => t.sampleType).filter(Boolean))),
    [tests],
  );
  const priceTypeOptions = ["FIXED", "VARIABLE"];
  return (
    <FilterWrapper>
      <FilterAutocomplete
        options={nameOptions}
        value={localFilter.name || ""}
        onChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, name: value || "" }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Test Name" size="small" />
        )}
      />
      <FilterAutocomplete
        options={departmentOptions}
        value={localFilter.department || ""}
        onChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, department: value || "" }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Department" size="small" />
        )}
      />
      <FilterAutocomplete
        options={sampleTypeOptions}
        value={localFilter.sampleType || ""}
        onChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, sampleType: value || "" }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Sample Type" size="small" />
        )}
      />
      <FilterAutocomplete
        options={priceTypeOptions}
        value={localFilter.priceType || ""}
        onChange={(_, value) =>
          setLocalFilter((f) => ({ ...f, priceType: value || "" }))
        }
        renderInput={(params) => (
          <AutoText {...params} label="Price Type" size="small" />
        )}
      />
    </FilterWrapper>
  );
}
