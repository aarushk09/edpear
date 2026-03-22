import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Props for the CourseCard component.
 */
export interface CourseCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Course title shown as the primary heading. */
  title: string;
  /** Secondary metadata for the course instructor. */
  instructor: string;
  /** Optional thumbnail or illustration source. */
  thumbnailSrc?: string;
  /** Alt text for the thumbnail image. */
  thumbnailAlt?: string;
  /** Progress percentage from 0 to 100. */
  progress?: number;
  /** Optional course category badge label. */
  categoryTag?: string;
  /** Optional status copy such as "Live" or "Self-paced". */
  status?: string;
  /** Description or supporting body copy. */
  description?: string;
  /** CTA label rendered in the footer. */
  ctaLabel?: string;
  /** Optional slot for a leading icon. */
  icon?: ReactNode;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
