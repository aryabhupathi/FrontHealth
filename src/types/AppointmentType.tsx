export interface IPatient {
  _id?: string;
  fullName: string;
}

export interface IDoctor {
  _id?: string;
  fullName: string;
  department?: string;
  workingHours?: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  consultationFee?: {
    online?: number;
    inPerson?: number;
  };
}

export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Rescheduled"
  | "Cancelled"
  | "Completed";

export interface IAppointment {
  _id?: string;
  patient?: IPatient;
  doctor?: IDoctor;
  date: string;
  time: string;
  status: AppointmentStatus;
  appointmentType: "Online" | "In-person";
  consultationFee?: number;
}

export interface AvailableSlot {
  date: string;
  times: string[];
}
