export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  score: number;
  avatarUrl?: string;
  isCurrentUser?: boolean;
  trend?: "up" | "down" | "same";
}

export type LeaderboardScope = "class" | "cohort" | "global";

export interface LeaderboardWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: LeaderboardEntry[];
  scope?: LeaderboardScope;
  onScopeChange?: (scope: LeaderboardScope) => void;
  title?: string;
  optOutSupport?: boolean;
  onOptOut?: () => void;
}
