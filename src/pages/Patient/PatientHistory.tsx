/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Chip,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import {
//   PatientHistoryResponse,
//   Appointment,
// } from "../types/patientHistory";

// interface Props {
//   patientId: string;
// }

// const PatientHistory: React.FC<Props> = ({ patientId }) => {
//   const [data, setData] = useState<PatientHistoryResponse["data"] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:1111/patient/${patientId}/history`
//         );
//         const json: PatientHistoryResponse = await res.json();

//         if (!json.success) {
//           throw new Error("Failed to fetch patient history");
//         }

//         setData(json.data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [patientId]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;
//   if (!data) return null;

//   const { patientProfile, medicalData, appointmentHistory } = data;

//   return (
//     <Box p={3}>
//       {/* PATIENT PROFILE */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Patient Profile</Typography>
//           <Divider sx={{ my: 1 }} />

//           <Grid container spacing={2}>
//             <Grid size={{xs:12, md:6}}>
//               <Typography><strong>Name:</strong> {patientProfile.fullName}</Typography>
//               <Typography><strong>Gender:</strong> {patientProfile.gender}</Typography>
//               <Typography><strong>DOB:</strong> {patientProfile.dob}</Typography>
//             </Grid>
//             <Grid size={{xs:12, md:6}}>
//               <Typography><strong>Patient ID:</strong> {patientProfile.patientId}</Typography>
//               <Typography><strong>Blood Group:</strong> {patientProfile.bloodGroup}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* MEDICAL DATA */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Medical Information</Typography>
//           <Divider sx={{ my: 1 }} />

//           <Typography variant="subtitle2">Allergies</Typography>
//           {medicalData.allergies.map((a) => (
//             <Chip key={a} label={a} color="error" sx={{ mr: 1, mb: 1 }} />
//           ))}

//           <Typography variant="subtitle2" sx={{ mt: 2 }}>
//             Conditions
//           </Typography>
//           {medicalData.conditions.map((c) => (
//             <Chip key={c} label={c} color="warning" sx={{ mr: 1, mb: 1 }} />
//           ))}

//           <Typography variant="subtitle2" sx={{ mt: 2 }}>
//             Medications
//           </Typography>
//           {medicalData.medications.map((m) => (
//             <Chip key={m} label={m} color="success" sx={{ mr: 1, mb: 1 }} />
//           ))}
//         </CardContent>
//       </Card>

//       {/* APPOINTMENT HISTORY */}
//       <Card>
//         <CardContent>
//           <Typography variant="h6">Appointment History</Typography>
//           <Divider sx={{ my: 1 }} />

//           {appointmentHistory.length === 0 && (
//             <Typography>No appointments found.</Typography>
//           )}

//           {appointmentHistory.map((appt: Appointment) => (
//             <Card key={appt._id} sx={{ mb: 2, backgroundColor: "#fafafa" }}>
//               <CardContent>
//                 <Typography>
//                   <strong>Date:</strong> {appt.date} at {appt.time}
//                 </Typography>
//                 <Typography>
//                   <strong>Doctor:</strong> {appt.doctor.fullName}
//                 </Typography>
//                 <Typography>
//                   <strong>Department:</strong> {appt.doctor.department}
//                 </Typography>
//                 <Typography>
//                   <strong>Type:</strong> {appt.appointmentType}
//                 </Typography>
//                 <Chip
//                   label={appt.status}
//                   color={appt.status === "Completed" ? "success" : "info"}
//                   sx={{ mt: 1 }}
//                 />
//               </CardContent>
//             </Card>
//           ))}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PatientHistory;


import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";
import { CardTitle, PatientCard } from "../../components/styledcomp";

/* =======================
   TYPES (MATCH BACKEND)
   ======================= */

interface PatientProfile {
  patientId: string;
  fullName: string;
  gender?: string;
  dob?: string;
  bloodGroup?: string;
}

interface Allergy {
  name: string;
  severity: "Mild" | "Moderate" | "Severe";
  reaction?: string;
}

interface MedicalData {
  allergies: Allergy[];
  conditions: string[];
  medications: string[];
}

interface Doctor {
  fullName: string;
  department: string;
  specialization: string[];
}

interface Appointment {
  _id: string;
  date: string;
  time: string;
  status: "Pending" | "Completed" | "Cancelled";
  appointmentType: "Online" | "In-person";
  doctor: Doctor;
}

interface PatientHistoryResponse {
  success: boolean;
  message?: string;
  data: {
    patientProfile: PatientProfile;
    medicalData: MedicalData;
    appointmentHistory: Appointment[];
  };
}

/* =======================
   COMPONENT
   ======================= */

interface Props {
  patientId: string;
  appointments: Appointment[];
}

const PatientHistory: React.FC<Props> = ({ patientId }) => {
  const [data, setData] =
    useState<PatientHistoryResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const theme = useTheme();
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:1111/patient/${patientId}/history`
        );
        const json: PatientHistoryResponse = await res.json();

        if (!json.success) {
          throw new Error(json.message || "Failed to fetch patient history");
        }

        setData(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [patientId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return null;

  const { patientProfile, medicalData, appointmentHistory } = data;

  return (
    <Box p={3}>
      {/* PATIENT PROFILE */}
      {/* <Card sx={{ mb: 3 }}> */}
        <PatientCard>
        <CardContent>
          <CardTitle>Patient Profile</CardTitle>
          <Divider sx={{ my: 1 }} />

          <Grid container spacing={2}>
            <Grid size={{xs:12, md:6}}>
              <Typography><strong>Name:</strong> {patientProfile.fullName}</Typography>
              <Typography><strong>Gender:</strong> {patientProfile.gender}</Typography>
              <Typography><strong>DOB:</strong> {patientProfile.dob}</Typography>
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <Typography><strong>Patient ID:</strong> {patientProfile.patientId}</Typography>
              <Typography><strong>Blood Group:</strong> {patientProfile.bloodGroup}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      {/* </Card> */}
      </PatientCard>

      {/* MEDICAL INFO */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Medical Information</Typography>
          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle2">Allergies</Typography>
          {medicalData.allergies.length === 0 && (
            <Typography color="text.secondary">None</Typography>
          )}
          {medicalData.allergies.map((a, idx) => (
            <Chip
              key={idx}
              label={`${a.name} (${a.severity})`}
              color={a.severity === "Severe" ? "error" : "warning"}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Conditions
          </Typography>
          {medicalData.conditions.map((c) => (
            <Chip key={c} label={c} color="info" sx={{ mr: 1, mb: 1 }} />
          ))}

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Medications
          </Typography>
          {medicalData.medications.map((m) => (
            <Chip key={m} label={m} color="success" sx={{ mr: 1, mb: 1 }} />
          ))}
        </CardContent>
      </Card>

      {/* APPOINTMENTS */}
      {/* <Card>
        <CardContent>
          <Typography variant="h6">Appointment History</Typography>
          <Divider sx={{ my: 1 }} />

          {appointmentHistory.length === 0 && (
            <Typography>No appointments found.</Typography>
          )}

          {appointmentHistory.map((appt) => (
            <Card key={appt._id} sx={{ mb: 2, bgcolor: "#fafafa" }}>
              <CardContent>
                <Typography>
                  <strong>Date:</strong> {appt.date} at {appt.time}
                </Typography>
                <Typography>
                  <strong>Doctor:</strong> {appt.doctor.fullName}
                </Typography>
                <Typography>
                  <strong>Department:</strong> {appt.doctor.department}
                </Typography>
                <Typography>
                  <strong>Type:</strong> {appt.appointmentType}
                </Typography>
                <Chip
                  label={appt.status}
                  color={appt.status === "Completed" ? "success" : "info"}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card> */}
      <Timeline position="right">
      {appointmentHistory.map((appt, index) => {
        const isLast = index === appointmentHistory.length - 1;

        return (
          <TimelineItem key={appt._id}>
            {/* DATE */}
            <TimelineOppositeContent
              sx={{
                flex: 0.25,
                display: { xs: "none", sm: "block" },
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {appt.date}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {appt.time}
              </Typography>
            </TimelineOppositeContent>

            {/* DOT */}
            <TimelineSeparator>
              <TimelineDot
                color={
                  appt.status === "Completed"
                    ? "success"
                    : appt.status === "Cancelled"
                    ? "error"
                    : "info"
                }
              />
              {!isLast && <TimelineConnector />}
            </TimelineSeparator>

            {/* CONTENT */}
            <TimelineContent>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="subtitle1">
                  {appt.appointmentType}
                </Typography>

                <Typography variant="body2">
                  {appt.doctor.department}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {appt.doctor.fullName}
                </Typography>

                <Chip
                  label={appt.status}
                  size="small"
                  color={
                    appt.status === "Completed"
                      ? "success"
                      : appt.status === "Cancelled"
                      ? "error"
                      : "info"
                  }
                  sx={{ mt: 1 }}
                />
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
    </Box>
  );
};

export default PatientHistory;
