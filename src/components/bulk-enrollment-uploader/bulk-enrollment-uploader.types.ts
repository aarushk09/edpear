
export interface BulkEnrollmentRow {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface BulkEnrollmentUploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  rows?: BulkEnrollmentRow[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onApproveRow?: (entry: BulkEnrollmentRow) => void;
  onFlagRow?: (entry: BulkEnrollmentRow) => void;
}
