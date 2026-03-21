import type { ParsedUsageExample } from "../../parse-usage-examples";

export const lessonProgressUxMidExample: ParsedUsageExample = {
  id: "lesson-progress-ux-mid",
  title: "Mid-module — critique before handoff",
  description:
    "Marcus Tran’s UX Design Fundamentals cohort (18 lessons): research and sketches are done; peer critique is active.",
  code: `import { LessonProgress } from "edpear-sdk";

<LessonProgress
  currentStep={2}
  steps={[
    {
      id: "brief",
      label: "Unpack the design brief",
      description: "Stakeholder goals for the mobile onboarding flow.",
    },
    {
      id: "sketch",
      label: "Low-fi wireframes",
      description: "Three variants in Figma; focus on first-run empty states.",
    },
    {
      id: "critique",
      label: "Studio critique",
      description: "Give and receive feedback using the rubric in the LMS.",
    },
    {
      id: "handoff",
      label: "Handoff checklist",
      description: "Annotations, redlines, and links for engineering.",
    },
  ]}
/>`,
};
