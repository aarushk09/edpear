
"use client";

import { LayoutGrid, ArrowRight, Sparkles } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { CompetencyMatrixEntry, CompetencyMatrixProps } from "./competency-matrix.types.js";

const DEFAULT_ITEMS: CompetencyMatrixEntry[] = [
  {
    "id": "c1",
    "title": "Claim writing",
    "subtitle": "Proficient",
    "detail": "Performance is consistent across independent writing and seminar prep.",
    "status": "proficient",
    "tag": "ELA",
    "evidence": [
      "Essay rubric",
      "Debate reflection"
    ],
    "score": 3
  },
  {
    "id": "c2",
    "title": "Ratios and rates",
    "subtitle": "Developing",
    "detail": "Setup is correct, but final units and comparisons still need support.",
    "status": "developing",
    "tag": "Math",
    "evidence": [
      "Quiz 2",
      "Intervention notes"
    ],
    "score": 2
  },
  {
    "id": "c3",
    "title": "Lab procedure design",
    "subtitle": "Advanced",
    "detail": "Learner can build a valid procedure and justify controls independently.",
    "status": "advanced",
    "tag": "Science",
    "evidence": [
      "Capstone lab",
      "Teacher observation"
    ],
    "score": 4
  }
];

export const CompetencyMatrix = forwardRef<HTMLDivElement, CompetencyMatrixProps>((props, ref) => {
  const {
    title = "Competency Matrix",
    subtitle = "Skills-by-proficiency matrix with evidence drill-down for each competency.",
    competencies = DEFAULT_ITEMS,
    primaryActionLabel = "View evidence",
    secondaryActionLabel = "Plan next step",
    disabled = false,
    onViewEvidence,
    onPlanNextStep,
    className,
    ...rest
  } = props;

  const [activeId, setActiveId] = useState(competencies[0]?.id ?? null);
  const activeItem = useMemo(
    () => competencies.find((entry) => entry.id === activeId) ?? competencies[0] ?? null,
    [activeId, competencies],
  );

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="competency-matrix"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Items</p>
              <p className="mt-1 font-semibold">{competencies.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Signals</p>
              <p className="mt-1 font-semibold">{competencies.filter((entry) => entry.status).length}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Evidence</p>
              <p className="mt-1 font-semibold">{competencies.flatMap((entry) => entry.evidence ?? []).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">
        <div className="space-y-3">
          {competencies.map((entry) => {
            const selected = activeItem?.id === entry.id;
            return (
              <button
                key={entry.id}
                type="button"
                disabled={disabled}
                onClick={() => setActiveId(entry.id)}
                className={cn(
                  "w-full rounded-2xl border px-4 py-4 text-left transition",
                  selected ? "border-primary/40 bg-primary/5" : "border-border bg-background hover:bg-muted/20",
                  disabled && "cursor-not-allowed opacity-70",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{entry.title}</p>
                      {entry.tag ? (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{entry.tag}</span>
                      ) : null}
                    </div>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{entry.subtitle}</p>
                  </div>
                  {entry.score !== undefined ? (
                    <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium">{entry.score}</span>
                  ) : null}
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{entry.detail}</p>
              </button>
            );
          })}
        </div>

        <aside className="rounded-2xl border border-border bg-muted/10 p-4 sm:p-5">
          {activeItem ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold tracking-tight">{activeItem.title}</h4>
                  {activeItem.status ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">{activeItem.status}</span>
                  ) : null}
                </div>
                <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{activeItem.subtitle}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{activeItem.detail}</p>
              </div>

              {activeItem.evidence?.length ? (
                <div className="space-y-2 rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Supporting evidence
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {activeItem.evidence.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => activeItem && onViewEvidence?.(activeItem)}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {primaryActionLabel}
                </button>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => activeItem && onPlanNextStep?.(activeItem)}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium transition hover:bg-muted/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {secondaryActionLabel}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-background px-4 py-8 text-center text-sm text-muted-foreground">
              Add a data point to start this workspace.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
});

CompetencyMatrix.displayName = "CompetencyMatrix";
