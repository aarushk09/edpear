"use client";

import { Calendar, Clock, Radio, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { LiveClassBannerProps } from "./live-class-banner.types.js";

function formatElapsed(startedAt: string | Date, now: number): string {
  const t = typeof startedAt === "string" ? new Date(startedAt).getTime() : startedAt.getTime();
  const sec = Math.max(0, Math.floor((now - t) / 1000));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatSchedule(d: string | Date): string {
  const x = typeof d === "string" ? new Date(d) : d;
  return x.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function LiveClassBanner({
  status,
  hostName,
  sessionTitle = "Live session",
  participantCount = 0,
  startedAt,
  scheduledFor,
  joinHref,
  onJoin,
  className,
}: LiveClassBannerProps) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (status !== "live" || !startedAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [status, startedAt]);

  if (status === "ended") {
    return (
      <div
        className={cn(
          "border-b border-border bg-muted/60 px-4 py-2 text-center text-sm text-muted-foreground",
          className,
        )}
        data-slot="live-class-banner"
        data-state="ended"
      >
        This live session has ended. Thanks for joining.
      </div>
    );
  }

  if (status === "scheduled") {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3",
          className,
        )}
        data-slot="live-class-banner"
        data-state="scheduled"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Calendar className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
          <div className="min-w-0">
            <p className="text-sm font-medium">{sessionTitle}</p>
            <p className="text-xs text-muted-foreground">
              Host {hostName}
              {scheduledFor ? ` · Starts ${formatSchedule(scheduledFor)}` : ""}
            </p>
          </div>
        </div>
        {joinHref ? (
          <a
            href={joinHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            <Video className="h-4 w-4" />
            Waiting room
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b border-primary/30 bg-primary/10 px-4 py-3",
        className,
      )}
      data-slot="live-class-banner"
      data-state="live"
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-primary">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <Radio className="h-4 w-4" aria-hidden />
          <span className="text-sm font-semibold">Live now</span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{sessionTitle}</p>
          <p className="text-xs text-muted-foreground">Hosted by {hostName}</p>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-4 w-4" aria-hidden />
          {participantCount} joined
        </div>
        {startedAt ? (
          <div className="flex items-center gap-1.5 font-mono text-sm tabular-nums text-foreground">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden />
            {formatElapsed(startedAt, now)}
          </div>
        ) : null}
      </div>
      {joinHref || onJoin ? (
        joinHref ? (
          <a
            href={joinHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Video className="h-4 w-4" />
            Join now
          </a>
        ) : (
          <button
            type="button"
            onClick={onJoin}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Video className="h-4 w-4" />
            Join now
          </button>
        )
      ) : null}
    </div>
  );
}
