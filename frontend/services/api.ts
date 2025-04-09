import { useEffect, useState } from 'react';

// Available preverbs endpoints from prevnet.sites.er.kcl.ac.uk
const PREVERBS = [
    'ab', 'ad', 'ante', 'circum', 'com', 'de', 'ex', 'in', 'inter', 'intro', 'ob', 'per', 'post', 'prae', 'praeter', 'pro', 're', 'sub', 'super', 'trans'
];

// Use direct KCL API URL in development, or the proxied URL in production
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction
    ? '/api/preverbs'  // This will use the Netlify proxy
    : 'https://prevnet.sites.er.kcl.ac.uk/api/preverbs';

export interface PreverbData {
    verbal_bases: { [key: string]: number };
    meanings: { [key: string]: number };
    total_occurrences: number;
    examples: Array<{ count: number; lemma: string; verb_semantics: string; meaning_id: string }>;
}

export interface Occurrence {
    preverb: string;
    lemma: string;
    sentence: string;
    token: string;
    location_url: string;
}

export interface MeaningData {
    occurrences: Occurrence[];
    verb_semantics: string;
}

// Debug function to log info and test endpoints
export const debugEndpoints = async () => {
    try {
        console.log('Debugging endpoints...');
        console.log('Using base URL:', BASE_URL);

        // Test direct access to KCL API
        try {
            const testUrl = `${BASE_URL}/intro`;
            console.log(`Testing direct access to KCL API: ${testUrl}`);

            const response = await fetch(testUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });

            console.log(`Direct KCL API response: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }

            const data = await response.json();
            console.log('Preverb data sample received successfully!', data);
        } catch (error) {
            console.error('Failed to fetch preverb data:', error);

            // Try with a different preverb as fallback
            try {
                console.log('Trying fallback with a different preverb...');
                const fallbackUrl = `${BASE_URL}/ab`;

                const fallbackResponse = await fetch(fallbackUrl);
                console.log(`Fallback response: ${fallbackResponse.status} ${fallbackResponse.statusText}`);

                if (fallbackResponse.ok) {
                    const fallbackData = await fallbackResponse.json();
                    console.log('Fallback preverb data sample:', fallbackData);
                }
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
            }
        }
    } catch (error) {
        console.error('Error debugging endpoints:', error);
    }
};

// Fetch all preverbs
export const fetchPreverbs = async (): Promise<string[]> => {
    try {
        console.log('Returning hardcoded list of preverbs');
        // Return the hardcoded list of preverbs
        return PREVERBS.sort();
    } catch (error) {
        console.error('Error fetching preverbs:', error);
        return [];
    }
};

// Fetch data for a specific preverb
export const fetchPreverbData = async (preverb: string): Promise<PreverbData | null> => {
    try {
        const url = `${BASE_URL}/${preverb}`;
        console.log(`Fetching data for preverb from URL: ${url}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        });

        console.log(`Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data for preverb: ${preverb} - Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Received data for preverb ${preverb}:`, data);

        // The KCL API already returns data in the expected format
        return data as PreverbData;
    } catch (error) {
        console.error(`Error fetching data for preverb ${preverb}:`, error);
        return null;
    }
};

// Fetch data for a specific meaning
export const fetchMeaningData = async (meaningId: string): Promise<MeaningData | null> => {
    try {
        console.log(`Fetching data for meaning: ${meaningId}`);

        // For each preverb, fetch its data and check if it contains the required meaning_id
        let occurrences: Occurrence[] = [];
        let verb_semantics = 'Unknown';

        // We'll check a few common preverbs that might contain the meaning
        const preverbsToCheck = ['ab', 'ad', 'de', 'ex', 'in', 'pro', 'intro'];

        for (const preverb of preverbsToCheck) {
            try {
                const url = `${BASE_URL}/${preverb}`;
                console.log(`Checking preverb ${preverb} for meaning ${meaningId} at URL: ${url}`);

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                });

                if (response.ok) {
                    const data = await response.json() as PreverbData;

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
                } else {
                    console.warn(`Failed to fetch preverb ${preverb}: ${response.status} ${response.statusText}`);
                }
            } catch (err) {
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

    } catch (error) {
        console.error(`Error fetching data for meaning ${meaningId}:`, error);
        return null;
    }
};

// Custom hook for fetching preverbs
export const usePreverbs = () => {
    const [preverbs, setPreverbs] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        console.log('Fetching preverbs...');
        setLoading(true);

        // Run debug on first load
        debugEndpoints();

        fetchPreverbs()
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

// Custom hook for fetching data for a specific preverb
export const usePreverbData = (preverb: string | null) => {
    const [data, setData] = useState<PreverbData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (preverb) {
            setLoading(true);
            setError(null);

            fetchPreverbData(preverb)
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(`Error in usePreverbData hook for preverb ${preverb}:`, err);
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setLoading(false);
                });
        } else {
            // Reset state when no preverb is selected
            setData(null);
            setError(null);
        }
    }, [preverb]);

    return { data, loading, error };
};

// Custom hook for fetching data for a specific meaning
export const useMeaningData = (meaningId: string | null) => {
    const [data, setData] = useState<MeaningData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (meaningId) {
            setLoading(true);
            setError(null);

            fetchMeaningData(meaningId)
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(`Error in useMeaningData hook for meaning ${meaningId}:`, err);
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setLoading(false);
                });
        } else {
            // Reset state when no meaningId is provided
            setData(null);
            setError(null);
        }
    }, [meaningId]);

    return { data, loading, error };
};