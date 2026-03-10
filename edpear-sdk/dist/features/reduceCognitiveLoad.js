"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceCognitiveLoad = reduceCognitiveLoad;
/**
 * Extracts dense textbook or whiteboard text from an image and reformats it
 * into high-contrast, bulleted, dyslexia-friendly markdown.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
async function reduceCognitiveLoad(analyzeImage, image) {
    const prompt = `You are an accessibility and learning-design specialist. The student has a learning difficulty such as dyslexia.
Extract all text and diagrams from this image and reformat them into clean, accessible markdown using:
- Short sentences (max 15 words each)
- Bullet points instead of paragraphs
- Bold key terms
- Clear headings

Return ONLY valid JSON matching this exact schema:
{
  "markdown": "<the fully reformatted markdown string>",
  "keyTerms": ["<term1>", "<term2>"],
  "summary": "<2–3 sentence plain-language summary>",
  "readingLevel": "<e.g. 'Grade 5', 'Simple', 'Technical'>"
}`;
    const response = await analyzeImage({ image, prompt, maxTokens: 1024 });
    const cleaned = response.result
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();
    return JSON.parse(cleaned);
}
//# sourceMappingURL=reduceCognitiveLoad.js.map