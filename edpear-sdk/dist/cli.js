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
const open_1 = __importDefault(require("open"));
const axios_1 = __importDefault(require("axios"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const os_1 = require("os");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env or .env.local if they exist
dotenv_1.default.config();
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env.local') });
const program = new commander_1.Command();
// Configuration
const CONFIG_DIR = path_1.default.join((0, os_1.homedir)(), '.edpear');
const CONFIG_FILE = path_1.default.join(CONFIG_DIR, 'config.json');
const ENV_FILE = path_1.default.join(process.cwd(), '.env.local');
// Default production URL
const DEFAULT_API_URL = 'https://edpearofficial.vercel.app';
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
    async makeRequest(endpoint, data, method = 'GET') {
        const baseURL = process.env.EDPEAR_API_URL || DEFAULT_API_URL;
        try {
            const response = await (0, axios_1.default)({
                method,
                url: `${baseURL}${endpoint}`,
                data,
                headers: {
                    'Content-Type': 'application/json',
                    ...(this.config.token && { 'Authorization': `Bearer ${this.config.token}` }),
                },
            });
            return response.data;
        }
        catch (error) {
            if (error.response?.status === 401) {
                console.error(chalk_1.default.red('Authentication required. Please run "edpear login" first.'));
                process.exit(1);
            }
            throw error;
        }
    }
    async login() {
        console.log(chalk_1.default.blue('🔐 EdPear Authentication'));
        const baseURL = process.env.EDPEAR_API_URL || DEFAULT_API_URL;
        console.log(chalk_1.default.gray(`Connecting to: ${baseURL}`));
        console.log(chalk_1.default.yellow('Press ENTER to open the browser for authentication...'));
        await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'enter',
                message: '',
            },
        ]);
        try {
            // 1. Initialize CLI auth session
            const initResponse = await axios_1.default.post(`${baseURL}/api/auth/cli/init`);
            const { requestId, url } = initResponse.data;
            // 2. Open browser
            await (0, open_1.default)(url);
            console.log(chalk_1.default.green('✅ Browser opened!'));
            console.log(chalk_1.default.yellow('Please login and approve the request in your browser.'));
            console.log(chalk_1.default.gray('The CLI will automatically detect when you are authenticated.\n'));
            // 3. Poll for completion
            const spinner = (0, ora_1.default)('Waiting for approval...').start();
            const maxAttempts = 200; // 10 minutes
            let attempts = 0;
            while (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                try {
                    // Poll status using requestId
                    const statusResponse = await axios_1.default.get(`${baseURL}/api/auth/cli/status?requestId=${requestId}`);
                    if (statusResponse.data.status === 'completed' && statusResponse.data.cliToken) {
                        spinner.stop();
                        // Save token and user data
                        this.config.token = statusResponse.data.cliToken;
                        this.config.user = statusResponse.data.user;
                        this.saveConfig();
                        console.log(chalk_1.default.green('\n✅ Successfully authenticated!'));
                        console.log(chalk_1.default.blue(`\nWelcome, ${statusResponse.data.user.name}!`));
                        console.log(chalk_1.default.gray(`Email: ${statusResponse.data.user.email}`));
                        console.log(chalk_1.default.gray(`Credits: ${statusResponse.data.user.credits}`));
                        return;
                    }
                    else if (statusResponse.data.status === 'expired') {
                        spinner.stop();
                        console.log(chalk_1.default.red(`\n❌ Authentication request expired. Please try again.`));
                        process.exit(1);
                    }
                    attempts++;
                }
                catch (error) {
                    // Continue polling on error
                    attempts++;
                }
            }
            spinner.stop();
            console.log(chalk_1.default.yellow('\n⏱️  Authentication timeout. Please try again.'));
            process.exit(1);
        }
        catch (error) {
            console.error(chalk_1.default.red('Error during login:'), error.message);
            process.exit(1);
        }
    }
    async generateKey() {
        if (!this.config.token) {
            console.error(chalk_1.default.red('Please login first: edpear login'));
            process.exit(1);
        }
        console.log(chalk_1.default.blue('🔑 Generate New API Key\n'));
        const { name } = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for your API key:',
                default: 'My API Key',
                validate: (input) => {
                    if (!input.trim()) {
                        return 'Name is required';
                    }
                    return true;
                },
            },
        ]);
        const spinner = (0, ora_1.default)('Generating API key...').start();
        try {
            const result = await this.makeRequest('/api/keys/generate', {
                name,
            }, 'POST');
            spinner.succeed(chalk_1.default.green('✅ API key generated successfully!'));
            // Add to config
            if (!this.config.apiKeys) {
                this.config.apiKeys = [];
            }
            this.config.apiKeys.push(result.apiKey);
            this.saveConfig();
            console.log(chalk_1.default.blue('\n📋 Your new API key:'));
            console.log(chalk_1.default.yellow(result.apiKey.key));
            console.log(chalk_1.default.gray('\n💡 Save this key securely. It will not be shown again.'));
            // Ask if user wants to save to .env.local
            const { saveToEnv } = await inquirer_1.default.prompt([
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
        }
        catch (error) {
            spinner.fail(chalk_1.default.red('❌ Failed to generate API key'));
            console.error(chalk_1.default.red('Error:'), error.response?.data?.error || error.message);
            process.exit(1);
        }
    }
    async saveToEnvFile(apiKey) {
        try {
            let envContent = '';
            if (fs_extra_1.default.existsSync(ENV_FILE)) {
                envContent = fs_extra_1.default.readFileSync(ENV_FILE, 'utf8');
            }
            // Remove existing EDPEAR_API_KEY if present
            envContent = envContent.replace(/^EDPEAR_API_KEY=.*$/m, '');
            // Add new API key
            if (envContent && !envContent.endsWith('\n')) {
                envContent += '\n';
            }
            envContent += `EDPEAR_API_KEY=${apiKey}\n`;
            fs_extra_1.default.writeFileSync(ENV_FILE, envContent);
            console.log(chalk_1.default.green('✅ API key saved to .env.local'));
        }
        catch (error) {
            console.error(chalk_1.default.red('Error saving to .env.local:'), error);
        }
    }
    async status() {
        if (!this.config.token) {
            console.log(chalk_1.default.red('❌ Not authenticated'));
            console.log(chalk_1.default.gray('Run "edpear login" to get started'));
            return;
        }
        const spinner = (0, ora_1.default)('Fetching status...').start();
        try {
            // Fetch latest user stats and API keys
            const [userStatus, keysResponse] = await Promise.all([
                this.makeRequest('/api/auth/me'),
                this.makeRequest('/api/keys/list')
            ]);
            spinner.stop();
            console.log(chalk_1.default.blue('📊 EdPear Status\n'));
            if (userStatus.user) {
                // Update local config
                this.config.user = {
                    id: userStatus.user.id,
                    name: userStatus.user.name,
                    email: userStatus.user.email,
                    credits: userStatus.user.credits
                };
                this.saveConfig();
                console.log(chalk_1.default.green(`👤 User: ${userStatus.user.name}`));
                console.log(chalk_1.default.green(`📧 Email: ${userStatus.user.email}`));
                console.log(chalk_1.default.green(`💳 Credits: ${userStatus.user.credits}`));
            }
            const apiKeys = keysResponse.apiKeys || [];
            if (apiKeys.length > 0) {
                console.log(chalk_1.default.blue(`\n🔑 Latest API Keys (Top 5):`));
                // Show top 5 keys
                apiKeys.slice(0, 5).forEach((key, index) => {
                    console.log(chalk_1.default.gray(`  ${index + 1}. ${key.name}`));
                    // The API returns masked keys, which is good for status
                    console.log(chalk_1.default.yellow(`     ${key.key}`));
                    console.log(chalk_1.default.gray(`     Created: ${new Date(key.createdAt).toLocaleDateString()}`));
                    if (key.usageCount !== undefined) {
                        console.log(chalk_1.default.gray(`     Uses: ${key.usageCount}`));
                    }
                });
            }
            else {
                console.log(chalk_1.default.yellow('\n🔑 No API keys found'));
                console.log(chalk_1.default.gray('Run "edpear generate-key" to create your first API key'));
            }
        }
        catch (error) {
            spinner.fail(chalk_1.default.red('❌ Failed to fetch status'));
            // Fallback to local config if API fails
            if (this.config.user) {
                console.log(chalk_1.default.gray('\nShowing cached data:'));
                console.log(chalk_1.default.green(`👤 User: ${this.config.user.name}`));
                console.log(chalk_1.default.green(`📧 Email: ${this.config.user.email}`));
                console.log(chalk_1.default.green(`💳 Credits: ${this.config.user.credits}`));
            }
        }
    }
    async logout() {
        if (!this.config.token) {
            console.log(chalk_1.default.yellow('💡 You are not logged in.'));
            return;
        }
        // Clear user data but keep the structure
        const email = this.config.user?.email;
        this.config = {};
        this.saveConfig();
        console.log(chalk_1.default.green('✅ Logged out successfully'));
        if (email) {
            console.log(chalk_1.default.gray(`Disconnected from ${email}`));
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
program.parse();
//# sourceMappingURL=cli.js.map