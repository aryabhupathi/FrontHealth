// import { z } from "zod";
// /* -------------------- CONSTANTS -------------------- */
// const weekDays = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ] as const;
// const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
// /* -------------------- WORKING HOURS -------------------- */
// const WorkingHourSchema = z
//   .object({
//     day: z.enum(weekDays, { message: "Invalid day of week" }),
//     startTime: z
//       .string()
//       .min(1, "Start time is required")
//       .regex(timeRegex, "Start time must be in HH:mm format"),
//     endTime: z
//       .string()
//       .min(1, "End time is required")
//       .regex(timeRegex, "End time must be in HH:mm format"),
//     isAvailable: z.boolean().optional(),
//   })
//   .refine((d) => d.startTime < d.endTime, {
//     message: "Start time must be before end time",
//     path: ["endTime"],
//   });
// /* -------------------- FEES -------------------- */
// const ConsultationFeeSchema = z.object({
//   inPerson: z.coerce
//     .number()
//     .refine((v) => !isNaN(v), { message: "Fee must be a number" })
//     .min(0, "Fee cannot be negative")
//     .optional(),
//   online: z.coerce
//     .number()
//     .refine((v) => !isNaN(v), { message: "Fee must be a number" })
//     .min(0, "Fee cannot be negative")
//     .optional(),
//   currency: z
//     .string()
//     .length(3, "Currency must be a 3-letter code (e.g., INR)")
//     .optional(),
// });
// /* -------------------- CONTACT -------------------- */
// const ContactSchema = z.object({
//   phone: z
//     .string()
//     .trim()
//     .min(1, "Phone number is required") // ✅ REQUIRED
//     .min(10, "Phone must be at least 10 digits")
//     .max(15, "Phone must be at most 15 digits")
//     .regex(/^\d+$/, "Only numbers allowed"),
//   address: z.string().min(5).max(200),
//   email: z.string().email("Invalid email address"),
// });
// /* -------------------- MAIN FORM -------------------- */
// export const FormAdminSchema = z.object({
//   /* ---------- REQUIRED FIELDS ---------- */
//   address: z
//     .string()
//     .min(5, "Address must be at least 5 characters")
//     .max(200, "Address too long"),
//   email: z.string().min(1, "Email is required").email("Invalid email address"),
//   fullName: z
//     .string()
//     .trim()
//     .min(1, "Name is required") // ✅ REQUIRED
//     .min(2, "Full name must be at least 2 characters")
//     .max(60, "Full name too long")
//     .regex(/^[A-Za-z\s]+$/, "Only letters and spaces allowed"),
//   gender: z.enum(["Male", "Female", "Other"], {
//     required_error: "Gender is required",
//     invalid_type_error: "Invalid gender",
//   }),
//   bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
//     required_error: "Blood group is required",
//     invalid_type_error: "Invalid blood group",
//   }),
//   dob: z
//     .preprocess(
//       (val) => (val === null ? undefined : val),
//       z.date({
//         required_error: "Date of birth is required",
//         invalid_type_error: "Invalid date",
//       }),
//     )
//     .refine((val) => val <= new Date(), {
//       message: "Date of birth cannot be in the future",
//     }),
//   contact: ContactSchema, // phone required inside
//   /* ---------- OPTIONAL / CONDITIONAL ---------- */
//   email: z.string().email("Invalid email address"),
//   department: z.string().min(2).max(50),
//   specialization: z
//     .array(z.string().min(2).max(50))
//     .min(1, "At least one specialization is required"),
//   experience: z.coerce
//     .number()
//     .refine((v) => !isNaN(v), {
//       message: "Experience must be a number",
//     })
//     .min(0, "Experience cannot be negative")
//     .max(60, "Experience seems invalid"),
//   qualification: z.string().min(2).max(100).optional(),
//   languagesSpoken: z
//     .array(z.string().min(2).max(30))
//     .min(1, "At least one language is required")
//     .optional(),
//   about: z.string().min(10).max(500).optional(),
//   consultationFee: ConsultationFeeSchema.optional(),
//   workingHours: z
//     .array(WorkingHourSchema)
//     .min(1, "At least one working day is required")
//     .optional(),
//   licenseNumber: z
//     .string()
//     .min(5)
//     .max(30)
//     .regex(/^[A-Za-z0-9-]+$/, "Invalid license number format")
//     .optional(),
//   accountStatus: z.enum(["pending", "active", "suspended"]).optional(),
// });
// export type PatientAdminFormValues = z.infer<typeof FormAdminSchema>;
import { z } from "zod";
// const weekDays = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ] as const;
// const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
// const WorkingHourSchema = z
//   .object({
//     day: z.enum(weekDays, {
//       message: "Invalid day of week",
//     }),
//     startTime: z
//       .string()
//       .min(1, "Start time is required")
//       .regex(timeRegex, "Start time must be in HH:mm format"),
//     endTime: z
//       .string()
//       .min(1, "End time is required")
//       .regex(timeRegex, "End time must be in HH:mm format"),
//     isAvailable: z.boolean().optional(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.startTime >= data.endTime) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["endTime"],
//         message: "End time must be after start time",
//       });
//     }
//   });
// /* -------------------- FEES -------------------- */
// const ConsultationFeeSchema = z.object({
//   inPerson: z.number().min(0, "In-person fee cannot be negative").optional(),
//   online: z.number().min(0, "Online fee cannot be negative").optional(),
//   currency: z
//     .string()
//     .length(3, "Currency must be a 3-letter ISO code (e.g., INR)")
//     .optional(),
// });
const ContactSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .regex(/^\d+$/, "Phone must contain digits only"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be at most 200 characters"),
});
export const FormAdminSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name must be at most 60 characters")
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces allowed"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .refine((v) => ["Male", "Female", "Other"].includes(v), {
      message: "Invalid gender",
    }),
  bloodGroup: z
    .string()
    .min(1, "Blood group is required")
    .refine(
      (v) => ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(v),
      {
        message: "Invalid blood group",
      },
    ),
  dob: z
    .union([z.date(), z.undefined()])
    .refine((val): val is Date => val instanceof Date, {
      message: "Date of birth is required",
    })
    .refine((date) => date <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),
  contact: ContactSchema,
  allergies: z.array(z.string().min(1, "Allergy cannot be empty")).optional(),
  conditions: z
    .array(z.string().min(1, "Condition cannot be empty"))
    .optional(),
  medications: z
    .array(z.string().min(1, "Medication cannot be empty"))
    .optional(),
  // consultationFee: ConsultationFeeSchema.optional(),
  // workingHours: z
  //   .array(WorkingHourSchema)
  //   .min(1, "At least one working day is required")
  //   .optional(),
  licenseNumber: z
    .string()
    .min(5, "License number must be at least 5 characters")
    .max(30, "License number must be at most 30 characters")
    .regex(
      /^[A-Za-z0-9-]+$/,
      "License number may contain letters, numbers, and hyphens",
    )
    .optional(),
  accountStatus: z
    .enum(["pending", "active", "suspended"], {
      message: "Invalid account status",
    })
    .optional(),
});
export type PatientAdminFormValues = z.infer<typeof FormAdminSchema>;
