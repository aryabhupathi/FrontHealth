import { FaHome, FaUser } from "react-icons/fa";
import { BsFillHospitalFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
export type SidebarLink = {
  label: string;
  path: string;
  icon: React.ReactNode;
};
export const sidebarConfig: Record<string, SidebarLink[]> = {
  Admin: [
    { label: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
    {
      label: "Patients",
      icon: <BsFillHospitalFill />,
      path: "/admin/patients",
    },
    { label: "Doctors", icon: <FaUserDoctor />, path: "/admin/doctors" },
    {
      label: "Appointments",
      icon: <BsFillHospitalFill />,
      path: "/admin/appointments",
    },
    {
      label: "Prescriptions",
      icon: <BsFillHospitalFill />,
      path: "/admin/prescriptions",
    },
  ],
  Doctor: [
    { label: "Dashboard", icon: <FaHome />, path: "/doctor/dashboard" },
    { label: "Patients", icon: <FaUser />, path: "/doctor/patients" },
    {
      label: "Appointments",
      icon: <BsFillHospitalFill />,
      path: "/doctor/appointments",
    },
  ],
  Patient: [
    { label: "Dashboard", icon: <FaHome />, path: "/patient/dashboard" },
    { label: "Doctors", icon: <FaUserDoctor />, path: "/patient/doctors" },
    {
      label: "Appointments",
      icon: <BsFillHospitalFill />,
      path: "/patient/appointments",
    },
  ],
};
