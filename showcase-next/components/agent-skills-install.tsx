"use client";

import { useCallback, useState } from "react";
import { Check, Copy, Download } from "lucide-react";

import {
  EDPEAR_SKILL_GITHUB_RAW,
  SKILL_INSTALL_RECIPES,
  type SkillInstallRecipe,
} from "@/lib/edpear-skill";

function CopyIconBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Copy"
    >
      {copied ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function InstallRecipeCard({ recipe }: { recipe: SkillInstallRecipe }) {
  const block = recipe.commands.join("\n");

  return (
    <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-3" id={`install-${recipe.id}`}>
      <h3 className="text-sm font-semibold text-foreground">{recipe.label}</h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed">{recipe.description}</p>
      <div className="relative overflow-hidden rounded-lg border border-border bg-background">
        <div className="absolute right-2 top-2 z-10">
          <CopyIconBtn text={block} />
        </div>
        <pre className="overflow-x-auto px-4 py-3 pr-12 text-[13px] leading-relaxed font-mono text-foreground">
          {recipe.commands.join("\n")}
        </pre>
      </div>
    </div>
  );
}

export function AgentSkillsInstallSection() {
  const [downloading, setDownloading] = useState(false);

  const downloadSkill = useCallback(async () => {
    setDownloading(true);
    try {
      const res = await fetch("/agent-skills/edpear_skill.md");
      const text = await res.text();
      const blob = new Blob([text], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SKILL.md";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }, []);

  return (
    <section className="space-y-6" id="install">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Install the skill</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void downloadSkill()}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Downloading…" : "Download SKILL.md"}
          </button>
          <a
            href={EDPEAR_SKILL_GITHUB_RAW}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Raw on GitHub
          </a>
          <a
            href="/agent-skills/edpear_skill.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            View raw
          </a>
        </div>
      </div>

      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Copy <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">skills/edpear/SKILL.md</code> into your
        agent&apos;s skills directory. After install, restart the agent or start a new session so the skill loads.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        {SKILL_INSTALL_RECIPES.map((recipe) => (
          <InstallRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-2" id="npm-cli">
        <h3 className="text-sm font-semibold text-foreground">Component CLI (separate from the skill)</h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          The skill teaches agents how to use EdPear; the CLI copies component source into your app.
        </p>
        <div className="relative overflow-hidden rounded-lg border border-border bg-background">
          <div className="absolute right-2 top-2 z-10">
            <CopyIconBtn text="npx edpear-sdk@latest list\nnpx edpear-sdk@latest add quiz-card course-card" />
          </div>
          <pre className="overflow-x-auto px-4 py-3 pr-12 text-[13px] font-mono text-foreground">
            {`npx edpear-sdk@latest list
npx edpear-sdk@latest add quiz-card course-card`}
          </pre>
        </div>
      </div>
    </section>
  );
}
