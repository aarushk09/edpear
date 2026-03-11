import type { VisionRequest, VisionResponse } from '../index';
import type { StoryboardOutlineResult } from './types';
/**
 * Converts a photo of sticky-note storyboards or hand-drawn mind maps into a
 * structured, hierarchical JSON outline.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
export declare function storyboardToOutline(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string): Promise<StoryboardOutlineResult>;
//# sourceMappingURL=storyboardToOutline.d.ts.map