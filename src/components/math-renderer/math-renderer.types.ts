export type MathRendererDisplayMode = "auto" | "inline" | "block";

export type MathRendererProps = {
  /** Mixed plain text, **bold**, $inline math$, and $$block math$$ */
  content: string;
  displayMode?: MathRendererDisplayMode;
  className?: string;
};
