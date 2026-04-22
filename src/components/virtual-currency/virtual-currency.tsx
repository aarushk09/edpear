import { ArrowDownRight, ArrowUpRight, Coins } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn.js";
import type { VirtualCurrencyProps } from "./virtual-currency.types.js";

export const VirtualCurrency = forwardRef<HTMLDivElement, VirtualCurrencyProps>((props, ref) => {
  const {
    balance,
    currencyName = "Coins",
    icon,
    history = [],
    className,
    ...rest
  } = props;

  const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
      data-slot="virtual-currency"
      {...rest}
    >
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-500/10 to-amber-500/5 p-8 border-b">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-600 shadow-inner mb-4 ring-8 ring-yellow-500/10">
          {icon || <Coins className="h-8 w-8" />}
        </div>
        <h2 className="text-4xl font-bold tracking-tighter text-foreground">
          {balance.toLocaleString()}
        </h2>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mt-1">
          {currencyName} Balance
        </p>
      </div>

      {sortedHistory.length > 0 && (
        <div className="flex flex-col p-4">
          <h3 className="text-sm font-semibold mb-3 px-2">Recent Transactions</h3>
          <div className="space-y-1">
            {sortedHistory.slice(0, 5).map((tx) => {
              const isEarn = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      isEarn ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                    )}>
                      {isEarn ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none mb-1">{tx.reason}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                  <div className={cn(
                    "text-sm font-bold",
                    isEarn ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  )}>
                    {isEarn ? "+" : ""}{tx.amount}
                  </div>
                </div>
              );
            })}
          </div>
          
          {history.length > 5 && (
            <button className="mt-3 w-full rounded-md py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              View All Transactions
            </button>
          )}
        </div>
      )}
    </div>
  );
});

VirtualCurrency.displayName = "VirtualCurrency";
