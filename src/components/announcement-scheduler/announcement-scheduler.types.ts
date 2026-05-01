
export interface ScheduledAnnouncementDraft {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface AnnouncementSchedulerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  announcements?: ScheduledAnnouncementDraft[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveAnnouncements?: (items: ScheduledAnnouncementDraft[]) => void;
}
