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
        className={`overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-100 p-4 font-mono text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 ${className}`}
      >
        {err}
      </pre>
    );
  }

  if (!html) {
    return (
      <pre
        className={`overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-100 p-4 font-mono text-[13px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 ${className}`}
      >
        <code>Loading…</code>
      </pre>
    );
  }

  return (
    <div
      className={`showcase-code-block shiki-wrap overflow-x-auto rounded-xl border-0 bg-zinc-100 dark:bg-zinc-950 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:!bg-transparent [&_pre]:px-4 [&_pre]:py-3.5 [&_pre]:text-[13px] [&_pre]:leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
