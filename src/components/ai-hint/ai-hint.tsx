import { Lightbulb } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import { openRouterText } from "../../lib/openrouter.js";
import type { AIHintProps } from "./ai-hint.types.js";

export const AIHint = forwardRef<HTMLDivElement, AIHintProps>(
  ({ prompt, studentAttempt, apiKey, model, onResponse, className, ...props }, ref) => {
    const [loading, setLoading] = useState(false);
    const [hint, setHint] = useState("");
    const [error, setError] = useState("");

    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-3xl border bg-card p-5 text-card-foreground shadow-sm", className)}
        data-slot="ai-hint"
        {...props}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-lesson">
            <Lightbulb className="h-4 w-4" />
            <span>AI hint</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Get a Socratic nudge without giving away the answer.
          </p>
        </div>
        <button
          className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          disabled={loading || !prompt.trim()}
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
                      "You are an edtech tutor. Give one short Socratic hint that nudges the learner forward without revealing the final answer.",
                  },
                  {
                    role: "user",
                    content: [
                      `Problem: ${prompt}`,
                      studentAttempt ? `Student attempt: ${studentAttempt}` : "",
                      "Respond with 2 or fewer sentences.",
                    ]
                      .filter(Boolean)
                      .join("\n"),
                  },
                ],
              });
              setHint(result.content);
              onResponse?.(result.content);
            } catch (caughtError) {
              setError(caughtError instanceof Error ? caughtError.message : "Unable to generate a hint.");
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Thinking..." : "Reveal a hint"}
        </button>
        {loading ? (
          <div className="space-y-2 rounded-2xl border bg-background p-4">
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>
        ) : null}
        {error ? (
          <div className="rounded-2xl border border-feedback-incorrect/30 bg-feedback-incorrect/10 p-4 text-sm text-feedback-incorrect">
            {error}
          </div>
        ) : null}
        {hint ? <div className="rounded-2xl border bg-background p-4 text-sm leading-6">{hint}</div> : null}
      </div>
    );
  },
);

AIHint.displayName = "AIHint";
