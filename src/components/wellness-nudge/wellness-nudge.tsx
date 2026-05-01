
"use client";

import { Sparkles, RotateCw } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { WellnessNudgeVariant, WellnessNudgeProps } from "./wellness-nudge.types.js";

const DEFAULT_VARIANTS: WellnessNudgeVariant[] = [
  {
    "id": "wn1",
    "label": "Stretch",
    "headline": "Shoulders up, shoulders down",
    "body": "Take 20 seconds to roll your shoulders and release tension before the next task.",
    "note": "Best after long typing or quiz sessions."
  },
  {
    "id": "wn2",
    "label": "Water",
    "headline": "Refill before round two",
    "body": "A quick water break can reset attention more effectively than forcing through fatigue.",
    "note": "Ideal between work cycles."
  },
  {
    "id": "wn3",
    "label": "Breathe",
    "headline": "Try one slow breath set",
    "body": "Inhale for four, exhale for six, and let the pace of the session slow down with you.",
    "note": "Great before graded checkpoints."
  }
];

export const WellnessNudge = forwardRef<HTMLDivElement, WellnessNudgeProps>((props, ref) => {
  const {
    title = "Wellness Nudge",
    subtitle = "Contextual micro-tip card that nudges learners to stretch, hydrate, breathe, or reset.",
    variants = DEFAULT_VARIANTS,
    defaultVariantId,
    disabled = false,
    onVariantChange,
    className,
    ...rest
  } = props;

  const [activeId, setActiveId] = useState(defaultVariantId ?? variants[0]?.id ?? null);
  const activeVariant = useMemo(
    () => variants.find((variant) => variant.id === activeId) ?? variants[0] ?? null,
    [activeId, variants],
  );

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="wellness-nudge"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                setActiveId(variant.id);
                onVariantChange?.(variant.id);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                variant.id === activeVariant?.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              {variant.label}
            </button>
          ))}
        </div>

        {activeVariant ? (
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="rounded-2xl border border-border bg-muted/10 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <RotateCw className="h-4 w-4" />
                Active variant
              </div>
              <h4 className="mt-3 text-xl font-semibold tracking-tight">{activeVariant.headline}</h4>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeVariant.body}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Implementation note</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{activeVariant.note ?? "Use this variant to compare alternate presentation states."}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
});

WellnessNudge.displayName = "WellnessNudge";
