import type { VisionRequest, VisionResponse } from '../index';
import type { ManipulativesResult } from './types';

/**
 * Analyzes physical educational manipulative blocks or arrangements on a desk
 * (e.g. base-10 blocks, fraction tiles) and returns a structured digital state.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
export async function translateManipulatives(
  analyzeImage: (req: VisionRequest) => Promise<VisionResponse>,
  image: string
): Promise<ManipulativesResult> {
  const prompt = `You are an educational manipulative interpreter. Analyze this photo of physical educational objects (blocks, tiles, counters, etc.) arranged on a surface.
Identify each individual piece, its type, value, and position.
Return ONLY valid JSON matching this exact schema:
{
  "blocks": [
    {
      "id": "<string, e.g. 'b-1'>",
      "type": "<e.g. 'tens-block', 'unit-cube', 'fraction-tile', 'pattern-tile'>",
      "value": "<numeric or label value>",
      "position": "<human-readable position, e.g. 'row 1 col 2'>",
      "color": "<color if identifiable>"
    }
  ],
  "totalValue": "<numeric total or expression if applicable>",
  "arrangement": "<description of the overall arrangement or pattern>",
  "digitalState": { "<key>": "<value>" },
  "interpretation": "<what mathematical or educational concept this arrangement represents>"
}`;
  const response = await analyzeImage({ image, prompt, maxTokens: 768 });
  const cleaned = response.result
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  return JSON.parse(cleaned) as ManipulativesResult;
}
