import { z } from "zod";
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const WorkingHourSchema = z
  .object({
    day: z.enum(weekDays, {
      message: "Invalid day of week",
    }),
    startTime: z
      .string()
      .regex(timeRegex, { message: "Start time must be in HH:mm format" }),
    endTime: z
      .string()
      .regex(timeRegex, { message: "End time must be in HH:mm format" }),
    isAvailable: z.boolean().optional(),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "Start time must be before end time",
    path: ["endTime"],
  });
const ConsultationFeeSchema = z.object({
  inPerson: z
    .string()
    .min(0, "Fee cannot be negative")
    .regex(/^\d+$/, { message: "Only numbers allowed" })
    .optional(),
  online: z
    .string()
    .min(0, "Fee cannot be negative")
    .regex(/^\d+$/, { message: "Only numbers allowed" })
    .optional(),
  currency: z
    .string()
    .length(3, "Currency must be a 3-letter code (e.g., INR)")
    .optional(),
});
const ContactSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone must be 10–15 digits")
    .max(15, "Phone must be 10–15 digits")
    .regex(/^\d+$/, { message: "Only numbers allowed" }),
  address: z.string().min(5, "Address too short").max(200, "Address too long"),
  email: z.email({ message: "Invalid email address" }),
});
export const FormAdminSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  gender: z
    .string()
    .refine((val) => ["Male", "Female", "Other"].includes(val), {
      message: "Invalid gender",
    }),
  bloodGroup: z
    .string()
    .refine(
      (val) => ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(val),
      {
        message: "Invalid Blood Type",
      }
    ),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name too long")
    .regex(/^[A-Za-z\s]+$/, {
      message: "Only letters and spaces allowed",
    }),
  department: z
    .string()
    .min(2, "Department is required")
    .max(50, "Department name too long"),
  specialization: z
    .array(
      z
        .string()
        .min(2, "Specialization too short")
        .max(50, "Specialization too long")
    )
    .min(1, "At least one specialization is required"),
  experience: z
    .string()
    .min(0, "Experience cannot be negative")
    .max(60, "Experience seems invalid")
    .regex(/^\d+$/, { message: "Only numbers allowed" }),
  qualification: z
    .string()
    .min(2, "Qualification too short")
    .max(100, "Qualification too long")
    .optional(),
  languagesSpoken: z
    .array(
      z
        .string()
        .min(2, "Language name too short")
        .max(30, "Language name too long")
    )
    .min(1, "At least one language is required")
    .optional(),
  about: z
    .string()
    .min(10, "About section too short")
    .max(500, "About section too long")
    .optional(),
  contact: ContactSchema,
  consultationFee: ConsultationFeeSchema.optional(),
  workingHours: z
    .array(WorkingHourSchema)
    .min(1, "At least one working day is required")
    .optional(),
  licenseNumber: z
    .string()
    .min(5, "License number too short")
    .max(30, "License number too long")
    .regex(/^[A-Za-z0-9-]+$/, {
      message: "Invalid license number format",
    })
    .optional(),
  accountStatus: z.enum(["pending", "active", "suspended"]).optional(),
});
export type PatientAdminFormValues = z.infer<typeof FormAdminSchema>;
