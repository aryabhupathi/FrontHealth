export type Gender = "Male" | "Female" | "Other";
export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
export interface IWorkingHour {
  day: WeekDay | "";
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}
export interface IConsultationFee {
  inPerson: string;
  online: string;
  currency: string;
}
export interface IContact {
  phone: string;
  email: string;
}
export interface IDoctor {
  _id?: string;
  doctorId?: string;
  fullName: string;
  gender?: Gender;
  department: string;
  specialization: string[];
  experience?: string;
  qualification?: string;
  languagesSpoken?: string[];
  contact: IContact;
  consultationFee: IConsultationFee;
  workingHours: IWorkingHour[];
  accountStatus?: "pending" | "active" | "suspended";
  joiningDate: string;
}
