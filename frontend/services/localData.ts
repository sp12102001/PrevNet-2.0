import { useEffect, useState } from 'react';
import { PreverbData, MeaningData } from './api';

// Types for our local data
interface LocalDataRecord {
    verb_token: string;
    lemma: string;
    sentence: string;
    verb_class: string;
    verb_stem: string;
    preverb: string;
    preverb_semantics: string;
    verb_semantics: string;
    literal_meaning: boolean;
    author: string;
    title: string;
    genre: string;
    century: string;
    language_period: string;
    language: string;
    place: string;
    latitude: string;
    longitude: string;
}

// Extend the PreverbData interface to include preverb meanings
interface LocalPreverbData extends PreverbData {
    preverb_meanings: { [key: string]: number };
    literal_meanings: { [key: string]: number };
}

// Cache the data once loaded
let latinData: LocalDataRecord[] | null = null;
let greekData: LocalDataRecord[] | null = null;

// Track currently selected language
export type Language = 'latin' | 'greek';
let currentLanguage: Language = 'latin';

// Define the Greek preverb order
const greekPreverbOrder = [
    'ἀνά', 'ἀντί', 'ἀπό', 'διά', 'εἰς', 'ἐκ', 'ἐν', 'ἐπί', 'κατά',
    'μετά', 'παρά', 'περί', 'πρό', 'πρός', 'σύν', 'ὑπό'
];

// Set the current language
export const setCurrentLanguage = (language: Language) => {
    currentLanguage = language;
};

// Get the current language
export const getCurrentLanguage = (): Language => {
    return currentLanguage;
};

/**
 * Load JSON data from the static files
 */
async function loadData(language: Language): Promise<LocalDataRecord[]> {
    // Return cached data if available
    if (language === 'latin' && latinData) return latinData;
    if (language === 'greek' && greekData) return greekData;

    try {
        const response = await fetch(`/static/data/${language}.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${language}.json: ${response.status}`);
        }
        const data = await response.json();

        // Cache the data
        if (language === 'latin') latinData = data;
        else greekData = data;

        return data;
    } catch (error) {
        console.error(`Error loading ${language} data:`, error);
        return [];
    }
}

/**
 * Get a list of all unique preverbs in the data
 */
