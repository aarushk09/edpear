#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const os_1 = require("os");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./index");
// Load environment variables from .env or .env.local if they exist
dotenv_1.default.config();
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env.local') });
const program = new commander_1.Command();
// Configuration
const CONFIG_DIR = path_1.default.join((0, os_1.homedir)(), '.edpear');
const CONFIG_FILE = path_1.default.join(CONFIG_DIR, 'config.json');
class EdPearCLI {
    constructor() {
        this.config = {};
        this.loadConfig();
    }
    loadConfig() {
        try {
            if (fs_extra_1.default.existsSync(CONFIG_FILE)) {
                this.config = fs_extra_1.default.readJsonSync(CONFIG_FILE);
            }
        }
        catch (error) {
            // Ignore config loading errors on first run
        }
    }
    saveConfig() {
        try {
            fs_extra_1.default.ensureDirSync(CONFIG_DIR);
            fs_extra_1.default.writeJsonSync(CONFIG_FILE, this.config, { spaces: 2 });
        }
        catch (error) {
            console.error(chalk_1.default.red('Error saving config:'), error);
        }
    }
    // ─── Setup: save Groq API key ─────────────────────────────────────────────
    async setup() {
        console.log(chalk_1.default.blue('🔧 EdPear Setup\n'));
        console.log(chalk_1.default.gray('EdPear uses the Groq API for AI-powered analysis.'));
        console.log(chalk_1.default.gray('Get your free API key at: https://console.groq.com/keys\n'));
        const { groqKey } = await inquirer_1.default.prompt([
            {
                type: 'password',
                name: 'groqKey',
                message: 'Paste your Groq API key:',
                mask: '*',
                validate: (input) => {
                    if (!input.trim())
                        return 'API key is required';
                    if (!input.trim().startsWith('gsk_'))
                        return 'Groq API keys start with "gsk_"';
                    return true;
                },
            },
        ]);
        const key = groqKey.trim();
        // Save to ~/.edpear/config.json (global)
        this.config.groqApiKey = key;
        this.saveConfig();
        console.log(chalk_1.default.green('✅ Saved to ~/.edpear/config.json'));
        // Optionally also save to local .env
        const { saveLocal } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'saveLocal',
                message: 'Also save to .env in the current directory?',
                default: true,
            },
        ]);
        if (saveLocal) {
            this.saveToEnvFile(key);
        }
        console.log(chalk_1.default.green('\n🎉 All set! You can now use all EdPear features.'));
        console.log(chalk_1.default.gray('Try: edpear math-debug <image-path>'));
    }
    saveToEnvFile(groqKey) {
        const envPath = path_1.default.join(process.cwd(), '.env');
        try {
            let envContent = '';
            if (fs_extra_1.default.existsSync(envPath)) {
                envContent = fs_extra_1.default.readFileSync(envPath, 'utf8');
            }
            // Remove existing GROQ_API_KEY if present
            envContent = envContent.replace(/^GROQ_API_KEY=.*$/m, '').trim();
            if (envContent)
                envContent += '\n';
            envContent += `GROQ_API_KEY=${groqKey}\n`;
            fs_extra_1.default.writeFileSync(envPath, envContent);
            console.log(chalk_1.default.green('✅ Saved to .env'));
        }
        catch (error) {
            console.error(chalk_1.default.red('Error saving to .env:'), error);
        }
    }
    async status() {
        console.log(chalk_1.default.blue('📊 EdPear Status\n'));
        const groqKey = this.getGroqKey(true);
        if (groqKey) {
            const masked = groqKey.slice(0, 7) + '...' + groqKey.slice(-4);
            console.log(chalk_1.default.green(`🔑 Groq API Key: ${masked}`));
            const source = process.env.GROQ_API_KEY
                ? '.env / environment'
                : '~/.edpear/config.json';
            console.log(chalk_1.default.gray(`   Source: ${source}`));
        }
        else {
            console.log(chalk_1.default.yellow('🔑 No Groq API key configured'));
            console.log(chalk_1.default.gray('   Run "edpear setup" to get started'));
        }
    }
    // ─── Shared helpers for AI feature commands ──────────────────────────────────
    getGroqKey(silent = false) {
        const envKey = process.env.GROQ_API_KEY;
        if (envKey)
            return envKey;
        if (this.config.groqApiKey)
            return this.config.groqApiKey;
        if (silent)
            return '';
        console.error(chalk_1.default.red('❌ No Groq API key found.'));
        console.error(chalk_1.default.gray('Run "edpear setup" to configure your key.'));
        process.exit(1);
    }
    imageToBase64(filePath) {
        const resolved = path_1.default.resolve(filePath);
        if (!fs_extra_1.default.existsSync(resolved)) {
            console.error(chalk_1.default.red(`❌ Image file not found: ${resolved}`));
            process.exit(1);
        }
        const ext = path_1.default.extname(resolved).toLowerCase().replace('.', '');
        const mimeMap = { jpg: 'jpeg', jpeg: 'jpeg', png: 'png', gif: 'gif', webp: 'webp' };
        const mime = mimeMap[ext] || 'jpeg';
        const data = fs_extra_1.default.readFileSync(resolved).toString('base64');
        return `data:image/${mime};base64,${data}`;
    }
    printResult(label, result) {
        console.log(chalk_1.default.blue(`\n📊 ${label}\n`));
        console.log(JSON.stringify(result, null, 2));
    }
    // ─── Feature 1: math-debug ───────────────────────────────────────────────────
    async mathDebug(imagePath) {
        const spinner = (0, ora_1.default)('Analyzing math solution...').start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.debugMathSolution(image);
            spinner.succeed(chalk_1.default.green('✅ Analysis complete'));
            this.printResult('Math Debug Result', result);
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 2: verify-concept ───────────────────────────────────────────────
    async verifyConcept(imagePath, concept) {
        const spinner = (0, ora_1.default)(`Verifying concept: "${concept}"...`).start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.verifyRealWorldConcept(image, concept);
            spinner.succeed(chalk_1.default.green('✅ Verification complete'));
            this.printResult('Concept Verification', result);
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 3: lab-check ────────────────────────────────────────────────────
    async labCheck(imagePath, experimentType) {
        const spinner = (0, ora_1.default)(`Checking lab setup for: "${experimentType}"...`).start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.checkLabSetup(image, experimentType);
            spinner.succeed(chalk_1.default.green('✅ Lab check complete'));
            this.printResult('Lab Setup Report', result);
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 4: flashcards ───────────────────────────────────────────────────
    async flashcards(imagePath, outputFile) {
        const spinner = (0, ora_1.default)('Generating spatial flashcards...').start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.generateSpatialFlashcards(image);
            spinner.succeed(chalk_1.default.green(`✅ Generated ${result.totalCards} flashcard(s)`));
            this.printResult('Spatial Flashcards', result);
            if (outputFile) {
                fs_extra_1.default.writeJsonSync(outputFile, result, { spaces: 2 });
                console.log(chalk_1.default.gray(`\n💾 Saved to ${outputFile}`));
            }
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 5: whiteboard-to-code ───────────────────────────────────────────
    async whiteboardToCode(imagePath, format) {
        const spinner = (0, ora_1.default)(`Converting whiteboard to ${format}...`).start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.whiteboardToCode(image, format);
            spinner.succeed(chalk_1.default.green('✅ Conversion complete'));
            this.printResult('Whiteboard Conversion', result);
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 6: grade-rubric ─────────────────────────────────────────────────
    async gradeRubric(imagePath, constraints) {
        const spinner = (0, ora_1.default)('Grading against visual rubric...').start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.gradeVisualRubric(image, constraints);
            spinner.succeed(chalk_1.default.green(`✅ Graded: ${result.totalScore}/${result.maxScore} (${result.grade})`));
            this.printResult('Visual Rubric Grade', result);
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 7: simplify ─────────────────────────────────────────────────────
    async simplify(imagePath, outputFile) {
        const spinner = (0, ora_1.default)('Reducing cognitive load...').start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.reduceCognitiveLoad(image);
            spinner.succeed(chalk_1.default.green('✅ Simplified'));
            console.log(chalk_1.default.blue('\n📄 Accessible Markdown:\n'));
            console.log(result.markdown);
            console.log(chalk_1.default.blue('\n🔑 Key Terms:'), result.keyTerms.join(', '));
            console.log(chalk_1.default.blue('📝 Summary:'), result.summary);
            if (outputFile) {
                fs_extra_1.default.writeFileSync(outputFile, result.markdown);
                console.log(chalk_1.default.gray(`\n💾 Markdown saved to ${outputFile}`));
            }
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 8: manipulatives ────────────────────────────────────────────────
    async manipulatives(imagePath) {
        const spinner = (0, ora_1.default)('Translating manipulatives...').start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.translateManipulatives(image);
            spinner.succeed(chalk_1.default.green('✅ Manipulatives translated'));
            this.printResult('Manipulatives State', result);
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 9: artifact ─────────────────────────────────────────────────────
    async artifact(imagePath) {
        const spinner = (0, ora_1.default)('Analyzing historical artifact...').start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.analyzeHistoricalArtifact(image);
            spinner.succeed(chalk_1.default.green(`✅ Identified: ${result.title}`));
            this.printResult('Historical Artifact Analysis', result);
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
    // ─── Feature 10: storyboard ──────────────────────────────────────────────────
    async storyboard(imagePath, outputFile) {
        const spinner = (0, ora_1.default)('Converting storyboard to outline...').start();
        try {
            const client = new index_1.EdPearClient({ groqApiKey: this.getGroqKey() });
            const image = this.imageToBase64(imagePath);
            const result = await client.storyboardToOutline(image);
            spinner.succeed(chalk_1.default.green(`✅ Outline created – ${result.totalNodes} nodes`));
            this.printResult('Storyboard Outline', result);
            if (outputFile) {
                fs_extra_1.default.writeJsonSync(outputFile, result, { spaces: 2 });
                console.log(chalk_1.default.gray(`\n💾 Saved to ${outputFile}`));
            }
        }
        catch (err) {
            spinner.fail(chalk_1.default.red('❌ Failed'));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
    }
}
// CLI Commands
const cli = new EdPearCLI();
program
    .name('edpear')
    .description('EdPear CLI - AI-powered educational components (powered by Groq)')
    .version('1.3.0');
program
    .command('setup')
    .description('Configure your Groq API key (saved to ~/.edpear/config.json and optionally .env)')
    .action(() => cli.setup());
program
    .command('status')
    .description('Show current configuration')
    .action(() => cli.status());
// ─── AI Feature Commands ──────────────────────────────────────────────────────
program
    .command('math-debug <image>')
    .description('Debug a handwritten multi-step math solution and identify the exact error line')
    .action((image) => cli.mathDebug(image));
program
    .command('verify-concept <image> <concept>')
    .description('Verify whether a photo demonstrates a specific physics or geometry concept')
    .action((image, concept) => cli.verifyConcept(image, concept));
program
    .command('lab-check <image> <experimentType>')
    .description('Check lab equipment or circuit wiring for safety and correctness')
    .action((image, experimentType) => cli.labCheck(image, experimentType));
program
    .command('flashcards <image>')
    .description('Generate image-occlusion style flashcards from a complex diagram')
    .option('-o, --output <file>', 'Save flashcards JSON to a file')
    .action((image, options) => cli.flashcards(image, options.output));
program
    .command('whiteboard-to-code <image>')
    .description('Convert whiteboard equations or flowcharts to LaTeX, Python, or pseudocode')
    .option('-f, --format <format>', 'Target format: latex | python | pseudocode | markdown', 'latex')
    .action((image, options) => cli.whiteboardToCode(image, options.format));
program
    .command('grade-rubric <image> <constraints...>')
    .description('Grade a drawing against a list of rubric constraint strings')
    .action((image, constraints) => cli.gradeRubric(image, constraints));
program
    .command('simplify <image>')
    .description('Reformat dense text into dyslexia-friendly accessible markdown')
    .option('-o, --output <file>', 'Save markdown output to a file')
    .action((image, options) => cli.simplify(image, options.output));
program
    .command('manipulatives <image>')
    .description('Translate physical educational block arrangements to a digital state')
    .action((image) => cli.manipulatives(image));
program
    .command('artifact <image>')
    .description('Identify and analyze a historical artifact or artwork as an AR docent')
    .action((image) => cli.artifact(image));
program
    .command('storyboard <image>')
    .description('Convert a sticky-note storyboard or mind-map into a hierarchical JSON outline')
    .option('-o, --output <file>', 'Save outline JSON to a file')
    .action((image, options) => cli.storyboard(image, options.output));
program.parse();
//# sourceMappingURL=cli.js.map