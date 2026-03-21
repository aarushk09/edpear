export type PeerRubricCriterion = {
  id: string;
  label: string;
  maxPoints: number;
  description?: string;
};

export type PeerReviewPanelProps = {
  submissionTitle?: string;
  submissionPreview: string;
  rubric: PeerRubricCriterion[];
  scores: Record<string, number>;
  comments: Record<string, string>;
  onScoreChange?: (criterionId: string, points: number) => void;
  onCommentChange?: (criterionId: string, text: string) => void;
  onSubmitReview?: () => void;
  disabled?: boolean;
  className?: string;
};
