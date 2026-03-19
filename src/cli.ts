#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";
import path from "node:path";
import ora from "ora";

import { getRegistryComponent, registryComponents } from "./lib/registry.js";

const program = new Command();
const packageRoot = path.resolve(import.meta.dirname, "..");

function sourcePath(...segments: string[]): string {
  return path.join(packageRoot, ...segments);
}

async function copyIfMissing(source: string, target: string, overwrite: boolean): Promise<boolean> {
  const exists = await fs.pathExists(target);
  if (exists && !overwrite) {
    return false;
  }

  await fs.ensureDir(path.dirname(target));
  await fs.copy(source, target, { overwrite });
  return true;
}

program.name("edpear").description("EdPear component registry CLI").version("2.0.0");

program
  .command("list")
  .description("List available EdPear components")
  .action(() => {
    console.log(chalk.bold("\nAvailable components:\n"));
    for (const component of registryComponents) {
      console.log(
        `${chalk.cyan(component.name)}${component.ai ? chalk.magenta(" [ai]") : ""} - ${component.description}`,
      );
    }
    console.log("");
  });

program
  .command("add")
  .description("Copy EdPear component source into your project")
  .argument("<components...>", "Component names to install")
  .option("--cwd <path>", "Target project root", process.cwd())
  .option("--out-dir <path>", "Component output directory", "components")
  .option("--overwrite", "Overwrite existing files", false)
  .action(async (components: string[], options: { cwd: string; outDir: string; overwrite: boolean }) => {
    const spinner = ora("Adding components...").start();
    try {
      const cwd = path.resolve(options.cwd);
      const componentOutputDir = path.join(cwd, options.outDir);
      const sharedLibDir = path.join(cwd, "lib");
      const stylesTarget = path.join(cwd, "styles", "edpear.css");

      const requested = components.map((componentName) => {
        const entry = getRegistryComponent(componentName);
        if (!entry) {
          throw new Error(
            `Unknown component "${componentName}". Run "edpear list" to see supported components.`,
          );
        }
        return entry;
      });

      const copiedComponents: string[] = [];
      for (const component of requested) {
        const didCopy = await copyIfMissing(
          sourcePath("src", "components", component.name),
          path.join(componentOutputDir, component.name),
          options.overwrite,
        );

        if (didCopy) {
          copiedComponents.push(component.name);
        }
      }

      await copyIfMissing(sourcePath("src", "lib", "cn.ts"), path.join(sharedLibDir, "cn.ts"), options.overwrite);

      if (requested.some((component) => component.ai)) {
        await copyIfMissing(
          sourcePath("src", "lib", "openrouter.ts"),
          path.join(sharedLibDir, "openrouter.ts"),
          options.overwrite,
        );
      }

      await copyIfMissing(sourcePath("styles", "edpear.css"), stylesTarget, options.overwrite);

      spinner.succeed(
        copiedComponents.length
          ? `Installed: ${copiedComponents.join(", ")}`
          : "Nothing changed. Use --overwrite to replace existing files."
      );

      console.log(chalk.gray("\nNext steps:"));
      console.log(chalk.gray(`1. Import "styles/edpear.css" once in your app shell.`));
      console.log(chalk.gray(`2. Import components from "${options.outDir}/<component>" or the npm package.`));
      if (requested.some((component) => component.ai)) {
        console.log(chalk.gray("3. Pass an OpenRouter API key to any AI component you install."));
      }
      console.log("");
    } catch (error) {
      spinner.fail(error instanceof Error ? error.message : "Failed to add components.");
      process.exitCode = 1;
    }
  });

program.parse();
