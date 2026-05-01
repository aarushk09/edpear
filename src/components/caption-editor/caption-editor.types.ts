
export interface CaptionCueDraft {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface CaptionEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  cues?: CaptionCueDraft[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveCues?: (items: CaptionCueDraft[]) => void;
}
