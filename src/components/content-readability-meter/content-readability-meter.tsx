
"use client";

import { Search, Target, TrendingUp } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { ReadabilitySample, ContentReadabilityMeterProps } from "./content-readability-meter.types.js";

const DEFAULT_POINTS: ReadabilitySample[] = [
  {
    "id": "r1",
    "label": "Intro article",
    "baseline": 8.2,
    "current": 6.7,
    "target": 6.5,
    "detail": "Shorter sentences lowered the grade-band complexity significantly."
  },
  {
    "id": "r2",
    "label": "Lab directions",
    "baseline": 7.1,
    "current": 6.4,
    "target": 6,
    "detail": "Breaking long steps into bullets made the sequence easier to parse."
  },
  {
    "id": "r3",
    "label": "Exit ticket prompt",
    "baseline": 5.8,
    "current": 5.4,
    "target": 5,
    "detail": "Vocabulary remains the main driver of difficulty here."
  }
];

function maxValue(points: ReadabilitySample[]) {
  return Math.max(...points.flatMap((point) => [point.baseline, point.current, point.target ?? 0]), 1);
}

export const ContentReadabilityMeter = forwardRef<HTMLDivElement, ContentReadabilityMeterProps>((props, ref) => {
  const {
    title = "Content Readability Meter",
    subtitle = "Flesch-Kincaid inspired readability surface for previewing text difficulty before publishing.",
    passages = DEFAULT_POINTS,
    baselineLabel = "Current",
    currentLabel = "Adjusted",
    targetLabel = "Target",
    disabled = false,
    onSelectPassage,
    className,
    ...rest
  } = props;

  const [activeId, setActiveId] = useState(passages[0]?.id ?? null);
  const peak = useMemo(() => maxValue(passages), [passages]);
  const activePoint = useMemo(
    () => passages.find((point) => point.id === activeId) ?? passages[0] ?? null,
    [activeId, passages],
  );
  const deltaAverage = useMemo(() => {
    if (!passages.length) return 0;
    const total = passages.reduce((sum, point) => sum + (point.current - point.baseline), 0);
    return Math.round((total / passages.length) * 10) / 10;
  }, [passages]);

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="content-readability-meter"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Search className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Avg delta</p>
              <p className="mt-1 font-semibold">{deltaAverage > 0 ? "+" : ""}{deltaAverage}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Tracked</p>
              <p className="mt-1 font-semibold">{passages.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Targets</p>
              <p className="mt-1 font-semibold">{passages.filter((point) => point.target !== undefined).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <div className="space-y-4">
          {passages.map((point) => {
            const selected = point.id === activePoint?.id;
            const baselineWidth = Math.max(8, (point.baseline / peak) * 100);
            const currentWidth = Math.max(8, (point.current / peak) * 100);
            const targetWidth = Math.max(8, ((point.target ?? 0) / peak) * 100);
            return (
              <button
                key={point.id}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setActiveId(point.id);
                  onSelectPassage?.(point);
                }}
                className={cn(
                  "w-full rounded-2xl border px-4 py-4 text-left transition",
                  selected ? "border-primary/40 bg-primary/5" : "border-border bg-background hover:bg-muted/20",
                  disabled && "cursor-not-allowed opacity-70",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{point.label}</p>
                    {point.detail ? <p className="mt-1 text-sm text-muted-foreground">{point.detail}</p> : null}
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold">{point.current}</p>
                    <p className="text-xs text-muted-foreground">current</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted-foreground"><span>{baselineLabel}</span><span>{point.baseline}</span></div>
                    <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-slate-400" style={{ width: baselineWidth + "%" }} /></div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted-foreground"><span>{currentLabel}</span><span>{point.current}</span></div>
                    <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: currentWidth + "%" }} /></div>
                  </div>
                  {point.target !== undefined ? (
                    <div>
                      <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted-foreground"><span>{targetLabel}</span><span>{point.target}</span></div>
                      <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-emerald-500" style={{ width: targetWidth + "%" }} /></div>
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <aside className="rounded-2xl border border-border bg-muted/10 p-4 sm:p-5">
          {activePoint ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-base font-semibold tracking-tight">{activePoint.label}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{activePoint.detail ?? "Select a point to inspect the trend."}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium"><TrendingUp className="h-4 w-4 text-primary" /> {currentLabel}</div>
                  <p className="mt-2 text-2xl font-semibold">{activePoint.current}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium"><Target className="h-4 w-4 text-emerald-500" /> {targetLabel}</div>
                  <p className="mt-2 text-2xl font-semibold">{activePoint.target ?? "-"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-medium">Change</p>
                  <p className="mt-2 text-2xl font-semibold">{activePoint.current - activePoint.baseline > 0 ? "+" : ""}{activePoint.current - activePoint.baseline}</p>
                </div>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
});

ContentReadabilityMeter.displayName = "ContentReadabilityMeter";
