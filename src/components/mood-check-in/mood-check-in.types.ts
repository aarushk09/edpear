
export interface MoodCheckInEntry {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface MoodCheckInProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  entries?: MoodCheckInEntry[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onLogMood?: (entry: MoodCheckInEntry) => void;
  onShareSupportTip?: (entry: MoodCheckInEntry) => void;
}
