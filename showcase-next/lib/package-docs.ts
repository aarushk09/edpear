import type { ShowcaseSlug } from "./showcase-nav";

/** Published npm name (local dev uses \`edpear\` via \`file:..\`). */
export const EDPEAR_PACKAGE = "edpear-sdk" as const;

export const INSTALL_COMMAND = `npm install ${EDPEAR_PACKAGE}` as const;

export const STYLES_IMPORT_LINE = `import "${EDPEAR_PACKAGE}/styles.css";` as const;

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const PM_ORDER: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

export function cliAddCommands(slug: ShowcaseSlug): Record<PackageManager, string> {
  return {
    pnpm: `pnpm dlx ${EDPEAR_PACKAGE}@latest add ${slug}`,
    npm: `npx ${EDPEAR_PACKAGE}@latest add ${slug}`,
    yarn: `yarn dlx ${EDPEAR_PACKAGE}@latest add ${slug}`,
    bun: `bunx ${EDPEAR_PACKAGE}@latest add ${slug}`,
  };
}

export function getCliAddCommand(pm: PackageManager, slug: ShowcaseSlug): string {
  return cliAddCommands(slug)[pm];
}

export function packageManagers(): PackageManager[] {
  return [...PM_ORDER];
}

/** @deprecated use cliAddCommands(slug).npm */
export function cliAddCommand(slug: ShowcaseSlug) {
  return cliAddCommands(slug).npm;
}

export function manualInstallMarkdown(slug: ShowcaseSlug): string {
  return `1. Install the package

${INSTALL_COMMAND}

2. Import global styles once (e.g. app root layout)

${STYLES_IMPORT_LINE}

3. Add this component’s source into your repo (optional; copies files into your project)

${cliAddCommands(slug).npm}

Components land under \`components/<name>\` by default; see \`edpear add --help\`.`;
}
