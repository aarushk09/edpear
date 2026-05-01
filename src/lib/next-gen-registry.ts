
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
];
