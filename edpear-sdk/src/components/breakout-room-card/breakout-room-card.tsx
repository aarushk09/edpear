import { ArrowLeft, Clock, LogIn, Users } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { BreakoutRoomCardProps } from "./breakout-room-card.types.js";

export const BreakoutRoomCard = forwardRef<HTMLDivElement, BreakoutRoomCardProps>((props, ref) => {
  const {
    roomName,
    topic,
    members,
    expiresAt,
    status,
    onJoin,
    onReturnToMain,
    className,
    ...rest
  } = props;

  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;

    const calculateTimeLeft = () => {
      const difference = new Date(expiresAt).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsEnding(true);
        return "00:00";
      }

      setIsEnding(difference <= 60000); // ending if <= 1 min left

      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const displayStatus = isEnding && status === "in-progress" ? "ending" : status;

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full max-w-sm flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all",
        displayStatus === "ending" && "border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]",
        className
      )}
      data-slot="breakout-room-card"
      {...rest}
    >
      <div className={cn(
        "flex flex-col gap-1 p-5 border-b",
        displayStatus === "assigned" && "bg-primary/5",
        displayStatus === "in-progress" && "bg-emerald-500/5 border-emerald-500/20",
        displayStatus === "ending" && "bg-rose-500/5 border-rose-500/20"
      )}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Users className={cn(
              "h-5 w-5",
              displayStatus === "assigned" && "text-primary",
              displayStatus === "in-progress" && "text-emerald-600 dark:text-emerald-400",
              displayStatus === "ending" && "text-rose-600 dark:text-rose-400"
            )} />
            <h3 className="font-semibold tracking-tight">{roomName}</h3>
          </div>
          <span className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            displayStatus === "assigned" && "bg-primary/10 text-primary",
            displayStatus === "in-progress" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            displayStatus === "ending" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 animate-pulse"
          )}>
            {displayStatus.replace("-", " ")}
          </span>
        </div>
        {topic && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            <span className="font-medium text-foreground">Topic:</span> {topic}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3 block">
            Members ({members.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-1.5 rounded-full border bg-muted/30 px-2 py-1 text-xs font-medium"
                title={member.name}
              >
                {member.avatarUrl ? (
                  <img src={member.avatarUrl} alt="" className="h-4 w-4 rounded-full object-cover" />
                ) : (
                  <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                    {member.name.charAt(0)}
                  </div>
                )}
                <span className="truncate max-w-[80px]">{member.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            {timeLeft ? (
              <div className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-sm font-semibold",
                displayStatus === "ending" 
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" 
                  : "bg-muted text-muted-foreground"
              )}>
                <Clock className={cn("h-4 w-4", displayStatus === "ending" && "animate-pulse")} />
                {timeLeft}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">No time limit</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {status === "assigned" && (
              <button
                onClick={onJoin}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm"
              >
                <LogIn className="h-4 w-4" />
                Join Room
              </button>
            )}
            
            {(status === "in-progress" || status === "ending") && (
              <button
                onClick={onReturnToMain}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Main
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

BreakoutRoomCard.displayName = "BreakoutRoomCard";
