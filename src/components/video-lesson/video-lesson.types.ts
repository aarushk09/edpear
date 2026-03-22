import type { HTMLAttributes } from "react";

export interface VideoLessonChapter {
  /** Stable chapter identifier. */
  id: string;
  /** Chapter label shown in the marker list. */
  label: string;
  /** Native video timestamp in seconds. */
  time: number;
}

/**
 * Props for the VideoLesson component.
 */
export interface VideoLessonProps extends HTMLAttributes<HTMLDivElement> {
  /** Lesson heading shown above the player. */
  title: string;
  /** Native video source URL. */
  src?: string;
  /** YouTube video id for embeds. */
  youtubeId?: string;
  /** Optional chapter markers. */
  chapters?: VideoLessonChapter[];
  /** Called whenever native video playback time changes. */
  onProgressChange?: (currentTime: number) => void;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
