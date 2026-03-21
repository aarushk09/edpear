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
        "rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        submitted && isCorrect && "border-feedback-correct/50 bg-feedback-correct/5",
        submitted && isCorrect === false && "border-feedback-incorrect/50 bg-feedback-incorrect/5",
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
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            {getChoiceSet(props).map((choice, index) => {
              const selected = currentValue === choice;
              const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
              const label = labels[index] ?? '';
              
              return (
                <label
                  key={choice}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-lg border p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    selected && "border-primary bg-primary/5",
                    props.disabled && "cursor-not-allowed opacity-50",
                  )}
                  data-state={selected ? "checked" : "unchecked"}
                >
                  <input
                    checked={selected}
                    className="sr-only"
                    disabled={props.disabled}
                    name={id}
                    type="radio"
                    value={choice}
                    onChange={() => setValue(choice)}
                  />
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded border bg-background text-sm font-bold transition-colors",
                    selected ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}>
                    {label}
                  </div>
                  <span className="leading-snug">{choice}</span>
                </label>
              );
            })}
          </fieldset>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
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
          <div className="rounded-md bg-muted p-4 text-sm">
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
