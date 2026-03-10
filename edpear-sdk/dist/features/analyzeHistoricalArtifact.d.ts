import type { VisionRequest, VisionResponse } from '../index';
import type { HistoricalArtifactResult } from './types';
/**
 * Acts as an AR museum docent: identifies a historical artifact, artwork, or
 * primary source document and returns rich contextual information.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
export declare function analyzeHistoricalArtifact(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string): Promise<HistoricalArtifactResult>;
//# sourceMappingURL=analyzeHistoricalArtifact.d.ts.map