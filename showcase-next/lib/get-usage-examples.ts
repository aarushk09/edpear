import { COMPONENT_USAGE_SNIPPETS } from "./component-usage-snippets";
import { parseUsageExamples, type ParsedUsageExample } from "./parse-usage-examples";
import type { ShowcaseSlug } from "./showcase-nav";
import { courseCardUsageExamples } from "./usage-examples/course-card";
import { lessonProgressUsageExamples } from "./usage-examples/lesson-progress";

type SlugWithSnippet = Exclude<ShowcaseSlug, "course-card" | "lesson-progress">;

const EXPLICIT: Partial<Record<ShowcaseSlug, ParsedUsageExample[]>> = {
  "course-card": courseCardUsageExamples,
  "lesson-progress": lessonProgressUsageExamples,
};

/**
 * Prefer per-file example bundles when defined; otherwise split a single snippet
 * on `// 1)`-style headers or return one block.
 */
export function getUsageExamplesForSlug(slug: ShowcaseSlug): ParsedUsageExample[] {
  const bundle = EXPLICIT[slug];
  if (bundle) return bundle;
  return parseUsageExamples(COMPONENT_USAGE_SNIPPETS[slug as SlugWithSnippet]);
}
