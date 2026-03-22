import type { ParsedUsageExample } from "../../parse-usage-examples";

export const courseCardInProgressExample: ParsedUsageExample = {
  id: "course-card-in-progress",
  title: "In progress",
  description:
    "Category and status pills, body copy, and partial progress—good for “continue learning” rows and live cohorts.",
  code: `import { CourseCard } from "edpear-sdk";

<CourseCard
  categoryTag="Math"
  ctaLabel="Resume module"
  description="Linear equations, worked examples, and quick checks."
  href="/courses/algebra-1"
  instructor="Maya Chen"
  progress={68}
  status="Live cohort"
  title="Algebra I Foundations"
/>`,
};
