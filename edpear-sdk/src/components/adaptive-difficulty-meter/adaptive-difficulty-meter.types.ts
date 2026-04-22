export type DifficultyTrend = "increasing" | "decreasing" | "stable";

export interface AdaptiveDifficultyMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  trend?: DifficultyTrend;
  label?: string;
  showTrend?: boolean;
}
