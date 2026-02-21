// labtest.schema.ts

import { z } from "zod";

export const LabTestSchema = z.object({
  name: z.string().min(1, "Test name is required"),
  code: z.string().min(1, "Test code is required"),
  billingCode: z.string().optional(),
  department: z.string().min(1, "Department is required"),
  sampleType: z.string().min(1, "Sample type is required"),
  price: z
    .number({ message: "Price must be a number" })
    .min(0, "Price must be positive"),
  priceType: z.enum(["FIXED", "VARIABLE"]),
  turnaroundTime: z.string().min(1, "Turnaround time is required"),
  homeCollectionAllowed: z.boolean(),
  preparationInstructions: z.string().optional(),
});
