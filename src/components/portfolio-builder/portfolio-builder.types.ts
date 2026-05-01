
export interface PortfolioArtifact {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface PortfolioBuilderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  artifacts?: PortfolioArtifact[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onFeatureArtifact?: (entry: PortfolioArtifact) => void;
  onShareArtifact?: (entry: PortfolioArtifact) => void;
}
