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
          <p className="text-lg text-muted-foreground whitespace-pre-wrap">
            Give your AI assistant deep knowledge of EdPear components, patterns, and best practices.
{"\n\n"}
            Skills give AI assistants like Claude Code project-aware context about EdPear. When installed, your AI assistant knows how to find, install, compose, and customize components using the correct APIs and patterns for your educational app.
          </p>
          <p className="text-lg text-muted-foreground">For example, you can ask your AI assistant to:</p>
          <ul className="list-disc pl-6 space-y-1 text-lg text-muted-foreground">
            <li>&quot;Add a course card showing progress and a thumbnail.&quot;</li>
            <li>&quot;Create a quiz view with multiple-choice questions.&quot;</li>
            <li>&quot;Build a learning dashboard with a sidebar and stats.&quot;</li>
          </ul>
          <p className="text-lg text-muted-foreground pt-2">
            The skill reads your project&apos;s components and provides the assistant with your framework, installed components, and base library so it can generate correct code on the first try.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0" id="install">
            Install
          </h2>
          <div className="rounded-lg border bg-muted/40 px-4 py-3 font-mono text-sm shadow-sm relative overflow-x-auto text-foreground">
            npx edpear-sdk add component
          </div>
          <p className="text-base text-muted-foreground">
            This installs the EdPear context into your project. Once configured, your AI assistant automatically loads the rules when working with EdPear components.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight" id="whats-included">
            What&apos;s Included
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            The skill provides your AI assistant with the following knowledge:
          </p>

          <div className="space-y-3">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight" id="project-context">Project Context</h3>
            <p className="text-base text-muted-foreground leading-7">
              On every interaction, the skill gets your project&apos;s configuration: framework, Tailwind version, aliases, installed components, and resolved file paths.
            </p>
            <div className="rounded-lg border bg-muted/40 px-4 py-3 font-mono text-sm shadow-sm relative overflow-x-auto text-foreground">
              edpear-sdk info --json
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight" id="cli-commands">CLI Commands</h3>
            <p className="text-base text-muted-foreground leading-7">
              Full reference for all CLI commands: <code className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-sm">init</code>, <code className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-sm">add</code>, and <code className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-sm">build</code>. Includes flags and presets.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight" id="theming-and-customization">Theming and Customization</h3>
            <p className="text-base text-muted-foreground leading-7">
              How CSS variables, colors, dark mode, custom colors, border radius, and component variants work. Includes guidance for Tailwind CSS.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight" id="registry-authoring">Registry Authoring</h3>
            <p className="text-base text-muted-foreground leading-7">
              How to build and assemble complex EdPear blocks: QuizCards, ScoreDisplays, and LessonProgress bars using the internal registries.
            </p>
            <div className="rounded-lg border bg-muted/40 px-4 py-3 font-mono text-sm shadow-sm relative overflow-x-auto text-foreground">
              registry.json
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight" id="mcp-server">MCP Server</h3>
            <p className="text-base text-muted-foreground leading-7">
              Setup and tools for the EdPear MCP server, which lets AI assistants search, browse, and install components from our educational registry directly into your IDE.
            </p>
          </div>
        </section>

      </div>

      {/* Right Sidebar */}
      <aside className="hidden text-sm xl:block">
        <div className="sticky top-10 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
          <h4 className="mb-4 font-semibold text-foreground tracking-tight text-xs uppercase">On this page</h4>
          <div className="flex flex-col gap-2.5 text-muted-foreground">
            <a href="#install" className="hover:text-foreground transition-colors">Install</a>
            <a href="#whats-included" className="hover:text-foreground transition-colors">What&apos;s Included</a>
            <div className="flex flex-col gap-2 pl-4 border-l ml-[3px] mt-1 space-y-1">
              <a href="#project-context" className="hover:text-foreground transition-colors">Project Context</a>
              <a href="#cli-commands" className="hover:text-foreground transition-colors">CLI Commands</a>
              <a href="#theming-and-customization" className="hover:text-foreground transition-colors">Theming &amp; Customization</a>
              <a href="#registry-authoring" className="hover:text-foreground transition-colors">Registry Authoring</a>
              <a href="#mcp-server" className="hover:text-foreground transition-colors">MCP Server</a>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
