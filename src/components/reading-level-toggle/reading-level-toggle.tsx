import { BookOpen, BookOpenCheck, GraduationCap } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { ReadingLevel, ReadingLevelToggleProps } from "./reading-level-toggle.types.js";

export const ReadingLevelToggle = forwardRef<HTMLDivElement, ReadingLevelToggleProps>((props, ref) => {
  const {
    level: controlledLevel,
    defaultLevel = "intermediate",
    onChange,
    texts,
    title = "Reading Complexity",
    className,
    ...rest
  } = props;

  const [uncontrolledLevel, setUncontrolledLevel] = useState<ReadingLevel>(defaultLevel);
  const currentLevel = controlledLevel ?? uncontrolledLevel;

  const handleLevelChange = (newLevel: ReadingLevel) => {
    if (!controlledLevel) setUncontrolledLevel(newLevel);
    onChange?.(newLevel);
  };

  const LevelButton = ({ lvl, icon: Icon, label }: { lvl: ReadingLevel; icon: React.ElementType; label: string }) => {
    const isActive = currentLevel === lvl;
    return (
      <button
        onClick={() => handleLevelChange(lvl)}
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>
    );
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="reading-level-toggle"
      {...rest}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b bg-muted/20 p-4 gap-4">
        <h3 className="font-semibold tracking-tight text-sm text-muted-foreground">{title}</h3>
        
        <div className="flex w-full sm:w-auto rounded-lg bg-muted/50 p-1">
          <LevelButton lvl="beginner" icon={BookOpen} label="Simple" />
          <LevelButton lvl="intermediate" icon={BookOpenCheck} label="Standard" />
          <LevelButton lvl="advanced" icon={GraduationCap} label="Advanced" />
        </div>
      </div>

      <div className="p-6 text-base leading-relaxed transition-opacity animate-in fade-in duration-300">
        {texts[currentLevel]}
      </div>
    </div>
  );
});

ReadingLevelToggle.displayName = "ReadingLevelToggle";
