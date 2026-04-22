import { AlertCircle, Clock } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { DeadlineCountdownProps } from "./deadline-countdown.types.js";

export const DeadlineCountdown = forwardRef<HTMLDivElement, DeadlineCountdownProps>((props, ref) => {
  const {
    targetDate,
    title = "Time Remaining",
    onExpire,
    className,
    ...rest
  } = props;

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        if (timeLeft?.total !== 0) {
          onExpire?.();
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire, timeLeft?.total]);

  if (!timeLeft) {
    return null;
  }

  const isCritical = timeLeft.total > 0 && timeLeft.total < 1000 * 60 * 60 * 24; // Less than 24 hours
  const isWarning = timeLeft.total >= 1000 * 60 * 60 * 24 && timeLeft.total < 1000 * 60 * 60 * 24 * 3; // 1 to 3 days
  const isExpired = timeLeft.total === 0;

  const statusClass = isExpired
    ? "border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400"
    : isCritical
    ? "border-rose-500/50 bg-rose-500/5 text-rose-600 dark:text-rose-400"
    : isWarning
    ? "border-amber-500/50 bg-amber-500/5 text-amber-600 dark:text-amber-400"
    : "border-border bg-card text-card-foreground";

  const Icon = isExpired || isCritical ? AlertCircle : Clock;

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-lg bg-background font-mono text-xl font-bold shadow-sm ring-1 ring-inset ring-foreground/10",
        (isCritical || isExpired) && "ring-rose-500/30 text-rose-600 dark:text-rose-400",
        isWarning && "ring-amber-500/30 text-amber-600 dark:text-amber-400"
      )}>
        {value.toString().padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center justify-center rounded-xl border p-6 text-center shadow-sm transition-colors duration-500", statusClass, className)}
      data-slot="deadline-countdown"
      {...rest}
    >
      <div className="mb-4 flex items-center justify-center gap-2">
        <Icon className={cn("h-5 w-5", isExpired || isCritical ? "animate-pulse" : "")} />
        <h3 className="text-sm font-medium tracking-tight">
          {isExpired ? "Deadline Passed" : title}
        </h3>
      </div>

      <div className="flex gap-3">
        {timeLeft.days > 0 && <TimeBlock value={timeLeft.days} label="Days" />}
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
});

DeadlineCountdown.displayName = "DeadlineCountdown";
