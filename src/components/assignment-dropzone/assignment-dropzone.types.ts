export type AssignmentDropzoneState =
  | { status: "idle" }
  | { status: "uploading"; fileName: string }
  | { status: "submitted"; fileName: string; submittedAt: string };

export type AssignmentDropzoneProps = {
  /** Deadline as ISO 8601 string or Date */
  deadline: string | Date;
  /** Accept attribute, e.g. ".pdf,.py,.zip,image/*" */
  accept: string;
  /** Optional max file size in bytes */
  maxBytes?: number;
  state?: AssignmentDropzoneState;
  onFileSelect?: (file: File) => void;
  onSubmit?: (file: File) => void | Promise<void>;
  assignmentTitle?: string;
  className?: string;
};
