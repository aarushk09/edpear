import { NAV_GROUPS, getComponentLabel, type ShowcaseSlug } from "./showcase-nav";

export const BLOCK_SHOWCASE_SLUGS = [
  "learning-journal",
  "reading-annotator",
  "grade-book",
  "peer-review-panel",
  "question-bank",
  "ai-tutor",
] as const satisfies readonly ShowcaseSlug[];

const blockSlugSet = new Set<string>(BLOCK_SHOWCASE_SLUGS);

export const HOME_CATALOG_GROUPS = NAV_GROUPS.map((group) => ({
  ...group,
  items: group.items.filter((item) => !blockSlugSet.has(item.id)),
})).filter((group) => group.items.length > 0);

export const BLOCK_COMPONENTS = BLOCK_SHOWCASE_SLUGS.map((slug) => ({
  slug,
  label: getComponentLabel(slug),
}));

export const HOME_COMPONENT_COUNT = HOME_CATALOG_GROUPS.reduce(
  (total, group) => total + group.items.length,
  0,
);
