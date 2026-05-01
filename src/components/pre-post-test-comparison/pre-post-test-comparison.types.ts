
export interface PrePostComparisonPoint {
  id: string;
  label: string;
  baseline: number;
  current: number;
  target?: number;
  detail?: string;
}

export interface PrePostTestComparisonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  comparisons?: PrePostComparisonPoint[];
  baselineLabel?: string;
  currentLabel?: string;
  targetLabel?: string;
  disabled?: boolean;
  onSelectComparison?: (point: PrePostComparisonPoint) => void;
}
