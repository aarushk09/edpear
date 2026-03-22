# RichTextEditor

Tiptap-based note editor for student submissions, reflections, and writing prompts.

## Installation

```bash
npx edpear add rich-text-editor
```

## Basic Usage

```tsx
import { RichTextEditor } from "edpear";

<RichTextEditor defaultValue="<p>My first note.</p>" />;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | uncontrolled | Controlled HTML value |
| `defaultValue` | `string` | `""` | Initial HTML value |
| `onValueChange` | `(value) => void` | `undefined` | Change callback |
| `placeholder` | `string` | built-in | Empty editor hint |
| `className` | `string` | `undefined` | Root style override |

## Advanced Usage

```tsx
<RichTextEditor
  value={draft}
  onValueChange={setDraft}
  placeholder="Explain your reasoning in 3-4 sentences"
/>
```

## Accessibility

- Toolbar actions are native buttons with labels.
- Editor remains keyboard navigable.
- Placeholder text appears in empty state without replacing semantic content.
