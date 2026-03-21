import type { HTMLAttributes } from "react";

export interface LessonProgressStep {
  /** Stable step identifier. */
  id: string;
  /** Short step label shown in the UI. */
  label: string;
  /** Optional helper text under the label. */
  description?: string;
}

/**
 * Props for the LessonProgress component.
 */
export interface LessonProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Ordered list of lesson steps. */
  steps: LessonProgressStep[];
  /** Zero-based index of the active step. */
  currentStep?: number;
  /** Whether labels should be visible under the step indicators. */
  showLabels?: boolean;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
