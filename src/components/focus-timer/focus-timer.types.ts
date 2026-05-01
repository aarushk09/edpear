
export interface FocusTimerCycle {
  id: string;
  label: string;
  baseline: number;
  current: number;
  target?: number;
  detail?: string;
}

export interface FocusTimerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  cycles?: FocusTimerCycle[];
  baselineLabel?: string;
  currentLabel?: string;
  targetLabel?: string;
  disabled?: boolean;
  onSelectCycle?: (point: FocusTimerCycle) => void;
}
