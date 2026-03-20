"use client";

import katex from "katex";
import "katex/dist/katex.min.css";
import { useId, useMemo, useState, type ReactNode } from "react";

import { cn } from "../../lib/cn.js";
import type { MathRendererProps } from "./math-renderer.types.js";

function renderKatex(tex: string, displayMode: boolean): { html: string; error?: string } {
  try {
    return {
      html: katex.renderToString(tex, {
        displayMode,
        throwOnError: false,
        strict: "ignore",
      }),
    };
  } catch (e) {
    return { html: "", error: e instanceof Error ? e.message : "Invalid expression" };
  }
}

/** Split on $$...$$ blocks; leaves inline $...$ to inner pass */
function parseContent(src: string): { kind: "text" | "block-math"; value: string }[] {
  const out: { kind: "text" | "block-math"; value: string }[] = [];
  let i = 0;
  while (i < src.length) {
    const start = src.indexOf("$$", i);
    if (start < 0) {
      out.push({ kind: "text", value: src.slice(i) });
      break;
    }
    if (start > i) out.push({ kind: "text", value: src.slice(i, start) });
    const end = src.indexOf("$$", start + 2);
    if (end < 0) {
      out.push({ kind: "text", value: src.slice(start) });
      break;
    }
    out.push({ kind: "block-math", value: src.slice(start + 2, end).trim() });
    i = end + 2;
  }
  return out;
}

function renderInlineSegment(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    const open = text.indexOf("$", i);
    if (open < 0) {
      nodes.push(renderBold(text.slice(i), key++));
      break;
    }
    if (open > i) nodes.push(renderBold(text.slice(i, open), key++));
    const close = text.indexOf("$", open + 1);
    if (close < 0) {
      nodes.push(renderBold(text.slice(open), key++));
      break;
    }
    const tex = text.slice(open + 1, close).trim();
    const { html, error } = renderKatex(tex, false);
    if (error) {
      nodes.push(
        <span key={key++} className="rounded bg-destructive/15 px-1 text-xs text-destructive" title={error}>
          {tex}
        </span>,
      );
    } else {
      nodes.push(<span key={key++} dangerouslySetInnerHTML={{ __html: html }} />);
    }
    i = close + 1;
  }
  return nodes;
}

function renderBold(chunk: string, key: number): ReactNode {
  const parts = chunk.split(/\*\*([^*]+)\*\*/g);
  if (parts.length === 1) return <span key={key}>{chunk}</span>;
  const out: ReactNode[] = [];
  for (let p = 0; p < parts.length; p++) {
    if (p % 2 === 1) {
      out.push(
        <strong key={`${key}-b-${p}`} className="font-semibold">
          {parts[p]}
        </strong>,
      );
    } else if (parts[p]) {
      out.push(<span key={`${key}-t-${p}`}>{parts[p]}</span>);
    }
  }
  return <span key={key}>{out}</span>;
}

export function MathRenderer({ content, displayMode = "auto", className }: MathRendererProps) {
  const id = useId();
  const [copied, setCopied] = useState(false);
  const segments = useMemo(() => parseContent(content), [content]);

  const rawExprs = useMemo(() => {
    const m: string[] = [];
    for (const s of segments) {
      if (s.kind === "block-math") m.push(s.value);
    }
    for (const s of segments) {
      if (s.kind !== "text") continue;
      let t = s.value;
      let i = 0;
      while (i < t.length) {
        const o = t.indexOf("$", i);
        if (o < 0) break;
        const c = t.indexOf("$", o + 1);
        if (c < 0) break;
        m.push(t.slice(o + 1, c).trim());
        i = c + 1;
      }
    }
    return m;
  }, [segments]);

  const copyRaw = () => {
    if (rawExprs.length === 0) return;
    void navigator.clipboard.writeText(rawExprs.join("\n\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-xl border bg-card p-4 text-card-foreground shadow-sm", className)} data-slot="math-renderer">
      <div className="mb-2 flex justify-end">
        <button
          type="button"
          onClick={copyRaw}
          disabled={rawExprs.length === 0}
          className="text-xs font-medium text-primary underline disabled:opacity-40"
        >
          {copied ? "Copied" : "Copy LaTeX"}
        </button>
      </div>
      <div id={id} className="max-w-none text-sm leading-relaxed">
        {segments.map((seg, idx) => {
          if (seg.kind === "block-math") {
            const forceBlock = displayMode === "block" || displayMode === "auto";
            const { html, error } = renderKatex(seg.value, forceBlock);
            if (error) {
              return (
                <pre
                  key={idx}
                  className="my-2 overflow-x-auto rounded-md bg-destructive/10 p-3 text-sm text-destructive"
                >
                  {seg.value}
                </pre>
              );
            }
            return (
              <div
                key={idx}
                className="my-3 overflow-x-auto text-center"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }
          return (
            <p key={idx} className="whitespace-pre-wrap leading-relaxed">
              {renderInlineSegment(seg.value)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
