import { Star } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { XPProgressBarProps } from "./xp-progress-bar.types.js";

export const XPProgressBar = forwardRef<HTMLDivElement, XPProgressBarProps>((props, ref) => {
  const {
    currentXP,
    nextLevelXP,
    level,
    animateOnChange = true,
    label = "Experience",
    className,
    ...rest
  } = props;

  const [displayXP, setDisplayXP] = useState(currentXP);
  const [displayLevel, setDisplayLevel] = useState(level);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [isGaining, setIsGaining] = useState(false);

  useEffect(() => {
    if (!animateOnChange) {
      setDisplayXP(currentXP);
      setDisplayLevel(level);
      return;
    }

    if (currentXP > displayXP || level > displayLevel) {
      setIsGaining(true);
      
      if (level > displayLevel) {
        setIsLevelingUp(true);
        // Animate bar to 100% first
        setDisplayXP(nextLevelXP);
        
        setTimeout(() => {
          // Then switch level and reset bar
          setDisplayLevel(level);
          setDisplayXP(0);
          
          setTimeout(() => {
            // Then animate to current XP
            setDisplayXP(currentXP);
            setIsLevelingUp(false);
          }, 300);
        }, 500);
      } else {
        setDisplayXP(currentXP);
      }

      const timer = setTimeout(() => {
        setIsGaining(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setDisplayXP(currentXP);
      setDisplayLevel(level);
    }
  }, [currentXP, level, nextLevelXP, animateOnChange]);

  const progress = Math.min(100, Math.max(0, (displayXP / nextLevelXP) * 100));

  return (
    <div
      ref={ref}
      className={cn("flex w-full items-center gap-3", className)}
      data-slot="xp-progress-bar"
      {...rest}
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        <Star
          className={cn(
            "absolute h-10 w-10 text-amber-500 transition-all duration-500",
            isLevelingUp ? "scale-150 rotate-180 opacity-0" : "scale-100 rotate-0 opacity-100"
          )}
          fill="currentColor"
        />
        <Star
          className={cn(
            "absolute h-10 w-10 text-amber-500 transition-all duration-500",
            isLevelingUp ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0"
          )}
          fill="currentColor"
        />
        <span className="relative z-10 text-sm font-bold text-amber-900">{displayLevel}</span>
      </div>

      <div className="flex flex-1 flex-col justify-center space-y-1">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-muted-foreground uppercase tracking-wider">{label}</span>
          <span className={cn(
            "transition-colors duration-300",
            isGaining ? "text-amber-500" : "text-muted-foreground"
          )}>
            {displayXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
          </span>
        </div>

        <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "absolute bottom-0 left-0 top-0 rounded-full transition-all duration-500 ease-out",
              isLevelingUp ? "bg-amber-400" : "bg-amber-500"
            )}
            style={{ width: `${progress}%` }}
          />
          
          {/* Shine effect when gaining XP */}
          <div
            className={cn(
              "absolute bottom-0 left-0 top-0 w-[50px] -translate-x-[50px] bg-white/40",
              isGaining && "animate-shine"
            )}
            style={{
              animation: isGaining ? "shine 1s ease-out forwards" : "none",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(400px); }
        }
      `}</style>
    </div>
  );
});

XPProgressBar.displayName = "XPProgressBar";
