export type QuestionBankItemType = "mcq" | "short-answer" | "true-false" | "essay";

export type QuestionBankDifficulty = "easy" | "medium" | "hard";

export type QuestionBankItem = {
  id: string;
  topic: string;
  difficulty: QuestionBankDifficulty;
  type: QuestionBankItemType;
  prompt: string;
};

export type QuestionBankProps = {
  questions: QuestionBankItem[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  /** Called when selection is dropped onto the builder zone (or via button) */
  onAddToQuiz?: (ids: string[]) => void;
  className?: string;
};
