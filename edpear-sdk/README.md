# edpear-sdk

npm package **`edpear-sdk`** is the **published SDK name** for [EdPear](https://github.com/aarushk09/edpear): the same React components, CLI, styles, and OpenRouter helpers as the root **`edpear`** package in this repo.

Use whichever install name you prefer:

```bash
npm install edpear-sdk
```

```tsx
import "edpear-sdk/styles.css";
import { QuizCard, CourseDashboard } from "edpear-sdk";
```

## CLI

```bash
npx edpear-sdk add quiz-card lesson-progress
```

The same CLI is also available as the `edpear` command after install (`npx edpear …` from this package).

## Maintainers: publish from this repo

This folder does **not** build TypeScript itself. It **mirrors** the root package after `tsc`:

1. From the **repository root** (parent of `edpear-sdk/`):

   ```bash
   npm run build
   npm run sdk:sync
   ```

2. Publish the SDK package:

   ```bash
   npm publish ./edpear-sdk --access public
   ```

   Or use the shortcut:

   ```bash
   npm run sdk:publish
   ```

`prepack` / `prepublishOnly` in `edpear-sdk/package.json` run **`sync`** automatically, but **`dist/` must exist** — always run **`npm run build`** at the root first.

## Relationship to `edpear`

| Package       | Role                                      |
| ------------- | ----------------------------------------- |
| `edpear`      | Primary name in source / local `file:`    |
| `edpear-sdk`  | npm registry name for consumers (this dir) |

Version numbers are kept in sync (e.g. `2.0.0`).
