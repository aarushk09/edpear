import type { HTMLAttributes } from "react";

/**
 * Props for the AIFeedback component.
 */
export interface AIFeedbackProps extends HTMLAttributes<HTMLDivElement> {
  /** Student response to evaluate. */
  studentAnswer: string;
  /** Reference answer used to anchor feedback. */
  correctAnswer: string;
  /** OpenRouter API key. */
  apiKey: string;
  /** Optional model override. */
  model?: string;
  /** Additional prompt context for grading style or tone. */
  rubricFocus?: string;
  /** Callback fired when the feedback is returned. */
  onResponse?: (feedback: string) => void;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
