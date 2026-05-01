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

const highlightedHtmlCache = new Map<string, string>();
const highlightPromiseCache = new Map<string, Promise<string>>();
let shikiModulePromise: Promise<typeof import("shiki")> | null = null;

async function getHighlightedHtml(code: string, lang: Lang, dark: boolean) {
  const theme = dark ? "github-dark" : "github-light";
  const cacheKey = `${theme}::${lang}::${code}`;
  const cached = highlightedHtmlCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  let inFlight = highlightPromiseCache.get(cacheKey);
  if (!inFlight) {
    if (!shikiModulePromise) {
      shikiModulePromise = import("shiki");
    }

    inFlight = shikiModulePromise.then(async ({ codeToHtml }) => {
      const html = await codeToHtml(code.trimEnd(), { lang, theme });
      highlightedHtmlCache.set(cacheKey, html);
      highlightPromiseCache.delete(cacheKey);
      return html;
    });

    highlightPromiseCache.set(cacheKey, inFlight);
  }

  return inFlight;
}

function PlainCodeBlock({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <pre
      className={`overflow-x-auto rounded-xl border border-border bg-muted/30 p-4 font-mono text-[13px] leading-relaxed text-foreground ${className ?? ""}`}
    >
      <code>{code.trimEnd()}</code>
    </pre>
  );
}

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
    const theme = dark ? "github-dark" : "github-light";
    const cacheKey = `${theme}::${lang}::${code}`;
    const cached = highlightedHtmlCache.get(cacheKey);
    if (cached) {
      setHtml(cached);
      setErr(null);
      return;
    }

    let cancelled = false;
    setErr(null);

    void getHighlightedHtml(code, lang, dark)
      .then((out) => {
        if (!cancelled) {
          setHtml(out);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setErr(error instanceof Error ? error.message : "Highlight failed");
          setHtml("");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [code, lang, dark]);

  if (err) {
    return (
      <pre
        className={`overflow-x-auto rounded-xl bg-muted/50 p-4 font-mono text-xs text-destructive ${className}`}
      >
        {err}
      </pre>
    );
  }

  if (!html) {
    return <PlainCodeBlock code={code} className={className} />;
  }

  return (
    <div
      className={`shiki-wrap overflow-x-auto rounded-xl bg-muted/30 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:!bg-transparent [&_pre]:px-4 [&_pre]:py-3.5 [&_pre]:text-[13px] [&_pre]:leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