export const useLocalPreverbs = () => {
    const [preverbs, setPreverbs] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [language, setLanguage] = useState<Language>(currentLanguage);

    // Listen for language changes
    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(currentLanguage);
        };

        // Check for language changes periodically
        const intervalId = setInterval(() => {
            if (currentLanguage !== language) {
                handleLanguageChange();
            }
        }, 500);

        return () => clearInterval(intervalId);
    }, [language]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const records = await loadData(language);

                // Get unique preverbs
                const uniquePreverbs = Array.from(
                    new Set(records.map(record => record.preverb))
                ).filter(Boolean);

                // Sort the preverbs based on language
                if (language === 'greek') {
                    // For Greek, sort according to specified order
                    uniquePreverbs.sort((a, b) => {
                        // Get the indices in the Greek preverb order array
                        // If not found, default to a high index for proper sorting
                        const indexA = greekPreverbOrder.indexOf(a);
                        const indexB = greekPreverbOrder.indexOf(b);

                        // If both are found in the order array, sort by their positions
                        if (indexA !== -1 && indexB !== -1) {
                            return indexA - indexB;
                        }
                        // If only A is found, it comes first
                        if (indexA !== -1) {
                            return -1;
                        }
                        // If only B is found, it comes first
                        if (indexB !== -1) {
                            return 1;
                        }
                        // If neither is found, use alphabetical order
                        return a.localeCompare(b);
                    });
                } else {
                    // For Latin, use standard alphabetical sort
                    uniquePreverbs.sort();
                }

                setPreverbs(uniquePreverbs);
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching preverbs for ${language}:`, error);
                setError(error instanceof Error ? error : new Error('Unknown error'));
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);

    return { preverbs, loading, error, language };
};

/**
 * Get data for a specific preverb
 */
export const useLocalPreverbData = (preverb: string | null) => {
    const [data, setData] = useState<LocalPreverbData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [language, setLanguage] = useState<Language>(currentLanguage);

    // Listen for language changes
    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(currentLanguage);
        };

        // Check for language changes periodically
        const intervalId = setInterval(() => {
            if (currentLanguage !== language) {
                handleLanguageChange();
            }
        }, 500);

        return () => clearInterval(intervalId);
    }, [language]);

    useEffect(() => {
        if (!preverb) {
            setData(null);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const records = await loadData(language);

                // Filter records for the selected preverb
                const filteredRecords = records.filter(
                    record => record.preverb.toLowerCase() === preverb.toLowerCase()
                );

                if (filteredRecords.length === 0) {
                    setData(null);
                    setLoading(false);
                    return;
                }

                // Count verbal bases
                const verbalBases: { [key: string]: number } = {};
                filteredRecords.forEach(record => {
                    const lemma = record.lemma;
                    verbalBases[lemma] = (verbalBases[lemma] || 0) + 1;
                });

                // Count meanings
                const meanings: { [key: string]: number } = {};
                filteredRecords.forEach(record => {
                    const meaning = record.verb_semantics
                        .replace(/^\[|\]$/g, '')
                        .replace(/'v#\d+\s*/g, '')
                        .replace(/'/g, '')
                        .trim();
                    meanings[meaning] = (meanings[meaning] || 0) + 1;
                });

                // Count preverb meanings (from preverb_semantics column)
                const preverbMeanings: { [key: string]: number } = {};
                filteredRecords.forEach(record => {
                    if (!record.preverb_semantics) return;

                    // Split by commas if there are multiple meanings
                    const semantics = record.preverb_semantics.split(/,\s*/);

                    semantics.forEach(meaning => {
                        const cleanMeaning = meaning.trim();
                        if (cleanMeaning) {
                            preverbMeanings[cleanMeaning] = (preverbMeanings[cleanMeaning] || 0) + 1;
                        }
                    });
                });

                // Classify and count literal vs non-literal meanings
                const literalMeanings: { [key: string]: number } = {
                    "LITERAL": 0,
                    "NON-LITERAL": 0
                };

                filteredRecords.forEach(record => {
                    if ('literal_meaning' in record && record.literal_meaning !== undefined) {
                        // Use the literal_meaning boolean field from the dataset
                        if (record.literal_meaning === true) {
                            literalMeanings["LITERAL"] += 1;
                        } else {
                            literalMeanings["NON-LITERAL"] += 1;
                        }
                    } else if (record.preverb_semantics) {
                        // Fallback to keyword-based method
                        const semantics = record.preverb_semantics.toLowerCase();

                        // Check for common spatial/directional keywords indicating literal use
                        const literalKeywords = [
                            'away', 'from', 'towards', 'to', 'into', 'out', 'through',
                            'across', 'up', 'down', 'on', 'off', 'over', 'under', 'in front',
                            'behind', 'before', 'after', 'around', 'together', 'apart'
                        ];

                        let isLiteral = false;
                        for (const keyword of literalKeywords) {
                            if (semantics.includes(keyword)) {
                                isLiteral = true;
                                break;
                            }
                        }

                        if (isLiteral) {
                            literalMeanings["LITERAL"] += 1;
                        } else {
                            literalMeanings["NON-LITERAL"] += 1;
                        }
                    }
                });

                // Create examples
                const lemmaToMeanings = new Map<string, { count: number, verb_semantics: string }>();

                filteredRecords.forEach(record => {
                    const key = record.lemma;
                    if (!lemmaToMeanings.has(key)) {
                        lemmaToMeanings.set(key, {
                            count: 1,
                            verb_semantics: record.verb_semantics
                                .replace(/^\[|\]$/g, '')
                                .replace(/'v#\d+\s*/g, '')
                                .replace(/'/g, '')
                                .trim()
                        });
                    } else {
                        const existing = lemmaToMeanings.get(key)!;
                        existing.count += 1;
                    }
                });

                // Convert to examples array
                const examples = Array.from(lemmaToMeanings.entries())
                    .map(([lemma, { count, verb_semantics }]) => ({
                        lemma,
                        count,
                        verb_semantics,
                        meaning_id: `${preverb}_${lemma}_${language}` // Include language in the ID
                    }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 20); // Limit to top 20 examples

                // Create the preverb data
                const preverbData: LocalPreverbData = {
                    verbal_bases: verbalBases,
                    meanings,
                    preverb_meanings: preverbMeanings,
                    literal_meanings: literalMeanings,
                    total_occurrences: filteredRecords.length,
                    examples
                };

                setData(preverbData);
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching data for preverb ${preverb}:`, error);
                setError(error instanceof Error ? error : new Error('Unknown error'));
                setLoading(false);
            }
        };

        fetchData();
    }, [preverb, language]);

    return { data, loading, error, language };
};

