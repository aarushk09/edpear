"use client";

import { Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { NAV_GROUPS } from "../lib/showcase-nav";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted/70 text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          className="h-9 w-full rounded-lg bg-muted/50 pl-8 pr-3 text-[13px] text-showcase-sidebar-fg outline-none ring-0 transition placeholder:text-showcase-sidebar-muted focus:bg-muted/70 focus:ring-2 focus:ring-foreground/15"
          spellCheck={false}
          autoComplete="off"
          aria-label="Filter components"
        />
      </div>

      <nav className="space-y-8 pb-2" aria-label="Component index">
        {filteredGroups.length === 0 ? (
          <p className="px-1 text-xs text-showcase-sidebar-muted">No matches.</p>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 flex items-center gap-2 px-1 text-[11px] font-medium uppercase tracking-[0.12em] text-showcase-sidebar-muted">
                <span className="h-px w-4 shrink-0 bg-foreground/15" aria-hidden />
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={`/${item.id}`}
                        className={`group relative flex items-center rounded-lg py-2 pl-3 pr-2 text-[13px] leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 ${
                          isActive
                            ? "bg-showcase-sidebar-accent font-medium text-showcase-sidebar-accent-fg"
                            : "text-showcase-sidebar-muted hover:bg-showcase-sidebar-accent/50 hover:text-showcase-sidebar-fg"
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full transition-colors ${
                            isActive ? "bg-foreground/55" : "bg-transparent group-hover:bg-foreground/20"
                          }`}
                          aria-hidden
                        />
                        <span className="min-w-0 truncate pl-1.5">{item.label}</span>
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

