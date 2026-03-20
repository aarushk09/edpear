"use client";

import { Check, ChevronDown, ChevronRight, GripVertical, Lock } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { SyllabusModule, SyllabusNavigatorProps } from "./syllabus-navigator.types.js";

type Row = SyllabusModule & { expanded: boolean };

function seedRows(modules: SyllabusModule[]): Row[] {
  return modules.map((m) => ({
    ...m,
    expanded: m.defaultExpanded !== false,
  }));
}

function mergeRows(next: SyllabusModule[], prev: Row[]): Row[] {
  return next.map((m) => {
    const p = prev.find((x) => x.id === m.id);
    return { ...m, expanded: p?.expanded ?? m.defaultExpanded !== false };
  });
}

export function SyllabusNavigator({
  modules: modulesProp,
  activeLessonId,
  onLessonSelect,
  reorderEnabled = false,
  onModulesReorder,
  className,
}: SyllabusNavigatorProps) {
  const moduleKey = useMemo(
    () => modulesProp.map((m) => m.id).join("\0"),
    [modulesProp],
  );

  const [rows, setRows] = useState<Row[]>(() => seedRows(modulesProp));
  const [dragId, setDragId] = useState<string | null>(null);

  useEffect(() => {
    setRows((prev) => mergeRows(modulesProp, prev));
  }, [moduleKey, modulesProp]);

  const toggleModule = (id: string) => {
    setRows((prev) =>
      prev.map((m) => (m.id === id ? { ...m, expanded: !m.expanded } : m)),
    );
  };

  const commitReorder = useCallback(
    (fromId: string, toId: string) => {
      if (fromId === toId) return;
      setRows((prev) => {
        const ids = prev.map((m) => m.id);
        const from = ids.indexOf(fromId);
        const to = ids.indexOf(toId);
        if (from < 0 || to < 0) return prev;
        const next = [...prev];
        const [row] = next.splice(from, 1);
        next.splice(to, 0, row);
        onModulesReorder?.(next.map((m) => m.id));
        return next;
      });
    },
    [onModulesReorder],
  );

  return (
    <nav
      className={cn(
        "w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm",
        className,
      )}
      aria-label="Course outline"
      data-slot="syllabus-navigator"
    >
      <div className="border-b border-border px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Course outline
        </p>
        <p className="text-sm font-medium text-foreground">Modules & lessons</p>
      </div>
      <ul className="divide-y divide-border p-2">
        {rows.map((mod) => (
          <li key={mod.id}>
            <div className="flex items-stretch gap-0.5 rounded-lg hover:bg-muted/50">
              {reorderEnabled ? (
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    setDragId(mod.id);
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/plain", mod.id);
                  }}
                  onDragEnd={() => setDragId(null)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const from = e.dataTransfer.getData("text/plain") || dragId;
                    if (from) commitReorder(from, mod.id);
                    setDragId(null);
                  }}
                  className="flex shrink-0 items-center rounded-md px-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Drag to reorder module ${mod.title}`}
                >
                  <GripVertical className="h-4 w-4" />
                </button>
              ) : null}
              <div className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2.5 text-left text-sm font-medium transition hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-expanded={mod.expanded}
                >
                  {mod.expanded ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="truncate">{mod.title}</span>
                  <span className="ml-auto shrink-0 text-xs font-normal text-muted-foreground">
                    {mod.lessons.filter((l) => l.completed).length}/{mod.lessons.length}
                  </span>
                </button>
                {mod.expanded ? (
                  <ul className="border-border pb-2 pl-4 pr-2" role="list">
                    {mod.lessons.map((lesson) => {
                      const active = lesson.id === activeLessonId;
                      const disabled = lesson.locked;
                      return (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            disabled={disabled}
                            onClick={() => !disabled && onLessonSelect?.(lesson.id)}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition",
                              active && "bg-primary/10 font-medium text-primary",
                              !active && !disabled && "hover:bg-muted",
                              disabled && "cursor-not-allowed opacity-50",
                            )}
                            data-state={lesson.completed ? "complete" : "incomplete"}
                            data-locked={disabled || undefined}
                          >
                            {lesson.completed ? (
                              <Check className="h-4 w-4 shrink-0 text-feedback-correct" aria-hidden />
                            ) : disabled ? (
                              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                            ) : (
                              <span className="h-4 w-4 shrink-0 rounded-full border border-border" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
