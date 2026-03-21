"use client";

import { Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { NAV_GROUPS } from "../lib/showcase-nav";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function ShowcaseNav() {
  const pathname = usePathname();
  const active = pathname?.replace(/^\//, "") ?? "";
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_GROUPS;
    return NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) || item.id.replace(/-/g, " ").includes(q),
      ),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-showcase-sidebar-muted"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components…"
          className="h-9 w-full rounded-lg border border-showcase-sidebar-border bg-background/70 pl-8 pr-3 text-[13px] text-showcase-sidebar-fg shadow-sm outline-none ring-primary/0 transition placeholder:text-showcase-sidebar-muted focus:border-primary/40 focus:ring-2 focus:ring-primary/20 dark:bg-background/40"
          spellCheck={false}
          autoComplete="off"
          aria-label="Filter components"
        />
      </div>

      <nav className="space-y-6 pb-2" aria-label="Component index">
        {filteredGroups.length === 0 ? (
          <p className="px-1 text-xs text-showcase-sidebar-muted">No matches.</p>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-2 flex items-center gap-2 px-1">
                <span
                  className="h-px flex-1 bg-gradient-to-r from-transparent via-showcase-sidebar-border to-showcase-sidebar-border"
                  aria-hidden
                />
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-showcase-sidebar-muted">
                  {group.title}
                </span>
                <span
                  className="h-px flex-1 bg-gradient-to-l from-transparent via-showcase-sidebar-border to-showcase-sidebar-border"
                  aria-hidden
                />
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={`/${item.id}`}
                        className={`group relative flex items-center gap-2 rounded-md py-1.5 pl-3 pr-2 text-[13px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                          isActive
                            ? "bg-showcase-sidebar-accent font-medium text-showcase-sidebar-accent-fg shadow-sm ring-1 ring-showcase-sidebar-border/80"
                            : "text-showcase-sidebar-muted hover:bg-showcase-sidebar-accent/60 hover:text-showcase-sidebar-fg"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full transition-opacity ${
                            isActive
                              ? "bg-primary opacity-100 shadow-[0_0_12px_hsl(var(--primary)/0.45)]"
                              : "bg-primary/0 opacity-0 group-hover:bg-primary/35 group-hover:opacity-100"
                          }`}
                          aria-hidden
                        />
                        <span className="min-w-0 truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </nav>
    </div>
  );
}

