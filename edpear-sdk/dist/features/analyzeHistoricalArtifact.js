"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeHistoricalArtifact = analyzeHistoricalArtifact;
/**
 * Acts as an AR museum docent: identifies a historical artifact, artwork, or
 * primary source document and returns rich contextual information.
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 */
async function analyzeHistoricalArtifact(analyzeImage, image) {
    const prompt = `You are an expert museum docent, historian, and art critic. Analyze this image of a historical artifact, artwork, or primary source document.
Provide detailed educational context as if narrating for an AR museum experience.
Return ONLY valid JSON matching this exact schema:
{
  "title": "<name or title of the artifact/work, or best description if unknown>",
  "period": "<historical period or date range>",
  "origin": "<geographic or cultural origin>",
  "medium": "<materials used, e.g. 'oil on canvas', 'bronze', 'papyrus'>",
  "techniques": ["<technique 1>", "<technique 2>"],
  "historicalContext": "<2–4 sentences on the historical context>",
  "significance": "<why this is historically or culturally important>",
  "primarySourceNotes": "<if applicable – translation excerpt or document summary>",
  "relatedTopics": ["<topic 1>", "<topic 2>"]
}`;
    const response = await analyzeImage({ image, prompt, maxTokens: 768 });
    const cleaned = response.result
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();
    return JSON.parse(cleaned);
}
//# sourceMappingURL=analyzeHistoricalArtifact.js.map