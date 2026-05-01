import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const specs = JSON.parse(
  fs.readFileSync(path.join(root, "tools", "next-gen-specs.json"), "utf8"),
);
const groups = [
  "Metacognition & Reflection",
  "Learning Analytics",
  "Parent & Guardian",
  "Curriculum & Content Design",
  "Language & Multilingual",
  "Student Wellbeing",
  "Social & Collaboration",
  "Assessment Integrity",
  "Accessibility & Inclusion",
  "Portfolio & Credentials",
  "Admin & Operations",
];

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node tools/generate-next-gen.mjs <slug>");
  process.exit(1);
}

const spec = specs.find((entry) => entry.slug === slug);
if (!spec) {
  console.error(`Unknown slug: ${slug}`);
  process.exit(1);
}

const componentDir = path.join(root, "src", "components", spec.slug);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, `${content.trimEnd()}\n`, "utf8");
}

function toTs(value) {
  return JSON.stringify(value, null, 2);
}

function words(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

function usageConstName(specEntry) {
  return `sample${specEntry.dataType}`;
}

function previewProps(variant) {
  if (variant === 2) return `\n        title="Workspace view"`;
  if (variant === 3) return `\n        disabled\n        subtitle="Compact read-only preview for dashboards and summaries."`;
  return "";
}

function buildSelectionTypes(specEntry) {
  return `
export interface ${specEntry.dataType} {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  status?: string;
  tag?: string;
  evidence?: string[];
  score?: number;
}

export interface ${specEntry.name}Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  ${specEntry.dataProp}?: ${specEntry.dataType}[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  disabled?: boolean;
  ${specEntry.primaryCallback}?: (entry: ${specEntry.dataType}) => void;
  ${specEntry.secondaryCallback}?: (entry: ${specEntry.dataType}) => void;
}
`;
}

function buildMetricTypes(specEntry) {
  return `
export interface ${specEntry.dataType} {
  id: string;
  label: string;
  baseline: number;
  current: number;
  target?: number;
  detail?: string;
}

export interface ${specEntry.name}Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  title?: string;
  subtitle?: string;
  ${specEntry.dataProp}?: ${specEntry.dataType}[];
  baselineLabel?: string;
  currentLabel?: string;
  targetLabel?: string;
  disabled?: boolean;
  ${specEntry.callback}?: (point: ${specEntry.dataType}) => void;
}
`;
}

function buildBuilderTypes(specEntry) {
  return `
export interface ${specEntry.dataType} {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface ${specEntry.name}Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  ${specEntry.dataProp}?: ${specEntry.dataType}[];
  primaryActionLabel?: string;
  disabled?: boolean;
  ${specEntry.callback}?: (items: ${specEntry.dataType}[]) => void;
}
`;
}

function buildPreviewTypes(specEntry) {
  return `
export interface ${specEntry.dataType} {
  id: string;
  label: string;
  headline: string;
  body: string;
  note?: string;
}

export interface ${specEntry.name}Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  ${specEntry.dataProp}?: ${specEntry.dataType}[];
  defaultVariantId?: string;
  disabled?: boolean;
  ${specEntry.callback}?: (variantId: string) => void;
}
`;
}

function buildSelectionComponent(specEntry) {
  return `
"use client";

import { ${specEntry.icon}, ArrowRight, Sparkles } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { ${specEntry.dataType}, ${specEntry.name}Props } from "./${specEntry.slug}.types.js";

const DEFAULT_ITEMS: ${specEntry.dataType}[] = ${toTs(specEntry.defaultData)};

export const ${specEntry.name} = forwardRef<HTMLDivElement, ${specEntry.name}Props>((props, ref) => {
  const {
    title = "${words(specEntry.name)}",
    subtitle = "${specEntry.description}",
    ${specEntry.dataProp} = DEFAULT_ITEMS,
    primaryActionLabel = "${specEntry.primaryLabel}",
    secondaryActionLabel = "${specEntry.secondaryLabel}",
    disabled = false,
    ${specEntry.primaryCallback},
    ${specEntry.secondaryCallback},
    className,
    ...rest
  } = props;

  const [activeId, setActiveId] = useState(${specEntry.dataProp}[0]?.id ?? null);
  const activeItem = useMemo(
    () => ${specEntry.dataProp}.find((entry) => entry.id === activeId) ?? ${specEntry.dataProp}[0] ?? null,
    [activeId, ${specEntry.dataProp}],
  );

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="${specEntry.slug}"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <${specEntry.icon} className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Items</p>
              <p className="mt-1 font-semibold">{${specEntry.dataProp}.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Signals</p>
              <p className="mt-1 font-semibold">{${specEntry.dataProp}.filter((entry) => entry.status).length}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Evidence</p>
              <p className="mt-1 font-semibold">{${specEntry.dataProp}.flatMap((entry) => entry.evidence ?? []).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">
        <div className="space-y-3">
          {${specEntry.dataProp}.map((entry) => {
            const selected = activeItem?.id === entry.id;
            return (
              <button
                key={entry.id}
                type="button"
                disabled={disabled}
                onClick={() => setActiveId(entry.id)}
                className={cn(
                  "w-full rounded-2xl border px-4 py-4 text-left transition",
                  selected ? "border-primary/40 bg-primary/5" : "border-border bg-background hover:bg-muted/20",
                  disabled && "cursor-not-allowed opacity-70",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{entry.title}</p>
                      {entry.tag ? (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{entry.tag}</span>
                      ) : null}
                    </div>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{entry.subtitle}</p>
                  </div>
                  {entry.score !== undefined ? (
                    <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium">{entry.score}</span>
                  ) : null}
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{entry.detail}</p>
              </button>
            );
          })}
        </div>

        <aside className="rounded-2xl border border-border bg-muted/10 p-4 sm:p-5">
          {activeItem ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold tracking-tight">{activeItem.title}</h4>
                  {activeItem.status ? (
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">{activeItem.status}</span>
                  ) : null}
                </div>
                <p className="text-sm uppercase tracking-[0.12em] text-muted-foreground">{activeItem.subtitle}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{activeItem.detail}</p>
              </div>

              {activeItem.evidence?.length ? (
                <div className="space-y-2 rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Supporting evidence
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {activeItem.evidence.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => activeItem && ${specEntry.primaryCallback}?.(activeItem)}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {primaryActionLabel}
                </button>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => activeItem && ${specEntry.secondaryCallback}?.(activeItem)}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium transition hover:bg-muted/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {secondaryActionLabel}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-background px-4 py-8 text-center text-sm text-muted-foreground">
              Add a data point to start this workspace.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
});

${specEntry.name}.displayName = "${specEntry.name}";
`;
}

function buildMetricComponent(specEntry) {
  const metricImports = Array.from(new Set([specEntry.icon, "Target", "TrendingUp"])).join(", ");
  return `
"use client";

import { ${metricImports} } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { ${specEntry.dataType}, ${specEntry.name}Props } from "./${specEntry.slug}.types.js";

const DEFAULT_POINTS: ${specEntry.dataType}[] = ${toTs(specEntry.defaultData)};

function maxValue(points: ${specEntry.dataType}[]) {
  return Math.max(...points.flatMap((point) => [point.baseline, point.current, point.target ?? 0]), 1);
}

export const ${specEntry.name} = forwardRef<HTMLDivElement, ${specEntry.name}Props>((props, ref) => {
  const {
    title = "${words(specEntry.name)}",
    subtitle = "${specEntry.description}",
    ${specEntry.dataProp} = DEFAULT_POINTS,
    baselineLabel = "${specEntry.baselineLabel}",
    currentLabel = "${specEntry.currentLabel}",
    targetLabel = "${specEntry.targetLabel}",
    disabled = false,
    ${specEntry.callback},
    className,
    ...rest
  } = props;

  const [activeId, setActiveId] = useState(${specEntry.dataProp}[0]?.id ?? null);
  const peak = useMemo(() => maxValue(${specEntry.dataProp}), [${specEntry.dataProp}]);
  const activePoint = useMemo(
    () => ${specEntry.dataProp}.find((point) => point.id === activeId) ?? ${specEntry.dataProp}[0] ?? null,
    [activeId, ${specEntry.dataProp}],
  );
  const deltaAverage = useMemo(() => {
    if (!${specEntry.dataProp}.length) return 0;
    const total = ${specEntry.dataProp}.reduce((sum, point) => sum + (point.current - point.baseline), 0);
    return Math.round((total / ${specEntry.dataProp}.length) * 10) / 10;
  }, [${specEntry.dataProp}]);

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="${specEntry.slug}"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <${specEntry.icon} className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Avg delta</p>
              <p className="mt-1 font-semibold">{deltaAverage > 0 ? "+" : ""}{deltaAverage}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Tracked</p>
              <p className="mt-1 font-semibold">{${specEntry.dataProp}.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Targets</p>
              <p className="mt-1 font-semibold">{${specEntry.dataProp}.filter((point) => point.target !== undefined).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <div className="space-y-4">
          {${specEntry.dataProp}.map((point) => {
            const selected = point.id === activePoint?.id;
            const baselineWidth = Math.max(8, (point.baseline / peak) * 100);
            const currentWidth = Math.max(8, (point.current / peak) * 100);
            const targetWidth = Math.max(8, ((point.target ?? 0) / peak) * 100);
            return (
              <button
                key={point.id}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setActiveId(point.id);
                  ${specEntry.callback}?.(point);
                }}
                className={cn(
                  "w-full rounded-2xl border px-4 py-4 text-left transition",
                  selected ? "border-primary/40 bg-primary/5" : "border-border bg-background hover:bg-muted/20",
                  disabled && "cursor-not-allowed opacity-70",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{point.label}</p>
                    {point.detail ? <p className="mt-1 text-sm text-muted-foreground">{point.detail}</p> : null}
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold">{point.current}</p>
                    <p className="text-xs text-muted-foreground">current</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted-foreground"><span>{baselineLabel}</span><span>{point.baseline}</span></div>
                    <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-slate-400" style={{ width: baselineWidth + "%" }} /></div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted-foreground"><span>{currentLabel}</span><span>{point.current}</span></div>
                    <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: currentWidth + "%" }} /></div>
                  </div>
                  {point.target !== undefined ? (
                    <div>
                      <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-muted-foreground"><span>{targetLabel}</span><span>{point.target}</span></div>
                      <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-emerald-500" style={{ width: targetWidth + "%" }} /></div>
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <aside className="rounded-2xl border border-border bg-muted/10 p-4 sm:p-5">
          {activePoint ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-base font-semibold tracking-tight">{activePoint.label}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{activePoint.detail ?? "Select a point to inspect the trend."}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium"><TrendingUp className="h-4 w-4 text-primary" /> {currentLabel}</div>
                  <p className="mt-2 text-2xl font-semibold">{activePoint.current}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium"><Target className="h-4 w-4 text-emerald-500" /> {targetLabel}</div>
                  <p className="mt-2 text-2xl font-semibold">{activePoint.target ?? "-"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-medium">Change</p>
                  <p className="mt-2 text-2xl font-semibold">{activePoint.current - activePoint.baseline > 0 ? "+" : ""}{activePoint.current - activePoint.baseline}</p>
                </div>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
});

${specEntry.name}.displayName = "${specEntry.name}";
`;
}

function buildBuilderComponent(specEntry) {
  return `
"use client";

import { ${specEntry.icon}, ArrowDown, ArrowUp, GripVertical, Plus, Save } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { ${specEntry.dataType}, ${specEntry.name}Props } from "./${specEntry.slug}.types.js";

const DEFAULT_ITEMS: ${specEntry.dataType}[] = ${toTs(specEntry.defaultData)};

function createId() {
  return \`item-\${Date.now()}-\${Math.random().toString(36).slice(2, 8)}\`;
}

export const ${specEntry.name} = forwardRef<HTMLDivElement, ${specEntry.name}Props>((props, ref) => {
  const {
    title = "${words(specEntry.name)}",
    subtitle = "${specEntry.description}",
    ${specEntry.dataProp} = DEFAULT_ITEMS,
    primaryActionLabel = "${specEntry.primaryLabel}",
    disabled = false,
    ${specEntry.callback},
    className,
    ...rest
  } = props;

  const [items, setItems] = useState(${specEntry.dataProp});
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDetail, setDraftDetail] = useState("");

  const moveItem = (index: number, direction: number) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    const next = [...items];
    const entry = next[index];
    if (!entry) return;
    next.splice(index, 1);
    next.splice(nextIndex, 0, entry);
    setItems(next);
  };

  const addItem = () => {
    if (!draftTitle.trim() || disabled) return;
    setItems((prev) => [
      ...prev,
      { id: createId(), title: draftTitle.trim(), detail: draftDetail.trim() || "New draft item", tag: "draft" },
    ]);
    setDraftTitle("");
    setDraftDetail("");
  };

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="${specEntry.slug}"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <${specEntry.icon} className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-muted/20 p-4">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
              <input
                value={draftTitle}
                disabled={disabled}
                onChange={(event) => setDraftTitle(event.target.value)}
                placeholder="Add a new item title"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <input
                value={draftDetail}
                disabled={disabled}
                onChange={(event) => setDraftDetail(event.target.value)}
                placeholder="Add a supporting detail"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                disabled={disabled || !draftTitle.trim()}
                onClick={addItem}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Add
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="rounded-2xl border border-border bg-background p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <GripVertical className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">{item.title}</p>
                        {item.tag ? <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{item.tag}</span> : null}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" disabled={disabled || index === 0} onClick={() => moveItem(index, -1)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-background transition hover:bg-muted/20 disabled:opacity-40"><ArrowUp className="h-4 w-4" /></button>
                    <button type="button" disabled={disabled || index === items.length - 1} onClick={() => moveItem(index, 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-background transition hover:bg-muted/20 disabled:opacity-40"><ArrowDown className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-border bg-muted/10 p-4 sm:p-5">
          <div className="space-y-3">
            <h4 className="text-base font-semibold tracking-tight">Preview sequence</h4>
            <p className="text-sm text-muted-foreground">Use the ordered list below to sense-check pacing, tagging, and flow before saving.</p>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-border bg-background px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Step {index + 1}</p>
                  <p className="mt-1 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={disabled}
              onClick={() => ${specEntry.callback}?.(items)}
              className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="mr-1.5 h-4 w-4" />
              {primaryActionLabel}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
});

${specEntry.name}.displayName = "${specEntry.name}";
`;
}

function buildPreviewComponent(specEntry) {
  return `
"use client";

import { ${specEntry.icon}, RotateCw } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { ${specEntry.dataType}, ${specEntry.name}Props } from "./${specEntry.slug}.types.js";

const DEFAULT_VARIANTS: ${specEntry.dataType}[] = ${toTs(specEntry.defaultData)};

export const ${specEntry.name} = forwardRef<HTMLDivElement, ${specEntry.name}Props>((props, ref) => {
  const {
    title = "${words(specEntry.name)}",
    subtitle = "${specEntry.description}",
    ${specEntry.dataProp} = DEFAULT_VARIANTS,
    defaultVariantId,
    disabled = false,
    ${specEntry.callback},
    className,
    ...rest
  } = props;

  const [activeId, setActiveId] = useState(defaultVariantId ?? ${specEntry.dataProp}[0]?.id ?? null);
  const activeVariant = useMemo(
    () => ${specEntry.dataProp}.find((variant) => variant.id === activeId) ?? ${specEntry.dataProp}[0] ?? null,
    [activeId, ${specEntry.dataProp}],
  );

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="${specEntry.slug}"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <${specEntry.icon} className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {${specEntry.dataProp}.map((variant) => (
            <button
              key={variant.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                setActiveId(variant.id);
                ${specEntry.callback}?.(variant.id);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                variant.id === activeVariant?.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              {variant.label}
            </button>
          ))}
        </div>

        {activeVariant ? (
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="rounded-2xl border border-border bg-muted/10 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <RotateCw className="h-4 w-4" />
                Active variant
              </div>
              <h4 className="mt-3 text-xl font-semibold tracking-tight">{activeVariant.headline}</h4>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeVariant.body}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Implementation note</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{activeVariant.note ?? "Use this variant to compare alternate presentation states."}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
});

${specEntry.name}.displayName = "${specEntry.name}";
`;
}

function buildTypes(specEntry) {
  if (specEntry.kind === "selection") return buildSelectionTypes(specEntry);
  if (specEntry.kind === "metric") return buildMetricTypes(specEntry);
  if (specEntry.kind === "builder") return buildBuilderTypes(specEntry);
  return buildPreviewTypes(specEntry);
}

function buildComponent(specEntry) {
  if (specEntry.kind === "selection") return buildSelectionComponent(specEntry);
  if (specEntry.kind === "metric") return buildMetricComponent(specEntry);
  if (specEntry.kind === "builder") return buildBuilderComponent(specEntry);
  return buildPreviewComponent(specEntry);
}

function buildIndex(specEntry) {
  return `
export { ${specEntry.name} } from "./${specEntry.slug}.js";
export type { ${specEntry.dataType}, ${specEntry.name}Props } from "./${specEntry.slug}.types.js";
`;
}

function buildReadme(specEntry) {
  const dataRow =
    specEntry.kind === "preview"
      ? `| \`${specEntry.dataProp}\` | \`${specEntry.dataType}[]\` | Built-in sample variants | Alternate preview states or localized content |`
      : `| \`${specEntry.dataProp}\` | \`${specEntry.dataType}[]\` | Built-in sample data | Replace with your own product data |`;

  const callbackRows =
    specEntry.kind === "selection"
      ? `| \`${specEntry.primaryCallback}\` | \`(entry: ${specEntry.dataType}) => void\` | \`undefined\` | Fires the primary domain action for the active card |\n| \`${specEntry.secondaryCallback}\` | \`(entry: ${specEntry.dataType}) => void\` | \`undefined\` | Fires the secondary workflow action for the active card |`
      : specEntry.kind === "metric"
        ? `| \`${specEntry.callback}\` | \`(point: ${specEntry.dataType}) => void\` | \`undefined\` | Called when a metric row is inspected |`
        : specEntry.kind === "builder"
          ? `| \`${specEntry.callback}\` | \`(items: ${specEntry.dataType}[]) => void\` | \`undefined\` | Called when the current draft is saved |`
          : `| \`${specEntry.callback}\` | \`(variantId: string) => void\` | \`undefined\` | Called when the active presentation variant changes |`;

  return `
# ${specEntry.name}

${specEntry.description}

## Installation

\`\`\`bash
npx edpear add ${specEntry.slug}
\`\`\`

## Basic Usage

\`\`\`tsx
import { ${specEntry.name} } from "edpear";

<${specEntry.name} />
\`\`\`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| \`title\` | \`string\` | \`${words(specEntry.name)}\` | Heading text for the component card |
| \`subtitle\` | \`string\` | Built-in copy | Supporting product guidance under the title |
${dataRow}
| \`disabled\` | \`boolean\` | \`false\` | Disables interactive controls while preserving layout |
${callbackRows}

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
`;
}

function buildUsageSnippet(specEntry) {
  const sampleName = usageConstName(specEntry);
  const propLine = `${specEntry.dataProp}={${sampleName}}`;
  const callbackLine =
    specEntry.kind === "selection"
      ? `${specEntry.primaryCallback}={(entry) => console.log(entry.title)}`
      : specEntry.kind === "metric"
        ? `${specEntry.callback}={(point) => console.log(point.label)}`
        : specEntry.kind === "builder"
          ? `${specEntry.callback}={(items) => console.log(items.length)}`
          : `${specEntry.callback}={(variantId) => console.log(variantId)}`;

  return `import { ${specEntry.name}, type ${specEntry.dataType} } from "edpear-sdk";

const ${sampleName}: ${specEntry.dataType}[] = ${toTs(specEntry.defaultData)};

// 1) Default out-of-the-box experience
<${specEntry.name} />

// 2) Product data and callbacks
<${specEntry.name}
  ${propLine}
  ${callbackLine}
  title="Workspace view"
/>

// 3) Embedded or read-only preview
<${specEntry.name}
  disabled
  ${propLine}
  subtitle="Use the built-in structure as a compact embedded panel."
/>`;
}

function buildDemoFile(generatedSpecs) {
  const importNames = generatedSpecs.map((entry) => entry.name).join(",\n  ");
  const cases = generatedSpecs
    .map(
      (entry) => `    case "${entry.slug}":
      return (
        <DemoFrame
          id="${entry.slug}"
          title="<${entry.name} />"
          description="${entry.description}"
          layout="wide"
          examplePreviews={[
            <div key="${entry.slug}-0" className="w-full max-w-5xl"><${entry.name} /></div>,
            <div key="${entry.slug}-1" className="w-full max-w-5xl"><${entry.name}${previewProps(2)} /></div>,
            <div key="${entry.slug}-2" className="w-full max-w-5xl"><${entry.name}${previewProps(3)} /></div>,
          ]}
        >
          {null}
        </DemoFrame>
      );`,
    )
    .join("\n\n");

  return `
"use client";

import {
  ${importNames}
} from "edpear";

import { DemoFrame } from "./component-doc-page";
import type { ShowcaseSlug } from "../lib/showcase-nav";

export function renderNextGenComponentDemo(slug: ShowcaseSlug) {
  switch (slug) {
${cases}

    default:
      return null;
  }
}
`;
}

function buildNavFile(generatedSpecs) {
  const grouped = new Map(groups.map((group) => [group, []]));
  for (const entry of generatedSpecs) {
    grouped.get(entry.group)?.push(`      { id: "${entry.slug}", label: "${words(entry.name)}" },`);
  }
  const body = groups
    .filter((group) => grouped.get(group)?.length)
    .map(
      (group) => `  {
    title: "${group}",
    items: [
${grouped.get(group).join("\n")}
    ],
  },`,
    )
    .join("\n");

  return `
export const NEXT_GEN_NAV_GROUPS = [
${body}
] as const;
`;
}

function buildUsageFile(generatedSpecs) {
  const body = generatedSpecs
    .map((entry) => `  "${entry.slug}": ${JSON.stringify(buildUsageSnippet(entry))},`)
    .join("\n\n");
  return `
export const NEXT_GEN_COMPONENT_USAGE_SNIPPETS = {
${body}
} as const;
`;
}

function buildRegistryFile(generatedSpecs) {
  const body = generatedSpecs
    .map(
      (entry) => `  {
    name: "${entry.slug}",
    title: "${entry.name}",
    description: "${entry.description}",
    ai: false,
  },`,
    )
    .join("\n");
  return `
import type { RegistryComponent } from "./registry.js";

export const nextGenRegistryComponents: RegistryComponent[] = [
${body}
];
`;
}

function buildAggregator(generatedSpecs) {
  return generatedSpecs
    .map(
      (entry) => `export { ${entry.name} } from "../${entry.slug}/index.js";
export type { ${entry.dataType}, ${entry.name}Props } from "../${entry.slug}/index.js";`,
    )
    .join("\n\n");
}

function buildRootIndexBlock(generatedSpecs) {
  return generatedSpecs
    .map(
      (entry) => `export { ${entry.name} } from "./components/${entry.slug}/index.js";
export type { ${entry.dataType}, ${entry.name}Props } from "./components/${entry.slug}/index.js";`,
    )
    .join("\n");
}

function updateRootIndex(generatedSpecs) {
  const file = path.join(root, "src", "index.ts");
  const source = fs.readFileSync(file, "utf8");
  const replacement = `// NEXT_GEN_EXPORTS_START
${buildRootIndexBlock(generatedSpecs)}
// NEXT_GEN_EXPORTS_END`;
  const next = source.replace(
    /\/\/ NEXT_GEN_EXPORTS_START[\s\S]*?\/\/ NEXT_GEN_EXPORTS_END/,
    replacement,
  );
  writeFile(file, next);
}

writeFile(path.join(componentDir, `${spec.slug}.types.ts`), buildTypes(spec));
writeFile(path.join(componentDir, `${spec.slug}.tsx`), buildComponent(spec));
writeFile(path.join(componentDir, "index.tsx"), buildIndex(spec));
writeFile(path.join(componentDir, "README.md"), buildReadme(spec));

const generatedSpecs = specs.filter((entry) =>
  fs.existsSync(path.join(root, "src", "components", entry.slug)),
);

writeFile(path.join(root, "src", "components", "next-gen", "index.ts"), buildAggregator(generatedSpecs));
updateRootIndex(generatedSpecs);
writeFile(path.join(root, "src", "lib", "next-gen-registry.ts"), buildRegistryFile(generatedSpecs));
writeFile(path.join(root, "showcase-next", "lib", "next-gen-showcase-nav.ts"), buildNavFile(generatedSpecs));
writeFile(path.join(root, "showcase-next", "lib", "next-gen-component-usage-snippets.ts"), buildUsageFile(generatedSpecs));
writeFile(path.join(root, "showcase-next", "components", "next-gen-component-demos.tsx"), buildDemoFile(generatedSpecs));
