# PrevNet

PrevNet is a web application for exploring and analyzing Latin and Ancient Greek preverbs.

The main page presents all available preverbs in an interactive dashboard. Users can select any preverb to explore statistics, including frequency distributions of verbal bases and semantic meanings. When a specific meaning is selected from the list of examples, users can navigate to a dedicated page displaying all occurrences of that meaning in context, complete with the original sentences and source references.

## Project Structure

- `/frontend`: Next.js web application
- `/backend`: Flask API server
- `/data`: Contains the preverb dataset
- `/docs`: Documentation files

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher) - *Optional if using GitHub CSV data source*
- npm or yarn

## Getting Started

You can run PrevNet in two ways:
1. With the Flask backend API (original method)
2. Using CSV files hosted on GitHub (new method, no backend required)

### Option 1: Backend API Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```
   The API will be available at http://localhost:5000

### Option 2: GitHub CSV Setup (No Backend Required)

1. Follow the setup instructions in [docs/github-csv-setup.md](docs/github-csv-setup.md)
2. Update the GitHub repository information in `frontend/services/github-csv.ts`
3. Start the frontend as normal

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at http://localhost:3000

## Development

### Data Sources

PrevNet supports two data sources:

1. **KCL API**: The original data source that requires a backend server
2. **GitHub CSV**: A new data source that fetches data directly from CSV files hosted on GitHub

Users can toggle between these data sources in the UI.

### Setting Up GitHub CSV

For detailed instructions on setting up and using the GitHub CSV data source, see [docs/github-csv-setup.md](docs/github-csv-setup.md).

### Backend API

The Flask backend provides the following endpoints:

- `GET /api/preverbs`: Returns a list of all Latin preverbs

### Frontend

The frontend is built with:
- Next.js 15
- React 19
- Tailwind CSS
- Recharts for data visualization

## Building for Production

### Backend

The backend can be deployed as a standard Flask application.

### Frontend

To build the frontend for production:

```bash
cd frontend
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```
