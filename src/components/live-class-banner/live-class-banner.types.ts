export type LiveClassStatus = "scheduled" | "live" | "ended";

export type LiveClassBannerProps = {
  status: LiveClassStatus;
  hostName: string;
  sessionTitle?: string;
  /** Required when status is live */
  participantCount?: number;
  /** Live start time — used to show elapsed */
  startedAt?: string | Date;
  /** Scheduled session start */
  scheduledFor?: string | Date;
  joinHref?: string;
  onJoin?: () => void;
  className?: string;
};
