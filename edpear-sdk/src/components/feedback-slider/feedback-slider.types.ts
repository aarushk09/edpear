export type FeedbackVariant = "emoji" | "stars" | "nps";

export type FeedbackPayload = {
  variant: FeedbackVariant;
  /** Stars: 1–5, NPS: 0–10, Emoji: 1–5 index */
  rating: number;
  comment?: string;
};

export type FeedbackSliderProps = {
  variant?: FeedbackVariant;
  showComment?: boolean;
  title?: string;
  onSubmit: (payload: FeedbackPayload) => void;
  className?: string;
};
