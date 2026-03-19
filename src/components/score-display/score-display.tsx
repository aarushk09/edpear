import { forwardRef, useEffect, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { ScoreDisplayProps } from "./score-display.types.js";

function getGrade(percentage: number): string {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
}

export const ScoreDisplay = forwardRef<HTMLDivElement, ScoreDisplayProps>(
  (
    {
      score,
      maxScore,
      passingScore = Math.round(maxScore * 0.6),
      animated = true,
      revealDuration = 900,
      showGrade = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [visibleScore, setVisibleScore] = useState(animated ? 0 : score);
    const boundedScore = Math.max(0, Math.min(score, maxScore));

    useEffect(() => {
      if (!animated) {
        setVisibleScore(boundedScore);
        return;
      }

      let frame = 0;
      const startedAt = performance.now();

      const tick = (time: number) => {
        const progress = Math.min((time - startedAt) / revealDuration, 1);
        setVisibleScore(Math.round(boundedScore * progress));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, [animated, boundedScore, revealDuration]);

    const percentage = useMemo(() => Math.round((boundedScore / maxScore) * 100), [boundedScore, maxScore]);
    const meterSegments = Array.from({ length: 10 }, (_, index) => index < Math.round(percentage / 10));
    const passed = boundedScore >= passingScore;
    const grade = getGrade(percentage);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl border bg-card p-6 text-card-foreground shadow-sm",
          passed ? "border-feedback-correct/30" : "border-feedback-incorrect/30",
          className,
        )}
        data-slot="score-display"
        data-state={passed ? "pass" : "fail"}
        {...props}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Assessment score</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-semibold tabular-nums">{visibleScore}</span>
              <span className="pb-2 text-lg text-muted-foreground">/ {maxScore}</span>
            </div>
          </div>
          {showGrade ? (
            <span
              className={cn(
                "rounded-full px-4 py-2 text-lg font-semibold",
                passed ? "bg-feedback-correct text-primary-foreground" : "bg-feedback-incorrect text-primary-foreground",
              )}
            >
              {grade}
            </span>
          ) : null}
        </div>
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{passed ? "Passing" : "Needs review"}</span>
            <span className="text-muted-foreground">{percentage}%</span>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {meterSegments.map((filled, index) => (
              <span
                key={`score-segment-${index}`}
                aria-hidden="true"
                className={cn(
                  "h-3 rounded-full",
                  filled
                    ? passed
                      ? "bg-feedback-correct"
                      : "bg-feedback-incorrect"
                    : "bg-muted",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

ScoreDisplay.displayName = "ScoreDisplay";
