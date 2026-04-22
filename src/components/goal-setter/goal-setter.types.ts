export interface GoalMilestone {
  id: string;
  title: string;
}

export type CheckInCadence = "daily" | "weekly" | "monthly";

export interface GoalData {
  title: string;
  completionCriteria: string;
  checkInCadence: CheckInCadence;
  milestones: GoalMilestone[];
}

export interface GoalSetterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSave?: (goal: GoalData) => void;
  onCancel?: () => void;
}
