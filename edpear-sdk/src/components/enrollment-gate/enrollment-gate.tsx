"use client";

import { Lock, ShoppingCart, ListChecks, PlayCircle } from "lucide-react";

import { cn } from "../../lib/cn.js";
import type { EnrollmentGateProps, EnrollmentGateType } from "./enrollment-gate.types.js";

function unlocked(enrolled?: boolean, hasAccess?: boolean, completedPrereq?: boolean): boolean {
  if (enrolled === false || hasAccess === false || completedPrereq === false) return false;
  return true;
}

function GateIcon({ type }: { type: EnrollmentGateType }) {
  switch (type) {
    case "purchase":
      return <ShoppingCart className="h-10 w-10 text-muted-foreground" aria-hidden />;
    case "prerequisite":
      return <ListChecks className="h-10 w-10 text-muted-foreground" aria-hidden />;
    default:
      return <PlayCircle className="h-10 w-10 text-muted-foreground" aria-hidden />;
  }
}

const COPY: Record<
  EnrollmentGateType,
  { title: string; description: string; action: string }
> = {
  purchase: {
    title: "Enroll to continue",
    description: "Purchase this course or upgrade your plan to access this content.",
    action: "View pricing",
  },
  prerequisite: {
    title: "Complete prerequisites",
    description: "Finish the required modules before this section unlocks.",
    action: "Go to prerequisites",
  },
  "not-started": {
    title: "Course not started",
    description: "Begin the course or resume where you left off to open this lesson.",
    action: "Start course",
  },
};

export function EnrollmentGate({
  children,
  enrolled,
  hasAccess,
  completedPrereq,
  gateType = "purchase",
  lockTitle,
  lockDescription,
  actionLabel,
  onAction,
  className,
}: EnrollmentGateProps) {
  const open = unlocked(enrolled, hasAccess, completedPrereq);
  const copy = COPY[gateType];

  if (open) {
    return (
      <div className={className} data-slot="enrollment-gate" data-state="open">
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("relative rounded-xl border border-dashed border-border bg-muted/20", className)}
      data-slot="enrollment-gate"
      data-state="locked"
    >
      <div className="pointer-events-none select-none blur-sm opacity-40" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/85 p-8 text-center backdrop-blur-sm">
        <div className="relative">
          <GateIcon type={gateType} />
          <Lock
            className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background text-muted-foreground ring-2 ring-background"
            aria-hidden
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{lockTitle ?? copy.title}</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {lockDescription ?? copy.description}
          </p>
        </div>
        {onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {actionLabel ?? copy.action}
          </button>
        ) : null}
      </div>
    </div>
  );
}
