import type { ShowcaseSlug } from "./showcase-nav";

/**
 * Example usage for each showcase slug (imports use published package name).
 */
/** CourseCard examples live in `usage-examples/course-card/` (one file per sample). */
export const COMPONENT_USAGE_SNIPPETS = {
  "quiz-card": `import { QuizCard } from "edpear-sdk";

// 1) Multiple choice
// Four options with one correct key; best for concept checks after video or reading.
<QuizCard
  choices={["Evaporation", "Condensation", "Freezing", "Melting"]}
  correctAnswer="Condensation"
  description="Choose the process that forms clouds from water vapor."
  question="What part of the water cycle turns vapor back into liquid droplets?"
  variant="multiple-choice"
/>

// 2) True / false
// Binary choice still uses choices array with exactly two strings.
<QuizCard
  choices={["True", "False"]}
  correctAnswer="True"
  description="Crossing over swaps segments between homologous chromosomes."
  question="Crossing over occurs during prophase I of meiosis."
  variant="true-false"
/>

// 3) Short answer
// Learner types a string; normalize casing when comparing correctAnswer.
<QuizCard
  correctAnswer="mitochondria"
  description="One word or short phrase."
  question="Which organelle is the main site of aerobic respiration?"
  variant="short-answer"
/>`,

  "timed-quiz": `import { TimedQuiz } from "edpear-sdk";

// 1) Short answer sprint
// Tight timer for recall items; onTimeout can auto-submit blank.
<TimedQuiz
  correctAnswer="4"
  description="Answer before the timer expires."
  duration={25}
  question="How many sides does a square have?"
  variant="short-answer"
/>

// 2) Multiple choice under pressure
// Give more time when you have four distractors.
<TimedQuiz
  choices={["Oxygen", "Glucose", "Chlorophyll", "Water"]}
  correctAnswer="Chlorophyll"
  description="Pick the pigment that captures light for photosynthesis."
  duration={45}
  question="Which molecule absorbs photons in the chloroplast?"
  variant="multiple-choice"
/>

// 3) True / false quick check
<TimedQuiz
  choices={["True", "False"]}
  correctAnswer="False"
  description="Think about where translation happens in the cell."
  duration={20}
  question="Translation always happens in the nucleus."
  variant="true-false"
/>`,

  "flash-card": `import { FlashCard } from "edpear-sdk";

// 1) Biology recall
// Front is the prompt; back is the concise answer.
<FlashCard
  back="Photosynthesis mainly happens in the chloroplasts of plant cells."
  front="Where in a plant cell does photosynthesis happen?"
/>

// 2) Vocabulary
<FlashCard
  back="A quantity with magnitude and direction."
  front="Define vector in one sentence."
/>

// 3) Dates / memorization
<FlashCard
  back="1787 — drafted; 1788–1789 — ratified by states."
  front="When was the U.S. Constitution ratified?"
/>`,

  "badge-award": `import { BadgeAward } from "edpear-sdk";

// 1) Earned today
// earnedAt accepts relative strings your UI understands.
<BadgeAward
  description="Completed a full week of lessons without missing a day."
  earnedAt="today"
  title="Consistency Champ"
/>

// 2) Locked teaser
// Set unlocked false to grey out the card while learners work toward requirements.
<BadgeAward
  description="Finish three projects with peer review to unlock."
  title="Studio collaborator"
  unlocked={false}
/>

// 3) Long-form copy
<BadgeAward
  description="You maintained focus mode for 10 sessions this month—keep the streak going."
  earnedAt="Mar 12"
  title="Deep work streak"
/>`,

  "streak-tracker": `import { StreakTracker } from "edpear-sdk";

// 1) Week view with one gap
// Thursday missed; streak still counts consecutive days ending today.
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

// 2) Perfect week
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

// 3) Starting out
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
/>`,

  "score-display": `import { ScoreDisplay } from "edpear-sdk";

// 1) Above passing
// Band color reflects score vs passingScore and maxScore.
<ScoreDisplay maxScore={20} passingScore={14} score={17} />

// 2) Below passing
<ScoreDisplay maxScore={100} passingScore={60} score={52} />

// 3) Perfect score
<ScoreDisplay maxScore={50} passingScore={40} score={50} />`,

  "video-lesson": `import { VideoLesson } from "edpear-sdk";

// 1) Short tutorial with three chapters
// Times are seconds from start for skip links in the player chrome.
<VideoLesson
  chapters={[
    { id: "intro", label: "What is a fraction?", time: 0 },
    { id: "model", label: "Visual model", time: 75 },
    { id: "practice", label: "Practice prompt", time: 150 },
  ]}
  title="Fractions in Everyday Contexts"
  youtubeId="M7lc1UVf-VE"
/>

// 2) Single chapter intro
<VideoLesson
  chapters={[{ id: "only", label: "Welcome", time: 0 }]}
  title="Course orientation"
  youtubeId="M7lc1UVf-VE"
/>

// 3) Lab walkthrough with many markers
<VideoLesson
  chapters={[
    { id: "safety", label: "Safety", time: 0 },
    { id: "setup", label: "Bench setup", time: 45 },
    { id: "measure", label: "Measurements", time: 200 },
    { id: "cleanup", label: "Cleanup", time: 400 },
  ]}
  title="Chemistry lab — titration"
  youtubeId="M7lc1UVf-VE"
/>`,

  "syllabus-navigator": `import { SyllabusNavigator } from "edpear-sdk";

// 1) Single module with locks
// reorderEnabled lets admins drag units when your handler persists order.
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
/>

// 2) Two modules, second collapsed by default
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
  onLessonSelect={(id) => console.log(id)}
/>

// 3) Read-only outline (no reorder)
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
  onLessonSelect={(id) => console.log(id)}
/>`,

  "assignment-dropzone": `import { AssignmentDropzone } from "edpear-sdk";

// 1) Code lab with size cap
// deadline ISO string drives the countdown in the header.
<AssignmentDropzone
  accept=".pdf,.py,.zip,image/*"
  assignmentTitle="Lab 3 — Submit notebook"
  deadline={new Date(Date.now() + 2 * 86400000).toISOString()}
  maxBytes={12 * 1024 * 1024}
/>

// 2) Essays — PDF only
<AssignmentDropzone
  accept=".pdf"
  assignmentTitle="Final reflection"
  deadline={new Date(Date.now() + 5 * 86400000).toISOString()}
  maxBytes={5 * 1024 * 1024}
/>

// 3) Open-ended uploads (deadline + accept are required)
<AssignmentDropzone
  accept="*/*"
  assignmentTitle="Portfolio artifact drop"
  deadline={new Date(Date.now() + 7 * 86400000).toISOString()}
  maxBytes={25 * 1024 * 1024}
/>`,

  "grade-book": `import { GradeBook } from "edpear-sdk";
import { useState } from "react";

// 1) Two students, two assignments
// Start from empty grades; categories drive column grouping colors.
export function GradeBookBasic() {
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

// 2) Three weighted categories and prefilled cells
export function GradeBookWeighted() {
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

// 3) Large roster slice
export function GradeBookManyStudents() {
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
}`,

  "reading-annotator": `import { ReadingAnnotator } from "edpear-sdk";
import type { ReadingHighlight } from "edpear-sdk";
import { useState } from "react";

// 1) Empty slate
export function ReadingEmpty() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([]);

  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={({ highlights: next }) => setHighlights(next)}
      text="Select any sentence to add a highlight. Notes appear in the margin when you attach them."
    />
  );
}

// 2) Seeded highlights for review mode
export function ReadingWithNotes() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([
    { id: "h1", start: 0, end: 48, color: "#bfdbfe", note: "Define jurisdiction early." },
  ]);

  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={({ highlights: next }) => setHighlights(next)}
      text={\`Courts must determine whether they have personal jurisdiction before reaching the merits.

Long-form readings benefit from inline highlights and persistent margin notes stored as JSON.\`}
    />
  );
}

// 3) Short passage
export function ReadingShort() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([]);

  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={({ highlights: next }) => setHighlights(next)}
      text="Mitochondria generate most of the cell's ATP through oxidative phosphorylation."
    />
  );
}`,

  "knowledge-check": `import { KnowledgeCheck } from "edpear-sdk";

// 1) Single gate question
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
</KnowledgeCheck>

// 2) Two-step check
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
  <div>Next video unlocks here.</div>
</KnowledgeCheck>

// 3) Gate with minimal children
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
</KnowledgeCheck>`,

  "certificate-renderer": `import { CertificateRenderer } from "edpear-sdk";

// 1) With distinction line
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

// 2) Minimal certificate
<CertificateRenderer
  data={{
    studentName: "Jordan Lee",
    courseName: "Cell Biology 101",
    completedAt: new Date(),
    instructorName: "Dr. Kim",
  }}
  organizationName="State College"
/>

// 3) Long organization name
<CertificateRenderer
  data={{
    studentName: "Sam Rivera",
    courseName: "Professional Writing Studio",
    completedAt: new Date(),
    instructorName: "Prof. Nguyen",
    subtitle: "Honors cohort",
  }}
  organizationName="Metropolitan Institute of Design & Letters"
/>`,

  "learning-path-map": `import { LearningPathMap } from "edpear-sdk";

// 1) Linear path
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
  onNodeSelect={(id) => console.log(id)}
/>

// 2) Branch and merge
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
  onNodeSelect={(id) => console.log(id)}
/>

// 3) All complete celebration
<LearningPathMap
  edges={[{ from: "x", to: "y" }]}
  nodes={[
    { id: "x", label: "Learn", x: 200, y: 200, state: "completed" },
    { id: "y", label: "Build", x: 420, y: 200, state: "completed" },
  ]}
  onNodeSelect={(id) => console.log(id)}
/>`,

  "peer-review-panel": `import { PeerReviewPanel } from "edpear-sdk";
import { useState } from "react";

// 1) Single-criterion rubric
export function PeerReviewOneCriterion() {
  const [scores, setScores] = useState({ thesis: 8 });
  const [comments, setComments] = useState({ thesis: "" });

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
      submissionPreview="The essay argues that remote work improves retention but lacks counter-evidence."
      submissionTitle="Draft essay"
    />
  );
}

// 2) Full writing rubric
export function PeerReviewWritingRubric() {
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
        { id: "evidence", label: "Evidence", maxPoints: 10, description: "Sources + integration" },
        { id: "clarity", label: "Clarity", maxPoints: 10, description: "Structure + mechanics" },
      ]}
      scores={scores}
      submissionPreview="Paragraph 2 cites two studies; paragraph 4 is mostly opinion."
      submissionTitle="Peer review: lab report"
    />
  );
}

// 3) Code-style review (short preview)
export function PeerReviewCodeStyle() {
  const [scores, setScores] = useState({ style: 5, tests: 5 });
  const [comments, setComments] = useState({ style: "", tests: "" });

  return (
    <PeerReviewPanel
      comments={comments}
      onCommentChange={(id, text) => setComments((c) => ({ ...c, [id]: text }))}
      onScoreChange={(id, pts) => setScores((s) => ({ ...s, [id]: pts }))}
      onSubmitReview={() => {}}
      rubric={[
        { id: "style", label: "Style & readability", maxPoints: 5, description: "Naming, formatting" },
        { id: "tests", label: "Tests", maxPoints: 5, description: "Coverage + edge cases" },
      ]}
      scores={scores}
      submissionPreview={\`function sum(a,b){return a+b}\`}
      submissionTitle="PR #42"
    />
  );
}`,

  "session-timer": `import { SessionTimer } from "edpear-sdk";

// 1) Classic pomodoro lengths (seconds shown as minutes in UI)
<SessionTimer breakDurationSec={300} workDurationSec={1500} />

// 2) Short demo-friendly durations
<SessionTimer breakDurationSec={4} workDurationSec={8} />

// 3) Long focus block
<SessionTimer breakDurationSec={600} workDurationSec={3600} />`,

  "onboarding-checklist": `import { OnboardingChecklist } from "edpear-sdk";
import { useState } from "react";

// 1) Fresh learner
export function OnboardingWelcome() {
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
}

// 2) Partially complete
export function OnboardingInProgress() {
  const [done, setDone] = useState<string[]>(["profile"]);

  return (
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
          completed ? [...prev, id] : prev.filter((x) => x !== id),
        );
      }}
      title="Finish setup"
    />
  );
}

// 3) All done (read-only feel)
export function OnboardingComplete() {
  const [done] = useState<string[]>(["a", "b", "c"]);

  return (
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
  );
}`,

  "course-dashboard": `import { ActivityFeed, CourseDashboard } from "edpear-sdk";

// 1) Full shell with activity feed
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
  course={{ code: "BIO 101", subtitle: "Spring cohort", title: "Introduction to Cell Biology" }}
  instructorSlot={<p className="text-sm">Dr. Kim · office hours Wed 2–4</p>}
  nextLessonSlot={
    <button type="button" className="w-full rounded-lg bg-foreground py-2 text-sm font-medium text-background">
      Resume: Mitochondria lab walkthrough
    </button>
  }
  progressPercent={46}
/>

// 2) Minimal slots — learner just enrolled
<CourseDashboard
  activitySlot={<ActivityFeed items={[]} title="No activity yet" />}
  course={{ code: "CS 220", title: "Data structures" }}
  nextLessonSlot={<button type="button">Start lesson 1</button>}
  progressPercent={0}
/>

// 3) Near completion, custom announcement
<CourseDashboard
  activitySlot={
    <ActivityFeed
      items={[
        { id: "x", type: "badge", message: "Badge: problem set master", timestamp: new Date() },
      ]}
    />
  }
  announcementSlot={<span>Capstone due in 3 days.</span>}
  course={{ code: "MATH 410", subtitle: "Honors", title: "Real analysis" }}
  instructorSlot={<p className="text-sm">Prof. Ortiz</p>}
  nextLessonSlot={<button type="button">Open final review sheet</button>}
  progressPercent={94}
/>`,

  "activity-feed": `import { ActivityFeed } from "edpear-sdk";

// 1) Mixed social + system events
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

// 2) Empty state with title
<ActivityFeed items={[]} title="Recent activity" />

// 3) Dense same-day log
<ActivityFeed
  items={[
    { id: "b1", type: "lesson_complete", message: "Quiz 2 submitted", timestamp: new Date() },
    { id: "b2", type: "discussion", message: "Instructor replied to your thread", timestamp: new Date() },
  ]}
  title="Today"
/>`,

  "enrollment-gate": `import { EnrollmentGate } from "edpear-sdk";

// 1) Prerequisite satisfied — children visible
<EnrollmentGate completedPrereq enrolled gateType="prerequisite" hasAccess>
  <p className="rounded-lg border p-6">Lesson body when the learner is allowed through.</p>
</EnrollmentGate>

// 2) Prerequisite lock — overlay until prior module passes
<EnrollmentGate
  completedPrereq={false}
  enrolled
  gateType="prerequisite"
  hasAccess
  onAction={() => {}}
>
  <p>Hidden until prerequisite completes.</p>
</EnrollmentGate>

// 3) Purchase gate for non-enrolled catalog view
<EnrollmentGate enrolled={false} gateType="purchase" hasAccess={false} onAction={() => {}}>
  <p>Preview-only syllabus excerpt.</p>
</EnrollmentGate>`,

  "student-profile-card": `import { StudentProfileCard } from "edpear-sdk";

// 1) Full card with badges
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

// 2) Compact row for directory grids
<StudentProfileCard
  compact
  coursesEnrolled={2}
  name="Sam Rivera"
  progressPercent={40}
  streakDays={3}
/>

// 3) New learner — sparse stats
<StudentProfileCard
  badges={[]}
  coursesEnrolled={1}
  name="Avery Kim"
  progressPercent={8}
  streakDays={0}
/>`,

  "live-class-banner": `import { LiveClassBanner } from "edpear-sdk";

// 1) Upcoming session
<LiveClassBanner
  hostName="Dr. Kim"
  joinHref="/live"
  participantCount={24}
  scheduledFor={new Date(Date.now() + 3600000)}
  sessionTitle="Cell biology review"
  status="scheduled"
/>

// 2) Live now — elapsed time and headcount
<LiveClassBanner
  hostName="Dr. Kim"
  joinHref="/live"
  participantCount={24}
  sessionTitle="Cell biology review"
  startedAt={new Date(Date.now() - 125000)}
  status="live"
/>

// 3) Ended — archive tone
<LiveClassBanner hostName="Dr. Kim" sessionTitle="Cell biology review" status="ended" />`,

  "feedback-slider": `import { FeedbackSlider } from "edpear-sdk";

// 1) Star rating + optional note
<FeedbackSlider
  onSubmit={(payload) => console.log(payload)}
  title="How clear was this lesson?"
  variant="stars"
/>

// 2) NPS 0–10
<FeedbackSlider
  onSubmit={(payload) => console.log(payload)}
  title="How likely are you to recommend this course?"
  variant="nps"
/>

// 3) Emoji quick pulse
<FeedbackSlider
  onSubmit={(payload) => console.log(payload)}
  title="How did this lab feel?"
  variant="emoji"
/>`,

  "question-bank": `import { QuestionBank } from "edpear-sdk";

const poolA = [
  {
    id: "qb1",
    topic: "Photosynthesis",
    difficulty: "medium" as const,
    type: "mcq" as const,
    prompt: "Which organelle is the main site of photosynthesis?",
  },
];
const poolB = [
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
const poolC = [
  { id: "a", topic: "Algebra", difficulty: "easy" as const, type: "mcq" as const, prompt: "Solve 2x = 8" },
  { id: "b", topic: "Algebra", difficulty: "medium" as const, type: "true-false" as const, prompt: "x² is always positive." },
  { id: "c", topic: "Stats", difficulty: "medium" as const, type: "mcq" as const, prompt: "What does σ measure?" },
];

// 1) Single-topic filter demo
<QuestionBank onAddToQuiz={(ids) => console.log(ids)} questions={poolA} />

// 2) Mixed types for the builder drop zone
<QuestionBank onAddToQuiz={(ids) => console.log(ids)} questions={poolB} />

// 3) Larger pool — search and difficulty chips
<QuestionBank onAddToQuiz={(ids) => console.log(ids)} questions={poolC} />`,

  "math-renderer": `import { MathRenderer } from "edpear-sdk";

// 1) Inline formula in prose
<MathRenderer
  content="The **quadratic formula** is $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$."
/>

// 2) Display equation block
<MathRenderer
  content={"The Gaussian integral:\\n$$\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$$"}
/>

// 3) Multiple inlines in one sentence
<MathRenderer content="Euler: $e^{i\\pi} + 1 = 0$. Pythagoras: $a^2 + b^2 = c^2$." />`,

  "diff-viewer": `import { DiffViewer } from "edpear-sdk";

const beforePy = \`def greet(name):
    return "Hello, " + name
\`;
const afterPy = \`def greet(name):
    return f"Hello, {name}!"
\`;

// 1) Inline unified diff
<DiffViewer after={afterPy} before={beforePy} mode="inline" />

// 2) Side-by-side panels
<DiffViewer after={afterPy} before={beforePy} mode="side-by-side" />

// 3) Prose / policy text
<DiffViewer
  after="Learners must submit by 11:59 PM local time."
  before="Learners must submit by end of day Friday."
  mode="inline"
/>`,

  "rich-text-editor": `import { RichTextEditor } from "edpear-sdk";

// 1) Lab notes seed
<RichTextEditor defaultValue="<p><strong>Lab notes:</strong> We observed faster reaction at higher T.</p>" />

// 2) Empty starter
<RichTextEditor defaultValue="<p></p>" />

// 3) Instructor announcement
<RichTextEditor defaultValue="<p>Hi everyone — <em>read chapter 4</em> before Tuesday.</p>" />`,

  "code-playground": `import { CodePlayground } from "edpear-sdk";

// 1) JavaScript
<CodePlayground
  defaultValue="console.log('hello');"
  language="javascript"
  onRun={async (code) => \`Output for:\\n\${code}\`}
/>

// 2) Python-style snippet (still runs through your onRun mock)
<CodePlayground
  defaultValue="def square(n):\\n    return n * n\\n\\nprint(square(7))"
  language="python"
  onRun={async (code) => \`Ran:\\n\${code}\`}
/>

// 3) Short expression — keep onRun sandboxed in production
<CodePlayground
  defaultValue="const doubled = [1, 2, 3].map((x) => x * 2);\\nconsole.log(doubled);"
  language="javascript"
  onRun={async (code) => \`Would execute:\\n\${code}\`}
/>`,

  "discussion-thread": `import { DiscussionThread } from "edpear-sdk";

const threadA = [
  {
    id: "c1",
    author: "Ava",
    content: "Great point about condensation.",
    role: "Student",
    timestamp: "2 minutes ago",
    upvotes: 4,
    replies: [],
  },
];
const threadB = [
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
];
const threadC = [
  {
    id: "m1",
    author: "Dr. Kim",
    content: "Keep posts under 200 words so peers can skim.",
    role: "Instructor",
    timestamp: "Yesterday",
    upvotes: 12,
    replies: [],
  },
];

// 1) Single top-level comment
<DiscussionThread comments={threadA} />

// 2) Thread with reply
<DiscussionThread comments={threadB} />

// 3) Instructor anchor post
<DiscussionThread comments={threadC} />`,

  "ai-feedback": `import { AIFeedback } from "edpear-sdk";

const key = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";

// 1) Minimal — use NEXT_PUBLIC_OPENROUTER_API_KEY or pass apiKey explicitly
<AIFeedback
  apiKey={key}
  correctAnswer="Plants use CO₂ during photosynthesis."
  studentAnswer="Plants absorb oxygen to make sugar."
/>

// 2) Rubric focus for tone
<AIFeedback
  apiKey={key}
  correctAnswer="Plants use CO₂ during photosynthesis."
  rubricFocus="Correct misconceptions gently."
  studentAnswer="Plants absorb oxygen to make sugar."
/>

// 3) History — different misconception
<AIFeedback
  apiKey={key}
  correctAnswer="The Treaty of Versailles was signed in 1919."
  rubricFocus="Name dates and parties explicitly."
  studentAnswer="The peace treaty after WWI was in 1815 at Vienna."
/>`,

  "ai-hint": `import { AIHint } from "edpear-sdk";

const key = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";

// 1) Algebra — wrong first step
<AIHint apiKey={key} prompt="Solve for x: 3x + 9 = 18" studentAttempt="I subtracted 3 first." />

// 2) Word problem — partial setup
<AIHint
  apiKey={key}
  prompt="A train goes 120 km in 2 hours. What is its average speed?"
  studentAttempt="I multiplied 120 by 2."
/>

// 3) Geometry — missing formula
<AIHint
  apiKey={key}
  prompt="Find the area of a circle with radius 5."
  studentAttempt="I added 5 + 5."
/>`,

  "ai-quiz-generator": `import { AIQuizGenerator } from "edpear-sdk";

const key = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";

// 1) Short source paragraph
<AIQuizGenerator
  apiKey={key}
  count={3}
  sourceText="The water cycle includes evaporation, condensation, precipitation, and collection."
  topic="The water cycle"
/>

// 2) More items, biology focus
<AIQuizGenerator
  apiKey={key}
  count={5}
  sourceText="Mitochondria produce ATP; chloroplasts capture light energy."
  topic="Cell energetics"
/>

// 3) Single quick check
<AIQuizGenerator
  apiKey={key}
  count={1}
  sourceText="Fractions represent parts of a whole; denominators cannot be zero."
  topic="Fraction basics"
/>`,

  "ai-tutor": `import { AITutor } from "edpear-sdk";

const key = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";

// 1) Science lesson
<AITutor
  apiKey={key}
  lessonContent="Lesson: Photosynthesis. Key ideas: chloroplasts, light reactions, Calvin cycle, outputs O₂ and glucose."
  title="Photosynthesis tutor"
/>

// 2) Math lesson
<AITutor
  apiKey={key}
  lessonContent="Lesson: Solving linear equations. Isolate the variable; perform the same operation on both sides."
  title="Algebra coach"
/>

// 3) Writing lesson
<AITutor
  apiKey={key}
  lessonContent="Lesson: Thesis statements. Arguable claim, scope, roadmap for body paragraphs."
  title="Writing studio"
/>`,
} satisfies Record<Exclude<ShowcaseSlug, "course-card" | "lesson-progress">, string>;
