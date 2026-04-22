import { Hand, Mic, UserCircle, X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { RaiseHandQueueProps } from "./raise-hand-queue.types.js";

export const RaiseHandQueue = forwardRef<HTMLDivElement, RaiseHandQueueProps>((props, ref) => {
  const {
    queue,
    isInstructor = false,
    isHandRaised = false,
    onRaiseHand,
    onLowerHand,
    onCallOnStudent,
    onLowerStudentHand,
    className,
    ...rest
  } = props;

  const sortedQueue = [...queue].sort(
    (a, b) => new Date(a.raisedAt).getTime() - new Date(b.raisedAt).getTime()
  );

  return (
    <div
      ref={ref}
      className={cn("flex w-full max-w-sm flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
      data-slot="raise-hand-queue"
      {...rest}
    >
      <div className="flex items-center justify-between border-b bg-muted/30 p-4">
        <div className="flex items-center gap-2 font-semibold">
          <Hand className="h-5 w-5 text-primary" />
          <span>Hand Queue</span>
          {queue.length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
              {queue.length}
            </span>
          )}
        </div>
        
        {!isInstructor && (
          <button
            onClick={isHandRaised ? onLowerHand : onRaiseHand}
            className={cn(
              "inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors",
              isHandRaised
                ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isHandRaised ? "Lower Hand" : "Raise Hand"}
          </button>
        )}
      </div>

      <div className="flex flex-col max-h-[300px] overflow-y-auto p-2">
        {sortedQueue.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-sm text-muted-foreground">
            <Hand className="mb-2 h-8 w-8 opacity-20" />
            No hands raised.
          </div>
        ) : (
          <div className="space-y-1">
            {sortedQueue.map((student, index) => {
              const timeAgo = Math.round((new Date().getTime() - new Date(student.raisedAt).getTime()) / 60000);
              const timeString = timeAgo < 1 ? "Just now" : `${timeAgo}m ago`;

              return (
                <div
                  key={student.id}
                  className="group flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-4 text-center text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    {student.avatarUrl ? (
                      <img src={student.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover border border-border/50" />
                    ) : (
                      <UserCircle className="h-8 w-8 text-muted-foreground opacity-50" />
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none mb-1">
                        {student.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {timeString}
                      </span>
                    </div>
                  </div>

                  {isInstructor && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onCallOnStudent?.(student.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10 transition-colors"
                        title="Call on student"
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onLowerStudentHand?.(student.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors"
                        title="Lower hand"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

RaiseHandQueue.displayName = "RaiseHandQueue";
