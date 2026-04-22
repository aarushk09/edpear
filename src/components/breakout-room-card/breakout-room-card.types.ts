export interface BreakoutMember {
  id: string;
  name: string;
  avatarUrl?: string;
}

export type BreakoutStatus = "assigned" | "in-progress" | "ending";

export interface BreakoutRoomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  roomName: string;
  topic?: string;
  members: BreakoutMember[];
  expiresAt?: Date | string | number;
  status: BreakoutStatus;
  onJoin?: () => void;
  onReturnToMain?: () => void;
}
