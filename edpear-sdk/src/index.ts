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
import { debugMathSolution as _debugMathSolution } from './features/debugMathSolution';
import { verifyRealWorldConcept as _verifyRealWorldConcept } from './features/verifyRealWorldConcept';
import { checkLabSetup as _checkLabSetup } from './features/checkLabSetup';
import { generateSpatialFlashcards as _generateSpatialFlashcards } from './features/generateSpatialFlashcards';
import { whiteboardToCode as _whiteboardToCode } from './features/whiteboardToCode';
import { gradeVisualRubric as _gradeVisualRubric } from './features/gradeVisualRubric';
import { reduceCognitiveLoad as _reduceCognitiveLoad } from './features/reduceCognitiveLoad';
import { translateManipulatives as _translateManipulatives } from './features/translateManipulatives';
import { analyzeHistoricalArtifact as _analyzeHistoricalArtifact } from './features/analyzeHistoricalArtifact';
import { storyboardToOutline as _storyboardToOutline } from './features/storyboardToOutline';

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
    return _debugMathSolution(this.analyzeImage.bind(this), image);
  }

  // ─── Feature 2: verifyRealWorldConcept ───────────────────────────────────────

  /**
   * Validates whether a user's photograph visually demonstrates a specific
   * physics or geometry concept (e.g. "acute angle", "tension", "buoyancy").
   */
  async verifyRealWorldConcept(image: string, concept: string): Promise<ConceptVerificationResult> {
    return _verifyRealWorldConcept(this.analyzeImage.bind(this), image, concept);
  }

  // ─── Feature 3: checkLabSetup ─────────────────────────────────────────────────

  /**
   * Verifies physical lab equipment or circuit wiring against an expected
   * experiment type, reporting safety issues and correctness problems.
   */
  async checkLabSetup(image: string, experimentType: string): Promise<LabCheckResult> {
    return _checkLabSetup(this.analyzeImage.bind(this), image, experimentType);
  }

  // ─── Feature 4: generateSpatialFlashcards ────────────────────────────────────

  /**
   * Takes a complex educational diagram and returns an array of image-occlusion
   * style flashcard prompts keyed to specific regions of the diagram.
   */
  async generateSpatialFlashcards(image: string): Promise<SpatialFlashcardsResult> {
    return _generateSpatialFlashcards(this.analyzeImage.bind(this), image);
  }

  // ─── Feature 5: whiteboardToCode ─────────────────────────────────────────────

  /**
   * Translates whiteboard content: equations → LaTeX, flowcharts → Python
   * pseudocode, or other formats as specified by `targetFormat`.
   */
  async whiteboardToCode(image: string, targetFormat: string = 'latex'): Promise<WhiteboardCodeResult> {
    return _whiteboardToCode(this.analyzeImage.bind(this), image, targetFormat);
  }

  // ─── Feature 6: gradeVisualRubric ────────────────────────────────────────────

  /**
   * Evaluates a creative or technical drawing against an array of rubric
   * constraint strings (e.g. ["has vanishing point", "uses hatching for shade"]).
   */
  async gradeVisualRubric(image: string, rubricConstraints: string[]): Promise<VisualRubricResult> {
    return _gradeVisualRubric(this.analyzeImage.bind(this), image, rubricConstraints);
  }

  // ─── Feature 7: reduceCognitiveLoad ──────────────────────────────────────────

  /**
   * Extracts dense textbook or whiteboard text from an image and reformats it
   * into high-contrast, bulleted, dyslexia-friendly markdown.
   */
  async reduceCognitiveLoad(image: string): Promise<CognitiveLoadResult> {
    return _reduceCognitiveLoad(this.analyzeImage.bind(this), image);
  }

  // ─── Feature 8: translateManipulatives ───────────────────────────────────────

  /**
   * Analyzes physical educational manipulative blocks or arrangements on a desk
   * (e.g. base-10 blocks, fraction tiles) and returns a digital state object.
   */
  async translateManipulatives(image: string): Promise<ManipulativesResult> {
    return _translateManipulatives(this.analyzeImage.bind(this), image);
  }

  // ─── Feature 9: analyzeHistoricalArtifact ────────────────────────────────────

  /**
   * Acts as an AR museum docent: identifies a historical artifact, artwork, or
   * primary source document and returns rich contextual information.
   */
  async analyzeHistoricalArtifact(image: string): Promise<HistoricalArtifactResult> {
    return _analyzeHistoricalArtifact(this.analyzeImage.bind(this), image);
  }

  // ─── Feature 10: storyboardToOutline ─────────────────────────────────────────

  /**
   * Converts a photo of sticky-note storyboards or hand-drawn mind maps into a
   * structured, hierarchical JSON outline.
   */
  async storyboardToOutline(image: string): Promise<StoryboardOutlineResult> {
    return _storyboardToOutline(this.analyzeImage.bind(this), image);
  }
}

// Convenience function for quick setup
export function createEdPearClient(apiKey: string, baseURL?: string): EdPearClient {
  return new EdPearClient({ apiKey, baseURL });
}

// Default export
export default EdPearClient;
