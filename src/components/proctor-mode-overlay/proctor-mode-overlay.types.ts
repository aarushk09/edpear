
export interface ProctorSignal {
  id: string;
  label: string;
  baseline: number;
  current: number;
  target?: number;
  detail?: string;
}

export interface ProctorModeOverlayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  signals?: ProctorSignal[];
  baselineLabel?: string;
  currentLabel?: string;
  targetLabel?: string;
  disabled?: boolean;
  onSelectSignal?: (point: ProctorSignal) => void;
}
