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
          <p className="text-lg text-muted-foreground whitespace-pre-wrap">
            Connect your AI assistant natively to EdPear via the Model Context Protocol (MCP).
{"\n\n"}
            The EdPear MCP server allows compatible agents (like Claude Desktop, Cursor, or Windsurf) to directly query the EdPear registry, read component documentation, and fetch raw React source code right into your IDE.
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0" id="installation">
            Installation
          </h2>
          <p className="text-base text-muted-foreground">
            To use the EdPear MCP Server with Claude Desktop, add the following configuration to your <code className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-sm">claude_desktop_config.json</code> file:
          </p>
          <div className="rounded-lg border bg-muted/40 px-4 py-3 font-mono text-sm shadow-sm relative overflow-x-auto text-foreground">
            <pre className="text-[13px] leading-relaxed font-mono text-[#c9d1d9] whitespace-pre">
{"{\n"}
{"  "}<span className="text-[#79c0ff]">"mcpServers"</span>: {"{\n"}
{"    "}<span className="text-[#a5d6ff]">"edpear"</span>: {"{\n"}
{"      "}<span className="text-[#79c0ff]">"command"</span>: <span className="text-[#a5d6ff]">"node"</span>,{"\n"}
{"      "}<span className="text-[#79c0ff]">"args"</span>: [<span className="text-[#a5d6ff]">"/absolute/path/to/edpear/mcp-server/dist/index.js"</span>]{"\n"}
{"    "}{"}\n"}
{"  "}{"}\n"}
{"}"}
            </pre>
          </div>
          <p className="text-base text-muted-foreground">
            Once configured, restart your Claude Desktop application. You should see a new "plug" icon indicating the MCP server is connected.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight" id="available-tools">
            Available Tools
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            The MCP server exposes two primary tools to your AI agent:
          </p>

          <div className="space-y-3">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight" id="list_components">
              <code className="text-foreground font-mono text-lg">list_components</code>
            </h3>
            <p className="text-base text-muted-foreground leading-7">
              Returns the entire catalog of available EdPear components alongside brief descriptions of their capabilities (e.g. <code className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-[13px]">QuizCard</code>, <code className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-[13px]">LessonProgress</code>). Agents use this tool initially to understand what educational primitives they can build with.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight" id="get_component_code">
              <code className="text-foreground font-mono text-lg">get_component_code</code>
            </h3>
            <p className="text-base text-muted-foreground leading-7">
              Takes a <code className="bg-muted px-[0.3rem] py-[0.2rem] rounded font-mono text-[13px]">componentName</code> argument and returns the full, raw React source code. Since EdPear prioritizes local code ownership, agents must read the source code to reliably generate accurate prop implementations tailored to your exact version of the component.
            </p>
            <div className="rounded-lg border bg-muted/40 px-4 py-3 font-mono text-sm shadow-sm relative overflow-x-auto text-muted-foreground italic">
              Example Prompt: &quot;Please use the get_component_code tool to read the ScoreDisplay component, then build a results page.&quot;
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
