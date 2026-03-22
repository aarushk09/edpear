import type { ParsedUsageExample } from "../../parse-usage-examples";

export const courseCardCustomIconExample: ParsedUsageExample = {
  id: "course-card-custom-icon",
  title: "Custom icon",
  description:
    "Pass icon when you want a branded placeholder instead of the default book (shown when there’s no thumbnail image).",
  code: `import { CourseCard } from "edpear-sdk";
import { Code } from "lucide-react";

<CourseCard
  ctaLabel="Open syllabus"
  description="Ownership, borrowing, and error handling."
  href="/courses/rust"
  icon={<Code className="h-10 w-10 text-foreground/45" aria-hidden />}
  instructor="Engineering · CS 310"
  progress={12}
  status="Enrollment open"
  title="Systems programming in Rust"
/>`,
};
