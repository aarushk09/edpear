export interface XPProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  animateOnChange?: boolean;
  label?: string;
}
