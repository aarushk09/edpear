"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugMathSolution = debugMathSolution;
/**
 * Analyzes a photo of multi-step handwritten math and pinpoints the exact line
 * containing an error, returning the correct formula and a full explanation.
 *
 * @param analyzeImage  - Bound reference to EdPearClient.analyzeImage
 * @param image         - Base64-encoded image string
 */
async function debugMathSolution(analyzeImage, image) {
    const prompt = `You are a math tutoring AI. Carefully examine this handwritten multi-step math solution.
Identify the FIRST line where an error occurs.
Return ONLY valid JSON (no markdown fences) matching this exact schema:
{
  "errorAtLine": <integer – 1-indexed line number, or 0 if no error>,
  "incorrectStep": "<the erroneous expression or equation as written>",
  "correctFormula": "<the corrected expression or equation>",
  "explanation": "<brief explanation of the mistake>",
  "hints": ["<hint 1>", "<hint 2>"]
}`;
    const response = await analyzeImage({ image, prompt, maxTokens: 512 });
    const cleaned = response.result
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();
    return JSON.parse(cleaned);
}
//# sourceMappingURL=debugMathSolution.js.map