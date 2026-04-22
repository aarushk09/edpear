import { ArrowDownRight, ArrowRight, ArrowUpRight, Gauge } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { AdaptiveDifficultyMeterProps, DifficultyTrend } from "./adaptive-difficulty-meter.types.js";

export const AdaptiveDifficultyMeter = forwardRef<HTMLDivElement, AdaptiveDifficultyMeterProps>((props, ref) => {
  const {
    value,
    trend = "stable",
    label = "Current Difficulty",
    showTrend = true,
    className,
    ...rest
  } = props;

  const normalizedValue = Math.max(0, Math.min(100, value));

  const getDifficultyColor = (val: number) => {
    if (val < 33) return "text-emerald-500 bg-emerald-500";
    if (val < 66) return "text-amber-500 bg-amber-500";
    return "text-rose-500 bg-rose-500";
  };

  const getDifficultyLabel = (val: number) => {
    if (val < 20) return "Beginner";
    if (val < 40) return "Easy";
    if (val < 60) return "Intermediate";
    if (val < 80) return "Hard";
    return "Expert";
  };

  const TrendIcon = {
    increasing: ArrowUpRight,
    decreasing: ArrowDownRight,
    stable: ArrowRight,
  }[trend];

  const trendColor = {
    increasing: "text-rose-500",
    decreasing: "text-emerald-500",
    stable: "text-muted-foreground",
  }[trend];

  const colorClass = getDifficultyColor(normalizedValue);

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow-sm", className)}
      data-slot="adaptive-difficulty-meter"
      {...rest}
    >
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted", colorClass.split(" ")[0])}>
        <Gauge className="h-5 w-5" />
      </div>

      <div className="flex-1 space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{label}</span>
          <span className="font-semibold text-muted-foreground">{getDifficultyLabel(normalizedValue)}</span>
        </div>
        
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClass.split(" ")[1])}
            style={{ width: `${normalizedValue}%` }}
          />
        </div>
      </div>

      {showTrend && (
        <div className={cn("flex flex-col items-center justify-center pl-2", trendColor)}>
          <TrendIcon className="h-5 w-5" />
          <span className="text-[10px] uppercase font-bold tracking-wider mt-0.5">{trend}</span>
        </div>
      )}
    </div>
  );
});

AdaptiveDifficultyMeter.displayName = "AdaptiveDifficultyMeter";
