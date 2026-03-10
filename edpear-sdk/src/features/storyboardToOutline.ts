import type { VisionRequest, VisionResponse } from '../index';
import type { StoryboardOutlineResult } from './types';

/**
 * Converts a photo of sticky-note storyboards or hand-drawn mind maps into a
 * structured, hierarchical JSON outline.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
export async function storyboardToOutline(
  analyzeImage: (req: VisionRequest) => Promise<VisionResponse>,
  image: string
): Promise<StoryboardOutlineResult> {
  const prompt = `You are an information architect and project-planning AI. Analyze this image of sticky notes, a whiteboard mind map, or a hand-drawn storyboard.
Convert the visual structure into a hierarchical text outline.
Return ONLY valid JSON matching this exact schema:
{
  "title": "<inferred overall topic or project title>",
  "totalNodes": <integer>,
  "nodes": [
    {
      "id": "<string, e.g. 'n-0'>",
      "text": "<the text content of this node or sticky note>",
      "level": <0 for root, 1 for main branches, 2 for sub-items, etc.>,
      "children": ["<child node id 1>", "<child node id 2>"],
      "notes": "<any extra annotation or arrow text>"
    }
  ],
  "linearSummary": "<a paragraph describing the outline in reading order>"
}
Ensure the nodes array includes the root node (level 0) and all descendant nodes.`;
  const response = await analyzeImage({ image, prompt, maxTokens: 1024 });
  const cleaned = response.result
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  return JSON.parse(cleaned) as StoryboardOutlineResult;
}
