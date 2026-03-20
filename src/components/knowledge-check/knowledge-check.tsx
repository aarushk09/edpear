"use client";

import { CheckCircle2, Lock } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { KnowledgeCheckProps, KnowledgeCheckQuestion } from "./knowledge-check.types.js";

const MAX_Q = 3;

export function KnowledgeCheck({
  questions: questionsProp,
  title = "Quick check",
  onPass,
  children,
  className,
}: KnowledgeCheckProps) {
  const baseId = useId();
  const questions = questionsProp.slice(0, MAX_Q);
  const [choices, setChoices] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, null])),
  );
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  const allCorrect =
    questions.length > 0 &&
    questions.every((q, i) => choices[q.id] === q.correctIndex);

  const handleSubmit = () => {
    setSubmitted(true);
    if (allCorrect) {
      setPassed(true);
      onPass?.();
    }
  };

  const reset = () => {
    setChoices(Object.fromEntries(questions.map((q) => [q.id, null])));
    setSubmitted(false);
  };

  if (passed) {
    return (
      <div className={cn("space-y-4", className)} data-slot="knowledge-check" data-state="passed">
        <div className="flex items-center gap-2 rounded-lg border border-feedback-correct/40 bg-feedback-correct/10 px-4 py-3 text-sm font-medium text-feedback-correct">
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
          You may continue.
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="knowledge-check"
      data-state="gated"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <Lock className="h-4 w-4 text-muted-foreground" aria-hidden />
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs text-muted-foreground">Answer to continue</span>
      </div>
      <div className="space-y-6 p-4">
        {questions.map((q, qi) => (
          <QuestionBlock
            key={q.id}
            q={q}
            qi={qi}
            baseId={baseId}
            value={choices[q.id] ?? null}
            onChange={(idx) => setChoices((c) => ({ ...c, [q.id]: idx }))}
            submitted={submitted}
            wrong={submitted && choices[q.id] !== q.correctIndex}
          />
        ))}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handleSubmit}
          >
            Check answers
          </button>
          {submitted && !allCorrect ? (
            <button
              type="button"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              onClick={reset}
            >
              Try again
            </button>
          ) : null}
        </div>
        {submitted && !allCorrect ? (
          <p className="text-sm text-destructive">Not quite—review the lesson and try again.</p>
        ) : null}
      </div>
      {children ? (
        <div className="border-t border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
          <Lock className="mx-auto mb-2 h-5 w-5 opacity-50" aria-hidden />
          Complete the check above to unlock the next section.
        </div>
      ) : null}
    </div>
  );
}

function QuestionBlock({
  q,
  qi,
  baseId,
  value,
  onChange,
  submitted,
  wrong,
}: {
  q: KnowledgeCheckQuestion;
  qi: number;
  baseId: string;
  value: number | null;
  onChange: (i: number) => void;
  submitted: boolean;
  wrong: boolean;
}) {
  const name = `${baseId}-q-${q.id}`;
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">
        {qi + 1}. {q.prompt}
      </legend>
      <ul className="space-y-2">
        {q.options.map((opt, i) => {
          const id = `${name}-opt-${i}`;
          const selected = value === i;
          const isCorrect = i === q.correctIndex;
          const show = submitted && (selected || isCorrect);
          return (
            <li key={id}>
              <label
                htmlFor={id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition",
                  selected && !submitted && "border-primary bg-primary/5",
                  show && isCorrect && "border-feedback-correct/50 bg-feedback-correct/10",
                  show && selected && !isCorrect && "border-feedback-incorrect/50 bg-feedback-incorrect/10",
                  wrong && selected && !isCorrect && submitted && "ring-1 ring-destructive/30",
                )}
              >
                <input
                  id={id}
                  type="radio"
                  name={name}
                  className="h-4 w-4 border-border text-primary"
                  checked={selected}
                  onChange={() => onChange(i)}
                />
                <span>{opt}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
