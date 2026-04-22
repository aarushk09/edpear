export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export type PollStatus = "open" | "closed" | "results";

export interface PollWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  options: PollOption[];
  status: PollStatus;
  totalVotes?: number; // If omitted, calculated from options
  userVoteId?: string;
  onVote?: (optionId: string) => void;
  isInstructor?: boolean;
  onClosePoll?: () => void;
  onShowResults?: () => void;
}
