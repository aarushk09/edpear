import { Check, Clock, Download, Minus, UserCircle, X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { AttendanceRecord, AttendanceStatus, AttendanceTrackerProps } from "./attendance-tracker.types.js";

const STATUS_ICONS: Record<AttendanceStatus, React.ElementType | null> = {
  present: Check,
  absent: X,
  late: Clock,
  excused: Minus,
  unmarked: null,
};

const STATUS_COLORS: Record<AttendanceStatus, string> = {
  present: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
  absent: "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20",
  late: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20",
  excused: "bg-muted text-muted-foreground hover:bg-muted/80",
  unmarked: "bg-transparent hover:bg-accent text-transparent hover:text-muted-foreground border border-dashed",
};

const NEXT_STATUS: Record<AttendanceStatus, AttendanceStatus> = {
  unmarked: "present",
  present: "absent",
  absent: "late",
  late: "excused",
  excused: "unmarked",
};

export const AttendanceTracker = forwardRef<HTMLDivElement, AttendanceTrackerProps>((props, ref) => {
  const {
    students,
    sessions,
    records,
    onChange,
    onExport,
    className,
    ...rest
  } = props;

  const getRecord = (studentId: string, sessionId: string): AttendanceStatus => {
    return records.find((r) => r.studentId === studentId && r.sessionId === sessionId)?.status || "unmarked";
  };

  const handleCellClick = (studentId: string, sessionId: string) => {
    if (!onChange) return;
    
    const currentStatus = getRecord(studentId, sessionId);
    const nextStatus = NEXT_STATUS[currentStatus];
    
    onChange({ studentId, sessionId, status: nextStatus });
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
      data-slot="attendance-tracker"
      {...rest}
    >
      <div className="flex items-center justify-between border-b bg-muted/30 p-4">
        <h3 className="font-semibold tracking-tight">Attendance Roster</h3>
        {onExport && (
          <button
            onClick={onExport}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-md border bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/10">
              <th className="sticky left-0 z-10 w-[250px] bg-card p-4 text-left font-medium text-muted-foreground shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                Student
              </th>
              {sessions.map((session) => (
                <th key={session.id} className="min-w-[80px] p-4 text-center font-medium text-muted-foreground">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs uppercase tracking-wider opacity-70">
                      {new Date(session.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                    {session.title && (
                      <span className="truncate w-full max-w-[80px] text-xs" title={session.title}>
                        {session.title}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b last:border-0 hover:bg-muted/5 transition-colors">
                <td className="sticky left-0 z-10 bg-card p-4 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-3">
                    {student.avatarUrl ? (
                      <img src={student.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                      <UserCircle className="h-8 w-8 text-muted-foreground opacity-50" />
                    )}
                    <span className="font-medium">{student.name}</span>
                  </div>
                </td>
                
                {sessions.map((session) => {
                  const status = getRecord(student.id, session.id);
                  const Icon = STATUS_ICONS[status];
                  
                  return (
                    <td key={session.id} className="p-2 text-center">
                      <button
                        onClick={() => handleCellClick(student.id, session.id)}
                        disabled={!onChange}
                        className={cn(
                          "mx-auto flex h-8 w-8 items-center justify-center rounded-md transition-all active:scale-95",
                          STATUS_COLORS[status],
                          !onChange && "cursor-default active:scale-100 hover:opacity-100"
                        )}
                        title={`Click to change status (Currently: ${status})`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {status === "unmarked" && <Minus className="h-3 w-3 opacity-0" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t bg-muted/10 p-3 flex justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-emerald-500"></div>Present</div>
        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-rose-500"></div>Absent</div>
        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-amber-500"></div>Late</div>
        <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-slate-400"></div>Excused</div>
      </div>
    </div>
  );
});

AttendanceTracker.displayName = "AttendanceTracker";
