import "server-only";

import fs from "node:fs";
import path from "node:path";

import { cache } from "react";
import ts from "typescript";

import type { ShowcaseSlug } from "./showcase-nav";

export type ComponentPropDoc = {
  name: string;
  type: string;
  description: string;
  required: boolean;
  defaultValue?: string;
};

export type ComponentUsageNote = {
  title: string;
  bullets: string[];
};

export type ComponentDocsData = {
  label: string;
  overview?: string;
  registryDescription?: string;
  props: ComponentPropDoc[];
  accessibility: string[];
  usageNotes: ComponentUsageNote[];
  forwardedProps: string[];
  coverage: {
    hasReadme: boolean;
    hasApiReference: boolean;
    hasAccessibility: boolean;
    hasUsageNotes: boolean;
  };
  sourceFiles: {
    readme?: string;
    types?: string;
    component?: string;
  };
};

type ReadmePropRow = {
  type?: string;
  defaultValue?: string;
  description?: string;
};

const COMPONENTS_ROOT = path.join(/*turbopackIgnore: true*/ process.cwd(), "..", "src", "components");
const REGISTRY_FILE = path.join(/*turbopackIgnore: true*/ process.cwd(), "..", "src", "lib", "registry.ts");
const DOC_SECTION_TITLES = ["advanced usage", "interactions", "usage patterns", "notes"];

function toAbsolutePath(...parts: string[]) {
  return path.join(...parts);
}

function normalizeNewlines(value: string) {
  return value.replace(/\r\n/g, "\n");
}

function parseReadme(readmePath?: string) {
  if (!readmePath || !fs.existsSync(readmePath)) {
    return {
      overview: undefined,
      propTable: new Map<string, ReadmePropRow>(),
      accessibility: [] as string[],
      usageNotes: [] as ComponentUsageNote[],
    };
  }

  const text = normalizeNewlines(fs.readFileSync(readmePath, "utf8"));
  const lines = text.split("\n");
  const headings = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => line.startsWith("## "));

  const introStart = lines.findIndex((line) => line.startsWith("# "));
  const introEnd = headings[0]?.index ?? lines.length;
  const overview = lines
    .slice(Math.max(0, introStart + 1), introEnd)
    .join("\n")
    .trim()
    .split("\n\n")[0]
    ?.trim();

  const sections = new Map<string, string>();
  headings.forEach(({ line, index }, headingIndex) => {
    const title = line.slice(3).trim();
    const nextIndex = headings[headingIndex + 1]?.index ?? lines.length;
    sections.set(title, lines.slice(index + 1, nextIndex).join("\n").trim());
  });

  const propTable = new Map<string, ReadmePropRow>();
  const propsSection = sections.get("Props");
  if (propsSection) {
    const tableLines = propsSection
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("|"));

    for (const row of tableLines.slice(2)) {
      const cells = row
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      if (cells.length < 4) continue;
      const [nameCell, typeCell, defaultCell, descriptionCell] = cells;
      const name = nameCell.replace(/`/g, "");
      if (!name) continue;
      propTable.set(name, {
        type: typeCell.replace(/`/g, "") || undefined,
        defaultValue: defaultCell.replace(/`/g, "") || undefined,
        description: descriptionCell || undefined,
      });
    }
  }

  const accessibility = parseBulletList(sections.get("Accessibility"));
  const usageNotes = Array.from(sections.entries())
    .filter(([title]) => DOC_SECTION_TITLES.includes(title.toLowerCase()))
    .map(([title, body]) => ({
      title,
      bullets: parseBulletList(body).length > 0 ? parseBulletList(body) : paragraphBullets(body),
    }))
    .filter((section) => section.bullets.length > 0);

  return { overview, propTable, accessibility, usageNotes };
}

function parseBulletList(body?: string) {
  if (!body) return [];
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[-*] /.test(line))
    .map((line) => line.replace(/^[-*] /, "").trim());
}

function paragraphBullets(body?: string) {
  if (!body) return [];
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !block.startsWith("```"));
}

const getRegistryDescriptions = cache(() => {
  if (!fs.existsSync(REGISTRY_FILE)) {
    return new Map<string, string>();
  }

  const registryText = normalizeNewlines(fs.readFileSync(REGISTRY_FILE, "utf8"));
  const map = new Map<string, string>();
  const regex =
    /name:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"/g;

  for (const match of Array.from(registryText.matchAll(regex))) {
    map.set(match[1], match[2]);
  }

  return map;
});

export function getRegistryDescriptionMap(): Record<string, string> {
  return Object.fromEntries(getRegistryDescriptions());
}

function createProgramForFile(filePath: string) {
  return ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    lib: ["lib.es2022.d.ts", "lib.dom.d.ts"],
  });
}

