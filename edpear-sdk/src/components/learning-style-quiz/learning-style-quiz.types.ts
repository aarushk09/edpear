export type LearningStyle = "visual" | "auditory" | "kinesthetic";

export interface LearningStyleOption {
  id: string;
  label: string;
  styleWeight: Record<LearningStyle, number>;
}

export interface LearningStyleQuestion {
  id: string;
  question: string;
  options: LearningStyleOption[];
}

export interface LearningStyleResult {
  dominantStyle: LearningStyle;
  scores: Record<LearningStyle, number>;
}

export interface LearningStyleQuizProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onComplete"> {
  questions?: LearningStyleQuestion[];
  onComplete?: (result: LearningStyleResult) => void;
  title?: string;
  description?: string;
}
