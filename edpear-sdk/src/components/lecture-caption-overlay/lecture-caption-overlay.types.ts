import type { ReactNode } from "react";

export interface CaptionSegment {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  text: string;
  speakerId?: string;
  speakerName?: string;
}

export interface LectureCaptionOverlayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  captions: CaptionSegment[];
  currentTime: number; // current video time in seconds
  onSeek?: (time: number) => void;
  children: ReactNode; // The video element or player to overlay
  showTranscriptPanel?: boolean;
  isLive?: boolean;
}
