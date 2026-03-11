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
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = require("os");
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
// Auto-load .env / .env.local from cwd
dotenv_1.default.config();
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env.local') });
__exportStar(require("./features/types"), exports);
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_VISION_MODEL = 'llama-3.2-11b-vision-preview';
const DEFAULT_TEXT_MODEL = 'llama3-8b-8192';
const SYSTEM_PROMPT = `You are EdPear Vision AI, a specialized AI assistant for educational technology applications. You excel at analyzing educational content in images, providing clear explanations, and returning structured JSON when asked. Always provide accurate, educational responses.`;
/**
 * Resolves the Groq API key from (in priority order):
 * 1. Explicit parameter
 * 2. GROQ_API_KEY environment variable
 * 3. ~/.edpear/config.json → groqApiKey field
 */
function resolveGroqKey(explicit) {
    if (explicit)
        return explicit;
    if (process.env.GROQ_API_KEY)
        return process.env.GROQ_API_KEY;
    try {
        const cfgPath = path_1.default.join((0, os_1.homedir)(), '.edpear', 'config.json');
        if (fs_1.default.existsSync(cfgPath)) {
            const cfg = JSON.parse(fs_1.default.readFileSync(cfgPath, 'utf-8'));
            if (cfg.groqApiKey)
                return cfg.groqApiKey;
        }
    }
    catch { /* ignore */ }
    throw new Error('Groq API key not found. Run "npx edpear setup" to configure it, ' +
        'or set the GROQ_API_KEY environment variable.');
}
class EdPearClient {
    constructor(config = {}) {
        this.groqApiKey = resolveGroqKey(config.groqApiKey);
        this.model = config.model;
    }
    async analyzeImage(request) {
        return this.processRequest(request);
    }
    async chat(prompt, options) {
        return this.processRequest({ prompt, ...options });
    }
    async processRequest(request) {
        const hasImage = !!request.image;
        const model = this.model || (hasImage ? DEFAULT_VISION_MODEL : DEFAULT_TEXT_MODEL);
        // Build user content
        let userContent;
        if (hasImage) {
            // Normalise image: ensure it's a data-URI
            let imageUrl = request.image;
            if (!imageUrl.startsWith('data:')) {
                imageUrl = `data:image/jpeg;base64,${imageUrl}`;
            }
            userContent = [
                { type: 'text', text: request.prompt },
                { type: 'image_url', image_url: { url: imageUrl } },
            ];
        }
        else {
            userContent = request.prompt;
        }
        const startTime = Date.now();
        try {
            const response = await axios_1.default.post(GROQ_API_URL, {
                model,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userContent },
                ],
                max_tokens: request.maxTokens || 1024,
                temperature: request.temperature || 0.7,
                stream: false,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.groqApiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                success: true,
                result: response.data.choices[0].message.content,
                processingTime: Date.now() - startTime,
            };
        }
        catch (error) {
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
function createEdPearClient(groqApiKey) {
    return new EdPearClient({ groqApiKey });
}
// Default export
exports.default = EdPearClient;
//# sourceMappingURL=index.js.map