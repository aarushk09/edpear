
"use client";

import {
  ConfidenceCalibrator,
  MistakeNotebook
} from "edpear";

import { DemoFrame } from "./component-doc-page";
import type { ShowcaseSlug } from "../lib/showcase-nav";

export function renderNextGenComponentDemo(slug: ShowcaseSlug) {
  switch (slug) {
    case "confidence-calibrator":
      return (
        <DemoFrame
          id="confidence-calibrator"
          title="<ConfidenceCalibrator />"
          description="Pre/post quiz self-rating surface that exposes confidence gaps before review."
          layout="wide"
          examplePreviews={[
            <div key="confidence-calibrator-0" className="w-full max-w-5xl"><ConfidenceCalibrator /></div>,
            <div key="confidence-calibrator-1" className="w-full max-w-5xl"><ConfidenceCalibrator
        title="Workspace view" /></div>,
            <div key="confidence-calibrator-2" className="w-full max-w-5xl"><ConfidenceCalibrator
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "mistake-notebook":
      return (
        <DemoFrame
          id="mistake-notebook"
          title="<MistakeNotebook />"
          description="Personal error log that resurfaces wrong answers for re-study and coaching."
          layout="wide"
          examplePreviews={[
            <div key="mistake-notebook-0" className="w-full max-w-5xl"><MistakeNotebook /></div>,
            <div key="mistake-notebook-1" className="w-full max-w-5xl"><MistakeNotebook
        title="Workspace view" /></div>,
            <div key="mistake-notebook-2" className="w-full max-w-5xl"><MistakeNotebook
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    default:
      return null;
  }
}
