"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAllMotionParticipantLemmas = exports.useLocalMotionParticipantSearch = exports.useLocalVerbClassSearch = exports.useLocalPreverbMeaningSearch = exports.useLocalLemmaSearch = exports.useLocalMeaningData = exports.useLocalPreverbData = exports.useLocalPreverbs = exports.getCurrentLanguage = exports.setCurrentLanguage = void 0;
const react_1 = require("react");
const utils_1 = require("./utils");
// Cache the data once loaded
let latinData = null;
let greekData = null;
let currentLanguage = 'latin';
// Define the Greek preverb order
const greekPreverbOrder = [
    'ἀνά', 'ἀντί', 'ἀπό', 'διά', 'εἰς', 'ἐκ', 'ἐν', 'ἐπί', 'κατά',
    'μετά', 'παρά', 'περί', 'πρό', 'πρός', 'σύν', 'ὑπό'
];
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
    const [language, _setLanguage] = (0, react_1.useState)(currentLanguage);
    // Listen for language changes
    (0, react_1.useEffect)(() => {
        const handleLanguageChange = () => {
            _setLanguage(currentLanguage);
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
                const uniquePreverbs = Array.from(new Set(records.map(record => record.preverb))).filter(Boolean);
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
                }
                else {
                    // For Latin, use standard alphabetical sort
                    uniquePreverbs.sort();
                }
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
    const [language, _setLanguage] = (0, react_1.useState)(currentLanguage);
    // Listen for language changes
    (0, react_1.useEffect)(() => {
        const handleLanguageChange = () => {
            _setLanguage(currentLanguage);
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
                    const meaning = (0, utils_1.cleanVerbSemantics)(record.verb_semantics);
                    meanings[meaning] = (meanings[meaning] || 0) + 1;
                });
                // Count preverb meanings (from preverb_semantics column)
                const preverbMeanings = {};
                filteredRecords.forEach(record => {
                    if (!record.preverb_semantics)
                        return;
                    // Split by commas if there are multiple meanings
                    const semantics = record.preverb_semantics.split(/,\s*/);
                    semantics.forEach(meaning => {
                        // Remove "(malefactive)" when it appears with other text
                        const cleanMeaning = meaning.trim().replace(/ ?\(malefactive\)/g, '').trim();
                        if (cleanMeaning) {
                            preverbMeanings[cleanMeaning] = (preverbMeanings[cleanMeaning] || 0) + 1;
                        }
                    });
                });
                // Classify and count literal vs non-literal meanings
                const literalMeanings = {
                    "LITERAL": 0,
                    "NON-LITERAL": 0
                };
                filteredRecords.forEach(record => {
                    if ('literal_meaning' in record && record.literal_meaning !== undefined) {
                        // Use the literal_meaning boolean field from the dataset
                        if (record.literal_meaning === true) {
                            literalMeanings["LITERAL"] += 1;
                        }
                        else {
                            literalMeanings["NON-LITERAL"] += 1;
                        }
                    }
                    else if (record.preverb_semantics) {
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
                        }
                        else {
                            literalMeanings["NON-LITERAL"] += 1;
                        }
                    }
                });
                // Count verb classes
                const verbClasses = {};
                filteredRecords.forEach(record => {
                    if (record.verb_class && record.verb_class !== 'NA') {
                        verbClasses[record.verb_class] = (verbClasses[record.verb_class] || 0) + 1;
                    }
                });
                // Count spatial relations
                const spatialRelations = {
                    "GOAL": 0,
                    "SOURCE": 0,
                    "PATH": 0,
                    "LOCATION": 0
                };
                // Count spatial expressions by type
                const spatialExpressions = {
                    goal_expression: {},
                    source_expression: {},
                    path_expression: {},
                    location_expression: {}
                };
                filteredRecords.forEach(record => {
                    if (record.spatial_relation_role && record.spatial_relation_role !== 'NA') {
                        // Parse the spatial_relation_role array string
                        const roles = record.spatial_relation_role.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);
                        const expressions = record.spatial_relation_expression && record.spatial_relation_expression !== 'NA'
                            ? record.spatial_relation_expression.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/)
                            : [];
                        roles.forEach((role, index) => {
                            const cleanRole = role.trim().toUpperCase();
                            if (cleanRole && spatialRelations.hasOwnProperty(cleanRole)) {
                                spatialRelations[cleanRole] += 1;
                                // Also count the corresponding expression
                                const expression = expressions[index] ? expressions[index].trim() : 'other';
                                switch (cleanRole) {
                                    case 'GOAL':
                                        spatialExpressions.goal_expression[expression] = (spatialExpressions.goal_expression[expression] || 0) + 1;
                                        break;
                                    case 'SOURCE':
                                        spatialExpressions.source_expression[expression] = (spatialExpressions.source_expression[expression] || 0) + 1;
                                        break;
                                    case 'PATH':
                                        spatialExpressions.path_expression[expression] = (spatialExpressions.path_expression[expression] || 0) + 1;
                                        break;
                                    case 'LOCATION':
                                        spatialExpressions.location_expression[expression] = (spatialExpressions.location_expression[expression] || 0) + 1;
                                        break;
                                }
                            }
                        });
                    }
                });
                // Create examples
                const lemmaToMeanings = new Map();
                filteredRecords.forEach(record => {
                    const key = record.lemma;
                    if (!lemmaToMeanings.has(key)) {
                        lemmaToMeanings.set(key, {
                            count: 1,
                            verb_semantics: (0, utils_1.cleanVerbSemantics)(record.verb_semantics)
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
                // Create all examples array with complete metadata
                const allExamples = filteredRecords.map((record, index) => {
                    const cleanedVerbSemantics = (0, utils_1.cleanVerbSemantics)(record.verb_semantics);
                    return {
                        lemma: record.lemma,
                        verb_semantics: cleanedVerbSemantics,
                        meaning_id: `${preverb}_${record.lemma}_${cleanedVerbSemantics.replace(/\s+/g, '_')}_${language}_${index}`,
                        sentence: record.sentence,
                        author: record.author,
                        title: record.title,
                        century: record.century,
                        language_period: record.language_period || 'Unknown',
                        morphology: record.morphology || 'Unknown',
                        verb_class: record.verb_class || 'Unknown',
                        preverb_semantics: record.preverb_semantics || 'Unknown',
                        spatial_relation_role: record.spatial_relation_role || 'NA',
                        spatial_relation_expression: record.spatial_relation_expression || 'NA',
                        figure_semantics: record.figure_semantics || 'NA',
                        ground_semantics: record.ground_semantics || 'NA',
                        participant_lemma: record.participant_lemma || 'NA',
                        participant_role: record.participant_role || 'NA',
                        passage: record.passage
                    };
                });
                // Create the preverb data
                const preverbData = {
                    verbal_bases: verbalBases,
                    meanings,
                    preverb_meanings: preverbMeanings,
                    literal_meanings: literalMeanings,
                    verb_classes: verbClasses,
                    spatial_relations: spatialRelations,
                    spatial_expressions: spatialExpressions,
                    total_occurrences: filteredRecords.length,
                    examples,
                    allExamples
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
        language: 'latin',
        verbSemantics: undefined
    };
    if (parts.length >= 2) {
        result.preverb = parts[0];
        // Handle the new format with more components
        if (parts.length >= 5) {
            result.lemma = parts[1];
            // The verb semantics could have multiple parts joined by underscores
            // We assume that the language is either the second-to-last or third-to-last part
            if (parts[parts.length - 2] === 'latin' || parts[parts.length - 2] === 'greek') {
                result.language = parts[parts.length - 2];
                result.verbSemantics = parts.slice(2, parts.length - 2).join('_');
            }
            else if (parts[parts.length - 3] === 'latin' || parts[parts.length - 3] === 'greek') {
                result.language = parts[parts.length - 3];
                result.verbSemantics = parts.slice(2, parts.length - 3).join('_');
            }
        }
        // Handle the old format
        else if (parts.length >= 3 && (parts[parts.length - 1] === 'latin' || parts[parts.length - 1] === 'greek')) {
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
                const { preverb, lemma, language, verbSemantics } = parseMeaningId(meaningId);
                if (!preverb || !lemma) {
                    throw new Error(`Invalid meaning ID format: ${meaningId}`);
                }
                // Load the appropriate data
                const records = await loadData(language);
                // Filter for the specific preverb and lemma
                let matchingRecords = records.filter(record => record.preverb.toLowerCase() === preverb.toLowerCase() &&
                    record.lemma.toLowerCase() === lemma.toLowerCase());
                // If we have verb semantics information, further filter by that
                if (verbSemantics) {
                    const cleanedVerbSemantics = verbSemantics.replace(/_/g, ' ');
                    const moreSpecificRecords = matchingRecords.filter(record => {
                        const recordVerbSemantics = (0, utils_1.cleanVerbSemantics)(record.verb_semantics);
                        return recordVerbSemantics.toLowerCase() === cleanedVerbSemantics.toLowerCase();
                    });
                    // Only use the more specific filter if it returns results
                    if (moreSpecificRecords.length > 0) {
                        matchingRecords = moreSpecificRecords;
                    }
                }
                if (matchingRecords.length === 0) {
                    throw new Error(`No data found for meaning ID: ${meaningId}`);
                }
                // Extract a representative verb semantics (using the first one)
                const verbSemanticsDisplay = (0, utils_1.cleanVerbSemantics)(matchingRecords[0].verb_semantics);
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
                    verb_semantics: verbSemanticsDisplay
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
/**
 * Search for occurrences by lemma and preverb
 */
const useLocalLemmaSearch = (preverb, lemma) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [language, _setLanguage] = (0, react_1.useState)(currentLanguage);
    (0, react_1.useEffect)(() => {
        if (!preverb || !lemma) {
            setData(null);
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const records = await loadData(language);
                const matchingRecords = records.filter(record => record.preverb.toLowerCase() === preverb.toLowerCase() &&
                    record.lemma.toLowerCase() === lemma.toLowerCase());
                if (matchingRecords.length === 0) {
                    setData([]);
                    setLoading(false);
                    return;
                }
                const occurrences = matchingRecords.map((record, index) => ({
                    id: `${preverb}_${lemma}_${index}`,
                    sentence: record.sentence,
                    author: record.author,
                    title: record.title,
                    century: record.century,
                    language_period: record.language_period || 'Unknown',
                    morphology: record.morphology || 'Unknown',
                    verb_class: record.verb_class || 'Unknown',
                    preverb_semantics: record.preverb_semantics || 'Unknown',
                    verb_semantics: (0, utils_1.cleanVerbSemantics)(record.verb_semantics),
                    passage: record.passage
                }));
                setData(occurrences);
                setLoading(false);
            }
            catch (error) {
                console.error(`Error fetching lemma search data:`, error);
                setError(error instanceof Error ? error : new Error('Failed to fetch lemma search data'));
                setLoading(false);
            }
        };
        fetchData();
    }, [preverb, lemma, language]);
    return { data, loading, error, language };
};
exports.useLocalLemmaSearch = useLocalLemmaSearch;
/**
 * Search for occurrences by preverb and preverb meaning
 */
const useLocalPreverbMeaningSearch = (preverb, meaning) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [language, _setLanguage] = (0, react_1.useState)(currentLanguage);
    (0, react_1.useEffect)(() => {
        if (!preverb || !meaning) {
            setData(null);
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const records = await loadData(language);
                const matchingRecords = records.filter(record => {
                    if (record.preverb.toLowerCase() !== preverb.toLowerCase())
                        return false;
                    if (!record.preverb_semantics)
                        return false;
                    const semantics = record.preverb_semantics.split(/,\s*/);
                    return semantics.some(semantic => {
                        const cleanSemantic = semantic.trim().replace(/ ?\(malefactive\)/g, '').trim();
                        return cleanSemantic.toLowerCase() === meaning.toLowerCase();
                    });
                });
                if (matchingRecords.length === 0) {
                    setData([]);
                    setLoading(false);
                    return;
                }
                const occurrences = matchingRecords.map((record, index) => ({
                    id: `${preverb}_${meaning}_${index}`,
                    lemma: record.lemma,
                    sentence: record.sentence,
                    author: record.author,
                    title: record.title,
                    century: record.century,
                    language_period: record.language_period || 'Unknown',
                    morphology: record.morphology || 'Unknown',
                    verb_class: record.verb_class || 'Unknown',
                    preverb_semantics: record.preverb_semantics || 'Unknown',
                    verb_semantics: (0, utils_1.cleanVerbSemantics)(record.verb_semantics),
                    passage: record.passage
                }));
                setData(occurrences);
                setLoading(false);
            }
            catch (error) {
                console.error(`Error fetching preverb meaning search data:`, error);
                setError(error instanceof Error ? error : new Error('Failed to fetch preverb meaning search data'));
                setLoading(false);
            }
        };
        fetchData();
    }, [preverb, meaning, language]);
    return { data, loading, error, language };
};
exports.useLocalPreverbMeaningSearch = useLocalPreverbMeaningSearch;
/**
 * Search for occurrences by verb class
 */
const useLocalVerbClassSearch = (preverb, verbClass) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [language, _setLanguage] = (0, react_1.useState)(currentLanguage);
    (0, react_1.useEffect)(() => {
        if (!preverb || !verbClass) {
            setData(null);
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const records = await loadData(language);
                const matchingRecords = records.filter(record => record.preverb.toLowerCase() === preverb.toLowerCase() &&
                    record.verb_class === verbClass);
                if (matchingRecords.length === 0) {
                    setData([]);
                    setLoading(false);
                    return;
                }
                const occurrences = matchingRecords.map((record, index) => ({
                    id: `${preverb}_${verbClass}_${index}`,
                    lemma: record.lemma,
                    sentence: record.sentence,
                    author: record.author,
                    title: record.title,
                    century: record.century,
                    language_period: record.language_period || 'Unknown',
                    morphology: record.morphology || 'Unknown',
                    verb_class: record.verb_class || 'Unknown',
                    preverb_semantics: record.preverb_semantics || 'Unknown',
                    verb_semantics: (0, utils_1.cleanVerbSemantics)(record.verb_semantics),
                    passage: record.passage
                }));
                setData(occurrences);
                setLoading(false);
            }
            catch (error) {
                console.error(`Error fetching verb class search data:`, error);
                setError(error instanceof Error ? error : new Error('Failed to fetch verb class search data'));
                setLoading(false);
            }
        };
        fetchData();
    }, [preverb, verbClass, language]);
    return { data, loading, error, language };
};
exports.useLocalVerbClassSearch = useLocalVerbClassSearch;
/**
 * Search for motion participant occurrences by lemma
 */
const useLocalMotionParticipantSearch = (lemma) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [language, _setLanguage] = (0, react_1.useState)(currentLanguage);
    (0, react_1.useEffect)(() => {
        if (!lemma) {
            setData(null);
            return;
        }
        const fetchData = async () => {
            try {
                setLoading(true);
                const records = await loadData(language);
                // Filter for records that contain the lemma in participant_lemma field
                const matchingRecords = records.filter(record => {
                    if (!record.participant_lemma || record.participant_lemma === 'NA')
                        return false;
                    // Parse the participant_lemma array string to find matching lemma
                    try {
                        const lemmas = record.participant_lemma.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);
                        return lemmas.some(participantLemma => participantLemma.trim().toLowerCase() === lemma.toLowerCase());
                    }
                    catch {
                        return false;
                    }
                });
                if (matchingRecords.length === 0) {
                    setData([]);
                    setLoading(false);
                    return;
                }
                // Create occurrences for display
                const occurrences = matchingRecords.map((record, index) => ({
                    id: `motion_participant_${lemma}_${index}`,
                    preverb: record.preverb,
                    sentence: record.sentence,
                    author: record.author,
                    title: record.title,
                    century: record.century,
                    language_period: record.language_period || 'Unknown',
                    morphology: record.morphology || 'Unknown',
                    verb_class: record.verb_class || 'Unknown',
                    preverb_semantics: record.preverb_semantics || 'Unknown',
                    verb_semantics: (0, utils_1.cleanVerbSemantics)(record.verb_semantics),
                    figure_semantics: record.figure_semantics || '',
                    ground_semantics: record.ground_semantics || '',
                    participant_role: record.participant_role || 'Unknown',
                    participant_lemma: record.participant_lemma || 'Unknown',
                    passage: record.passage
                }));
                setData(occurrences);
                setLoading(false);
            }
            catch (error) {
                console.error(`Error fetching motion participant search data:`, error);
                setError(error instanceof Error ? error : new Error('Failed to fetch motion participant search data'));
                setLoading(false);
            }
        };
        fetchData();
    }, [lemma, language]);
    return { data, loading, error, language };
};
exports.useLocalMotionParticipantSearch = useLocalMotionParticipantSearch;
/**
 * Get all motion participant lemmas and their frequencies for a word cloud
 */
