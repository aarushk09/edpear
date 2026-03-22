# CodePlayground

CodeMirror-backed playground for coding exercises, demos, and sandboxed code review flows.

## Installation

```bash
npx edpear add code-playground
```

## Basic Usage

```tsx
import { CodePlayground } from "edpear";

<CodePlayground language="javascript" defaultValue="console.log('hello')" />;
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `language` | `"javascript" \| "typescript" \| "python" \| "json"` | `"javascript"` | Editor mode |
| `value` | `string` | uncontrolled | Controlled code value |
| `defaultValue` | `string` | sample snippet | Initial code |
| `onValueChange` | `(value) => void` | `undefined` | Change callback |
| `onRun` | `(code) => string \| Promise<string>` | `undefined` | Custom execution hook |
| `readOnly` | `boolean` | `false` | Disable editing |

## Advanced Usage

```tsx
<CodePlayground
  language="python"
  onRun={async (code) => {
    const result = await fetch("/api/run-python", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    return result.text();
  }}
/>
```

## Accessibility

- Editor is keyboard navigable through CodeMirror.
- Run action is a labeled button.
- Output is rendered in a readable text block.
