
export interface QuestionVariantDraft {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface QuestionVariantManagerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  variants?: QuestionVariantDraft[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveVariants?: (items: QuestionVariantDraft[]) => void;
}
