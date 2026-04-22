import { Languages } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { TranslationOverlayProps } from "./translation-overlay.types.js";

export const TranslationOverlay = forwardRef<HTMLDivElement, TranslationOverlayProps>((props, ref) => {
  const {
    originalText,
    translatedText,
    sourceLanguage = "EN",
    targetLanguage = "ES",
    defaultShow = false,
    className,
    ...rest
  } = props;

  const [showTranslation, setShowTranslation] = useState(defaultShow);

  return (
    <div
      ref={ref}
      className={cn("relative inline-block", className)}
      data-slot="translation-overlay"
      {...rest}
    >
      <div 
        className={cn(
          "group relative inline-flex flex-col rounded-md transition-colors",
          showTranslation ? "bg-primary/5 border border-primary/20 px-2 py-1 -mx-2 -my-1" : "hover:bg-muted/50 cursor-help px-1 -mx-1"
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={cn(
            "absolute -right-3 -top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm transition-all",
            showTranslation ? "opacity-100 scale-100 text-primary" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 text-muted-foreground hover:text-foreground"
          )}
          aria-label="Toggle translation"
        >
          <Languages className="h-3.5 w-3.5" />
        </button>

        {/* Text Container */}
        <div className="flex flex-col relative z-0">
          <span className={cn(
            "transition-colors",
            showTranslation && "text-sm text-muted-foreground pb-1 border-b border-border/50 mb-1"
          )}>
            {showTranslation && <span className="mr-1 text-[10px] font-bold uppercase tracking-wider opacity-50">{sourceLanguage}</span>}
            {originalText}
          </span>
          
          {/* Translated Text (Ruby style overlay) */}
          {showTranslation && (
            <span className="text-base font-medium text-foreground animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-primary opacity-70">{targetLanguage}</span>
              {translatedText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

TranslationOverlay.displayName = "TranslationOverlay";
