import { CheckCircle2, ChevronRight, Clock, FileEdit, Inbox } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { GradingQueueCardProps } from "./grading-queue-card.types.js";

export const GradingQueueCard = forwardRef<HTMLDivElement, GradingQueueCardProps>((props, ref) => {
  const {
    tasks,
    onGradeTask,
    title = "To Review",
    className,
    ...rest
  } = props;

  const pendingTasks = tasks.filter((t) => t.status !== "graded").sort(
    (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  );

  return (
    <div
      ref={ref}
      className={cn("flex w-full max-w-md flex-col rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="grading-queue-card"
      {...rest}
    >
      <div className="flex items-center justify-between border-b bg-muted/20 p-5">
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-primary" />
          <h3 className="font-semibold tracking-tight">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          {pendingTasks.length} {pendingTasks.length === 1 ? "Item" : "Items"}
        </div>
      </div>

      <div className="flex flex-col p-2 max-h-[350px] overflow-y-auto">
        {pendingTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-sm text-muted-foreground">
            <CheckCircle2 className="mb-2 h-10 w-10 text-emerald-500 opacity-20" />
            <p>You're all caught up!</p>
            <p className="text-xs">No assignments waiting for review.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {pendingTasks.map((task) => {
              const timeAgo = Math.floor((new Date().getTime() - new Date(task.submittedAt).getTime()) / (1000 * 60 * 60));
              let timeStr = "";
              if (timeAgo < 1) timeStr = "Just now";
              else if (timeAgo < 24) timeStr = `${timeAgo}h ago`;
              else timeStr = `${Math.floor(timeAgo / 24)}d ago`;

              return (
                <button
                  key={task.id}
                  onClick={() => onGradeTask?.(task.id)}
                  className="group flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                      task.status === "in-progress" 
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {task.status === "in-progress" ? <FileEdit className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium leading-none mb-1 text-foreground">
                        {task.studentName}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {task.assignmentTitle}
                      </span>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="font-medium text-primary/70">{timeStr}</span>
                        {task.status === "in-progress" && (
                          <span className="rounded bg-amber-500/10 px-1 py-0.5 font-medium text-amber-600 dark:text-amber-400">
                            Draft saved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:bg-background shadow-sm border border-transparent group-hover:border-border">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      
      {pendingTasks.length > 5 && (
        <div className="border-t bg-muted/10 p-2">
          <button className="w-full rounded-md py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            View All in Gradebook
          </button>
        </div>
      )}
    </div>
  );
});

GradingQueueCard.displayName = "GradingQueueCard";
