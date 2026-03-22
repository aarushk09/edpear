"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { ShowcaseNav } from "./showcase-shell";

/**
 * EdPear showcase sidebar shell: independent scroll regions.
 */
export function ShowcaseSidebarShell({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Reset scroll position when navigating between components
  // to prevent the "bottom spacing bug" (stale scroll from a longer page).
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
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

      <main ref={mainRef} className="showcase-scroll-hide min-h-0 flex-1 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
        <div className="mx-auto w-full px-4 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12">
          {children}
        </div>
      </main>
    </div>
  );
}
