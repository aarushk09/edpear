
export interface StudyGroupMatch {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface StudyGroupFinderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  groups?: StudyGroupMatch[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onJoinGroup?: (entry: StudyGroupMatch) => void;
  onSaveGroup?: (entry: StudyGroupMatch) => void;
}
