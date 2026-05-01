
export interface ErrorPatternCluster {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface ErrorPatternAnalyzerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  clusters?: ErrorPatternCluster[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onOpenCluster?: (entry: ErrorPatternCluster) => void;
  onAssignIntervention?: (entry: ErrorPatternCluster) => void;
}
