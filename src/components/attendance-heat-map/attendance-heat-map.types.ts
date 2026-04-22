export interface HeatMapData {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface AttendanceHeatMapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HeatMapData[];
  title?: string;
  startDate?: Date | string | number;
  endDate?: Date | string | number;
  maxCount?: number; // Used for scale. If not provided, calculated from data.
}
