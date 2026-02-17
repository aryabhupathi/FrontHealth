import { useState } from "react";
import { ZodError } from "zod";
import type IPatient from "../types/PatientType";
import { FormAdminSchema } from "../schemas/patient.schema";
const emptyForm: IPatient = {
  fullName: "",
  email: "",
  gender: "",
  dob: undefined,
  bloodGroup: "",
  contact: { phone: "", address: "" },
  allergies: [],
  conditions: [],
  medications: [],
};
export function usePatientForm() {
  const [formData, setFormData] = useState<IPatient>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validate = () => {
    try {
      FormAdminSchema.parse({
        ...formData,
        dob: formData.dob ? formData.dob.toDate() : undefined,
      });
      setErrors({});
      return true;
    } catch (err) {
      const fieldErrors: Record<string, string> = {};
      if (err instanceof ZodError) {
        err.issues.forEach((i) => {
          const key = i.path.join(".");
          if (!fieldErrors[key]) {
            fieldErrors[key] = i.message;
          }
        });
      }
      setErrors(fieldErrors);
      return false;
    }
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
