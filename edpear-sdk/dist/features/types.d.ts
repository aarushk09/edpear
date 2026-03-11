export interface MathDebugResult {
    errorAtLine: number;
    incorrectStep: string;
    correctFormula: string;
    explanation: string;
    hints: string[];
}
export interface ConceptVerificationResult {
    matches: boolean;
    confidence: number;
    concept: string;
    explanation: string;
    visualEvidence: string[];
    suggestedCorrection?: string;
}
export interface LabCheckResult {
    overallCorrect: boolean;
    safetyIssues: string[];
    correctnessIssues: string[];
    recommendations: string[];
    riskLevel: 'low' | 'medium' | 'high';
}
export interface Flashcard {
    id: string;
    front: string;
    back: string;
    region: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
}
export interface SpatialFlashcardsResult {
    flashcards: Flashcard[];
    diagramType: string;
    totalCards: number;
}
export interface WhiteboardCodeResult {
    output: string;
    format: 'latex' | 'python' | 'pseudocode' | 'markdown' | string;
    explanation: string;
    variables?: Record<string, string>;
}
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
export interface CognitiveLoadResult {
    markdown: string;
    keyTerms: string[];
    summary: string;
    readingLevel: string;
}
export interface ManipulativeBlock {
    id: string;
    type: string;
    value: string;
    position: string;
    color?: string;
}
export interface ManipulativesResult {
    blocks: ManipulativeBlock[];
    totalValue?: number | string;
    arrangement: string;
    digitalState: Record<string, unknown>;
    interpretation: string;
}
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
export interface OutlineNode {
    id: string;
    text: string;
    level: number;
    children: string[];
    notes?: string;
}
export interface StoryboardOutlineResult {
    title: string;
    totalNodes: number;
    nodes: OutlineNode[];
    linearSummary: string;
}
//# sourceMappingURL=types.d.ts.map