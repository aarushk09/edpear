import { Sparkles } from "lucide-react";
import { forwardRef, useState } from "react";
import { z } from "zod";

import { cn } from "../../lib/cn.js";
import { openRouterText } from "../../lib/openrouter.js";
import type {
  AIQuizGeneratorProps,
  AIQuizGeneratorQuestion,
} from "./ai-quiz-generator.types.js";

const quizSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      type: z.enum(["multiple-choice", "true-false", "short-answer"]),
      choices: z.array(z.string()).optional(),
      answer: z.string(),
    }),
  ),
});

export const AIQuizGenerator = forwardRef<HTMLDivElement, AIQuizGeneratorProps>(
  ({ topic, sourceText, count = 3, model, apiKey, onResponse, className, ...props }, ref) => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<AIQuizGeneratorQuestion[]>([]);
    const [error, setError] = useState("");

    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
        data-slot="ai-quiz-generator"
        {...props}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>AI quiz generator</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Turn a topic or passage into ready-to-use assessment prompts.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          disabled={loading || (!topic?.trim() && !sourceText?.trim())}
          type="button"
          onClick={async () => {
            setLoading(true);
            setError("");
            try {
              const result = await openRouterText({
                apiKey,
                model,
                responseFormat: { type: "json_object" },
                messages: [
                  {
                    role: "system",
                    content:
                      "You are an edtech assessment author. Generate grounded quiz questions only from the provided material and respond as JSON.",
                  },
                  {
                    role: "user",
                    content: [
                      `Topic: ${topic ?? "Untitled topic"}`,
                      sourceText ? `Source text: ${sourceText}` : "",
                      `Generate ${count} questions.`,
                      'Return JSON with shape: {"questions":[{"id":"q1","question":"...","type":"multiple-choice","choices":["A","B","C","D"],"answer":"..."}]}',
                    ]
                      .filter(Boolean)
                      .join("\n"),
                  },
                ],
              });
              const parsed = quizSchema.parse(JSON.parse(result.content));
              setQuestions(parsed.questions);
              onResponse?.(parsed.questions);
            } catch (caughtError) {
              setError(
                caughtError instanceof Error ? caughtError.message : "Unable to generate quiz questions.",
              );
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Generating questions..." : "Generate quiz"}
        </button>
        {loading ? (
          <div className="space-y-3 rounded-md border bg-muted/50 p-4">
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-16 animate-pulse rounded bg-muted" />
            <div className="h-16 animate-pulse rounded bg-muted" />
          </div>
        ) : null}
        {error ? (
          <div className="rounded-2xl border border-feedback-incorrect/30 bg-feedback-incorrect/10 p-4 text-sm text-feedback-incorrect">
            {error}
          </div>
        ) : null}
        {questions.length ? (
          <div className="space-y-3">
            {questions.map((question) => (
              <div key={question.id} className="rounded-md border bg-muted/50 p-4 text-sm transition-colors hover:bg-muted/80">
                <p className="font-medium">{question.question}</p>
                {question.choices?.length ? (
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {question.choices.map((choice) => (
                      <li key={choice}>• {choice}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-3 text-sm">
                  <span className="font-medium">Answer:</span> {question.answer}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

AIQuizGenerator.displayName = "AIQuizGenerator";
