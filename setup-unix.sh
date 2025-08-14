#!/bin/bash
# Code Quality Automation Suite - Automated Setup Script for Linux/macOS
# This script will install all prerequisites and set up the project automatically

set -e  # Exit on any error

echo "🚀 Setting up Code Quality Automation Suite..."
echo "📋 Detecting system and installing prerequisites..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
    print_status "Detected macOS"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
    print_status "Detected Linux"
    # Detect Linux distribution
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        DISTRO=$ID
    fi
else
    print_error "Unsupported operating system: $OSTYPE"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install package manager if needed
install_package_manager() {
    if [[ "$OS" == "macos" ]]; then
        if ! command_exists brew; then
            print_status "Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
            eval "$(/opt/homebrew/bin/brew shellenv)"
        fi
    elif [[ "$OS" == "linux" ]]; then
        if [[ "$DISTRO" == "ubuntu" ]] || [[ "$DISTRO" == "debian" ]]; then
            print_status "Updating package list..."
            sudo apt update
        elif [[ "$DISTRO" == "centos" ]] || [[ "$DISTRO" == "rhel" ]] || [[ "$DISTRO" == "fedora" ]]; then
            print_status "Updating package list..."
            if command_exists dnf; then
                sudo dnf update -y
            else
                sudo yum update -y
            fi
        fi
    fi
}

# Install Node.js and related tools
install_nodejs() {
    print_status "Installing Node.js 18+..."
    
    if [[ "$OS" == "macos" ]]; then
        brew install node@18 postgresql redis
        brew services start postgresql
        brew services start redis
    elif [[ "$OS" == "linux" ]]; then
        # Install Node.js via NodeSource
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        
        if [[ "$DISTRO" == "ubuntu" ]] || [[ "$DISTRO" == "debian" ]]; then
            sudo apt install -y nodejs postgresql postgresql-contrib redis-server build-essential
            sudo systemctl start postgresql
            sudo systemctl enable postgresql
            sudo systemctl start redis
            sudo systemctl enable redis
        elif [[ "$DISTRO" == "centos" ]] || [[ "$DISTRO" == "rhel" ]] || [[ "$DISTRO" == "fedora" ]]; then
            if command_exists dnf; then
                sudo dnf install -y nodejs npm postgresql-server postgresql-contrib redis gcc gcc-c++ make
            else
                sudo yum install -y nodejs npm postgresql-server postgresql-contrib redis gcc gcc-c++ make
            fi
            sudo postgresql-setup initdb
            sudo systemctl start postgresql
            sudo systemctl enable postgresql
            sudo systemctl start redis
            sudo systemctl enable redis
        fi
    fi
    
    print_success "Node.js installation completed"
}

# Install project dependencies
setup_nodejs_project() {
    print_status "Installing Node.js dependencies..."
    
    # Install dependencies
    npm install
    
    # Build the project
    npm run build
    
    print_success "Node.js project setup completed"
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    # Create database
    if [[ "$OS" == "macos" ]]; then
        createdb code-quality-automation-suite_db 2>/dev/null || echo "Database may already exist"
    elif [[ "$OS" == "linux" ]]; then
        sudo -u postgres createdb code-quality-automation-suite_db 2>/dev/null || echo "Database may already exist"
        sudo -u postgres createuser code-quality-automation-suite_user 2>/dev/null || echo "User may already exist"
    fi
    
    print_success "Database setup completed"
}

# Generate environment configuration
setup_environment() {
    print_status "Setting up environment configuration..."
    
    if [ ! -f ".env" ]; then
        if [ -f ".env.template" ]; then
            cp .env.template .env
            print_success "Environment file created from template"
            print_warning "Please edit .env file with your specific configuration"
        elif [ -f ".env.example" ]; then
            cp .env.example .env
            print_success "Environment file created from example"
            print_warning "Please edit .env file with your specific configuration"
        fi
        
        # Update database URL if needed
        if [[ "$OS" == "linux" ]]; then
            sed -i "s/username:password@localhost/code-quality-automation-suite_user:password@localhost/g" .env 2>/dev/null || true
            sed -i "s/database_name/code-quality-automation-suite_db/g" .env 2>/dev/null || true
        else
            sed -i '' "s/database_name/code-quality-automation-suite_db/g" .env 2>/dev/null || true
        fi
    else
        print_warning ".env file already exists, skipping creation"
    fi
}

# Start the application
start_application() {
    print_status "Starting the application..."
    
    echo ""
    echo "🎉 Setup completed! Your application is ready."
    echo ""
    echo "To start the application:"
    echo "  npm run dev     # Development mode"
    echo "  npm start       # Production mode"
    echo ""
    echo "Frontend: http://localhost:3000"
    echo "API: http://localhost:8000"
    echo ""
}

# Main execution function
main() {
    print_status "Starting automated setup for Code Quality Automation Suite"
    
    # Install package manager
    install_package_manager
    
    # Install runtime and tools
    install_nodejs
    setup_nodejs_project
    
    # Setup environment and database
    setup_environment
    setup_database
    
    # Start application
    start_application
}

# Execute main function
main "$@"
