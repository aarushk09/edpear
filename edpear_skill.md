# EdPear agent skill

The canonical agent skill file lives at **[skills/edpear/SKILL.md](./skills/edpear/SKILL.md)**.

Install it into your agent (Cursor, Claude Code, Codex, etc.) using the instructions on the [Skills](https://edpear.dev/agent-skills) page, or copy the file directly:

```bash
# Project-local (Cursor)
mkdir -p .cursor/skills/edpear
curl -fsSL https://raw.githubusercontent.com/aarushk09/edpear/main/skills/edpear/SKILL.md \
  -o .cursor/skills/edpear/SKILL.md

# Project-local (Claude Code)
mkdir -p .claude/skills/edpear
curl -fsSL https://raw.githubusercontent.com/aarushk09/edpear/main/skills/edpear/SKILL.md \
  -o .claude/skills/edpear/SKILL.md
```

Some tools expect a flat filename—symlink or copy:

```bash
cp skills/edpear/SKILL.md edpear_skill.md
```
