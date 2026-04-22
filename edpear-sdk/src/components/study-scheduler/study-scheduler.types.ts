export interface StudySession {
  id: string;
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  startHour: number; // 0 to 23
  durationHours: number; // e.g. 1, 2, 1.5
  title: string;
  color?: string; // e.g. "bg-blue-500"
}

export interface StudySchedulerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  sessions: StudySession[];
  onSessionMove?: (sessionId: string, newDayOfWeek: number, newStartHour: number) => void;
  onSessionClick?: (session: StudySession) => void;
  startHour?: number; // e.g. 8 (8 AM)
  endHour?: number;   // e.g. 20 (8 PM)
}
