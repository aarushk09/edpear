"use client";

import { Send } from "lucide-react";

import { cn } from "../../lib/cn.js";
import type { PeerReviewPanelProps } from "./peer-review-panel.types.js";

export function PeerReviewPanel({
  submissionTitle = "Peer submission",
  submissionPreview,
  rubric,
  scores,
  comments,
  onScoreChange,
  onCommentChange,
  onSubmitReview,
  disabled = false,
  className,
}: PeerReviewPanelProps) {
  return (
    <div
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="peer-review-panel"
    >
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Peer review</h3>
        <p className="text-xs text-muted-foreground">Rubric scores and per-criterion comments</p>
      </div>
      <div className="grid gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="rounded-lg border border-border bg-muted/20 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {submissionTitle}
          </h4>
          <p className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">
            {submissionPreview}
          </p>
        </section>
        <section className="space-y-4">
          {rubric.map((c) => (
            <div key={c.id} className="rounded-lg border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{c.label}</p>
                  {c.description ? (
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                  ) : null}
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Points</span>
                  <input
                    type="number"
                    min={0}
                    max={c.maxPoints}
                    step={0.5}
                    disabled={disabled}
                    className="h-9 w-20 rounded-md border border-input bg-background px-2 text-center text-sm"
                    value={scores[c.id] ?? 0}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      const v = Number.isFinite(n) ? n : 0;
                      onScoreChange?.(c.id, Math.min(c.maxPoints, Math.max(0, v)));
                    }}
                    aria-label={`Score for ${c.label}`}
                  />
                  <span className="text-muted-foreground">/ {c.maxPoints}</span>
                </label>
              </div>
              <label className="mt-3 block text-xs font-medium text-muted-foreground">
                Comment
                <textarea
                  disabled={disabled}
                  className="mt-1 min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Feedback for this criterion…"
                  value={comments[c.id] ?? ""}
                  onChange={(e) => onCommentChange?.(c.id, e.target.value)}
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSubmitReview?.()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Submit review
          </button>
        </section>
      </div>
    </div>
  );
}
