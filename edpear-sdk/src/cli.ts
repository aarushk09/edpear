#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { homedir } from 'os';
import dotenv from 'dotenv';
import { EdPearClient } from './index';

// Load environment variables from .env or .env.local if they exist
dotenv.config();
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const program = new Command();

// Configuration
const CONFIG_DIR = path.join(homedir(), '.edpear');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

interface Config {
  groqApiKey?: string;
}

class EdPearCLI {
  private config: Config = {};

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        this.config = fs.readJsonSync(CONFIG_FILE);
      }
    } catch (error) {
      // Ignore config loading errors on first run
    }
  }

  private saveConfig() {
    try {
      fs.ensureDirSync(CONFIG_DIR);
      fs.writeJsonSync(CONFIG_FILE, this.config, { spaces: 2 });
    } catch (error) {
      console.error(chalk.red('Error saving config:'), error);
    }
  }

  // ─── Setup: save Groq API key ─────────────────────────────────────────────

  async setup() {
    console.log(chalk.blue('🔧 EdPear Setup\n'));
    console.log(chalk.gray('EdPear uses the Groq API for AI-powered analysis.'));
    console.log(chalk.gray('Get your free API key at: https://console.groq.com/keys\n'));

    const { groqKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'groqKey',
        message: 'Paste your Groq API key:',
        mask: '*',
        validate: (input: string) => {
          if (!input.trim()) return 'API key is required';
          if (!input.trim().startsWith('gsk_')) return 'Groq API keys start with "gsk_"';
          return true;
        },
      },
    ]);

    const key = groqKey.trim();

    // Save to ~/.edpear/config.json (global)
    this.config.groqApiKey = key;
    this.saveConfig();
    console.log(chalk.green('✅ Saved to ~/.edpear/config.json'));

    // Optionally also save to local .env
    const { saveLocal } = await inquirer.prompt([
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

    console.log(chalk.green('\n🎉 All set! You can now use all EdPear features.'));
    console.log(chalk.gray('Try: edpear math-debug <image-path>'));
  }

  private saveToEnvFile(groqKey: string) {
    const envPath = path.join(process.cwd(), '.env');
    try {
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      // Remove existing GROQ_API_KEY if present
      envContent = envContent.replace(/^GROQ_API_KEY=.*$/m, '').trim();
      if (envContent) envContent += '\n';
      envContent += `GROQ_API_KEY=${groqKey}\n`;
      fs.writeFileSync(envPath, envContent);
      console.log(chalk.green('✅ Saved to .env'));
    } catch (error) {
      console.error(chalk.red('Error saving to .env:'), error);
    }
  }

  async status() {
    console.log(chalk.blue('📊 EdPear Status\n'));

    const groqKey = this.getGroqKey(true);
    if (groqKey) {
      const masked = groqKey.slice(0, 7) + '...' + groqKey.slice(-4);
      console.log(chalk.green(`🔑 Groq API Key: ${masked}`));
      const source = process.env.GROQ_API_KEY
        ? '.env / environment'
        : '~/.edpear/config.json';
      console.log(chalk.gray(`   Source: ${source}`));
    } else {
      console.log(chalk.yellow('🔑 No Groq API key configured'));
      console.log(chalk.gray('   Run "edpear setup" to get started'));
    }
  }

  // ─── Shared helpers for AI feature commands ──────────────────────────────────

  private getGroqKey(silent = false): string {
    const envKey = process.env.GROQ_API_KEY;
    if (envKey) return envKey;
    if (this.config.groqApiKey) return this.config.groqApiKey;
    if (silent) return '';
    console.error(chalk.red('❌ No Groq API key found.'));
    console.error(chalk.gray('Run "edpear setup" to configure your key.'));
    process.exit(1);
  }

  private imageToBase64(filePath: string): string {
    const resolved = path.resolve(filePath);
    if (!fs.existsSync(resolved)) {
      console.error(chalk.red(`❌ Image file not found: ${resolved}`));
      process.exit(1);
    }
    const ext = path.extname(resolved).toLowerCase().replace('.', '');
    const mimeMap: Record<string, string> = { jpg: 'jpeg', jpeg: 'jpeg', png: 'png', gif: 'gif', webp: 'webp' };
    const mime = mimeMap[ext] || 'jpeg';
    const data = fs.readFileSync(resolved).toString('base64');
    return `data:image/${mime};base64,${data}`;
  }

  private printResult(label: string, result: unknown) {
    console.log(chalk.blue(`\n📊 ${label}\n`));
    console.log(JSON.stringify(result, null, 2));
  }

  // ─── Feature 1: math-debug ───────────────────────────────────────────────────

  async mathDebug(imagePath: string) {
    const spinner = ora('Analyzing math solution...').start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.debugMathSolution(image);
      spinner.succeed(chalk.green('✅ Analysis complete'));
      this.printResult('Math Debug Result', result);
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 2: verify-concept ───────────────────────────────────────────────

  async verifyConcept(imagePath: string, concept: string) {
    const spinner = ora(`Verifying concept: "${concept}"...`).start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.verifyRealWorldConcept(image, concept);
      spinner.succeed(chalk.green('✅ Verification complete'));
      this.printResult('Concept Verification', result);
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 3: lab-check ────────────────────────────────────────────────────

  async labCheck(imagePath: string, experimentType: string) {
    const spinner = ora(`Checking lab setup for: "${experimentType}"...`).start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.checkLabSetup(image, experimentType);
      spinner.succeed(chalk.green('✅ Lab check complete'));
      this.printResult('Lab Setup Report', result);
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 4: flashcards ───────────────────────────────────────────────────

  async flashcards(imagePath: string, outputFile?: string) {
    const spinner = ora('Generating spatial flashcards...').start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.generateSpatialFlashcards(image);
      spinner.succeed(chalk.green(`✅ Generated ${result.totalCards} flashcard(s)`));
      this.printResult('Spatial Flashcards', result);
      if (outputFile) {
        fs.writeJsonSync(outputFile, result, { spaces: 2 });
        console.log(chalk.gray(`\n💾 Saved to ${outputFile}`));
      }
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 5: whiteboard-to-code ───────────────────────────────────────────

  async whiteboardToCode(imagePath: string, format: string) {
    const spinner = ora(`Converting whiteboard to ${format}...`).start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.whiteboardToCode(image, format);
      spinner.succeed(chalk.green('✅ Conversion complete'));
      this.printResult('Whiteboard Conversion', result);
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 6: grade-rubric ─────────────────────────────────────────────────

  async gradeRubric(imagePath: string, constraints: string[]) {
    const spinner = ora('Grading against visual rubric...').start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.gradeVisualRubric(image, constraints);
      spinner.succeed(chalk.green(`✅ Graded: ${result.totalScore}/${result.maxScore} (${result.grade})`));
      this.printResult('Visual Rubric Grade', result);
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 7: simplify ─────────────────────────────────────────────────────

  async simplify(imagePath: string, outputFile?: string) {
    const spinner = ora('Reducing cognitive load...').start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.reduceCognitiveLoad(image);
      spinner.succeed(chalk.green('✅ Simplified'));
      console.log(chalk.blue('\n📄 Accessible Markdown:\n'));
      console.log(result.markdown);
      console.log(chalk.blue('\n🔑 Key Terms:'), result.keyTerms.join(', '));
      console.log(chalk.blue('📝 Summary:'), result.summary);
      if (outputFile) {
        fs.writeFileSync(outputFile, result.markdown);
        console.log(chalk.gray(`\n💾 Markdown saved to ${outputFile}`));
      }
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 8: manipulatives ────────────────────────────────────────────────

  async manipulatives(imagePath: string) {
    const spinner = ora('Translating manipulatives...').start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.translateManipulatives(image);
      spinner.succeed(chalk.green('✅ Manipulatives translated'));
      this.printResult('Manipulatives State', result);
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 9: artifact ─────────────────────────────────────────────────────

  async artifact(imagePath: string) {
    const spinner = ora('Analyzing historical artifact...').start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.analyzeHistoricalArtifact(image);
      spinner.succeed(chalk.green(`✅ Identified: ${result.title}`));
      this.printResult('Historical Artifact Analysis', result);
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  }

  // ─── Feature 10: storyboard ──────────────────────────────────────────────────

  async storyboard(imagePath: string, outputFile?: string) {
    const spinner = ora('Converting storyboard to outline...').start();
    try {
      const client = new EdPearClient({ groqApiKey: this.getGroqKey() });
      const image = this.imageToBase64(imagePath);
      const result = await client.storyboardToOutline(image);
      spinner.succeed(chalk.green(`✅ Outline created – ${result.totalNodes} nodes`));
      this.printResult('Storyboard Outline', result);
      if (outputFile) {
        fs.writeJsonSync(outputFile, result, { spaces: 2 });
        console.log(chalk.gray(`\n💾 Saved to ${outputFile}`));
      }
    } catch (err: any) {
      spinner.fail(chalk.red('❌ Failed'));
      console.error(chalk.red(err.message));
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
  .action((image: string) => cli.mathDebug(image));

program
  .command('verify-concept <image> <concept>')
  .description('Verify whether a photo demonstrates a specific physics or geometry concept')
  .action((image: string, concept: string) => cli.verifyConcept(image, concept));

program
  .command('lab-check <image> <experimentType>')
  .description('Check lab equipment or circuit wiring for safety and correctness')
  .action((image: string, experimentType: string) => cli.labCheck(image, experimentType));

program
  .command('flashcards <image>')
  .description('Generate image-occlusion style flashcards from a complex diagram')
  .option('-o, --output <file>', 'Save flashcards JSON to a file')
  .action((image: string, options: { output?: string }) => cli.flashcards(image, options.output));

program
  .command('whiteboard-to-code <image>')
  .description('Convert whiteboard equations or flowcharts to LaTeX, Python, or pseudocode')
  .option('-f, --format <format>', 'Target format: latex | python | pseudocode | markdown', 'latex')
  .action((image: string, options: { format: string }) => cli.whiteboardToCode(image, options.format));

program
  .command('grade-rubric <image> <constraints...>')
  .description('Grade a drawing against a list of rubric constraint strings')
  .action((image: string, constraints: string[]) => cli.gradeRubric(image, constraints));

program
  .command('simplify <image>')
  .description('Reformat dense text into dyslexia-friendly accessible markdown')
  .option('-o, --output <file>', 'Save markdown output to a file')
  .action((image: string, options: { output?: string }) => cli.simplify(image, options.output));

program
  .command('manipulatives <image>')
  .description('Translate physical educational block arrangements to a digital state')
  .action((image: string) => cli.manipulatives(image));

program
  .command('artifact <image>')
  .description('Identify and analyze a historical artifact or artwork as an AR docent')
  .action((image: string) => cli.artifact(image));

program
  .command('storyboard <image>')
  .description('Convert a sticky-note storyboard or mind-map into a hierarchical JSON outline')
  .option('-o, --output <file>', 'Save outline JSON to a file')
  .action((image: string, options: { output?: string }) => cli.storyboard(image, options.output));

program.parse();


