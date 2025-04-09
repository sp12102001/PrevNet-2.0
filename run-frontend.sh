#!/bin/bash

# This script installs dependencies and starts the frontend application with the KCL API

echo "===== PrevNet Frontend Setup ====="
echo "This script will install dependencies and start the frontend application"
echo "which uses the KCL API at https://prevnet.sites.er.kcl.ac.uk/api/preverbs"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js before running this script."
    echo "Visit https://nodejs.org/ to download and install Node.js."
    exit 1
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