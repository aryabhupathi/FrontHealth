// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// interface Medicine {
//   name: string;
//   dosage: string;
//   frequency: string;
//   duration: string;
//   notes?: string;
// }
// interface Doctor {
//   fullName: string;
//   specialization?: string;
//   registrationNumber?: string;
// }
// interface Patient {
//   fullName: string;
//   age?: number;
//   gender?: string;
// }
// interface Prescription {
//   diagnosis: string;
//   advice?: string;
//   medicines: Medicine[];
//   doctor: Doctor;
//   patient: Patient;
//   date: string; // ISO string
//   prescriptionId?: string;
// }
// const styles = StyleSheet.create({
//   page: {
//     padding: 32,
//     fontSize: 11,
//     fontFamily: "Helvetica",
//     lineHeight: 1.4,
//   },
//   header: {
//     borderBottom: "2 solid #1976d2",
//     paddingBottom: 10,
//     marginBottom: 16,
//   },
//   clinic: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1976d2",
//   },
//   subText: {
//     fontSize: 10,
//     color: "#444",
//   },
//   section: {
//     marginBottom: 12,
//   },
//   label: {
//     fontWeight: "bold",
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     borderWidth: 1,
//     borderColor: "#ccc",
//   },
//   row: {
//     flexDirection: "row",
//   },
//   th: {
//     flex: 1,
//     padding: 6,
//     backgroundColor: "#f1f5f9",
//     fontWeight: "bold",
//     borderRight: "1 solid #ccc",
//   },
//   td: {
//     flex: 1,
//     padding: 6,
//     borderRight: "1 solid #ccc",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 32,
//     left: 32,
//     right: 32,
//     borderTop: "1 solid #ccc",
//     paddingTop: 8,
//     fontSize: 10,
//   },
// });
// export const PrescriptionPDF = ({
//   prescription,
// }: {
//   prescription: Prescription;
// }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.clinic}>{prescription.doctor.fullName}</Text>
//         {prescription.doctor.specialization && (
//           <Text style={styles.subText}>
//             {prescription.doctor.specialization}
//           </Text>
//         )}
//         {prescription.doctor.registrationNumber && (
//           <Text style={styles.subText}>
//             Reg. No: {prescription.doctor.registrationNumber}
//           </Text>
//         )}
//       </View>
//       {/* Patient Info */}
//       <View style={styles.section}>
//         <Text>
//           <Text style={styles.label}>Patient: </Text>
//           {prescription.patient.fullName}
//         </Text>
//         {prescription.patient.age && (
//           <Text>
//             <Text style={styles.label}>Age: </Text>
//             {prescription.patient.age}
//           </Text>
//         )}
//         {prescription.patient.gender && (
//           <Text>
//             <Text style={styles.label}>Gender: </Text>
//             {prescription.patient.gender}
//           </Text>
//         )}
//       </View>
//       {/* Diagnosis */}
//       <View style={styles.section}>
//         <Text>
//           <Text style={styles.label}>Diagnosis: </Text>
//           {prescription.diagnosis}
//         </Text>
//       </View>
//       {/* Advice */}
//       {prescription.advice && (
//         <View style={styles.section}>
//           <Text>
//             <Text style={styles.label}>Advice: </Text>
//             {prescription.advice}
//           </Text>
//         </View>
//       )}
//       {/* Medicines Table (unchanged) */}
//       ...
//       <View style={styles.section}>
//         <Text style={{ fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>
//           Medicines
//         </Text>
//         <View style={styles.table}>
//           <View style={styles.row}>
//             <Text style={styles.th}>Name</Text>
//             <Text style={styles.th}>Dosage</Text>
//             <Text style={styles.th}>Frequency</Text>
//             <Text style={styles.th}>Duration</Text>
//             <Text style={styles.th}>Notes</Text>
//           </View>
//           {prescription.medicines.map((m, i) => (
//             <View style={styles.row} key={i}>
//               <Text style={styles.td}>{m.name}</Text>
//               <Text style={styles.td}>{m.dosage}</Text>
//               <Text style={styles.td}>{m.frequency}</Text>
//               <Text style={styles.td}>{m.duration}</Text>
//               <Text style={styles.td}>{m.notes || "—"}</Text>
//             </View>
//           ))}
//         </View>
//       </View>
//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text>Date: {new Date(prescription.date).toLocaleDateString()}</Text>
//         {prescription.prescriptionId && (
//           <Text>Prescription ID: {prescription.prescriptionId}</Text>
//         )}
//         <Text>Signature: ___________________________</Text>
//       </View>
//     </Page>
//   </Document>
// );


import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { PrescriptionPDFData } from "../Docs/PrescriptionDocs";

/* ---------- Types (MATCH BACKEND DATA) ---------- */




/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    borderBottom: "2 solid #1976d2",
    paddingBottom: 10,
    marginBottom: 16,
  },
  clinic: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
  },
  subText: {
    fontSize: 10,
    color: "#444",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
  },
  th: {
    flex: 1,
    padding: 6,
    backgroundColor: "#f1f5f9",
    fontWeight: "bold",
    borderRight: "1 solid #ccc",
  },
  td: {
    flex: 1,
    padding: 6,
    borderRight: "1 solid #ccc",
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
    borderTop: "1 solid #ccc",
    paddingTop: 8,
    fontSize: 10,
  },
});

/* ---------- Component ---------- */

export const PrescriptionPDF = ({
  prescription,
}: {
  prescription: PrescriptionPDFData;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.clinic}>{prescription.doctor.fullName}</Text>

        {prescription.doctor.specialization.length > 0 && (
          <Text style={styles.subText}>
            {prescription.doctor.specialization.join(", ")}
          </Text>
        )}

        {prescription.doctor.registrationNumber && (
          <Text style={styles.subText}>
            Reg. No: {prescription.doctor.registrationNumber}
          </Text>
        )}
      </View>

      {/* Patient Info */}
      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Patient Name: </Text>
          {prescription.patient.fullName}
        </Text>

        <Text>
          <Text style={styles.label}>Patient ID: </Text>
          {prescription.patient.patientId}
        </Text>
      </View>

      {/* Diagnosis */}
      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Diagnosis: </Text>
          {prescription.diagnosis}
        </Text>
      </View>

      {/* Advice */}
      {prescription.advice && (
        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Advice: </Text>
            {prescription.advice}
          </Text>
        </View>
      )}

      {/* Medicines */}
      <View style={styles.section}>
        <Text style={{ fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>
          Medicines
        </Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.th}>Name</Text>
            <Text style={styles.th}>Dosage</Text>
            <Text style={styles.th}>Frequency</Text>
            <Text style={styles.th}>Duration</Text>
            <Text style={styles.th}>Notes</Text>
          </View>

          {prescription.medicines.map((m, i) => (
            <View style={styles.row} key={i}>
              <Text style={styles.td}>{m.name}</Text>
              <Text style={styles.td}>{m.dosage}</Text>
              <Text style={styles.td}>{m.frequency}</Text>
              <Text style={styles.td}>{m.duration}</Text>
              <Text style={styles.td}>{m.notes || "—"}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          Date: {new Date(prescription.createdAt).toLocaleDateString()}
        </Text>

        {prescription.prescriptionId && (
          <Text>Prescription ID: {prescription.prescriptionId}</Text>
        )}

        <Text>Signature: ___________________________</Text>
      </View>
    </Page>
  </Document>
);
