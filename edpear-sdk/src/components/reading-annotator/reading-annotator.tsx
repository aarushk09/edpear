"use client";

import { Highlighter, StickyNote } from "lucide-react";
import { useCallback, useId, useMemo, useRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { ReadingAnnotatorProps, ReadingHighlight } from "./reading-annotator.types.js";

const PALETTE = ["#fde68a", "#bfdbfe", "#bbf7d0", "#fecaca", "#e9d5ff"];

function sortHighlights(h: ReadingHighlight[]): ReadingHighlight[] {
  return [...h].sort((a, b) => a.start - b.start || a.end - b.end);
}

function buildSegments(
  text: string,
  highlights: ReadingHighlight[],
): { text: string; highlight?: ReadingHighlight }[] {
  const sorted = sortHighlights(highlights);
  const out: { text: string; highlight?: ReadingHighlight }[] = [];
  let cursor = 0;
  for (const h of sorted) {
    const s = Math.max(0, Math.min(h.start, text.length));
    const e = Math.max(s, Math.min(h.end, text.length));
    if (s > cursor) out.push({ text: text.slice(cursor, s) });
    if (e > s) out.push({ text: text.slice(s, e), highlight: h });
    cursor = Math.max(cursor, e);
  }
  if (cursor < text.length) out.push({ text: text.slice(cursor) });
  return out;
}

export function ReadingAnnotator({
  text,
  highlights,
  onAnnotationsChange,
  className,
}: ReadingAnnotatorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const noteId = useId();
  const [selected, setSelected] = useState<{ start: number; end: number } | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");

  const segments = useMemo(() => buildSegments(text, highlights), [text, highlights]);

  const getOffsets = useCallback((): { start: number; end: number } | null => {
    const root = rootRef.current;
    const sel = window.getSelection();
    if (!root || !sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
    const range = sel.getRangeAt(0);
    if (!root.contains(range.commonAncestorContainer)) return null;

    const pre = range.cloneRange();
    pre.selectNodeContents(root);
    pre.setEnd(range.startContainer, range.startOffset);
    const start = pre.toString().length;
    const end = start + range.toString().length;
    if (end <= start) return null;
    return { start, end };
  }, []);

  const pushHighlight = (start: number, end: number) => {
    const id = `hl-${Date.now()}`;
    const color = PALETTE[highlights.length % PALETTE.length];
    const next = [...highlights, { id, start, end, color }];
    onAnnotationsChange?.({ highlights: next });
    setSelected(null);
    setActiveId(id);
    setDraftNote("");
    window.getSelection()?.removeAllRanges();
  };

  const updateNote = (id: string, note: string) => {
    const next = highlights.map((h) => (h.id === id ? { ...h, note } : h));
    onAnnotationsChange?.({ highlights: next });
  };

  const active = highlights.find((h) => h.id === activeId);

  return (
    <div
      className={cn(
        "grid gap-6 rounded-xl border bg-card text-card-foreground shadow-sm lg:grid-cols-[1fr_280px]",
        className,
      )}
      data-slot="reading-annotator"
    >
      <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Reading
          </p>
          {selected ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
              onClick={() => pushHighlight(selected.start, selected.end)}
            >
              <Highlighter className="h-3.5 w-3.5" />
              Save highlight
            </button>
          ) : (
            <span className="text-xs text-muted-foreground">Select text to highlight</span>
          )}
        </div>
        <div
          ref={rootRef}
          className="max-w-none text-sm text-foreground selection:bg-primary/25"
          onMouseUp={() => {
            const off = getOffsets();
            setSelected(off && off.end > off.start ? off : null);
          }}
        >
          <p className="whitespace-pre-wrap leading-relaxed">
            {segments.map((seg, i) =>
              seg.highlight ? (
                <mark
                  key={`${seg.highlight.id}-${i}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setActiveId(seg.highlight!.id);
                    setDraftNote(seg.highlight!.note ?? "");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(seg.highlight!.id);
                      setDraftNote(seg.highlight!.note ?? "");
                    }
                  }}
                  className={cn(
                    "cursor-pointer rounded-sm px-0.5 ring-offset-background transition hover:ring-2 hover:ring-ring",
                    !seg.highlight.color && "bg-yellow-200/80 dark:bg-yellow-900/40",
                  )}
                  style={
                    seg.highlight.color
                      ? { backgroundColor: `${seg.highlight.color}aa` }
                      : undefined
                  }
                >
                  {seg.text}
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </p>
        </div>
      </div>
      <aside className="flex flex-col p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <StickyNote className="h-4 w-4 text-muted-foreground" />
          Margin notes
        </div>
        {active ? (
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-xs text-muted-foreground">
              On: “{text.slice(active.start, Math.min(active.end, active.start + 80))}
              {active.end - active.start > 80 ? "…" : ""}”
            </p>
            <label htmlFor={noteId} className="sr-only">
              Note for highlight
            </label>
            <textarea
              id={noteId}
              className="min-h-[120px] flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Add a margin note…"
              value={draftNote}
              onChange={(e) => setDraftNote(e.target.value)}
              onBlur={() => updateNote(active.id, draftNote)}
            />
            <button
              type="button"
              className="text-xs text-muted-foreground underline"
              onClick={() => {
                const next = highlights.filter((h) => h.id !== active.id);
                onAnnotationsChange?.({ highlights: next });
                setActiveId(null);
                setDraftNote("");
              }}
            >
              Remove highlight
            </button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Click a highlight to edit its note.</p>
        )}
      </aside>
    </div>
  );
}
