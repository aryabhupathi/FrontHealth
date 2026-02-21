// prescription.types.ts

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface Patient {
  _id: string;
  fullName: string;
  patientId: string;
}

export interface Doctor {
  _id: string;
  fullName: string;
  specialization?: string[];
}

export interface Prescription {
  _id: string;
  patient: Patient;
  doctor: Doctor;
  diagnosis: string;
  advice?: string;
  medicines: Medicine[];
}
