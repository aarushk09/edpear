import { BarChart, Users } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { CohortComparisonChartProps } from "./cohort-comparison-chart.types.js";

export const CohortComparisonChart = forwardRef<HTMLDivElement, CohortComparisonChartProps>((props, ref) => {
  const {
    data,
    studentLabel = "Student",
    cohortLabel = "Class Average",
    title = "Performance Comparison",
    maxScore = 100,
    className,
    ...rest
  } = props;

  if (!data || data.length === 0) return null;

  // We will build a horizontal double-bar chart
  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm p-6", className)}
      data-slot="cohort-comparison-chart"
      {...rest}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          <h3 className="font-semibold tracking-tight">{title}</h3>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-primary" />
            <span className="text-muted-foreground">{studentLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-muted-foreground/30" />
            <span className="text-muted-foreground">{cohortLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {data.map((item, i) => {
          const studentPct = Math.min(100, Math.max(0, (item.studentScore / maxScore) * 100));
          const cohortPct = Math.min(100, Math.max(0, (item.cohortAverage / maxScore) * 100));

          return (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>{item.label}</span>
              </div>
              
              <div className="relative flex flex-col gap-1">
                {/* Cohort Bar */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-full rounded-sm bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-muted-foreground/30 transition-all duration-1000 ease-out rounded-sm"
                      style={{ width: `${cohortPct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-mono text-muted-foreground">
                    {item.cohortAverage}
                  </span>
                </div>
                
                {/* Student Bar */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-full rounded-sm bg-primary/10 overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000 ease-out rounded-sm"
                      style={{ width: `${studentPct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-mono font-bold text-primary">
                    {item.studentScore}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 flex items-start gap-2 rounded-lg bg-muted/30 p-3 text-xs text-muted-foreground">
        <Users className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />
        <p>
          This chart compares the selected {studentLabel.toLowerCase()} against the {cohortLabel.toLowerCase()} across key metrics. Scores are out of {maxScore}.
        </p>
      </div>
    </div>
  );
});

CohortComparisonChart.displayName = "CohortComparisonChart";
