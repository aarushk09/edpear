import type { HTMLAttributes } from "react";

/**
 * Props for the AIHint component.
 */
export interface AIHintProps extends HTMLAttributes<HTMLDivElement> {
  /** Problem or prompt the learner is working on. */
  prompt: string;
  /** Optional student work so far. */
  studentAttempt?: string;
  /** OpenRouter API key. */
  apiKey: string;
  /** Optional model override. */
  model?: string;
  /** Callback fired when a hint is returned. */
  onResponse?: (hint: string) => void;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
