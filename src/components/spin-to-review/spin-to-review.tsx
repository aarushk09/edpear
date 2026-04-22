import { PartyPopper, Play, RotateCw } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { SpinItem, SpinToReviewProps } from "./spin-to-review.types.js";

const DEFAULT_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#d946ef", "#f43f5e"
];

export const SpinToReview = forwardRef<HTMLDivElement, SpinToReviewProps>((props, ref) => {
  const {
    items,
    onSpinEnd,
    title = "Spin to Review",
    description = "Spin the wheel to pick a random topic for review.",
    spinDurationMs = 4000,
    className,
    ...rest
  } = props;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState<SpinItem | null>(null);

  const numItems = items.length;
  const sliceAngle = 360 / numItems;

  const handleSpin = () => {
    if (isSpinning || numItems === 0) return;

    setIsSpinning(true);
    setSelectedItem(null);

    // Calculate a random slice to land on
    const randomIndex = Math.floor(Math.random() * numItems);
    
    // We want the top (270 degrees in SVG) to point to the middle of the selected slice
    const baseSpins = 5 * 360; // 5 full rotations
    const sliceOffset = randomIndex * sliceAngle;
    const centerOffset = sliceAngle / 2;
    
    // Offset by 90 degrees because 0 degrees is right/east in SVG, but we have our pointer at top/north
    const targetRotation = baseSpins + (360 - sliceOffset) - centerOffset + 90;

    setRotation((prev) => prev + targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedItem(items[randomIndex] ?? null);
      if (onSpinEnd && items[randomIndex]) {
        onSpinEnd(items[randomIndex]);
      }
    }, spinDurationMs);
  };

  const getConicGradient = () => {
    if (numItems === 0) return "conic-gradient(from 0deg, hsl(var(--muted)) 0deg 360deg)";
    
    const parts = items.map((item, index) => {
      const color = item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;
      return `${color} ${startAngle}deg ${endAngle}deg`;
    });

    return `conic-gradient(from 0deg, ${parts.join(", ")})`;
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center justify-center rounded-xl border bg-card p-8 text-card-foreground shadow-sm", className)}
      data-slot="spin-to-review"
      {...rest}
    >
      <div className="mb-8 text-center space-y-1.5">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div className="relative mb-8 flex h-72 w-72 flex-col items-center justify-center">
        {/* Pointer */}
        <div className="absolute -top-4 z-20 flex flex-col items-center">
          <div className="h-4 w-6 rounded-b-md bg-foreground shadow-sm" />
          <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-foreground drop-shadow-md" />
        </div>

        {/* Wheel */}
        <div
          className="absolute inset-0 z-10 overflow-hidden rounded-full shadow-inner ring-8 ring-muted/50 transition-transform"
          style={{
            background: getConicGradient(),
            transform: `rotate(${rotation}deg)`,
            transitionDuration: isSpinning ? `${spinDurationMs}ms` : "0ms",
            transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.3, 1)", // easeOutCubic
          }}
        >
          {/* Internal lines for better visual separation */}
          {items.map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-full w-[2px] origin-top -translate-x-1/2 bg-white/30 mix-blend-overlay"
              style={{ transform: `rotate(${i * sliceAngle}deg)` }}
            />
          ))}
          
          {/* Inner circle for the spin button */}
          <div className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-background shadow-lg" />
        </div>

        {/* Center Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning || numItems === 0}
          className="absolute z-20 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-md ring-4 ring-background transition-transform active:scale-95 disabled:pointer-events-none disabled:opacity-50"
          aria-label="Spin the wheel"
        >
          {isSpinning ? <RotateCw className="h-6 w-6 animate-spin text-muted-foreground" /> : <Play className="ml-1 h-6 w-6 text-primary" />}
        </button>
      </div>

      <div className="h-20 flex items-center justify-center">
        {selectedItem ? (
          <div className="animate-in fade-in zoom-in slide-in-from-bottom-2 duration-500 flex flex-col items-center text-center">
            <span className="flex items-center gap-2 text-xl font-bold text-primary">
              <PartyPopper className="h-5 w-5" />
              {selectedItem.label}
              <PartyPopper className="h-5 w-5" />
            </span>
            <span className="text-sm text-muted-foreground mt-1">Review this topic now!</span>
          </div>
        ) : (
          <span className="text-sm font-medium text-muted-foreground animate-pulse">
            {isSpinning ? "Spinning..." : "Ready to spin"}
          </span>
        )}
      </div>
    </div>
  );
});

SpinToReview.displayName = "SpinToReview";
