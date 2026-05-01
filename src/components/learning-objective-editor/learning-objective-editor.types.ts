
export interface LearningObjectiveDraft {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface LearningObjectiveEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  objectives?: LearningObjectiveDraft[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveObjectives?: (items: LearningObjectiveDraft[]) => void;
}
