import { CheckCircle2, CircleHelp, XCircle } from "lucide-react";
import { forwardRef, useId, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { QuizCardProps, QuizChoiceCardProps, QuizShortAnswerCardProps } from "./quiz-card.types.js";

function isShortAnswer(props: QuizCardProps): props is QuizShortAnswerCardProps {
  return props.variant === "short-answer";
}

function getChoiceSet(props: QuizChoiceCardProps): string[] {
  if (props.variant === "true-false") {
    return ["True", "False"];
  }

  return props.choices ?? [];
}

export const QuizCard = forwardRef<HTMLDivElement, QuizCardProps>((props, ref) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(props.defaultValue ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentValue = props.value ?? internalValue;
  const normalizedAnswer = useMemo(
    () => props.correctAnswer.trim().toLowerCase(),
    [props.correctAnswer],
  );

  const setValue = (nextValue: string) => {
    if (props.value === undefined) {
      setInternalValue(nextValue);
    }
    props.onValueChange?.(nextValue);
    setSubmitted(false);
    setIsCorrect(null);
  };

  const handleSubmit = () => {
    const correct = currentValue.trim().toLowerCase() === normalizedAnswer;
    setSubmitted(true);
    setIsCorrect(correct);
    props.onSubmit?.({ value: currentValue, correct });
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border bg-card p-6 text-card-foreground shadow-sm",
        submitted && isCorrect && "border-feedback-correct/40",
        submitted && isCorrect === false && "border-feedback-incorrect/40",
        props.className,
      )}
      data-slot="quiz-card"
      data-state={!submitted ? "idle" : isCorrect ? "correct" : "incorrect"}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-quiz">
            <CircleHelp className="h-4 w-4" />
            <span>{props.variant ?? "multiple-choice"}</span>
          </div>
          <h3 className="text-xl font-semibold">{props.question}</h3>
          {props.description ? <p className="text-sm text-muted-foreground">{props.description}</p> : null}
        </div>

        {isShortAnswer(props) ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium">Your answer</span>
            <input
              aria-label="Short answer response"
              className={cn(
                "w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none ring-0 transition",
                "focus:border-primary focus-visible:ring-2 focus-visible:ring-ring",
              )}
              disabled={props.disabled}
              placeholder={props.placeholder ?? "Type your answer"}
              type="text"
              value={currentValue}
              onChange={(event) => setValue(event.target.value)}
            />
          </label>
        ) : (
          <fieldset className="space-y-3">
            <legend className="sr-only">{props.question}</legend>
            {getChoiceSet(props).map((choice) => {
              const selected = currentValue === choice;
              return (
                <label
                  key={choice}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors",
                    selected ? "border-primary bg-primary/5" : "bg-background hover:bg-muted/60",
                    props.disabled && "cursor-not-allowed opacity-60",
                  )}
                  data-state={selected ? "checked" : "unchecked"}
                >
                  <input
                    checked={selected}
                    className="h-4 w-4 accent-[hsl(var(--primary))]"
                    disabled={props.disabled}
                    name={id}
                    type="radio"
                    value={choice}
                    onChange={() => setValue(choice)}
                  />
                  <span>{choice}</span>
                </label>
              );
            })}
          </fieldset>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            className={cn(
              "inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition",
              "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
            disabled={props.disabled || !currentValue.trim()}
            type="button"
            onClick={handleSubmit}
            {...props.submitButtonProps}
          >
            {props.submitLabel ?? "Check answer"}
          </button>

          {submitted ? (
            <span
              aria-live="polite"
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
                isCorrect
                  ? "bg-feedback-correct text-primary-foreground"
                  : "bg-feedback-incorrect text-primary-foreground",
              )}
            >
              {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {isCorrect ? "Correct" : "Try again"}
            </span>
          ) : null}
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-muted/70 p-4 text-sm">
            <p className="font-medium">
              {isCorrect ? "Nice work." : `Correct answer: ${props.correctAnswer}`}
            </p>
            {props.explanation ? <p className="mt-1 text-muted-foreground">{props.explanation}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
});

QuizCard.displayName = "QuizCard";
