"use client";

import { ShowcaseNav, ThemeToggle } from "./showcase-shell";

const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";

/**
 * shadcn-style shell: fixed viewport height, left sidebar + right preview each scroll independently.
 */
export function ShowcaseLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <header className="z-40 shrink-0 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              EdPear · Next.js
            </p>
            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
              Component showcase
            </h1>
            <p className="mt-0.5 max-w-2xl text-xs text-muted-foreground sm:text-sm">
              Browse components in the left index; the preview scrolls on the right.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              35 components
            </span>
            <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              Tailwind v4
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                apiKey
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-destructive/30 bg-destructive/10 text-destructive"
              }`}
            >
              {apiKey ? "OpenRouter key set" : "No OpenRouter key"}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* min-h-0 is required so nested overflow-y-auto regions actually scroll (flexbox quirk). */}
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside
          className="flex max-h-[min(42vh,320px)] w-full shrink-0 flex-col border-b border-border/70 bg-muted/20 md:max-h-none md:h-full md:w-56 md:border-b-0 md:border-r lg:w-64"
          aria-label="Component navigation"
        >
          <div className="shrink-0 border-b border-border/60 px-4 py-2.5 md:py-3">
            <p className="text-xs font-medium text-muted-foreground">Components</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 pb-5 pt-2 [-webkit-overflow-scrolling:touch]">
            <ShowcaseNav />
          </div>
        </aside>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
