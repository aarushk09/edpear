"use client";

import { ArrowRight, LayoutPanelTop, PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  AITutor,
  GradeBook,
  LearningJournal,
  PeerReviewPanel,
  QuestionBank,
  ReadingAnnotator,
  type LearningJournalEntry,
  type QuestionBankItem,
  type ReadingHighlight,
} from "edpear";

import { useApiKey } from "../lib/use-api-key";

function BlockCard({
  slug,
  title,
  description,
  children,
}: {
  slug: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 px-6 py-5">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
        <Link
          href={`/${slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/30"
        >
          Open docs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function LearningJournalPreview() {
  const [entries, setEntries] = useState<LearningJournalEntry[]>([
    {
      id: "journal-1",
      dateLabel: "Mon, Apr 29",
      mood: "proud",
      wins: ["Explained slope-intercept form without prompts", "Finished the unit review early"],
      blockers: ["Still mixing up standard form conversions under time pressure"],
      reflection: "Retry the mixed-practice set before tomorrow's checkpoint.",
    },
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <LearningJournal
        currentDateLabel="Wed, May 1"
        entries={entries}
        initialMood="energized"
        onDeleteEntry={(entryId) => setEntries((prev) => prev.filter((entry) => entry.id !== entryId))}
        onSaveEntry={(entry) => setEntries((prev) => [entry, ...prev])}
        prompt="What should your teacher or coach know before the next check-in?"
        prompts={{
          winsLabel: "Momentum worth repeating",
          blockersLabel: "Misconceptions to untangle",
          reflectionLabel: "Coach handoff note",
        }}
        saveLabel="Add coaching note"
      />
    </div>
  );
}

function ReadingAnnotatorPreview() {
  const [highlights, setHighlights] = useState<ReadingHighlight[]>([
    { id: "h1", start: 0, end: 48, color: "#bfdbfe", note: "Define jurisdiction early." },
  ]);

  return (
    <ReadingAnnotator
      highlights={highlights}
      onAnnotationsChange={(payload) => setHighlights(payload.highlights)}
      text={`Courts must determine whether they have personal jurisdiction before reaching the merits.

Long-form readings benefit from inline highlights and persistent margin notes stored as JSON.`}
    />
  );
}

function GradeBookPreview() {
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
        setGrades((current) => ({
          ...current,
          [studentId]: { ...(current[studentId] ?? {}), [assignmentId]: value },
        }));
      }}
      students={[
        { id: "s1", name: "Jordan Lee" },
        { id: "s2", name: "Avery Khan" },
        { id: "s3", name: "Mia Santos" },
      ]}
    />
  );
}

function PeerReviewPreview() {
  const [scores, setScores] = useState({ thesis: 8, evidence: 7, clarity: 6 });
  const [comments, setComments] = useState({
    thesis: "Clear claim in paragraph 1.",
    evidence: "",
    clarity: "",
  });

  return (
    <PeerReviewPanel
      comments={comments}
      onCommentChange={(id, text) => setComments((current) => ({ ...current, [id]: text }))}
      onScoreChange={(id, points) => setScores((current) => ({ ...current, [id]: points }))}
      onSubmitReview={() => {}}
      rubric={[
        { id: "thesis", label: "Thesis & focus", maxPoints: 10, description: "Arguable, specific claim" },
        { id: "evidence", label: "Evidence", maxPoints: 10, description: "Sources support the claim" },
        { id: "clarity", label: "Clarity", maxPoints: 10, description: "Organization and mechanics" },
      ]}
      scores={scores}
      submissionPreview="In this draft I argue that universal pre-K improves long-term outcomes. I cite three longitudinal studies and address a counterargument about cost."
      submissionTitle="Draft essay (peer)"
    />
  );
}

const QUESTION_POOL: QuestionBankItem[] = [
  {
    id: "q2",
    topic: "Cell division",
    difficulty: "easy",
    type: "short-answer",
    prompt: "Name one product of the light-dependent reactions.",
  },
  {
    id: "q3",
    topic: "Cell division",
    difficulty: "hard",
    type: "essay",
    prompt: "Compare mitosis and meiosis in three sentences.",
  },
  {
    id: "q4",
    topic: "Genetics",
    difficulty: "medium",
    type: "mcq",
    prompt: "Which molecule carries hereditary information?",
  },
];

function QuestionBankPreview() {
  const [added, setAdded] = useState<string[]>([]);

  return (
    <div className="space-y-3">
      <QuestionBank
        onAddToQuiz={(ids) =>
          setAdded((current) => {
            const next = [...current];
            for (const id of ids) {
              if (!next.includes(id)) next.push(id);
            }
            return next;
          })
        }
        questions={QUESTION_POOL}
      />
      <p className="text-xs text-muted-foreground">
        Staged in this preview: {added.length ? added.join(", ") : "nothing selected yet"}
      </p>
    </div>
  );
}

function AITutorPreview() {
  const apiKey = useApiKey();

  return (
    <div className="mx-auto max-w-xl">
      <AITutor
        apiKey={apiKey}
        className="h-[420px] min-h-[320px]"
        lessonContent="Lesson: Photosynthesis. Key ideas: chloroplasts, light reactions, Calvin cycle, outputs oxygen and glucose."
        title="Photosynthesis tutor"
      />
    </div>
  );
}

export function ShowcaseBlocksPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section className="rounded-[2rem] border border-border bg-card px-6 py-7 shadow-sm sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <PanelsTopLeft className="h-3.5 w-3.5" />
              EdPear blocks
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Bigger, workflow-shaped components collected in one place.
            </h1>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              These are the heavier patterns that behave more like complete product surfaces than isolated controls:
              editors, builders, review workspaces, and student-facing learning blocks.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted/30"
          >
            Back to home catalog
            <LayoutPanelTop className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="grid gap-6">
        <BlockCard
          slug="learning-journal"
          title="Learning Journal"
          description="A full reflection workspace for logging mood, wins, blockers, and next steps over time."
        >
          <LearningJournalPreview />
        </BlockCard>

        <BlockCard
          slug="reading-annotator"
          title="Reading Annotator"
          description="A reading surface with persistent highlights and notes that feels more like a workspace than a single widget."
        >
          <ReadingAnnotatorPreview />
        </BlockCard>

        <div className="grid gap-6 xl:grid-cols-2">
          <BlockCard
            slug="grade-book"
            title="Grade Book"
            description="An instructor-scale grading surface with categories, weighted assignments, and editable student rows."
          >
            <GradeBookPreview />
          </BlockCard>

          <BlockCard
            slug="peer-review-panel"
            title="Peer Review Panel"
            description="A rubric-based feedback flow for structured critique, comments, and point scoring."
          >
            <PeerReviewPreview />
          </BlockCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <BlockCard
            slug="question-bank"
            title="Question Bank"
            description="A searchable assessment inventory for staging questions into quizzes and instructional checks."
          >
            <QuestionBankPreview />
          </BlockCard>

          <BlockCard
            slug="ai-tutor"
            title="AI Tutor"
            description="A lesson-scoped tutoring interface for guided chat support, review, and coaching."
          >
            <AITutorPreview />
          </BlockCard>
        </div>
      </div>
    </div>
  );
}
