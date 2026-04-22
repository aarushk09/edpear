export interface TimelineNode {
  id: string;
  title: string;
  dateLabel: string;
  description?: string;
  imageUrl?: string;
  positionScore?: number; // Optional numerical value to position nodes proportionally instead of evenly spaced
}

export interface InteractiveTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: TimelineNode[];
  onNodeClick?: (node: TimelineNode) => void;
  title?: string;
}
