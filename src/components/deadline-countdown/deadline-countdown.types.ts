export interface DeadlineCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: Date | string | number;
  title?: string;
  onExpire?: () => void;
}
