import { AlertTriangle, BookOpen, ExternalLink, X } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { KnowledgeGapAlertProps } from "./knowledge-gap-alert.types.js";

export const KnowledgeGapAlert = forwardRef<HTMLDivElement, KnowledgeGapAlertProps>((props, ref) => {
  const {
    gaps,
    title = "Prerequisite Gaps Detected",
    onRemedyClick,
    onDismiss,
    className,
    ...rest
  } = props;

  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || gaps.length === 0) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-xl border border-amber-500/50 bg-amber-500/10 p-5 text-amber-900 shadow-sm dark:text-amber-200 animate-in fade-in slide-in-from-top-2",
        className
      )}
      data-slot="knowledge-gap-alert"
      {...rest}
    >
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-4 rounded-md p-1 opacity-70 transition-opacity hover:bg-amber-500/20 hover:opacity-100"
        aria-label="Dismiss alert"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex gap-4">
        <div className="mt-0.5 shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        
        <div className="space-y-4 flex-1">
          <div>
            <h3 className="font-semibold leading-none tracking-tight text-amber-800 dark:text-amber-300">
              {title}
            </h3>
            <p className="mt-1 text-sm text-amber-700/90 dark:text-amber-200/80">
              Before starting this lesson, we recommend reviewing the following concepts to ensure you're fully prepared.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {gaps.map((gap) => (
              <div
                key={gap.id}
                className="flex flex-col gap-2 rounded-lg bg-amber-500/10 p-3 border border-amber-500/20"
              >
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium leading-none">{gap.topic}</h4>
                    {gap.description && (
                      <p className="mt-1 text-xs text-amber-700/80 dark:text-amber-200/70 line-clamp-2">
                        {gap.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {(gap.remedyUrl || onRemedyClick) && (
                  <button
                    onClick={() => {
                      if (onRemedyClick) {
                        onRemedyClick(gap);
                      } else if (gap.remedyUrl) {
                        window.open(gap.remedyUrl, "_blank");
                      }
                    }}
                    className="inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-amber-800 bg-amber-500/20 hover:bg-amber-500/30 transition-colors dark:text-amber-200 dark:bg-amber-500/20 dark:hover:bg-amber-500/40 ml-6"
                  >
                    <span>{gap.remedyLabel ?? "Review Material"}</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

KnowledgeGapAlert.displayName = "KnowledgeGapAlert";
