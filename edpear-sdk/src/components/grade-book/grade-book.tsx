"use client";

import { useMemo } from "react";

import { cn } from "../../lib/cn.js";
import type { GradeBookProps, GradeCellValue } from "./grade-book.types.js";

const DEFAULT_BANDS: { letter: string; minPercent: number; className: string }[] = [
  { letter: "A", minPercent: 90, className: "bg-feedback-correct/15 text-feedback-correct" },
  { letter: "B", minPercent: 80, className: "bg-primary/10 text-primary" },
  { letter: "C", minPercent: 70, className: "bg-muted text-foreground" },
  { letter: "D", minPercent: 60, className: "bg-accent/80 text-accent-foreground" },
  { letter: "F", minPercent: 0, className: "bg-feedback-incorrect/15 text-feedback-incorrect" },
];

function parsePercent(raw: GradeCellValue): number | null {
  const t = raw.trim();
  if (!t) return null;
  const m = t.match(/^(\d+(?:\.\d+)?)\s*%?$/);
  if (m) return Math.min(100, Math.max(0, parseFloat(m[1])));
  const letter = t.toUpperCase().replace(/[+-]$/, "").replace(/\+$/, "");
  const map: Record<string, number> = { A: 95, B: 85, C: 75, D: 65, F: 55 };
  if (letter in map) return map[letter];
  return null;
}

function bandClass(
  value: GradeCellValue,
  bands: { letter: string; minPercent: number; className?: string }[],
): string {
  const p = parsePercent(value);
  if (p == null) return "";
  const sorted = [...bands].sort((a, b) => b.minPercent - a.minPercent);
  for (const b of sorted) {
    if (p >= b.minPercent) {
      return b.className ?? "";
    }
  }
  return "";
}

function weightedAverage(
  studentId: string,
  assignments: GradeBookProps["assignments"],
  categories: GradeBookProps["categories"],
  grades: GradeBookProps["grades"],
): number | null {
  if (!categories?.length) return null;
  const byCat: Record<string, { sum: number; n: number }> = {};
  for (const c of categories) {
    byCat[c.id] = { sum: 0, n: 0 };
  }
  for (const a of assignments) {
    const cid = a.categoryId;
    if (!cid || !byCat[cid]) continue;
    const g = grades[studentId]?.[a.id];
    const p = parsePercent(g ?? "");
    if (p != null) {
      byCat[cid].sum += p;
      byCat[cid].n += 1;
    }
  }
  let total = 0;
  let wsum = 0;
  for (const c of categories) {
    const { sum, n } = byCat[c.id];
    if (n === 0) continue;
    const avg = sum / n;
    total += avg * c.weight;
    wsum += c.weight;
  }
  if (wsum === 0) return null;
  return total / wsum;
}

export function GradeBook({
  students,
  assignments,
  categories,
  grades,
  onGradeChange,
  letterBands = DEFAULT_BANDS,
  editable = true,
  className,
}: GradeBookProps) {
  const bands = useMemo(
    () => letterBands.map((b) => ({ ...b, className: b.className ?? "" })),
    [letterBands],
  );

  return (
    <div
      className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="grade-book"
    >
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Grade book</h3>
        <p className="text-xs text-muted-foreground">
          Inline cells · letter or % · weighted categories when configured
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-muted/40 px-3 py-2 text-left font-medium"
              >
                Student
              </th>
              {assignments.map((a) => (
                <th
                  key={a.id}
                  scope="col"
                  className="min-w-[100px] px-2 py-2 text-center font-medium"
                >
                  <span className="line-clamp-2">{a.title}</span>
                </th>
              ))}
              {categories?.length ? (
                <th scope="col" className="px-2 py-2 text-center font-medium">
                  Course
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-card px-3 py-2 text-left font-normal"
                >
                  {s.name}
                </th>
                {assignments.map((a) => {
                  const v = grades[s.id]?.[a.id] ?? "";
                  const tone = bandClass(v, bands);
                  return (
                    <td key={a.id} className="p-1 align-middle">
                      {editable ? (
                        <input
                          aria-label={`Grade for ${s.name}, ${a.title}`}
                          className={cn(
                            "h-9 w-full rounded-md border border-input bg-background px-2 text-center text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            tone,
                          )}
                          value={v}
                          onChange={(e) =>
                            onGradeChange?.(s.id, a.id, e.target.value)
                          }
                        />
                      ) : (
                        <div
                          className={cn(
                            "flex h-9 items-center justify-center rounded-md border border-transparent px-2",
                            tone,
                          )}
                        >
                          {v || "—"}
                        </div>
                      )}
                    </td>
                  );
                })}
                {categories?.length ? (
                  <td className="p-2 text-center font-semibold tabular-nums">
                    {(() => {
                      const w = weightedAverage(s.id, assignments, categories, grades);
                      return w != null ? `${w.toFixed(1)}%` : "—";
                    })()}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {categories?.length ? (
        <div className="border-t border-border bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
          Weights:{" "}
          {categories.map((c) => (
            <span key={c.id} className="mr-3">
              {c.name} {(c.weight * 100).toFixed(0)}%
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
