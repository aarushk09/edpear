"use client";

import { Check, ChevronDown, ChevronLeft, ChevronRight, Copy, Terminal } from "lucide-react";
import Link from "next/link";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import type { ParsedUsageExample } from "../lib/parse-usage-examples";
import type { ComponentDocsData } from "../lib/component-docs";

import { getUsageExamplesForSlug } from "../lib/get-usage-examples";
import {
  INSTALL_COMMAND,
  type PackageManager,
  STYLES_IMPORT_LINE,
  cliAddCommands,
  manualInstallSteps,
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
const GENERIC_DESCRIPTION_RE = /^Interactive demo for [A-Za-z0-9]+\.?$/;

const ComponentDocsContext = createContext<ComponentDocsData | null>(null);

export function ComponentDocsProvider({
  docs,
  children,
}: {
  docs: ComponentDocsData;
  children: ReactNode;
}) {
  return <ComponentDocsContext.Provider value={docs}>{children}</ComponentDocsContext.Provider>;
}

function useComponentDocs() {
  const value = useContext(ComponentDocsContext);
  if (!value) {
    throw new Error("Component docs are required to render a DemoFrame.");
  }
  return value;
}

function buildTocEntries(
  examples: { id: string; title: string }[],
  docs: ComponentDocsData,
): TocEntry[] {
  const entries: TocEntry[] = [
    { id: "overview", label: "Overview", depth: 0 },
    { id: "installation", label: "Installation", depth: 0 },
    { id: "examples", label: "Examples", depth: 0 },
    ...examples.map((e) => ({ id: e.id, label: e.title, depth: 1 as const })),
  ];

  if (docs.props.length > 0) {
    entries.push({ id: "api-reference", label: "API reference", depth: 0 });
  }
  if (docs.usageNotes.length > 0) {
    entries.push({ id: "usage-guidance", label: "Usage guidance", depth: 0 });
  }
  entries.push({ id: "accessibility", label: "Accessibility", depth: 0 });
  entries.push({ id: "docs-status", label: "Docs status", depth: 0 });
  entries.push({ id: "package-meta", label: "Package & styles", depth: 0 });

  return entries;
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

function CopyIconBtn({ text }: { text: string }) {
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
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Copy command"
    >
      {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function InstallStepper({ slug }: { slug: string }) {
  const steps = manualInstallSteps(slug as any);
  return (
    <div className="relative pl-8 space-y-8">
      {/* Vertical line */}
      <div
        className="absolute left-[11px] top-1 bottom-1 w-px bg-border"
        aria-hidden
      />
      {steps.map((step, i) => (
        <div key={i} className="relative">
          {/* Node circle */}
          <div
            className="absolute -left-8 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-border bg-background text-[11px] font-bold text-muted-foreground"
            aria-hidden
          >
            {i + 1}
          </div>
          {/* Step content */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground leading-snug">{step.title}</h4>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{step.description}</p>
            <div className="overflow-hidden rounded-lg border border-border bg-muted/20">
              <div className="flex items-center justify-between gap-2 px-3 py-1.5">
                <span className="text-[11px] font-medium text-muted-foreground">{step.lang}</span>
                <CopyIconBtn text={step.code} />
              </div>
              <ShikiCodeBlock code={step.code} lang={step.lang as any} className="rounded-none border-0 shadow-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
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

function createFallbackDescription(label: string, docs: ComponentDocsData) {
  return (
    docs.overview ??
    docs.registryDescription ??
    `${label} is a production-ready EdTech component with typed APIs, live examples, and implementation guidance.`
  );
}

/** ~3 lines of Shiki body text at text-[13px] leading-relaxed */
const CODE_PREVIEW_MAX_HEIGHT_REM = 5.5;
const CODE_COLLAPSE_LINE_THRESHOLD = 4;

function ExampleShowcaseCard({
  example,
  preview,
}: {
  example: ParsedUsageExample;
  preview: ReactNode | null | undefined;
}) {
  const showPreview = preview != null && preview !== false;
  const lineCount = useMemo(() => example.code.trim().split("\n").length, [example.code]);
  const isTrivialSnippet = lineCount <= CODE_COLLAPSE_LINE_THRESHOLD;
  const [codeOpen, setCodeOpen] = useState(isTrivialSnippet);

  return (
    <div id={example.id} className="scroll-mt-8 space-y-4">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">{example.title}</h3>
        {example.description ? (
          <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">{example.description}</p>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-xl border border-border">
        {showPreview ? (
          <div className="demo-preview-neutral border-b border-border bg-background p-6 sm:p-10">
            <div className="flex w-full min-w-0 justify-center [&>*]:max-w-full">{preview}</div>
          </div>
        ) : null}
        <div className="min-h-0 bg-muted/30 dark:bg-[hsl(0_0%_4%)]">
          <div className="flex items-center justify-between border-b border-border px-3 py-2.5 sm:px-4">
            <span className="text-xs font-medium text-muted-foreground">tsx</span>
            <CopyBtn text={example.code} />
          </div>
          <div
            className={cx(
              "relative overflow-x-auto",
              codeOpen ? "max-h-[min(32rem,70vh)] overflow-y-auto" : "overflow-hidden",
            )}
            style={!codeOpen && !isTrivialSnippet ? { maxHeight: `${CODE_PREVIEW_MAX_HEIGHT_REM}rem` } : undefined}
          >
            <ShikiCodeBlock code={example.code} lang="tsx" className="rounded-none bg-transparent shadow-none" />
            {!codeOpen && !isTrivialSnippet ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-muted/80 from-40% via-muted/50 to-transparent dark:from-[hsl(0_0%_4%)] dark:via-[hsl(0_0%_4%)]/75"
                aria-hidden
              />
            ) : null}
          </div>
          {!isTrivialSnippet ? (
            <div className="flex justify-center border-t border-border bg-muted/30 px-3 py-3 dark:bg-[hsl(0_0%_4%)]">
              <button
                type="button"
                aria-expanded={codeOpen}
                onClick={() => setCodeOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground px-4 py-1.5 text-xs font-medium text-background shadow-sm transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {codeOpen ? "Hide code" : "View code"}
                <ChevronDown
                  className={cx("h-3.5 w-3.5 transition-transform duration-200", codeOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function CoveragePill({
  label,
  complete,
  missingLabel,
}: {
  label: string;
  complete: boolean;
  missingLabel: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
        complete
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      )}
    >
      {complete ? label : missingLabel}
    </span>
  );
}

export function DemoFrame({
  id,
  title,
  description,
  children,
  examplePreviews,
  layout = "default",
}: {
  id: ShowcaseSlug;
  title: string;
  description: string;
  children: React.ReactNode;
  examplePreviews?: ReactNode[];
  layout?: "default" | "wide";
}) {
  const docs = useComponentDocs();
  const label = getComponentLabel(id);
  const { prev, next } = getNeighborSlugs(id);
  const cmds = cliAddCommands(id);
  const effectiveDescription = useMemo(() => {
    if (!description.trim() || GENERIC_DESCRIPTION_RE.test(description.trim())) {
      return createFallbackDescription(label, docs);
    }
    return description;
  }, [description, docs, label]);

  const usageExamples = useMemo(() => getUsageExamplesForSlug(id), [id]);
  const tocEntries = useMemo(() => buildTocEntries(usageExamples, docs), [docs, usageExamples]);

  const [installTab, setInstallTab] = useState<InstallTab>("command");
  const [pm, setPm] = useState<PackageManager>("npm");

  const copyPageText = useMemo(
    () =>
      buildCopyPageMarkdown(id, label, effectiveDescription, title, usageExamples, pm),
    [id, label, effectiveDescription, title, usageExamples, pm],
  );

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && document.getElementById(hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, [id]);

  return (
    <div
      className={cx(
        "mx-auto grid w-full max-w-6xl gap-x-10 gap-y-10 xl:justify-center",
        layout === "wide"
          ? "xl:grid-cols-[minmax(0,52rem)_minmax(0,12rem)]"
          : "xl:grid-cols-[minmax(0,42rem)_minmax(0,12rem)]",
      )}
    >
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

          <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">{effectiveDescription}</p>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatPill label="Examples" value={`${usageExamples.length} copy-paste snippets`} />
            <StatPill label="API props" value={`${docs.props.length} typed entries`} />
            <StatPill
              label="Docs source"
              value={docs.coverage.hasReadme ? "README-backed reference" : "Generated from source"}
            />
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
            <div className="overflow-hidden rounded-xl border border-border bg-muted/20">
              {/* Header row: terminal icon + pm tabs left, copy icon right */}
              <div className="flex items-center gap-3 border-b border-border px-3 py-2">
                <Terminal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                <div className="flex items-center gap-0.5">
                  {packageManagers().map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPm(p as PackageManager)}
                      className={cx(
                        "rounded-md px-2.5 py-1 text-xs font-medium transition",
                        pm === p
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="ml-auto">
                  <CopyIconBtn text={cmds[pm]} />
                </div>
              </div>
              {/* Command line */}
              <ShikiCodeBlock code={cmds[pm]} lang="bash" className="rounded-none border-0 shadow-none" />
            </div>
          ) : (
            <InstallStepper slug={id} />
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

        {docs.props.length > 0 ? (
          <section className="scroll-mt-6 space-y-4" aria-labelledby="api-reference">
            <div className="space-y-2">
              <h2 id="api-reference" className="text-lg font-semibold tracking-tight text-foreground">
                API reference
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Prop definitions are pulled from the TypeScript source so the reference stays aligned with the package.
              </p>
              {docs.forwardedProps.length > 0 ? (
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Also forwards native props from <code>{docs.forwardedProps.join(", ")}</code>.
                </p>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-muted/30 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Prop</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Required</th>
                      <th className="px-4 py-3 font-medium">Default</th>
                      <th className="px-4 py-3 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.props.map((prop) => (
                      <tr key={prop.name} className="border-t border-border align-top">
                        <td className="px-4 py-3 font-mono text-xs text-foreground">{prop.name}</td>
                        <td className="px-4 py-3">
                          <code className="text-xs text-muted-foreground">{prop.type}</code>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">
                          {prop.required ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {prop.defaultValue && prop.defaultValue !== "required" ? prop.defaultValue : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {prop.description || "No inline description yet."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : null}

        {docs.usageNotes.length > 0 ? (
          <section className="scroll-mt-6 space-y-4" aria-labelledby="usage-guidance">
            <div className="space-y-2">
              <h2 id="usage-guidance" className="text-lg font-semibold tracking-tight text-foreground">
                Usage guidance
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Operational notes for real product flows, pulled from the component docs instead of duplicated page copy.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {docs.usageNotes.map((note) => (
                <div key={note.title} className="rounded-xl border border-border bg-muted/10 p-5">
                  <h3 className="text-sm font-semibold text-foreground">{note.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {note.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span aria-hidden>-</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="scroll-mt-6 space-y-4" aria-labelledby="accessibility">
          <div className="space-y-2">
            <h2 id="accessibility" className="text-lg font-semibold tracking-tight text-foreground">
              Accessibility
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Adoption is faster when teams know the interaction model up front. This section highlights keyboard, focus,
              and announcement behavior where it has been documented.
            </p>
          </div>

          {docs.accessibility.length > 0 ? (
            <div className="rounded-xl border border-border bg-muted/10 p-5">
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {docs.accessibility.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden>-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
              Accessibility notes have not been written for this component yet. The live example is available, but the
              guidance still needs to be completed before this page reaches the target documentation bar.
            </div>
          )}
        </section>

        <section id="docs-status" className="scroll-mt-6 space-y-4" aria-label="Documentation status">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Documentation status</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              This audit surface is generated from the component folder so gaps are visible while we continue upgrading
              the library.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <CoveragePill
              label="README coverage"
              missingLabel="README missing"
              complete={docs.coverage.hasReadme}
            />
            <CoveragePill
              label="API reference ready"
              missingLabel="API reference incomplete"
              complete={docs.coverage.hasApiReference}
            />
            <CoveragePill
              label="Accessibility documented"
              missingLabel="Accessibility guidance missing"
              complete={docs.coverage.hasAccessibility}
            />
            <CoveragePill
              label="Usage notes included"
              missingLabel="Usage notes missing"
              complete={docs.coverage.hasUsageNotes}
            />
          </div>
        </section>

        <section
          id="package-meta"
          className="scroll-mt-6 space-y-3 rounded-xl border border-border bg-muted/10 px-5 py-5"
          aria-label="Package and styles"
        >
          <h3 className="text-sm font-semibold text-foreground">Quick reference</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">Install</p>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                <code className="flex-1 truncate font-mono text-xs text-foreground">{INSTALL_COMMAND}</code>
                <CopyIconBtn text={INSTALL_COMMAND} />
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">Styles</p>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                <code className="flex-1 truncate font-mono text-xs text-foreground">{STYLES_IMPORT_LINE}</code>
                <CopyIconBtn text={STYLES_IMPORT_LINE} />
              </div>
            </div>
          </div>
          {(docs.sourceFiles.component || docs.sourceFiles.types || docs.sourceFiles.readme) ? (
            <div className="space-y-1.5 sm:col-span-2">
              <p className="text-xs font-medium text-muted-foreground">Source files</p>
              <div className="rounded-lg border border-border bg-background px-3 py-3 text-xs text-muted-foreground">
                {docs.sourceFiles.component ? <div>{docs.sourceFiles.component}</div> : null}
                {docs.sourceFiles.types ? <div>{docs.sourceFiles.types}</div> : null}
                {docs.sourceFiles.readme ? <div>{docs.sourceFiles.readme}</div> : null}
              </div>
            </div>
          ) : null}
        </section>
      </div>

      <aside className="hidden min-w-0 xl:block" aria-label="Page summary">
        <div className="sticky top-6">
          <OnThisPageNav entries={tocEntries} />
        </div>
      </aside>
    </div>
  );
}
