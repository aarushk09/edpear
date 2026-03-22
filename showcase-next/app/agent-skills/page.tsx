import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills · EdPear",
  description: "Give your AI assistant deep knowledge of EdPear components, patterns, and best practices.",
};

export default function AgentSkillsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[1fr_220px] lg:gap-14 text-foreground/90 h-full overflow-y-auto no-scrollbar">
      <div className="space-y-12 pb-16 min-w-0">

        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Skills</h1>
          <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
            Give your AI assistant deep knowledge of EdPear components, patterns, and best practices. Skills let agents like Claude Code understand how to find, install, compose, and customize components using the correct APIs.
          </p>
          <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">For example, you can ask your assistant to:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-[15px] text-muted-foreground leading-7">
            <li>&quot;Add a course card showing progress and a thumbnail.&quot;</li>
            <li>&quot;Create a quiz view with multiple-choice questions.&quot;</li>
            <li>&quot;Build a learning dashboard with a sidebar and stats.&quot;</li>
          </ul>
        </header>

        {/* Installation — stepper style */}
        <section className="space-y-6" id="install">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Install</h2>

          <div className="relative pl-8 space-y-8">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-1 bottom-1 w-px bg-border" aria-hidden />

            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-8 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-border bg-background text-[11px] font-bold text-muted-foreground" aria-hidden>1</div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground leading-snug">Install the CLI</h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed">Add the EdPear SDK to your project.</p>
                <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 font-mono text-sm text-foreground">
                  npx edpear-sdk add component
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-8 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-border bg-background text-[11px] font-bold text-muted-foreground" aria-hidden>2</div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground leading-snug">Restart your editor</h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Your AI assistant automatically loads the skill rules when working with EdPear components. No additional configuration needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="space-y-6" id="whats-included">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">What&apos;s included</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The skill provides your AI assistant with the following knowledge areas.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-2" id="project-context">
              <h3 className="text-sm font-semibold text-foreground">Project Context</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Reads your framework, Tailwind version, aliases, installed components, and resolved file paths on every interaction.
              </p>
              <div className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
                edpear-sdk info --json
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-2" id="cli-commands">
              <h3 className="text-sm font-semibold text-foreground">CLI Commands</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Full reference for <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">init</code>, <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">add</code>, and <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">build</code> commands with all flags and presets.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-2" id="theming-and-customization">
              <h3 className="text-sm font-semibold text-foreground">Theming &amp; Customization</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                CSS variables, colors, dark mode, custom colors, border radius, and component variants with Tailwind CSS guidance.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-2" id="registry-authoring">
              <h3 className="text-sm font-semibold text-foreground">Registry Authoring</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                How to build complex EdPear blocks using the internal registries: QuizCards, ScoreDisplays, LessonProgress, and more.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-2 sm:col-span-2" id="mcp-server-skill">
              <h3 className="text-sm font-semibold text-foreground">MCP Server</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Setup and tools for the EdPear MCP server, which lets AI assistants search, browse, and install components directly.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Right Sidebar */}
      <aside className="hidden text-sm xl:block">
        <div className="sticky top-10 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
          <h4 className="mb-4 font-semibold text-foreground tracking-tight text-xs uppercase">On this page</h4>
          <div className="flex flex-col gap-2.5 text-muted-foreground">
            <a href="#install" className="hover:text-foreground transition-colors">Install</a>
            <a href="#whats-included" className="hover:text-foreground transition-colors">What&apos;s included</a>
            <div className="flex flex-col gap-2 pl-4 border-l ml-[3px] mt-1 space-y-1">
              <a href="#project-context" className="hover:text-foreground transition-colors">Project Context</a>
              <a href="#cli-commands" className="hover:text-foreground transition-colors">CLI Commands</a>
              <a href="#theming-and-customization" className="hover:text-foreground transition-colors">Theming &amp; Customization</a>
              <a href="#registry-authoring" className="hover:text-foreground transition-colors">Registry Authoring</a>
              <a href="#mcp-server-skill" className="hover:text-foreground transition-colors">MCP Server</a>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
