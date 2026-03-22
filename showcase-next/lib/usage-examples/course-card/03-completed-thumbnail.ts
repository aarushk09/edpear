import type { ParsedUsageExample } from "../../parse-usage-examples";

export const courseCardCompletedThumbnailExample: ParsedUsageExample = {
  id: "course-card-completed-thumbnail",
  title: "Completed with thumbnail",
  description:
    "Use thumbnailSrc for artwork when the learner has finished the course—pairs well with a “review materials” CTA.",
  code: `import { CourseCard } from "edpear-sdk";

<CourseCard
  categoryTag="Web"
  ctaLabel="Review materials"
  description="Revisit lessons or download the capstone rubric."
  href="/courses/fullstack"
  instructor="Alex Rivera"
  progress={100}
  status="Completed"
  thumbnailAlt="Student at a laptop"
  thumbnailSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
  title="Full-stack project studio"
/>`,
};
