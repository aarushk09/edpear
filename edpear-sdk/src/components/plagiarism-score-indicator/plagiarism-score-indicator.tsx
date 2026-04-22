import { AlertTriangle, CheckCircle2, FileSearch, Link as LinkIcon, Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { PlagiarismScoreIndicatorProps } from "./plagiarism-score-indicator.types.js";

export const PlagiarismScoreIndicator = forwardRef<HTMLDivElement, PlagiarismScoreIndicatorProps>((props, ref) => {
  const {
    score,
    sources = [],
    status: explicitStatus,
    title = "Originality Report",
    className,
    ...rest
  } = props;

  const boundedScore = Math.min(100, Math.max(0, score));
  
  // Auto-calculate status if not provided
  let status = explicitStatus;
  if (!status) {
    if (boundedScore === 0 && sources.length === 0) status = "clear"; // Might be just low
    if (boundedScore < 15) status = "clear";
    else if (boundedScore < 30) status = "warning";
    else status = "danger";
  }

  // Circle Math
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (boundedScore / 100) * circumference;

  const getStatusColor = () => {
    if (status === "scanning") return "text-blue-500";
    if (status === "clear") return "text-emerald-500";
    if (status === "warning") return "text-amber-500";
    return "text-rose-500";
  };

  const getStatusBg = () => {
    if (status === "scanning") return "bg-blue-500/10 border-blue-500/20";
    if (status === "clear") return "bg-emerald-500/10 border-emerald-500/20";
    if (status === "warning") return "bg-amber-500/10 border-amber-500/20";
    return "bg-rose-500/10 border-rose-500/20";
  };

  const getStatusIcon = () => {
    if (status === "scanning") return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
    if (status === "clear") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (status === "warning") return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    return <AlertTriangle className="h-4 w-4 text-rose-500" />;
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="plagiarism-score-indicator"
      {...rest}
    >
      <div className={cn("flex items-center justify-between border-b p-4", getStatusBg())}>
        <div className="flex items-center gap-2">
          <FileSearch className={cn("h-5 w-5", getStatusColor())} />
          <h3 className="font-semibold tracking-tight">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-background/50 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-sm border">
          {getStatusIcon()}
          <span className="capitalize">{status}</span>
        </div>
      </div>

      <div className="flex p-5 gap-6 items-center">
        {/* Gauge */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          {/* Track */}
          <svg className="absolute h-full w-full rotate-[-90deg] transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted/50"
            />
            {/* Fill */}
            {status !== "scanning" && (
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className={cn("transition-all duration-1000 ease-out", getStatusColor())}
              />
            )}
          </svg>
          <div className="flex flex-col items-center justify-center text-center">
            {status === "scanning" ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <span className={cn("text-xl font-bold leading-none", getStatusColor())}>
                  {boundedScore}%
                </span>
                <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
                  Match
                </span>
              </>
            )}
          </div>
        </div>

        {/* Text / Sources */}
        <div className="flex flex-1 flex-col justify-center">
          {status === "scanning" ? (
            <p className="text-sm text-muted-foreground">
              Scanning document against academic databases and web sources...
            </p>
          ) : status === "clear" ? (
            <p className="text-sm text-muted-foreground">
              This document appears highly original. No significant matching text was found.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">
                Found matching text in {sources.length} {sources.length === 1 ? "source" : "sources"}.
              </p>
              
              <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-2">
                {sources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between gap-3 rounded bg-muted/30 px-2.5 py-1.5 text-xs">
                    <div className="flex items-center gap-1.5 truncate">
                      <LinkIcon className="h-3 w-3 shrink-0 text-muted-foreground" />
                      {source.url ? (
                        <a href={source.url} target="_blank" rel="noreferrer" className="truncate font-medium hover:underline hover:text-primary transition-colors">
                          {source.name}
                        </a>
                      ) : (
                        <span className="truncate font-medium">{source.name}</span>
                      )}
                    </div>
                    <span className="shrink-0 font-bold tabular-nums text-muted-foreground">
                      {source.matchPercentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

PlagiarismScoreIndicator.displayName = "PlagiarismScoreIndicator";
