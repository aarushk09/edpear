"use client";

import { diffLines } from "diff";

import { cn } from "../../lib/cn.js";
import type { DiffViewerProps } from "./diff-viewer.types.js";

export function DiffViewer({
  before,
  after,
  beforeLabel = "Expected",
  afterLabel = "Submitted",
  mode = "inline",
  className,
}: DiffViewerProps) {
  const parts = diffLines(before, after);

  if (mode === "inline") {
    return (
      <div
        className={cn("overflow-hidden rounded-xl border bg-card text-sm shadow-sm", className)}
        data-slot="diff-viewer"
        data-mode="inline"
      >
        <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground">
          Inline diff
        </div>
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-all p-4 font-mono leading-relaxed">
          {parts.map((part, i) => {
            if (part.added) {
              return (
                <span key={i} className="bg-feedback-correct/25 text-feedback-correct">
                  {part.value}
                </span>
              );
            }
            if (part.removed) {
              return (
                <span key={i} className="bg-feedback-incorrect/25 text-feedback-incorrect line-through">
                  {part.value}
                </span>
              );
            }
            return <span key={i}>{part.value}</span>;
          })}
        </pre>
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden rounded-xl border bg-card text-sm shadow-sm", className)}
      data-slot="diff-viewer"
      data-mode="side-by-side"
    >
      <div className="grid grid-cols-2 border-b border-border bg-muted/40 text-xs font-medium text-muted-foreground">
        <div className="border-r border-border px-4 py-2">{beforeLabel}</div>
        <div className="px-4 py-2">{afterLabel}</div>
      </div>
      <div className="grid max-h-96 grid-cols-2 divide-x divide-border">
        <pre className="overflow-auto whitespace-pre-wrap break-all p-4 font-mono">
          {parts.map((part, i) =>
            part.added ? null : (
              <span
                key={i}
                className={cn(part.removed && "bg-feedback-incorrect/20 text-feedback-incorrect")}
              >
                {part.value}
              </span>
            ),
          )}
        </pre>
        <pre className="overflow-auto whitespace-pre-wrap break-all p-4 font-mono">
          {parts.map((part, i) =>
            part.removed ? null : (
              <span
                key={i}
                className={cn(part.added && "bg-feedback-correct/20 text-feedback-correct")}
              >
                {part.value}
              </span>
            ),
          )}
        </pre>
      </div>
    </div>
  );
}
