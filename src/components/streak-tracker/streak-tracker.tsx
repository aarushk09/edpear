import { Flame } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "../../lib/cn.js";
import type { StreakTrackerProps } from "./streak-tracker.types.js";

const defaultDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, index) => ({
  label,
  completed: index < 5,
}));

export const StreakTracker = forwardRef<HTMLDivElement, StreakTrackerProps>(
  ({ streak, goal = 7, days = defaultDays, className, ...props }, ref) => {
    const goalSegments = Array.from({ length: goal }, (_, index) => index < streak);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card p-6 text-card-foreground shadow-sm flex flex-col gap-6",
          className,
        )}
        data-slot="streak-tracker"
        data-state={streak >= goal ? "goal-reached" : "building"}
        {...props}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Daily streak</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-4xl font-semibold">{streak}</span>
              <span className="pb-1 text-sm text-muted-foreground">days in a row</span>
            </div>
          </div>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Flame className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Goal</span>
            <span className="text-muted-foreground">{goal} days</span>
          </div>
          <div className="flex gap-1">
            {goalSegments.map((filled, index) => (
              <span
                key={`goal-${index}`}
                aria-hidden="true"
                className={cn("h-2 flex-1 rounded-full transition-all duration-500", filled ? "bg-primary" : "bg-secondary")}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2" aria-label="Last seven days">
          {days.slice(0, 7).map((day, index) => (
            <div key={index} className="space-y-2 text-center">
              <div className="text-xs font-medium text-muted-foreground">{day.label}</div>
              <div
                className={cn(
                  "mx-auto h-8 w-8 rounded-full border transition-colors duration-300",
                  day.completed
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground",
                )}
                data-state={day.completed ? "complete" : "pending"}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

StreakTracker.displayName = "StreakTracker";
