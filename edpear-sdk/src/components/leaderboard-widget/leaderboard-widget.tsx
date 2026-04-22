import { ChevronDown, ChevronUp, EyeOff, Minus, Trophy, UserCircle } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { LeaderboardScope, LeaderboardWidgetProps } from "./leaderboard-widget.types.js";

export const LeaderboardWidget = forwardRef<HTMLDivElement, LeaderboardWidgetProps>((props, ref) => {
  const {
    entries,
    scope = "class",
    onScopeChange,
    title = "Leaderboard",
    optOutSupport = false,
    onOptOut,
    className,
    ...rest
  } = props;

  const sortedEntries = [...entries].sort((a, b) => a.rank - b.rank);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    if (rank === 2) return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    if (rank === 3) return "text-amber-700 bg-amber-700/10 border-amber-700/20 dark:text-amber-600 dark:bg-amber-600/10 dark:border-amber-600/20";
    return "text-muted-foreground bg-muted/50 border-transparent";
  };

  const Scopes: LeaderboardScope[] = ["class", "cohort", "global"];

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="leaderboard-widget"
      {...rest}
    >
      <div className="flex flex-col gap-4 border-b p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="font-semibold tracking-tight">{title}</h3>
          </div>
          
          {optOutSupport && (
            <button
              onClick={onOptOut}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Opt out of leaderboard"
            >
              <EyeOff className="h-3.5 w-3.5" />
              <span>Hide Me</span>
            </button>
          )}
        </div>

        <div className="flex rounded-lg bg-muted/50 p-1">
          {Scopes.map((s) => (
            <button
              key={s}
              onClick={() => onScopeChange?.(s)}
              className={cn(
                "flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all",
                scope === s
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col p-2">
        {sortedEntries.map((entry) => {
          const rankColor = getRankColor(entry.rank);
          
          return (
            <div
              key={entry.id}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50",
                entry.isCurrentUser && "bg-primary/5 hover:bg-primary/10 border border-primary/20"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold shadow-sm",
                rankColor
              )}>
                {entry.rank}
              </div>

              <div className="flex shrink-0 items-center justify-center">
                {entry.avatarUrl ? (
                  <img src={entry.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover shadow-sm border border-border/50" />
                ) : (
                  <UserCircle className="h-10 w-10 text-muted-foreground opacity-50" />
                )}
              </div>

              <div className="flex flex-1 flex-col">
                <span className={cn(
                  "font-medium leading-tight",
                  entry.isCurrentUser && "text-primary"
                )}>
                  {entry.name}
                  {entry.isCurrentUser && " (You)"}
                </span>
                <span className="text-xs text-muted-foreground">{entry.score.toLocaleString()} pts</span>
              </div>

              {entry.trend && (
                <div className="flex w-6 shrink-0 justify-center">
                  {entry.trend === "up" ? (
                    <ChevronUp className="h-4 w-4 text-emerald-500" />
                  ) : entry.trend === "down" ? (
                    <ChevronDown className="h-4 w-4 text-rose-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              )}
            </div>
          );
        })}
        
        {sortedEntries.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No entries for this scope.
          </div>
        )}
      </div>
    </div>
  );
});

LeaderboardWidget.displayName = "LeaderboardWidget";
