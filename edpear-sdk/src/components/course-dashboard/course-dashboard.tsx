"use client";

import { cn } from "../../lib/cn.js";
import type { CourseDashboardProps } from "./course-dashboard.types.js";

function Ring({ p }: { p: number }) {
  const pct = Math.min(100, Math.max(0, p));
  const size = 56;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0" aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-muted" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        className="stroke-primary"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={off}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CourseDashboard({
  course,
  progressPercent = 0,
  progressSlot,
  nextLessonSlot,
  activitySlot,
  instructorSlot,
  announcementSlot,
  className,
}: CourseDashboardProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="course-dashboard"
    >
      {announcementSlot ? (
        <div className="border-b border-primary/20 bg-primary/10 px-4 py-2 text-sm">{announcementSlot}</div>
      ) : null}
      <div className="border-b border-border p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {course.code ? (
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{course.code}</p>
            ) : null}
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{course.title}</h2>
            {course.subtitle ? <p className="mt-1 text-muted-foreground">{course.subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-3">
            {progressSlot ?? (
              <div className="flex items-center gap-2 text-sm">
                <Ring p={progressPercent} />
                <span className="font-medium tabular-nums">{progressPercent}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-6 p-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Next up</h3>
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            {nextLessonSlot ?? (
              <p className="text-sm text-muted-foreground">Pass nextLessonSlot for your primary CTA.</p>
            )}
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent activity</h3>
          <div className="rounded-lg border border-border p-4">
            {activitySlot ?? <p className="text-sm text-muted-foreground">Pass activitySlot (e.g. ActivityFeed).</p>}
          </div>
        </section>
        <aside className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Instructor</h3>
          <div className="rounded-lg border border-border p-4">
            {instructorSlot ?? <p className="text-sm text-muted-foreground">Optional instructor card.</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}
