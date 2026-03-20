"use client";

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
} from "edpear";

import { DemoFrame, ShowcaseNav, ThemeToggle } from "../components/showcase-shell";

const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              EdPear · Next.js
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Component showcase
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Framed previews of each export—use the index to jump around.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              17 components
            </span>
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              Tailwind v4
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                apiKey
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-destructive/30 bg-destructive/10 text-destructive"
              }`}
            >
              {apiKey ? "OpenRouter key set" : "No OpenRouter key"}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:grid lg:grid-cols-[minmax(0,200px)_1fr] lg:gap-12 lg:px-8 lg:py-14">
        <aside className="mb-10 hidden lg:block">
          <div className="sticky top-28">
            <ShowcaseNav />
          </div>
        </aside>

        <main className="space-y-10 lg:space-y-12">
          <p className="text-sm text-muted-foreground lg:hidden">
            Scroll for all components, or widen the window for the index.
          </p>

          <DemoFrame
            id="course-card"
            title="<CourseCard />"
            description="Course summary with progress, instructor, and CTA—typical catalog or dashboard tile."
          >
            <div className="max-w-md">
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
          </DemoFrame>

          <DemoFrame
            id="lesson-progress"
            title="<LessonProgress />"
            description="Stepper for a lesson flow: watch, check, apply, reflect."
          >
            <div className="max-w-lg">
              <LessonProgress
                currentStep={2}
                steps={[
                  { id: "watch", label: "Watch", description: "8 min explainer" },
                  { id: "check", label: "Check", description: "Concept checkpoint" },
                  { id: "apply", label: "Apply", description: "Independent practice" },
                  { id: "reflect", label: "Reflect", description: "Exit ticket" },
                ]}
              />
            </div>
          </DemoFrame>

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

          <DemoFrame
            id="score-display"
            title="<ScoreDisplay />"
            description="Score vs max with passing threshold context."
          >
            <div className="max-w-sm">
              <ScoreDisplay maxScore={20} passingScore={14} score={17} />
            </div>
          </DemoFrame>

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

          <DemoFrame
            id="rich-text-editor"
            title="<RichTextEditor />"
            description="Tiptap-based rich text for notes and instructions."
          >
            <RichTextEditor defaultValue="<p><strong>Lab notes:</strong> We observed the reaction speed increase when the temperature rose.</p>" />
          </DemoFrame>

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
        </main>
      </div>
    </div>
  );
}
