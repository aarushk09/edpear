"use client";

import { useState } from "react";
import {
  AIFeedback,
  AIHint,
  AIQuizGenerator,
  BadgeAward,
  CodePlayground,
  CourseCard,
  DiscussionThread,
  FlashCard,
  LessonProgress,
  QuizCard,
  RichTextEditor,
  ScoreDisplay,
  StreakTracker,
  TimedQuiz,
  VideoLesson,
  SyllabusNavigator,
  AssignmentDropzone,
  GradeBook,
  ReadingAnnotator,
  KnowledgeCheck,
  CertificateRenderer,
  LearningPathMap,
  PeerReviewPanel,
  SessionTimer,
  OnboardingChecklist,
  LiveClassBanner,
  QuestionBank,
  StudentProfileCard,
  FeedbackSlider,
  DiffViewer,
  EnrollmentGate,
  ActivityFeed,
  MathRenderer,
  CourseDashboard,
  AITutor,
} from "edpear";
import type { QuestionBankItem, ReadingHighlight, TimedQuizProps } from "edpear";
import { Code } from "lucide-react";

import { DemoFrame } from "./component-doc-page";
import type { ShowcaseSlug } from "../lib/showcase-nav";
import { useApiKey } from "../lib/use-api-key";

function OnboardingWelcomePreview() {
  const [done, setDone] = useState<string[]>([]);
  return (
    <div className="relative min-h-[320px] rounded-lg border border-dashed border-border bg-muted/10">
      <OnboardingChecklist
        completedIds={done}
        embedded
        items={[
          { id: "profile", label: "Complete your profile", xp: 50 },
          { id: "lesson", label: "Watch your first lesson", xp: 100 },
        ]}
        onToggle={(id, completed) => {
          setDone((prev) =>
            completed ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id),
          );
        }}
        title="Welcome checklist"
      />
    </div>
  );
}

function OnboardingProgressPreview() {
  const [done, setDone] = useState<string[]>(["profile"]);
  return (
    <div className="relative min-h-[360px] rounded-lg border border-dashed border-border bg-muted/10">
      <OnboardingChecklist
        completedIds={done}
        embedded
        items={[
          { id: "profile", label: "Add avatar & bio", xp: 25 },
          { id: "lesson", label: "Finish module 0 intro", xp: 75 },
          { id: "quiz", label: "Pass the warm-up quiz", xp: 50 },
        ]}
        onToggle={(id, completed) => {
          setDone((prev) =>
            completed ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id),
          );
        }}
        title="Finish setup"
      />
    </div>
  );
}

function OnboardingCompletePreview() {
  const [done] = useState<string[]>(["a", "b", "c"]);
  return (
    <div className="relative min-h-[280px] rounded-lg border border-dashed border-border bg-muted/10">
      <OnboardingChecklist
        completedIds={done}
        embedded
        items={[
          { id: "a", label: "Verify email", xp: 10 },
          { id: "b", label: "Join a cohort", xp: 20 },
          { id: "c", label: "Post in introductions", xp: 30 },
        ]}
        onToggle={() => {}}
        title="You're set"
      />
    </div>
  );
}

function PeerReviewSinglePreview() {
  const [scores, setScores] = useState({ thesis: 8 });
  const [comments, setComments] = useState({ thesis: "" });
  return (
    <PeerReviewPanel
      comments={comments}
      onCommentChange={(id, t) => setComments((c) => ({ ...c, [id]: t }))}
      onScoreChange={(id, p) => setScores((s) => ({ ...s, [id]: p }))}
      onSubmitReview={() => {}}
      rubric={[{ id: "thesis", label: "Thesis & focus", maxPoints: 10, description: "Arguable claim" }]}
      scores={scores}
      submissionPreview="The essay argues that remote work improves retention but lacks counter-evidence."
      submissionTitle="Draft essay"
    />
  );
}

function PeerReviewFullPreview() {
  const [scores, setScores] = useState({ thesis: 8, evidence: 7, clarity: 6 });
  const [comments, setComments] = useState({
    thesis: "Clear claim in paragraph 1.",
    evidence: "",
    clarity: "",
  });
  return (
    <PeerReviewPanel
      comments={comments}
      onCommentChange={(id, t) => setComments((c) => ({ ...c, [id]: t }))}
      onScoreChange={(id, p) => setScores((s) => ({ ...s, [id]: p }))}
      onSubmitReview={() => {}}
      rubric={[
        { id: "thesis", label: "Thesis & focus", maxPoints: 10, description: "Arguable, specific claim" },
        { id: "evidence", label: "Evidence", maxPoints: 10, description: "Sources support the claim" },
        { id: "clarity", label: "Clarity", maxPoints: 10, description: "Organization and mechanics" },
      ]}
      scores={scores}
      submissionPreview="In this draft I argue that universal pre-K improves long-term outcomes. I cite three longitudinal studies and address a counterargument about cost…"
      submissionTitle="Draft essay (peer)"
    />
  );
}

function PeerReviewCodePreview() {
  const [scores, setScores] = useState({ style: 5, tests: 5 });
  const [comments, setComments] = useState({ style: "", tests: "" });
  return (
    <PeerReviewPanel
      comments={comments}
      onCommentChange={(id, t) => setComments((c) => ({ ...c, [id]: t }))}
      onScoreChange={(id, p) => setScores((s) => ({ ...s, [id]: p }))}
      onSubmitReview={() => {}}
      rubric={[
        { id: "style", label: "Style & readability", maxPoints: 5, description: "Naming, formatting" },
        { id: "tests", label: "Tests", maxPoints: 5, description: "Coverage + edge cases" },
      ]}
      scores={scores}
      submissionPreview={`function sum(a,b){return a+b}`}
      submissionTitle="PR #42"
    />
  );
}

function ReadingAnnotatorEmptyPreview() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([]);
  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={(p) => setHighlights(p.highlights)}
      text="Select any sentence to add a highlight. Notes appear in the margin when you attach them."
    />
  );
}

function ReadingAnnotatorNotesPreview() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([
    { id: "h1", start: 0, end: 48, color: "#bfdbfe", note: "Define jurisdiction early." },
  ]);
  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={(p) => setHighlights(p.highlights)}
      text={`Courts must determine whether they have personal jurisdiction before reaching the merits.

Long-form readings benefit from inline highlights and persistent margin notes stored as JSON.`}
    />
  );
}

function ReadingAnnotatorShortPreview() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([]);
  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={(p) => setHighlights(p.highlights)}
      text="Mitochondria generate most of the cell's ATP through oxidative phosphorylation."
    />
  );
}

