
# BloomsTaxonomyTagger

Labels learning objectives across remember-to-create levels with curriculum-ready consistency.

## Installation

```bash
npx edpear add blooms-taxonomy-tagger
```

## Basic Usage

```tsx
import { BloomsTaxonomyTagger } from "edpear";

<BloomsTaxonomyTagger />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Blooms Taxonomy Tagger` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `objectives` | `BloomsTaggedObjective[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onSaveObjectives` | `(items: BloomsTaggedObjective[]) => void` | `undefined` | Called when the current draft is saved |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
