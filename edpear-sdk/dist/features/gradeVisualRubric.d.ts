import type { VisionRequest, VisionResponse } from '../index';
import type { VisualRubricResult } from './types';
/**
 * Evaluates a creative or technical drawing against an array of rubric
 * constraint strings (e.g. ["has vanishing point", "uses hatching for shade"]).
 *
 * @param analyzeImage       - Bound reference to EdPearClient.analyzeImage
 * @param image              - Base64-encoded image string
 * @param rubricConstraints  - Array of constraint descriptions to evaluate
 */
export declare function gradeVisualRubric(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string, rubricConstraints: string[]): Promise<VisualRubricResult>;
//# sourceMappingURL=gradeVisualRubric.d.ts.map