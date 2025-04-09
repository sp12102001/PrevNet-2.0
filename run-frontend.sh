#!/bin/bash

# This script installs dependencies and starts the frontend application with the KCL API

echo "===== PrevNet Frontend Setup ====="
echo "This script will install dependencies and start the frontend application"
echo "which uses the KCL API at https://prevnet.sites.er.kcl.ac.uk/api/preverbs"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js before running this script."
    echo "Visit https://nodejs.org/ to download and install Node.js 20 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ "$NODE_MAJOR_VERSION" -lt 20 ]; then
    echo "Error: This application requires Node.js version 20 or higher."
    echo "Current version: $NODE_VERSION"
    echo ""
    echo "To upgrade Node.js, you can:"
    echo "1. Download the latest version from https://nodejs.org/"
    echo "2. Use a version manager like nvm:"
    echo "   nvm install 20"
    echo "   nvm use 20"
    echo ""
    echo "After upgrading Node.js, run this script again."
    exit 1
fi

echo "Node.js version: $NODE_VERSION (✓)"

# Check npm version
NPM_VERSION=$(npm -v)
NPM_MAJOR_VERSION=$(echo $NPM_VERSION | cut -d '.' -f 1)

if [ "$NPM_MAJOR_VERSION" -lt 10 ]; then
    echo "Warning: This application works best with npm version 10 or higher."
    echo "Current npm version: $NPM_VERSION"
    echo "Continuing anyway, but you may want to upgrade npm later."
    echo ""
else
    echo "npm version: $NPM_VERSION (✓)"
fi

echo "Installing root dependencies..."
npm install

echo "Installing frontend dependencies..."
cd frontend || { echo "Error: frontend directory not found"; exit 1; }
npm install

echo ""
echo "===== Starting Frontend App ====="
echo "The application will now start at http://localhost:3000"
echo "If port 3000 is in use, it will try port 3001"
echo ""
echo "IMPORTANT: This application uses the KCL API, which requires internet access."
echo "If you see errors about API connections, please check your internet connection."
echo ""

npm run dev

echo "Frontend is now running"