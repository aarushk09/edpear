
"use client";

import { Pilcrow, ArrowDown, ArrowUp, GripVertical, Plus, Save } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { SentenceTile, SentenceConstructorProps } from "./sentence-constructor.types.js";

const DEFAULT_ITEMS: SentenceTile[] = [
  {
    "id": "s1",
    "title": "First",
    "detail": "drag starter",
    "tag": "capitalized"
  },
  {
    "id": "s2",
    "title": "the learner",
    "detail": "subject chunk",
    "tag": "subject"
  },
  {
    "id": "s3",
    "title": "checks the evidence.",
    "detail": "verb phrase",
    "tag": "predicate"
  }
];

function createId() {
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const SentenceConstructor = forwardRef<HTMLDivElement, SentenceConstructorProps>((props, ref) => {
  const {
    title = "Sentence Constructor",
    subtitle = "Word-tile practice surface for assembling grammatically correct sentence order.",
    tiles = DEFAULT_ITEMS,
    primaryActionLabel = "Save sequence",
    disabled = false,
    onSaveTiles,
    className,
    ...rest
  } = props;

  const [items, setItems] = useState(tiles);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDetail, setDraftDetail] = useState("");

  const moveItem = (index: number, direction: number) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    const next = [...items];
    const entry = next[index];
    if (!entry) return;
    next.splice(index, 1);
    next.splice(nextIndex, 0, entry);
    setItems(next);
  };

  const addItem = () => {
    if (!draftTitle.trim() || disabled) return;
    setItems((prev) => [
      ...prev,
      { id: createId(), title: draftTitle.trim(), detail: draftDetail.trim() || "New draft item", tag: "draft" },
    ]);
    setDraftTitle("");
    setDraftDetail("");
  };

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="sentence-constructor"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Pilcrow className="h-5 w-5" />
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground break-words">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-muted/20 p-4">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
              <input
                value={draftTitle}
                disabled={disabled}
                onChange={(event) => setDraftTitle(event.target.value)}
                placeholder="Add a new item title"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <input
                value={draftDetail}
                disabled={disabled}
                onChange={(event) => setDraftDetail(event.target.value)}
                placeholder="Add a supporting detail"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                disabled={disabled || !draftTitle.trim()}
                onClick={addItem}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Add
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="rounded-2xl border border-border bg-background p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-1 gap-3 min-w-0">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold break-words">{item.title}</p>
                        {item.tag ? <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{item.tag}</span> : null}
                      </div>
                      <p className="text-sm text-muted-foreground break-words">{item.detail}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" disabled={disabled || index === 0} onClick={() => moveItem(index, -1)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-background transition hover:bg-muted/20 disabled:opacity-40"><ArrowUp className="h-4 w-4" /></button>
                    <button type="button" disabled={disabled || index === items.length - 1} onClick={() => moveItem(index, 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-background transition hover:bg-muted/20 disabled:opacity-40"><ArrowDown className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-muted/10 p-4 sm:p-5 min-w-0">
          <div className="space-y-3">
            <h4 className="text-base font-semibold tracking-tight">Preview sequence</h4>
            <p className="text-sm text-muted-foreground break-words">Use the ordered list below to sense-check pacing, tagging, and flow before saving.</p>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-border bg-background px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Step {index + 1}</p>
                  <p className="mt-1 text-sm font-semibold break-words">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground break-words">{item.detail}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSaveTiles?.(items)}
              className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="mr-1.5 h-4 w-4" />
              {primaryActionLabel}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
});

SentenceConstructor.displayName = "SentenceConstructor";
