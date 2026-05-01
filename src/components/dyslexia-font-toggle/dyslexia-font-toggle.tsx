
"use client";

import { Accessibility, RotateCw } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

import { cn } from "../../lib/cn.js";
import type { DyslexiaFontVariant, DyslexiaFontToggleProps } from "./dyslexia-font-toggle.types.js";

const DEFAULT_VARIANTS: DyslexiaFontVariant[] = [
  {
    "id": "df1",
    "label": "Default",
    "headline": "Standard reading view",
    "body": "Paragraph spacing and word shape stay consistent with the product default.",
    "note": "Use when no extra support is needed."
  },
  {
    "id": "df2",
    "label": "OpenDyslexic",
    "headline": "Dyslexia-friendly mode",
    "body": "Letterforms, spacing, and line height shift to reduce crowding during reading.",
    "note": "Pair with shorter line lengths for best results."
  },
  {
    "id": "df3",
    "label": "High spacing",
    "headline": "Extra spacing",
    "body": "Increase character and line spacing without changing the primary typeface.",
    "note": "Useful for gradual onboarding into accessibility settings."
  }
];

export const DyslexiaFontToggle = forwardRef<HTMLDivElement, DyslexiaFontToggleProps>((props, ref) => {
  const {
    title = "Dyslexia Font Toggle",
    subtitle = "One-click reading preview that switches to a dyslexia-friendly font and spacing profile.",
    variants = DEFAULT_VARIANTS,
    defaultVariantId,
    disabled = false,
    onVariantChange,
    className,
    ...rest
  } = props;

  const [activeId, setActiveId] = useState(defaultVariantId ?? variants[0]?.id ?? null);
  const activeVariant = useMemo(
    () => variants.find((variant) => variant.id === activeId) ?? variants[0] ?? null,
    [activeId, variants],
  );

  return (
    <div
      ref={ref}
      className={cn("w-full rounded-2xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="dyslexia-font-toggle"
      {...rest}
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Accessibility className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                setActiveId(variant.id);
                onVariantChange?.(variant.id);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                variant.id === activeVariant?.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              {variant.label}
            </button>
          ))}
        </div>

        {activeVariant ? (
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="rounded-2xl border border-border bg-muted/10 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <RotateCw className="h-4 w-4" />
                Active variant
              </div>
              <h4 className="mt-3 text-xl font-semibold tracking-tight">{activeVariant.headline}</h4>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeVariant.body}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Implementation note</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{activeVariant.note ?? "Use this variant to compare alternate presentation states."}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
});

DyslexiaFontToggle.displayName = "DyslexiaFontToggle";