const useAllMotionParticipantLemmas = () => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [language, _setLanguage] = (0, react_1.useState)(currentLanguage);
    // Listen for language changes
    (0, react_1.useEffect)(() => {
        const handleLanguageChange = () => {
            _setLanguage(currentLanguage);
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
                const lemmaCounts = {};
                records.forEach(record => {
                    if (!record.participant_lemma || record.participant_lemma === 'NA')
                        return;
                    try {
                        const lemmas = record.participant_lemma.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);
                        lemmas.forEach(lemma => {
                            const trimmedLemma = lemma.trim();
                            if (trimmedLemma) {
                                lemmaCounts[trimmedLemma] = (lemmaCounts[trimmedLemma] || 0) + 1;
                            }
                        });
                    }
                    catch {
                        // Ignore parsing errors for now
                    }
                });
                const lemmaData = Object.entries(lemmaCounts).map(([text, value]) => ({
                    text,
                    value,
                }));
                setData(lemmaData);
                setLoading(false);
            }
            catch (error) {
                console.error(`Error fetching all motion participant lemmas:`, error);
                setError(error instanceof Error ? error : new Error('Failed to fetch motion participant data'));
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);
    return { data, loading, error, language };
};
exports.useAllMotionParticipantLemmas = useAllMotionParticipantLemmas;
