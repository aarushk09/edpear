"use client";

import { GripVertical, Layers, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { QuestionBankItemType, QuestionBankProps } from "./question-bank.types.js";

const TYPES: QuestionBankItemType[] = ["mcq", "short-answer", "true-false", "essay"];
const DIFFS = ["easy", "medium", "hard"] as const;

export function QuestionBank({
  questions,
  selectedIds: controlledIds,
  onSelectionChange,
  onAddToQuiz,
  className,
}: QuestionBankProps) {
  const [internal, setInternal] = useState<string[]>([]);
  const selected = controlledIds ?? internal;
  const setSelected = (next: string[]) => {
    if (controlledIds === undefined) setInternal(next);
    onSelectionChange?.(next);
  };

  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [type, setType] = useState<string>("");

  const topics = useMemo(
    () => [...new Set(questions.map((x) => x.topic))].sort(),
    [questions],
  );

  const filtered = useMemo(() => {
    return questions.filter((item) => {
      if (q && !item.prompt.toLowerCase().includes(q.toLowerCase())) return false;
      if (topic && item.topic !== topic) return false;
      if (difficulty && item.difficulty !== difficulty) return false;
      if (type && item.type !== type) return false;
      return true;
    });
  }, [questions, q, topic, difficulty, type]);

  const toggle = (id: string) => {
    setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  const addDragPayload = "edpear-question-ids";

  return (
    <div
      className={cn("grid gap-4 rounded-xl border bg-card text-card-foreground shadow-sm lg:grid-cols-[1fr_220px]", className)}
      data-slot="question-bank"
    >
      <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="min-w-[160px] flex-1 space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Search</span>
            <span className="relative block">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm"
                placeholder="Filter by text…"
              />
            </span>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Topic</span>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-9 w-full min-w-[140px] rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">All</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">All</option>
              {DIFFS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">All</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ul className="max-h-[340px] space-y-2 overflow-y-auto pr-1">
          {filtered.map((item) => (
            <li
              key={item.id}
              draggable
              onDragStart={(e) => {
                const ids = selected.includes(item.id) ? selected : [item.id];
                e.dataTransfer.setData(addDragPayload, JSON.stringify(ids));
                e.dataTransfer.effectAllowed = "copy";
              }}
              className="flex gap-2 rounded-lg border border-border bg-muted/20 p-3 text-sm"
            >
              <GripVertical className="mt-0.5 h-4 w-4 shrink-0 cursor-grab text-muted-foreground" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-snug">{item.prompt}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.topic} · {item.difficulty} · {item.type}
                </p>
              </div>
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-border"
                checked={selected.includes(item.id)}
                onChange={() => toggle(item.id)}
                aria-label={`Select question ${item.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quiz builder</p>
        <div
          className="mt-2 flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/10 p-4 text-center text-sm text-muted-foreground"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const raw = e.dataTransfer.getData(addDragPayload);
            if (!raw) return;
            try {
              const ids = JSON.parse(raw) as string[];
              onAddToQuiz?.(ids);
            } catch {
              /* ignore */
            }
          }}
        >
          <Layers className="mb-2 h-8 w-8 opacity-50" aria-hidden />
          Drop selected questions here
        </div>
        <button
          type="button"
          className="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          disabled={selected.length === 0}
          onClick={() => onAddToQuiz?.(selected)}
        >
          Add {selected.length} to quiz
        </button>
      </div>
    </div>
  );
}
