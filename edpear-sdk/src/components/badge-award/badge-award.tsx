import { Award } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "../../lib/cn.js";
import type { BadgeAwardProps } from "./badge-award.types.js";

export const BadgeAward = forwardRef<HTMLDivElement, BadgeAwardProps>(
  (
    {
      title,
      description,
      icon,
      unlocked = true,
      earnedAt,
      animate = true,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all",
        unlocked ? "border-quiz/40 hover:border-quiz/80" : "opacity-70",
        className,
      )}
      data-slot="badge-award"
      data-state={unlocked ? "unlocked" : "locked"}
      {...props}
    >
      <div className="relative flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border",
            unlocked ? "border-quiz/40 bg-quiz/10 text-quiz" : "border-border bg-muted text-muted-foreground",
          )}
        >
          {icon ?? <Award className="h-7 w-7" />}
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
                unlocked ? "bg-quiz text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {unlocked ? "Unlocked" : "Locked"}
            </span>
          </div>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          {earnedAt ? <p className="text-xs text-muted-foreground">Earned {earnedAt}</p> : null}
        </div>
      </div>
    </div>
  ),
);

BadgeAward.displayName = "BadgeAward";
