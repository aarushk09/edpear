"use client";

import { Star } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { FeedbackPayload, FeedbackSliderProps, FeedbackVariant } from "./feedback-slider.types.js";

const EMOJI = ["😞", "😐", "🙂", "😊", "🤩"];

export function FeedbackSlider({
  variant = "stars",
  showComment = true,
  title = "How was this lesson?",
  onSubmit,
  className,
}: FeedbackSliderProps) {
  const id = useId();
  const [rating, setRating] = useState<number>(-1);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (v: FeedbackVariant, r: number) => {
    const payload: FeedbackPayload = { variant: v, rating: r, comment: comment.trim() || undefined };
    onSubmit(payload);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={cn("rounded-xl border border-feedback-correct/30 bg-feedback-correct/10 p-6 text-sm", className)}
        data-slot="feedback-slider"
        data-state="submitted"
      >
        Thanks—your feedback was recorded.
      </div>
    );
  }

  return (
    <div
      className={cn("rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
      data-slot="feedback-slider"
      data-variant={variant}
    >
      <h3 className="text-base font-semibold">{title}</h3>
      {variant === "emoji" ? (
        <div className="mt-4 flex justify-between gap-2">
          {EMOJI.map((e, i) => (
            <button
              key={e}
              type="button"
              className={cn(
                "flex-1 rounded-lg border py-3 text-2xl transition hover:bg-muted",
                rating === i + 1 && "border-primary ring-2 ring-ring",
              )}
              onClick={() => setRating(i + 1)}
              aria-label={`Rate ${i + 1} of 5`}
            >
              {e}
            </button>
          ))}
        </div>
      ) : null}
      {variant === "stars" ? (
        <div className="mt-4 flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              className="rounded-md p-1 text-amber-500 hover:scale-110"
              onClick={() => setRating(s)}
              aria-label={`${s} stars`}
            >
              <Star className={cn("h-8 w-8", s <= rating ? "fill-current" : "fill-none")} />
            </button>
          ))}
        </div>
      ) : null}
      {variant === "nps" ? (
        <div className="mt-4">
          <p className="mb-2 text-xs text-muted-foreground">0 = not likely · 10 = very likely</p>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 11 }, (_, n) => (
              <button
                key={n}
                type="button"
                className={cn(
                  "h-9 w-8 rounded-md border text-xs font-medium hover:bg-muted",
                  rating === n && "border-primary bg-primary/10",
                )}
                onClick={() => setRating(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {showComment ? (
        <label htmlFor={id} className="mt-4 block text-sm">
          <span className="text-muted-foreground">Anything else? (optional)</span>
          <textarea
            id={id}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 min-h-[72px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
      ) : null}
      <button
        type="button"
        disabled={rating < 0}
        className="mt-4 w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        onClick={() => submit(variant, rating)}
      >
        Submit feedback
      </button>
    </div>
  );
}
