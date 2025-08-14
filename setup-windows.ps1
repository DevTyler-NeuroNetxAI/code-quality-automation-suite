# Code Quality Automation Suite - Automated Setup Script for Windows
# This script will install all prerequisites and set up the project automatically
# Run this in PowerShell as Administrator: Set-ExecutionPolicy Bypass -Scope Process -Force; .\setup-windows.ps1

param(
    [switch]$SkipPackageManager
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up Code Quality Automation Suite..." -ForegroundColor Green
Write-Host "📋 Detecting system and installing prerequisites..." -ForegroundColor Blue

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Function to check if command exists
function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Install Chocolatey if needed
function Install-PackageManager {
    if (-not $SkipPackageManager -and -not (Test-Command "choco")) {
        Write-Status "Installing Chocolatey package manager..."
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        refreshenv
        Write-Success "Chocolatey installed successfully"
    }
}

# Install Git if needed
function Install-Git {
    if (-not (Test-Command "git")) {
        Write-Status "Installing Git..."
        choco install git -y
        refreshenv
    }
}


# Install Node.js and related tools
function Install-NodeJS {
    Write-Status "Installing Node.js 18+..."
    
    if (-not (Test-Command "node")) {
        choco install nodejs-lts -y
        refreshenv
    }
    
    # Install PostgreSQL
    if (-not (Test-Command "psql")) {
        Write-Status "Installing PostgreSQL..."
        choco install postgresql13 -y --params '/Password:password123'
        refreshenv
    }
    
    # Install Redis
    if (-not (Test-Command "redis-server")) {
        Write-Status "Installing Redis..."
        choco install redis-64 -y
    }
    
    Write-Success "Node.js and database tools installed"
}

# Setup Node.js project
function Setup-NodeJSProject {
    Write-Status "Installing Node.js dependencies..."
    
    # Install dependencies
    npm install
    
    # Build the project
    npm run build
    
    Write-Success "Node.js project setup completed"
}

# Setup database
function Setup-Database {
    Write-Status "Setting up database..."
    
    # Start PostgreSQL service
    Start-Service postgresql*
    
    # Create database
    try {
        & "C:\Program Files\PostgreSQL\13\bin\createdb.exe" -U postgres code-quality-automation-suite_db
    }
    catch {
        Write-Warning "Database may already exist"
    }
    
    # Run migrations if they exist
    $packageJson = Get-Content package.json | ConvertFrom-Json
    if ($packageJson.scripts.migrate) {
        npm run migrate
    }
    
    Write-Success "Database setup completed"
}

# Generate environment configuration
function Setup-Environment {
    Write-Status "Setting up environment configuration..."
    
    if (-not (Test-Path ".env")) {
        if (Test-Path ".env.template") {
            Copy-Item ".env.template" ".env"
            Write-Success "Environment file created from template"
            Write-Warning "Please edit .env file with your specific configuration"
        }
        elseif (Test-Path ".env.example") {
            Copy-Item ".env.example" ".env"
            Write-Success "Environment file created from example"
            Write-Warning "Please edit .env file with your specific configuration"
        }
        
        # Update database configuration
        if (Test-Path ".env") {
            (Get-Content ".env") -replace "database_name", "code-quality-automation-suite_db" | Set-Content ".env"
            (Get-Content ".env") -replace "username:password@localhost", "postgres:password123@localhost" | Set-Content ".env"
        }
    }
    else {
        Write-Warning ".env file already exists, skipping creation"
    }
}

# Start the application
function Start-Application {
    Write-Status "Setup completed!"
    
    Write-Host ""
    Write-Host "🎉 Setup completed! Your application is ready." -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the application:" -ForegroundColor Yellow
    Write-Host "  npm run dev     # Development mode" -ForegroundColor White
    Write-Host "  npm start       # Production mode" -ForegroundColor White
    Write-Host ""
    Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "API: http://localhost:8000" -ForegroundColor Cyan
    Write-Host ""
}

# Main execution
function Main {
    try {
        Write-Status "Starting automated setup for Code Quality Automation Suite"
        
        # Install package manager and Git
        Install-PackageManager
        Install-Git
        
        # Install runtime and tools
        Install-NodeJS
        Setup-NodeJSProject
        
        # Setup environment and database
        Setup-Environment
        Setup-Database
        
        # Complete setup
        Start-Application
    }
    catch {
        Write-Error "Setup failed: $_"
        Write-Host "Please check the error message above and try running the script again." -ForegroundColor Yellow
        exit 1
    }
}

# Execute main function
Main
