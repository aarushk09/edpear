import { Calendar, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { forwardRef, useRef } from "react";
import { cn } from "../../lib/cn.js";
import type { InteractiveTimelineProps } from "./interactive-timeline.types.js";

export const InteractiveTimeline = forwardRef<HTMLDivElement, InteractiveTimelineProps>((props, ref) => {
  const {
    nodes,
    onNodeClick,
    title = "Interactive Timeline",
    className,
    ...rest
  } = props;

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (!nodes || nodes.length === 0) return null;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
      data-slot="interactive-timeline"
      {...rest}
    >
      <div className="flex items-center justify-between border-b bg-muted/20 p-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="font-semibold tracking-tight">{title}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative py-12">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar px-12 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Continuous Center Line */}
          <div className="absolute top-[88px] left-0 right-0 h-1 bg-border pointer-events-none" />

          {nodes.map((node, index) => {
            const isTop = index % 2 === 0;

            return (
              <div 
                key={node.id} 
                className="relative flex min-w-[300px] shrink-0 snap-center flex-col items-center justify-center px-4"
              >
                {/* Connector Line */}
                <div 
                  className={cn(
                    "absolute w-px bg-border",
                    isTop ? "bottom-[50%] h-12" : "top-[50%] h-12"
                  )}
                />

                {/* Node Point */}
                <button
                  onClick={() => onNodeClick?.(node)}
                  className="absolute top-[50%] z-10 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-primary shadow-sm transition-transform hover:scale-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />

                {/* Content Card */}
                <div
                  className={cn(
                    "flex w-64 flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md",
                    isTop ? "mb-[100px]" : "mt-[100px]"
                  )}
                >
                  {node.imageUrl ? (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img src={node.imageUrl} alt="" className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-20 w-full items-center justify-center bg-muted/50 text-muted-foreground">
                      <ImageIcon className="h-6 w-6 opacity-50" />
                    </div>
                  )}
                  <div className="flex flex-col p-3">
                    <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {node.dateLabel}
                    </span>
                    <h4 className="font-semibold leading-tight">{node.title}</h4>
                    {node.description && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-3">
                        {node.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
});

InteractiveTimeline.displayName = "InteractiveTimeline";
