import type { ParsedUsageExample } from "../../parse-usage-examples";

export const lessonProgressPythonIntroExample: ParsedUsageExample = {
  id: "lesson-progress-python-intro",
  title: "First session — syllabus to first notebook",
  description:
    "Learner is at the start of Dr. Okonkwo’s data-science intro: orientation done, first video is next.",
  code: `import { LessonProgress } from "edpear-sdk";

<LessonProgress
  currentStep={0}
  steps={[
    {
      id: "syllabus",
      label: "Read syllabus & install Python",
      description: "Environment setup for Intro to Python for Data Science (24 lessons).",
    },
    {
      id: "video",
      label: "Watch: notebooks and variables",
      description: "12 min — walkthrough in the course player.",
    },
    {
      id: "lab",
      label: "Run your first cells",
      description: "Import pandas and load the practice CSV.",
    },
    {
      id: "submit",
      label: "Submit warm-up checkpoint",
      description: "Auto-graded; due before lesson 2 unlocks.",
    },
  ]}
/>`,
};
