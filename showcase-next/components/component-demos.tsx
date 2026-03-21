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
import type { ReadingHighlight } from "edpear";
import { Code } from "lucide-react";

import { DemoFrame } from "./component-doc-page";
import type { ShowcaseSlug } from "../lib/showcase-nav";

const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";
function FeedbackSliderDemo() {
  const [log, setLog] = useState<string | null>(null);
  return (
    <div className="max-w-md space-y-4">
      <FeedbackSlider
        onSubmit={(p) => setLog(JSON.stringify(p, null, 2))}
        title="Quick check-in"
        variant="stars"
      />
      {log ? (
        <pre className="rounded-md border bg-muted/50 p-3 text-xs">{log}</pre>
      ) : null}
    </div>
  );
}

function QuestionBankDemo() {
  const [added, setAdded] = useState<string[]>([]);
  const pool = [
    {
      id: "qb1",
      topic: "Photosynthesis",
      difficulty: "medium" as const,
      type: "mcq" as const,
      prompt: "Which organelle is the main site of photosynthesis?",
    },
    {
      id: "qb2",
      topic: "Photosynthesis",
      difficulty: "easy" as const,
      type: "short-answer" as const,
      prompt: "Name one product of the light-dependent reactions.",
    },
    {
      id: "qb3",
      topic: "Cell division",
      difficulty: "hard" as const,
      type: "essay" as const,
      prompt: "Compare mitosis and meiosis in three sentences.",
    },
    {
      id: "qb4",
      topic: "Cell division",
      difficulty: "medium" as const,
      type: "true-false" as const,
      prompt: "Crossing over occurs during prophase I of meiosis.",
    },
  ];
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
        Added to builder (demo): {added.length ? added.join(", ") : "—"}
      </p>
    </div>
  );
}

function OnboardingDemo() {
  const [done, setDone] = useState<string[]>(["profile"]);
  return (
    <div className="relative min-h-[360px] rounded-lg border border-dashed border-border bg-muted/10">
      <OnboardingChecklist
        completedIds={done}
        embedded
        items={[
          { id: "profile", label: "Complete your profile", xp: 50 },
          { id: "lesson", label: "Watch your first lesson", xp: 100 },
          { id: "discuss", label: "Join a discussion thread", xp: 75 },
        ]}
        onToggle={(id, completed) => {
          setDone((prev) =>
            completed ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id),
          );
        }}
        rewardSlot={
          <p className="text-xs text-muted-foreground">
            Hook: award streak or badge when <code className="rounded bg-muted px-1">completedIds.length</code>{" "}
            matches your product rules.
          </p>
        }
        title="Welcome checklist"
      />
    </div>
  );
}

function PeerReviewDemo() {
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

function ReadingAnnotatorDemo() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([
    { id: "h1", start: 0, end: 42, color: "#bfdbfe", note: "Define jurisdiction early." },
  ]);
  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={(p) => setHighlights(p.highlights)}
      text={`Courts must determine whether they have personal jurisdiction before reaching the merits. The familiar minimum-contacts framework balances fairness with purposeful availment.\n\nLong-form readings benefit from inline highlights and persistent margin notes stored as JSON.`}
    />
  );
}

