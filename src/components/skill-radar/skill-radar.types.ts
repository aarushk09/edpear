export interface SkillRadarDimension {
  name: string;
  value: number;
  fullMark?: number;
}

export interface SkillRadarProps extends React.HTMLAttributes<HTMLDivElement> {
  data: SkillRadarDimension[];
  title?: string;
  description?: string;
  fillColor?: string;
  strokeColor?: string;
  gridLevels?: number;
}
