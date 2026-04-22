import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { SkillRadarProps } from "./skill-radar.types.js";

export const SkillRadar = forwardRef<HTMLDivElement, SkillRadarProps>((props, ref) => {
  const {
    data,
    title,
    description,
    fillColor = "hsl(var(--primary))",
    strokeColor = "hsl(var(--primary))",
    gridLevels = 5,
    className,
    ...rest
  } = props;

  const size = 300;
  const center = size / 2;
  const radius = (size / 2) - 40; // leave room for labels
  const angleStep = (Math.PI * 2) / data.length;

  const getPoint = (value: number, max: number, index: number) => {
    const ratio = Math.max(0, Math.min(1, value / max));
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + radius * ratio * Math.cos(angle),
      y: center + radius * ratio * Math.sin(angle),
    };
  };

  const points = data.map((d, i) => getPoint(d.value, d.fullMark ?? 100, i));
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
      data-slot="skill-radar"
      {...rest}
    >
      {(title || description) && (
        <div className="mb-6 text-center space-y-1.5">
          {title && <h3 className="text-xl font-semibold leading-none tracking-tight">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="relative flex items-center justify-center w-full max-w-[300px] aspect-square">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Grid levels */}
          {Array.from({ length: gridLevels }).map((_, levelIndex) => {
            const ratio = (levelIndex + 1) / gridLevels;
            const levelPoints = data.map((_, i) => getPoint(ratio, 1, i));
            const levelPolygonPoints = levelPoints.map((p) => `${p.x},${p.y}`).join(" ");
            
            return (
              <polygon
                key={`grid-${levelIndex}`}
                points={levelPolygonPoints}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border/50"
              />
            );
          })}

          {/* Axes */}
          {data.map((_, i) => {
            const p = getPoint(1, 1, i);
            return (
              <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-border/50"
              />
            );
          })}

          {/* Data Polygon */}
          <polygon
            points={polygonPoints}
            fill={fillColor}
            fillOpacity={0.2}
            stroke={strokeColor}
            strokeWidth="2"
            className="transition-all duration-500 ease-in-out"
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <circle
              key={`point-${i}`}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={fillColor}
              className="transition-all duration-500 ease-in-out"
            />
          ))}

          {/* Labels */}
          {data.map((d, i) => {
            const max = d.fullMark ?? 100;
            // Place labels slightly further out than the max radius
            const p = getPoint(1.15, 1, i);
            // Adjust anchor based on x position
            const textAnchor = p.x < center - 10 ? "end" : p.x > center + 10 ? "start" : "middle";
            // Adjust baseline based on y position
            const dominantBaseline = p.y < center - 10 ? "auto" : p.y > center + 10 ? "hanging" : "middle";

            return (
              <text
                key={`label-${i}`}
                x={p.x}
                y={p.y}
                fill="currentColor"
                fontSize="12"
                fontWeight="500"
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                className="text-muted-foreground transition-all duration-300 hover:text-foreground"
              >
                {d.name}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
});

SkillRadar.displayName = "SkillRadar";
