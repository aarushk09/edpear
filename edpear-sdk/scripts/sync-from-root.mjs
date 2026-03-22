/**
 * Copies the publishable tree from the monorepo root into edpear-sdk/
 * so `npm publish` for the `edpear-sdk` package matches the main `edpear` build.
 *
 * Run from repo root: `npm run build && npm run sdk:sync`
 * Or rely on `prepack` inside edpear-sdk when publishing.
 */
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sdkRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(sdkRoot, "..");

function mustExist(p, label) {
  if (!existsSync(p)) {
    console.error(`edpear-sdk sync: missing ${label}: ${p}\nRun: npm run build (from repo root)`);
    process.exit(1);
  }
}

mustExist(path.join(repoRoot, "dist"), "dist/");

const copies = [
  [path.join(repoRoot, "dist"), path.join(sdkRoot, "dist")],
  [path.join(repoRoot, "src", "components"), path.join(sdkRoot, "src", "components")],
];

for (const [from, to] of copies) {
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
}

mkdirSync(path.join(sdkRoot, "src", "lib"), { recursive: true });
for (const f of ["cn.ts", "openrouter.ts", "registry.ts"]) {
  const src = path.join(repoRoot, "src", "lib", f);
  mustExist(src, `src/lib/${f}`);
  cpSync(src, path.join(sdkRoot, "src", "lib", f));
}

mkdirSync(path.join(sdkRoot, "styles"), { recursive: true });
const css = path.join(repoRoot, "styles", "edpear.css");
mustExist(css, "styles/edpear.css");
cpSync(css, path.join(sdkRoot, "styles", "edpear.css"));

console.log("edpear-sdk: synced from repo root.");
