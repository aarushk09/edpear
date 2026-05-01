
# PortfolioBuilder

Curated artifact gallery where learners pair project evidence with reflection and growth notes.

## Installation

```bash
npx edpear add portfolio-builder
```

## Basic Usage

```tsx
import { PortfolioBuilder } from "edpear";

<PortfolioBuilder />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Portfolio Builder` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `artifacts` | `PortfolioArtifact[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onFeatureArtifact` | `(entry: PortfolioArtifact) => void` | `undefined` | Fires the primary domain action for the active card |
| `onShareArtifact` | `(entry: PortfolioArtifact) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
