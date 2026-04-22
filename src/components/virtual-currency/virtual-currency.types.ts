import type { ReactNode } from "react";

export interface CurrencyTransaction {
  id: string;
  amount: number; // positive for earn, negative for spend
  reason: string;
  date: Date | string | number;
}

export interface VirtualCurrencyProps extends React.HTMLAttributes<HTMLDivElement> {
  balance: number;
  currencyName?: string;
  icon?: ReactNode;
  history?: CurrencyTransaction[];
}
