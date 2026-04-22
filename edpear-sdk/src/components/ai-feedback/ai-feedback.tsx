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
        className={cn("space-y-5 rounded-xl bg-muted/30 p-6 text-card-foreground", className)}
        data-slot="ai-feedback"
        {...props}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-foreground/50" />
            <span>AI feedback</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Generate constructive, next-step-focused feedback for a learner response.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
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
          <div className="space-y-2 rounded-xl bg-muted/40 p-4">
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        ) : null}
        {error ? (
          <div className="rounded-xl bg-feedback-incorrect/12 p-4 text-sm text-feedback-incorrect">
            {error}
          </div>
        ) : null}
        {feedback ? (
          <div className="rounded-xl bg-muted/40 p-4 text-sm leading-7 text-foreground/95">
            {feedback}
          </div>
        ) : null}
      </div>
    );
  },
);

AIFeedback.displayName = "AIFeedback";
