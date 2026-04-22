import { AlertCircle, Calendar, CheckCircle2, Circle, Clock } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { PacingGuideProps } from "./pacing-guide.types.js";

export const PacingGuide = forwardRef<HTMLDivElement, PacingGuideProps>((props, ref) => {
  const { items, title = "Course Pacing Guide", className, ...rest } = props;

  const sortedItems = [...items].sort(
    (a, b) => new Date(a.expectedDate).getTime() - new Date(b.expectedDate).getTime()
  );

  return (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
      data-slot="pacing-guide"
      {...rest}
    >
      <div className="mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      </div>

      <div className="relative space-y-0 pl-4">
        {/* Continuous vertical line */}
        <div className="absolute bottom-4 left-[1.375rem] top-4 w-px bg-border" />

        {sortedItems.map((item, index) => {
          const expected = new Date(item.expectedDate);
          const expectedTime = expected.getTime();
          const actual = item.actualDate ? new Date(item.actualDate) : undefined;
          const actualTime = actual?.getTime();
          const now = new Date().getTime();

          const isCompleted = !!actual;
          
          let status: "on-track" | "ahead" | "behind" | "upcoming" | "late" = "upcoming";
          let diffDays = 0;

          if (isCompleted) {
            diffDays = Math.round((actualTime! - expectedTime) / (1000 * 60 * 60 * 24));
            if (diffDays > 0) status = "behind";
            else if (diffDays < 0) status = "ahead";
            else status = "on-track";
          } else {
            diffDays = Math.round((now - expectedTime) / (1000 * 60 * 60 * 24));
            if (diffDays > 0) status = "late";
            else status = "upcoming";
          }

          const getStatusStyles = () => {
            if (isCompleted) {
              if (status === "ahead") return "text-emerald-500 ring-emerald-500/20";
              if (status === "behind") return "text-amber-500 ring-amber-500/20";
              return "text-emerald-500 ring-emerald-500/20"; // on-track
            }
            if (status === "late") return "text-rose-500 ring-rose-500/20";
            return "text-muted-foreground ring-border/50"; // upcoming
          };

          return (
            <div key={item.id} className="relative flex items-start gap-4 pb-8 last:pb-0">
              {/* Timeline Node */}
              <div
                className={cn(
                  "relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-background ring-4 mt-1",
                  getStatusStyles()
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 fill-current text-background" />
                ) : status === "late" ? (
                  <AlertCircle className="h-4 w-4 fill-current text-background" />
                ) : (
                  <Circle className="h-2 w-2 fill-current" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pt-0.5">
                <div>
                  <h4 className={cn("font-medium leading-none", isCompleted && "text-muted-foreground line-through decoration-muted-foreground/50")}>
                    {item.title}
                  </h4>
                  
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Expected:</span>
                    <span className="font-medium">
                      {expected.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  {isCompleted && actual && (
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-medium">
                        {actual.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Badge */}
                <div className="mt-2 sm:mt-0">
                  {status === "upcoming" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      UPCOMING
                    </span>
                  ) : status === "late" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-1 text-[10px] font-medium text-rose-600 dark:text-rose-400">
                      <AlertCircle className="h-3 w-3" />
                      LATE ({diffDays}d)
                    </span>
                  ) : status === "ahead" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      AHEAD ({Math.abs(diffDays)}d)
                    </span>
                  ) : status === "behind" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                      <CheckCircle2 className="h-3 w-3" />
                      COMPLETED LATE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      ON TIME
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

PacingGuide.displayName = "PacingGuide";
