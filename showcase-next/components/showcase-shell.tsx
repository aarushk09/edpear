"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_GROUPS = [
  {
    title: "Learning",
    items: [
      { id: "course-card", label: "CourseCard" },
      { id: "lesson-progress", label: "LessonProgress" },
      { id: "quiz-card", label: "QuizCard" },
      { id: "timed-quiz", label: "TimedQuiz" },
      { id: "flash-card", label: "FlashCard" },
      { id: "badge-award", label: "BadgeAward" },
      { id: "streak-tracker", label: "StreakTracker" },
      { id: "score-display", label: "ScoreDisplay" },
      { id: "video-lesson", label: "VideoLesson" },
      { id: "syllabus-navigator", label: "SyllabusNavigator" },
      { id: "assignment-dropzone", label: "AssignmentDropzone" },
      { id: "grade-book", label: "GradeBook" },
      { id: "reading-annotator", label: "ReadingAnnotator" },
      { id: "knowledge-check", label: "KnowledgeCheck" },
      { id: "certificate-renderer", label: "CertificateRenderer" },
      { id: "learning-path-map", label: "LearningPathMap" },
      { id: "peer-review-panel", label: "PeerReviewPanel" },
    ],
  },
  {
    title: "Authoring",
    items: [
      { id: "rich-text-editor", label: "RichTextEditor" },
      { id: "code-playground", label: "CodePlayground" },
      { id: "discussion-thread", label: "DiscussionThread" },
    ],
  },
  {
    title: "OpenRouter",
    items: [
      { id: "ai-feedback", label: "AIFeedback" },
      { id: "ai-hint", label: "AIHint" },
      { id: "ai-quiz-generator", label: "AIQuizGenerator" },
    ],
  },
] as const;

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function ShowcaseNav() {
  return (
    <nav className="space-y-6" aria-label="Component index">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block rounded-md px-2 py-1.5 text-sm text-foreground/80 transition hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DemoFrame({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-foreground/5 dark:ring-white/10">
        <header className="flex flex-col gap-1 border-b border-border bg-muted/40 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h2 className="font-mono text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>
        <div className="bg-gradient-to-b from-muted/15 to-transparent p-5 md:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}
