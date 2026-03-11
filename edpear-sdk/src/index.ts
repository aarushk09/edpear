import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { homedir } from 'os';
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

// Auto-load .env / .env.local from cwd
dotenv.config();
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

export * from './features/types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_VISION_MODEL = 'llama-3.2-11b-vision-preview';
const DEFAULT_TEXT_MODEL = 'llama3-8b-8192';

const SYSTEM_PROMPT = `You are EdPear Vision AI, a specialized AI assistant for educational technology applications. You excel at analyzing educational content in images, providing clear explanations, and returning structured JSON when asked. Always provide accurate, educational responses.`;

export interface VisionRequest {
  image?: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface VisionResponse {
  success: boolean;
  result: string;
  processingTime: number;
}

export interface EdPearConfig {
  groqApiKey?: string;
  model?: string;
}

/**
 * Resolves the Groq API key from (in priority order):
 * 1. Explicit parameter
 * 2. GROQ_API_KEY environment variable
 * 3. ~/.edpear/config.json → groqApiKey field
 */
function resolveGroqKey(explicit?: string): string {
  if (explicit) return explicit;
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
  try {
    const cfgPath = path.join(homedir(), '.edpear', 'config.json');
    if (fs.existsSync(cfgPath)) {
      const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'));
      if (cfg.groqApiKey) return cfg.groqApiKey;
    }
  } catch { /* ignore */ }
  throw new Error(
    'Groq API key not found. Run "npx edpear setup" to configure it, ' +
    'or set the GROQ_API_KEY environment variable.'
  );
}

export class EdPearClient {
  private groqApiKey: string;
  private model: string | undefined;

  constructor(config: EdPearConfig = {}) {
    this.groqApiKey = resolveGroqKey(config.groqApiKey);
    this.model = config.model;
  }

  async analyzeImage(request: VisionRequest): Promise<VisionResponse> {
    return this.processRequest(request);
  }

  async chat(prompt: string, options?: { maxTokens?: number; temperature?: number }): Promise<VisionResponse> {
    return this.processRequest({ prompt, ...options });
  }

  private async processRequest(request: VisionRequest): Promise<VisionResponse> {
    const hasImage = !!request.image;
    const model = this.model || (hasImage ? DEFAULT_VISION_MODEL : DEFAULT_TEXT_MODEL);

    // Build user content
    let userContent: any;
    if (hasImage) {
      // Normalise image: ensure it's a data-URI
      let imageUrl = request.image!;
      if (!imageUrl.startsWith('data:')) {
        imageUrl = `data:image/jpeg;base64,${imageUrl}`;
      }
      userContent = [
        { type: 'text', text: request.prompt },
        { type: 'image_url', image_url: { url: imageUrl } },
      ];
    } else {
      userContent = request.prompt;
    }

    const startTime = Date.now();
    try {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userContent },
          ],
          max_tokens: request.maxTokens || 1024,
          temperature: request.temperature || 0.7,
          stream: false,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.groqApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        result: response.data.choices[0].message.content,
        processingTime: Date.now() - startTime,
      };
    } catch (error: any) {
      const msg = error.response?.data?.error?.message || error.message;
      if (error.response?.status === 401) {
        throw new Error('Invalid Groq API key. Run "npx edpear setup" to reconfigure.');
      }
      throw new Error(`Groq API request failed: ${msg}`);
    }
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
export function createEdPearClient(groqApiKey?: string): EdPearClient {
  return new EdPearClient({ groqApiKey });
}

// Default export
export default EdPearClient;
