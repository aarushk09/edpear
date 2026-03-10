"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRealWorldConcept = verifyRealWorldConcept;
/**
 * Validates whether a user's photograph visually demonstrates a specific
 * physics or geometry concept (e.g. "acute angle", "tension", "buoyancy").
 *
 * @param analyzeImage - Bound reference to EdPearClient.analyzeImage
 * @param image        - Base64-encoded image string
 * @param concept      - The concept to verify (e.g. "acute angle")
 */
async function verifyRealWorldConcept(analyzeImage, image, concept) {
    const prompt = `You are a science and geometry tutor. The student claims this photo demonstrates the concept: "${concept}".
Assess whether the image genuinely illustrates that concept.
Return ONLY valid JSON matching this exact schema:
{
  "matches": <true|false>,
  "confidence": <float 0.0–1.0>,
  "concept": "${concept}",
  "explanation": "<why it matches or does not>",
  "visualEvidence": ["<evidence item 1>", "<evidence item 2>"],
  "suggestedCorrection": "<optional – what the student should change to correctly show the concept>"
}`;
    const response = await analyzeImage({ image, prompt, maxTokens: 512 });
    const cleaned = response.result
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();
    return JSON.parse(cleaned);
}
//# sourceMappingURL=verifyRealWorldConcept.js.map