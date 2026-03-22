import { PlayCircle } from "lucide-react";
import { forwardRef, useMemo, useRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { VideoLessonProps } from "./video-lesson.types.js";

export const VideoLesson = forwardRef<HTMLDivElement, VideoLessonProps>(
  ({ title, src, youtubeId, chapters = [], onProgressChange, className, ...props }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [currentTime, setCurrentTime] = useState(0);

    const activeChapterId = useMemo(() => {
      const sorted = [...chapters].sort((left, right) => left.time - right.time);
      return (
        sorted.reduce<string | null>((active, chapter) => {
          if (currentTime >= chapter.time) {
            return chapter.id;
          }
          return active;
        }, sorted[0]?.id ?? null) ?? null
      );
    }, [chapters, currentTime]);

    return (
      <div
        ref={ref}
        className={cn("rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
        data-slot="video-lesson"
        {...props}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-md bg-primary/10 p-3 text-primary border border-primary/20">
            <PlayCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {youtubeId ? "YouTube embed" : "Native video lesson"}
            </p>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="overflow-hidden rounded-md border bg-muted/50">
            {src ? (
              <video
                ref={videoRef}
                className="aspect-video w-full"
                controls
                src={src}
                onTimeUpdate={(event) => {
                  const nextTime = event.currentTarget.currentTime;
                  setCurrentTime(nextTime);
                  onProgressChange?.(nextTime);
                }}
              />
            ) : youtubeId ? (
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={title}
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-muted text-sm text-muted-foreground">
                Supply either a video `src` or a `youtubeId`.
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="text-sm font-medium">Chapters</div>
            <div className="space-y-2">
              {chapters.length === 0 ? (
                <div className="rounded-md border bg-muted/50 p-4 text-sm text-muted-foreground">
                  Add `chapters` to render clickable markers.
                </div>
              ) : (
                chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition-colors",
                      chapter.id === activeChapterId
                        ? "border-primary bg-primary/5 text-primary"
                        : "bg-background hover:bg-muted text-foreground",
                    )}
                    type="button"
                    onClick={() => {
                      if (!videoRef.current) return;
                      videoRef.current.currentTime = chapter.time;
                      videoRef.current.play().catch(() => undefined);
                    }}
                  >
                    <span className="font-medium">{chapter.label}</span>
                    <span className="text-muted-foreground">{Math.floor(chapter.time)}s</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

VideoLesson.displayName = "VideoLesson";
