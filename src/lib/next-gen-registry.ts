
import type { RegistryComponent } from "./registry.js";

export const nextGenRegistryComponents: RegistryComponent[] = [
  {
    name: "learning-velocity-chart",
    title: "LearningVelocityChart",
    description: "Time-series view of how quickly concepts are being acquired across a course.",
    ai: false,
  },
  {
    name: "mistake-notebook",
    title: "MistakeNotebook",
    description: "Personal error log that resurfaces wrong answers for re-study and coaching.",
    ai: false,
  },
  {
    name: "bilingual-text-toggle",
    title: "BilingualTextToggle",
    description: "Paragraph-level language switch that supports scaffolded reading across two texts.",
    ai: false,
  },
  {
    name: "sentence-constructor",
    title: "SentenceConstructor",
    description: "Word-tile practice surface for assembling grammatically correct sentence order.",
    ai: false,
  },
];
