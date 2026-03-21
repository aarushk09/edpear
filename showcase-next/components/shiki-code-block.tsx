"use client";

import { useEffect, useState } from "react";

function useHtmlDarkClass() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return dark;
}

type Lang = "tsx" | "bash" | "plaintext";

export function ShikiCodeBlock({
  code,
  lang,
  className = "",
}: {
  code: string;
  lang: Lang;
  className?: string;
}) {
  const dark = useHtmlDarkClass();
  const [html, setHtml] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setErr(null);
    void (async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const theme = dark ? "github-dark" : "github-light";
        const out = await codeToHtml(code.trimEnd(), {
          lang,
          theme,
        });
        if (!cancelled) setHtml(out);
      } catch (e) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : "Highlight failed");
          setHtml("");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, lang, dark]);

  if (err) {
    return (
      <pre
        className={`overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs text-destructive ${className}`}
      >
        {err}
      </pre>
    );
  }

  if (!html) {
    return (
      <pre
        className={`overflow-x-auto rounded-xl border border-border bg-muted/30 p-4 font-mono text-[13px] text-muted-foreground ${className}`}
      >
        <code>Loading…</code>
      </pre>
    );
  }

  return (
    <div
      className={`shiki-wrap overflow-x-auto rounded-xl border border-border shadow-sm [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:px-4 [&_pre]:py-3.5 [&_pre]:text-[13px] [&_pre]:leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
