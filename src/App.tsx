import About from "./pages/About";
import LandingPage from "./pages/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import PatientPage from "./pages/Admin/Patient";
import DoctorPage from "./pages/Admin/Doctor";
import Appointments from "./pages/Admin/Appointment";
import Prescriptions from "./pages/Admin/Prescription";
import PatientDashboard from "./pages/Dashboard/PatientDashboard";
import PatientDoctors from "./pages/Patient/PatientDoctors";
import PatientAppointments from "./pages/Patient/PatientAppointment";
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard";
import DoctorPatients from "./pages/Doctor/DoctorPatients";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
export default function App() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const patientId = user?.role === "Patient" ? user?.linkedProfile?._id : null;
  const doctorId = user?.role === "Doctor" ? user?.linkedProfile?._id : null;
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="patients" element={<PatientPage />} />
        <Route path="doctors" element={<DoctorPage />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="prescriptions" element={<Prescriptions />} />
      </Route>
      <Route path="/doctor/*" element={<AdminLayout />}>
        <Route index element={<DoctorDashboard />} />
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route
          path="appointments"
          element={<DoctorAppointments doctorId={doctorId} />}
        />
        <Route
          path="patients"
          element={<DoctorPatients doctorId={doctorId} />}
        />
      </Route>
      <Route path="/patient/*" element={<AdminLayout />}>
        <Route index element={<PatientDashboard />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route
          path="appointments"
          element={<PatientAppointments patientId={patientId} />}
        />
        <Route
          path="doctors"
          element={<PatientDoctors patientId={patientId} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
