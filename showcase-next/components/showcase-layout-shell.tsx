"use client";

import { ShowcaseNav, ThemeToggle } from "./showcase-shell";

const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";

/**
 * EdPear showcase shell: fixed viewport, independent scroll regions, neutral dark palette.
 */
export function ShowcaseLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="showcase-app-shell flex h-dvh flex-col overflow-hidden text-foreground">
      <header className="z-40 shrink-0 bg-transparent">
        <div className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8 lg:px-12 lg:py-8">
          <div className="flex min-w-0 gap-3 sm:gap-4">
            <span
              className="mt-0.5 hidden h-9 shrink-0 select-none items-center justify-center rounded-md border border-foreground/12 bg-muted/30 px-2 font-mono text-[11px] font-medium tracking-tight text-muted-foreground sm:flex"
              aria-hidden
            >
              EP
            </span>
            <div className="min-w-0 space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                EdPear · Next.js
              </p>
              <h1 className="truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Component showcase
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Browse components in the left index; the preview scrolls on the right.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <span className="rounded-lg bg-muted/60 px-2.5 py-1 text-[11px] font-medium tabular-nums text-muted-foreground">
              35 components
            </span>
            <span className="rounded-lg bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              Tailwind v4
            </span>
            <span
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium ${
                apiKey ? "bg-muted text-foreground" : "bg-muted/40 text-muted-foreground"
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
          className="relative flex max-h-[min(42vh,340px)] w-full shrink-0 flex-col bg-transparent md:max-h-none md:h-full md:w-[16.5rem] lg:w-[17.5rem]"
          aria-label="Component navigation"
        >
          {/* Column edge: fixed to the rail, does not move with nav scroll */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-foreground/12 to-transparent md:inset-x-auto md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-px md:bg-gradient-to-b"
            aria-hidden
          />
          <div className="showcase-scroll-hide relative z-0 min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-8 pt-2 [-webkit-overflow-scrolling:touch] md:px-5 md:pt-4">
            <ShowcaseNav />
          </div>
        </aside>

        <main className="showcase-scroll-hide min-h-0 flex-1 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
          <div className="mx-auto w-full px-4 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
