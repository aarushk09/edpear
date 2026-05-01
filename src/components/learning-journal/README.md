# LearningJournal

A reflective journaling surface for daily learning check-ins, combining mood, wins, blockers, and a short next-step note.

## Installation

```bash
npx edpear add learning-journal
```

## Basic Usage

```tsx
import { useState } from "react";
import { LearningJournal, type LearningJournalEntry } from "edpear";

function ReflectionPanel() {
  const [entries, setEntries] = useState<LearningJournalEntry[]>([]);

  return (
    <LearningJournal
      currentDateLabel="Tue, May 5"
      entries={entries}
      onSaveEntry={(entry) => setEntries((prev) => [entry, ...prev])}
    />
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"Learning Journal"` | Primary heading shown in the card header |
| `subtitle` | `string` | built-in | Supporting copy that frames the reflection workflow |
| `currentDateLabel` | `string` | `"Today"` | Label attached to newly saved entries |
| `prompt` | `string` | built-in | Reflection prompt shown above the final note field |
| `entries` | `LearningJournalEntry[]` | `[]` | Existing reflections rendered in the history rail |
| `onSaveEntry` | `(entry: LearningJournalEntry) => void` | `undefined` | Called when the learner saves a valid reflection |
| `onDeleteEntry` | `(entryId: string) => void` | `undefined` | Optional handler for removing an existing entry |
| `prompts` | `LearningJournalPromptSet` | `undefined` | Override labels and placeholders for the journaling fields |
| `disabled` | `boolean` | `false` | Disables editing and saving |
| `allowDelete` | `boolean` | `true` | Controls whether delete actions are shown for saved entries |
| `maxVisibleEntries` | `number` | `4` | Maximum number of prior entries shown in the side rail |
| `initialMood` | `LearningJournalMood` | `"steady"` | Starting state for the mood selector |
| `saveLabel` | `string` | `"Save reflection"` | Button copy for the save action |

## Advanced Usage

```tsx
<LearningJournal
  currentDateLabel="Week 4 retrospective"
  entries={entries}
  onDeleteEntry={(entryId) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  }}
  onSaveEntry={(entry) => {
    saveReflectionToApi(entry);
    setEntries((prev) => [entry, ...prev]);
  }}
  prompt="What one adjustment will make the next session easier to start?"
  prompts={{
    winsLabel: "Signals of progress",
    blockersLabel: "Friction to address",
    reflectionLabel: "Coach note",
  }}
/>
```

## Accessibility

- Uses native buttons, textareas, and focus styles for the journaling workflow.
- Mood choices expose pressed state through `aria-pressed`.
- Field labels are rendered in text directly above each textarea for clear screen reader context.
- Delete actions include entry-specific accessible labels so history management remains understandable.
