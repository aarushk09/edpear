import type { ParsedUsageExample } from "../../parse-usage-examples";

export const lessonProgressCompactExample: ParsedUsageExample = {
  id: "lesson-progress-compact-rail",
  title: "Compact rail — labels hidden for side panels",
  description:
    "Same Python intro flow in a narrow lesson sidebar: progress and step count stay visible; labels are screen-reader only.",
  code: `import { LessonProgress } from "edpear-sdk";

<LessonProgress
  currentStep={1}
  showLabels={false}
  className="max-w-xs"
  steps={[
    { id: "syllabus", label: "Syllabus & setup", description: "Course policies and Python install." },
    { id: "video", label: "Variables video", description: "12 min in the player." },
    { id: "lab", label: "First notebook lab", description: "Pandas intro cells." },
    { id: "submit", label: "Warm-up checkpoint", description: "Due before lesson 2." },
  ]}
/>`,
};
