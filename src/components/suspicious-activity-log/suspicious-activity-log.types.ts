
export interface SuspiciousActivityEvent {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface SuspiciousActivityLogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  events?: SuspiciousActivityEvent[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onReviewEvent?: (entry: SuspiciousActivityEvent) => void;
  onResolveEvent?: (entry: SuspiciousActivityEvent) => void;
}
