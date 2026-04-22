import { Captions, Search, Volume2 } from "lucide-react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { LectureCaptionOverlayProps } from "./lecture-caption-overlay.types.js";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const LectureCaptionOverlay = forwardRef<HTMLDivElement, LectureCaptionOverlayProps>((props, ref) => {
  const {
    captions,
    currentTime,
    onSeek,
    children,
    showTranscriptPanel = true,
    isLive = false,
    className,
    ...rest
  } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Find the currently active caption
  const activeCaption = useMemo(() => {
    return captions.find(
      (c) => currentTime >= c.startTime && currentTime <= c.endTime
    );
  }, [captions, currentTime]);

  const activeCaptionId = activeCaption?.id;

  // Filter captions for the transcript panel based on search
  const filteredCaptions = useMemo(() => {
    if (!searchQuery.trim()) return captions;
    const lowerQuery = searchQuery.toLowerCase();
    return captions.filter(
      (c) =>
        c.text.toLowerCase().includes(lowerQuery) ||
        (c.speakerName && c.speakerName.toLowerCase().includes(lowerQuery))
    );
  }, [captions, searchQuery]);

  // Auto-scroll transcript to active caption if not searching
  useEffect(() => {
    if (!searchQuery && activeCaptionId && transcriptRef.current) {
      const activeEl = transcriptRef.current.querySelector(`[data-caption-id="${activeCaptionId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeCaptionId, searchQuery]);

  return (
    <div
      ref={ref}
      className={cn("flex flex-col lg:flex-row gap-4 w-full h-full max-h-[800px]", className)}
      data-slot="lecture-caption-overlay"
      {...rest}
    >
      {/* Video Area */}
      <div className="relative flex-1 bg-black rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
        {children}

        {/* Caption Overlay */}
        {activeCaption && (
          <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none px-8">
            <div className="max-w-3xl bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-lg border border-white/10 text-center animate-in fade-in zoom-in duration-200">
              {activeCaption.speakerName && (
                <span className="block text-xs font-semibold text-white/70 mb-1 uppercase tracking-wider">
                  {activeCaption.speakerName}
                </span>
              )}
              <p className="text-lg md:text-xl lg:text-2xl font-medium leading-snug drop-shadow-md">
                {activeCaption.text}
              </p>
            </div>
          </div>
        )}

        {isLive && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-rose-500/90 text-white px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
            Live
          </div>
        )}
      </div>

      {/* Transcript Panel */}
      {showTranscriptPanel && (
        <div className="flex flex-col w-full lg:w-80 xl:w-96 rounded-xl border bg-card text-card-foreground shadow-sm h-full max-h-[400px] lg:max-h-full overflow-hidden">
          <div className="flex items-center gap-2 border-b p-4 bg-muted/30">
            <Captions className="h-5 w-5 text-primary" />
            <h3 className="font-semibold tracking-tight">Transcript</h3>
          </div>

          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transcript..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div 
            ref={transcriptRef}
            className="flex-1 overflow-y-auto p-2 space-y-1 scroll-smooth"
          >
            {filteredCaptions.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-8">
                No matching captions found.
              </div>
            ) : (
              filteredCaptions.map((caption) => {
                const isActive = caption.id === activeCaptionId;
                
                return (
                  <button
                    key={caption.id}
                    data-caption-id={caption.id}
                    onClick={() => onSeek?.(caption.startTime)}
                    className={cn(
                      "flex w-full flex-col items-start gap-1 rounded-md p-3 text-left text-sm transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      {caption.speakerName ? (
                        <span className={cn(
                          "font-semibold text-xs uppercase tracking-wider",
                          isActive ? "text-primary/80" : "text-foreground/70"
                        )}>
                          {caption.speakerName}
                        </span>
                      ) : (
                        <Volume2 className="h-3.5 w-3.5 opacity-50" />
                      )}
                      
                      <span className="text-[10px] font-mono opacity-60">
                        {formatTime(caption.startTime)}
                      </span>
                    </div>
                    
                    <p className={cn(
                      "leading-snug",
                      isActive && "font-medium"
                    )}>
                      {caption.text}
                    </p>
                  </button>
                );
              })
            )}
            
            {isLive && !searchQuery && (
              <div className="flex items-center gap-2 p-3 text-xs font-medium text-muted-foreground animate-pulse">
                Listening for captions...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

LectureCaptionOverlay.displayName = "LectureCaptionOverlay";
