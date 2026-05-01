
export interface CompetencyMatrixEntry {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface CompetencyMatrixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  competencies?: CompetencyMatrixEntry[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onViewEvidence?: (entry: CompetencyMatrixEntry) => void;
  onPlanNextStep?: (entry: CompetencyMatrixEntry) => void;
}
