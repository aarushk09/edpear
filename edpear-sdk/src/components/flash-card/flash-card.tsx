import { Repeat2 } from "lucide-react";
import { forwardRef, useRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { FlashCardProps } from "./flash-card.types.js";

export const FlashCard = forwardRef<HTMLDivElement, FlashCardProps>(
  (
    {
      front,
      back,
      flipped,
      defaultFlipped = false,
      onFlippedChange,
      swipeable = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalFlipped, setInternalFlipped] = useState(defaultFlipped);
    const pointerStartX = useRef<number | null>(null);
    const isFlipped = flipped ?? internalFlipped;

    const updateFlip = (nextValue: boolean) => {
      if (flipped === undefined) {
        setInternalFlipped(nextValue);
      }
      onFlippedChange?.(nextValue);
    };

    return (
      <div
        ref={ref}
        className={cn("group perspective-[1200px]", className)}
        data-slot="flash-card"
        data-state={isFlipped ? "back" : "front"}
        {...props}
      >
        <button
          className="relative h-72 w-full rounded-xl border bg-card text-left text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          type="button"
          onClick={() => updateFlip(!isFlipped)}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              updateFlip(!isFlipped);
            }
          }}
          onPointerDown={(event) => {
            if (!swipeable) return;
            pointerStartX.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (!swipeable || pointerStartX.current === null) return;
            if (Math.abs(event.clientX - pointerStartX.current) > 40) {
              updateFlip(!isFlipped);
            }
            pointerStartX.current = null;
          }}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-xl p-6 transition-all duration-300 [transform-style:preserve-3d]",
              isFlipped && "[transform:rotateY(180deg)]",
            )}
          >
            <div className="absolute inset-0 flex h-full flex-col justify-between rounded-xl bg-card p-6 [backface-visibility:hidden] border">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Front
              </div>
              <div className="text-lg font-medium">{front}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Repeat2 className="h-4 w-4" />
                <span>Tap, swipe, or use arrow keys to flip</span>
              </div>
            </div>
            <div className="absolute inset-0 flex h-full flex-col justify-between rounded-xl bg-card p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] border">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Back
              </div>
              <div className="text-lg font-medium">{back}</div>
              <div className="text-sm text-muted-foreground">Keep going until this answer feels instant.</div>
            </div>
          </div>
        </button>
      </div>
    );
  },
);

FlashCard.displayName = "FlashCard";
