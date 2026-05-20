/**
 * Remove duplicate next-gen component folders and regenerate showcase/registry wiring.
 * Keep list must match tools/next-gen-specs.json entries.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const specsPath = path.join(root, "tools", "next-gen-specs.json");
const specs = JSON.parse(fs.readFileSync(specsPath, "utf8"));
const keepSlugs = new Set(specs.map((entry) => entry.slug));
const componentsRoot = path.join(root, "src", "components");

const REMOVED_SLUGS = [
  "confidence-calibrator",
  "concept-map-builder",
  "error-pattern-analyzer",
  "competency-matrix",
  "pre-post-test-comparison",
  "parent-progress-digest",
  "guardian-notification-center",
  "home-activity-suggester",
  "blooms-taxonomy-tagger",
  "curriculum-drag-builder",
  "content-readability-meter",
  "learning-objective-editor",
  "vocab-flash-deck",
  "pronunciation-scorer",
  "mood-check-in",
  "burnout-risk-indicator",
  "focus-timer",
  "wellness-nudge",
  "study-group-finder",
  "collaborative-notepad",
  "kudos-board",
  "proctor-mode-overlay",
  "question-variant-manager",
  "suspicious-activity-log",
  "dyslexia-font-toggle",
  "screen-reader-quiz-adapter",
  "caption-editor",
  "portfolio-builder",
  "digital-transcript",
  "skill-endorsement-card",
  "bulk-enrollment-uploader",
  "license-seat-manager",
  "announcement-scheduler",
];

for (const slug of REMOVED_SLUGS) {
  if (keepSlugs.has(slug)) {
    console.error(`Refusing to remove kept slug: ${slug}`);
    process.exit(1);
  }
  const dir = path.join(componentsRoot, slug);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`removed ${slug}`);
  }
}

const regen = spawnSync("node", ["tools/generate-next-gen.mjs", "learning-velocity-chart"], {
  cwd: root,
  stdio: "inherit",
});

if (regen.status !== 0) {
  process.exit(regen.status ?? 1);
}

console.log("Prune complete. Kept:", [...keepSlugs].join(", "));
