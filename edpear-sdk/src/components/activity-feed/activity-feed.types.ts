export type ActivityFeedItemType =
  | "lesson_complete"
  | "discussion"
  | "badge"
  | "enrollment"
  | "custom";

export type ActivityFeedItem = {
  id: string;
  type: ActivityFeedItemType;
  message: string;
  actor?: string;
  timestamp: string | Date;
};

export type ActivityFeedProps = {
  items: ActivityFeedItem[];
  title?: string;
  className?: string;
};
