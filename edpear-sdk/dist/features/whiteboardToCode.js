"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whiteboardToCode = whiteboardToCode;
/**
 * Translates whiteboard content to a target format:
 * equations → LaTeX, flowcharts → Python pseudocode, etc.
 *
 * @param analyzeImage  - Bound reference to EdPearClient.analyzeImage
 * @param image         - Base64-encoded image string
 * @param targetFormat  - Target output format: 'latex' | 'python' | 'pseudocode' | 'markdown'
 */
async function whiteboardToCode(analyzeImage, image, targetFormat = 'latex') {
    const prompt = `You are a technical transcription AI. Convert the whiteboard content in this image to ${targetFormat}.
If equations are present, translate them. If flowcharts/logic diagrams are present, convert to ${targetFormat} pseudocode or code.
Return ONLY valid JSON matching this exact schema:
{
  "output": "<the full converted ${targetFormat} output as a single string>",
  "format": "${targetFormat}",
  "explanation": "<brief description of what was on the whiteboard and how it was converted>",
  "variables": { "<varName>": "<description>" }
}`;
    const response = await analyzeImage({ image, prompt, maxTokens: 1024 });
    const cleaned = response.result
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();
    return JSON.parse(cleaned);
}
//# sourceMappingURL=whiteboardToCode.js.map