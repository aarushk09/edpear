export interface GradingTask {
  id: string;
  studentName: string;
  assignmentTitle: string;
  submittedAt: Date | string | number;
  status: "pending" | "in-progress" | "graded";
}

export interface GradingQueueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks: GradingTask[];
  onGradeTask?: (taskId: string) => void;
  title?: string;
}
