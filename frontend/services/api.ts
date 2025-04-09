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

// URL for meanings endpoint
const MEANINGS_URL = isProduction
    ? '/api/meanings'  // This will use the Netlify proxy
    : 'https://prevnet.sites.er.kcl.ac.uk/api/meanings';

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
    author: string;
    title: string;
    century: string;
}

export interface MeaningData {
    occurrences: Occurrence[];
    verb_semantics: string;
}

// Interface for dataset records
export interface DatasetRecord {
    preverb: string;
    lemma: string;
    sentence: string;
    verb_token: string;
    whg_url: string;
    author: string;
    title: string;
    century: string;
    meaning_id: string;
    verb_semantics: string;
    [key: string]: any; // Allow for other fields
}

// Retry configuration for API requests
const API_RETRY_CONFIG = {
    maxRetries: 3,
    retryDelay: 1000, // ms
    timeout: 60000, // 1 minute timeout
};

// Helper function to retry fetch requests
const fetchWithRetry = async (url: string, options: RequestInit, retries = API_RETRY_CONFIG.maxRetries): Promise<Response> => {
    // Add timeout to abort long-running requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_RETRY_CONFIG.timeout);

    try {
        const fetchOptions = {
            ...options,
            signal: controller.signal
        };

        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);

        if (response.ok) return response;

        // If response is not ok and we have retries left
        if (retries > 0) {
            console.warn(`Request to ${url} failed with status ${response.status}, retrying... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, API_RETRY_CONFIG.retryDelay));
            return fetchWithRetry(url, options, retries - 1);
        }

        return response; // Return the response even if not ok to let caller handle it
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error && error.name === 'AbortError') {
            console.warn(`Request to ${url} timed out after ${API_RETRY_CONFIG.timeout}ms`);
            throw new Error(`Request timed out after ${API_RETRY_CONFIG.timeout}ms`);
        }

        if (retries > 0) {
            console.warn(`Network error when fetching ${url}, retrying... (${retries} retries left)`, error);
            await new Promise(resolve => setTimeout(resolve, API_RETRY_CONFIG.retryDelay));
            return fetchWithRetry(url, options, retries - 1);
        }
        throw error;
    }
};

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

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        };

        const response = await fetchWithRetry(url, requestOptions);

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
    if (!meaningId) return null;

    try {
        console.log(`Fetching data for meaning: ${meaningId}`);

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        };

        let foundData = false;
        let occurrences: Occurrence[] = [];
        let verb_semantics = 'Unknown';

        // First, try to fetch directly from the meanings API
        try {
            const detailUrl = `${MEANINGS_URL}/${meaningId}`;
            console.log(`Fetching detailed meaning data from: ${detailUrl}`);

            const detailResponse = await fetchWithRetry(detailUrl, requestOptions);

            if (detailResponse.ok) {
                const detailData = await detailResponse.json();
                console.log('Meaning API response:', detailData);

                if (detailData && detailData.verb_semantics) {
                    verb_semantics = detailData.verb_semantics;
                }

                if (detailData && Array.isArray(detailData.occurrences) && detailData.occurrences.length > 0) {
                    console.log('Successfully fetched detailed meaning data:', detailData.occurrences.length, 'occurrences');

                    // Ensure all fields are properly mapped
                    const mappedOccurrences = detailData.occurrences.map((item: any) => ({
                        preverb: item.preverb || '',
                        lemma: item.lemma || '',
                        sentence: item.sentence || '',
                        token: item.token || '',
                        location_url: item.location_url || '',
                        author: item.author || '',
                        title: item.title || '',
                        century: item.century || ''
                    }));

                    return {
                        occurrences: mappedOccurrences,
                        verb_semantics
                    };
                } else {
                    console.warn('API returned success but with empty or invalid data');
                }
            } else {
                console.warn(`Failed to fetch meaning data: ${detailResponse.status} ${detailResponse.statusText}`);
            }
        } catch (detailError) {
            console.warn('Could not fetch data from meanings API, falling back to dataset API:', detailError);
        }

        // Next, try fetching from the dataset API
        try {
            // We need to examine what columns are available in the CSV
            const datasetUrl = isProduction
                ? `/api/dataset?page=1&per_page=1000`
                : `https://prevnet.sites.er.kcl.ac.uk/api/dataset?page=1&per_page=1000`;
            console.log(`Fetching dataset from: ${datasetUrl}`);

            const datasetResponse = await fetchWithRetry(datasetUrl, requestOptions);

            if (datasetResponse.ok) {
                const datasetData = await datasetResponse.json();
                console.log('Dataset API response structure:', Object.keys(datasetData));
                console.log('Dataset contains', datasetData.data ? datasetData.data.length : 0, 'records');

                if (datasetData && Array.isArray(datasetData.data)) {
                    // Log some sample data to understand structure
                    if (datasetData.data.length > 0) {
                        console.log('Dataset sample record:', datasetData.data[0]);
                    }

                    // Filter for the target meaning ID
                    const relevantData = datasetData.data.filter((item: DatasetRecord) => {
                        return item.meaning_id === meaningId;
                    });

                    console.log(`Found ${relevantData.length} relevant records in dataset for meaning ID ${meaningId}`);

                    if (relevantData.length > 0) {
                        // Extract verb semantics from the first result
                        verb_semantics = relevantData[0].verb_semantics || verb_semantics;
                        console.log('Verb semantics:', verb_semantics);

                        // Map the dataset records to the Occurrence interface
                        occurrences = relevantData.map((item: DatasetRecord) => {
                            // Use the verb_token field for better token highlighting
                            const token = item.verb_token || `${item.preverb}${item.lemma.toLowerCase()}`;

                            return {
                                preverb: item.preverb || '',
                                lemma: item.lemma || '',
                                sentence: item.sentence || '',
                                token: token,
                                location_url: item.whg_url || '',
                                author: item.author || '',
                                title: item.title || '',
                                century: item.century || ''
                            };
                        });

                        if (occurrences.length > 0) {
                            console.log(`Found ${occurrences.length} occurrences in dataset for meaning ${meaningId}`);
                            foundData = true;
                            return {
                                occurrences,
                                verb_semantics
                            };
                        }
                    }
                }
            } else {
                console.warn(`Failed to fetch dataset: ${datasetResponse.status} ${datasetResponse.statusText}`);
            }
        } catch (datasetError) {
            console.warn('Could not fetch data from dataset API:', datasetError);
        }

        // Only continue with preverb fallback if we haven't found data yet
        if (foundData) {
            return {
                occurrences,
                verb_semantics
            };
        }

        // As a last resort, try the individual preverbs approach
        let foundInPreverbs = false;
        const preverbsToCheck = PREVERBS;

        for (const preverb of preverbsToCheck) {
            try {
                const url = `${BASE_URL}/${preverb}`;
                console.log(`Checking preverb ${preverb} for meaning ${meaningId} at URL: ${url}`);

                const response = await fetchWithRetry(url, requestOptions);

                if (response.ok) {
                    const data = await response.json() as PreverbData;

                    // Check if any examples match the meaning_id
                    const matchingExamples = data.examples.filter(ex => ex.meaning_id === meaningId);

                    if (matchingExamples.length > 0) {
                        foundInPreverbs = true;
                        console.log(`Found matching examples in preverb ${preverb}:`, matchingExamples);

                        // If we found matching examples, get the verb semantics
                        verb_semantics = matchingExamples[0].verb_semantics || verb_semantics;
                    }
                } else {
                    console.warn(`Failed to fetch preverb ${preverb}: ${response.status} ${response.statusText}`);
                }
            } catch (err) {
                console.warn(`Error checking preverb ${preverb} for meaning ${meaningId}:`, err);
            }
        }

        // If we didn't find any direct occurrences but we found the meaning in preverbs data
        if (foundInPreverbs && occurrences.length === 0) {
            console.log(`Found meaning in preverbs but no direct occurrences: ${meaningId}`);
            // Return with empty occurrences but the semantics we found
            return {
                occurrences: [],
                verb_semantics
            };
        }

        // Final fallback - if we have occurrences, return them
        if (occurrences.length > 0) {
            return {
                occurrences,
                verb_semantics
            };
        }

        // No data found at all
        console.warn(`No data found for meaning: ${meaningId}`);
        return null;

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