
import type { RegistryComponent } from "./registry.js";

export const nextGenRegistryComponents: RegistryComponent[] = [
  {
    name: "confidence-calibrator",
    title: "ConfidenceCalibrator",
    description: "Pre/post quiz self-rating surface that exposes confidence gaps before review.",
    ai: false,
  },
  {
    name: "mistake-notebook",
    title: "MistakeNotebook",
    description: "Personal error log that resurfaces wrong answers for re-study and coaching.",
    ai: false,
  },
  {
    name: "concept-map-builder",
    title: "ConceptMapBuilder",
    description: "Freeform node-link planning surface for learner-generated knowledge maps.",
    ai: false,
  },
  {
    name: "learning-velocity-chart",
    title: "LearningVelocityChart",
    description: "Time-series view of how quickly concepts are being acquired across a course.",
    ai: false,
  },
];
