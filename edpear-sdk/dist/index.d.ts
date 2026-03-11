import type { MathDebugResult, ConceptVerificationResult, LabCheckResult, SpatialFlashcardsResult, WhiteboardCodeResult, VisualRubricResult, CognitiveLoadResult, ManipulativesResult, HistoricalArtifactResult, StoryboardOutlineResult } from './features/types';
export * from './features/types';
export interface VisionRequest {
    image?: string;
    prompt: string;
    maxTokens?: number;
    temperature?: number;
}
export interface VisionResponse {
    success: boolean;
    result: string;
    processingTime: number;
}
export interface EdPearConfig {
    groqApiKey?: string;
    model?: string;
}
export declare class EdPearClient {
    private groqApiKey;
    private model;
    constructor(config?: EdPearConfig);
    analyzeImage(request: VisionRequest): Promise<VisionResponse>;
    chat(prompt: string, options?: {
        maxTokens?: number;
        temperature?: number;
    }): Promise<VisionResponse>;
    private processRequest;
    /**
     * Analyzes a photo of multi-step handwritten math and pinpoints the exact line
     * containing an error, returning the correct formula and an explanation.
     */
    debugMathSolution(image: string): Promise<MathDebugResult>;
    /**
     * Validates whether a user's photograph visually demonstrates a specific
     * physics or geometry concept (e.g. "acute angle", "tension", "buoyancy").
     */
    verifyRealWorldConcept(image: string, concept: string): Promise<ConceptVerificationResult>;
    /**
     * Verifies physical lab equipment or circuit wiring against an expected
     * experiment type, reporting safety issues and correctness problems.
     */
    checkLabSetup(image: string, experimentType: string): Promise<LabCheckResult>;
    /**
     * Takes a complex educational diagram and returns an array of image-occlusion
     * style flashcard prompts keyed to specific regions of the diagram.
     */
    generateSpatialFlashcards(image: string): Promise<SpatialFlashcardsResult>;
    /**
     * Translates whiteboard content: equations → LaTeX, flowcharts → Python
     * pseudocode, or other formats as specified by `targetFormat`.
     */
    whiteboardToCode(image: string, targetFormat?: string): Promise<WhiteboardCodeResult>;
    /**
     * Evaluates a creative or technical drawing against an array of rubric
     * constraint strings (e.g. ["has vanishing point", "uses hatching for shade"]).
     */
    gradeVisualRubric(image: string, rubricConstraints: string[]): Promise<VisualRubricResult>;
    /**
     * Extracts dense textbook or whiteboard text from an image and reformats it
     * into high-contrast, bulleted, dyslexia-friendly markdown.
     */
    reduceCognitiveLoad(image: string): Promise<CognitiveLoadResult>;
    /**
     * Analyzes physical educational manipulative blocks or arrangements on a desk
     * (e.g. base-10 blocks, fraction tiles) and returns a digital state object.
     */
    translateManipulatives(image: string): Promise<ManipulativesResult>;
    /**
     * Acts as an AR museum docent: identifies a historical artifact, artwork, or
     * primary source document and returns rich contextual information.
     */
    analyzeHistoricalArtifact(image: string): Promise<HistoricalArtifactResult>;
    /**
     * Converts a photo of sticky-note storyboards or hand-drawn mind maps into a
     * structured, hierarchical JSON outline.
     */
    storyboardToOutline(image: string): Promise<StoryboardOutlineResult>;
}
export declare function createEdPearClient(groqApiKey?: string): EdPearClient;
export default EdPearClient;
//# sourceMappingURL=index.d.ts.map