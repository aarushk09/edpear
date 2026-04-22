import { Cpu, Power, Zap } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { CircuitConnection, CircuitNode, CircuitSimulatorProps, LogicNodeType } from "./circuit-simulator.types.js";

const evaluateCircuit = (nodes: CircuitNode[], connections: CircuitConnection[]) => {
  const values = new Map<string, number>();
  
  // Initialize input values
  nodes.forEach(n => {
    if (n.type === "INPUT") values.set(n.id, n.value ?? 0);
  });

  // Sort nodes left to right to evaluate in order (simplified topological sort)
  const sortedNodes = [...nodes].filter(n => n.type !== "INPUT").sort((a, b) => a.x - b.x);

  for (const node of sortedNodes) {
    const inputs = connections.filter(c => c.toId === node.id).map(c => values.get(c.fromId) ?? 0);
    
    let out = 0;
    if (node.type === "AND") {
      out = inputs.length > 0 ? (inputs.every(v => v === 1) ? 1 : 0) : 0;
    } else if (node.type === "OR") {
      out = inputs.some(v => v === 1) ? 1 : 0;
    } else if (node.type === "XOR") {
      out = inputs.filter(v => v === 1).length % 2 === 1 ? 1 : 0;
    } else if (node.type === "NOT") {
      out = inputs[0] === 1 ? 0 : 1;
    } else if (node.type === "OUTPUT") {
      out = inputs[0] ?? 0;
    }
    
    values.set(node.id, out);
  }

  return values;
};

export const CircuitSimulator = forwardRef<HTMLDivElement, CircuitSimulatorProps>((props, ref) => {
  const {
    initialNodes = [],
    initialConnections = [],
    onChange,
    title = "Logic Gate Simulator",
    className,
    ...rest
  } = props;

  const [nodes, setNodes] = useState<CircuitNode[]>(initialNodes);
  const [connections, setConnections] = useState<CircuitConnection[]>(initialConnections);
  const [nodeValues, setNodeValues] = useState<Map<string, number>>(new Map());
  
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

  useEffect(() => {
    const values = evaluateCircuit(nodes, connections);
    setNodeValues(values);
    onChange?.(nodes, connections);
  }, [nodes, connections, onChange]);

  const toggleInput = (id: string) => {
    setNodes(prev => prev.map(n => 
      n.id === id ? { ...n, value: n.value === 1 ? 0 : 1 } : n
    ));
  };

  const addNode = (type: LogicNodeType) => {
    const id = Math.random().toString(36).substr(2, 6);
    // Find empty spot
    const newX = type === "INPUT" ? 50 : type === "OUTPUT" ? 400 : 200;
    const newY = 50 + (nodes.filter(n => n.type === type).length * 80);
    
    setNodes(prev => [...prev, {
      id,
      type,
      label: type,
      value: type === "INPUT" ? 0 : undefined,
      x: newX,
      y: newY
    }]);
  };

  const handleNodeClick = (id: string) => {
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    if (node.type === "INPUT") {
      toggleInput(id);
    }

    if (connectingFrom === null) {
      if (node.type !== "OUTPUT") setConnectingFrom(id);
    } else {
      if (connectingFrom !== id && node.type !== "INPUT") {
        setConnections(prev => [...prev, { id: `${connectingFrom}-${id}`, fromId: connectingFrom, toId: id }]);
      }
      setConnectingFrom(null);
    }
  };

  const clearCircuit = () => {
    setNodes([]);
    setConnections([]);
    setConnectingFrom(null);
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
      data-slot="circuit-simulator"
      {...rest}
    >
      <div className="flex items-center justify-between border-b bg-muted/20 p-4">
        <div className="flex items-center gap-2 text-primary">
          <Cpu className="h-5 w-5" />
          <h3 className="font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => addNode("INPUT")} className="text-xs px-2 py-1 bg-muted rounded border hover:bg-accent">Add Input</button>
          <button onClick={() => addNode("AND")} className="text-xs px-2 py-1 bg-muted rounded border hover:bg-accent">AND</button>
          <button onClick={() => addNode("OR")} className="text-xs px-2 py-1 bg-muted rounded border hover:bg-accent">OR</button>
          <button onClick={() => addNode("NOT")} className="text-xs px-2 py-1 bg-muted rounded border hover:bg-accent">NOT</button>
          <button onClick={() => addNode("OUTPUT")} className="text-xs px-2 py-1 bg-muted rounded border hover:bg-accent">Add Output</button>
          <button onClick={clearCircuit} className="text-xs px-2 py-1 text-rose-500 hover:bg-rose-500/10 rounded ml-2">Clear</button>
        </div>
      </div>

      <div className="relative min-h-[400px] w-full bg-slate-50 dark:bg-slate-900 overflow-hidden p-4">
        {/* Connection lines (simplified direct straight lines) */}
        <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: '100%', height: '100%' }}>
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.fromId);
            const toNode = nodes.find(n => n.id === conn.toId);
            if (!fromNode || !toNode) return null;
            
            const val = nodeValues.get(fromNode.id) === 1;
            
            return (
              <line
                key={conn.id}
                x1={fromNode.x + 60}
                y1={fromNode.y + 20}
                x2={toNode.x}
                y2={toNode.y + 20}
                stroke={val ? "#10b981" : "#94a3b8"}
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(node => {
          const val = nodeValues.get(node.id) ?? 0;
          const isHigh = val === 1;
          const isConnecting = connectingFrom === node.id;
          
          let bgColor = "bg-card";
          if (node.type === "INPUT" || node.type === "OUTPUT") {
            bgColor = isHigh ? "bg-emerald-500 text-white border-emerald-600" : "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
          }
          
          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className={cn(
                "absolute z-10 flex h-10 w-[60px] items-center justify-center rounded-md border shadow-sm text-xs font-bold transition-all",
                bgColor,
                isConnecting && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                node.type !== "INPUT" && node.type !== "OUTPUT" && "hover:border-primary"
              )}
              style={{ left: node.x, top: node.y }}
            >
              {node.type === "INPUT" ? (
                <div className="flex items-center gap-1"><Power className="h-3 w-3" /> {val}</div>
              ) : node.type === "OUTPUT" ? (
                <div className="flex items-center gap-1"><Zap className={cn("h-3 w-3", isHigh && "fill-current text-yellow-300")} /> OUT</div>
              ) : (
                node.type
              )}
            </button>
          );
        })}

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Use the top toolbar to add inputs, gates, and outputs.
          </div>
        )}
      </div>
      
      {connectingFrom && (
        <div className="bg-primary/10 text-primary p-2 text-xs text-center border-t border-primary/20 font-medium">
          Select a destination node to complete connection...
        </div>
      )}
    </div>
  );
});

CircuitSimulator.displayName = "CircuitSimulator";
