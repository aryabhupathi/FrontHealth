/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type { LabTest } from "../types/LabTestTypes";
const API = `${import.meta.env.VITE_BACK_URL}/labtests`;
export type LabFilter = {
  name: string;
  department: string;
  sampleType: string;
  priceType: string;
};
export function useLabTests() {
  const [tests, setTests] = useState<LabTest[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<LabTest | null>(null);
  const [filter, setFilter] = useState<LabFilter>({
    name: "",
    department: "",
    sampleType: "",
    priceType: "",
  });
  const loadTests = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTests(data);
  };
  useEffect(() => {
    loadTests();
  }, []);
  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      const matchName = filter.name
        ? t.name.toLowerCase().includes(filter.name.toLowerCase())
        : true;
      const matchDept = filter.department
        ? t.department === filter.department
        : true;
      const matchSample = filter.sampleType
        ? t.sampleType === filter.sampleType
        : true;
      const matchPriceType = filter.priceType
        ? t.priceType === filter.priceType
        : true;
      return matchName && matchDept && matchSample && matchPriceType;
    });
  }, [tests, filter]);
  const saveTest = async (data: any) => {
    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API}/${editing._id}` : API;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const savedTest = await res.json();
    setTests((prev) => {
      if (editing) {
        return prev.map((t) => (t._id === savedTest._id ? savedTest : t));
      } else {
        return [...prev, savedTest];
      }
    });
    setOpen(false);
    setEditing(null);
  };
  const toggleActive = async (id: string, active: boolean) => {
    const res = await fetch(`${API}/${id}/toggle`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: active }),
    });
    const updated = await res.json();
    setTests((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };
  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (test: LabTest) => {
    setEditing(test);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setEditing(null);
  };
  return {
    tests: filteredTests,
    rawTests: tests,
    open,
    editing,
    filter,
    setFilter,
    openAdd,
    openEdit,
    closeDialog,
    saveTest,
    toggleActive,
  };
}
