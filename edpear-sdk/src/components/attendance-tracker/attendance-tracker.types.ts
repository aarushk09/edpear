export type AttendanceStatus = "present" | "absent" | "late" | "excused" | "unmarked";

export interface AttendanceStudent {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface AttendanceSession {
  id: string;
  date: string | Date;
  title?: string;
}

export interface AttendanceRecord {
  studentId: string;
  sessionId: string;
  status: AttendanceStatus;
}

export interface AttendanceTrackerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  students: AttendanceStudent[];
  sessions: AttendanceSession[];
  records: AttendanceRecord[];
  onChange?: (record: AttendanceRecord) => void;
  onExport?: () => void;
}
