
export interface BurnoutRiskSignal {
  id: string;
  label: string;
  baseline: number;
  current: number;
  target?: number;
  detail?: string;
}

export interface BurnoutRiskIndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  signals?: BurnoutRiskSignal[];
  baselineLabel?: string;
  currentLabel?: string;
  targetLabel?: string;
  disabled?: boolean;
  onSelectSignal?: (point: BurnoutRiskSignal) => void;
}
