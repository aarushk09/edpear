"use client";

import { Check, ChevronDown, ChevronLeft, ChevronRight, Copy, FileText } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { COMPONENT_USAGE_SNIPPETS } from "../lib/component-usage-snippets";
import {
  EDPEAR_PACKAGE,
  INSTALL_COMMAND,
  type PackageManager,
  STYLES_IMPORT_LINE,
  cliAddCommands,
  manualInstallMarkdown,
  packageManagers,
} from "../lib/package-docs";
import {
  type ShowcaseSlug,
  getComponentLabel,
  getNeighborSlugs,
} from "../lib/showcase-nav";
import { ShikiCodeBlock } from "./shiki-code-block";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function CopyBtn({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border/80 bg-background px-2.5 text-xs font-medium text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

type InstallTab = "command" | "manual";

function TabRow<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-muted/40 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cx(
            "rounded-md px-3 py-1.5 text-xs font-medium transition",
            value === o.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function buildCopyPageMarkdown(
  slug: ShowcaseSlug,
  label: string,
  description: string,
  title: string,
  usage: string,
  pm: PackageManager,
): string {
  const cmds = cliAddCommands(slug);
  return `# ${label}

${description}

**Export:** ${title}

## Installation

\`\`\`bash
${cmds[pm]}
\`\`\`

## Styles

\`\`\`ts
${STYLES_IMPORT_LINE}
\`\`\`

## Usage

\`\`\`tsx
${usage}
\`\`\`
`;
}

export function DemoFrame({
  id,
  title,
  description,
  children,
}: {
  id: ShowcaseSlug;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const label = getComponentLabel(id);
  const { prev, next } = getNeighborSlugs(id);
  const usageCode = COMPONENT_USAGE_SNIPPETS[id];
  const cmds = cliAddCommands(id);

  const [viewCodeOpen, setViewCodeOpen] = useState(false);
  const [installTab, setInstallTab] = useState<InstallTab>("command");
  const [pm, setPm] = useState<PackageManager>("npm");
  const previewRef = useRef<HTMLElement | null>(null);

  function openCodeAndScrollToPreview() {
    setViewCodeOpen(true);
    requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const copyPageText = useMemo(
    () => buildCopyPageMarkdown(id, label, description, title, usageCode, pm),
    [id, label, description, title, usageCode, pm],
  );

  const manualMd = useMemo(() => manualInstallMarkdown(id), [id]);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{label}</h1>
            <p className="font-mono text-sm text-muted-foreground">{title}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CopyBtn text={copyPageText} label="Copy page" />
          </div>
        </div>

        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            React
          </span>
          <span className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Tailwind CSS
          </span>
          <span className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {EDPEAR_PACKAGE}
          </span>
        </div>

        <nav className="flex flex-wrap gap-3 border-t border-border pt-4 text-sm" aria-label="Pager">
          {prev ? (
            <Link
              href={`/${prev}`}
              className="inline-flex items-center gap-1 font-medium text-muted-foreground transition hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 text-muted-foreground/50">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </span>
          )}
          {next ? (
            <Link
              href={`/${next}`}
              className="inline-flex items-center gap-1 font-medium text-muted-foreground transition hover:text-foreground"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 text-muted-foreground/50">
              Next
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </nav>
      </header>

      <section
        ref={previewRef}
        id="component-preview"
        className="space-y-3"
        aria-labelledby="preview-heading"
      >
        <h2 id="preview-heading" className="sr-only">
          Preview
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-foreground/5 dark:ring-white/10">
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground">Preview</span>
              <button
                type="button"
                onClick={() => setViewCodeOpen((o) => !o)}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted"
              >
                <FileText className="h-3.5 w-3.5" />
                View code
                <ChevronDown
                  className={cx("h-3.5 w-3.5 transition", viewCodeOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-b from-muted/15 to-transparent p-5 md:p-8">{children}</div>
          {viewCodeOpen ? (
            <div className="border-t border-border bg-muted/20 p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">Usage</span>
                <CopyBtn text={usageCode} />
              </div>
              <ShikiCodeBlock code={usageCode} lang="tsx" />
            </div>
          ) : null}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="installation-heading">
        <h2 id="installation-heading" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <TabRow
          value={installTab}
          onChange={setInstallTab}
          options={[
            { id: "command", label: "Command" },
            { id: "manual", label: "Manual" },
          ]}
        />

        {installTab === "command" ? (
          <div className="space-y-3">
            <TabRow value={pm} onChange={setPm} options={packageManagers().map((p) => ({ id: p, label: p }))} />
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/35 px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground capitalize">{pm}</span>
                <CopyBtn text={cmds[pm]} />
              </div>
              <ShikiCodeBlock code={cmds[pm]} lang="bash" className="rounded-none border-0 shadow-none" />
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/35 px-3 py-2">
              <span className="text-xs font-medium text-muted-foreground">Steps</span>
              <CopyBtn text={manualMd} />
            </div>
            <ShikiCodeBlock code={manualMd} lang="plaintext" className="rounded-none border-0 shadow-none" />
          </div>
        )}
      </section>

      <section className="space-y-4" aria-labelledby="usage-heading">
        <h2 id="usage-heading" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/35 px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">tsx</span>
            <CopyBtn text={usageCode} />
          </div>
          <ShikiCodeBlock code={usageCode} lang="tsx" className="rounded-none border-0 shadow-none" />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>
        <div className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm ring-1 ring-foreground/5 dark:ring-white/10">
          <h3 className="text-sm font-semibold text-foreground">Default</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The preview above uses a representative configuration. Adjust props, slots, and data to match your app.
          </p>
          <button
            type="button"
            onClick={openCodeAndScrollToPreview}
            className="mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View code
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        <strong className="font-medium text-foreground">Package import:</strong>{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{INSTALL_COMMAND}</code>
        <span className="mx-2">·</span>
        <strong className="font-medium text-foreground">Styles:</strong>{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{STYLES_IMPORT_LINE}</code>
      </section>
    </div>
  );
}
