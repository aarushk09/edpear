import type { ReactNode } from "react";

export type KnowledgeCheckQuestion = {
  id: string;
  prompt: string;
  options: string[];
  /** Index of correct option */
  correctIndex: number;
};

export type KnowledgeCheckProps = {
  questions: KnowledgeCheckQuestion[];
  /** Max 3 questions enforced in UI; extra entries ignored */
  title?: string;
  onPass?: () => void;
  /** Content revealed only after all answers are correct */
  children?: ReactNode;
  className?: string;
};
