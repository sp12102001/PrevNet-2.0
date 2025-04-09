import { DatasetRecord, Occurrence, MeaningData, PreverbData } from './api';
import { useState, useEffect } from 'react';

// Base URL for raw GitHub content
const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com';

// GitHub repository information
const REPO_OWNER = 'sp12102001';
const REPO_NAME = 'prevnet-data';
const BRANCH = 'main';

// CSV file paths in the repository
const CSV_FILES = {
    LG_PREVERBS_DATA: 'data/LG_preverbs.csv',
    PREVERBS_DATA: 'data/preverbs.csv',
    MEANINGS_DATA: 'data/meanings.csv',
};

// Helper to get raw file URL from GitHub
const getGithubRawUrl = (filePath: string): string => {
    return `${GITHUB_RAW_BASE_URL}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${filePath}`;
};

// Parse CSV string into array of objects
const parseCSV = (csvText: string): Record<string, string>[] => {
    // Split by newlines
    const lines = csvText.trim().split('\n');

    // Get headers from first line
    const headers = lines[0].split(',').map(header => header.trim());

    // Parse each line into an object
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index] || '';
            return obj;
        }, {} as Record<string, string>);
    });
};

// Map columns from different CSV formats to standardized field names
const mapRecordToStandardFields = (record: Record<string, string>, fileType: 'LG_PREVERBS' | 'PREVERBS'): Record<string, string> => {
    if (fileType === 'LG_PREVERBS') {
        return {
            preverb: record.preverb || '',
            lemma: record.lemma || '',
            sentence: record.sentence || '',
            verb_token: record.verb_token || '',
            whg_url: record.whg_url || '',
            author: record.author || '',
            title: record.title || '',
            century: record.century || '',
            meaning_id: record.meaning_id || '',
            verb_semantics: record.verb_semantics || '',
            // Additional LG_preverbs specific fields
            language: record.language || '',
            language_period: record.language_period || '',
            actionality: record.actionality || '',
            verb_class: record.verb_class || '',
        };
    } else { // PREVERBS format
        return {
            preverb: record.preverb || '',
            lemma: record.lemma || '',
            sentence: record.sentence || '',
            verb_token: record.verb_token || '',
            // Map fields with different names
            whg_url: '', // Not available in preverbs.csv
            author: '', // Not available in preverbs.csv
            title: '', // Not available in preverbs.csv
            century: '', // Not available in preverbs.csv
            meaning_id: '', // Generate a unique ID for each row
            verb_semantics: record.verb_semantics || '',
            // Additional preverbs specific fields
            lang: record.lang || '',
            lang_period: record.lang_period || '',
            verb_class: record.verb_class || '',
            genre: record.genre || '',
        };
    }
};

