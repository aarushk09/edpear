import type { VisionRequest, VisionResponse } from '../index';
import type { WhiteboardCodeResult } from './types';
/**
 * Translates whiteboard content to a target format:
 * equations → LaTeX, flowcharts → Python pseudocode, etc.
 *
 * @param analyzeImage  - Bound reference to EdPearClient.analyzeImage
 * @param image         - Base64-encoded image string
 * @param targetFormat  - Target output format: 'latex' | 'python' | 'pseudocode' | 'markdown'
 */
export declare function whiteboardToCode(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string, targetFormat?: string): Promise<WhiteboardCodeResult>;
//# sourceMappingURL=whiteboardToCode.d.ts.map