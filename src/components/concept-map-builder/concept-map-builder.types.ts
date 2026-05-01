
export interface ConceptMapNode {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface ConceptMapBuilderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  nodes?: ConceptMapNode[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveNodes?: (items: ConceptMapNode[]) => void;
}
