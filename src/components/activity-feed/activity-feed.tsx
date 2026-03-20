"use client";

import { Award, BookOpen, MessageCircle, Sparkles, UserPlus } from "lucide-react";

import { cn } from "../../lib/cn.js";
import type { ActivityFeedItem, ActivityFeedItemType, ActivityFeedProps } from "./activity-feed.types.js";

function relTime(ts: string | Date): string {
  const t = typeof ts === "string" ? new Date(ts).getTime() : ts.getTime();
  const s = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (s < 45) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return new Date(t).toLocaleDateString();
}

function Icon({ type }: { type: ActivityFeedItemType }) {
  const c = "h-4 w-4 shrink-0";
  switch (type) {
    case "lesson_complete":
      return <BookOpen className={cn(c, "text-lesson")} aria-hidden />;
    case "discussion":
      return <MessageCircle className={cn(c, "text-primary")} aria-hidden />;
    case "badge":
      return <Award className={cn(c, "text-orange-500")} aria-hidden />;
    case "enrollment":
      return <UserPlus className={cn(c, "text-muted-foreground")} aria-hidden />;
    default:
      return <Sparkles className={cn(c, "text-muted-foreground")} aria-hidden />;
  }
}

export function ActivityFeed({ items, title = "Activity", className }: ActivityFeedProps) {
  const sorted = [...items].sort((a, b) => {
    const ta = typeof a.timestamp === "string" ? new Date(a.timestamp).getTime() : a.timestamp.getTime();
    const tb = typeof b.timestamp === "string" ? new Date(b.timestamp).getTime() : b.timestamp.getTime();
    return tb - ta;
  });

  return (
    <div
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="activity-feed"
    >
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <ul className="max-h-80 divide-y divide-border overflow-y-auto">
        {sorted.map((item) => (
          <li key={item.id} className="flex gap-3 px-4 py-3">
            <div className="mt-0.5 rounded-full border border-border bg-muted/50 p-2">
              <Icon type={item.type} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">
                {item.actor ? (
                  <>
                    <span className="font-medium text-foreground">{item.actor}</span>{" "}
                  </>
                ) : null}
                {item.message}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{relTime(item.timestamp)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
