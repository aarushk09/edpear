import type { ReactNode } from "react";

export type ReadingLevel = "beginner" | "intermediate" | "advanced";

export interface ReadingLevelToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  level?: ReadingLevel; // If controlled
  defaultLevel?: ReadingLevel; // If uncontrolled
  onChange?: (level: ReadingLevel) => void;
  texts: Record<ReadingLevel, ReactNode>;
  title?: string;
}
