import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

async function loadSkillMarkdown(): Promise<string> {
  const repoRoot = path.resolve(process.cwd(), "..");
  const skillPath = path.join(repoRoot, "skills", "edpear", "SKILL.md");
  return readFile(skillPath, "utf8");
}

export async function GET() {
  try {
    const body = await loadSkillMarkdown();
    return new Response(body, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch {
    return new Response("EdPear skill file not found.", { status: 404 });
  }
}
