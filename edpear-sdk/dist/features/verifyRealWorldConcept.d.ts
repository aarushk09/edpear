import type { VisionRequest, VisionResponse } from '../index';
import type { ConceptVerificationResult } from './types';
/**
 * Validates whether a user's photograph visually demonstrates a specific
 * physics or geometry concept (e.g. "acute angle", "tension", "buoyancy").
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 * @param concept      - The concept to verify (e.g. "acute angle")
 */
export declare function verifyRealWorldConcept(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string, concept: string): Promise<ConceptVerificationResult>;
//# sourceMappingURL=verifyRealWorldConcept.d.ts.map