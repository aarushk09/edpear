import type { HTMLAttributes, ReactNode } from "react";

/**
 * Props for the FlashCard component.
 */
export interface FlashCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Front-side content. */
  front: ReactNode;
  /** Back-side content. */
  back: ReactNode;
  /** Controlled flipped state. */
  flipped?: boolean;
  /** Uncontrolled flipped state. */
  defaultFlipped?: boolean;
  /** Called whenever the card flips. */
  onFlippedChange?: (flipped: boolean) => void;
  /** Enables swipe gestures on pointer devices. */
  swipeable?: boolean;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
