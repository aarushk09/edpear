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
          className="flex max-h-[min(42vh,340px)] w-full shrink-0 flex-col border-b border-showcase-sidebar-border bg-showcase-sidebar bg-[radial-gradient(120%_80%_at_0%_0%,hsl(var(--primary)/0.06),transparent_55%)] shadow-[inset_-1px_0_0_0_hsl(var(--showcase-sidebar-border))] dark:bg-[radial-gradient(120%_80%_at_0%_0%,hsl(var(--primary)/0.12),transparent_50%)] md:max-h-none md:h-full md:w-[17rem] md:border-b-0 md:border-r md:border-showcase-sidebar-border lg:w-[18rem]"
          aria-label="Component navigation"
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 pb-6 pt-4 [-webkit-overflow-scrolling:touch] showcase-sidebar-scroll md:px-3.5">
            <ShowcaseNav />
          </div>
          <div
            className="pointer-events-none hidden shrink-0 md:block h-6 bg-gradient-to-t from-showcase-sidebar to-transparent"
            aria-hidden
          />
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
