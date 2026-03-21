import type { HTMLAttributes } from "react";

export interface DiscussionComment {
  /** Stable comment identifier. */
  id: string;
  /** Author display name. */
  author: string;
  /** Optional author role or badge. */
  role?: string;
  /** Body copy for the comment. */
  content: string;
  /** Relative or formatted timestamp text. */
  timestamp: string;
  /** Current score or upvote count. */
  upvotes?: number;
  /** Nested replies. */
  replies?: DiscussionComment[];
}

/**
 * Props for the DiscussionThread component.
 */
export interface DiscussionThreadProps extends HTMLAttributes<HTMLDivElement> {
  /** Root-level comments to render. */
  comments: DiscussionComment[];
  /** Called when the learner submits a reply. */
  onReply?: (parentId: string | null, content: string) => void;
  /** Called when a comment receives an upvote. */
  onUpvote?: (commentId: string) => void;
  /** Placeholder copy for the composer. */
  placeholder?: string;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}
