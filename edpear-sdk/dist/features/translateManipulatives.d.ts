import type { VisionRequest, VisionResponse } from '../index';
import type { ManipulativesResult } from './types';
/**
 * Analyzes physical educational manipulative blocks or arrangements on a desk
 * (e.g. base-10 blocks, fraction tiles) and returns a structured digital state.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
export declare function translateManipulatives(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string): Promise<ManipulativesResult>;
//# sourceMappingURL=translateManipulatives.d.ts.map