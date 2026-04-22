# XPProgressBar

An experience-point bar with level-up animation — wraps around any point-earning action.

## Installation

```bash
npx edpear add xp-progress-bar
```

## Basic Usage

```tsx
import { XPProgressBar } from "edpear";
import { useState } from "react";

function XPDemo() {
  const [xp, setXP] = useState(850);
  const [level, setLevel] = useState(4);
  const nextXP = 1000;

  const earnPoints = () => {
    const newXP = xp + 200;
    if (newXP >= nextXP) {
      setLevel(level + 1);
      setXP(newXP - nextXP);
    } else {
      setXP(newXP);
    }
  };

  return (
    <div className="space-y-4">
      <XPProgressBar
        currentXP={xp}
        nextLevelXP={nextXP}
        level={level}
      />
      <button onClick={earnPoints}>Earn 200 XP</button>
    </div>
  );
}
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `currentXP` | `number` | required | Current amount of XP in this level |
| `nextLevelXP` | `number` | required | XP required to reach the next level |
| `level` | `number` | required | Current level number |
| `animateOnChange` | `boolean` | `true` | Enables level-up and XP gain animations |
| `label` | `string` | `"Experience"` | Label text above the bar |
