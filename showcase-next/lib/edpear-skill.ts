/** Canonical skill in the monorepo (served at /agent-skills/edpear_skill.md). */
export const EDPEAR_SKILL_REPO_PATH = "skills/edpear/SKILL.md" as const;

export const EDPEAR_SKILL_GITHUB_RAW =
  "https://raw.githubusercontent.com/aarushk09/edpear/main/skills/edpear/SKILL.md" as const;

export type AgentTarget = "cursor-project" | "cursor-global" | "claude-code" | "codex";

export type SkillInstallRecipe = {
  id: AgentTarget;
  label: string;
  description: string;
  commands: string[];
};

export const SKILL_INSTALL_RECIPES: SkillInstallRecipe[] = [
  {
    id: "cursor-project",
    label: "Cursor (project)",
    description: "Loads when working in this repository. Recommended for teams.",
    commands: [
      "mkdir -p .cursor/skills/edpear",
      `curl -fsSL ${EDPEAR_SKILL_GITHUB_RAW} -o .cursor/skills/edpear/SKILL.md`,
    ],
  },
  {
    id: "cursor-global",
    label: "Cursor (global)",
    description: "Available in every workspace on your machine.",
    commands: [
      "mkdir -p ~/.cursor/skills/edpear",
      `curl -fsSL ${EDPEAR_SKILL_GITHUB_RAW} -o ~/.cursor/skills/edpear/SKILL.md`,
    ],
  },
  {
    id: "claude-code",
    label: "Claude Code",
    description: "Project skill directory used by Claude Code and compatible CLIs.",
    commands: [
      "mkdir -p .claude/skills/edpear",
      `curl -fsSL ${EDPEAR_SKILL_GITHUB_RAW} -o .claude/skills/edpear/SKILL.md`,
    ],
  },
  {
    id: "codex",
    label: "Codex / OpenCode",
    description: "Copy into your agent skills folder (see your tool docs for the path).",
    commands: [
      `curl -fsSL ${EDPEAR_SKILL_GITHUB_RAW} -o edpear_skill.md`,
      "# Then move edpear_skill.md into your agent's skills directory as SKILL.md",
    ],
  },
];
