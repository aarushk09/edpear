export type LogicNodeType = "AND" | "OR" | "NOT" | "XOR" | "INPUT" | "OUTPUT";

export interface CircuitNode {
  id: string;
  type: LogicNodeType;
  label?: string;
  value?: number; // 0 or 1 for INPUT
  x: number; // grid x position
  y: number; // grid y position
}

export interface CircuitConnection {
  id: string;
  fromId: string;
  toId: string;
}

export interface CircuitSimulatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initialNodes?: CircuitNode[];
  initialConnections?: CircuitConnection[];
  onChange?: (nodes: CircuitNode[], connections: CircuitConnection[]) => void;
  title?: string;
}
