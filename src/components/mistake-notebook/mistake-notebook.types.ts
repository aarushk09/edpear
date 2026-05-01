
export interface MistakeNotebookEntry {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface MistakeNotebookProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  entries?: MistakeNotebookEntry[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onResurfaceEntry?: (entry: MistakeNotebookEntry) => void;
  onArchiveEntry?: (entry: MistakeNotebookEntry) => void;
}
