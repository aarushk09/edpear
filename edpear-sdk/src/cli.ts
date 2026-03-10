#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import open from 'open';
import axios from 'axios';
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
const ENV_FILE = path.join(process.cwd(), '.env.local');

// Default production URL
const DEFAULT_API_URL = 'https://edpearofficial.vercel.app';

interface Config {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    credits: number;
  };
  apiKeys?: Array<{
    id: string;
    key: string;
    name: string;
    createdAt: string;
  }>;
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

  private async makeRequest(endpoint: string, data?: any, method: string = 'GET') {
    const baseURL = process.env.EDPEAR_API_URL || DEFAULT_API_URL;
    
    try {
      const response = await axios({
        method,
        url: `${baseURL}${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.token && { 'Authorization': `Bearer ${this.config.token}` }),
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error(chalk.red('Authentication required. Please run "edpear login" first.'));
        process.exit(1);
      }
      throw error;
    }
  }

  async login() {
    console.log(chalk.blue('🔐 EdPear Authentication'));
    
    const baseURL = process.env.EDPEAR_API_URL || DEFAULT_API_URL;
    
    console.log(chalk.gray(`Connecting to: ${baseURL}`));
    console.log(chalk.yellow('Press ENTER to open the browser for authentication...'));

    await inquirer.prompt([
      {
        type: 'input',
        name: 'enter',
        message: '',
      },
    ]);

    try {
      // 1. Initialize CLI auth session
      const initResponse = await axios.post(`${baseURL}/api/auth/cli/init`);
      const { requestId, url } = initResponse.data;

      // 2. Open browser
      await open(url);
      console.log(chalk.green('✅ Browser opened!'));
      console.log(chalk.yellow('Please login and approve the request in your browser.'));
      console.log(chalk.gray('You will receive a 6-digit verification code via email.'));
      console.log(chalk.gray('The CLI will automatically detect when you are authenticated.\n'));
      // 3. Poll for completion
      const spinner = ora('Waiting for approval...').start();
      const maxAttempts = 200; // 10 minutes
      let attempts = 0;
      let lastStatus = 'pending';

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        try {
          // Poll status using requestId
          const statusResponse = await axios.get(`${baseURL}/api/auth/cli/status?requestId=${requestId}`);
          const currentStatus = statusResponse.data.status;
          
          // Update spinner message based on status
          if (currentStatus !== lastStatus) {
            if (currentStatus === 'otp_pending') {
              spinner.text = 'Waiting for OTP verification... (Check your email)';
            } else if (currentStatus === 'pending') {
              spinner.text = 'Waiting for approval...';
            }
            lastStatus = currentStatus;
          }
          
          if (statusResponse.data.status === 'completed' && statusResponse.data.cliToken) {
            spinner.stop();
            
            // Save token and user data
            this.config.token = statusResponse.data.cliToken;
            this.config.user = statusResponse.data.user;
            this.saveConfig();

            console.log(chalk.green('\n✅ Successfully authenticated!'));
            console.log(chalk.blue(`\nWelcome, ${statusResponse.data.user.name}!`));
            console.log(chalk.gray(`Email: ${statusResponse.data.user.email}`));
            console.log(chalk.gray(`Credits: ${statusResponse.data.user.credits}`));
            return;
          } else if (statusResponse.data.status === 'expired') {
            spinner.stop();
            console.log(chalk.red(`\n❌ Authentication request expired. Please try again.`));
            process.exit(1);
          }
          
          attempts++;
        } catch (error: any) {
          // Continue polling on error
          attempts++;
        }
      }

      spinner.stop();
      console.log(chalk.yellow('\n⏱️  Authentication timeout. Please try again.'));
      process.exit(1);

    } catch (error: any) {
      console.error(chalk.red('Error during login:'), error.message);
      process.exit(1);
    }
  }

  async generateKey() {
    if (!this.config.token) {
      console.error(chalk.red('Please login first: edpear login'));
      process.exit(1);
    }

    console.log(chalk.blue('🔑 Generate New API Key\n'));

    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for your API key:',
        default: 'My API Key',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Name is required';
          }
          return true;
        },
      },
    ]);

    const spinner = ora('Generating API key...').start();

    try {
      const result = await this.makeRequest('/api/keys/generate', {
        name,
      }, 'POST');

      spinner.succeed(chalk.green('✅ API key generated successfully!'));

      // Add to config
      if (!this.config.apiKeys) {
        this.config.apiKeys = [];
      }
      this.config.apiKeys.push(result.apiKey);
      this.saveConfig();

      console.log(chalk.blue('\n📋 Your new API key:'));
      console.log(chalk.yellow(result.apiKey.key));
      console.log(chalk.gray('\n💡 Save this key securely. It will not be shown again.'));

      // Ask if user wants to save to .env.local
      const { saveToEnv } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'saveToEnv',
          message: 'Save API key to .env.local file?',
          default: true,
        },
      ]);

      if (saveToEnv) {
        await this.saveToEnvFile(result.apiKey.key);
      }
    } catch (error: any) {
      spinner.fail(chalk.red('❌ Failed to generate API key'));
      console.error(chalk.red('Error:'), error.response?.data?.error || error.message);
      process.exit(1);
    }
  }

  private async saveToEnvFile(apiKey: string) {
    try {
      let envContent = '';
      
      if (fs.existsSync(ENV_FILE)) {
        envContent = fs.readFileSync(ENV_FILE, 'utf8');
      }

      // Remove existing EDPEAR_API_KEY if present
      envContent = envContent.replace(/^EDPEAR_API_KEY=.*$/m, '');
      
      // Add new API key
      if (envContent && !envContent.endsWith('\n')) {
        envContent += '\n';
      }
      envContent += `EDPEAR_API_KEY=${apiKey}\n`;

      fs.writeFileSync(ENV_FILE, envContent);
      console.log(chalk.green('✅ API key saved to .env.local'));
    } catch (error) {
      console.error(chalk.red('Error saving to .env.local:'), error);
    }
  }

  async status() {
    if (!this.config.token) {
      console.log(chalk.red('❌ Not authenticated'));
      console.log(chalk.gray('Run "edpear login" to get started'));
      return;
    }

    const spinner = ora('Fetching status...').start();

    try {
      // Fetch latest user stats and API keys
      const [userStatus, keysResponse] = await Promise.all([
        this.makeRequest('/api/auth/me'),
        this.makeRequest('/api/keys/list')
      ]);

      spinner.stop();

      console.log(chalk.blue('📊 EdPear Status\n'));
      
      if (userStatus.user) {
        // Update local config
        this.config.user = {
          id: userStatus.user.id,
          name: userStatus.user.name,
          email: userStatus.user.email,
          credits: userStatus.user.credits
        };
        this.saveConfig();

        console.log(chalk.green(`👤 User: ${userStatus.user.name}`));
        console.log(chalk.green(`📧 Email: ${userStatus.user.email}`));
        console.log(chalk.green(`💳 Credits: ${userStatus.user.credits}`));
      }

      const apiKeys = keysResponse.apiKeys || [];
      
      if (apiKeys.length > 0) {
        console.log(chalk.blue(`\n🔑 Latest API Keys (Top 5):`));
        // Show top 5 keys
        apiKeys.slice(0, 5).forEach((key: any, index: number) => {
          console.log(chalk.gray(`  ${index + 1}. ${key.name}`));
          // The API returns masked keys, which is good for status
          console.log(chalk.yellow(`     ${key.key}`)); 
          console.log(chalk.gray(`     Created: ${new Date(key.createdAt).toLocaleDateString()}`));
          if (key.usageCount !== undefined) {
             console.log(chalk.gray(`     Uses: ${key.usageCount}`));
          }
        });
      } else {
        console.log(chalk.yellow('\n🔑 No API keys found'));
        console.log(chalk.gray('Run "edpear generate-key" to create your first API key'));
      }

    } catch (error: any) {
      spinner.fail(chalk.red('❌ Failed to fetch status'));
      // Fallback to local config if API fails
      if (this.config.user) {
        console.log(chalk.gray('\nShowing cached data:'));
        console.log(chalk.green(`👤 User: ${this.config.user.name}`));
        console.log(chalk.green(`📧 Email: ${this.config.user.email}`));
        console.log(chalk.green(`💳 Credits: ${this.config.user.credits}`));
      }
    }
  }

  async logout() {
    if (!this.config.token) {
      console.log(chalk.yellow('💡 You are not logged in.'));
      return;
    }
    
    // Clear user data but keep the structure
    const email = this.config.user?.email;
    this.config = {};
    this.saveConfig();
    
    console.log(chalk.green('✅ Logged out successfully'));
    if (email) {
      console.log(chalk.gray(`Disconnected from ${email}`));
    }
  }

  // ─── Shared helpers for AI feature commands ──────────────────────────────────

  private getApiKey(): string {
    const envKey = process.env.EDPEAR_API_KEY;
    if (envKey) return envKey;
    const storedKeys = this.config.apiKeys;
    if (storedKeys && storedKeys.length > 0) return storedKeys[0].key;
    console.error(chalk.red('❌ No API key found.'));
    console.error(chalk.gray('Run "edpear generate-key" or set EDPEAR_API_KEY in your environment.'));
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
      const client = new EdPearClient({ apiKey: this.getApiKey() });
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
  .description('EdPear CLI - AI-powered educational components')
  .version('1.0.0');

program
  .command('login')
  .description('Authenticate with EdPear')
  .action(() => cli.login());

program
  .command('generate-key')
  .description('Generate a new API key')
  .action(() => cli.generateKey());

program
  .command('status')
  .description('Show current status and API keys')
  .action(() => cli.status());

program
  .command('command-line')
  .description('Alias for login')
  .action(() => cli.login());

program
  .command('logout')
  .description('Logout from EdPear')
  .action(() => cli.logout());

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


