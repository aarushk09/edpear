export type SessionPhase = "work" | "break";

export type SessionLogEntry = {
  id: string;
  phase: SessionPhase;
  durationSec: number;
  endedAt: string;
};

export type SessionTimerProps = {
  workDurationSec?: number;
  breakDurationSec?: number;
  onSessionComplete?: (payload: { focusScore: number; log: SessionLogEntry[] }) => void;
  className?: string;
};
