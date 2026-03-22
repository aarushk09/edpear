import type { ReactNode } from "react";

export type EnrollmentGateType = "purchase" | "prerequisite" | "not-started";

export type EnrollmentGateProps = {
  children: ReactNode;
  /** Explicit false locks the gate */
  enrolled?: boolean;
  hasAccess?: boolean;
  completedPrereq?: boolean;
  /** Which lock UI to emphasize */
  gateType?: EnrollmentGateType;
  lockTitle?: string;
  lockDescription?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};
