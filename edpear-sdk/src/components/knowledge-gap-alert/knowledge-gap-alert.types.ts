export interface KnowledgeGap {
  id: string;
  topic: string;
  description?: string;
  remedyUrl?: string;
  remedyLabel?: string;
}

export interface KnowledgeGapAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  gaps: KnowledgeGap[];
  title?: string;
  onRemedyClick?: (gap: KnowledgeGap) => void;
  onDismiss?: () => void;
}
