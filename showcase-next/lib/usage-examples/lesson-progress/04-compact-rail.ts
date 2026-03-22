import type { ParsedUsageExample } from "../../parse-usage-examples";

export const lessonProgressCompactExample: ParsedUsageExample = {
  id: "lesson-progress-compact",
  title: "Compact rail — three beats",
  description: "A minimal trio of steps for hour-long labs or live workshops when you do not need four or five milestones.",
  code: `import { LessonProgress } from "edpear-sdk";

<LessonProgress
  currentStep={1}
  steps={[
    { id: "join", label: "Join & setup", description: "Materials link and breakout room" },
    { id: "build", label: "Build", description: "Hands-on block" },
    { id: "share", label: "Share-out", description: "2-minute demos" },
  ]}
/>`,
};
