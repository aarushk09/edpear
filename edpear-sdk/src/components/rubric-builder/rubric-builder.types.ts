export interface RubricCriterion {
  id: string;
  name: string;
  description?: string;
}

export interface RubricLevel {
  id: string;
  points: number;
  label: string; // e.g. "Excellent", "Proficient"
}

export interface RubricCell {
  criterionId: string;
  levelId: string;
  description: string;
}

export interface RubricBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  criteria: RubricCriterion[];
  levels: RubricLevel[];
  cells: RubricCell[];
  readOnly?: boolean;
  selectedCells?: Record<string, string>; // criterionId -> levelId
  onSelectCell?: (criterionId: string, levelId: string) => void;
  title?: string;
}
