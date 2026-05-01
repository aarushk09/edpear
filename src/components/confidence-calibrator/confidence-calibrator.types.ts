
export interface ConfidenceCheckpoint {
  id: string;
  label: string;
  baseline: number;
  current: number;
  target?: number;
  detail?: string;
}

export interface ConfidenceCalibratorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  checkpoints?: ConfidenceCheckpoint[];
  baselineLabel?: string;
  currentLabel?: string;
  targetLabel?: string;
  disabled?: boolean;
  onSelectCheckpoint?: (point: ConfidenceCheckpoint) => void;
}
