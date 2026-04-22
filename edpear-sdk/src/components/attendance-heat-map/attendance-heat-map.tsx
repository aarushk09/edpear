import { Activity, Calendar } from "lucide-react";
import { forwardRef, useMemo } from "react";
import { cn } from "../../lib/cn.js";
import type { AttendanceHeatMapProps } from "./attendance-heat-map.types.js";

// Helper to get all dates between two dates
const getDatesInRange = (startDate: Date, endDate: Date) => {
  const dates = [];
  const currentDate = new Date(startDate);
  
  // Normalize to midnight UTC to avoid daylight savings issues
  currentDate.setUTCHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setUTCHours(0, 0, 0, 0);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
  return dates;
};

export const AttendanceHeatMap = forwardRef<HTMLDivElement, AttendanceHeatMapProps>((props, ref) => {
  const {
    data,
    title = "Activity & Presence",
    startDate,
    endDate,
    maxCount,
    className,
    ...rest
  } = props;

  const resolvedEndDate = useMemo(() => endDate ? new Date(endDate) : new Date(), [endDate]);
  const resolvedStartDate = useMemo(() => {
    if (startDate) return new Date(startDate);
    // Default to ~3 months ago if not specified
    const d = new Date(resolvedEndDate);
    d.setMonth(d.getMonth() - 3);
    return d;
  }, [startDate, resolvedEndDate]);

  const dates = useMemo(() => getDatesInRange(resolvedStartDate, resolvedEndDate), [resolvedStartDate, resolvedEndDate]);
  
  // Group dates by week (columns)
  const weeks = useMemo(() => {
    const w: Date[][] = [];
    let currentWeek: Date[] = [];
    
    // Pad first week with nulls to align days of week
    if (dates.length > 0) {
      const firstDay = dates[0].getUTCDay(); // 0 is Sunday
      for (let i = 0; i < firstDay; i++) {
        currentWeek.push(new Date(0)); // Invalid date as padding
      }
    }

    dates.forEach(d => {
      currentWeek.push(d);
      if (currentWeek.length === 7) {
        w.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      w.push(currentWeek);
    }
    
    return w;
  }, [dates]);

  const dataMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach(d => map.set(d.date, d.count));
    return map;
  }, [data]);

  const calcMaxCount = maxCount ?? Math.max(1, ...data.map(d => d.count));

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-muted/30";
    const intensity = count / calcMaxCount;
    if (intensity < 0.25) return "bg-emerald-500/20";
    if (intensity < 0.5) return "bg-emerald-500/40";
    if (intensity < 0.75) return "bg-emerald-500/70";
    return "bg-emerald-500";
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm p-6 overflow-hidden", className)}
      data-slot="attendance-heat-map"
      {...rest}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-500" />
          <h3 className="font-semibold tracking-tight">{title}</h3>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-1.5">
          {/* Y Axis Labels (Days) */}
          <div className="flex flex-col gap-1.5 pt-6 text-[10px] font-medium text-muted-foreground mr-1">
            <div className="h-3 leading-none invisible">Sun</div>
            <div className="h-3 leading-none">Mon</div>
            <div className="h-3 leading-none invisible">Tue</div>
            <div className="h-3 leading-none">Wed</div>
            <div className="h-3 leading-none invisible">Thu</div>
            <div className="h-3 leading-none">Fri</div>
            <div className="h-3 leading-none invisible">Sat</div>
          </div>

          {/* Grid */}
          <div className="flex gap-1.5">
            {weeks.map((week, weekIdx) => {
              // Extract month label if it's the first week of the month
              const firstValidDate = week.find(d => d.getTime() !== 0);
              const showMonthLabel = firstValidDate && 
                (weekIdx === 0 || firstValidDate.getUTCDate() <= 7 && firstValidDate.getUTCDay() === 0);
              
              const monthLabel = showMonthLabel 
                ? firstValidDate.toLocaleString('default', { month: 'short' }) 
                : "";

              return (
                <div key={weekIdx} className="flex flex-col gap-1.5">
                  <div className="h-4 text-[10px] font-medium text-muted-foreground whitespace-nowrap overflow-visible">
                    {monthLabel}
                  </div>
                  {week.map((date, dayIdx) => {
                    if (date.getTime() === 0) {
                      return <div key={dayIdx} className="h-3 w-3 rounded-sm bg-transparent" />;
                    }

                    const dateStr = date.toISOString().split('T')[0];
                    const count = dataMap.get(dateStr) || 0;
                    
                    return (
                      <div
                        key={dateStr}
                        className={cn(
                          "h-3 w-3 rounded-[2px] transition-colors hover:ring-2 hover:ring-offset-1 hover:ring-offset-background hover:ring-foreground/50",
                          getColorClass(count)
                        )}
                        title={`${dateStr}: ${count} activity events`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>
            {resolvedStartDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} - 
            {" "}{resolvedEndDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="h-2.5 w-2.5 rounded-[2px] bg-muted/30" />
            <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500/20" />
            <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500/40" />
            <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500/70" />
            <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500" />
          </div>
          <span>More</span>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
});

AttendanceHeatMap.displayName = "AttendanceHeatMap";
