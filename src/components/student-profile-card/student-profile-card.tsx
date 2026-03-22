"use client";

import { BookOpen, Flame } from "lucide-react";

import { cn } from "../../lib/cn.js";
import type { StudentProfileCardProps } from "./student-profile-card.types.js";

function ProgressRing({ percent, size = 52 }: { percent: number; size?: number }) {
  const p = Math.min(100, Math.max(0, percent));
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (p / 100) * c;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90" aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        className="stroke-muted"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        className="stroke-primary transition-[stroke-dashoffset]"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StudentProfileCard({
  name,
  avatarUrl,
  avatarFallback,
  streakDays = 0,
  badges = [],
  coursesEnrolled = 0,
  progressPercent = 0,
  compact = false,
  className,
}: StudentProfileCardProps) {
  const initial = (avatarFallback ?? name)
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        compact ? "p-4" : "p-6",
        className,
      )}
      data-slot="student-profile-card"
      data-variant={compact ? "compact" : "default"}
    >
      <div className={cn("flex gap-4", compact ? "items-center" : "items-start")}>
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-semibold text-muted-foreground",
            compact ? "h-12 w-12 text-sm" : "h-16 w-16 text-lg",
          )}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={cn("font-semibold tracking-tight", compact ? "text-base" : "text-lg")}>{name}</h3>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" aria-hidden />
              {streakDays} day streak
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-4 w-4" aria-hidden />
              {coursesEnrolled} courses
            </span>
          </div>
          {!compact && badges.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {badges.map((b) => (
                <li
                  key={b.id}
                  className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium"
                >
                  {b.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-col items-center gap-1">
          <ProgressRing percent={progressPercent} size={compact ? 44 : 52} />
          <span className="text-[10px] font-medium text-muted-foreground">Progress</span>
        </div>
      </div>
    </div>
  );
}
