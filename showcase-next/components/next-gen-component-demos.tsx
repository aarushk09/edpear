
"use client";

import {
  LearningVelocityChart,
  MistakeNotebook,
  BilingualTextToggle,
  SentenceConstructor
} from "edpear";

import { DemoFrame } from "./component-doc-page";
import type { ShowcaseSlug } from "../lib/showcase-nav";

export function renderNextGenComponentDemo(slug: ShowcaseSlug) {
  switch (slug) {
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

    case "bilingual-text-toggle":
      return (
        <DemoFrame
          id="bilingual-text-toggle"
          title="<BilingualTextToggle />"
          description="Paragraph-level language switch that supports scaffolded reading across two texts."
          layout="wide"
          examplePreviews={[
            <div key="bilingual-text-toggle-0" className="w-full max-w-5xl"><BilingualTextToggle /></div>,
            <div key="bilingual-text-toggle-1" className="w-full max-w-5xl"><BilingualTextToggle
        title="Workspace view" /></div>,
            <div key="bilingual-text-toggle-2" className="w-full max-w-5xl"><BilingualTextToggle
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "sentence-constructor":
      return (
        <DemoFrame
          id="sentence-constructor"
          title="<SentenceConstructor />"
          description="Word-tile practice surface for assembling grammatically correct sentence order."
          layout="wide"
          examplePreviews={[
            <div key="sentence-constructor-0" className="w-full max-w-5xl"><SentenceConstructor /></div>,
            <div key="sentence-constructor-1" className="w-full max-w-5xl"><SentenceConstructor
        title="Workspace view" /></div>,
            <div key="sentence-constructor-2" className="w-full max-w-5xl"><SentenceConstructor
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
