"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalMeaningData = exports.useLocalPreverbData = exports.useLocalPreverbs = exports.getCurrentLanguage = exports.setCurrentLanguage = void 0;
const react_1 = require("react");
// Cache the data once loaded
let latinData = null;
let greekData = null;
let currentLanguage = 'latin';
// Set the current language
const setCurrentLanguage = (language) => {
    currentLanguage = language;
};
exports.setCurrentLanguage = setCurrentLanguage;
// Get the current language
const getCurrentLanguage = () => {
    return currentLanguage;
};
exports.getCurrentLanguage = getCurrentLanguage;
/**
 * Load JSON data from the static files
 */
async function loadData(language) {
    // Return cached data if available
    if (language === 'latin' && latinData)
        return latinData;
    if (language === 'greek' && greekData)
        return greekData;
    try {
        const response = await fetch(`/static/data/${language}.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${language}.json: ${response.status}`);
        }
        const data = await response.json();
        // Cache the data
        if (language === 'latin')
            latinData = data;
        else
            greekData = data;
        return data;
    }
    catch (error) {
        console.error(`Error loading ${language} data:`, error);
        return [];
    }
}
/**
 * Get a list of all unique preverbs in the data
 */
const useLocalPreverbs = () => {
    const [preverbs, setPreverbs] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [language, setLanguage] = (0, react_1.useState)(currentLanguage);
    // Listen for language changes
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const records = await loadData(language);
                // Get unique preverbs
                const uniquePreverbs = Array.from(new Set(records.map(record => record.preverb))).filter(Boolean).sort();
                setPreverbs(uniquePreverbs);
                setLoading(false);
            }
            catch (error) {
                console.error(`Error fetching preverbs for ${language}:`, error);
                setError(error instanceof Error ? error : new Error('Unknown error'));
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);
    return { preverbs, loading, error, language };
};
exports.useLocalPreverbs = useLocalPreverbs;
/**
 * Get data for a specific preverb
 */
const useLocalPreverbData = (preverb) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [language, setLanguage] = (0, react_1.useState)(currentLanguage);
    // Listen for language changes
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        if (!preverb) {
            setData(null);
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const records = await loadData(language);
                // Filter records for the selected preverb
                const filteredRecords = records.filter(record => record.preverb.toLowerCase() === preverb.toLowerCase());
                if (filteredRecords.length === 0) {
                    setData(null);
                    setLoading(false);
                    return;
                }
                // Count verbal bases
                const verbalBases = {};
                filteredRecords.forEach(record => {
                    const lemma = record.lemma;
                    verbalBases[lemma] = (verbalBases[lemma] || 0) + 1;
                });
                // Count meanings
                const meanings = {};
                filteredRecords.forEach(record => {
                    const meaning = record.preverb_semantics;
                    meanings[meaning] = (meanings[meaning] || 0) + 1;
                });
                // Create examples
                const lemmaToMeanings = new Map();
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
                    }
                    else {
                        const existing = lemmaToMeanings.get(key);
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
                const preverbData = {
                    verbal_bases: verbalBases,
                    meanings,
                    total_occurrences: filteredRecords.length,
                    examples
                };
                setData(preverbData);
                setLoading(false);
            }
            catch (error) {
                console.error(`Error fetching data for preverb ${preverb}:`, error);
                setError(error instanceof Error ? error : new Error('Unknown error'));
                setLoading(false);
            }
        };
        fetchData();
    }, [preverb, language]);
    return { data, loading, error, language };
};
exports.useLocalPreverbData = useLocalPreverbData;
/**
 * Parse a meaning ID to extract preverb, lemma, and language
 */
const parseMeaningId = (meaningId) => {
    const parts = meaningId.split('_');
    // Default values
    const result = {
        preverb: '',
        lemma: '',
        language: 'latin'
    };
    if (parts.length >= 2) {
        result.preverb = parts[0];
        // If we have language as the last part
        if (parts.length >= 3 && (parts[parts.length - 1] === 'latin' || parts[parts.length - 1] === 'greek')) {
            result.language = parts[parts.length - 1];
            // Join all middle parts as the lemma in case it contains underscores
            result.lemma = parts.slice(1, parts.length - 1).join('_');
        }
        else {
            // Otherwise just use all remaining parts as the lemma
            result.lemma = parts.slice(1).join('_');
        }
    }
    return result;
};
/**
 * Get data for a specific meaning
 */
const useLocalMeaningData = (meaningId) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
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
                const matchingRecords = records.filter(record => record.preverb.toLowerCase() === preverb.toLowerCase() &&
                    record.lemma.toLowerCase() === lemma.toLowerCase());
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
            }
            catch (error) {
                console.error(`Error fetching meaning data for ${meaningId}:`, error);
                setError(error instanceof Error ? error : new Error(`Failed to fetch data for meaning: ${meaningId}. ${error.message}`));
                setLoading(false);
            }
        };
        fetchData();
    }, [meaningId]);
    return { data, loading, error };
};
exports.useLocalMeaningData = useLocalMeaningData;
