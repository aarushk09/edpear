import { Beaker, CheckCircle2, ChevronDown, ChevronUp, RefreshCw, X, XCircle } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { ChemicalElement, ChemistryFormulaBuilderProps, FormulaPart } from "./chemistry-formula-builder.types.js";

const DEFAULT_ELEMENTS: ChemicalElement[] = [
  { symbol: "H", name: "Hydrogen", atomicNumber: 1, color: "bg-slate-200 text-slate-800" },
  { symbol: "C", name: "Carbon", atomicNumber: 6, color: "bg-zinc-800 text-white" },
  { symbol: "N", name: "Nitrogen", atomicNumber: 7, color: "bg-blue-500 text-white" },
  { symbol: "O", name: "Oxygen", atomicNumber: 8, color: "bg-red-500 text-white" },
  { symbol: "Na", name: "Sodium", atomicNumber: 11, color: "bg-purple-500 text-white" },
  { symbol: "Cl", name: "Chlorine", atomicNumber: 17, color: "bg-green-500 text-white" },
];

export const ChemistryFormulaBuilder = forwardRef<HTMLDivElement, ChemistryFormulaBuilderProps>((props, ref) => {
  const {
    availableElements = DEFAULT_ELEMENTS,
    targetFormula,
    onChange,
    title = "Formula Builder",
    className,
    ...rest
  } = props;

  const [formulaParts, setFormulaParts] = useState<FormulaPart[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const currentFormulaString = formulaParts
    .map((p) => `${p.element.symbol}${p.count > 1 ? p.count : ""}`)
    .join("");

  useEffect(() => {
    let valid = null;
    if (targetFormula) {
      if (formulaParts.length > 0) {
        valid = currentFormulaString === targetFormula;
      }
    }
    setIsValid(valid);
    onChange?.(currentFormulaString, valid === true);
  }, [currentFormulaString, targetFormula, formulaParts.length, onChange]);

  const addElement = (element: ChemicalElement) => {
    // If the last element is the same, increment count instead of adding a new block
    // Wait, typically formulas group elements (e.g., C2H5OH has two distinct groups). Let's just add it.
    setFormulaParts((prev) => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), element, count: 1 },
    ]);
  };

  const removePart = (id: string) => {
    setFormulaParts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateCount = (id: string, delta: number) => {
    setFormulaParts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newCount = p.count + delta;
          if (newCount < 1) return p;
          return { ...p, count: newCount };
        }
        return p;
      })
    );
  };

  const handleClear = () => {
    setFormulaParts([]);
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-slot="chemistry-formula-builder"
      {...rest}
    >
      <div className="flex items-center justify-between border-b p-4 bg-muted/20">
        <div className="flex items-center gap-2">
          <Beaker className="h-5 w-5 text-primary" />
          <h3 className="font-semibold tracking-tight">{title}</h3>
        </div>
        
        {targetFormula && (
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-muted-foreground">Target:</span>
            <span className="rounded bg-muted px-2 py-0.5 tracking-widest">{targetFormula}</span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Workspace */}
        <div className="mb-6 rounded-lg border-2 border-dashed border-border bg-muted/10 p-6">
          <div className="flex min-h-[100px] flex-wrap items-center justify-center gap-2">
            {formulaParts.length === 0 ? (
              <span className="text-sm text-muted-foreground">Select elements below to build a formula</span>
            ) : (
              formulaParts.map((part) => (
                <div key={part.id} className="group relative flex items-end animate-in zoom-in duration-200">
                  <div className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-lg border shadow-sm text-2xl font-bold transition-all",
                    part.element.color || "bg-background text-foreground"
                  )}>
                    {part.element.symbol}
                  </div>
                  
                  {/* Subscript control */}
                  <div className="flex flex-col items-center ml-1">
                    <button
                      onClick={() => updateCount(part.id, 1)}
                      className="flex h-5 w-5 items-center justify-center rounded-t bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <div className="flex h-6 w-5 items-center justify-center bg-background border-x font-bold text-sm">
                      {part.count > 1 ? part.count : "-"}
                    </div>
                    <button
                      onClick={() => updateCount(part.id, -1)}
                      disabled={part.count <= 1}
                      className="flex h-5 w-5 items-center justify-center rounded-b bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removePart(part.id)}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-rose-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>
          
          {/* Result Toolbar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">
            <div className="flex items-center gap-4">
              <div className="text-lg font-mono font-medium tracking-wide">
                {formulaParts.length > 0 ? currentFormulaString : "---"}
              </div>
              
              {targetFormula && isValid !== null && (
                <div className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider",
                  isValid ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                )}>
                  {isValid ? (
                    <><CheckCircle2 className="h-4 w-4" /> Correct</>
                  ) : (
                    <><XCircle className="h-4 w-4" /> Incorrect</>
                  )}
                </div>
              )}
            </div>
            
            <button
              onClick={handleClear}
              disabled={formulaParts.length === 0}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
            >
              <RefreshCw className="h-4 w-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Element Palette */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-muted-foreground">Available Elements</h4>
          <div className="flex flex-wrap gap-2">
            {availableElements.map((el) => (
              <button
                key={el.symbol}
                onClick={() => addElement(el)}
                className={cn(
                  "group relative flex h-12 w-12 items-center justify-center rounded-lg border shadow-sm transition-transform active:scale-95 hover:shadow-md",
                  el.color || "bg-background text-foreground hover:bg-accent"
                )}
                title={el.name}
              >
                <span className="font-bold">{el.symbol}</span>
                <span className="absolute -bottom-1 right-1 text-[8px] opacity-50 font-mono">
                  {el.atomicNumber}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ChemistryFormulaBuilder.displayName = "ChemistryFormulaBuilder";
