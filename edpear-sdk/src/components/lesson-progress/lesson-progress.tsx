import { Check } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "../../lib/cn.js";
import type { LessonProgressProps } from "./lesson-progress.types.js";

export const LessonProgress = forwardRef<HTMLDivElement, LessonProgressProps>(
  ({ steps, currentStep = 0, showLabels = true, className, ...props }, ref) => {
    const safeCurrentStep = Math.max(0, Math.min(currentStep, Math.max(steps.length - 1, 0)));

    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
        data-slot="lesson-progress"
        {...props}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span>Lesson progress</span>
            <span aria-live="polite">
              {steps.length === 0 ? "0/0" : `${safeCurrentStep + 1}/${steps.length}`}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${steps.length === 0 ? 0 : ((safeCurrentStep + 1) / steps.length) * 100}%` }} 
            />
          </div>
        </div>
        <ol className="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))] mt-6">
          {steps.map((step, index) => {
            const state =
              index < safeCurrentStep ? "complete" : index === safeCurrentStep ? "active" : "upcoming";

            return (
              <li
                key={step.id}
                className="flex items-start gap-3"
                data-slot="lesson-progress-step"
                data-state={state}
              >
                <div className="flex flex-col items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                      state === "complete" &&
                        "border-primary bg-primary/10 text-primary",
                      state === "active" && "border-primary bg-primary text-primary-foreground",
                      state === "upcoming" && "border-border bg-background text-muted-foreground",
                    )}
                  >
                    {state === "complete" ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  {index < steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "hidden h-10 w-px md:block",
                        index < safeCurrentStep ? "bg-primary" : "bg-border",
                      )}
                    />
                  ) : null}
                </div>
                {showLabels ? (
                  <div className="space-y-1">
                    <div className="font-medium">{step.label}</div>
                    {step.description ? (
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    );
  },
);

LessonProgress.displayName = "LessonProgress";
