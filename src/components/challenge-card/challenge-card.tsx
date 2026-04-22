import { Check, CheckCircle2, Clock, Coins, Flame, Star, Trophy, X } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { ChallengeCardProps, ChallengeStatus } from "./challenge-card.types.js";

export const ChallengeCard = forwardRef<HTMLDivElement, ChallengeCardProps>((props, ref) => {
  const {
    title,
    description,
    expiresAt,
    reward,
    status = "pending",
    onAccept,
    onDecline,
    className,
    ...rest
  } = props;

  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (status !== "pending" && status !== "accepted") return;

    const calculateTimeLeft = () => {
      const difference = new Date(expiresAt).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return "Expired";
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h`;
      }
      
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}m ${seconds}s`;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, status]);

  const currentStatus: ChallengeStatus = isExpired && (status === "pending" || status === "accepted") ? "expired" : status;

  const getRewardIcon = () => {
    if (reward.iconUrl) return <img src={reward.iconUrl} alt="Reward" className="h-5 w-5 rounded-full object-cover" />;
    if (reward.type === "xp") return <Star className="h-4 w-4 text-amber-500 fill-current" />;
    if (reward.type === "currency") return <Coins className="h-4 w-4 text-yellow-500 fill-current" />;
    if (reward.type === "badge") return <Trophy className="h-4 w-4 text-blue-500 fill-current" />;
    return <Flame className="h-4 w-4 text-orange-500 fill-current" />;
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all",
        currentStatus === "pending" && "border-primary/30 shadow-md hover:border-primary/50",
        currentStatus === "accepted" && "border-amber-500/50 bg-amber-500/5",
        currentStatus === "completed" && "border-emerald-500/50 bg-emerald-500/5",
        currentStatus === "declined" && "opacity-70 bg-muted/50",
        currentStatus === "expired" && "opacity-70 bg-muted/50",
        className
      )}
      data-slot="challenge-card"
      {...rest}
    >
      {/* Top Accent Bar */}
      <div className={cn(
        "h-1.5 w-full",
        currentStatus === "pending" && "bg-gradient-to-r from-primary to-purple-500",
        currentStatus === "accepted" && "bg-amber-500",
        currentStatus === "completed" && "bg-emerald-500",
        (currentStatus === "declined" || currentStatus === "expired") && "bg-muted-foreground/30"
      )} />

      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold leading-tight tracking-tight">{title}</h3>
              {currentStatus === "pending" && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Bonus
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center justify-center rounded-lg border bg-muted/30 p-2 shadow-sm min-w-[64px]">
            {getRewardIcon()}
            <span className="mt-1 text-xs font-bold leading-none tracking-tight">
              +{reward.amount.toLocaleString()}
            </span>
            {reward.label && <span className="mt-0.5 text-[9px] uppercase text-muted-foreground">{reward.label}</span>}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            {currentStatus === "completed" ? (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Challenge Complete
              </span>
            ) : currentStatus === "expired" ? (
              <span className="flex items-center gap-1.5 opacity-70">
                <Clock className="h-4 w-4" />
                Expired
              </span>
            ) : currentStatus === "declined" ? (
              <span className="flex items-center gap-1.5 opacity-70">
                <X className="h-4 w-4" />
                Declined
              </span>
            ) : (
              <span className={cn(
                "flex items-center gap-1.5",
                currentStatus === "accepted" ? "text-amber-600 dark:text-amber-400" : ""
              )}>
                <Clock className={cn("h-4 w-4", currentStatus === "accepted" && "animate-pulse")} />
                {timeLeft} left
              </span>
            )}
          </div>

          {currentStatus === "pending" && (
            <div className="flex items-center gap-2">
              <button
                onClick={onDecline}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Decline challenge"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={onAccept}
                className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm"
              >
                Accept
              </button>
            </div>
          )}

          {currentStatus === "accepted" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
              In Progress
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ChallengeCard.displayName = "ChallengeCard";
