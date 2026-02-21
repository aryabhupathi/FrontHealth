// import { z } from "zod";

// const genderValues = ["Male", "Female", "Other"] as const;

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

// export const DoctorSchema = z.object({
//   fullName: z.string().min(1, "Full name is required"),

//   department: z.string().min(1, "Department is required"),

//   gender: z.enum(genderValues, {
//     message: "Gender is required",
//   }),

//   specialization: z
//     .array(z.string())
//     .min(1, "At least one specialization required"),

//   experience: z.number().min(0, "Experience cannot be negative"),

//   qualification: z.string().optional(),

//   languagesSpoken: z.array(z.string()).optional(),

//   contact: z.object({
//     phone: z.string().min(5, "Phone is required"),
//     email: z.string().email("Invalid email"),
//   }),

//   // consultationFee: z.object({
//   //   inPerson: z.number().min(0),
//   //   online: z.number().min(0),
//   //   currency: z.string(),
//   // }),

//   consultationFee: ConsultationFeeSchema,
//   // workingHours: z.array(
//   //   z.object({
//   //     day: z.string().min(1, "Day required"),
//   //     startTime: z.string(),
//   //     endTime: z.string(),
//   //   }),
//   // ),
//   workingHours: WorkingHourSchema,

//   joiningDate: z.string(),
// });


import { z } from "zod";

/* ---------------- ENUMS ---------------- */

const genderValues = ["Male", "Female", "Other"] as const;

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

/* ---------------- WORKING HOURS ---------------- */

const WorkingHourSchema = z
  .object({
    day: z.enum(weekDays, {
      message: "Invalid day of week",
    }),
    startTime: z
      .string()
      .regex(timeRegex, "Start time must be in HH:mm format"),
    endTime: z.string().regex(timeRegex, "End time must be in HH:mm format"),
    isAvailable: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startTime >= data.endTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endTime"],
        message: "End time must be after start time",
      });
    }
  });

/* ---------------- FEES ---------------- */

// const ConsultationFeeSchema = z.object({
//   inPerson: z.number().min(0, "In-person fee cannot be negative"),
//   online: z.number().min(0, "Online fee cannot be negative"),
//   currency: z.string().length(3, "Currency must be 3-letter ISO code"),
// });

const ConsultationFeeSchema = z.object({
  inPerson: z.coerce.number().min(0, "In-person fee cannot be negative"),

  online: z.coerce.number().min(0, "Online fee cannot be negative"),

  currency: z.string().length(3, "Currency must be 3-letter ISO code"),
});

/* ---------------- MAIN DOCTOR SCHEMA ---------------- */

export const DoctorSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  department: z.string().min(1, "Department is required"),

  gender: z.enum(genderValues, {
    message: "Gender is required",
  }),

  specialization: z
    .array(z.string())
    .min(1, "At least one specialization required"),

  experience: z.coerce.number().min(0, "Experience cannot be negative"),

  qualification: z.string().optional(),

  languagesSpoken: z.array(z.string()).optional(),

  contact: z.object({
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(15, "Phone number must be at most 10 digits")
      .regex(/^\d+$/, "Phone number must contain numbers only"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
  }),

  consultationFee: ConsultationFeeSchema,

  workingHours: z
    .array(WorkingHourSchema)
    .min(1, "At least one working slot required"),

  joiningDate: z.string(),
});
