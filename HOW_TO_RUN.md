# How to Run PrevNet Frontend

This guide will help you run the PrevNet frontend application which now uses the KCL hosted API.

## Prerequisites

Make sure you have the following installed:
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Internet connection (required to access the KCL API)

## Running the Application

### Method 1: Using the Script (Recommended)

1. Make the script executable (if not already):
   ```
   chmod +x run-frontend.sh
   ```

2. Run the script:
   ```
   ./run-frontend.sh
   ```

### Method 2: Manual Steps

1. Install dependencies:
   ```
   npm install
   cd frontend
   npm install
   ```

2. Start the application:
   ```
   npm start
   ```
   or
   ```
   cd frontend
   npm run dev
   ```

## Accessing the Application

Once running, the application will be available at:
- http://localhost:3000
- If port 3000 is in use, it will use port 3001

## How It Works

The application uses the following components:
- React + Next.js frontend
- Direct API calls to the KCL Preverbs API
- TailwindCSS for styling
- Recharts for data visualization

## Features

### Preverb Analysis Dashboard
The main dashboard displays preverbs and their analysis including:
- Verbal bases distribution
- Meanings distribution
- Examples of usage

### Meaning Detail Page
When clicking on a meaning, the following information is displayed:
- Preverb used
- Lemma (word form)
- Sentence example
- Author of the text
- Work title
- Century (formatted without the "cent." prefix)
- Location (if available)

## API Information

The application now uses the KCL hosted API directly:
- Base URL: https://prevnet.sites.er.kcl.ac.uk/api/preverbs
- Example: https://prevnet.sites.er.kcl.ac.uk/api/preverbs/intro

This API provides preverb data in the exact format needed by the frontend.

## Troubleshooting

If you encounter any issues:

### Connection Errors

If you see the "Connection Error" screen or API errors:
1. Check your internet connection
2. Verify that the KCL API is accessible by visiting https://prevnet.sites.er.kcl.ac.uk/api/preverbs/intro in your browser
3. Check if there's a firewall or network restriction blocking access to the API

### CORS Issues

If you see CORS-related errors in the console:
1. The application should work without CORS issues as it's using direct API calls
2. If you still encounter CORS issues, consider using a browser extension to temporarily disable CORS for testing

### Port Already in Use

If you see "Port 3000 is in use":
1. The application will automatically try port 3001
2. If that also fails, you can manually specify a different port with:
   ```
   cd frontend
   npm run dev -- -p 3002
   ```

## Need More Help?

If you continue to experience issues:
1. Check the browser console (F12) for specific error messages
2. Try restarting the application
3. Clear your browser cache and try again