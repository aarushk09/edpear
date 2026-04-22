# LearningStyleQuiz

An onboarding diagnostic that profiles a learner (visual, auditory, kinesthetic) and emits a style payload.

## Installation

```bash
npx edpear add learning-style-quiz
```

## Basic Usage

```tsx
import { LearningStyleQuiz } from "edpear";

<LearningStyleQuiz
  onComplete={(result) => {
    console.log("Dominant style:", result.dominantStyle);
    console.log("Scores:", result.scores);
  }}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `questions` | `LearningStyleQuestion[]` | Default set | Custom questions to ask |
| `onComplete` | `(result: LearningStyleResult) => void` | `undefined` | Callback fired when the quiz is finished |
| `title` | `string` | `"Discover Your Learning Style"` | Quiz title |
| `description` | `string` | `"Answer a few quick questions..."` | Quiz description |

## Custom Questions

You can pass custom questions to map to different weightings:

```tsx
<LearningStyleQuiz
  questions={[
    {
      id: "custom-1",
      question: "How do you remember directions?",
      options: [
        { id: "o1", label: "Draw a map", styleWeight: { visual: 3, auditory: 0, kinesthetic: 0 } },
        { id: "o2", label: "Repeat street names", styleWeight: { visual: 0, auditory: 3, kinesthetic: 0 } },
        { id: "o3", label: "Follow my gut feeling", styleWeight: { visual: 0, auditory: 0, kinesthetic: 3 } }
      ]
    }
  ]}
/>
```
