import type { VisionRequest, VisionResponse } from '../index';
import type { VisualRubricResult } from './types';

/**
 * Evaluates a creative or technical drawing against an array of rubric
 * constraint strings (e.g. ["has vanishing point", "uses hatching for shade"]).
 *
 * @param analyzeImage       - Bound reference to EdPearClient.analyzeImage
 * @param image              - Base64-encoded image string
 * @param rubricConstraints  - Array of constraint descriptions to evaluate
 */
export async function gradeVisualRubric(
  analyzeImage: (req: VisionRequest) => Promise<VisionResponse>,
  image: string,
  rubricConstraints: string[]
): Promise<VisualRubricResult> {
  const constraintList = rubricConstraints.map((c, i) => `${i + 1}. ${c}`).join('\n');
  const prompt = `You are an art and technical drawing evaluator. Grade this drawing against the following rubric constraints:
${constraintList}

For each constraint, assign a score of 0 (not met), 1 (partially met), or 2 (fully met).
Return ONLY valid JSON matching this exact schema:
{
  "totalScore": <integer>,
  "maxScore": ${rubricConstraints.length * 2},
  "percentage": <float 0–100>,
  "grade": "<A/B/C/D/F or descriptive>",
  "breakdown": [
    {
      "constraint": "<constraint text>",
      "passed": <true|false>,
      "score": <0|1|2>,
      "maxScore": 2,
      "feedback": "<specific feedback>"
    }
  ],
  "overallFeedback": "<paragraph of overall feedback>"
}`;
  const response = await analyzeImage({ image, prompt, maxTokens: 1024 });
  const cleaned = response.result
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  return JSON.parse(cleaned) as VisualRubricResult;
}
