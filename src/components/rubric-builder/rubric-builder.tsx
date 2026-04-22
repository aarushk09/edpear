import { CheckCircle2, TableProperties } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { RubricBuilderProps } from "./rubric-builder.types.js";

export const RubricBuilder = forwardRef<HTMLDivElement, RubricBuilderProps>((props, ref) => {
  const {
    criteria,
    levels,
    cells,
    readOnly = false,
    selectedCells = {},
    onSelectCell,
    title = "Grading Rubric",
    className,
    ...rest
  } = props;

  // Sort levels by points descending
  const sortedLevels = [...levels].sort((a, b) => b.points - a.points);

  const getCellDescription = (criterionId: string, levelId: string) => {
    return cells.find((c) => c.criterionId === criterionId && c.levelId === levelId)?.description || "";
  };

  const calculateTotalScore = () => {
    let total = 0;
    for (const [, levelId] of Object.entries(selectedCells)) {
      const level = levels.find((l) => l.id === levelId);
      if (level) total += level.points;
    }
    return total;
  };

  const maxPossibleScore = criteria.length > 0 && levels.length > 0
    ? criteria.length * Math.max(...levels.map((l) => l.points))
    : 0;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden w-full", className)}
      data-slot="rubric-builder"
      {...rest}
    >
      <div className="flex items-center justify-between border-b bg-muted/20 p-5">
        <div className="flex items-center gap-2">
          <TableProperties className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        
        {!readOnly && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Total Score:</span>
            <span className="inline-flex items-center justify-center rounded-md bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
              {calculateTotalScore()} / {maxPossibleScore}
            </span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto p-5">
        <div className="min-w-[800px] border rounded-lg overflow-hidden bg-background">
          {/* Header Row */}
          <div className="grid border-b bg-muted/50" style={{ gridTemplateColumns: `250px repeat(${sortedLevels.length}, minmax(0, 1fr))` }}>
            <div className="p-4 font-semibold text-sm border-r">Criteria</div>
            {sortedLevels.map((level) => (
              <div key={level.id} className="p-4 flex flex-col items-center justify-center text-center border-r last:border-r-0">
                <span className="font-bold">{level.label}</span>
                <span className="text-xs font-medium text-muted-foreground mt-1">{level.points} pts</span>
              </div>
            ))}
          </div>

          {/* Body Rows */}
          {criteria.map((criterion) => (
            <div 
              key={criterion.id} 
              className="grid border-b last:border-b-0" 
              style={{ gridTemplateColumns: `250px repeat(${sortedLevels.length}, minmax(0, 1fr))` }}
            >
              <div className="p-4 border-r bg-muted/10">
                <h4 className="font-medium text-sm leading-snug">{criterion.name}</h4>
                {criterion.description && (
                  <p className="mt-2 text-xs text-muted-foreground">{criterion.description}</p>
                )}
              </div>

              {sortedLevels.map((level) => {
                const isSelected = selectedCells[criterion.id] === level.id;
                
                return (
                  <div 
                    key={level.id} 
                    className={cn(
                      "p-3 border-r last:border-r-0 transition-colors relative",
                      !readOnly && "cursor-pointer hover:bg-muted/30",
                      isSelected && "bg-primary/5 ring-1 ring-inset ring-primary/20"
                    )}
                    onClick={() => !readOnly && onSelectCell?.(criterion.id, level.id)}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 text-primary animate-in zoom-in duration-200">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    )}
                    <p className={cn(
                      "text-xs leading-relaxed",
                      isSelected ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {getCellDescription(criterion.id, level.id)}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

RubricBuilder.displayName = "RubricBuilder";
