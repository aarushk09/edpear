import type { VisionRequest, VisionResponse } from '../index';
import type { SpatialFlashcardsResult } from './types';

/**
 * Takes a complex educational diagram and returns an array of image-occlusion
 * style flashcard prompts keyed to specific regions of the diagram.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
export async function generateSpatialFlashcards(
  analyzeImage: (req: VisionRequest) => Promise<VisionResponse>,
  image: string
): Promise<SpatialFlashcardsResult> {
  const prompt = `You are an educational content designer. Analyze this diagram and create image-occlusion flashcards.
For each important labeled region, concept, or component, generate one flashcard.
Return ONLY valid JSON matching this exact schema:
{
  "diagramType": "<e.g. 'cell diagram', 'circuit schematic', 'geometric proof'>",
  "totalCards": <integer>,
  "flashcards": [
    {
      "id": "<string, e.g. 'fc-1'>",
      "front": "<question text – ask to identify or explain the region>",
      "back": "<answer text>",
      "region": "<human-readable region descriptor, e.g. 'top-left', 'label A', 'inner circle'>",
      "difficulty": "<easy|medium|hard>",
      "tags": ["<tag1>", "<tag2>"]
    }
  ]
}`;
  const response = await analyzeImage({ image, prompt, maxTokens: 1024 });
  const cleaned = response.result
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  return JSON.parse(cleaned) as SpatialFlashcardsResult;
}
