import type { VisionRequest, VisionResponse } from '../index';
import type { MathDebugResult } from './types';
/**
 * Analyzes a photo of multi-step handwritten math and pinpoints the exact line
 * containing an error, returning the correct formula and a full explanation.
 *
 * @param analyzeImage  - Bound reference to EdPearClient.analyzeImage
 * @param image         - Base64-encoded image string
 */
export declare function debugMathSolution(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string): Promise<MathDebugResult>;
//# sourceMappingURL=debugMathSolution.d.ts.map