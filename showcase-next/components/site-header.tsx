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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="flex h-14 items-center">
        
        {/* Left section: Logo matching sidebar width */}
        <div className="flex h-full items-center px-4 md:px-5 w-full md:w-[16.5rem] lg:w-[17.5rem] shrink-0 border-r border-border/40">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-foreground transition-colors hover:text-foreground/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-5 w-5"
            >
              <rect width="256" height="256" fill="none" />
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            EdPear
          </Link>
        </div>

        {/* Right Section: Main Nav & Utilities */}
        <div className="flex flex-1 items-center justify-between px-4 md:px-6">
          <nav className="hidden sm:flex items-center gap-5 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground ${
                isComponents ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Components
            </Link>
            <Link
              href="/agent-skills"
              className={`transition-colors hover:text-foreground ${
                isAgentSkills ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Agent Skills
            </Link>
            <Link
              href="/mcp"
              className={`transition-colors hover:text-foreground ${
                isMcp ? "text-foreground" : "text-foreground/60"
              }`}
            >
              MCP Server
            </Link>
          </nav>

          {/* Utilities */}
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            <nav className="flex items-center gap-1 sm:hidden w-full">
              <Link
                href="/"
                className={`text-xs font-medium transition-colors ${
                  isComponents ? "text-foreground" : "text-muted-foreground"
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
