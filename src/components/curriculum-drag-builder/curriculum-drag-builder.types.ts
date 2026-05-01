
export interface CurriculumSequenceItem {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface CurriculumDragBuilderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  modules?: CurriculumSequenceItem[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveModules?: (items: CurriculumSequenceItem[]) => void;
}
