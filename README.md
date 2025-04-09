# PrevNet

PrevNet is a web application for exploring and analyzing Latin and Ancient Greek preverbs.

The main page presents all available preverbs in an interactive dashboard. Users can select any preverb to explore statistics, including frequency distributions of verbal bases and semantic meanings. When a specific meaning is selected from the list of examples, users can navigate to a dedicated page displaying all occurrences of that meaning in context, complete with the original sentences and source references.

## Project Structure

- `/frontend`: Next.js web application
- `/backend`: Flask API server
- `/data`: Contains the preverb dataset

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn

## Getting Started

### Backend Setup

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
