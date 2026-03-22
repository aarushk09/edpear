import type { ShowcaseSlug } from "./showcase-nav";

/** Published npm name (local dev uses `edpear` via `file:..`). */
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

export type ManualStep = {
  title: string;
  description: string;
  code: string;
  lang: string;
};

export function manualInstallSteps(slug: ShowcaseSlug): ManualStep[] {
  return [
    {
      title: "Install the package",
      description: "Add the EdPear SDK to your project dependencies.",
      code: INSTALL_COMMAND,
      lang: "bash",
    },
    {
      title: "Import global styles",
      description: "Add the CSS import once in your app root layout or entry file.",
      code: STYLES_IMPORT_LINE,
      lang: "tsx",
    },
    {
      title: "Add the component",
      description: "Copy component source files into your project (optional).",
      code: cliAddCommands(slug).npm,
      lang: "bash",
    },
  ];
}

export function manualInstallMarkdown(slug: ShowcaseSlug): string {
  return manualInstallSteps(slug)
    .map((s, i) => `${i + 1}. ${s.title}\n\n${s.code}`)
    .join("\n\n");
}
