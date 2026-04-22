import { BookOpen, FileText, Play, HelpCircle, GraduationCap, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { forwardRef, useRef } from "react";
import { cn } from "../../lib/cn.js";
import type { RecommendationCarouselProps, RecommendationItem, RecommendationType } from "./recommendation-carousel.types.js";

const TYPE_ICONS: Record<RecommendationType, React.ElementType> = {
  course: GraduationCap,
  lesson: BookOpen,
  article: FileText,
  video: Play,
  quiz: HelpCircle,
};

const TYPE_LABELS: Record<RecommendationType, string> = {
  course: "Course",
  lesson: "Lesson",
  article: "Article",
  video: "Video",
  quiz: "Quiz",
};

export const RecommendationCarousel = forwardRef<HTMLDivElement, RecommendationCarouselProps>((props, ref) => {
  const {
    items,
    title = "Up Next For You",
    onItemClick,
    className,
    ...rest
  } = props;

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("w-full py-4 space-y-4", className)}
      data-slot="recommendation-carousel"
      {...rest}
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => {
          const Icon = TYPE_ICONS[item.type];
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item)}
              className="group relative flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border bg-card text-left shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              {item.thumbnailUrl ? (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={item.thumbnailUrl}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-muted/50 text-muted-foreground/50 transition-colors group-hover:bg-muted/80">
                  <Icon className="h-12 w-12" />
                </div>
              )}

              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{TYPE_LABELS[item.type]}</span>
                  </div>
                  
                  {item.matchScore && (
                    <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span>{item.matchScore}% MATCH</span>
                    </div>
                  )}
                </div>

                <h4 className="font-semibold leading-tight text-card-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-auto">
                    {item.description}
                  </p>
                )}

                {item.duration && (
                  <div className="mt-4 flex items-center text-xs text-muted-foreground font-medium">
                    {item.duration}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
});

RecommendationCarousel.displayName = "RecommendationCarousel";
