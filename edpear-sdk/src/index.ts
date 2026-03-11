import axios, { AxiosResponse } from 'axios';
import type {
  MathDebugResult,
  ConceptVerificationResult,
  LabCheckResult,
  SpatialFlashcardsResult,
  WhiteboardCodeResult,
  VisualRubricResult,
  CognitiveLoadResult,
  ManipulativesResult,
  HistoricalArtifactResult,
  StoryboardOutlineResult,
} from './features/types';

export * from './features/types';

export interface VisionRequest {
  image?: string; // base64 encoded image (optional)
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface VisionResponse {
  success: boolean;
  result: string;
  creditsUsed: number;
  remainingCredits: number;
  processingTime: number;
}

export interface EdPearConfig {
  apiKey: string;
  baseURL?: string;
}

export class EdPearClient {
  private apiKey: string;
  private baseURL: string;

  constructor(config: EdPearConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL || 'https://edpearofficial.vercel.app';
  }

  /**
   * Analyze an image or process text using EdPear's AI
   * @param request - The request containing prompt and optional image
   * @returns Promise<VisionResponse>
   */
  async analyzeImage(request: VisionRequest): Promise<VisionResponse> {
    return this.processRequest(request);
  }

  /**
   * Send a chat/text request to EdPear's AI
   * @param prompt - The text prompt
   * @param options - Optional parameters like maxTokens and temperature
   * @returns Promise<VisionResponse>
   */
  async chat(prompt: string, options?: { maxTokens?: number; temperature?: number }): Promise<VisionResponse> {
    return this.processRequest({
      prompt,
      ...options
    });
  }

  private async processRequest(request: VisionRequest): Promise<VisionResponse> {
    try {
      const response: AxiosResponse<VisionResponse> = await axios.post(
        `${this.baseURL}/api/vision`,
        request,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your EdPear API key.');
      } else if (error.response?.status === 402) {
        throw new Error('Insufficient credits. Please add more credits to your account.');
      } else if (error.response?.status === 400) {
        throw new Error(`Bad request: ${error.response.data.error}`);
      } else {
        throw new Error(`API request failed: ${error.message}`);
      }
    }
  }

  /**
   * Get account status and remaining credits
   * @returns Promise<{credits: number, user: any}>
   */
  async getStatus(): Promise<{ credits: number; user: any }> {
    try {
      const response = await axios.get(`${this.baseURL}/api/user/status`, {
        headers: {
          'x-api-key': this.apiKey,
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get account status: ${error.message}`);
    }
  }

  // ─── Helper ──────────────────────────────────────────────────────────────────

  private parseJsonResult<T>(raw: string): T {
    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    return JSON.parse(cleaned) as T;
  }

  // ─── Feature 1: debugMathSolution ────────────────────────────────────────────

  /**
   * Analyzes a photo of multi-step handwritten math and pinpoints the exact line
   * containing an error, returning the correct formula and an explanation.
   */
  async debugMathSolution(image: string): Promise<MathDebugResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 512 });
    return this.parseJsonResult<MathDebugResult>(response.result);
  }

  // ─── Feature 2: verifyRealWorldConcept ───────────────────────────────────────

  /**
   * Validates whether a user's photograph visually demonstrates a specific
   * physics or geometry concept (e.g. "acute angle", "tension", "buoyancy").
   */
  async verifyRealWorldConcept(image: string, concept: string): Promise<ConceptVerificationResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 512 });
    return this.parseJsonResult<ConceptVerificationResult>(response.result);
  }

  // ─── Feature 3: checkLabSetup ─────────────────────────────────────────────────

  /**
   * Verifies physical lab equipment or circuit wiring against an expected
   * experiment type, reporting safety issues and correctness problems.
   */
  async checkLabSetup(image: string, experimentType: string): Promise<LabCheckResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 512 });
    return this.parseJsonResult<LabCheckResult>(response.result);
  }

  // ─── Feature 4: generateSpatialFlashcards ────────────────────────────────────

  /**
   * Takes a complex educational diagram and returns an array of image-occlusion
   * style flashcard prompts keyed to specific regions of the diagram.
   */
  async generateSpatialFlashcards(image: string): Promise<SpatialFlashcardsResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 1024 });
    return this.parseJsonResult<SpatialFlashcardsResult>(response.result);
  }

  // ─── Feature 5: whiteboardToCode ─────────────────────────────────────────────

  /**
   * Translates whiteboard content: equations → LaTeX, flowcharts → Python
   * pseudocode, or other formats as specified by `targetFormat`.
   */
  async whiteboardToCode(image: string, targetFormat: string = 'latex'): Promise<WhiteboardCodeResult> {
    const prompt = `You are a technical transcription AI. Convert the whiteboard content in this image to ${targetFormat}.
If equations are present, translate them. If flowcharts/logic diagrams are present, convert to ${targetFormat} pseudocode or code.
Return ONLY valid JSON matching this exact schema:
{
  "output": "<the full converted ${targetFormat} output as a single string>",
  "format": "${targetFormat}",
  "explanation": "<brief description of what was on the whiteboard and how it was converted>",
  "variables": { "<varName>": "<description>" }
}`;
    const response = await this.analyzeImage({ image, prompt, maxTokens: 1024 });
    return this.parseJsonResult<WhiteboardCodeResult>(response.result);
  }

  // ─── Feature 6: gradeVisualRubric ────────────────────────────────────────────

  /**
   * Evaluates a creative or technical drawing against an array of rubric
   * constraint strings (e.g. ["has vanishing point", "uses hatching for shade"]).
   */
  async gradeVisualRubric(image: string, rubricConstraints: string[]): Promise<VisualRubricResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 1024 });
    return this.parseJsonResult<VisualRubricResult>(response.result);
  }

  // ─── Feature 7: reduceCognitiveLoad ──────────────────────────────────────────

  /**
   * Extracts dense textbook or whiteboard text from an image and reformats it
   * into high-contrast, bulleted, dyslexia-friendly markdown.
   */
  async reduceCognitiveLoad(image: string): Promise<CognitiveLoadResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 1024 });
    return this.parseJsonResult<CognitiveLoadResult>(response.result);
  }

  // ─── Feature 8: translateManipulatives ───────────────────────────────────────

  /**
   * Analyzes physical educational manipulative blocks or arrangements on a desk
   * (e.g. base-10 blocks, fraction tiles) and returns a digital state object.
   */
  async translateManipulatives(image: string): Promise<ManipulativesResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 768 });
    return this.parseJsonResult<ManipulativesResult>(response.result);
  }

  // ─── Feature 9: analyzeHistoricalArtifact ────────────────────────────────────

  /**
   * Acts as an AR museum docent: identifies a historical artifact, artwork, or
   * primary source document and returns rich contextual information.
   */
  async analyzeHistoricalArtifact(image: string): Promise<HistoricalArtifactResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 768 });
    return this.parseJsonResult<HistoricalArtifactResult>(response.result);
  }

  // ─── Feature 10: storyboardToOutline ─────────────────────────────────────────

  /**
   * Converts a photo of sticky-note storyboards or hand-drawn mind maps into a
   * structured, hierarchical JSON outline.
   */
  async storyboardToOutline(image: string): Promise<StoryboardOutlineResult> {
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
    const response = await this.analyzeImage({ image, prompt, maxTokens: 1024 });
    return this.parseJsonResult<StoryboardOutlineResult>(response.result);
  }
}

// Convenience function for quick setup
export function createEdPearClient(apiKey: string, baseURL?: string): EdPearClient {
  return new EdPearClient({ apiKey, baseURL });
}

// Default export
export default EdPearClient;
