import {
  ArrowRight,
  Blocks,
  Bot,
  LayoutDashboard,
  PanelsTopLeft,
  Plug,
} from "lucide-react";
import Link from "next/link";

import {
  BLOCK_COMPONENTS,
  HOME_CATALOG_GROUPS,
  HOME_COMPONENT_COUNT,
} from "../lib/showcase-collections";
import { cliAddCommand, INSTALL_COMMAND } from "../lib/package-docs";
import { ShowcaseHomeCatalog } from "./showcase-home-catalog";
import { ShikiCodeBlock } from "./shiki-code-block";

type ShowcaseHomePageProps = {
  descriptions: Record<string, string>;
};

const EXAMPLE_SLUG = "course-card" as const;

export function ShowcaseHomePage({ descriptions }: ShowcaseHomePageProps) {
  const addCommand = cliAddCommand(EXAMPLE_SLUG);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section className="rounded-[2rem] border border-border bg-card px-6 py-7 shadow-sm sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <LayoutDashboard className="h-3.5 w-3.5" />
              EdPear component library
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Build better learning experiences with production-ready EdTech UI.
            </h1>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Explore accessible components for courses, assessments, collaboration, and instructor
              workflows. Start with a single control or jump into full workflow blocks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/course-card"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Browse components
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blocks"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted/30"
              >
                View blocks
                <PanelsTopLeft className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                {HOME_COMPONENT_COUNT} components
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                {BLOCK_COMPONENTS.length} blocks
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                {HOME_CATALOG_GROUPS.length} categories
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-border bg-card px-6 py-6 shadow-sm sm:px-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Quick start</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          Install the SDK, then add a component to your project with the CLI.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <p className="border-b border-border bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground">
              Install
            </p>
            <ShikiCodeBlock code={INSTALL_COMMAND} lang="bash" className="rounded-none border-0 shadow-none" />
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <p className="border-b border-border bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground">
              Add {EXAMPLE_SLUG}
            </p>
            <ShikiCodeBlock code={addCommand} lang="bash" className="rounded-none border-0 shadow-none" />
          </div>
        </div>
      </section>

      <ShowcaseHomeCatalog descriptions={descriptions} />

      <Link
        href="/blocks"
        className="group block rounded-[1.75rem] border border-border bg-card px-6 py-6 shadow-sm transition hover:border-border hover:bg-muted/20 sm:px-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <Blocks className="h-3.5 w-3.5" />
              EdPear blocks
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Workflow-shaped components for full product surfaces
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Editors, builders, review workspaces, and student-facing learning blocks collected on
              one page with live previews.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition group-hover:bg-muted/30">
            Explore blocks
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Integrations</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/agent-skills"
            className="rounded-[1.75rem] border border-border bg-card px-6 py-5 shadow-sm transition hover:border-border hover:bg-muted/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-foreground">
                <Bot className="h-5 w-5" />
                <span className="text-base font-semibold">Agent Skills</span>
              </div>
              <span className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                Beta
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Teach coding agents how to find, install, and compose EdPear components with project
              context and CLI rules.
            </p>
          </Link>
          <Link
            href="/mcp"
            className="rounded-[1.75rem] border border-border bg-card px-6 py-5 shadow-sm transition hover:border-border hover:bg-muted/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-foreground">
                <Plug className="h-5 w-5" />
                <span className="text-base font-semibold">MCP Server</span>
              </div>
              <span className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                Beta
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Connect EdPear docs and registry metadata to MCP-compatible assistants from your
              editor or agent runtime.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
