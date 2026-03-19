import type { HTMLAttributes } from "react";

export interface AIQuizGeneratorQuestion {
  /** Stable display id. */
  id: string;
  /** Question stem. */
  question: string;
  /** Question type. */
  type: "multiple-choice" | "true-false" | "short-answer";
  /** Optional answer choices. */
  choices?: string[];
  /** Expected answer. */
  answer: string;
}

/**
 * Props for the AIQuizGenerator component.
 */
export interface AIQuizGeneratorProps extends HTMLAttributes<HTMLDivElement> {
  /** Topic or learning objective to generate questions for. */
  topic?: string;
  /** Source passage or notes used as grounding material. */
  sourceText?: string;
  /** Number of questions to request. */
  count?: number;
  /** Optional model override. */
  model?: string;
  /** OpenRouter API key. */
  apiKey: string;
  /** Callback fired after quiz questions are generated. */
  onResponse?: (questions: AIQuizGeneratorQuestion[]) => void;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
