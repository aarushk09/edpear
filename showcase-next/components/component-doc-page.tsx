"use client";

import { Check, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import type { ParsedUsageExample } from "../lib/parse-usage-examples";

import { getUsageExamplesForSlug } from "../lib/get-usage-examples";
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

type TocEntry = { id: string; label: string; depth: 0 | 1 };

function buildTocEntries(examples: { id: string; title: string }[]): TocEntry[] {
  return [
    { id: "overview", label: "Overview", depth: 0 },
    { id: "installation", label: "Installation", depth: 0 },
    { id: "examples", label: "Examples", depth: 0 },
    ...examples.map((e) => ({ id: e.id, label: e.title, depth: 1 as const })),
    { id: "package-meta", label: "Package & styles", depth: 0 },
  ];
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `#${id}`);
  }
}

function OnThisPageNav({ entries }: { entries: TocEntry[] }) {
  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  }, []);

  return (
    <nav className="space-y-3" aria-label="On this page">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">On this page</p>
      <ul className="space-y-1.5 border-l border-foreground/10 pl-3">
        {entries.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cx(
                "block max-w-[11rem] truncate py-0.5 text-[13px] leading-snug text-muted-foreground transition-colors hover:text-foreground",
                item.depth > 0 && "pl-3",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
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
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-muted/70 px-2.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
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
    <div className="inline-flex flex-wrap gap-1 rounded-xl bg-muted/50 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cx(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition",
            value === o.id
              ? "bg-muted text-foreground"
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
  examples: { title: string; description?: string; code: string }[],
  pm: PackageManager,
): string {
  const cmds = cliAddCommands(slug);
  const examplesBody = examples
    .map((ex) => {
      const prose = ex.description ? `${ex.description}\n\n` : "";
      return `### ${ex.title}\n\n${prose}\`\`\`tsx\n${ex.code}\n\`\`\``;
    })
    .join("\n\n");
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

## Examples

${examplesBody}
`;
}

function ExampleShowcaseCard({
  example,
  preview,
}: {
  example: ParsedUsageExample;
  preview: ReactNode | null | undefined;
}) {
  const showPreview = preview != null && preview !== false;

  return (
    <div id={example.id} className="scroll-mt-8 space-y-4">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">{example.title}</h3>
        {example.description ? (
          <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">{example.description}</p>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-xl border border-foreground/10 ring-1 ring-foreground/10">
        {showPreview ? (
          <div className="border-b border-foreground/10 bg-muted/35 p-6 sm:p-10">
            <div className="flex w-full min-w-0 justify-center [&>*]:max-w-full">{preview}</div>
          </div>
        ) : null}
        <div className="min-h-0 bg-muted/15 dark:bg-[hsl(0_0%_4%)]">
          <div className="flex items-center justify-between border-b border-foreground/10 bg-muted/25 px-3 py-2.5 sm:px-4">
            <span className="text-xs font-medium text-muted-foreground">tsx</span>
            <CopyBtn text={example.code} />
          </div>
          <div className="max-h-[min(32rem,70vh)] overflow-y-auto overflow-x-auto">
            <ShikiCodeBlock code={example.code} lang="tsx" className="rounded-none bg-transparent shadow-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoFrame({
  id,
  title,
  description,
  children,
  examplePreviews,
}: {
  id: ShowcaseSlug;
  title: string;
  description: string;
  children: React.ReactNode;
  examplePreviews?: ReactNode[];
}) {
  const label = getComponentLabel(id);
  const { prev, next } = getNeighborSlugs(id);
  const cmds = cliAddCommands(id);

  const usageExamples = useMemo(() => getUsageExamplesForSlug(id), [id]);
  const tocEntries = useMemo(() => buildTocEntries(usageExamples), [usageExamples]);

  const [installTab, setInstallTab] = useState<InstallTab>("command");
  const [pm, setPm] = useState<PackageManager>("npm");

  const copyPageText = useMemo(
    () =>
      buildCopyPageMarkdown(id, label, description, title, usageExamples, pm),
    [id, label, description, title, usageExamples, pm],
  );

  const manualMd = useMemo(() => manualInstallMarkdown(id), [id]);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && document.getElementById(hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, [id]);

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-x-10 gap-y-10 xl:grid-cols-[minmax(0,42rem)_minmax(0,12rem)] xl:items-start xl:justify-center">
      <div className="min-w-0 space-y-12 pb-16">
      <header id="overview" className="scroll-mt-6 space-y-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{label}</h1>
            <p className="font-mono text-sm text-muted-foreground">{title}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CopyBtn text={copyPageText} label="Copy page" />
          </div>
        </div>

        <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">{description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            React
          </span>
          <span className="rounded-lg bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Tailwind CSS
          </span>
          <span className="rounded-lg bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {EDPEAR_PACKAGE}
          </span>
        </div>

        <nav className="flex flex-wrap gap-6 pt-2 text-sm" aria-label="Pager">
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

      <section className="scroll-mt-6 space-y-5" aria-labelledby="installation">
        <h2 id="installation" className="text-lg font-semibold tracking-tight text-foreground">
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
            <div className="overflow-hidden rounded-xl bg-muted/40">
              <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4">
                <span className="text-xs font-medium text-muted-foreground capitalize">{pm}</span>
                <CopyBtn text={cmds[pm]} />
              </div>
              <ShikiCodeBlock code={cmds[pm]} lang="bash" className="rounded-none border-0 shadow-none" />
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-muted/40">
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4">
              <span className="text-xs font-medium text-muted-foreground">Steps</span>
              <CopyBtn text={manualMd} />
            </div>
            <ShikiCodeBlock code={manualMd} lang="plaintext" className="rounded-none border-0 shadow-none" />
          </div>
        )}
      </section>

      <section className="scroll-mt-6 space-y-16" aria-labelledby="examples">
        <div className="space-y-2">
          <h2 id="examples" className="text-lg font-semibold tracking-tight text-foreground">
            Examples
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Each example shows the component in context, then the exact code for that case (imports included). Copy the
            block that matches your product.
          </p>
        </div>
        {usageExamples.map((ex, i) => {
          const slot = examplePreviews?.[i];
          const preview = slot !== undefined ? slot : i === 0 ? children : null;
          return <ExampleShowcaseCard key={ex.id} example={ex} preview={preview} />;
        })}
      </section>

      <section
        id="package-meta"
        className="scroll-mt-6 rounded-xl bg-muted/30 px-4 py-4 text-sm text-muted-foreground"
        aria-label="Package and styles"
      >
        <strong className="font-medium text-foreground">Package import:</strong>{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{INSTALL_COMMAND}</code>
        <span className="mx-2">·</span>
        <strong className="font-medium text-foreground">Styles:</strong>{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{STYLES_IMPORT_LINE}</code>
      </section>
      </div>

      <aside className="hidden min-w-0 xl:block" aria-label="Page summary">
        <div className="sticky top-8">
          <OnThisPageNav entries={tocEntries} />
        </div>
      </aside>
    </div>
  );
}
