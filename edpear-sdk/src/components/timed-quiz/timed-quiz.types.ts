import type { QuizCardProps, QuizCardSubmitResult } from "../quiz-card/quiz-card.types.js";

/**
 * Props for the TimedQuiz component.
 */
export type TimedQuizProps = Omit<QuizCardProps, "onSubmit"> & {
  /** Countdown length in seconds. */
  duration: number;
  /** Starts the timer immediately on mount. */
  autoStart?: boolean;
  /** Callback fired when the timer reaches zero. */
  onTimeout?: (value: string) => void;
  /** Callback fired when the learner submits before timeout. */
  onSubmit?: (result: QuizCardSubmitResult & { timedOut: boolean }) => void;
};
