export type ReadingHighlight = {
  id: string;
  start: number;
  end: number;
  color?: string;
  note?: string;
};

export type ReadingAnnotationsPayload = {
  highlights: ReadingHighlight[];
};

export type ReadingAnnotatorProps = {
  /** Plain text to display and annotate */
  text: string;
  highlights: ReadingHighlight[];
  onAnnotationsChange?: (payload: ReadingAnnotationsPayload) => void;
  className?: string;
};
