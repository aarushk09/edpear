"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdPearClient = void 0;
exports.createEdPearClient = createEdPearClient;
const axios_1 = __importDefault(require("axios"));
const debugMathSolution_1 = require("./features/debugMathSolution");
const verifyRealWorldConcept_1 = require("./features/verifyRealWorldConcept");
const checkLabSetup_1 = require("./features/checkLabSetup");
const generateSpatialFlashcards_1 = require("./features/generateSpatialFlashcards");
const whiteboardToCode_1 = require("./features/whiteboardToCode");
const gradeVisualRubric_1 = require("./features/gradeVisualRubric");
const reduceCognitiveLoad_1 = require("./features/reduceCognitiveLoad");
const translateManipulatives_1 = require("./features/translateManipulatives");
const analyzeHistoricalArtifact_1 = require("./features/analyzeHistoricalArtifact");
const storyboardToOutline_1 = require("./features/storyboardToOutline");
__exportStar(require("./features/types"), exports);
class EdPearClient {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.baseURL = config.baseURL || 'https://edpearofficial.vercel.app';
    }
    /**
     * Analyze an image or process text using EdPear's AI
     * @param request - The request containing prompt and optional image
     * @returns Promise<VisionResponse>
     */
    async analyzeImage(request) {
        return this.processRequest(request);
    }
    /**
     * Send a chat/text request to EdPear's AI
     * @param prompt - The text prompt
     * @param options - Optional parameters like maxTokens and temperature
     * @returns Promise<VisionResponse>
     */
    async chat(prompt, options) {
        return this.processRequest({
            prompt,
            ...options
        });
    }
    async processRequest(request) {
        try {
            const response = await axios_1.default.post(`${this.baseURL}/api/vision`, request, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                },
            });
            return response.data;
        }
        catch (error) {
            if (error.response?.status === 401) {
                throw new Error('Invalid API key. Please check your EdPear API key.');
            }
            else if (error.response?.status === 402) {
                throw new Error('Insufficient credits. Please add more credits to your account.');
            }
            else if (error.response?.status === 400) {
                throw new Error(`Bad request: ${error.response.data.error}`);
            }
            else {
                throw new Error(`API request failed: ${error.message}`);
            }
        }
    }
    /**
     * Get account status and remaining credits
     * @returns Promise<{credits: number, user: any}>
     */
    async getStatus() {
        try {
            const response = await axios_1.default.get(`${this.baseURL}/api/user/status`, {
                headers: {
                    'x-api-key': this.apiKey,
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to get account status: ${error.message}`);
        }
    }
    // ─── Helper ──────────────────────────────────────────────────────────────────
    parseJsonResult(raw) {
        // Strip markdown code fences if present
        const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
        return JSON.parse(cleaned);
    }
    // ─── Feature 1: debugMathSolution ────────────────────────────────────────────
    /**
     * Analyzes a photo of multi-step handwritten math and pinpoints the exact line
     * containing an error, returning the correct formula and an explanation.
     */
    async debugMathSolution(image) {
        return (0, debugMathSolution_1.debugMathSolution)(this.analyzeImage.bind(this), image);
    }
    // ─── Feature 2: verifyRealWorldConcept ───────────────────────────────────────
    /**
     * Validates whether a user's photograph visually demonstrates a specific
     * physics or geometry concept (e.g. "acute angle", "tension", "buoyancy").
     */
    async verifyRealWorldConcept(image, concept) {
        return (0, verifyRealWorldConcept_1.verifyRealWorldConcept)(this.analyzeImage.bind(this), image, concept);
    }
    // ─── Feature 3: checkLabSetup ─────────────────────────────────────────────────
    /**
     * Verifies physical lab equipment or circuit wiring against an expected
     * experiment type, reporting safety issues and correctness problems.
     */
    async checkLabSetup(image, experimentType) {
        return (0, checkLabSetup_1.checkLabSetup)(this.analyzeImage.bind(this), image, experimentType);
    }
    // ─── Feature 4: generateSpatialFlashcards ────────────────────────────────────
    /**
     * Takes a complex educational diagram and returns an array of image-occlusion
     * style flashcard prompts keyed to specific regions of the diagram.
     */
    async generateSpatialFlashcards(image) {
        return (0, generateSpatialFlashcards_1.generateSpatialFlashcards)(this.analyzeImage.bind(this), image);
    }
    // ─── Feature 5: whiteboardToCode ─────────────────────────────────────────────
    /**
     * Translates whiteboard content: equations → LaTeX, flowcharts → Python
     * pseudocode, or other formats as specified by `targetFormat`.
     */
    async whiteboardToCode(image, targetFormat = 'latex') {
        return (0, whiteboardToCode_1.whiteboardToCode)(this.analyzeImage.bind(this), image, targetFormat);
    }
    // ─── Feature 6: gradeVisualRubric ────────────────────────────────────────────
    /**
     * Evaluates a creative or technical drawing against an array of rubric
     * constraint strings (e.g. ["has vanishing point", "uses hatching for shade"]).
     */
    async gradeVisualRubric(image, rubricConstraints) {
        return (0, gradeVisualRubric_1.gradeVisualRubric)(this.analyzeImage.bind(this), image, rubricConstraints);
    }
    // ─── Feature 7: reduceCognitiveLoad ──────────────────────────────────────────
    /**
     * Extracts dense textbook or whiteboard text from an image and reformats it
     * into high-contrast, bulleted, dyslexia-friendly markdown.
     */
    async reduceCognitiveLoad(image) {
        return (0, reduceCognitiveLoad_1.reduceCognitiveLoad)(this.analyzeImage.bind(this), image);
    }
    // ─── Feature 8: translateManipulatives ───────────────────────────────────────
    /**
     * Analyzes physical educational manipulative blocks or arrangements on a desk
     * (e.g. base-10 blocks, fraction tiles) and returns a digital state object.
     */
    async translateManipulatives(image) {
        return (0, translateManipulatives_1.translateManipulatives)(this.analyzeImage.bind(this), image);
    }
    // ─── Feature 9: analyzeHistoricalArtifact ────────────────────────────────────
    /**
     * Acts as an AR museum docent: identifies a historical artifact, artwork, or
     * primary source document and returns rich contextual information.
     */
    async analyzeHistoricalArtifact(image) {
        return (0, analyzeHistoricalArtifact_1.analyzeHistoricalArtifact)(this.analyzeImage.bind(this), image);
    }
    // ─── Feature 10: storyboardToOutline ─────────────────────────────────────────
    /**
     * Converts a photo of sticky-note storyboards or hand-drawn mind maps into a
     * structured, hierarchical JSON outline.
     */
    async storyboardToOutline(image) {
        return (0, storyboardToOutline_1.storyboardToOutline)(this.analyzeImage.bind(this), image);
    }
}
exports.EdPearClient = EdPearClient;
// Convenience function for quick setup
function createEdPearClient(apiKey, baseURL) {
    return new EdPearClient({ apiKey, baseURL });
}
// Default export
exports.default = EdPearClient;
//# sourceMappingURL=index.js.map