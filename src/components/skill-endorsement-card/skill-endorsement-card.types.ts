
export interface SkillEndorsement {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface SkillEndorsementCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  endorsements?: SkillEndorsement[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  onShareEndorsement?: (entry: SkillEndorsement) => void;
  onRequestRevision?: (entry: SkillEndorsement) => void;
}
