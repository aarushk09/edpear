
"use client";

import {
  ConfidenceCalibrator,
  MistakeNotebook,
  ConceptMapBuilder,
  LearningVelocityChart,
  ErrorPatternAnalyzer,
  CompetencyMatrix,
  PrePostTestComparison,
  ParentProgressDigest,
  GuardianNotificationCenter,
  HomeActivitySuggester,
  BloomsTaxonomyTagger,
  CurriculumDragBuilder
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

    case "competency-matrix":
      return (
        <DemoFrame
          id="competency-matrix"
          title="<CompetencyMatrix />"
          description="Skills-by-proficiency matrix with evidence drill-down for each competency."
          layout="wide"
          examplePreviews={[
            <div key="competency-matrix-0" className="w-full max-w-5xl"><CompetencyMatrix /></div>,
            <div key="competency-matrix-1" className="w-full max-w-5xl"><CompetencyMatrix
        title="Workspace view" /></div>,
            <div key="competency-matrix-2" className="w-full max-w-5xl"><CompetencyMatrix
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "pre-post-test-comparison":
      return (
        <DemoFrame
          id="pre-post-test-comparison"
          title="<PrePostTestComparison />"
          description="Side-by-side unit view that compares knowledge before instruction and after mastery work."
          layout="wide"
          examplePreviews={[
            <div key="pre-post-test-comparison-0" className="w-full max-w-5xl"><PrePostTestComparison /></div>,
            <div key="pre-post-test-comparison-1" className="w-full max-w-5xl"><PrePostTestComparison
        title="Workspace view" /></div>,
            <div key="pre-post-test-comparison-2" className="w-full max-w-5xl"><PrePostTestComparison
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "parent-progress-digest":
      return (
        <DemoFrame
          id="parent-progress-digest"
          title="<ParentProgressDigest />"
          description="Weekly summary card that packages activity, effort, and scores into a family-ready digest."
          layout="wide"
          examplePreviews={[
            <div key="parent-progress-digest-0" className="w-full max-w-5xl"><ParentProgressDigest /></div>,
            <div key="parent-progress-digest-1" className="w-full max-w-5xl"><ParentProgressDigest
        title="Workspace view" /></div>,
            <div key="parent-progress-digest-2" className="w-full max-w-5xl"><ParentProgressDigest
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "guardian-notification-center":
      return (
        <DemoFrame
          id="guardian-notification-center"
          title="<GuardianNotificationCenter />"
          description="Threshold-based alert center for grades, absences, overdue work, and support follow-ups."
          layout="wide"
          examplePreviews={[
            <div key="guardian-notification-center-0" className="w-full max-w-5xl"><GuardianNotificationCenter /></div>,
            <div key="guardian-notification-center-1" className="w-full max-w-5xl"><GuardianNotificationCenter
        title="Workspace view" /></div>,
            <div key="guardian-notification-center-2" className="w-full max-w-5xl"><GuardianNotificationCenter
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "home-activity-suggester":
      return (
        <DemoFrame
          id="home-activity-suggester"
          title="<HomeActivitySuggester />"
          description="Curated offline exercises families can do together to reinforce classroom learning."
          layout="wide"
          examplePreviews={[
            <div key="home-activity-suggester-0" className="w-full max-w-5xl"><HomeActivitySuggester /></div>,
            <div key="home-activity-suggester-1" className="w-full max-w-5xl"><HomeActivitySuggester
        title="Workspace view" /></div>,
            <div key="home-activity-suggester-2" className="w-full max-w-5xl"><HomeActivitySuggester
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "blooms-taxonomy-tagger":
      return (
        <DemoFrame
          id="blooms-taxonomy-tagger"
          title="<BloomsTaxonomyTagger />"
          description="Labels learning objectives across remember-to-create levels with curriculum-ready consistency."
          layout="wide"
          examplePreviews={[
            <div key="blooms-taxonomy-tagger-0" className="w-full max-w-5xl"><BloomsTaxonomyTagger /></div>,
            <div key="blooms-taxonomy-tagger-1" className="w-full max-w-5xl"><BloomsTaxonomyTagger
        title="Workspace view" /></div>,
            <div key="blooms-taxonomy-tagger-2" className="w-full max-w-5xl"><BloomsTaxonomyTagger
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "curriculum-drag-builder":
      return (
        <DemoFrame
          id="curriculum-drag-builder"
          title="<CurriculumDragBuilder />"
          description="Sequencing surface for arranging modules and lessons into a coherent learning arc."
          layout="wide"
          examplePreviews={[
            <div key="curriculum-drag-builder-0" className="w-full max-w-5xl"><CurriculumDragBuilder /></div>,
            <div key="curriculum-drag-builder-1" className="w-full max-w-5xl"><CurriculumDragBuilder
        title="Workspace view" /></div>,
            <div key="curriculum-drag-builder-2" className="w-full max-w-5xl"><CurriculumDragBuilder
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
