
# HomeActivitySuggester

Curated offline exercises families can do together to reinforce classroom learning.

## Installation

```bash
npx edpear add home-activity-suggester
```

## Basic Usage

```tsx
import { HomeActivitySuggester } from "edpear";

<HomeActivitySuggester />
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `Home Activity Suggester` | Heading text for the component card |
| `subtitle` | `string` | Built-in copy | Supporting product guidance under the title |
| `suggestions` | `HomeActivitySuggestion[]` | Built-in sample data | Replace with your own product data |
| `disabled` | `boolean` | `false` | Disables interactive controls while preserving layout |
| `onAssignSuggestion` | `(entry: HomeActivitySuggestion) => void` | `undefined` | Fires the primary domain action for the active card |
| `onSaveSuggestion` | `(entry: HomeActivitySuggestion) => void` | `undefined` | Fires the secondary workflow action for the active card |

## Accessibility

- Keeps all interactive elements keyboard reachable with visible focus treatment.
- Uses plain language section headings so assistive technologies can scan the component structure quickly.
- Preserves readable contrast and spacing in both dense dashboard layouts and embedded doc previews.
