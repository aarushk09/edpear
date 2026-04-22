import { CheckCircle2, Map as MapIcon, XCircle } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { GeoMapQuizProps } from "./geo-map-quiz.types.js";

export const GeoMapQuiz = forwardRef<HTMLDivElement, GeoMapQuizProps>((props, ref) => {
  const {
    regions,
    targetRegionId,
    onRegionClick,
    title = "Map Quiz",
    instruction,
    viewBox = "0 0 1000 600",
    className,
    ...rest
  } = props;

  const [clickedRegionId, setClickedRegionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const targetRegion = regions.find((r) => r.id === targetRegionId);

  // Reset state if target changes
  useEffect(() => {
    setClickedRegionId(null);
    setIsCorrect(null);
  }, [targetRegionId]);

  const handleRegionClick = (id: string) => {
    if (isCorrect) return; // Don't allow clicks if already got it right
    
    setClickedRegionId(id);
    
    let correct = false;
    if (targetRegionId) {
      correct = id === targetRegionId;
      setIsCorrect(correct);
    }
    
    onRegionClick?.(id, correct);
  };

  const defaultInstruction = targetRegion ? `Find and click on: ${targetRegion.name}` : "Click a region to identify it";

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="geo-map-quiz"
      {...rest}
    >
      <div className="flex flex-col gap-2 border-b p-5">
        <div className="flex items-center gap-2 text-primary">
          <MapIcon className="h-5 w-5" />
          <h3 className="text-xl font-semibold tracking-tight leading-snug">{title}</h3>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {instruction || defaultInstruction}
        </p>
      </div>

      <div className="relative flex-1 overflow-hidden p-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-center min-h-[300px]">
        {regions.length === 0 ? (
          <div className="text-sm text-muted-foreground">No map regions provided.</div>
        ) : (
          <svg
            viewBox={viewBox}
            className="w-full h-auto max-h-[500px] drop-shadow-sm"
            preserveAspectRatio="xMidYMid meet"
          >
            {regions.map((region) => {
              const isClicked = clickedRegionId === region.id;
              const isTarget = targetRegionId === region.id;
              
              let fillClass = "fill-slate-300 dark:fill-slate-700 hover:fill-slate-400 dark:hover:fill-slate-600";
              
              if (isClicked) {
                if (targetRegionId) {
                  fillClass = isCorrect ? "fill-emerald-500" : "fill-rose-500";
                } else {
                  fillClass = "fill-primary";
                }
              } else if (isTarget && isCorrect === false) {
                // Flash target if they got it wrong? Or leave it. Let's just color clicked.
              }

              return (
                <path
                  key={region.id}
                  d={region.d}
                  onClick={() => handleRegionClick(region.id)}
                  className={cn(
                    "cursor-pointer stroke-white dark:stroke-slate-950 stroke-[2px] transition-colors duration-300",
                    fillClass
                  )}
                >
                  <title>{region.name}</title>
                </path>
              );
            })}
          </svg>
        )}
      </div>

      {(clickedRegionId || targetRegionId) && (
        <div className="border-t bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isCorrect === true && (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Correct!</span>
                </div>
              )}
              {isCorrect === false && (
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium">
                  <XCircle className="h-5 w-5" />
                  <span>Incorrect. Try again.</span>
                </div>
              )}
              {!targetRegionId && clickedRegionId && (
                <div className="text-sm font-medium">
                  Selected: {regions.find(r => r.id === clickedRegionId)?.name}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

GeoMapQuiz.displayName = "GeoMapQuiz";
