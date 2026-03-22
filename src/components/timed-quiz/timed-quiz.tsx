import { AlarmClock } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";

import { cn } from "../../lib/cn.js";
import { QuizCard } from "../quiz-card/quiz-card.js";
import type { TimedQuizProps } from "./timed-quiz.types.js";

export const TimedQuiz = forwardRef<HTMLDivElement, TimedQuizProps>(
  (
    {
      duration,
      autoStart = true,
      onTimeout,
      onSubmit,
      className,
      value,
      defaultValue,
      onValueChange,
      ...quizProps
    },
    ref,
  ) => {
    const [remaining, setRemaining] = useState(duration);
    const [active, setActive] = useState(autoStart);
    const [lastValue, setLastValue] = useState(defaultValue ?? "");

    useEffect(() => {
      if (!active || remaining === 0) {
        return;
      }

      const timer = window.setInterval(() => {
        setRemaining((current) => {
          if (current <= 1) {
            window.clearInterval(timer);
                const finalValue = typeof value === "string" ? value : lastValue;
            onTimeout?.(finalValue);
            return 0;
          }

          return current - 1;
        });
      }, 1000);

      return () => window.clearInterval(timer);
    }, [active, lastValue, onTimeout, remaining, value]);

    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        data-slot="timed-quiz"
        data-state={remaining === 0 ? "expired" : "running"}
      >
        <div className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <AlarmClock className="h-4 w-4" />
            <span>Timed challenge</span>
          </div>
          <div
            aria-live="polite"
            className={cn(
              "rounded-full px-3 py-1 text-sm font-semibold tabular-nums",
              remaining <= 10 ? "bg-feedback-incorrect text-primary-foreground" : "bg-secondary",
            )}
          >
            {remaining}s
          </div>
        </div>
        <QuizCard
          {...quizProps}
          className={className}
          defaultValue={defaultValue}
          disabled={("disabled" in quizProps && Boolean(quizProps.disabled)) || remaining === 0}
          value={value}
          onSubmit={(result) => {
            setActive(false);
            onSubmit?.({ ...result, timedOut: false });
          }}
          onValueChange={(nextValue) => {
            setLastValue(nextValue);
            onValueChange?.(nextValue);
          }}
        />
      </div>
    );
  },
);

TimedQuiz.displayName = "TimedQuiz";
