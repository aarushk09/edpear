
export interface ParentProgressDigestSection {
  id: string;
  label: string;
  baseline: number;
  current: number;
  target?: number;
  detail?: string;
}

export interface ParentProgressDigestProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  sections?: ParentProgressDigestSection[];
  baselineLabel?: string;
  currentLabel?: string;
  targetLabel?: string;
  disabled?: boolean;
  onSelectSection?: (point: ParentProgressDigestSection) => void;
}