/**
 * Parse a meaning ID to extract preverb, lemma, and language
 */
const parseMeaningId = (meaningId: string): { preverb: string, lemma: string, language: Language } => {
    const parts = meaningId.split('_');

    // Default values
    const result = {
        preverb: '',
        lemma: '',
        language: 'latin' as Language
    };

    if (parts.length >= 2) {
        result.preverb = parts[0];

        // If we have language as the last part
        if (parts.length >= 3 && (parts[parts.length - 1] === 'latin' || parts[parts.length - 1] === 'greek')) {
            result.language = parts[parts.length - 1] as Language;
            // Join all middle parts as the lemma in case it contains underscores
            result.lemma = parts.slice(1, parts.length - 1).join('_');
        } else {
            // Otherwise just use all remaining parts as the lemma
            result.lemma = parts.slice(1).join('_');
        }
    }

    return result;
};

/**
 * Get data for a specific meaning
 */
export const useLocalMeaningData = (meaningId: string | null) => {
    const [data, setData] = useState<MeaningData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!meaningId) {
            setData(null);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);

                // Parse the meaning ID to get preverb, lemma, and language
                const { preverb, lemma, language } = parseMeaningId(meaningId);

                if (!preverb || !lemma) {
                    throw new Error(`Invalid meaning ID format: ${meaningId}`);
                }

                // Load the appropriate data
                const records = await loadData(language);

                // Filter for the specific preverb and lemma
                const matchingRecords = records.filter(
                    record =>
                        record.preverb.toLowerCase() === preverb.toLowerCase() &&
                        record.lemma.toLowerCase() === lemma.toLowerCase()
                );

                if (matchingRecords.length === 0) {
                    throw new Error(`No data found for meaning ID: ${meaningId}`);
                }

                // Extract a representative verb semantics (using the first one)
                const verbSemantics = matchingRecords[0].verb_semantics
                    .replace(/^\[|\]$/g, '')
                    .replace(/'v#\d+\s*/g, '')
                    .replace(/'/g, '')
                    .trim();

                // Create occurrences for display
                const occurrences = matchingRecords.map(record => ({
                    preverb: record.preverb,
                    lemma: record.lemma,
                    sentence: record.sentence,
                    token: record.verb_token,
                    location_url: '',
                    author: record.author,
                    title: record.title,
                    century: record.century
                }));

                setData({
                    occurrences,
                    verb_semantics: verbSemantics
                });

                setLoading(false);
            } catch (error) {
                console.error(`Error fetching meaning data for ${meaningId}:`, error);
                setError(error instanceof Error ? error : new Error(`Failed to fetch data for meaning: ${meaningId}. ${(error as Error).message}`));
                setLoading(false);
            }
        };

        fetchData();
    }, [meaningId]);

    return { data, loading, error };
};