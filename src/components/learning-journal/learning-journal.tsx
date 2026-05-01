"use client";

import {
  AlertTriangle,
  CheckCircle2,
  NotebookPen,
  Sparkles,
  Trash2,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { forwardRef, useId, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type {
  LearningJournalEntry,
  LearningJournalMood,
  LearningJournalProps,
} from "./learning-journal.types.js";

const MOOD_OPTIONS: Array<{
  value: LearningJournalMood;
  label: string;
  description: string;
  icon: React.ElementType;
  accentClass: string;
  chipClass: string;
}> = [
  {
    value: "energized",
    label: "Energized",
    description: "Momentum is high and ideas are clicking.",
    icon: Zap,
    accentClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    chipClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    value: "steady",
    label: "Steady",
    description: "Work is moving forward without much friction.",
    icon: CheckCircle2,
    accentClass: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    chipClass: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    value: "stuck",
    label: "Stuck",
    description: "A concept or task needs clarification.",
    icon: TriangleAlert,
    accentClass: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    chipClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  {
    value: "overwhelmed",
    label: "Overwhelmed",
    description: "The workload feels heavy and needs triage.",
    icon: AlertTriangle,
    accentClass: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    chipClass: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  {
    value: "proud",
    label: "Proud",
    description: "A breakthrough or meaningful win happened today.",
    icon: Sparkles,
    accentClass: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    chipClass: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
];

function textToList(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function getMoodMeta(mood: LearningJournalMood) {
  return MOOD_OPTIONS.find((option) => option.value === mood) ?? MOOD_OPTIONS[1];
}

function createEntryId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `journal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const LearningJournal = forwardRef<HTMLDivElement, LearningJournalProps>((props, ref) => {
  const {
    title = "Learning Journal",
    subtitle = "Capture what clicked, what blocked you, and what needs a follow-up before the next study session.",
    currentDateLabel = "Today",
    prompt = "What is one thing you want future-you to remember from this session?",
    entries = [],
    onSaveEntry,
    onDeleteEntry,
    prompts,
    disabled = false,
    allowDelete = true,
    maxVisibleEntries = 4,
    initialMood = "steady",
    saveLabel = "Save reflection",
    className,
    ...rest
  } = props;

  const [selectedMood, setSelectedMood] = useState<LearningJournalMood>(initialMood);
  const [winsText, setWinsText] = useState("");
  const [blockersText, setBlockersText] = useState("");
  const [reflectionText, setReflectionText] = useState("");
  const moodHeadingId = useId();

  const wins = useMemo(() => textToList(winsText), [winsText]);
  const blockers = useMemo(() => textToList(blockersText), [blockersText]);
  const trimmedReflection = reflectionText.trim();
  const canSave = !disabled && (wins.length > 0 || blockers.length > 0 || trimmedReflection.length > 0);
  const visibleEntries = entries.slice(0, maxVisibleEntries);
  const selectedMoodMeta = getMoodMeta(selectedMood);

  const handleSave = () => {
    if (!canSave) return;

    const entry: LearningJournalEntry = {
      id: createEntryId(),
      dateLabel: currentDateLabel,
      mood: selectedMood,
      wins,
      blockers,
      reflection: trimmedReflection || undefined,
    };

    onSaveEntry?.(entry);
    setWinsText("");
    setBlockersText("");
    setReflectionText("");
    setSelectedMood(initialMood);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border bg-card text-card-foreground shadow-sm",
        className,
      )}
      data-slot="learning-journal"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <NotebookPen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/20 px-3 py-2 text-sm">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Session
            </p>
            <p className="mt-1 font-medium">{currentDateLabel}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)]">
        <div className="space-y-6">
          <section className="space-y-3" aria-labelledby={moodHeadingId}>
            <div className="space-y-1">
              <h4 id={moodHeadingId} className="text-sm font-semibold">
                How did the session feel?
              </h4>
              <p className="text-sm text-muted-foreground">
                A quick emotional read helps coaches and learners spot patterns before they become obstacles.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
              {MOOD_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = option.value === selectedMood;

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSelectedMood(option.value)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition",
                      isSelected
                        ? option.accentClass
                        : "border-border bg-background hover:bg-muted/30",
                      disabled && "cursor-not-allowed opacity-60",
                    )}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          isSelected ? "bg-background/70" : "bg-muted/60 text-muted-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{option.label}</p>
                        <p className="text-xs leading-relaxed text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 2xl:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold">
                {prompts?.winsLabel ?? "Wins and breakthroughs"}
              </span>
              <textarea
                value={winsText}
                disabled={disabled}
                onChange={(event) => setWinsText(event.target.value)}
                placeholder={
                  prompts?.winsPlaceholder ??
                  "Finished the practice set\nFinally understood stoichiometry ratios"
                }
                className="min-h-[140px] w-full rounded-xl border border-input bg-background px-3 py-3 text-sm leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span className="text-xs text-muted-foreground">
                One item per line keeps the journal easy to scan later.
              </span>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold">
                {prompts?.blockersLabel ?? "Blockers and confusion"}
              </span>
              <textarea
                value={blockersText}
                disabled={disabled}
                onChange={(event) => setBlockersText(event.target.value)}
                placeholder={
                  prompts?.blockersPlaceholder ??
                  "Mixed up independent and dependent variables\nNeed a better note-taking workflow"
                }
                className="min-h-[140px] w-full rounded-xl border border-input bg-background px-3 py-3 text-sm leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span className="text-xs text-muted-foreground">
                Capture friction early so it can shape the next support step.
              </span>
            </label>
          </section>

          <label className="block space-y-2">
            <span className="text-sm font-semibold">
              {prompts?.reflectionLabel ?? "Note to future-you"}
            </span>
            <p className="text-sm text-muted-foreground">{prompt}</p>
            <textarea
              value={reflectionText}
              disabled={disabled}
              onChange={(event) => setReflectionText(event.target.value)}
              placeholder={
                prompts?.reflectionPlaceholder ??
                "Before the next session, review the worked example and retry question 4 without hints."
              }
              className="min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-3 text-sm leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", selectedMoodMeta.chipClass)}>
                {selectedMoodMeta.label}
              </span>
              <span className="text-muted-foreground">
                {wins.length} win{wins.length === 1 ? "" : "s"} and {blockers.length} blocker{blockers.length === 1 ? "" : "s"} captured
              </span>
            </div>

            <button
              type="button"
              disabled={!canSave}
              onClick={handleSave}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saveLabel}
            </button>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-border bg-muted/10 p-4 sm:p-5">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Recent reflections</h4>
            <p className="text-sm text-muted-foreground">
              Recent entries stay visible so mentors can coach from evidence, not guesswork.
            </p>
          </div>

          {visibleEntries.length > 0 ? (
            <div className="space-y-3">
              {visibleEntries.map((entry) => {
                const meta = getMoodMeta(entry.mood);
                const Icon = meta.icon;

                return (
                  <article key={entry.id} className="rounded-xl border border-border bg-background p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", meta.chipClass)}>
                            {meta.label}
                          </span>
                          <span className="text-xs text-muted-foreground">{entry.dateLabel}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          Reflection snapshot
                        </div>
                      </div>

                      {allowDelete && onDeleteEntry ? (
                        <button
                          type="button"
                          onClick={() => onDeleteEntry(entry.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          aria-label={`Delete journal entry from ${entry.dateLabel}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      ) : null}
                    </div>

                    <div className="mt-3 space-y-3 text-sm">
                      {entry.wins.length > 0 ? (
                        <div>
                          <p className="mb-1 font-medium text-foreground">Wins</p>
                          <ul className="space-y-1 text-muted-foreground">
                            {entry.wins.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span aria-hidden>-</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {entry.blockers.length > 0 ? (
                        <div>
                          <p className="mb-1 font-medium text-foreground">Blockers</p>
                          <ul className="space-y-1 text-muted-foreground">
                            {entry.blockers.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span aria-hidden>-</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {entry.reflection ? (
                        <div>
                          <p className="mb-1 font-medium text-foreground">Next step</p>
                          <p className="leading-relaxed text-muted-foreground">{entry.reflection}</p>
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-background px-4 py-6 text-center">
              <NotebookPen className="mx-auto h-5 w-5 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">No reflections saved yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The first entry creates a visible history of wins, blockers, and confidence over time.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
});

LearningJournal.displayName = "LearningJournal";
