import { Plus, Target, Trash2 } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { CheckInCadence, GoalData, GoalMilestone, GoalSetterProps } from "./goal-setter.types.js";

export const GoalSetter = forwardRef<HTMLDivElement, GoalSetterProps>((props, ref) => {
  const { onSave, onCancel, className, ...rest } = props;

  const [title, setTitle] = useState("");
  const [completionCriteria, setCompletionCriteria] = useState("");
  const [checkInCadence, setCheckInCadence] = useState<CheckInCadence>("weekly");
  const [milestones, setMilestones] = useState<GoalMilestone[]>([]);
  const [newMilestoneText, setNewMilestoneText] = useState("");

  const handleAddMilestone = () => {
    if (newMilestoneText.trim()) {
      setMilestones([
        ...milestones,
        { id: Math.random().toString(36).substr(2, 9), title: newMilestoneText.trim() },
      ]);
      setNewMilestoneText("");
    }
  };

  const handleRemoveMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const handleSave = () => {
    if (!title.trim() || !completionCriteria.trim()) return;
    
    onSave?.({
      title: title.trim(),
      completionCriteria: completionCriteria.trim(),
      checkInCadence,
      milestones,
    });
  };

  const isValid = title.trim().length > 0 && completionCriteria.trim().length > 0;

  return (
    <div
      ref={ref}
      className={cn("w-full max-w-xl rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
      data-slot="goal-setter"
      {...rest}
    >
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Target className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Set a New Goal</h2>
          <p className="text-sm text-muted-foreground">Define your objective and how you'll measure success.</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Goal Title</label>
          <input
            type="text"
            placeholder="e.g., Master React Fundamentals"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Completion Criteria</label>
          <textarea
            placeholder="How will you know when you've achieved this?"
            value={completionCriteria}
            onChange={(e) => setCompletionCriteria(e.target.value)}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Check-in Cadence</label>
          <div className="grid grid-cols-3 gap-3">
            {(["daily", "weekly", "monthly"] as CheckInCadence[]).map((cadence) => (
              <button
                key={cadence}
                type="button"
                onClick={() => setCheckInCadence(cadence)}
                className={cn(
                  "rounded-md border p-2 text-sm font-medium capitalize transition-colors",
                  checkInCadence === cadence
                    ? "border-primary bg-primary/10 text-primary"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {cadence}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="text-sm font-medium">Milestones (Optional)</label>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a milestone step..."
              value={newMilestoneText}
              onChange={(e) => setNewMilestoneText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMilestone())}
              className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <button
              type="button"
              onClick={handleAddMilestone}
              disabled={!newMilestoneText.trim()}
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {milestones.length > 0 && (
            <div className="mt-4 space-y-2 rounded-lg border bg-muted/30 p-3">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between rounded-md border bg-background px-3 py-2 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm">{milestone.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMilestone(milestone.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3 border-t pt-5">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={!isValid}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          Save Goal
        </button>
      </div>
    </div>
  );
});

GoalSetter.displayName = "GoalSetter";
