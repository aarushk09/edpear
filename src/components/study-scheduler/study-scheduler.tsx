import { Calendar } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { StudySchedulerProps, StudySession } from "./study-scheduler.types.js";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const StudyScheduler = forwardRef<HTMLDivElement, StudySchedulerProps>((props, ref) => {
  const {
    sessions,
    onSessionMove,
    onSessionClick,
    startHour = 8,
    endHour = 20,
    className,
    ...rest
  } = props;

  const [draggedSessionId, setDraggedSessionId] = useState<string | null>(null);

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  const handleDragStart = (e: React.DragEvent, sessionId: string) => {
    setDraggedSessionId(sessionId);
    e.dataTransfer.effectAllowed = "move";
    // transparent image to hide default drag ghost
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dayIndex: number, hour: number) => {
    e.preventDefault();
    if (draggedSessionId && onSessionMove) {
      onSessionMove(draggedSessionId, dayIndex, hour);
    }
    setDraggedSessionId(null);
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
      data-slot="study-scheduler"
      {...rest}
    >
      <div className="flex items-center gap-2 border-b bg-muted/50 p-4">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-semibold tracking-tight">Weekly Study Plan</h3>
      </div>

      <div className="flex flex-1 overflow-auto">
        {/* Time column */}
        <div className="w-16 shrink-0 border-r bg-muted/20">
          <div className="h-10 border-b" /> {/* Header spacer */}
          {hours.map((hour) => (
            <div key={hour} className="flex h-16 items-start justify-end border-b pr-2 pt-1 text-xs text-muted-foreground">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="flex min-w-[700px] flex-1">
          {DAYS.map((day, dayIndex) => (
            <div key={day} className="flex-1 border-r last:border-r-0">
              <div className="flex h-10 items-center justify-center border-b bg-muted/20 text-sm font-medium">
                {day}
              </div>
              
              <div className="relative">
                {/* Background grid cells */}
                {hours.map((hour) => (
                  <div
                    key={`${day}-${hour}`}
                    className="h-16 border-b border-dashed border-border/50 transition-colors hover:bg-accent/50"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, dayIndex, hour)}
                  />
                ))}

                {/* Sessions */}
                {sessions
                  .filter((s) => s.dayOfWeek === dayIndex && s.startHour >= startHour && s.startHour <= endHour)
                  .map((session) => {
                    const top = (session.startHour - startHour) * 64; // 64px = 4rem (h-16)
                    const height = session.durationHours * 64;
                    const isDragging = draggedSessionId === session.id;

                    return (
                      <div
                        key={session.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, session.id)}
                        onDragEnd={() => setDraggedSessionId(null)}
                        onClick={() => onSessionClick?.(session)}
                        className={cn(
                          "absolute left-1 right-1 cursor-grab rounded-md p-2 text-xs font-medium text-white shadow-sm transition-transform hover:z-10 active:cursor-grabbing",
                          session.color || "bg-primary",
                          isDragging && "opacity-50 scale-95"
                        )}
                        style={{
                          top: `${top + 2}px`, // +2px for slight margin
                          height: `${height - 4}px`, // -4px for slight margin
                        }}
                      >
                        <div className="line-clamp-2">{session.title}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

StudyScheduler.displayName = "StudyScheduler";
