import { useMemo } from "react";
interface WorkingHour {
  day: string;
  startTime: string;
  endTime: string;
}
const getDayName = (date: Date): string =>
  date.toLocaleDateString("en-US", { weekday: "long" });
const generateTimeSlots = (startStr: string, endStr: string): string[] => {
  const [sh, sm] = startStr.split(":").map(Number);
  const [eh, em] = endStr.split(":").map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  const slots: string[] = [];
  for (let mins = start; mins < end; mins += 15) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const period = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    slots.push(`${displayHour}:${m.toString().padStart(2, "0")} ${period}`);
  }
  return slots;
};
export const useDoctorAvailability = (
  workingHours: WorkingHour[] | undefined,
  date: Date | null,
) => {
  const availableDates = useMemo(() => {
    if (!workingHours) return [];
    const days = workingHours.map((w) => w.day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return days.includes(getDayName(d)) ? d : null;
    }).filter(Boolean) as Date[];
  }, [workingHours]);
  const availableTimeSlots = useMemo(() => {
    if (!date || !workingHours) return [];
    const dayName = getDayName(date);
    const schedule = workingHours.find((w) => w.day === dayName);
    if (!schedule) return [];
    return generateTimeSlots(schedule.startTime, schedule.endTime);
  }, [date, workingHours]);
  return { availableDates, availableTimeSlots };
};
