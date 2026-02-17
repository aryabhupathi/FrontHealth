interface IWorkingHour {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}
interface IConsultationFee {
  inPerson?: number;
  online?: number;
  currency?: string;
}
interface IContact {
  phone?: string;
  email?: string;
}
export interface IDoctor {
  _id?: string;
  doctorId?: string;
  fullName: string;
  gender?: string;
  department: string;
  specialization: string[];
  experience?: number;
  qualification?: string;
  languagesSpoken?: string[];
  contact?: IContact;
  consultationFee?: IConsultationFee;
  workingHours: IWorkingHour[];
  accountStatus?: "pending" | "active" | "suspended";
}
