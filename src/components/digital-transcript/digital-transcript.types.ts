
export interface TranscriptCourseEntry {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface DigitalTranscriptProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  courses?: TranscriptCourseEntry[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onViewCredential?: (entry: TranscriptCourseEntry) => void;
  onCopyShareLink?: (entry: TranscriptCourseEntry) => void;
}
