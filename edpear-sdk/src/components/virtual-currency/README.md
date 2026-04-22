# VirtualCurrency

A coin/token balance display with earn/spend history — powers in-app reward stores.

## Installation

```bash
npx edpear add virtual-currency
```

## Basic Usage

```tsx
import { VirtualCurrency } from "edpear";

<VirtualCurrency
  balance={1250}
  currencyName="Pear Tokens"
  history={[
    {
      id: "tx1",
      amount: 50,
      reason: "Completed Lesson 1",
      date: new Date()
    },
    {
      id: "tx2",
      amount: -20,
      reason: "Purchased Avatar Hat",
      date: new Date(Date.now() - 86400000) // yesterday
    }
  ]}
/>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `balance` | `number` | required | Current total balance |
| `currencyName` | `string` | `"Coins"` | Name of your virtual currency |
| `icon` | `ReactNode` | `<Coins />` | Optional custom icon element |
| `history` | `CurrencyTransaction[]` | `[]` | Array of recent transactions |
