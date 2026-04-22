# TranslationOverlay

An inline translation helper that overlays translated text without losing the original context.

## Installation

```bash
npx edpear add translation-overlay
```

## Basic Usage

```tsx
import { TranslationOverlay } from "edpear";

<p>
  La biblioteca es {" "}
  <TranslationOverlay 
    originalText="muy grande" 
    translatedText="very big" 
    sourceLanguage="ES" 
    targetLanguage="EN" 
  />
  .
</p>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `originalText` | `string` | required | The original inline text |
| `translatedText` | `string` | required | The translated text to reveal |
| `sourceLanguage` | `string` | `"EN"` | Label for original text |
| `targetLanguage` | `string` | `"ES"` | Label for translated text |
| `defaultShow` | `boolean` | `false` | Whether the translation is visible by default |

## UX Details

- Renders seamlessly inline.
- Hovering reveals a small translation toggle button.
- Clicking expands the element to show the translated text below the original text, similar to "ruby" characters.
