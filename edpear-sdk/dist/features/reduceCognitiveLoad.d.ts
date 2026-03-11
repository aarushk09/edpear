import type { VisionRequest, VisionResponse } from '../index';
import type { CognitiveLoadResult } from './types';
/**
 * Extracts dense textbook or whiteboard text from an image and reformats it
 * into high-contrast, bulleted, dyslexia-friendly markdown.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
export declare function reduceCognitiveLoad(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string): Promise<CognitiveLoadResult>;
//# sourceMappingURL=reduceCognitiveLoad.d.ts.map