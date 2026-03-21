import type { ShowcaseSlug } from "./showcase-nav";

/**
 * Example usage for each showcase slug (imports use published package name).
 */
export const COMPONENT_USAGE_SNIPPETS = {
  "course-card": `import { CourseCard } from "edpear-sdk";

<CourseCard
  categoryTag="Math"
  ctaLabel="Resume module"
  description="Linear equations, worked examples, and quick checks."
  href="/courses/algebra-1"
  instructor="Maya Chen"
  progress={68}
  status="Live cohort"
  title="Algebra I Foundations"
/>`,

  "lesson-progress": `import { LessonProgress } from "edpear-sdk";

<LessonProgress
  currentStep={2}
  steps={[
    { id: "watch", label: "Watch", description: "8 min explainer" },
    { id: "check", label: "Check", description: "Concept checkpoint" },
    { id: "apply", label: "Apply", description: "Independent practice" },
    { id: "reflect", label: "Reflect", description: "Exit ticket" },
  ]}
/>`,

  "quiz-card": `import { QuizCard } from "edpear-sdk";

<QuizCard
  choices={["Evaporation", "Condensation", "Freezing", "Melting"]}
  correctAnswer="Condensation"
  description="Choose the process that forms clouds from water vapor."
  question="What part of the water cycle turns vapor back into liquid droplets?"
  variant="multiple-choice"
/>`,

  "timed-quiz": `import { TimedQuiz } from "edpear-sdk";

<TimedQuiz
  correctAnswer="4"
  description="Answer before the timer expires."
  duration={25}
  question="How many sides does a square have?"
  variant="short-answer"
/>`,

  "flash-card": `import { FlashCard } from "edpear-sdk";

<FlashCard
  back="Photosynthesis mainly happens in the chloroplasts of plant cells."
  front="Where in a plant cell does photosynthesis happen?"
/>`,

  "badge-award": `import { BadgeAward } from "edpear-sdk";

<BadgeAward
  description="Completed a full week of lessons without missing a day."
  earnedAt="today"
  title="Consistency Champ"
/>`,

  "streak-tracker": `import { StreakTracker } from "edpear-sdk";

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
/>`,

  "score-display": `import { ScoreDisplay } from "edpear-sdk";

<ScoreDisplay maxScore={20} passingScore={14} score={17} />`,

  "video-lesson": `import { VideoLesson } from "edpear-sdk";

<VideoLesson
  chapters={[
    { id: "intro", label: "What is a fraction?", time: 0 },
    { id: "model", label: "Visual model", time: 75 },
    { id: "practice", label: "Practice prompt", time: 150 },
  ]}
  title="Fractions in Everyday Contexts"
  youtubeId="M7lc1UVf-VE"
/>`,

  "syllabus-navigator": `import { SyllabusNavigator } from "edpear-sdk";

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
  onLessonSelect={(id) => console.log(id)}
  onModulesReorder={(next) => console.log(next)}
  reorderEnabled
/>`,

  "assignment-dropzone": `import { AssignmentDropzone } from "edpear-sdk";

<AssignmentDropzone
  accept=".pdf,.py,.zip,image/*"
  assignmentTitle="Lab 3 — Submit notebook"
  deadline={new Date(Date.now() + 2 * 86400000).toISOString()}
  maxBytes={12 * 1024 * 1024}
/>`,

  "grade-book": `import { GradeBook } from "edpear-sdk";
import { useState } from "react";

export function GradeBookExample() {
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
}`,

  "reading-annotator": `import { ReadingAnnotator } from "edpear-sdk";
import type { ReadingHighlight } from "edpear-sdk";
import { useState } from "react";

export function ReadingExample() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([]);

  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={({ highlights: next }) => setHighlights(next)}
      text="Your long-form reading text goes here."
    />
  );
}`,

  "knowledge-check": `import { KnowledgeCheck } from "edpear-sdk";

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
  <div>Lesson content shown after the learner passes.</div>
</KnowledgeCheck>`,

  "certificate-renderer": `import { CertificateRenderer } from "edpear-sdk";

<CertificateRenderer
  data={{
    studentName: "Alex Morgan",
    courseName: "Introduction to Data Literacy",
    completedAt: new Date(),
    instructorName: "Dr. Priya Nair",
    subtitle: "With distinction",
  }}
  organizationName="EdPear Academy"
/>`,

  "learning-path-map": `import { LearningPathMap } from "edpear-sdk";

<LearningPathMap
  edges={[
    { from: "a", to: "b" },
    { from: "b", to: "c" },
  ]}
  nodes={[
    { id: "a", label: "Start", x: 120, y: 260, state: "completed" },
    { id: "b", label: "Next", x: 320, y: 260, state: "current" },
  ]}
  onNodeSelect={(id) => console.log(id)}
/>`,

  "peer-review-panel": `import { PeerReviewPanel } from "edpear-sdk";
import { useState } from "react";

export function PeerReviewExample() {
  const [scores, setScores] = useState({ thesis: 8, evidence: 7, clarity: 6 });
  const [comments, setComments] = useState({ thesis: "", evidence: "", clarity: "" });

  return (
    <PeerReviewPanel
      comments={comments}
      onCommentChange={(id, text) => setComments((c) => ({ ...c, [id]: text }))}
      onScoreChange={(id, pts) => setScores((s) => ({ ...s, [id]: pts }))}
      onSubmitReview={() => {}}
      rubric={[
        { id: "thesis", label: "Thesis & focus", maxPoints: 10, description: "Arguable claim" },
      ]}
      scores={scores}
      submissionPreview="Learner submission text…"
      submissionTitle="Draft essay"
    />
  );
}`,

  "session-timer": `import { SessionTimer } from "edpear-sdk";

<SessionTimer breakDurationSec={300} workDurationSec={1500} />`,

  "onboarding-checklist": `import { OnboardingChecklist } from "edpear-sdk";
import { useState } from "react";

export function OnboardingExample() {
  const [done, setDone] = useState<string[]>([]);

  return (
    <OnboardingChecklist
      completedIds={done}
      embedded
      items={[
        { id: "profile", label: "Complete your profile", xp: 50 },
        { id: "lesson", label: "Watch your first lesson", xp: 100 },
      ]}
      onToggle={(id, completed) => {
        setDone((prev) =>
          completed ? [...prev, id] : prev.filter((x) => x !== id),
        );
      }}
      title="Welcome checklist"
    />
  );
}`,

  "course-dashboard": `import { ActivityFeed, CourseDashboard } from "edpear-sdk";

<CourseDashboard
  activitySlot={<ActivityFeed items={[]} title="Recent activity" />}
  announcementSlot={<span>Reminder: live review Thursday 4pm.</span>}
  course={{ code: "BIO 101", subtitle: "Spring cohort", title: "Cell Biology" }}
  instructorSlot={<p className="text-sm">Dr. Kim</p>}
  nextLessonSlot={<button type="button">Resume next lesson</button>}
  progressPercent={46}
/>`,

  "activity-feed": `import { ActivityFeed } from "edpear-sdk";

<ActivityFeed
  items={[
    {
      id: "a1",
      type: "lesson_complete",
      actor: "Maya",
      message: "completed Lesson 3",
      timestamp: new Date(),
    },
  ]}
/>`,

  "enrollment-gate": `import { EnrollmentGate } from "edpear-sdk";

<EnrollmentGate
  completedPrereq={false}
  enrolled
  gateType="prerequisite"
  hasAccess
  onAction={() => {}}
>
  <p>Lesson content when unlocked.</p>
</EnrollmentGate>`,

  "student-profile-card": `import { StudentProfileCard } from "edpear-sdk";

<StudentProfileCard
  badges={[{ id: "1", label: "Early bird" }]}
  coursesEnrolled={4}
  name="Jordan Lee"
  progressPercent={72}
  streakDays={12}
/>`,

  "live-class-banner": `import { LiveClassBanner } from "edpear-sdk";

<LiveClassBanner
  hostName="Dr. Kim"
  joinHref="/live"
  participantCount={24}
  scheduledFor={new Date(Date.now() + 3600000)}
  sessionTitle="Cell biology review"
  status="scheduled"
/>`,

  "feedback-slider": `import { FeedbackSlider } from "edpear-sdk";

<FeedbackSlider
  onSubmit={(payload) => console.log(payload)}
  title="Quick check-in"
  variant="stars"
/>`,

  "question-bank": `import { QuestionBank } from "edpear-sdk";

const questions = [
  {
    id: "qb1",
    topic: "Photosynthesis",
    difficulty: "medium" as const,
    type: "mcq" as const,
    prompt: "Which organelle is the main site of photosynthesis?",
  },
];

<QuestionBank
  onAddToQuiz={(ids) => console.log("Add to quiz", ids)}
  questions={questions}
/>`,

  "math-renderer": `import { MathRenderer } from "edpear-sdk";

<MathRenderer
  content="The **quadratic formula** is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$."
/>`,

  "diff-viewer": `import { DiffViewer } from "edpear-sdk";

<DiffViewer
  after={\`def greet(name):
    return f"Hello, {name}!"
\`}
  before={\`def greet(name):
    return "Hello, " + name
\`}
  mode="inline"
/>`,

  "rich-text-editor": `import { RichTextEditor } from "edpear-sdk";

<RichTextEditor defaultValue="<p><strong>Notes:</strong> …</p>" />`,

  "code-playground": `import { CodePlayground } from "edpear-sdk";

<CodePlayground
  defaultValue="console.log('hello');"
  language="javascript"
  onRun={async (code) => \`Output for:\\n\${code}\`}
/>`,

  "discussion-thread": `import { DiscussionThread } from "edpear-sdk";

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
/>`,

  "ai-feedback": `import { AIFeedback } from "edpear-sdk";

// Use NEXT_PUBLIC_OPENROUTER_API_KEY or pass apiKey explicitly.
<AIFeedback
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? ""}
  correctAnswer="Plants use CO₂ during photosynthesis."
  rubricFocus="Correct misconceptions gently."
  studentAnswer="Plants absorb oxygen to make sugar."
/>`,

  "ai-hint": `import { AIHint } from "edpear-sdk";

<AIHint
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? ""}
  prompt="Solve for x: 3x + 9 = 18"
  studentAttempt="I subtracted 3 first."
/>`,

  "ai-quiz-generator": `import { AIQuizGenerator } from "edpear-sdk";

<AIQuizGenerator
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? ""}
  count={3}
  sourceText="The water cycle includes evaporation and condensation."
  topic="The water cycle"
/>`,

  "ai-tutor": `import { AITutor } from "edpear-sdk";

<AITutor
  apiKey={process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? ""}
  lessonContent="Lesson: Photosynthesis. Key ideas: chloroplasts, light reactions…"
  title="Photosynthesis tutor"
/>`,
} satisfies Record<ShowcaseSlug, string>;
