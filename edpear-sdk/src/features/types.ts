// ─── Feature Response Types ──────────────────────────────────────────────────
// All structured response types for the 10 EdPear educational AI wrappers.

// 1. debugMathSolution
export interface MathDebugResult {
  errorAtLine: number;
  incorrectStep: string;
  correctFormula: string;
  explanation: string;
  hints: string[];
}

// 2. verifyRealWorldConcept
export interface ConceptVerificationResult {
  matches: boolean;
  confidence: number; // 0–1
  concept: string;
  explanation: string;
  visualEvidence: string[];
  suggestedCorrection?: string;
}

// 3. checkLabSetup
export interface LabCheckResult {
  overallCorrect: boolean;
  safetyIssues: string[];
  correctnessIssues: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

// 4. generateSpatialFlashcards
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  region: string; // e.g. "top-left quadrant", "label A"
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface SpatialFlashcardsResult {
  flashcards: Flashcard[];
  diagramType: string;
  totalCards: number;
}

// 5. whiteboardToCode
export interface WhiteboardCodeResult {
  output: string;
  format: 'latex' | 'python' | 'pseudocode' | 'markdown' | string;
  explanation: string;
  variables?: Record<string, string>;
}

// 6. gradeVisualRubric
export interface RubricItem {
  constraint: string;
  passed: boolean;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface VisualRubricResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  breakdown: RubricItem[];
  overallFeedback: string;
}

// 7. reduceCognitiveLoad
export interface CognitiveLoadResult {
  markdown: string;          // dyslexia-friendly reformatted text
  keyTerms: string[];
  summary: string;
  readingLevel: string;
}

// 8. translateManipulatives
export interface ManipulativeBlock {
  id: string;
  type: string;        // e.g. "tens-block", "unit-cube", "pattern-tile"
  value: string;       // e.g. "10", "1", "hexagon"
  position: string;    // e.g. "row 1, col 3"
  color?: string;
}

export interface ManipulativesResult {
  blocks: ManipulativeBlock[];
  totalValue?: number | string;
  arrangement: string;
  digitalState: Record<string, unknown>;
  interpretation: string;
}

// 9. analyzeHistoricalArtifact
export interface HistoricalArtifactResult {
  title: string;
  period: string;
  origin: string;
  medium?: string;
  techniques: string[];
  historicalContext: string;
  significance: string;
  primarySourceNotes?: string;
  relatedTopics: string[];
}

// 10. storyboardToOutline
export interface OutlineNode {
  id: string;
  text: string;
  level: number;       // 0 = root, 1 = main branch, etc.
  children: string[];  // ids of child nodes
  notes?: string;
}

export interface StoryboardOutlineResult {
  title: string;
  totalNodes: number;
  nodes: OutlineNode[];
  linearSummary: string;
}