function GradeBookBasicPreview() {
  const [grades, setGrades] = useState<Record<string, Record<string, string>>>({});
  return (
    <GradeBook
      assignments={[
        { id: "q1", title: "Quiz 1", categoryId: "cat-quiz" },
        { id: "q2", title: "Midterm", categoryId: "cat-exam" },
      ]}
      categories={[
        { id: "cat-quiz", name: "Quizzes", weight: 0.5 },
        { id: "cat-exam", name: "Exams", weight: 0.5 },
      ]}
      grades={grades}
      onGradeChange={(studentId, assignmentId, value) => {
        setGrades((g) => ({
          ...g,
          [studentId]: { ...(g[studentId] ?? {}), [assignmentId]: value },
        }));
      }}
      students={[
        { id: "s1", name: "Jordan Lee" },
        { id: "s2", name: "Sam Rivera" },
      ]}
    />
  );
}

function GradeBookWeightedPreview() {
  const [grades, setGrades] = useState<Record<string, Record<string, string>>>({
    s1: { q1: "92", q2: "B+", q3: "78" },
  });
  return (
    <GradeBook
      assignments={[
        { id: "q1", title: "Quiz 1", categoryId: "cat-q" },
        { id: "q2", title: "Midterm", categoryId: "cat-e" },
        { id: "q3", title: "Project", categoryId: "cat-p" },
      ]}
      categories={[
        { id: "cat-q", name: "Quizzes", weight: 0.25 },
        { id: "cat-e", name: "Exams", weight: 0.45 },
        { id: "cat-p", name: "Project", weight: 0.3 },
      ]}
      grades={grades}
      onGradeChange={(studentId, assignmentId, value) => {
        setGrades((g) => ({
          ...g,
          [studentId]: { ...(g[studentId] ?? {}), [assignmentId]: value },
        }));
      }}
      students={[{ id: "s1", name: "Jordan Lee" }]}
    />
  );
}

function GradeBookManyStudentsPreview() {
  const [grades, setGrades] = useState<Record<string, Record<string, string>>>({});
  return (
    <GradeBook
      assignments={[{ id: "a1", title: "Attendance", categoryId: "c1" }]}
      categories={[{ id: "c1", name: "Participation", weight: 1 }]}
      grades={grades}
      onGradeChange={(studentId, assignmentId, value) => {
        setGrades((g) => ({
          ...g,
          [studentId]: { ...(g[studentId] ?? {}), [assignmentId]: value },
        }));
      }}
      students={[
        { id: "s1", name: "Ada" },
        { id: "s2", name: "Lin" },
        { id: "s3", name: "Omar" },
        { id: "s4", name: "Zoe" },
      ]}
    />
  );
}

const QB_POOL_A = [
  {
    id: "qb1",
    topic: "Photosynthesis",
    difficulty: "medium" as const,
    type: "mcq" as const,
    prompt: "Which organelle is the main site of photosynthesis?",
  },
];

const QB_POOL_B = [
  {
    id: "q2",
    topic: "Cell division",
    difficulty: "easy" as const,
    type: "short-answer" as const,
    prompt: "Name one product of the light-dependent reactions.",
  },
  {
    id: "q3",
    topic: "Cell division",
    difficulty: "hard" as const,
    type: "essay" as const,
    prompt: "Compare mitosis and meiosis in three sentences.",
  },
];

const QB_POOL_C = [
  { id: "a", topic: "Algebra", difficulty: "easy" as const, type: "mcq" as const, prompt: "Solve 2x = 8" },
  {
    id: "b",
    topic: "Algebra",
    difficulty: "medium" as const,
    type: "true-false" as const,
    prompt: "x² is always positive.",
  },
  { id: "c", topic: "Stats", difficulty: "medium" as const, type: "mcq" as const, prompt: "What does σ measure?" },
];

function QuestionBankPreview({ pool }: { pool: QuestionBankItem[] }) {
  const [added, setAdded] = useState<string[]>([]);
  return (
    <div className="space-y-3">
      <QuestionBank
        onAddToQuiz={(ids) =>
          setAdded((a) => {
            const next = [...a];
            for (const id of ids) if (!next.includes(id)) next.push(id);
            return next;
          })
        }
        questions={pool}
      />
      <p className="text-xs text-muted-foreground">
        Staged (demo): {added.length ? added.join(", ") : "—"}
      </p>
    </div>
  );
}

function FeedbackSliderVariantPreview({
  variant,
  title,
}: {
  variant: "stars" | "nps" | "emoji";
  title: string;
}) {
  const [log, setLog] = useState<string | null>(null);
  return (
    <div className="max-w-md space-y-3">
      <FeedbackSlider onSubmit={(p) => setLog(JSON.stringify(p, null, 2))} title={title} variant={variant} />
      {log ? (
        <pre className="max-h-24 overflow-auto rounded-md border bg-muted/50 p-2 text-[11px]">{log}</pre>
      ) : null}
    </div>
  );
}


