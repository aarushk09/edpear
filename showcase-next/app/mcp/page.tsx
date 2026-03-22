import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server · EdPear",
  description: "Connect your AI assistant to the EdPear component registry using the Model Context Protocol.",
};

export default function McpPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[1fr_220px] lg:gap-14 text-foreground/90 h-full overflow-y-auto no-scrollbar">
      <div className="space-y-12 pb-16 min-w-0">

        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">MCP Server</h1>
          <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
            Connect your AI assistant natively to EdPear via the Model Context Protocol (MCP). Compatible agents like Claude Desktop, Cursor, or Windsurf can query the registry, read component docs, and fetch source code directly.
          </p>
        </header>

        {/* Installation — stepper style */}
        <section className="space-y-6" id="installation">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Installation</h2>

          <div className="relative pl-8 space-y-8">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-1 bottom-1 w-px bg-border" aria-hidden />

            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-8 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-border bg-background text-[11px] font-bold text-muted-foreground" aria-hidden>1</div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground leading-snug">Add the server config</h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Add the following to your <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">claude_desktop_config.json</code> file.
                </p>
                <div className="overflow-hidden rounded-lg border border-border bg-muted/20">
                  <div className="border-b border-border px-3 py-1.5">
                    <span className="text-[11px] font-medium text-muted-foreground">json</span>
                  </div>
                  <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed font-mono text-foreground">
{`{
  "mcpServers": {
    "edpear": {
      "command": "node",
      "args": ["/absolute/path/to/edpear/mcp-server/dist/index.js"]
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-8 top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-border bg-background text-[11px] font-bold text-muted-foreground" aria-hidden>2</div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground leading-snug">Restart your app</h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Restart Claude Desktop. A plug icon should appear, indicating the MCP server is connected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Tools */}
        <section className="space-y-6" id="available-tools">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Available Tools</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The MCP server exposes two tools to your AI agent.
          </p>

          <div className="grid gap-4">
            <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-3" id="list_components">
              <h3 className="text-sm font-semibold text-foreground">
                <code className="font-mono">list_components</code>
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Returns the full catalog of available EdPear components with brief descriptions. Agents use this to understand which educational primitives they can build with.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/10 p-5 space-y-3" id="get_component_code">
              <h3 className="text-sm font-semibold text-foreground">
                <code className="font-mono">get_component_code</code>
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Takes a <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">componentName</code> argument and returns the raw React source code. Agents read this to generate accurate prop implementations for your exact version.
              </p>
              <div className="rounded-lg border border-border bg-background px-4 py-3 text-[13px] text-muted-foreground italic">
                Example: &quot;Use get_component_code to read ScoreDisplay, then build a results page.&quot;
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Right Sidebar */}
      <aside className="hidden text-sm xl:block">
        <div className="sticky top-10 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
          <h4 className="mb-4 font-semibold text-foreground tracking-tight text-xs uppercase">On this page</h4>
          <div className="flex flex-col gap-2.5 text-muted-foreground">
            <a href="#installation" className="hover:text-foreground transition-colors">Installation</a>
            <a href="#available-tools" className="hover:text-foreground transition-colors">Available Tools</a>
            <div className="flex flex-col gap-2 pl-4 border-l ml-[3px] mt-1 space-y-1">
              <a href="#list_components" className="hover:text-foreground transition-colors">list_components</a>
              <a href="#get_component_code" className="hover:text-foreground transition-colors">get_component_code</a>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
