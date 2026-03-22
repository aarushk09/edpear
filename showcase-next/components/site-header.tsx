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
        className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors md:inline-flex ${
          apiKey 
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
          
          <ApiKeyInput />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
