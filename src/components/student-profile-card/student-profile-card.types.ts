export type StudentProfileBadge = {
  id: string;
  label: string;
};

export type StudentProfileCardProps = {
  name: string;
  avatarUrl?: string;
  avatarFallback?: string;
  streakDays?: number;
  badges?: StudentProfileBadge[];
  coursesEnrolled?: number;
  /** 0–100 progress for the mini ring */
  progressPercent?: number;
  compact?: boolean;
  className?: string;
};
