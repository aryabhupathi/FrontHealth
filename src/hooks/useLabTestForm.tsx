// useLabTestForm.ts
import { useState } from "react";
import type { LabTestFormData } from "../types/LabTestTypes";
import { LabTestSchema } from "../schemas/labTest.schema";
const emptyForm: LabTestFormData = {
  name: "",
  code: "",
  billingCode: "",
  department: "",
  sampleType: "Blood",
  price: 0,
  priceType: "FIXED",
  turnaroundTime: "",
  homeCollectionAllowed: false,
  preparationInstructions: "",
};
export function useLabTestForm(initialData?: LabTestFormData) {
  const [formData, setFormData] = useState<LabTestFormData>(
    initialData ?? emptyForm,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = () => {
    const result = LabTestSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };
  const reset = () => {
    setFormData(emptyForm);
    setErrors({});
    setIsSubmitting(false);
  };
  return {
    formData,
    setFormData,
    errors,
    validate,
    reset,
    isSubmitting,
    setIsSubmitting,
  };
}
