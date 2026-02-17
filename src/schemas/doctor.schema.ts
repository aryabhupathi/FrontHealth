import { z } from "zod";

export const doctorSchema = z.object({
  fullName: z.string().min(3),
  department: z.string().min(2),
  specialization: z.array(z.string()).min(1),
  experience: z.string().regex(/^\d+$/),
  contact: z.object({
    phone: z.string().min(10),
    email: z.string().email(),
  }),
});

export type DoctorFormValues = z.infer<typeof doctorSchema>;
