"use client";

import { useMemo } from "react";

import { cn } from "../../lib/cn.js";
import type { LearningPathMapProps, PathNode } from "./learning-path-map.types.js";

function nodeById(nodes: PathNode[]): Map<string, PathNode> {
  return new Map(nodes.map((n) => [n.id, n]));
}

function nodeStyles(state: PathNode["state"]): { fill: string; stroke: string; text: string } {
  switch (state) {
    case "completed":
      return { fill: "hsl(142 76% 36% / 0.15)", stroke: "hsl(142 76% 36%)", text: "hsl(142 76% 28%)" };
    case "current":
      return { fill: "hsl(221 83% 53% / 0.15)", stroke: "hsl(221 83% 53%)", text: "hsl(221 83% 40%)" };
    case "available":
      return { fill: "hsl(var(--card))", stroke: "hsl(var(--border))", text: "hsl(var(--foreground))" };
    default:
      return { fill: "hsl(var(--muted))", stroke: "hsl(var(--border))", text: "hsl(var(--muted-foreground))" };
  }
}

export function LearningPathMap({
  nodes,
  edges,
  onNodeSelect,
  viewWidth = 1000,
  viewHeight = 520,
  className,
}: LearningPathMapProps) {
  const map = useMemo(() => nodeById(nodes), [nodes]);

  return (
    <div
      className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="learning-path-map"
    >
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Learning path</h3>
        <p className="text-xs text-muted-foreground">Prerequisite graph · click an available or current node</p>
      </div>
      <div className="overflow-x-auto p-4">
        <svg
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          className="h-auto min-h-[280px] w-full max-w-full"
          role="img"
          aria-label="Curriculum path map"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill="hsl(var(--muted-foreground))" />
            </marker>
          </defs>
          {edges.map((e, i) => {
            const a = map.get(e.from);
            const b = map.get(e.to);
            if (!a || !b) return null;
            return (
              <line
                key={`${e.from}-${e.to}-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="hsl(var(--muted-foreground) / 0.35)"
                strokeWidth={3}
                markerEnd="url(#arrowhead)"
              />
            );
          })}
          {nodes.map((n) => {
            const { fill, stroke, text } = nodeStyles(n.state);
            const r = 44;
            return (
              <g
                key={n.id}
                role={n.state === "locked" ? undefined : "button"}
                tabIndex={n.state === "locked" ? undefined : 0}
                className={n.state === "locked" ? undefined : "cursor-pointer"}
                onClick={() => (n.state !== "locked" ? onNodeSelect?.(n.id) : undefined)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && n.state !== "locked") {
                    e.preventDefault();
                    onNodeSelect?.(n.id);
                  }
                }}
                aria-label={`${n.label}, ${n.state}`}
              >
                <circle cx={n.x} cy={n.y} r={r + 8} fill="transparent" />
                <circle cx={n.x} cy={n.y} r={r} fill={fill} stroke={stroke} strokeWidth={3} />
                {n.state === "locked" ? (
                  <path
                    transform={`translate(${n.x - 8}, ${n.y - 14})`}
                    d="M4 8V6a4 4 0 0 1 8 0v2M3 8h10v8H3z"
                    fill="none"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                ) : null}
                <text
                  x={n.x}
                  y={n.y + 6}
                  textAnchor="middle"
                  fill={text}
                  className="pointer-events-none text-[13px] font-semibold"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {n.label.length > 14 ? `${n.label.slice(0, 12)}…` : n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
