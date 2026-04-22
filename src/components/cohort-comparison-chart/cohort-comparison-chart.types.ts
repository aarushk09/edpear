export interface ComparisonDataPoint {
  label: string;
  studentScore: number;
  cohortAverage: number;
}

export interface CohortComparisonChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ComparisonDataPoint[];
  studentLabel?: string;
  cohortLabel?: string;
  title?: string;
  maxScore?: number;
}
