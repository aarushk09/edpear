"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { HOME_CATALOG_GROUPS } from "../lib/showcase-collections";

const FALLBACK_DESCRIPTION = "View documentation and live examples.";

function ComponentCatalogCard({
  slug,
  label,
  description,
}: {
  slug: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={`/${slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-4 transition hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
        {description}
      </span>
    </Link>
  );
}

function CatalogGroupSection({
  group,
  descriptions,
}: {
  group: (typeof HOME_CATALOG_GROUPS)[number];
  descriptions: Record<string, string>;
}) {
  return (
    <section>
      <p className="mb-3 flex items-center gap-2 px-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        <span className="h-px w-4 shrink-0 bg-foreground/15" aria-hidden />
        {group.title}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => (
          <li key={item.id}>
            <ComponentCatalogCard
              slug={item.id}
              label={item.label}
              description={descriptions[item.id] ?? FALLBACK_DESCRIPTION}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ShowcaseHomeCatalog({
  descriptions,
}: {
  descriptions: Record<string, string>;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HOME_CATALOG_GROUPS;
    return HOME_CATALOG_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const description = descriptions[item.id]?.toLowerCase() ?? "";
        return (
          item.label.toLowerCase().includes(q) ||
          item.id.replace(/-/g, " ").includes(q) ||
          description.includes(q)
        );
      }),
    })).filter((g) => g.items.length > 0);
  }, [query, descriptions]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="space-y-6" aria-labelledby="catalog-heading">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="catalog-heading"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            Component catalog
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            Browse by category. Each entry links to live demos, props, and install steps.
          </p>
        </div>
        <label className="relative block w-full max-w-md">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            className="h-9 w-full rounded-lg border border-border bg-background pl-8 pr-3 text-[13px] text-foreground outline-none ring-0 transition placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/15"
            spellCheck={false}
            autoComplete="off"
            aria-label="Filter component catalog"
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
            /
          </span>
        </label>
      </header>

      {filteredGroups.length === 0 ? (
        <p className="px-1 text-sm text-muted-foreground">
          No components match &quot;{query.trim()}&quot;.
        </p>
      ) : (
        <div className="space-y-10">
          {filteredGroups.map((group) => (
            <CatalogGroupSection key={group.title} group={group} descriptions={descriptions} />
          ))}
        </div>
      )}
    </section>
  );
}
