import type { ReactNode } from "react";

export type OnboardingItem = {
  id: string;
  label: string;
  /** Optional XP granted when completed (display only unless you wire rewards) */
  xp?: number;
};

export type OnboardingChecklistProps = {
  title?: string;
  items: OnboardingItem[];
  completedIds: string[];
  onToggle?: (itemId: string, completed: boolean) => void;
  onDismiss?: () => void;
  /** Optional slot for streak / badge hooks */
  rewardSlot?: ReactNode;
  /** When true, panel is positioned in normal flow (e.g. demos); default floats over the viewport */
  embedded?: boolean;
  className?: string;
};
