export interface PlagiarismSource {
  id: string;
  url?: string;
  name: string;
  matchPercentage: number;
}

export type PlagiarismStatus = "scanning" | "clear" | "warning" | "danger";

export interface PlagiarismScoreIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number; // 0 to 100 (percentage of matched text)
  sources?: PlagiarismSource[];
  status?: PlagiarismStatus; // If omitted, calculated from score
  title?: string;
}
