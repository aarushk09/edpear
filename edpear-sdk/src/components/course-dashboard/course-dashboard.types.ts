import type { ReactNode } from "react";

export type CourseDashboardCourse = {
  title: string;
  subtitle?: string;
  code?: string;
};

export type CourseDashboardProps = {
  course: CourseDashboardCourse;
  /** Shown in header ring area when slots not overriding */
  progressPercent?: number;
  progressSlot?: ReactNode;
  nextLessonSlot?: ReactNode;
  activitySlot?: ReactNode;
  instructorSlot?: ReactNode;
  announcementSlot?: ReactNode;
  className?: string;
};
