export type LearningJournalMood =
  | "energized"
  | "steady"
  | "stuck"
  | "overwhelmed"
  | "proud";

export interface LearningJournalEntry {
  id: string;
  dateLabel: string;
  mood: LearningJournalMood;
  wins: string[];
  blockers: string[];
  reflection?: string;
}

export interface LearningJournalPromptSet {
  winsLabel?: string;
  blockersLabel?: string;
  reflectionLabel?: string;
  winsPlaceholder?: string;
  blockersPlaceholder?: string;
  reflectionPlaceholder?: string;
}

export interface LearningJournalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  currentDateLabel?: string;
  prompt?: string;
  entries?: LearningJournalEntry[];
  onSaveEntry?: (entry: LearningJournalEntry) => void;
  onDeleteEntry?: (entryId: string) => void;
  prompts?: LearningJournalPromptSet;
  disabled?: boolean;
  allowDelete?: boolean;
  maxVisibleEntries?: number;
  initialMood?: LearningJournalMood;
  saveLabel?: string;
}
