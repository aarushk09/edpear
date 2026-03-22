import type { HTMLAttributes } from "react";

/**
 * Props for the ScoreDisplay component.
 */
export interface ScoreDisplayProps extends HTMLAttributes<HTMLDivElement> {
  /** Earned score value. */
  score: number;
  /** Maximum possible score. */
  maxScore: number;
  /** Passing score threshold. */
  passingScore?: number;
  /** Whether to animate the score reveal. */
  animated?: boolean;
  /** Duration of the reveal animation in milliseconds. */
  revealDuration?: number;
  /** Whether to display a letter grade pill. */
  showGrade?: boolean;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
