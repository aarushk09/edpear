/**
 * Splits a usage snippet into multiple examples when authors use line headers like:
 *   // 1) Title here
 * Otherwise returns a single "Example" block (full snippet).
 */
const NUMBERED_HEADER = /(?=^\/\/ \d+[a-z]?\) )/m;

export type ParsedUsageExample = {
  id: string;
  title: string;
  /** Prose under the title (shadcn-style “Basic” + paragraph). */
  description?: string;
  code: string;
};

export function parseUsageExamples(full: string): ParsedUsageExample[] {
  const trimmed = full.trim();
  const parts = trimmed.split(NUMBERED_HEADER);
  const preamble = (parts[0] ?? "").trim();
  const rest = parts.slice(1).map((p) => p.trim()).filter(Boolean);

  if (rest.length === 0) {
    return [{ id: "usage-example-1", title: "Example", description: undefined, code: trimmed }];
  }

  return rest.map((chunk, i) => {
    const lines = chunk.split("\n");
    const first = lines[0] ?? "";
    const m = first.match(/^\/\/ \d+[a-z]?\)\s*(.*)$/);
    const title = m?.[1]?.trim() || `Example ${i + 1}`;
    const body = lines.slice(1).join("\n").trim();
    const code = preamble ? `${preamble}\n\n${body}`.trim() : chunk.trim();
    return {
      id: `usage-example-${i + 1}`,
      title,
      description: undefined,
      code,
    };
  });
}
