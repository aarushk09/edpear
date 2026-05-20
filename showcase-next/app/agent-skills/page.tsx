import { Metadata } from "next";
import Link from "next/link";

import { AgentSkillsInstallSection } from "@/components/agent-skills-install";

export const metadata: Metadata = {
  title: "Skills · EdPear",
  description:
    "Install the EdPear agent skill for Cursor, Claude Code, and other agentic tools—accurate EdTech component usage, CLI, and patterns.",
};

const SKILL_TOPICS = [
  {
    id: "when-to-use",
    title: "When to use EdPear",
    body: "Scenario detection for courses, quizzes, live class, grading, gamification, STEM, accessibility, and AI tutoring—so agents reach for the right slug first.",
  },
  {
    id: "component-map",
    title: "Scenario → component map",
    body: "A decision table mapping user intents (e.g. “timed assessment”, “cohort analytics”) to registry slugs like quiz-card, pacing-guide, and ai-feedback.",
  },
  {
    id: "patterns",
    title: "EdTech implementation patterns",
    body: "Controlled quiz state, Server Actions for OpenRouter keys, Next.js App Router conventions, showcase blocks, and the four data-driven shells.",
  },
  {
    id: "cli",
    title: "CLI reference (list / add)",
    body: "Accurate edpear-sdk commands—no invented init or info flags. How add copies source, styles, and openrouter.ts for AI slugs.",
  },
  {
    id: "theming",
    title: "Theming & tokens",
    body: "CSS variables (--lesson, --quiz, --feedback-correct), dark mode, and Tailwind semantic classes agents should prefer over hardcoded colors.",
  },
  {
    id: "anti-patterns",
    title: "Anti-patterns",
    body: "What causes bad agent output: inventing props, duplicate dashboard shells, exposed API keys, and ignoring accessibility on assessments.",
  },
  {
    id: "mcp",
    title: "MCP (optional)",
    body: "list_components and get_component_code for agents with tool access—plus when to fall back to the full registry via edpear-sdk list.",
  },
] as const;

export default function AgentSkillsPage() {
  return (
    <main className="mx-auto h-full max-w-6xl overflow-y-auto px-4 py-10 text-foreground no-scrollbar sm:px-6 lg:grid lg:grid-cols-[1fr_220px] lg:gap-14 lg:px-8">
      <div className="min-w-0 space-y-12 pb-16">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Skills</h1>
          <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
            Install the <strong className="font-medium text-foreground">EdPear skill</strong> so Claude Code, Cursor,
            Codex, and other agentic tools know how to pick components, wire props, theme for learning products, and
            avoid generic UI mistakes in EdTech.
          </p>
          <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">For example, you can ask your assistant to:</p>
          <ul className="list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-muted-foreground">
            <li>&quot;Add a course card with progress and instructor metadata using EdPear.&quot;</li>
            <li>&quot;Build a multiple-choice quiz flow with controlled state and onSubmit persistence.&quot;</li>
            <li>&quot;Compose a grading dashboard from grade-book and grading-queue-card, not custom cards.&quot;</li>
          </ul>
        </header>

        <AgentSkillsInstallSection />

        <section className="space-y-6" id="whats-included">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">What&apos;s in the skill</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Canonical file:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">skills/edpear/SKILL.md</code> (also
            downloadable as <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">edpear_skill.md</code>).
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {SKILL_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="space-y-2 rounded-xl border border-border bg-muted/10 p-5"
                id={topic.id}
              >
                <h3 className="text-sm font-semibold text-foreground">{topic.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{topic.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-border bg-muted/10 p-5" id="related">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Related</h2>
          <p className="text-sm text-muted-foreground">
            Pair the skill with the{" "}
            <Link href="/mcp" className="font-medium text-foreground underline-offset-4 hover:underline">
              MCP server
            </Link>{" "}
            for live registry lookups, or browse the{" "}
            <Link href="/" className="font-medium text-foreground underline-offset-4 hover:underline">
              component catalog
            </Link>{" "}
            and{" "}
            <Link href="/blocks" className="font-medium text-foreground underline-offset-4 hover:underline">
              blocks
            </Link>{" "}
            for composed layouts.
          </p>
        </section>
      </div>

      <aside className="hidden text-sm xl:block">
        <div className="sticky top-10 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-tight text-foreground">On this page</h4>
          <div className="flex flex-col gap-2.5 text-muted-foreground">
            <a href="#install" className="transition-colors hover:text-foreground">
              Install
            </a>
            <a href="#whats-included" className="transition-colors hover:text-foreground">
              What&apos;s included
            </a>
            <div className="ml-[3px] mt-1 flex flex-col gap-2 space-y-1 border-l pl-4">
              {SKILL_TOPICS.map((topic) => (
                <a key={topic.id} href={`#${topic.id}`} className="transition-colors hover:text-foreground">
                  {topic.title}
                </a>
              ))}
            </div>
            <a href="#related" className="transition-colors hover:text-foreground">
              Related
            </a>
            <a href="#npm-cli" className="transition-colors hover:text-foreground">
              Component CLI
            </a>
          </div>
        </div>
      </aside>
    </main>
  );
}
