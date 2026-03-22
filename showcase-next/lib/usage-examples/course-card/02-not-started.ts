import type { ParsedUsageExample } from "../../parse-usage-examples";

export const courseCardNotStartedExample: ParsedUsageExample = {
  id: "course-card-not-started",
  title: "Not started",
  description: "Zero progress and a start CTA. Omit extras you don’t need, such as a category tag.",
  code: `import { CourseCard } from "edpear-sdk";

<CourseCard
  ctaLabel="Start course"
  description="Cell structure, organelles, and lab prep."
  href="/courses/bio-101"
  instructor="Dr. Kim · Biology"
  progress={0}
  status="Self-paced"
  title="Introduction to Cell Biology"
/>`,
};
