
export interface KudosEntry {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface KudosBoardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  recognitions?: KudosEntry[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onBoostKudos?: (entry: KudosEntry) => void;
  onPinKudos?: (entry: KudosEntry) => void;
}
