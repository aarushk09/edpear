
export interface CollaborativeNote {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface CollaborativeNotepadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  notes?: CollaborativeNote[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveNotes?: (items: CollaborativeNote[]) => void;
}
