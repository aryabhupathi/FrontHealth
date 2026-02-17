import { Dayjs } from "dayjs";

export default interface IPatient {
  _id?: string;
  patientId?: string;
  fullName: string;
  email?: string;
  gender?: string;
  dob?: Dayjs | null;
  bloodGroup?: string;
  contact: {
    phone: string;
    address?: string;
  };
  allergies: string[];
  conditions: string[];
  medications: string[];
  createdAt?: string;
}
