import { Sparkles } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import { openRouterText } from "../../lib/openrouter.js";
import type { AIFeedbackProps } from "./ai-feedback.types.js";

export const AIFeedback = forwardRef<HTMLDivElement, AIFeedbackProps>(
  (
    { studentAnswer, correctAnswer, apiKey, model, rubricFocus, onResponse, className, ...props },
    ref,
  ) => {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");

    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-3xl border bg-card p-5 text-card-foreground shadow-sm", className)}
        data-slot="ai-feedback"
        {...props}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>AI feedback</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Generate constructive, next-step-focused feedback for a learner response.
          </p>
        </div>
        <button
          className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          disabled={loading || !studentAnswer.trim() || !correctAnswer.trim()}
          type="button"
          onClick={async () => {
            setLoading(true);
            setError("");
            try {
              const result = await openRouterText({
                apiKey,
                model,
                messages: [
                  {
                    role: "system",
                    content:
                      "You are a supportive edtech feedback coach. Give concise, actionable, growth-oriented feedback. Do not reveal hidden grading rubric language.",
                  },
                  {
                    role: "user",
                    content: [
                      `Student answer: ${studentAnswer}`,
                      `Correct answer: ${correctAnswer}`,
                      rubricFocus ? `Focus area: ${rubricFocus}` : "",
                      "Respond with 2 short paragraphs: what the learner did well, then what to improve next.",
                    ]
                      .filter(Boolean)
                      .join("\n"),
                  },
                ],
              });
              setFeedback(result.content);
              onResponse?.(result.content);
            } catch (caughtError) {
              setError(caughtError instanceof Error ? caughtError.message : "Unable to generate feedback.");
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Generating feedback..." : "Generate feedback"}
        </button>
        {loading ? (
          <div className="space-y-2 rounded-2xl border bg-background p-4">
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        ) : null}
        {error ? (
          <div className="rounded-2xl border border-feedback-incorrect/30 bg-feedback-incorrect/10 p-4 text-sm text-feedback-incorrect">
            {error}
          </div>
        ) : null}
        {feedback ? (
          <div className="rounded-2xl border bg-background p-4 text-sm leading-6">
            {feedback}
          </div>
        ) : null}
      </div>
    );
  },
);

AIFeedback.displayName = "AIFeedback";
