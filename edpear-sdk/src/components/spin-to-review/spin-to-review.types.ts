export interface SpinItem {
  id: string;
  label: string;
  color?: string;
}

export interface SpinToReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SpinItem[];
  onSpinEnd?: (item: SpinItem) => void;
  title?: string;
  description?: string;
  spinDurationMs?: number;
}
