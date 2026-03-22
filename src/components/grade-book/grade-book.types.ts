export type GradeBookStudent = { id: string; name: string };

export type GradeBookAssignment = {
  id: string;
  title: string;
  /** Optional category for weighted course totals */
  categoryId?: string;
};

export type GradeBookCategory = {
  id: string;
  name: string;
  /** Weight as fraction of final grade, e.g. 0.4 for 40% */
  weight: number;
};

/** Cell value: percentage string "87", "87%", letter "B+", or empty */
export type GradeCellValue = string;

export type GradeBookProps = {
  students: GradeBookStudent[];
  assignments: GradeBookAssignment[];
  categories?: GradeBookCategory[];
  /** studentId -> assignmentId -> displayed grade */
  grades: Record<string, Record<string, GradeCellValue>>;
  onGradeChange?: (studentId: string, assignmentId: string, value: GradeCellValue) => void;
  /** Percent thresholds for letter coloring (inclusive min for that band) */
  letterBands?: { letter: string; minPercent: number; className?: string }[];
  editable?: boolean;
  className?: string;
};
