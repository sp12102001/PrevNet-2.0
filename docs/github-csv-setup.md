# GitHub CSV Data Source Setup Guide

This guide explains how to set up your GitHub repository to host CSV files for the PrevNet application.

## Overview

The PrevNet application can now fetch data directly from CSV files hosted on GitHub. This approach has several advantages:
1. No need for a dedicated API server
2. Easy to update data by committing new CSV files
3. Version control for your data
4. Free hosting with GitHub

## Repository Setup

1. Create a new GitHub repository (or use an existing one)
2. Create a directory structure for your CSV files, for example:
   ```
   /data/LG_preverbs.csv
   /data/preverbs.csv
   ```

3. Upload your CSV files to these directories

## CSV File Format

The system supports two CSV file formats:

### LG_preverbs.csv

This file contains the complete dataset with all fields:

```
ID,verb_token,morphology,lemma,sentence,actionality,verb_class,literal_meaning,verb_stem,preverb,preverb_semantics,verb_semantics,figure_semantics,ground_semantics,participant_lemma,participant_role,sr_expression,sr_role,sr_lemma,sr_semantics,whg_url,author,title,genre,century,language_period,telicity,verbal_bases,language,place,latitude,longitude,meaning_id
1,discēdunt,ind.prs.3p.act,discedo,ab hōc conciliō discēdunt,telic,change of state,to go apart,cedere,dis,apart,to depart,N/A,N/A,ab hoc concilio,source,ab hoc concilio,source,concilium,"from this council, from this meeting",https://example.com/location,Caesar,De Bello Gallico,narrative,cent. I BC,Classical,telic,cedere,Latin,Gaul,48.45,2.35,123
```

### preverbs.csv

This is a simplified format with fewer columns:

```
lang,lang_period,verb_token,lemma,sentence,verb_class,literal,preverb,verb_stem,preverb_semantics,verb_semantics,genre
Latin,Classical,absunt,absum,absunt bidui,state,to be away,ab,sum,away,to be absent,narrative
```

The application will combine data from both files and handle the differences in structure. If fields like `meaning_id` are missing, the application will generate them automatically.

## Key Fields Explained

Regardless of which format you use, these key fields are required:

- `preverb`: The preverb (e.g., "ab", "ad", "ex")
- `lemma`: The base verb in its dictionary form
- `sentence`: The full example sentence
- `verb_token`: The actual token form as it appears in the sentence
- `verb_semantics`: The semantic meaning of this verb+preverb combination

Additional useful fields in LG_preverbs.csv:
- `meaning_id`: A unique identifier for this meaning
- `whg_url`: URL to the source or location
- `author`: Author of the source text
- `title`: Title of the source text
- `century`: Time period (e.g., "cent. I BC")

## Configuration

Update the `frontend/services/github-csv.ts` file with your repository information:

```typescript
// GitHub repository information
const REPO_OWNER = 'your-github-username';
const REPO_NAME = 'prevnet-data';
const BRANCH = 'main';
```

Replace:
- `your-github-username` with your GitHub username
- `prevnet-data` with your repository name
- `main` with your branch name (usually "main" or "master")

## Testing

After setting up your repository and updating the configuration:

1. Start the application
2. Navigate to any meaning page
3. Use the data source toggle in the top-right corner to switch between "KCL API" and "GitHub CSV"
4. Verify that data loads correctly from your GitHub repository

## Troubleshooting

If you encounter issues:

1. Check browser console for errors
2. Verify your CSV file format matches the expected format
3. Make sure your repository is public or you have provided appropriate authentication
4. Check that the file paths in `CSV_FILES` in `github-csv.ts` match your actual file paths

## Adding More Data

To add more data:
1. Update your CSV files on GitHub
2. The application will fetch the latest data on the next request