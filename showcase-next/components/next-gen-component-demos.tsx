
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
  CurriculumDragBuilder,
  ContentReadabilityMeter,
  LearningObjectiveEditor,
  VocabFlashDeck,
  SentenceConstructor,
  PronunciationScorer,
  BilingualTextToggle,
  MoodCheckIn,
  BurnoutRiskIndicator,
  FocusTimer,
  WellnessNudge,
  StudyGroupFinder,
  CollaborativeNotepad,
  KudosBoard,
  ProctorModeOverlay,
  QuestionVariantManager,
  SuspiciousActivityLog,
  DyslexiaFontToggle,
  ScreenReaderQuizAdapter,
  CaptionEditor,
  PortfolioBuilder,
  DigitalTranscript,
  SkillEndorsementCard,
  BulkEnrollmentUploader,
  LicenseSeatManager,
  AnnouncementScheduler
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

    case "content-readability-meter":
      return (
        <DemoFrame
          id="content-readability-meter"
          title="<ContentReadabilityMeter />"
          description="Flesch-Kincaid inspired readability surface for previewing text difficulty before publishing."
          layout="wide"
          examplePreviews={[
            <div key="content-readability-meter-0" className="w-full max-w-5xl"><ContentReadabilityMeter /></div>,
            <div key="content-readability-meter-1" className="w-full max-w-5xl"><ContentReadabilityMeter
        title="Workspace view" /></div>,
            <div key="content-readability-meter-2" className="w-full max-w-5xl"><ContentReadabilityMeter
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "learning-objective-editor":
      return (
        <DemoFrame
          id="learning-objective-editor"
          title="<LearningObjectiveEditor />"
          description="Structured planning surface for writing SMART objectives and aligning success criteria."
          layout="wide"
          examplePreviews={[
            <div key="learning-objective-editor-0" className="w-full max-w-5xl"><LearningObjectiveEditor /></div>,
            <div key="learning-objective-editor-1" className="w-full max-w-5xl"><LearningObjectiveEditor
        title="Workspace view" /></div>,
            <div key="learning-objective-editor-2" className="w-full max-w-5xl"><LearningObjectiveEditor
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "vocab-flash-deck":
      return (
        <DemoFrame
          id="vocab-flash-deck"
          title="<VocabFlashDeck />"
          description="Paired vocabulary flip deck with L1/L2 cues, quick audio affordances, and picture-ready copy."
          layout="wide"
          examplePreviews={[
            <div key="vocab-flash-deck-0" className="w-full max-w-5xl"><VocabFlashDeck /></div>,
            <div key="vocab-flash-deck-1" className="w-full max-w-5xl"><VocabFlashDeck
        title="Workspace view" /></div>,
            <div key="vocab-flash-deck-2" className="w-full max-w-5xl"><VocabFlashDeck
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

    case "pronunciation-scorer":
      return (
        <DemoFrame
          id="pronunciation-scorer"
          title="<PronunciationScorer />"
          description="Waveform-inspired scoring card with phoneme-level feedback for spoken practice."
          layout="wide"
          examplePreviews={[
            <div key="pronunciation-scorer-0" className="w-full max-w-5xl"><PronunciationScorer /></div>,
            <div key="pronunciation-scorer-1" className="w-full max-w-5xl"><PronunciationScorer
        title="Workspace view" /></div>,
            <div key="pronunciation-scorer-2" className="w-full max-w-5xl"><PronunciationScorer
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

    case "mood-check-in":
      return (
        <DemoFrame
          id="mood-check-in"
          title="<MoodCheckIn />"
          description="Session-start emotional check-in that logs learner mood and surfaces support needs early."
          layout="wide"
          examplePreviews={[
            <div key="mood-check-in-0" className="w-full max-w-5xl"><MoodCheckIn /></div>,
            <div key="mood-check-in-1" className="w-full max-w-5xl"><MoodCheckIn
        title="Workspace view" /></div>,
            <div key="mood-check-in-2" className="w-full max-w-5xl"><MoodCheckIn
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "burnout-risk-indicator":
      return (
        <DemoFrame
          id="burnout-risk-indicator"
          title="<BurnoutRiskIndicator />"
          description="Engagement signal composite that flags overload trends before learners disengage."
          layout="wide"
          examplePreviews={[
            <div key="burnout-risk-indicator-0" className="w-full max-w-5xl"><BurnoutRiskIndicator /></div>,
            <div key="burnout-risk-indicator-1" className="w-full max-w-5xl"><BurnoutRiskIndicator
        title="Workspace view" /></div>,
            <div key="burnout-risk-indicator-2" className="w-full max-w-5xl"><BurnoutRiskIndicator
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "focus-timer":
      return (
        <DemoFrame
          id="focus-timer"
          title="<FocusTimer />"
          description="Pomodoro-style work and break planner with quick visibility into distractions and recovery."
          layout="wide"
          examplePreviews={[
            <div key="focus-timer-0" className="w-full max-w-5xl"><FocusTimer /></div>,
            <div key="focus-timer-1" className="w-full max-w-5xl"><FocusTimer
        title="Workspace view" /></div>,
            <div key="focus-timer-2" className="w-full max-w-5xl"><FocusTimer
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "wellness-nudge":
      return (
        <DemoFrame
          id="wellness-nudge"
          title="<WellnessNudge />"
          description="Contextual micro-tip card that nudges learners to stretch, hydrate, breathe, or reset."
          layout="wide"
          examplePreviews={[
            <div key="wellness-nudge-0" className="w-full max-w-5xl"><WellnessNudge /></div>,
            <div key="wellness-nudge-1" className="w-full max-w-5xl"><WellnessNudge
        title="Workspace view" /></div>,
            <div key="wellness-nudge-2" className="w-full max-w-5xl"><WellnessNudge
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "study-group-finder":
      return (
        <DemoFrame
          id="study-group-finder"
          title="<StudyGroupFinder />"
          description="Learner matching surface that organizes study partners by topic, timezone, and availability."
          layout="wide"
          examplePreviews={[
            <div key="study-group-finder-0" className="w-full max-w-5xl"><StudyGroupFinder /></div>,
            <div key="study-group-finder-1" className="w-full max-w-5xl"><StudyGroupFinder
        title="Workspace view" /></div>,
            <div key="study-group-finder-2" className="w-full max-w-5xl"><StudyGroupFinder
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "collaborative-notepad":
      return (
        <DemoFrame
          id="collaborative-notepad"
          title="<CollaborativeNotepad />"
          description="Shared lesson-scoped notes surface with visible contributions and easy synthesis."
          layout="wide"
          examplePreviews={[
            <div key="collaborative-notepad-0" className="w-full max-w-5xl"><CollaborativeNotepad /></div>,
            <div key="collaborative-notepad-1" className="w-full max-w-5xl"><CollaborativeNotepad
        title="Workspace view" /></div>,
            <div key="collaborative-notepad-2" className="w-full max-w-5xl"><CollaborativeNotepad
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "kudos-board":
      return (
        <DemoFrame
          id="kudos-board"
          title="<KudosBoard />"
          description="Recognition wall where classmates can celebrate helpful actions, persistence, and wins."
          layout="wide"
          examplePreviews={[
            <div key="kudos-board-0" className="w-full max-w-5xl"><KudosBoard /></div>,
            <div key="kudos-board-1" className="w-full max-w-5xl"><KudosBoard
        title="Workspace view" /></div>,
            <div key="kudos-board-2" className="w-full max-w-5xl"><KudosBoard
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "proctor-mode-overlay":
      return (
        <DemoFrame
          id="proctor-mode-overlay"
          title="<ProctorModeOverlay />"
          description="Fullscreen assessment shell that surfaces focus loss, blur events, and live integrity status."
          layout="wide"
          examplePreviews={[
            <div key="proctor-mode-overlay-0" className="w-full max-w-5xl"><ProctorModeOverlay /></div>,
            <div key="proctor-mode-overlay-1" className="w-full max-w-5xl"><ProctorModeOverlay
        title="Workspace view" /></div>,
            <div key="proctor-mode-overlay-2" className="w-full max-w-5xl"><ProctorModeOverlay
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "question-variant-manager":
      return (
        <DemoFrame
          id="question-variant-manager"
          title="<QuestionVariantManager />"
          description="Variant planning surface for shuffling question pools and parameter sets per learner seat."
          layout="wide"
          examplePreviews={[
            <div key="question-variant-manager-0" className="w-full max-w-5xl"><QuestionVariantManager /></div>,
            <div key="question-variant-manager-1" className="w-full max-w-5xl"><QuestionVariantManager
        title="Workspace view" /></div>,
            <div key="question-variant-manager-2" className="w-full max-w-5xl"><QuestionVariantManager
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "suspicious-activity-log":
      return (
        <DemoFrame
          id="suspicious-activity-log"
          title="<SuspiciousActivityLog />"
          description="Timestamped audit trail for paste events, focus losses, idle gaps, and integrity review notes."
          layout="wide"
          examplePreviews={[
            <div key="suspicious-activity-log-0" className="w-full max-w-5xl"><SuspiciousActivityLog /></div>,
            <div key="suspicious-activity-log-1" className="w-full max-w-5xl"><SuspiciousActivityLog
        title="Workspace view" /></div>,
            <div key="suspicious-activity-log-2" className="w-full max-w-5xl"><SuspiciousActivityLog
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "dyslexia-font-toggle":
      return (
        <DemoFrame
          id="dyslexia-font-toggle"
          title="<DyslexiaFontToggle />"
          description="One-click reading preview that switches to a dyslexia-friendly font and spacing profile."
          layout="wide"
          examplePreviews={[
            <div key="dyslexia-font-toggle-0" className="w-full max-w-5xl"><DyslexiaFontToggle /></div>,
            <div key="dyslexia-font-toggle-1" className="w-full max-w-5xl"><DyslexiaFontToggle
        title="Workspace view" /></div>,
            <div key="dyslexia-font-toggle-2" className="w-full max-w-5xl"><DyslexiaFontToggle
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "screen-reader-quiz-adapter":
      return (
        <DemoFrame
          id="screen-reader-quiz-adapter"
          title="<ScreenReaderQuizAdapter />"
          description="Linearized quiz presentation with clearer announcements, grouping, and assistive-tech hints."
          layout="wide"
          examplePreviews={[
            <div key="screen-reader-quiz-adapter-0" className="w-full max-w-5xl"><ScreenReaderQuizAdapter /></div>,
            <div key="screen-reader-quiz-adapter-1" className="w-full max-w-5xl"><ScreenReaderQuizAdapter
        title="Workspace view" /></div>,
            <div key="screen-reader-quiz-adapter-2" className="w-full max-w-5xl"><ScreenReaderQuizAdapter
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "caption-editor":
      return (
        <DemoFrame
          id="caption-editor"
          title="<CaptionEditor />"
          description="Editable timed transcript surface for keeping lesson captions accurate and learner-friendly."
          layout="wide"
          examplePreviews={[
            <div key="caption-editor-0" className="w-full max-w-5xl"><CaptionEditor /></div>,
            <div key="caption-editor-1" className="w-full max-w-5xl"><CaptionEditor
        title="Workspace view" /></div>,
            <div key="caption-editor-2" className="w-full max-w-5xl"><CaptionEditor
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "portfolio-builder":
      return (
        <DemoFrame
          id="portfolio-builder"
          title="<PortfolioBuilder />"
          description="Curated artifact gallery where learners pair project evidence with reflection and growth notes."
          layout="wide"
          examplePreviews={[
            <div key="portfolio-builder-0" className="w-full max-w-5xl"><PortfolioBuilder /></div>,
            <div key="portfolio-builder-1" className="w-full max-w-5xl"><PortfolioBuilder
        title="Workspace view" /></div>,
            <div key="portfolio-builder-2" className="w-full max-w-5xl"><PortfolioBuilder
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "digital-transcript":
      return (
        <DemoFrame
          id="digital-transcript"
          title="<DigitalTranscript />"
          description="Verifiable course history view with completion evidence and a shareable signature surface."
          layout="wide"
          examplePreviews={[
            <div key="digital-transcript-0" className="w-full max-w-5xl"><DigitalTranscript /></div>,
            <div key="digital-transcript-1" className="w-full max-w-5xl"><DigitalTranscript
        title="Workspace view" /></div>,
            <div key="digital-transcript-2" className="w-full max-w-5xl"><DigitalTranscript
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "skill-endorsement-card":
      return (
        <DemoFrame
          id="skill-endorsement-card"
          title="<SkillEndorsementCard />"
          description="Instructor-signed competency card for showcasing validated skills on learner profiles."
          layout="wide"
          examplePreviews={[
            <div key="skill-endorsement-card-0" className="w-full max-w-5xl"><SkillEndorsementCard /></div>,
            <div key="skill-endorsement-card-1" className="w-full max-w-5xl"><SkillEndorsementCard
        title="Workspace view" /></div>,
            <div key="skill-endorsement-card-2" className="w-full max-w-5xl"><SkillEndorsementCard
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "bulk-enrollment-uploader":
      return (
        <DemoFrame
          id="bulk-enrollment-uploader"
          title="<BulkEnrollmentUploader />"
          description="Roster upload surface with field mapping previews, row errors, and quick cleanup guidance."
          layout="wide"
          examplePreviews={[
            <div key="bulk-enrollment-uploader-0" className="w-full max-w-5xl"><BulkEnrollmentUploader /></div>,
            <div key="bulk-enrollment-uploader-1" className="w-full max-w-5xl"><BulkEnrollmentUploader
        title="Workspace view" /></div>,
            <div key="bulk-enrollment-uploader-2" className="w-full max-w-5xl"><BulkEnrollmentUploader
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "license-seat-manager":
      return (
        <DemoFrame
          id="license-seat-manager"
          title="<LicenseSeatManager />"
          description="Org-level seat dashboard that compares allocation, usage, and remaining capacity at a glance."
          layout="wide"
          examplePreviews={[
            <div key="license-seat-manager-0" className="w-full max-w-5xl"><LicenseSeatManager /></div>,
            <div key="license-seat-manager-1" className="w-full max-w-5xl"><LicenseSeatManager
        title="Workspace view" /></div>,
            <div key="license-seat-manager-2" className="w-full max-w-5xl"><LicenseSeatManager
        disabled
        subtitle="Compact read-only preview for dashboards and summaries." /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "announcement-scheduler":
      return (
        <DemoFrame
          id="announcement-scheduler"
          title="<AnnouncementScheduler />"
          description="Rich-text announcement composer with timezone-aware scheduling and send-window visibility."
          layout="wide"
          examplePreviews={[
            <div key="announcement-scheduler-0" className="w-full max-w-5xl"><AnnouncementScheduler /></div>,
            <div key="announcement-scheduler-1" className="w-full max-w-5xl"><AnnouncementScheduler
        title="Workspace view" /></div>,
            <div key="announcement-scheduler-2" className="w-full max-w-5xl"><AnnouncementScheduler
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
