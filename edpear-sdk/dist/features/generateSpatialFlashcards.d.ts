import type { VisionRequest, VisionResponse } from '../index';
import type { SpatialFlashcardsResult } from './types';
/**
 * Takes a complex educational diagram and returns an array of image-occlusion
 * style flashcard prompts keyed to specific regions of the diagram.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
export declare function generateSpatialFlashcards(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string): Promise<SpatialFlashcardsResult>;
//# sourceMappingURL=generateSpatialFlashcards.d.ts.map