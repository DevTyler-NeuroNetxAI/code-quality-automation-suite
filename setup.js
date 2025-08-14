#!/usr/bin/env node
/**
 * Code Quality Automation Suite - Cross-Platform Setup Script
 * This Node.js script provides cross-platform setup functionality
 * Run with: node setup.js
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
};

function printStatus(message) {
    console.log(`${colors.blue}[INFO]${colors.reset} ${message}`);
}

function printSuccess(message) {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

function printWarning(message) {
    console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
}

function printError(message) {
    console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

function commandExists(command) {
    try {
        execSync(`which ${command}`, { stdio: 'ignore' });
        return true;
    } catch {
        try {
            execSync(`where ${command}`, { stdio: 'ignore' });
            return true;
        } catch {
            return false;
        }
    }
}

function runCommand(command, description) {
    printStatus(description);
    try {
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        printError(`Failed to ${description.toLowerCase()}: ${error.message}`);
        return false;
    }
}

async function setupEnvironment() {
    printStatus('Setting up environment configuration...');
    
    if (!fs.existsSync('.env')) {
        if (fs.existsSync('.env.template')) {
            fs.copyFileSync('.env.template', '.env');
            printSuccess('Environment file created from template');
            
            // Update database name
            let envContent = fs.readFileSync('.env', 'utf8');
            envContent = envContent.replace(/database_name/g, 'code-quality-automation-suite_db');
            fs.writeFileSync('.env', envContent);
        } else if (fs.existsSync('.env.example')) {
            fs.copyFileSync('.env.example', '.env');
            printSuccess('Environment file created from example');
        }
        printWarning('Please edit .env file with your specific configuration');
    } else {
        printWarning('.env file already exists, skipping creation');
    }
}

async function main() {
    console.log('🚀 Setting up Code Quality Automation Suite...');
    console.log('📋 Cross-platform Node.js setup script');
    
    const platform = os.platform();
    printStatus(`Detected platform: ${platform}`);
    
    // Check Node.js version
    if (!commandExists('node')) {
        printError('Node.js is not installed. Please install Node.js 18+ and run this script again.');
        process.exit(1);
    }
    
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    printStatus(`Using Node.js ${nodeVersion}`);
    
    // Install dependencies
    if (!runCommand('npm install', 'Installing dependencies')) {
        process.exit(1);
    }
    
    // Build project
    if (!runCommand('npm run build', 'Building project')) {
        process.exit(1);
    }
    
    // Setup environment
    await setupEnvironment();
    
    // Setup database if script exists
    if (fs.existsSync('scripts/setup-db.js')) {
        runCommand('node scripts/setup-db.js', 'Setting up database');
    }
    
    console.log('');
    printSuccess('🎉 Setup completed! Your application is ready.');
    console.log('');
    console.log('To start the application:');
    console.log('  npm run dev     # Development mode');
    console.log('  npm start       # Production mode');
    console.log('');
    console.log('Frontend: http://localhost:3000');
    console.log('API: http://localhost:8000');
    console.log('');
}

// Run the script
main().catch(error => {
    printError(`Setup failed: ${error.message}`);
    process.exit(1);
});
