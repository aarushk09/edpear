export interface QueuedStudent {
  id: string;
  name: string;
  avatarUrl?: string;
  raisedAt: Date | string | number;
}

export interface RaiseHandQueueProps extends React.HTMLAttributes<HTMLDivElement> {
  queue: QueuedStudent[];
  isInstructor?: boolean;
  isHandRaised?: boolean;
  onRaiseHand?: () => void;
  onLowerHand?: () => void;
  onCallOnStudent?: (studentId: string) => void;
  onLowerStudentHand?: (studentId: string) => void;
}
