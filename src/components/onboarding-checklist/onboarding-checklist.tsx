"use client";

import { Check, ChevronDown, ChevronUp, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { OnboardingChecklistProps } from "./onboarding-checklist.types.js";

export function OnboardingChecklist({
  title = "Get started",
  items,
  completedIds,
  onToggle,
  onDismiss,
  rewardSlot,
  embedded = false,
  className,
}: OnboardingChecklistProps) {
  const dock = embedded ? "absolute bottom-4 right-4" : "fixed bottom-6 right-6 z-50";
  const [collapsed, setCollapsed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const done = useMemo(() => new Set(completedIds), [completedIds]);
  const totalXp = items.filter((i) => done.has(i.id)).reduce((s, i) => s + (i.xp ?? 0), 0);
  const allDone = items.length > 0 && items.every((i) => done.has(i.id));

  if (dismissed) {
    return (
      <button
        type="button"
        onClick={() => setDismissed(false)}
        className={cn(
          dock,
          "flex h-14 w-14 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground shadow-lg transition hover:scale-105",
          !embedded && "z-50",
          className,
        )}
        aria-label="Open onboarding checklist"
        data-slot="onboarding-checklist"
        data-state="fab"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  if (collapsed) {
    return (
      <div
        className={cn(
          dock,
          "flex items-center gap-2 rounded-full border border-border bg-card py-2 pl-4 pr-2 shadow-lg",
          !embedded && "z-50",
          className,
        )}
        data-slot="onboarding-checklist"
        data-state="collapsed"
      >
        <span className="text-sm font-medium">
          {done.size}/{items.length} done
        </span>
        <button
          type="button"
          className="rounded-full p-2 hover:bg-muted"
          onClick={() => setCollapsed(false)}
          aria-label="Expand checklist"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        dock,
        "w-[min(100vw-2rem,360px)] rounded-xl border bg-card text-card-foreground shadow-xl",
        !embedded && "z-50",
        className,
      )}
      data-slot="onboarding-checklist"
      data-state="open"
    >
      <div className="flex items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {done.size} of {items.length} complete
            {totalXp > 0 ? ` · ${totalXp} XP` : ""}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="rounded-md p-1.5 hover:bg-muted"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-md p-1.5 hover:bg-muted"
            onClick={() => {
              onDismiss?.();
              setDismissed(true);
            }}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      {rewardSlot ? <div className="border-b border-border px-4 py-2">{rewardSlot}</div> : null}
      <ul className="max-h-64 space-y-1 overflow-y-auto p-2">
        {items.map((item) => {
          const checked = done.has(item.id);
          return (
            <li key={item.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-muted/80">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-border"
                  checked={checked}
                  onChange={(e) => onToggle?.(item.id, e.target.checked)}
                />
                <span className="flex-1 text-sm">
                  {item.label}
                  {item.xp != null ? (
                    <span className="ml-2 text-xs text-muted-foreground">+{item.xp} XP</span>
                  ) : null}
                </span>
                {checked ? <Check className="mt-0.5 h-4 w-4 text-feedback-correct" aria-hidden /> : null}
              </label>
            </li>
          );
        })}
      </ul>
      {allDone ? (
        <div className="border-t border-border bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground">
          You&apos;re ready—this card can collapse to the corner.
        </div>
      ) : null}
    </div>
  );
}
