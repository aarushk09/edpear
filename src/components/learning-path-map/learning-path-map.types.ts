export type PathNodeState = "locked" | "available" | "current" | "completed";

export type PathNode = {
  id: string;
  label: string;
  /** X position in map units (0–1000) */
  x: number;
  y: number;
  state: PathNodeState;
};

export type PathEdge = { from: string; to: string };

export type LearningPathMapProps = {
  nodes: PathNode[];
  edges: PathEdge[];
  onNodeSelect?: (nodeId: string) => void;
  /** View box width in map units */
  viewWidth?: number;
  viewHeight?: number;
  className?: string;
};
