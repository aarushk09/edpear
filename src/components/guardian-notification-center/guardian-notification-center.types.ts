
export interface GuardianNotification {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface GuardianNotificationCenterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  alerts?: GuardianNotification[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onAcknowledgeAlert?: (entry: GuardianNotification) => void;
  onSnoozeAlert?: (entry: GuardianNotification) => void;
}
