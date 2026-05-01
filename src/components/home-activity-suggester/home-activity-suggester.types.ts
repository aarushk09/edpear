
export interface HomeActivitySuggestion {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface HomeActivitySuggesterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  suggestions?: HomeActivitySuggestion[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onAssignSuggestion?: (entry: HomeActivitySuggestion) => void;
  onSaveSuggestion?: (entry: HomeActivitySuggestion) => void;
}
