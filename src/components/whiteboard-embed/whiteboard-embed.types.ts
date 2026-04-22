import type { ReactNode } from "react";

export interface WhiteboardEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  roomName?: string;
  isReadOnly?: boolean;
  onSnapshot?: () => void;
  onClear?: () => void;
  collaboratorCount?: number;
  children?: ReactNode; // The actual canvas or iframe
}
