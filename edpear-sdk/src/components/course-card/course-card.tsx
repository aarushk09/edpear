import { BookOpen, ChevronRight } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "../../lib/cn.js";
import type { CourseCardProps } from "./course-card.types.js";

export const CourseCard = forwardRef<HTMLAnchorElement, CourseCardProps>(
  (
    {
      title,
      instructor,
      thumbnailSrc,
      thumbnailAlt = "",
      progress = 0,
      categoryTag,
      status,
      description,
      ctaLabel = "Open course",
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    const boundedProgress = Math.max(0, Math.min(progress, 100));
      const progressSegments = Array.from({ length: 10 }, (_, index) => index < Math.round(boundedProgress / 10));

    return (
      <a
        ref={ref}
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        data-slot="course-card"
        data-state={boundedProgress === 100 ? "completed" : "in-progress"}
        {...props}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {thumbnailSrc ? (
            <img
              alt={thumbnailAlt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={thumbnailSrc}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-lesson/15 via-primary/10 to-progress/20">
              {icon ?? <BookOpen className="h-10 w-10 text-primary" />}
            </div>
          )}
          <div className="absolute left-4 top-4 flex gap-2">
            {categoryTag ? (
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {categoryTag}
              </span>
            ) : null}
            {status ? (
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                {status}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {instructor}
            </div>
            <h3 className="text-xl font-semibold leading-tight">{title}</h3>
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{boundedProgress}%</span>
            </div>
            <div className="grid grid-cols-10 gap-1" data-slot="course-card-progress-track">
              {progressSegments.map((filled, index) => (
                <span
                  key={`segment-${index}`}
                  aria-hidden="true"
                  className={cn("h-2 rounded-full", filled ? "bg-progress" : "bg-muted")}
                />
              ))}
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between text-sm font-medium text-primary">
            <span>{ctaLabel}</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </a>
    );
  },
);

CourseCard.displayName = "CourseCard";
