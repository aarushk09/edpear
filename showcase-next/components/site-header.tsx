"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./showcase-shell";

const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? "";

export function SiteHeader() {
  const pathname = usePathname();
  const isComponents = pathname === "/" || pathname?.startsWith("/docs");
  const isAgentSkills = pathname === "/agent-skills";
  const isMcp = pathname === "/mcp";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-14 max-w-7xl items-center justify-between">
        
        {/* Left section: Logo and Main Nav */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-gradient-to-br from-background to-muted/50 text-[10px] font-medium tracking-wider text-muted-foreground shadow-sm transition-all group-hover:bg-muted group-hover:text-foreground">
              EP
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground/80 uppercase leading-none mb-1">
                EdPear
              </span>
              <span className="font-semibold leading-none tracking-tight">Component showcase</span>
            </div>
            {/* Minimal separator before tabs */}
            <div className="hidden sm:block h-6 w-[1px] bg-border ml-6"></div>
          </Link>

          {/* Desktop Nav Tabs */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                isComponents 
                  ? "bg-foreground/10 text-foreground" 
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              Components
            </Link>
            <Link
              href="/agent-skills"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                isAgentSkills 
                  ? "bg-foreground/10 text-foreground" 
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              Agent Skills
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary font-bold">
                Beta
              </span>
            </Link>
            <Link
              href="/mcp"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                isMcp 
                  ? "bg-foreground/10 text-foreground" 
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              MCP Server
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary font-bold">
                Beta
              </span>
            </Link>
          </nav>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between sm:justify-end gap-2">
          {/* Mobile nav duplicate */}
          <nav className="flex sm:hidden items-center gap-1 w-full mb-2">
            <Link
              href="/"
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                isComponents 
                  ? "bg-foreground/10 text-foreground" 
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              Components
            </Link>
            <Link
              href="/agent-skills"
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                isAgentSkills 
                  ? "bg-foreground/10 text-foreground" 
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
             >
              Agent Skills
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary font-bold">
                Beta
              </span>
            </Link>
            <Link
              href="/mcp"
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                isMcp 
                  ? "bg-foreground/10 text-foreground" 
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              MCP Server
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary font-bold">
                Beta
              </span>
            </Link>
          </nav>
          
          <span className="rounded-lg bg-muted/60 px-2.5 py-1 text-[11px] font-medium tabular-nums text-muted-foreground hidden lg:inline-flex">
            35 components
          </span>
          <span className="rounded-lg bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hidden lg:inline-flex">
            Tailwind v4
          </span>
          <span
            className={`rounded-lg px-2.5 py-1 text-[11px] font-medium hidden md:inline-flex ${
              apiKey ? "bg-muted text-foreground" : "bg-muted/40 text-muted-foreground"
            }`}
          >
            {apiKey ? "OpenRouter key set" : "No OpenRouter key"}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