export function ComponentDemo({ slug }: { slug: ShowcaseSlug }) {
  const apiKey = useApiKey();

  switch (slug) {
    case "course-card":
      return (
        <DemoFrame
          id="course-card"
          title="<CourseCard />"
          description="Course summary with progress, instructor, and CTA—use badges, thumbnails, custom icons, and progress to match catalog, dashboard, and completion flows."
          examplePreviews={[
            <div key="course-card-0" className="w-full max-w-md">
              <CourseCard
                categoryTag="Math"
                ctaLabel="Resume module"
                description="Linear equations, worked examples, and quick checks."
                href="#"
                instructor="Maya Chen"
                progress={68}
                status="Live cohort"
                title="Algebra I Foundations"
              />
            </div>,
            <div key="course-card-1" className="w-full max-w-md">
              <CourseCard
                ctaLabel="Start course"
                description="Cell structure, organelles, and lab prep."
                href="#"
                instructor="Dr. Kim · Biology"
                progress={0}
                status="Self-paced"
                title="Introduction to Cell Biology"
              />
            </div>,
            <div key="course-card-2" className="w-full max-w-md">
              <CourseCard
                categoryTag="Web"
                ctaLabel="Review materials"
                description="Revisit lessons or download the capstone rubric."
                href="#"
                instructor="Alex Rivera"
                progress={100}
                status="Completed"
                thumbnailAlt="Student at a laptop"
                thumbnailSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                title="Full-stack project studio"
              />
            </div>,
            <div key="course-card-3" className="w-full max-w-md">
              <CourseCard
                ctaLabel="Open syllabus"
                description="Ownership, borrowing, and error handling."
                href="#"
                icon={<Code className="h-10 w-10 text-foreground/45" aria-hidden />}
                instructor="Engineering · CS 310"
                progress={12}
                status="Enrollment open"
                title="Systems programming in Rust"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "lesson-progress":
      return (
        <DemoFrame
          id="lesson-progress"
          title="<LessonProgress />"
          description="Stepper for a lesson flow—use descriptions under each label for LMS context and match currentStep to the learner’s position."
          examplePreviews={[
            <div key="lp-0" className="w-full max-w-2xl">
              <LessonProgress
                currentStep={0}
                steps={[
                  {
                    id: "syllabus",
                    label: "Read syllabus & install Python",
                    description: "Environment setup for Intro to Python for Data Science (24 lessons).",
                  },
                  {
                    id: "video",
                    label: "Watch: notebooks and variables",
                    description: "12 min — walkthrough in the course player.",
                  },
                  {
                    id: "lab",
                    label: "Run your first cells",
                    description: "Import pandas and load the practice CSV.",
                  },
                  {
                    id: "submit",
                    label: "Submit warm-up checkpoint",
                    description: "Auto-graded; due before lesson 2 unlocks.",
                  },
                ]}
              />
            </div>,
            <div key="lp-1" className="w-full max-w-2xl">
              <LessonProgress
                currentStep={2}
                steps={[
                  {
                    id: "brief",
                    label: "Unpack the design brief",
                    description: "Stakeholder goals for the mobile onboarding flow.",
                  },
                  {
                    id: "sketch",
                    label: "Low-fi wireframes",
                    description: "Three variants in Figma; focus on first-run empty states.",
                  },
                  {
                    id: "critique",
                    label: "Studio critique",
                    description: "Give and receive feedback using the rubric in the LMS.",
                  },
                  {
                    id: "handoff",
                    label: "Handoff checklist",
                    description: "Annotations, redlines, and links for engineering.",
                  },
                ]}
              />
            </div>,
            <div key="lp-2" className="w-full max-w-2xl">
              <LessonProgress
                currentStep={3}
                steps={[
                  {
                    id: "limits",
                    label: "Limits & continuity review",
                    description: "Problem set A–E with video solutions.",
                  },
                  {
                    id: "derivatives",
                    label: "Derivative techniques",
                    description: "Chain rule, implicit, and related rates drill.",
                  },
                  {
                    id: "frq",
                    label: "Past FRQ practice",
                    description: "Two College Board–style free response with rubric self-score.",
                  },
                  {
                    id: "mock",
                    label: "Timed mock exam",
                    description: "90 minutes, calculator active section only.",
                  },
                  {
                    id: "review",
                    label: "Office hours review",
                    description: "Live Q&A; bring missed problem IDs from the mock.",
                  },
                ]}
              />
            </div>,
            <div key="lp-3" className="w-full max-w-2xl">
              <LessonProgress
                currentStep={1}
                steps={[
                  { id: "join", label: "Join & setup", description: "Materials link and breakout room" },
                  { id: "build", label: "Build", description: "Hands-on block" },
                  { id: "share", label: "Share-out", description: "2-minute demos" },
                ]}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "quiz-card":
      return (
        <DemoFrame
          id="quiz-card"
          title="<QuizCard />"
          description="Multiple-choice, true/false, or short answer—each variant shares the same feedback chrome."
          examplePreviews={[
            <div key="qc-0" className="w-full max-w-lg">
              <QuizCard
                choices={["Evaporation", "Condensation", "Freezing", "Melting"]}
                correctAnswer="Condensation"
                description="Choose the process that forms clouds from water vapor."
                question="What part of the water cycle turns vapor back into liquid droplets?"
                variant="multiple-choice"
              />
            </div>,
            <div key="qc-1" className="w-full max-w-lg">
              <QuizCard
                choices={["True", "False"]}
                correctAnswer="True"
                description="Crossing over swaps segments between homologous chromosomes."
                question="Crossing over occurs during prophase I of meiosis."
                variant="true-false"
              />
            </div>,
            <div key="qc-2" className="w-full max-w-lg">
              <QuizCard
                correctAnswer="mitochondria"
                description="One word or short phrase."
                question="Which organelle is the main site of aerobic respiration?"
                variant="short-answer"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "timed-quiz":
      return (
        <DemoFrame
          id="timed-quiz"
          title="<TimedQuiz />"
          description="Same question types as QuizCard with a countdown—tune duration to difficulty."
          examplePreviews={[
            <div key="tq-0" className="w-full max-w-lg">
              <TimedQuiz
                correctAnswer="4"
                description="Answer before the timer expires."
                duration={25}
                question="How many sides does a square have?"
                variant="short-answer"
              />
            </div>,
            <div key="tq-1" className="w-full max-w-lg">
              <TimedQuiz
                {...({
                  variant: "multiple-choice",
                  choices: ["Oxygen", "Glucose", "Chlorophyll", "Water"],
                  correctAnswer: "Chlorophyll",
                  description: "Pick the pigment that captures light for photosynthesis.",
                  duration: 45,
                  question: "Which molecule absorbs photons in the chloroplast?",
                } as TimedQuizProps)}
              />
            </div>,
            <div key="tq-2" className="w-full max-w-lg">
              <TimedQuiz
                {...({
                  variant: "true-false",
                  choices: ["True", "False"],
                  correctAnswer: "False",
                  description: "Think about where translation happens in the cell.",
                  duration: 20,
                  question: "Translation always happens in the nucleus.",
                } as TimedQuizProps)}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "flash-card":
      return (
        <DemoFrame
          id="flash-card"
          title="<FlashCard />"
          description="Flip interaction for recall—keep backs short for mobile."
          examplePreviews={[
            <div key="fc-0" className="w-full max-w-md">
              <FlashCard
                back="Photosynthesis mainly happens in the chloroplasts of plant cells."
                front="Where in a plant cell does photosynthesis happen?"
              />
            </div>,
            <div key="fc-1" className="w-full max-w-md">
              <FlashCard
                back="A quantity with magnitude and direction."
                front="Define vector in one sentence."
              />
            </div>,
            <div key="fc-2" className="w-full max-w-md">
              <FlashCard
                back="1787 — drafted; 1788–1789 — ratified by states."
                front="When was the U.S. Constitution ratified?"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "badge-award":
      return (
        <DemoFrame
          id="badge-award"
          title="<BadgeAward />"
          description="Achievement tile with optional earned timestamp and locked previews."
          examplePreviews={[
            <div key="ba-0" className="w-full max-w-sm">
              <BadgeAward
                description="Completed a full week of lessons without missing a day."
                earnedAt="today"
                title="Consistency Champ"
              />
            </div>,
            <div key="ba-1" className="w-full max-w-sm">
              <BadgeAward
                description="Finish three projects with peer review to unlock."
                title="Studio collaborator"
                unlocked={false}
              />
            </div>,
            <div key="ba-2" className="w-full max-w-sm">
              <BadgeAward
                description="You maintained focus mode for 10 sessions this month—keep the streak going."
                earnedAt="Mar 12"
                title="Deep work streak"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "streak-tracker":
      return (
        <DemoFrame
          id="streak-tracker"
          title="<StreakTracker />"
          description="Seven slots for the rail; goal and streak surface motivation copy."
          examplePreviews={[
            <div key="st-0" className="w-full max-w-md">
              <StreakTracker
                days={[
                  { label: "Mon", completed: true },
                  { label: "Tue", completed: true },
                  { label: "Wed", completed: true },
                  { label: "Thu", completed: false },
                  { label: "Fri", completed: true },
                  { label: "Sat", completed: true },
                  { label: "Sun", completed: true },
                ]}
                goal={10}
                streak={7}
              />
            </div>,
            <div key="st-1" className="w-full max-w-md">
              <StreakTracker
                days={[
                  { label: "M", completed: true },
                  { label: "T", completed: true },
                  { label: "W", completed: true },
                  { label: "T", completed: true },
                  { label: "F", completed: true },
                  { label: "S", completed: true },
                  { label: "S", completed: true },
                ]}
                goal={14}
                streak={14}
              />
            </div>,
            <div key="st-2" className="w-full max-w-md">
              <StreakTracker
                days={[
                  { label: "M", completed: true },
                  { label: "T", completed: false },
                  { label: "W", completed: false },
                  { label: "T", completed: false },
                  { label: "F", completed: false },
                  { label: "S", completed: false },
                  { label: "S", completed: false },
                ]}
                goal={5}
                streak={1}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "score-display":
      return (
        <DemoFrame
          id="score-display"
          title="<ScoreDisplay />"
          description="Numeric score with passing line—bands shift when above or below threshold."
          examplePreviews={[
            <div key="sd-0" className="w-full max-w-sm">
              <ScoreDisplay maxScore={20} passingScore={14} score={17} />
            </div>,
            <div key="sd-1" className="w-full max-w-sm">
              <ScoreDisplay maxScore={100} passingScore={60} score={52} />
            </div>,
            <div key="sd-2" className="w-full max-w-sm">
              <ScoreDisplay maxScore={50} passingScore={40} score={50} />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "video-lesson":
      return (
        <DemoFrame
          id="video-lesson"
          title="<VideoLesson />"
          description="Embedded player with chapter markers (YouTube)."
          examplePreviews={[
            <div key="vl-0" className="w-full max-w-3xl">
              <VideoLesson
                chapters={[
                  { id: "intro", label: "What is a fraction?", time: 0 },
                  { id: "model", label: "Visual model", time: 75 },
                  { id: "practice", label: "Practice prompt", time: 150 },
                ]}
                title="Fractions in Everyday Contexts"
                youtubeId="M7lc1UVf-VE"
              />
            </div>,
            <div key="vl-1" className="w-full max-w-3xl">
              <VideoLesson
                chapters={[{ id: "only", label: "Welcome", time: 0 }]}
                title="Course orientation"
                youtubeId="M7lc1UVf-VE"
              />
            </div>,
            <div key="vl-2" className="w-full max-w-3xl">
              <VideoLesson
                chapters={[
                  { id: "safety", label: "Safety", time: 0 },
                  { id: "setup", label: "Bench setup", time: 45 },
                  { id: "measure", label: "Measurements", time: 200 },
                  { id: "cleanup", label: "Cleanup", time: 400 },
                ]}
                title="Chemistry lab — titration"
                youtubeId="M7lc1UVf-VE"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "syllabus-navigator":
      return (
        <DemoFrame
          id="syllabus-navigator"
          title="<SyllabusNavigator />"
          description="Collapsible LMS outline with completion and locks; drag modules when reorder is enabled."
          examplePreviews={[
            <div key="sn-0" className="w-full max-w-md">
              <SyllabusNavigator
                activeLessonId="l2"
                modules={[
                  {
                    id: "m1",
                    title: "Unit 1 — Foundations",
                    lessons: [
                      { id: "l1", title: "Orientation", completed: true },
                      { id: "l2", title: "Key terms", completed: false },
                      { id: "l3", title: "Checkpoint quiz", locked: true },
                    ],
                  },
                ]}
                onLessonSelect={() => {}}
                onModulesReorder={() => {}}
                reorderEnabled
              />
            </div>,
            <div key="sn-1" className="w-full max-w-md">
              <SyllabusNavigator
                activeLessonId="l4"
                modules={[
                  {
                    id: "a",
                    title: "Part A",
                    lessons: [
                      { id: "l1", title: "Reading", completed: true },
                      { id: "l2", title: "Quiz", completed: true },
                    ],
                  },
                  {
                    id: "b",
                    defaultExpanded: false,
                    title: "Part B",
                    lessons: [{ id: "l4", title: "Project kickoff", completed: false }],
                  },
                ]}
                onLessonSelect={() => {}}
              />
            </div>,
            <div key="sn-2" className="w-full max-w-md">
              <SyllabusNavigator
                activeLessonId="x1"
                modules={[
                  {
                    id: "m",
                    title: "Week 1",
                    lessons: [
                      { id: "x1", title: "Lecture capture", completed: false },
                      { id: "x2", title: "Discussion", completed: false },
                    ],
                  },
                ]}
                onLessonSelect={() => {}}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "assignment-dropzone":
      return (
        <DemoFrame
          id="assignment-dropzone"
          title="<AssignmentDropzone />"
          description="Assignment-scoped uploads with accept list, optional size cap, live deadline countdown, and receipt state."
          examplePreviews={[
            <div key="ad-0" className="w-full max-w-lg">
              <AssignmentDropzone
                accept=".pdf,.py,.zip,image/*"
                assignmentTitle="Lab 3 — Submit notebook"
                deadline={new Date(Date.now() + 86400000 * 2).toISOString()}
                maxBytes={12 * 1024 * 1024}
              />
            </div>,
            <div key="ad-1" className="w-full max-w-lg">
              <AssignmentDropzone
                accept=".pdf"
                assignmentTitle="Final reflection"
                deadline={new Date(Date.now() + 86400000 * 5).toISOString()}
                maxBytes={5 * 1024 * 1024}
              />
            </div>,
            <div key="ad-2" className="w-full max-w-lg">
              <AssignmentDropzone
                accept="*/*"
                assignmentTitle="Portfolio artifact drop"
                deadline={new Date(Date.now() + 7 * 86400000).toISOString()}
                maxBytes={25 * 1024 * 1024}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "grade-book":
      return (
        <DemoFrame
          id="grade-book"
          title="<GradeBook />"
          description="Students × assignments with colored bands, inline edit, and optional weighted categories."
          examplePreviews={[
            <div key="gb-0" className="w-full overflow-x-auto">
              <GradeBookBasicPreview />
            </div>,
            <div key="gb-1" className="w-full overflow-x-auto">
              <GradeBookWeightedPreview />
            </div>,
            <div key="gb-2" className="w-full overflow-x-auto">
              <GradeBookManyStudentsPreview />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "reading-annotator":
      return (
        <DemoFrame
          id="reading-annotator"
          title="<ReadingAnnotator />"
          description="Selectable text, saved highlights, margin notes—serialize highlights via onAnnotationsChange."
          examplePreviews={[
            <div key="ra-0" className="w-full max-w-2xl">
              <ReadingAnnotatorEmptyPreview />
            </div>,
            <div key="ra-1" className="w-full max-w-2xl">
              <ReadingAnnotatorNotesPreview />
            </div>,
            <div key="ra-2" className="w-full max-w-2xl">
              <ReadingAnnotatorShortPreview />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "knowledge-check":
      return (
        <DemoFrame
          id="knowledge-check"
          title="<KnowledgeCheck />"
          description="Inline comprehension gate (1–3 MCQs); unlocks following lesson content when correct."
          examplePreviews={[
            <div key="kc-0" className="max-w-lg">
              <KnowledgeCheck
                questions={[
                  {
                    id: "k1",
                    prompt: "What is the primary role of chlorophyll?",
                    options: ["Store DNA", "Capture light energy", "Move water", "Fix nitrogen"],
                    correctIndex: 1,
                  },
                ]}
                title="Before you continue"
              >
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">Lesson content after pass.</div>
              </KnowledgeCheck>
            </div>,
            <div key="kc-1" className="max-w-lg">
              <KnowledgeCheck
                questions={[
                  {
                    id: "a",
                    prompt: "Photosynthesis outputs include:",
                    options: ["Only O₂", "Glucose and O₂", "Only CO₂", "ATP only"],
                    correctIndex: 1,
                  },
                  {
                    id: "b",
                    prompt: "The Calvin cycle runs in the:",
                    options: ["Thylakoid", "Stroma", "Nucleus", "Ribosome"],
                    correctIndex: 1,
                  },
                ]}
                title="Checkpoint"
              >
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">Next video unlocks here.</div>
              </KnowledgeCheck>
            </div>,
            <div key="kc-2" className="max-w-lg">
              <KnowledgeCheck
                questions={[
                  {
                    id: "q1",
                    prompt: "2 + 2 = ?",
                    options: ["3", "4", "5", "22"],
                    correctIndex: 1,
                  },
                ]}
                title="Quick warm-up"
              >
                <p className="text-sm text-muted-foreground">You passed—scroll on.</p>
              </KnowledgeCheck>
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "certificate-renderer":
      return (
        <DemoFrame
          id="certificate-renderer"
          title="<CertificateRenderer />"
          description="Completion certificate preview; PNG download via canvas, PDF via system print-to-PDF."
          examplePreviews={[
            <div key="cr-0" className="max-w-3xl">
              <CertificateRenderer
                data={{
                  studentName: "Alex Morgan",
                  courseName: "Introduction to Data Literacy",
                  completedAt: new Date(),
                  instructorName: "Dr. Priya Nair",
                  subtitle: "With distinction",
                }}
                organizationName="EdPear Academy"
              />
            </div>,
            <div key="cr-1" className="max-w-3xl">
              <CertificateRenderer
                data={{
                  studentName: "Jordan Lee",
                  courseName: "Cell Biology 101",
                  completedAt: new Date(),
                  instructorName: "Dr. Kim",
                }}
                organizationName="State College"
              />
            </div>,
            <div key="cr-2" className="max-w-3xl">
              <CertificateRenderer
                data={{
                  studentName: "Sam Rivera",
                  courseName: "Professional Writing Studio",
                  completedAt: new Date(),
                  instructorName: "Prof. Nguyen",
                  subtitle: "Honors cohort",
                }}
                organizationName="Metropolitan Institute of Design & Letters"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "learning-path-map":
      return (
        <DemoFrame
          id="learning-path-map"
          title="<LearningPathMap />"
          description="SVG curriculum graph with locked, available, current, and completed nodes plus directed edges."
          examplePreviews={[
            <div key="lpm-0" className="w-full overflow-x-auto">
              <LearningPathMap
                edges={[
                  { from: "a", to: "b" },
                  { from: "b", to: "c" },
                ]}
                nodes={[
                  { id: "a", label: "Start", x: 120, y: 260, state: "completed" },
                  { id: "b", label: "Next", x: 320, y: 260, state: "current" },
                  { id: "c", label: "End", x: 520, y: 260, state: "locked" },
                ]}
                onNodeSelect={() => {}}
              />
            </div>,
            <div key="lpm-1" className="w-full overflow-x-auto">
              <LearningPathMap
                edges={[
                  { from: "a", to: "b" },
                  { from: "b", to: "c" },
                  { from: "b", to: "d" },
                  { from: "c", to: "e" },
                  { from: "d", to: "e" },
                ]}
                nodes={[
                  { id: "a", label: "Start", x: 120, y: 260, state: "completed" },
                  { id: "b", label: "Split", x: 320, y: 260, state: "completed" },
                  { id: "c", label: "Track A", x: 520, y: 140, state: "current" },
                  { id: "d", label: "Track B", x: 520, y: 380, state: "available" },
                  { id: "e", label: "Capstone", x: 780, y: 260, state: "locked" },
                ]}
                onNodeSelect={() => {}}
              />
            </div>,
            <div key="lpm-2" className="w-full overflow-x-auto">
              <LearningPathMap
                edges={[{ from: "x", to: "y" }]}
                nodes={[
                  { id: "x", label: "Learn", x: 200, y: 200, state: "completed" },
                  { id: "y", label: "Build", x: 420, y: 200, state: "completed" },
                ]}
                onNodeSelect={() => {}}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "peer-review-panel":
      return (
        <DemoFrame
          id="peer-review-panel"
          title="<PeerReviewPanel />"
          description="Submission preview alongside rubric rows, numeric scores, per-criterion comments, and submit."
          examplePreviews={[
            <div key="pr-0" className="w-full max-w-3xl">
              <PeerReviewSinglePreview />
            </div>,
            <div key="pr-1" className="w-full max-w-3xl">
              <PeerReviewFullPreview />
            </div>,
            <div key="pr-2" className="w-full max-w-3xl">
              <PeerReviewCodePreview />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "session-timer":
      return (
        <DemoFrame
          id="session-timer"
          title="<SessionTimer />"
          description="Pomodoro phases, rolling log, and focus score; short durations in this demo for quick testing."
          examplePreviews={[
            <div key="stimer-0" className="max-w-sm">
              <SessionTimer breakDurationSec={300} workDurationSec={1500} />
            </div>,
            <div key="stimer-1" className="max-w-sm">
              <SessionTimer breakDurationSec={4} workDurationSec={8} />
            </div>,
            <div key="stimer-2" className="max-w-sm">
              <SessionTimer breakDurationSec={600} workDurationSec={3600} />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "onboarding-checklist":
      return (
        <DemoFrame
          id="onboarding-checklist"
          title="<OnboardingChecklist />"
          description="Dismissible learner checklist with XP hints; use embedded for in-page layouts or default fixed for app chrome."
          examplePreviews={[
            <div key="ob-0" className="w-full">
              <OnboardingWelcomePreview />
            </div>,
            <div key="ob-1" className="w-full">
              <OnboardingProgressPreview />
            </div>,
            <div key="ob-2" className="w-full">
              <OnboardingCompletePreview />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "course-dashboard":
      return (
        <DemoFrame
          id="course-dashboard"
          title="<CourseDashboard />"
          description="Course home shell: header, progress ring, slots for next lesson, activity, instructor, and announcements."
          examplePreviews={[
            <div key="cd-0" className="w-full max-w-4xl">
              <CourseDashboard
                activitySlot={
                  <ActivityFeed
                    items={[
                      {
                        id: "d1",
                        type: "lesson_complete",
                        message: "You finished Module 1 quiz",
                        timestamp: new Date(),
                      },
                    ]}
                    title=""
                  />
                }
                announcementSlot={<span className="font-medium">Reminder: live review Thursday 4pm.</span>}
                course={{
                  code: "BIO 101",
                  subtitle: "Spring cohort",
                  title: "Introduction to Cell Biology",
                }}
                instructorSlot={<p className="text-sm">Dr. Kim · office hours Wed 2–4</p>}
                nextLessonSlot={
                  <button
                    type="button"
                    className="w-full rounded-lg bg-foreground py-2 text-sm font-medium text-background hover:bg-foreground/90"
                  >
                    Resume: Mitochondria lab walkthrough
                  </button>
                }
                progressPercent={46}
              />
            </div>,
            <div key="cd-1" className="w-full max-w-4xl">
              <CourseDashboard
                activitySlot={<ActivityFeed items={[]} title="No activity yet" />}
                course={{ code: "CS 220", title: "Data structures" }}
                nextLessonSlot={<button type="button">Start lesson 1</button>}
                progressPercent={0}
              />
            </div>,
            <div key="cd-2" className="w-full max-w-4xl">
              <CourseDashboard
                activitySlot={
                  <ActivityFeed
                    items={[{ id: "x", type: "badge", message: "Badge: problem set master", timestamp: new Date() }]}
                  />
                }
                announcementSlot={<span>Capstone due in 3 days.</span>}
                course={{ code: "MATH 410", subtitle: "Honors", title: "Real analysis" }}
                instructorSlot={<p className="text-sm">Prof. Ortiz</p>}
                nextLessonSlot={<button type="button">Open final review sheet</button>}
                progressPercent={94}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "activity-feed":
      return (
        <DemoFrame
          id="activity-feed"
          title="<ActivityFeed />"
          description="Chronological course activity with icons and relative timestamps."
          examplePreviews={[
            <div key="af-0" className="max-w-md">
              <ActivityFeed
                items={[
                  {
                    id: "a1",
                    type: "lesson_complete",
                    actor: "Maya",
                    message: "completed Lesson 3 · Cellular respiration",
                    timestamp: new Date(Date.now() - 120000),
                  },
                  {
                    id: "a2",
                    type: "discussion",
                    actor: "Alex",
                    message: "posted in Module 2 discussion",
                    timestamp: new Date(Date.now() - 3600000),
                  },
                  {
                    id: "a3",
                    type: "badge",
                    message: "You earned badge “Week warrior”",
                    timestamp: new Date(Date.now() - 86400000),
                  },
                ]}
              />
            </div>,
            <div key="af-1" className="max-w-md">
              <ActivityFeed items={[]} title="Recent activity" />
            </div>,
            <div key="af-2" className="max-w-md">
              <ActivityFeed
                items={[
                  { id: "b1", type: "lesson_complete", message: "Quiz 2 submitted", timestamp: new Date() },
                  { id: "b2", type: "discussion", message: "Instructor replied to your thread", timestamp: new Date() },
                ]}
                title="Today"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "enrollment-gate":
      return (
        <DemoFrame
          id="enrollment-gate"
          title="<EnrollmentGate />"
          description="Shows children or a lock overlay for purchase, prerequisite, or not-started flows."
          examplePreviews={[
            <div key="eg-0" className="max-w-md">
              <EnrollmentGate completedPrereq enrolled gateType="prerequisite" hasAccess>
                <p className="rounded-lg border border-border bg-muted/30 p-6 text-sm">Lesson body when allowed through.</p>
              </EnrollmentGate>
            </div>,
            <div key="eg-1" className="max-w-md">
              <EnrollmentGate
                completedPrereq={false}
                enrolled
                gateType="prerequisite"
                hasAccess
                onAction={() => {}}
              >
                <p className="p-6 text-sm">Hidden until prerequisite completes.</p>
              </EnrollmentGate>
            </div>,
            <div key="eg-2" className="w-full max-w-md min-h-[260px]">
              <EnrollmentGate enrolled={false} gateType="purchase" hasAccess={false} onAction={() => {}}>
                <div className="space-y-3 rounded-lg border border-border bg-muted/25 p-6 text-sm">
                  <p className="font-medium text-foreground">Unit 3 — Polymorphism</p>
                  <p className="leading-relaxed text-muted-foreground">
                    Preview learners see this blurred block until they enroll. Keep it short so the lock overlay reads as
                    the primary CTA.
                  </p>
                </div>
              </EnrollmentGate>
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "student-profile-card":
      return (
        <DemoFrame
          id="student-profile-card"
          title="<StudentProfileCard />"
          description="Learner summary with streak, course count, badges, and SVG progress ring; compact variant for tight grids."
          examplePreviews={[
            <div key="sp-0" className="max-w-sm">
              <StudentProfileCard
                badges={[
                  { id: "1", label: "Early bird" },
                  { id: "2", label: "Top 10%" },
                ]}
                coursesEnrolled={4}
                name="Jordan Lee"
                progressPercent={72}
                streakDays={12}
              />
            </div>,
            <div key="sp-1" className="max-w-sm">
              <StudentProfileCard
                compact
                coursesEnrolled={2}
                name="Sam Rivera"
                progressPercent={40}
                streakDays={3}
              />
            </div>,
            <div key="sp-2" className="max-w-sm">
              <StudentProfileCard
                badges={[]}
                coursesEnrolled={1}
                name="Avery Kim"
                progressPercent={8}
                streakDays={0}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "live-class-banner":
      return (
        <DemoFrame
          id="live-class-banner"
          title="<LiveClassBanner />"
          description="Top banner for scheduled, live (elapsed + headcount), or ended sessions with join CTA."
          examplePreviews={[
            <div key="lb-0" className="w-full max-w-3xl">
              <LiveClassBanner
                hostName="Dr. Kim"
                joinHref="#"
                participantCount={24}
                scheduledFor={new Date(Date.now() + 3600000)}
                sessionTitle="Cell biology review"
                status="scheduled"
              />
            </div>,
            <div key="lb-1" className="w-full max-w-3xl">
              <LiveClassBanner
                hostName="Dr. Kim"
                joinHref="#"
                participantCount={24}
                sessionTitle="Cell biology review"
                startedAt={new Date(Date.now() - 125000)}
                status="live"
              />
            </div>,
            <div key="lb-2" className="w-full max-w-3xl">
              <LiveClassBanner hostName="Dr. Kim" sessionTitle="Cell biology review" status="ended" />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "feedback-slider":
      return (
        <DemoFrame
          id="feedback-slider"
          title="<FeedbackSlider />"
          description="Stars, emoji scale, or NPS with optional comment—single onSubmit payload."
          examplePreviews={[
            <div key="fs-0" className="w-full">
              <FeedbackSliderVariantPreview title="How clear was this lesson?" variant="stars" />
            </div>,
            <div key="fs-1" className="w-full">
              <FeedbackSliderVariantPreview
                title="How likely are you to recommend this course?"
                variant="nps"
              />
            </div>,
            <div key="fs-2" className="w-full">
              <FeedbackSliderVariantPreview title="How did this lab feel?" variant="emoji" />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "question-bank":
      return (
        <DemoFrame
          id="question-bank"
          title="<QuestionBank />"
          description="Searchable question library with filters; drag rows or use the drop zone to stage items for a quiz builder."
          examplePreviews={[
            <div key="qb-0" className="w-full max-w-3xl">
              <QuestionBankPreview pool={QB_POOL_A} />
            </div>,
            <div key="qb-1" className="w-full max-w-3xl">
              <QuestionBankPreview pool={QB_POOL_B} />
            </div>,
            <div key="qb-2" className="w-full max-w-3xl">
              <QuestionBankPreview pool={QB_POOL_C} />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "math-renderer":
      return (
        <DemoFrame
          id="math-renderer"
          title="<MathRenderer />"
          description="KaTeX for $inline$ and $$block$$ math plus simple **bold** in prose; copy raw LaTeX."
          examplePreviews={[
            <div key="mr-0" className="max-w-xl">
              <MathRenderer content="The **quadratic formula** is $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$." />
            </div>,
            <div key="mr-1" className="max-w-xl">
              <MathRenderer
                content={
                  "The Gaussian integral:\n$$\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$$"
                }
              />
            </div>,
            <div key="mr-2" className="max-w-xl">
              <MathRenderer content="Euler: $e^{i\pi} + 1 = 0$. Pythagoras: $a^2 + b^2 = c^2$." />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "diff-viewer":
      return (
        <DemoFrame
          id="diff-viewer"
          title="<DiffViewer />"
          description="Line diff for code or prose—inline unified or side-by-side panels."
          examplePreviews={[
            <div key="dv-0" className="w-full max-w-3xl overflow-x-auto">
              <DiffViewer
                after={`def greet(name):\n    return f"Hello, {name}!"\n`}
                before={`def greet(name):\n    return "Hello, " + name\n`}
                mode="inline"
              />
            </div>,
            <div key="dv-1" className="w-full max-w-3xl overflow-x-auto">
              <DiffViewer
                after={`def greet(name):\n    return f"Hello, {name}!"\n`}
                before={`def greet(name):\n    return "Hello, " + name\n`}
                mode="side-by-side"
              />
            </div>,
            <div key="dv-2" className="w-full max-w-3xl overflow-x-auto">
              <DiffViewer
                after="Learners must submit by 11:59 PM local time."
                before="Learners must submit by end of day Friday."
                mode="inline"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "rich-text-editor":
      return (
        <DemoFrame
          id="rich-text-editor"
          title="<RichTextEditor />"
          description="Tiptap-based rich text for notes and instructions."
          examplePreviews={[
            <div key="rte-0" className="w-full max-w-2xl">
              <RichTextEditor defaultValue="<p><strong>Lab notes:</strong> We observed faster reaction at higher T.</p>" />
            </div>,
            <div key="rte-1" className="w-full max-w-2xl">
              <RichTextEditor defaultValue="<p></p>" />
            </div>,
            <div key="rte-2" className="w-full max-w-2xl">
              <RichTextEditor defaultValue="<p>Hi everyone — <em>read chapter 4</em> before Tuesday.</p>" />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "code-playground":
      return (
        <DemoFrame
          id="code-playground"
          title="<CodePlayground />"
          description="Runnable code snippet with language switch and mock output."
          examplePreviews={[
            <div key="cp-0" className="w-full max-w-2xl">
              <CodePlayground
                defaultValue="console.log('hello');"
                language="javascript"
                onRun={async (code) => `Output for:\n${code}`}
              />
            </div>,
            <div key="cp-1" className="w-full max-w-2xl">
              <CodePlayground
                defaultValue={`def square(n):\n    return n * n\n\nprint(square(7))`}
                language="python"
                onRun={async (code) => `Ran:\n${code}`}
              />
            </div>,
            <div key="cp-2" className="w-full max-w-2xl">
              <CodePlayground
                defaultValue={`const doubled = [1, 2, 3].map((x) => x * 2);\nconsole.log(doubled);`}
                language="javascript"
                onRun={async (code) => `Would execute:\n${code}`}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "discussion-thread":
      return (
        <DemoFrame
          id="discussion-thread"
          title="<DiscussionThread />"
          description="Threaded comments with roles, timestamps, and upvotes."
          examplePreviews={[
            <div key="dt-0" className="w-full max-w-2xl">
              <DiscussionThread
                comments={[
                  {
                    id: "c1",
                    author: "Ava",
                    content: "Great point about condensation.",
                    role: "Student",
                    timestamp: "2 minutes ago",
                    upvotes: 4,
                    replies: [],
                  },
                ]}
              />
            </div>,
            <div key="dt-1" className="w-full max-w-2xl">
              <DiscussionThread
                comments={[
                  {
                    id: "c1",
                    author: "Ava",
                    content: "I chose condensation because vapor cools into droplets.",
                    role: "Student",
                    timestamp: "2 minutes ago",
                    upvotes: 4,
                    replies: [
                      {
                        id: "c1-r1",
                        author: "Noah",
                        content: "The cloud model from the video made that click for me.",
                        role: "Student",
                        timestamp: "1 minute ago",
                        upvotes: 2,
                      },
                    ],
                  },
                ]}
              />
            </div>,
            <div key="dt-2" className="w-full max-w-2xl">
              <DiscussionThread
                comments={[
                  {
                    id: "m1",
                    author: "Dr. Kim",
                    content: "Keep posts under 200 words so peers can skim.",
                    role: "Instructor",
                    timestamp: "Yesterday",
                    upvotes: 12,
                    replies: [],
                  },
                ]}
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "ai-feedback":
      return (
        <DemoFrame
          id="ai-feedback"
          title="<AIFeedback />"
          description="Compares a student answer to a model response (needs OpenRouter)."
          examplePreviews={[
            <div key="aif-0" className="max-w-xl">
              <AIFeedback
                apiKey={apiKey}
                correctAnswer="Plants use CO₂ during photosynthesis."
                studentAnswer="Plants absorb oxygen to make sugar."
              />
            </div>,
            <div key="aif-1" className="max-w-xl">
              <AIFeedback
                apiKey={apiKey}
                correctAnswer="Plants use CO₂ during photosynthesis."
                rubricFocus="Correct misconceptions gently."
                studentAnswer="Plants absorb oxygen to make sugar."
              />
            </div>,
            <div key="aif-2" className="max-w-xl">
              <AIFeedback
                apiKey={apiKey}
                correctAnswer="The Treaty of Versailles was signed in 1919."
                rubricFocus="Name dates and parties explicitly."
                studentAnswer="The peace treaty after WWI was in 1815 at Vienna."
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "ai-hint":
      return (
        <DemoFrame
          id="ai-hint"
          title="<AIHint />"
          description="Socratic hint from the learner’s partial work."
          examplePreviews={[
            <div key="aih-0" className="max-w-xl">
              <AIHint
                apiKey={apiKey}
                prompt="Solve for x: 3x + 9 = 18"
                studentAttempt="I subtracted 3 first."
              />
            </div>,
            <div key="aih-1" className="max-w-xl">
              <AIHint
                apiKey={apiKey}
                prompt="A train goes 120 km in 2 hours. What is its average speed?"
                studentAttempt="I multiplied 120 by 2."
              />
            </div>,
            <div key="aih-2" className="max-w-xl">
              <AIHint
                apiKey={apiKey}
                prompt="Find the area of a circle with radius 5."
                studentAttempt="I added 5 + 5."
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "ai-quiz-generator":
      return (
        <DemoFrame
          id="ai-quiz-generator"
          title="<AIQuizGenerator />"
          description="Generates quiz items from topic + source text."
          examplePreviews={[
            <div key="aiq-0" className="max-w-xl">
              <AIQuizGenerator
                apiKey={apiKey}
                count={3}
                sourceText="The water cycle includes evaporation, condensation, precipitation, and collection."
                topic="The water cycle"
              />
            </div>,
            <div key="aiq-1" className="max-w-xl">
              <AIQuizGenerator
                apiKey={apiKey}
                count={5}
                sourceText="Mitochondria produce ATP; chloroplasts capture light energy."
                topic="Cell energetics"
              />
            </div>,
            <div key="aiq-2" className="max-w-xl">
              <AIQuizGenerator
                apiKey={apiKey}
                count={1}
                sourceText="Fractions represent parts of a whole; denominators cannot be zero."
                topic="Fraction basics"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    case "ai-tutor":
      return (
        <DemoFrame
          id="ai-tutor"
          title="<AITutor />"
          description="Lesson-scoped Socratic chat via OpenRouter; injects lessonContent into the system prompt."
          examplePreviews={[
            <div key="ait-0" className="w-full max-w-lg">
              <AITutor
                apiKey={apiKey}
                className="h-[400px] max-h-[48vh] min-h-[300px]"
                lessonContent="Lesson: Photosynthesis. Key ideas: chloroplasts, light reactions, Calvin cycle, outputs O₂ and glucose."
                title="Photosynthesis tutor"
              />
            </div>,
            <div key="ait-1" className="w-full max-w-lg">
              <AITutor
                apiKey={apiKey}
                className="h-[400px] max-h-[48vh] min-h-[300px]"
                lessonContent="Lesson: Solving linear equations. Isolate the variable; perform the same operation on both sides."
                title="Algebra coach"
              />
            </div>,
            <div key="ait-2" className="w-full max-w-lg">
              <AITutor
                apiKey={apiKey}
                className="h-[400px] max-h-[48vh] min-h-[300px]"
                lessonContent="Lesson: Thesis statements. Arguable claim, scope, roadmap for body paragraphs."
                title="Writing studio"
              />
            </div>,
          ]}
        >
          {null}
        </DemoFrame>
      );

    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
