"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  return (
    <nav className="space-y-5" aria-label="Component index">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/90">
            {group.title}
          </p>
          <ul className="space-y-px">
            {group.items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/${item.id}`}
                    className={`block rounded-md px-2 py-1.5 text-[13px] leading-none transition-colors ${
                      isActive
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DemoFrame({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24" aria-labelledby={`${id}-heading`}>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-foreground/5 dark:ring-white/10">
        <header className="flex flex-col gap-1 border-b border-border bg-muted/40 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h2
            id={`${id}-heading`}
            className="font-mono text-sm font-semibold tracking-tight text-foreground"
          >
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>
        <div className="bg-gradient-to-b from-muted/15 to-transparent p-5 md:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}
