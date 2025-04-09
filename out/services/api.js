"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMeaningData = exports.usePreverbData = exports.usePreverbs = exports.fetchMeaningData = exports.fetchPreverbData = exports.fetchPreverbs = exports.debugEndpoints = void 0;
const react_1 = require("react");
// Available preverbs endpoints from prevnet.sites.er.kcl.ac.uk
const PREVERBS = [
    'ab', 'ad', 'ante', 'circum', 'com', 'de', 'ex', 'in', 'inter', 'intro', 'ob', 'per', 'post', 'prae', 'praeter', 'pro', 're', 'sub', 'super', 'trans'
];
// Use Next.js rewrite to access KCL API
const BASE_URL = '/api/kcl/preverbs';
// Original CSV Getter endpoints (not accessible)
const ORIGINAL_ENDPOINTS = {
    PREVERBS: 'https://api.csvgetter.com/82Nuk0RE9PM52hY6pZul',
    LG_PREVERBS: 'https://api.csvgetter.com/ciSlBjZOU5igv0UWp2Ix',
    MOCK_DATA: 'https://api.csvgetter.com/8fQIxZDSxvYUtKGPCSIa'
};
// Local proxy endpoints
const ENDPOINTS = {
    PREVERBS: '/api/proxy?endpoint=preverbs',
    LG_PREVERBS: '/api/proxy?endpoint=lg_preverbs',
    MOCK_DATA: '/api/proxy?endpoint=mock_data'
};
// CORS proxy options (use if direct access fails)
const CORS_PROXIES = [
    'https://cors-anywhere.herokuapp.com/',
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?'
];
// Attempt fetch with CORS proxies if direct fetch fails
const fetchWithCorsProxy = async (url) => {
    // First try direct access
    try {
        const directResponse = await fetch(url);
        if (directResponse.ok) {
            return directResponse;
        }
    }
    catch (error) {
        console.warn(`Direct fetch to ${url} failed, trying CORS proxies...`);
    }
    // Try CORS proxies
    for (const proxy of CORS_PROXIES) {
        try {
            const proxyUrl = `${proxy}${encodeURIComponent(url)}`;
            console.log(`Trying CORS proxy: ${proxyUrl}`);
            const response = await fetch(proxyUrl);
            if (response.ok) {
                console.log(`CORS proxy ${proxy} worked for ${url}`);
                return response;
            }
        }
        catch (error) {
            console.warn(`CORS proxy ${proxy} failed for ${url}`);
        }
    }
    throw new Error(`Failed to fetch ${url} with all CORS proxies`);
};
// Debug function to log info and test endpoints
const debugEndpoints = async () => {
    try {
        console.log('Debugging endpoints...');
        console.log('Using base URL:', BASE_URL);
        // Test preverb endpoint with 'intro'
        try {
            console.log('Fetching preverb data for "intro"...');
            const response = await fetch(`${BASE_URL}/intro`);
            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }
            const data = await response.json();
            console.log('Preverb data sample:', data);
        }
        catch (error) {
            console.error('Failed to fetch preverb data:', error);
        }
    }
    catch (error) {
        console.error('Error debugging endpoints:', error);
    }
};
exports.debugEndpoints = debugEndpoints;
// Fetch all preverbs
const fetchPreverbs = async () => {
    try {
        console.log('Returning hardcoded list of preverbs');
        // Return the hardcoded list of preverbs
        return PREVERBS.sort();
    }
    catch (error) {
        console.error('Error fetching preverbs:', error);
        return [];
    }
};
exports.fetchPreverbs = fetchPreverbs;
// Fetch data for a specific preverb
const fetchPreverbData = async (preverb) => {
    try {
        console.log(`Fetching data for preverb: ${preverb}`);
        const response = await fetch(`${BASE_URL}/${preverb}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data for preverb: ${preverb}`);
        }
        const data = await response.json();
        console.log(`Received data for preverb ${preverb}:`, data);
        // The KCL API already returns data in the expected format
        return data;
    }
    catch (error) {
        console.error(`Error fetching data for preverb ${preverb}:`, error);
        return null;
    }
};
exports.fetchPreverbData = fetchPreverbData;
// Fetch data for a specific meaning
const fetchMeaningData = async (meaningId) => {
    try {
        console.log(`Fetching data for meaning: ${meaningId}`);
        // For each preverb, fetch its data and check if it contains the required meaning_id
        let occurrences = [];
        let verb_semantics = 'Unknown';
        // We'll check a few common preverbs that might contain the meaning
        const preverbsToCheck = ['ab', 'ad', 'de', 'ex', 'in', 'pro', 'intro'];
        for (const preverb of preverbsToCheck) {
            try {
                const response = await fetch(`${BASE_URL}/${preverb}`);
                if (response.ok) {
                    const data = await response.json();
                    // Check if any examples match the meaning_id
                    const matchingExamples = data.examples.filter(ex => ex.meaning_id === meaningId);
                    if (matchingExamples.length > 0) {
                        // If we found matching examples, get the verb semantics
                        verb_semantics = matchingExamples[0].verb_semantics;
                        // Add occurrences
                        matchingExamples.forEach(ex => {
                            occurrences.push({
                                preverb,
                                lemma: ex.lemma,
                                sentence: `Example of ${preverb} + ${ex.lemma}`,
                                token: ex.lemma,
                                location_url: ''
                            });
                        });
                    }
                }
            }
            catch (err) {
                console.warn(`Error checking preverb ${preverb} for meaning ${meaningId}:`, err);
            }
        }
        if (occurrences.length === 0) {
            console.warn(`No data found for meaning: ${meaningId}`);
            return null;
        }
        return {
            occurrences,
            verb_semantics
        };
    }
    catch (error) {
        console.error(`Error fetching data for meaning ${meaningId}:`, error);
        return null;
    }
};
exports.fetchMeaningData = fetchMeaningData;
// Custom hook for fetching preverbs
const usePreverbs = () => {
    const [preverbs, setPreverbs] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        console.log('Fetching preverbs...');
        setLoading(true);
        // Run debug on first load
        (0, exports.debugEndpoints)();
        (0, exports.fetchPreverbs)()
            .then(data => {
            console.log('Preverbs fetched successfully:', data);
            setPreverbs(data);
            setLoading(false);
        })
            .catch(err => {
            console.error('Error in usePreverbs hook:', err);
            setError(err instanceof Error ? err : new Error(String(err)));
            setLoading(false);
        });
    }, []);
    return { preverbs, loading, error };
};
exports.usePreverbs = usePreverbs;
// Custom hook for fetching data for a specific preverb
const usePreverbData = (preverb) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (preverb) {
            setLoading(true);
            setError(null);
            (0, exports.fetchPreverbData)(preverb)
                .then(data => {
                setData(data);
                setLoading(false);
            })
                .catch(err => {
                console.error(`Error in usePreverbData hook for preverb ${preverb}:`, err);
                setError(err instanceof Error ? err : new Error(String(err)));
                setLoading(false);
            });
        }
        else {
            // Reset state when no preverb is selected
            setData(null);
            setError(null);
        }
    }, [preverb]);
    return { data, loading, error };
};
exports.usePreverbData = usePreverbData;
// Custom hook for fetching data for a specific meaning
const useMeaningData = (meaningId) => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (meaningId) {
            setLoading(true);
            setError(null);
            (0, exports.fetchMeaningData)(meaningId)
                .then(data => {
                setData(data);
                setLoading(false);
            })
                .catch(err => {
                console.error(`Error in useMeaningData hook for meaning ${meaningId}:`, err);
                setError(err instanceof Error ? err : new Error(String(err)));
                setLoading(false);
            });
        }
        else {
            // Reset state when no meaningId is provided
            setData(null);
            setError(null);
        }
    }, [meaningId]);
    return { data, loading, error };
};
exports.useMeaningData = useMeaningData;
