const express = require('express');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Parse large JSON bodies (base64 images can be large)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Multer – memory storage so we can convert to base64
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

// ─── Helper ──────────────────────────────────────────────────────────────────
function getClient(groqApiKey) {
  const { EdPearClient } = require('@edpear/sdk');
  // Accept key from request body OR fall back to server-side env/config
  return new EdPearClient(groqApiKey ? { groqApiKey } : {});
}

function handleError(res, err) {
  console.error('[SDK Error]', err.message);
  res.status(500).json({ success: false, error: err.message });
}

// ─── Image upload helper endpoint ────────────────────────────────────────────
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });
  const mime = req.file.mimetype || 'image/jpeg';
  const b64 = req.file.buffer.toString('base64');
  res.json({ success: true, base64: `data:${mime};base64,${b64}`, name: req.file.originalname });
});

// ─── 1. debugMathSolution ────────────────────────────────────────────────────
app.post('/api/debug-math', async (req, res) => {
  try {
    const { groqApiKey, image } = req.body;
    const client = getClient(groqApiKey);
    const result = await client.debugMathSolution(image);
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 2. verifyRealWorldConcept ───────────────────────────────────────────────
app.post('/api/verify-concept', async (req, res) => {
  try {
    const { groqApiKey, image, concept } = req.body;
    if (!concept) return res.status(400).json({ success: false, error: 'concept is required' });
    const client = getClient(groqApiKey);
    const result = await client.verifyRealWorldConcept(image, concept);
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 3. checkLabSetup ────────────────────────────────────────────────────────
app.post('/api/lab-check', async (req, res) => {
  try {
    const { groqApiKey, image, experimentType } = req.body;
    if (!experimentType) return res.status(400).json({ success: false, error: 'experimentType is required' });
    const client = getClient(groqApiKey);
    const result = await client.checkLabSetup(image, experimentType);
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 4. generateSpatialFlashcards ────────────────────────────────────────────
app.post('/api/flashcards', async (req, res) => {
  try {
    const { groqApiKey, image } = req.body;
    const client = getClient(groqApiKey);
    const result = await client.generateSpatialFlashcards(image);
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 5. whiteboardToCode ─────────────────────────────────────────────────────
app.post('/api/whiteboard-to-code', async (req, res) => {
  try {
    const { groqApiKey, image, targetFormat } = req.body;
    const client = getClient(groqApiKey);
    const result = await client.whiteboardToCode(image, targetFormat || 'latex');
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 6. gradeVisualRubric ────────────────────────────────────────────────────
app.post('/api/grade-rubric', async (req, res) => {
  try {
    const { groqApiKey, image, rubricConstraints } = req.body;
    const constraints = Array.isArray(rubricConstraints) ? rubricConstraints : [rubricConstraints];
    if (!constraints.length || !constraints[0]) return res.status(400).json({ success: false, error: 'rubricConstraints are required' });
    const client = getClient(groqApiKey);
    const result = await client.gradeVisualRubric(image, constraints.filter(Boolean));
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 7. reduceCognitiveLoad ───────────────────────────────────────────────────
app.post('/api/simplify', async (req, res) => {
  try {
    const { groqApiKey, image } = req.body;
    const client = getClient(groqApiKey);
    const result = await client.reduceCognitiveLoad(image);
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 8. translateManipulatives ───────────────────────────────────────────────
app.post('/api/manipulatives', async (req, res) => {
  try {
    const { groqApiKey, image } = req.body;
    const client = getClient(groqApiKey);
    const result = await client.translateManipulatives(image);
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 9. analyzeHistoricalArtifact ────────────────────────────────────────────
app.post('/api/artifact', async (req, res) => {
  try {
    const { groqApiKey, image } = req.body;
    const client = getClient(groqApiKey);
    const result = await client.analyzeHistoricalArtifact(image);
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── 10. storyboardToOutline ─────────────────────────────────────────────────
app.post('/api/storyboard', async (req, res) => {
  try {
    const { groqApiKey, image } = req.body;
    const client = getClient(groqApiKey);
    const result = await client.storyboardToOutline(image);
    res.json({ success: true, result });
  } catch (err) { handleError(res, err); }
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  const hasKey = !!process.env.GROQ_API_KEY;
  console.log(`\n✅ EdPear SDK Demo running at http://localhost:${PORT}`);
  if (hasKey) {
    console.log(`🔑 Groq API key loaded from .env`);
  } else {
    console.log(`⚠️  No GROQ_API_KEY in .env — enter it in the browser UI`);
  }
  console.log();
});
