
"use client";

import {
  ConfidenceCalibrator,
  MistakeNotebook,
  ConceptMapBuilder,
  LearningVelocityChart,
  ErrorPatternAnalyzer
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

    case "concept-map-builder":
      return (
        <DemoFrame
          id="concept-map-builder"
          title="<ConceptMapBuilder />"
          description="Freeform node-link planning surface for learner-generated knowledge maps."
          layout="wide"
          examplePreviews={[
            <div key="concept-map-builder-0" className="w-full max-w-5xl"><ConceptMapBuilder /></div>,
            <div key="concept-map-builder-1" className="w-full max-w-5xl"><ConceptMapBuilder
        title="Workspace view" /></div>,
            <div key="concept-map-builder-2" className="w-full max-w-5xl"><ConceptMapBuilder
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "learning-velocity-chart":
      return (
        <DemoFrame
          id="learning-velocity-chart"
          title="<LearningVelocityChart />"
          description="Time-series view of how quickly concepts are being acquired across a course."
          layout="wide"
          examplePreviews={[
            <div key="learning-velocity-chart-0" className="w-full max-w-5xl"><LearningVelocityChart /></div>,
            <div key="learning-velocity-chart-1" className="w-full max-w-5xl"><LearningVelocityChart
        title="Workspace view" /></div>,
            <div key="learning-velocity-chart-2" className="w-full max-w-5xl"><LearningVelocityChart
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "error-pattern-analyzer":
      return (
        <DemoFrame
          id="error-pattern-analyzer"
          title="<ErrorPatternAnalyzer />"
          description="Clusters repeated wrong answers into misconception groups that teams can address."
          layout="wide"
          examplePreviews={[
            <div key="error-pattern-analyzer-0" className="w-full max-w-5xl"><ErrorPatternAnalyzer /></div>,
            <div key="error-pattern-analyzer-1" className="w-full max-w-5xl"><ErrorPatternAnalyzer
        title="Workspace view" /></div>,
            <div key="error-pattern-analyzer-2" className="w-full max-w-5xl"><ErrorPatternAnalyzer
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
