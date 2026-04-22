export interface ChallengeReward {
  type: "xp" | "badge" | "currency" | "custom";
  amount: number;
  label?: string;
  iconUrl?: string;
}

export type ChallengeStatus = "pending" | "accepted" | "declined" | "expired" | "completed";

export interface ChallengeCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  description: string;
  expiresAt: Date | string | number;
  reward: ChallengeReward;
  status?: ChallengeStatus;
  onAccept?: () => void;
  onDecline?: () => void;
}
