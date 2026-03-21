import type { ParsedUsageExample } from "../../parse-usage-examples";

export const lessonProgressCalculusExample: ParsedUsageExample = {
  id: "lesson-progress-calculus-final",
  title: "Final sprint — mock exam to review day",
  description:
    "Sofia Reyes’ AP Calculus AB Prep (32 lessons): learner is on the last leg before the timed mock.",
  code: `import { LessonProgress } from "edpear-sdk";

<LessonProgress
  currentStep={3}
  steps={[
    {
      id: "limits",
      label: "Limits & continuity review",
      description: "Problem set A–E with video solutions.",
    },
    {
      id: "derivatives",
      label: "Derivative techniques",
      description: "Chain rule, implicit, and related rates drill.",
    },
    {
      id: "frq",
      label: "Past FRQ practice",
      description: "Two College Board–style free response with rubric self-score.",
    },
    {
      id: "mock",
      label: "Timed mock exam",
      description: "90 minutes, calculator active section only.",
    },
    {
      id: "review",
      label: "Office hours review",
      description: "Live Q&A; bring missed problem IDs from the mock.",
    },
  ]}
/>`,
};
