import { BarChart3, CheckCircle2, Circle, Lock, Unlock } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { PollWidgetProps } from "./poll-widget.types.js";

export const PollWidget = forwardRef<HTMLDivElement, PollWidgetProps>((props, ref) => {
  const {
    question,
    options,
    status,
    totalVotes,
    userVoteId,
    onVote,
    isInstructor,
    onClosePoll,
    onShowResults,
    className,
    ...rest
  } = props;

  const actualTotalVotes = totalVotes ?? options.reduce((acc, opt) => acc + opt.votes, 0);

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="poll-widget"
      {...rest}
    >
      <div className="flex flex-col gap-2 border-b p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span>Live Poll</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
            {status === "open" ? (
              <><span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Open</>
            ) : status === "closed" ? (
              <><Lock className="h-3 w-3 text-muted-foreground" /> Closed</>
            ) : (
              <><BarChart3 className="h-3 w-3 text-primary" /> Results</>
            )}
          </div>
        </div>
        <h3 className="text-xl font-semibold tracking-tight leading-snug">{question}</h3>
      </div>

      <div className="flex flex-col gap-3 p-5">
        {options.map((option) => {
          const isSelected = userVoteId === option.id;
          const percentage = actualTotalVotes > 0 ? Math.round((option.votes / actualTotalVotes) * 100) : 0;
          const showResults = status === "results";
          
          return (
            <button
              key={option.id}
              onClick={() => status === "open" && onVote?.(option.id)}
              disabled={status !== "open"}
              className={cn(
                "relative flex w-full flex-col items-start justify-center overflow-hidden rounded-lg border p-3 transition-all",
                status === "open" ? "hover:border-primary hover:bg-muted/50 cursor-pointer" : "cursor-default",
                isSelected && status === "open" && "border-primary bg-primary/5 ring-1 ring-primary"
              )}
            >
              {/* Background Bar Chart */}
              {showResults && (
                <div
                  className="absolute bottom-0 left-0 top-0 bg-primary/10 transition-all duration-1000 ease-out dark:bg-primary/20"
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative z-10 flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {status === "open" && (
                    isSelected ? (
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/50 shrink-0" />
                    )
                  )}
                  <span className={cn(
                    "font-medium text-left",
                    isSelected && "text-primary"
                  )}>
                    {option.label}
                  </span>
                </div>

                {showResults && (
                  <span className="font-bold text-muted-foreground tabular-nums">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t bg-muted/20 p-4">
        <span className="text-sm font-medium text-muted-foreground">
          {actualTotalVotes} {actualTotalVotes === 1 ? "vote" : "votes"}
        </span>

        {isInstructor && (
          <div className="flex items-center gap-2">
            {status === "open" && (
              <button
                onClick={onClosePoll}
                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border bg-background px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Lock className="h-3.5 w-3.5" />
                Close Poll
              </button>
            )}
            {(status === "open" || status === "closed") && (
              <button
                onClick={onShowResults}
                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Reveal Results
              </button>
            )}
            {status === "results" && (
              <button
                onClick={onClosePoll}
                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border bg-background px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Unlock className="h-3.5 w-3.5" />
                Reopen
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

PollWidget.displayName = "PollWidget";
