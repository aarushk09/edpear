import type { HTMLAttributes, ReactNode } from "react";

/**
 * Props for the BadgeAward component.
 */
export interface BadgeAwardProps extends HTMLAttributes<HTMLDivElement> {
  /** Title of the achievement. */
  title: string;
  /** Supporting explanation for why the badge was earned. */
  description?: string;
  /** Visual badge icon. */
  icon?: ReactNode;
  /** Whether the badge is currently unlocked. */
  unlocked?: boolean;
  /** Optional timestamp label for when the badge was earned. */
  earnedAt?: string;
  /** Enables the celebratory pulse animation. */
  animate?: boolean;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
