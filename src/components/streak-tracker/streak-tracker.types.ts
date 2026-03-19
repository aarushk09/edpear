import type { HTMLAttributes } from "react";

export interface StreakDay {
  /** Human-readable short label, usually a weekday abbreviation. */
  label: string;
  /** Marks whether the learner completed the day. */
  completed: boolean;
}

/**
 * Props for the StreakTracker component.
 */
export interface StreakTrackerProps extends HTMLAttributes<HTMLDivElement> {
  /** Current streak count in days. */
  streak: number;
  /** Optional streak goal displayed to the learner. */
  goal?: number;
  /** Optional 7-day completion history. */
  days?: StreakDay[];
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