function extractPropsFromTypesFile(typesPath: string, label: string, readmeProps: Map<string, ReadmePropRow>) {
  const program = createProgramForFile(typesPath);
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(typesPath);

  if (!source) {
    return { props: [] as ComponentPropDoc[], forwardedProps: [] as string[] };
  }

  const propsTypeName = `${label}Props`;
  let targetNode: ts.InterfaceDeclaration | ts.TypeAliasDeclaration | undefined;

  function visit(node: ts.Node): void {
    if (
      (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
      node.name.text === propsTypeName
    ) {
      targetNode = node;
      return;
    }
    ts.forEachChild(node, visit);
  }

  visit(source);

  if (!targetNode) {
    const fallbackProps = Array.from(readmeProps.entries()).map(([name, row]) => ({
      name,
      type: row.type ?? "unknown",
      description: row.description ?? "",
      required: row.defaultValue !== "required",
      defaultValue: row.defaultValue,
    }));

    return { props: fallbackProps, forwardedProps: [] as string[] };
  }

  const targetType = checker.getTypeAtLocation(targetNode);
  const sourceFileKey = path.resolve(typesPath).toLowerCase();
  const props = checker
    .getPropertiesOfType(targetType)
    .map((symbol) => {
      const declaration = symbol.declarations?.find(
        (entry) => path.resolve(entry.getSourceFile().fileName).toLowerCase() === sourceFileKey,
      );
      if (!declaration) return undefined;
      const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
      const readmeRow = readmeProps.get(symbol.getName());
      return {
        name: symbol.getName(),
        type: readmeRow?.type ?? checker.typeToString(type),
        description:
          readmeRow?.description ??
          ts.displayPartsToString(symbol.getDocumentationComment(checker)),
        required: (symbol.flags & ts.SymbolFlags.Optional) === 0,
        defaultValue: readmeRow?.defaultValue,
        position: declaration.getStart(source),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .sort((a, b) => a.position - b.position)
    .map(({ position: _position, ...entry }) => entry);

  const forwardedProps =
    ts.isInterfaceDeclaration(targetNode) && targetNode.heritageClauses
      ? targetNode.heritageClauses
          .flatMap((clause) => clause.types.map((typeNode) => typeNode.getText(source)))
      : [];

  return { props, forwardedProps };
}

function buildDocsData(slug: ShowcaseSlug, label: string): ComponentDocsData {
  const componentDir = toAbsolutePath(COMPONENTS_ROOT, slug);
  const readmePath = toAbsolutePath(componentDir, "README.md");
  const typesPath = fs
    .readdirSync(componentDir)
    .find((fileName) => fileName.endsWith(".types.ts"));
  const componentPath = fs
    .readdirSync(componentDir)
    .find((fileName) => fileName.endsWith(".tsx") && !fileName.endsWith(".types.ts") && fileName !== "index.tsx");

  const readme = parseReadme(fs.existsSync(readmePath) ? readmePath : undefined);
  const extracted = typesPath
    ? extractPropsFromTypesFile(toAbsolutePath(componentDir, typesPath), label, readme.propTable)
    : { props: [] as ComponentPropDoc[], forwardedProps: [] as string[] };
  const registryDescription = getRegistryDescriptions().get(slug);

  return {
    label,
    overview: readme.overview,
    registryDescription,
    props: extracted.props,
    accessibility: readme.accessibility,
    usageNotes: readme.usageNotes,
    forwardedProps: extracted.forwardedProps,
    coverage: {
      hasReadme: fs.existsSync(readmePath),
      hasApiReference: extracted.props.length > 0,
      hasAccessibility: readme.accessibility.length > 0,
      hasUsageNotes: readme.usageNotes.length > 0,
    },
    sourceFiles: {
      readme: fs.existsSync(readmePath) ? readmePath : undefined,
      types: typesPath ? toAbsolutePath(componentDir, typesPath) : undefined,
      component: componentPath ? toAbsolutePath(componentDir, componentPath) : undefined,
    },
  };
}

export const getComponentDocs = cache((slug: ShowcaseSlug, label: string) => buildDocsData(slug, label));
