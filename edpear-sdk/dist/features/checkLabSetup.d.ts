import type { VisionRequest, VisionResponse } from '../index';
import type { LabCheckResult } from './types';
/**
 * Verifies physical lab equipment or circuit wiring against an expected
 * experiment type, reporting safety issues and correctness problems.
 *
 * @param analyzeImage   - Bound reference to EdPearClient.analyzeImage
 * @param image          - Base64-encoded image string
 * @param experimentType - Description of the target experiment (e.g. "series circuit")
 */
export declare function checkLabSetup(analyzeImage: (req: VisionRequest) => Promise<VisionResponse>, image: string, experimentType: string): Promise<LabCheckResult>;
//# sourceMappingURL=checkLabSetup.d.ts.map