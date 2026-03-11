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
export async function checkLabSetup(
  analyzeImage: (req: VisionRequest) => Promise<VisionResponse>,
  image: string,
  experimentType: string
): Promise<LabCheckResult> {
  const prompt = `You are a lab safety and accuracy inspector. The student is setting up a "${experimentType}" experiment.
Examine the photo of their lab setup or circuit wiring.
Return ONLY valid JSON matching this exact schema:
{
  "overallCorrect": <true|false>,
  "safetyIssues": ["<issue 1>", "<issue 2>"],
  "correctnessIssues": ["<issue 1>", "<issue 2>"],
  "recommendations": ["<recommendation 1>", "<recommendation 2>"],
  "riskLevel": "<low|medium|high>"
}
If there are no issues in a list, return an empty array [].`;
  const response = await analyzeImage({ image, prompt, maxTokens: 512 });
  const cleaned = response.result
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  return JSON.parse(cleaned) as LabCheckResult;
}