// Fetch CSV file from GitHub
export const fetchCSVFromGithub = async (filePath: string): Promise<Record<string, string>[]> => {
    try {
        const url = getGithubRawUrl(filePath);
        console.log(`Fetching CSV from GitHub: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`GitHub responded with status: ${response.status}`);
        }

        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error(`Error fetching CSV from GitHub (${filePath}):`, error);
        return [];
    }
};

// Fetch all data from both CSV files
const fetchAllData = async (): Promise<Record<string, string>[]> => {
    try {
        // Fetch from both sources
        const lgPreverbsData = await fetchCSVFromGithub(CSV_FILES.LG_PREVERBS_DATA);
        const preverbsData = await fetchCSVFromGithub(CSV_FILES.PREVERBS_DATA);

        // Map to standardized format
        const mappedLgData = lgPreverbsData.map(record => mapRecordToStandardFields(record, 'LG_PREVERBS'));

        // For preverbs.csv, generate meaning_id if missing
        const mappedPreverbsData = preverbsData.map((record, index) => {
            const mappedRecord = mapRecordToStandardFields(record, 'PREVERBS');
            // Generate a meaning ID if none exists
            if (!mappedRecord.meaning_id) {
                // Create a unique ID based on preverb, lemma and verb_semantics
                const uniqueId = `${record.preverb || ''}_${record.lemma || ''}_${record.verb_semantics || ''}_${index}`;
                mappedRecord.meaning_id = `p_${uniqueId.replace(/\s+/g, '_')}`;
            }
            return mappedRecord;
        });

        // Combine data from both sources
        return [...mappedLgData, ...mappedPreverbsData];
    } catch (error) {
        console.error('Error fetching all data:', error);
        return [];
    }
};

// Fetch preverbs list from both CSV files
export const fetchPreverbsFromGithub = async (): Promise<string[]> => {
    try {
        const allRecords = await fetchAllData();
        // Extract unique preverbs from the dataset
        const preverbs = Array.from(new Set(allRecords.map(record => record.preverb || '').filter(Boolean)));
        return preverbs.sort();
    } catch (error) {
        console.error('Error fetching preverbs from GitHub:', error);
        return [];
    }
};

// Fetch data for a specific preverb
export const fetchPreverbDataFromGithub = async (preverb: string): Promise<PreverbData | null> => {
    try {
        const allRecords = await fetchAllData();

        // Filter records for the requested preverb
        const preverRecords = allRecords.filter(record =>
            record.preverb && record.preverb.toLowerCase() === preverb.toLowerCase()
        );

        if (preverRecords.length === 0) {
            console.warn(`No data found for preverb: ${preverb}`);
            return null;
        }

        // Calculate verbal bases frequency
        const verbalBases: { [key: string]: number } = {};
        preverRecords.forEach(record => {
            const lemma = record.lemma || 'unknown';
            verbalBases[lemma] = (verbalBases[lemma] || 0) + 1;
        });

        // Calculate meanings frequency
        const meanings: { [key: string]: number } = {};
        preverRecords.forEach(record => {
            const semantics = record.verb_semantics || 'unknown';
            if (semantics) {
                meanings[semantics] = (meanings[semantics] || 0) + 1;
            }
        });

        // Create examples
        const examples = Object.entries(meanings).map(([verb_semantics, count]) => {
            // Find a representative record for this meaning
            const example = preverRecords.find(r => r.verb_semantics === verb_semantics);
            return {
                count,
                lemma: example?.lemma || '',
                verb_semantics,
                meaning_id: example?.meaning_id || '',
            };
        });

        return {
            verbal_bases: verbalBases,
            meanings,
            total_occurrences: preverRecords.length,
            examples,
        };
    } catch (error) {
        console.error(`Error fetching data for preverb ${preverb} from GitHub:`, error);
        return null;
    }
};

// Fetch data for a specific meaning
export const fetchMeaningDataFromGithub = async (meaningId: string): Promise<MeaningData | null> => {
    if (!meaningId) return null;

    try {
        const allRecords = await fetchAllData();

        // Filter records for the requested meaning ID
        const meaningRecords = allRecords.filter(record =>
            record.meaning_id && record.meaning_id === meaningId
        );

        if (meaningRecords.length === 0) {
            console.warn(`No data found for meaning ID: ${meaningId}`);
            return null;
        }

        // Get verb semantics from the first record
        const verb_semantics = meaningRecords[0].verb_semantics || 'Unknown';

        // Map records to occurrences
        const occurrences: Occurrence[] = meaningRecords.map(record => ({
            preverb: record.preverb || '',
            lemma: record.lemma || '',
            sentence: record.sentence || '',
            token: record.verb_token || '',
            location_url: record.whg_url || '',
            author: record.author || '',
            title: record.title || '',
            century: record.century || '',
        }));

        return {
            occurrences,
            verb_semantics,
        };
    } catch (error) {
        console.error(`Error fetching data for meaning ${meaningId} from GitHub:`, error);
        return null;
    }
};

// React hooks for using GitHub CSV data

export const usePreverbsFromGithub = () => {
    const [data, setData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const preverbs = await fetchPreverbsFromGithub();
                setData(preverbs);
                setError(null);
            } catch (err) {
                console.error('Error in usePreverbsFromGithub:', err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export const usePreverbDataFromGithub = (preverb: string | null) => {
    const [data, setData] = useState<PreverbData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!preverb) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const preverbData = await fetchPreverbDataFromGithub(preverb);
                setData(preverbData);
                setError(null);
            } catch (err) {
                console.error(`Error in usePreverbDataFromGithub for ${preverb}:`, err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [preverb]);

    return { data, loading, error };
};

export const useMeaningDataFromGithub = (meaningId: string | null) => {
    const [data, setData] = useState<MeaningData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!meaningId) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const meaningData = await fetchMeaningDataFromGithub(meaningId);
                setData(meaningData);
                setError(null);
            } catch (err) {
                console.error(`Error in useMeaningDataFromGithub for ${meaningId}:`, err);
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [meaningId]);

    return { data, loading, error };
};