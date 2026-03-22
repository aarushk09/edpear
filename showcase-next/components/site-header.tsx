"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "./showcase-shell";
import { useApiKey, setLocalApiKey } from "../lib/use-api-key";

function ApiKeyInput() {
  const apiKey = useApiKey();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(apiKey);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal input when API key changes externally
  useEffect(() => {
    setInputValue(apiKey);
  }, [apiKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors md:inline-flex ${apiKey
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "bg-muted/40 text-muted-foreground hover:bg-muted"
          }`}
      >
        {apiKey ? "OpenRouter key set" : "No OpenRouter key"}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95">
          <div className="space-y-3">
            <h4 className="font-semibold leading-none text-sm">OpenRouter API Key</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enter your key to test the AI-powered components in the showcase. It is stored securely in your browser's local storage.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="sk-or-v1-..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setLocalApiKey(inputValue);
                    setIsOpen(false);
                  }
                }}
              />
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onClick={() => {
                  setLocalApiKey(inputValue);
                  setIsOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isComponents = pathname === "/" || pathname?.startsWith("/docs");
  const isAgentSkills = pathname === "/agent-skills";
  const isMcp = pathname === "/mcp";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="flex h-14 items-center">

        {/* Left section: Logo matching sidebar width */}
        <div className="flex h-full items-center px-4 md:px-5 w-full md:w-[16.5rem] lg:w-[17.5rem] shrink-0 border-r border-border/40">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-foreground transition-colors hover:text-foreground/80">
            {/* EdPear pear logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 32"
              className="h-6 w-auto"
              fill="currentColor"
              aria-label="EdPear logo"
            >
              {/* Pear body — two-circle geometric construction */}
              <path d="M12 6A6 6 0 0 1 17.66 14A9 9 0 1 1 6.34 14A6 6 0 0 1 12 6Z" />
              {/* Stem */}
              <path
                d="M12 6C12 4.5 13.2 3.2 14 2.8"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
              {/* Leaf */}
              <path d="M13 3.5C14.2 2 16.5 2.4 15.8 3.8C15.2 5 13.2 4.6 13 3.5Z" />
            </svg>
            EdPear
          </Link>
        </div>

        {/* Right Section: Main Nav & Utilities */}
        <div className="flex flex-1 items-center justify-between px-4 md:px-6">
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground ${isComponents ? "text-foreground" : "text-foreground/60"
                }`}
            >
              Components
            </Link>
            <Link
              href="/agent-skills"
              className={`flex items-center gap-1.5 transition-colors hover:text-foreground ${isAgentSkills ? "text-foreground" : "text-foreground/60"
                }`}
            >
              Agent Skills
              <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary font-bold leading-none">
                Beta
              </span>
            </Link>
            <Link
              href="/mcp"
              className={`flex items-center gap-1.5 transition-colors hover:text-foreground ${isMcp ? "text-foreground" : "text-foreground/60"
                }`}
            >
              MCP Server
              <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-primary font-bold leading-none">
                Beta
              </span>
            </Link>
          </nav>

          {/* Utilities */}
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            <nav className="flex items-center gap-1 sm:hidden w-full">
              <Link
                href="/"
                className={`text-xs font-medium transition-colors ${isComponents ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                Components
              </Link>
            </nav>
            <ApiKeyInput />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
