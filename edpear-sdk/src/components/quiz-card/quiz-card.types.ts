import type { ButtonHTMLAttributes } from "react";

export interface QuizCardSubmitResult {
  /** Learner answer captured by the component. */
  value: string;
  /** Whether the answer matched the expected correct answer. */
  correct: boolean;
}

interface QuizCardBaseProps {
  /** Question stem shown at the top of the card. */
  question: string;
  /** Optional helper text or context shown under the question. */
  description?: string;
  /** Expected answer used to determine correctness. */
  correctAnswer: string;
  /** Optional explanation shown after submission. */
  explanation?: string;
  /** Submit button label. */
  submitLabel?: string;
  /** Disables interaction. */
  disabled?: boolean;
  /** Additional classes merged onto the root element. */
  className?: string;
  /** Callback fired after the learner submits an answer. */
  onSubmit?: (result: QuizCardSubmitResult) => void;
  /** Optional props applied to the submit button. */
  submitButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * Props for multiple-choice and true/false variants.
 */
export interface QuizChoiceCardProps extends QuizCardBaseProps {
  /** Quiz interaction style. */
  variant?: "multiple-choice" | "true-false";
  /** Selectable answer options. */
  choices?: string[];
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled selected value. */
  defaultValue?: string;
  /** Called whenever the selected value changes. */
  onValueChange?: (value: string) => void;
}

/**
 * Props for the short-answer variant.
 */
export interface QuizShortAnswerCardProps extends QuizCardBaseProps {
  /** Quiz interaction style. */
  variant: "short-answer";
  /** Controlled answer value. */
  value?: string;
  /** Uncontrolled answer value. */
  defaultValue?: string;
  /** Called whenever the answer changes. */
  onValueChange?: (value: string) => void;
  /** Input placeholder for short-answer responses. */
  placeholder?: string;
}

/**
 * Union of all supported QuizCard props.
 */
export type QuizCardProps = QuizChoiceCardProps | QuizShortAnswerCardProps;