function GradeBookDemo() {
  const [grades, setGrades] = useState<Record<string, Record<string, string>>>({
    s1: { q1: "92", q2: "B+", q3: "78" },
    s2: { q1: "74", q2: "88%", q3: "A-" },
  });
  return (
    <GradeBook
      assignments={[
        { id: "q1", title: "Quiz 1", categoryId: "cat-quiz" },
        { id: "q2", title: "Midterm", categoryId: "cat-exam" },
        { id: "q3", title: "Project", categoryId: "cat-proj" },
      ]}
      categories={[
        { id: "cat-quiz", name: "Quizzes", weight: 0.25 },
        { id: "cat-exam", name: "Exams", weight: 0.45 },
        { id: "cat-proj", name: "Project", weight: 0.3 },
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


export function ComponentDemo({ slug }: { slug: ShowcaseSlug }) {
  switch (slug) {
    case "course-card":
      return (
        <DemoFrame
          id="course-card"
          title="<CourseCard />"
          description="Course summary with progress, instructor, and CTA—use badges, thumbnails, custom icons, and progress to match catalog, dashboard, and completion flows."
        >
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-semibold text-foreground">In progress — cohort course</h3>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Category + status pills, body copy, and partial progress. Good for “continue learning” rows.
              </p>
              <div className="mt-4 max-w-md">
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
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Not started — self-paced</h3>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Zero progress and a start CTA. Omit extras you don’t need (e.g. no category tag).
              </p>
              <div className="mt-4 max-w-md">
                <CourseCard
                  ctaLabel="Start course"
                  description="Cell structure, organelles, and lab prep—go at your own pace."
                  href="#"
                  instructor="Dr. Kim · Biology"
                  progress={0}
                  status="Self-paced"
                  title="Introduction to Cell Biology"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">Completed — thumbnail + custom icon slot</h3>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Use <code className="rounded bg-muted px-1 font-mono text-xs">thumbnailSrc</code> for artwork, or{" "}
                <code className="rounded bg-muted px-1 font-mono text-xs">icon</code> when you only want a branded
                placeholder (shown when there’s no image).
              </p>
              <div className="mt-4 grid max-w-4xl gap-8 md:grid-cols-2">
                <CourseCard
                  categoryTag="Web"
                  ctaLabel="Review materials"
                  description="You finished all modules—revisit lessons or download the capstone rubric."
                  href="#"
                  instructor="Alex Rivera"
                  progress={100}
                  status="Completed"
                  thumbnailAlt="Code editor on a laptop"
                  thumbnailSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                  title="Full-stack project studio"
                />
                <CourseCard
                  ctaLabel="Open syllabus"
                  description="Rust ownership, borrowing, and error handling with weekly exercises."
                  href="#"
                  icon={<Code className="h-10 w-10 text-primary" aria-hidden />}
                  instructor="Engineering · CS 310"
                  progress={12}
                  status="Enrollment open"
                  title="Systems programming in Rust"
                />
              </div>
            </div>
          </div>
        </DemoFrame>
      );

    case "lesson-progress":
      return (
        <DemoFrame
          id="lesson-progress"
          title="<LessonProgress />"
          description="Vertical lesson stepper with progress bar—use for module flows, studio weeks, and exam prep paths inside your LMS."
          examplePreviews={[
            <div key="lp-0" className="w-full max-w-lg">
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
            <div key="lp-1" className="w-full max-w-lg">
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
            <div key="lp-2" className="w-full max-w-lg">
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
            <div key="lp-3" className="w-full max-w-xs">
              <LessonProgress
                currentStep={1}
                showLabels={false}
                steps={[
                  { id: "syllabus", label: "Syllabus & setup", description: "Course policies and Python install." },
                  { id: "video", label: "Variables video", description: "12 min in the player." },
                  { id: "lab", label: "First notebook lab", description: "Pandas intro cells." },
                  { id: "submit", label: "Warm-up checkpoint", description: "Due before lesson 2." },
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
                    description="Multiple-choice question with instant feedback."
                  >
                    <div className="max-w-lg">
                      <QuizCard
                        choices={["Evaporation", "Condensation", "Freezing", "Melting"]}
                        correctAnswer="Condensation"
                        description="Choose the process that forms clouds from water vapor."
                        question="What part of the water cycle turns vapor back into liquid droplets?"
                        variant="multiple-choice"
                      />
                    </div>
                  </DemoFrame>
      );

    case "timed-quiz":
      return (
        <DemoFrame
                    id="timed-quiz"
                    title="<TimedQuiz />"
                    description="Short answer with a countdown timer."
                  >
                    <div className="max-w-lg">
                      <TimedQuiz
                        correctAnswer="4"
                        description="Answer before the timer expires."
                        duration={25}
                        question="How many sides does a square have?"
                        variant="short-answer"
                      />
                    </div>
                  </DemoFrame>
      );

    case "flash-card":
      return (
        <DemoFrame
                    id="flash-card"
                    title="<FlashCard />"
                    description="Flip-style recall for terms and definitions."
                  >
                    <div className="max-w-md">
                      <FlashCard
                        back="Photosynthesis mainly happens in the chloroplasts of plant cells."
                        front="Where in a plant cell does photosynthesis happen?"
                      />
                    </div>
                  </DemoFrame>
      );

    case "badge-award":
      return (
        <DemoFrame
                    id="badge-award"
                    title="<BadgeAward />"
                    description="Achievement callout with title and earned state."
                  >
                    <div className="max-w-sm">
                      <BadgeAward
                        description="Completed a full week of lessons without missing a day."
                        earnedAt="today"
                        title="Consistency Champ"
                      />
                    </div>
                  </DemoFrame>
      );

    case "streak-tracker":
      return (
        <DemoFrame
                    id="streak-tracker"
                    title="<StreakTracker />"
                    description="Weekly streak visualization with a numeric goal."
                  >
                    <div className="max-w-md">
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
                    </div>
                  </DemoFrame>
      );

    case "score-display":
      return (
        <DemoFrame
                    id="score-display"
                    title="<ScoreDisplay />"
                    description="Score vs max with passing threshold context."
                  >
                    <div className="max-w-sm">
                      <ScoreDisplay maxScore={20} passingScore={14} score={17} />
                    </div>
                  </DemoFrame>
      );

    case "video-lesson":
      return (
        <DemoFrame
                    id="video-lesson"
                    title="<VideoLesson />"
                    description="Embedded player with chapter markers (YouTube)."
                  >
                    <VideoLesson
                      chapters={[
                        { id: "intro", label: "What is a fraction?", time: 0 },
                        { id: "model", label: "Visual model", time: 75 },
                        { id: "practice", label: "Practice prompt", time: 150 },
                      ]}
                      title="Fractions in Everyday Contexts"
                      youtubeId="M7lc1UVf-VE"
                    />
                  </DemoFrame>
      );

    case "syllabus-navigator":
      return (
        <DemoFrame
                    id="syllabus-navigator"
                    title="<SyllabusNavigator />"
                    description="Collapsible LMS outline with completion and locks; drag modules when reorder is enabled."
                  >
                    <SyllabusNavigator
                      activeLessonId="l2"
                      reorderEnabled
                      onLessonSelect={() => {}}
                      onModulesReorder={() => {}}
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
                        {
                          id: "m2",
                          title: "Unit 2 — Applications",
                          defaultExpanded: false,
                          lessons: [{ id: "l4", title: "Case study intro", completed: false }],
                        },
                      ]}
                    />
                  </DemoFrame>
      );

    case "assignment-dropzone":
      return (
        <DemoFrame
                    id="assignment-dropzone"
                    title="<AssignmentDropzone />"
                    description="Assignment-scoped uploads with accept list, optional size cap, live deadline countdown, and receipt state."
                  >
                    <div className="max-w-lg">
                      <AssignmentDropzone
                        accept=".pdf,.py,.zip,image/*"
                        assignmentTitle="Lab 3 — Submit notebook"
                        deadline={new Date(Date.now() + 86400000 * 2).toISOString()}
                        maxBytes={12 * 1024 * 1024}
                      />
                    </div>
                  </DemoFrame>
      );

    case "grade-book":
      return (
        <DemoFrame
                    id="grade-book"
                    title="<GradeBook />"
                    description="Students × assignments with colored bands, inline edit, and optional weighted categories."
                  >
                    <GradeBookDemo />
                  </DemoFrame>
      );

    case "reading-annotator":
      return (
        <DemoFrame
                    id="reading-annotator"
                    title="<ReadingAnnotator />"
                    description="Selectable text, saved highlights, margin notes—serialize highlights via onAnnotationsChange."
                  >
                    <ReadingAnnotatorDemo />
                  </DemoFrame>
      );

    case "knowledge-check":
      return (
        <DemoFrame
                    id="knowledge-check"
                    title="<KnowledgeCheck />"
                    description="Inline comprehension gate (1–3 MCQs); unlocks following lesson content when correct."
                  >
                    <div className="max-w-lg space-y-4">
                      <KnowledgeCheck
                        questions={[
                          {
                            id: "k1",
                            prompt: "What is the primary role of chlorophyll?",
                            options: ["Store DNA", "Capture light energy", "Move water", "Fix nitrogen"],
                            correctIndex: 1,
                          },
                          {
                            id: "k2",
                            prompt: "Photosynthesis outputs include:",
                            options: ["Only O₂", "Glucose and O₂", "Only CO₂", "ATP only"],
                            correctIndex: 1,
                          },
                        ]}
                        title="Before you continue"
                      >
                        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
                          <strong>Next:</strong> optional lesson body, video embed, or reading that stays locked until the
                          check passes.
                        </div>
                      </KnowledgeCheck>
                    </div>
                  </DemoFrame>
      );

    case "certificate-renderer":
      return (
        <DemoFrame
                    id="certificate-renderer"
                    title="<CertificateRenderer />"
                    description="Completion certificate preview; PNG download via canvas, PDF via system print-to-PDF."
                  >
                    <div className="max-w-3xl">
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
                    </div>
                  </DemoFrame>
      );

    case "learning-path-map":
      return (
        <DemoFrame
                    id="learning-path-map"
                    title="<LearningPathMap />"
                    description="SVG curriculum graph with locked, available, current, and completed nodes plus directed edges."
                  >
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
                        { id: "b", label: "Foundations", x: 320, y: 260, state: "completed" },
                        { id: "c", label: "Track A", x: 520, y: 140, state: "current" },
                        { id: "d", label: "Track B", x: 520, y: 380, state: "available" },
                        { id: "e", label: "Capstone", x: 780, y: 260, state: "locked" },
                      ]}
                      onNodeSelect={() => {}}
                    />
                  </DemoFrame>
      );

    case "peer-review-panel":
      return (
        <DemoFrame
                    id="peer-review-panel"
                    title="<PeerReviewPanel />"
                    description="Submission preview alongside rubric rows, numeric scores, per-criterion comments, and submit."
                  >
                    <PeerReviewDemo />
                  </DemoFrame>
      );

    case "session-timer":
      return (
        <DemoFrame
                    id="session-timer"
                    title="<SessionTimer />"
                    description="Pomodoro phases, rolling log, and focus score; short durations in this demo for quick testing."
                  >
                    <div className="max-w-sm">
                      <SessionTimer breakDurationSec={4} workDurationSec={8} />
                    </div>
                  </DemoFrame>
      );

    case "onboarding-checklist":
      return (
        <DemoFrame
                    id="onboarding-checklist"
                    title="<OnboardingChecklist />"
                    description="Dismissible learner checklist with XP hints; use embedded for in-page layouts or default fixed for app chrome."
                  >
                    <OnboardingDemo />
                  </DemoFrame>
      );

    case "course-dashboard":
      return (
        <DemoFrame
                    id="course-dashboard"
                    title="<CourseDashboard />"
                    description="Course home shell: header, progress ring, slots for next lesson, activity, instructor, and announcements."
                  >
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
                          className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground"
                        >
                          Resume: Mitochondria lab walkthrough
                        </button>
                      }
                      progressPercent={46}
                    />
                  </DemoFrame>
      );

    case "activity-feed":
      return (
        <DemoFrame
                    id="activity-feed"
                    title="<ActivityFeed />"
                    description="Chronological course activity with icons and relative timestamps."
                  >
                    <div className="max-w-md">
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
                    </div>
                  </DemoFrame>
      );

    case "enrollment-gate":
      return (
        <DemoFrame
                    id="enrollment-gate"
                    title="<EnrollmentGate />"
                    description="Shows children or a lock overlay for purchase, prerequisite, or not-started flows."
                  >
                    <div className="grid gap-6 lg:grid-cols-2">
                      <EnrollmentGate completedPrereq enrolled gateType="prerequisite" hasAccess>
                        <p className="rounded-lg border border-border bg-muted/30 p-6 text-sm">Unlocked lesson body.</p>
                      </EnrollmentGate>
                      <EnrollmentGate
                        completedPrereq={false}
                        enrolled
                        gateType="prerequisite"
                        hasAccess
                        onAction={() => {}}
                      >
                        <p className="p-6 text-sm">Hidden behind prerequisite lock.</p>
                      </EnrollmentGate>
                    </div>
                  </DemoFrame>
      );

    case "student-profile-card":
      return (
        <DemoFrame
                    id="student-profile-card"
                    title="<StudentProfileCard />"
                    description="Learner summary with streak, course count, badges, and SVG progress ring; compact variant for tight grids."
                  >
                    <div className="grid max-w-xl gap-4 md:grid-cols-2">
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
                      <StudentProfileCard
                        compact
                        coursesEnrolled={2}
                        name="Sam Rivera"
                        progressPercent={40}
                        streakDays={3}
                      />
                    </div>
                  </DemoFrame>
      );

    case "live-class-banner":
      return (
        <DemoFrame
                    id="live-class-banner"
                    title="<LiveClassBanner />"
                    description="Top banner for scheduled, live (elapsed + headcount), or ended sessions with join CTA."
                  >
                    <div className="space-y-4">
                      <LiveClassBanner
                        hostName="Dr. Kim"
                        joinHref="#"
                        participantCount={24}
                        scheduledFor={new Date(Date.now() + 3600000)}
                        sessionTitle="Cell biology review"
                        status="scheduled"
                      />
                      <LiveClassBanner
                        hostName="Dr. Kim"
                        joinHref="#"
                        participantCount={24}
                        sessionTitle="Cell biology review"
                        startedAt={new Date(Date.now() - 125000)}
                        status="live"
                      />
                      <LiveClassBanner hostName="Dr. Kim" sessionTitle="Cell biology review" status="ended" />
                    </div>
                  </DemoFrame>
      );

    case "feedback-slider":
      return (
        <DemoFrame
                    id="feedback-slider"
                    title="<FeedbackSlider />"
                    description="Stars, emoji scale, or NPS with optional comment—single onSubmit payload."
                  >
                    <FeedbackSliderDemo />
                  </DemoFrame>
      );

    case "question-bank":
      return (
        <DemoFrame
                    id="question-bank"
                    title="<QuestionBank />"
                    description="Searchable question library with filters; drag rows or use the drop zone to stage items for a quiz builder."
                  >
                    <QuestionBankDemo />
                  </DemoFrame>
      );

    case "math-renderer":
      return (
        <DemoFrame
                    id="math-renderer"
                    title="<MathRenderer />"
                    description="KaTeX for $inline$ and $$block$$ math plus simple **bold** in prose; copy raw LaTeX."
                  >
                    <div className="max-w-xl">
                      <MathRenderer content="The **quadratic formula** is $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$.\n\n$$\n\\int_0^1 x^2\\,dx = \\frac{1}{3}\n$$" />
                    </div>
                  </DemoFrame>
      );

    case "diff-viewer":
      return (
        <DemoFrame
                    id="diff-viewer"
                    title="<DiffViewer />"
                    description="Line diff for code or prose—inline unified or side-by-side panels."
                  >
                    <div className="space-y-6">
                      <DiffViewer
                        after={`def greet(name):\n    return f"Hello, {name}!"\n`}
                        before={`def greet(name):\n    return "Hello, " + name\n`}
                        mode="inline"
                      />
                      <DiffViewer
                        after={`def greet(name):\n    return f"Hello, {name}!"\n`}
                        before={`def greet(name):\n    return "Hello, " + name\n`}
                        mode="side-by-side"
                      />
                    </div>
                  </DemoFrame>
      );

    case "rich-text-editor":
      return (
        <DemoFrame
                    id="rich-text-editor"
                    title="<RichTextEditor />"
                    description="Tiptap-based rich text for notes and instructions."
                  >
                    <RichTextEditor defaultValue="<p><strong>Lab notes:</strong> We observed the reaction speed increase when the temperature rose.</p>" />
                  </DemoFrame>
      );

    case "code-playground":
      return (
        <DemoFrame
                    id="code-playground"
                    title="<CodePlayground />"
                    description="Runnable code snippet with language switch and mock output."
                  >
                    <CodePlayground
                      defaultValue={`function area(width, height) {\n  return width * height;\n}\n\nconsole.log(area(4, 3));`}
                      language="javascript"
                      onRun={(code) => `Submission received:\n\n${code}\n\nExpected output:\n12`}
                    />
                  </DemoFrame>
      );

    case "discussion-thread":
      return (
        <DemoFrame
                    id="discussion-thread"
                    title="<DiscussionThread />"
                    description="Threaded comments with roles, timestamps, and upvotes."
                  >
                    <DiscussionThread
                      comments={[
                        {
                          id: "c1",
                          author: "Ava",
                          content:
                            "I chose condensation because the vapor cools and forms droplets in the sky.",
                          role: "Student",
                          timestamp: "2 minutes ago",
                          upvotes: 4,
                          replies: [
                            {
                              id: "c1-r1",
                              author: "Noah",
                              content:
                                "I agree, and the cloud model from the video made that part click for me.",
                              role: "Student",
                              timestamp: "1 minute ago",
                              upvotes: 2,
                            },
                          ],
                        },
                      ]}
                    />
                  </DemoFrame>
      );

    case "ai-feedback":
      return (
        <DemoFrame
                    id="ai-feedback"
                    title="<AIFeedback />"
                    description="Compares a student answer to a model response (needs OpenRouter)."
                  >
                    <div className="max-w-xl">
                      <AIFeedback
                        apiKey={apiKey}
                        correctAnswer="Plants primarily use carbon dioxide during photosynthesis."
                        rubricFocus="Correct misconceptions gently."
                        studentAnswer="Plants absorb oxygen to make sugar."
                      />
                    </div>
                  </DemoFrame>
      );

    case "ai-hint":
      return (
        <DemoFrame
                    id="ai-hint"
                    title="<AIHint />"
                    description="Socratic hint from the learner’s partial work."
                  >
                    <div className="max-w-xl">
                      <AIHint
                        apiKey={apiKey}
                        prompt="Solve for x: 3x + 9 = 18"
                        studentAttempt="I subtracted 3 first."
                      />
                    </div>
                  </DemoFrame>
      );

    case "ai-quiz-generator":
      return (
        <DemoFrame
                    id="ai-quiz-generator"
                    title="<AIQuizGenerator />"
                    description="Generates quiz items from topic + source text."
                  >
                    <AIQuizGenerator
                      apiKey={apiKey}
                      count={3}
                      sourceText="The water cycle includes evaporation, condensation, precipitation, and collection."
                      topic="The water cycle"
                    />
                  </DemoFrame>
      );

    case "ai-tutor":
      return (
        <DemoFrame
                    id="ai-tutor"
                    title="<AITutor />"
                    description="Lesson-scoped Socratic chat via OpenRouter; injects lessonContent into the system prompt."
                  >
                    <div className="max-w-lg">
                      <AITutor
                        apiKey={apiKey}
                        lessonContent="Lesson: Photosynthesis. Key ideas: chloroplasts, light reactions, Calvin cycle, outputs O2 and glucose."
                        title="Photosynthesis tutor"
                      />
                    </div>
                  </DemoFrame>
      );

    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
