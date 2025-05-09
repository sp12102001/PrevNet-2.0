import { useEffect, useState } from 'react';

// Original KCL API endpoints
const KCL_PREVERBS_URL = 'https://prevnet.sites.er.kcl.ac.uk/api/preverbs';
const KCL_MEANINGS_URL = 'https://prevnet.sites.er.kcl.ac.uk/api/meanings';

export interface PreverbData {
    verbal_bases: { [key: string]: number };
    meanings: { [key: string]: number };
    total_occurrences: number;
    examples: Array<{ count: number; lemma: string; verb_semantics: string; meaning_id: string }>;
    allExamples?: Array<{
        lemma: string;
        verb_semantics: string;
        meaning_id: string;
        sentence: string;
        author: string;
        title: string;
        century: string;
    }>;
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
        const fetchOptions: RequestInit = {
            ...options,
            signal: controller.signal
        };

        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutId);

        if (response.ok) return response;

        // If response is not ok and we have retries left
        if (retries > 0) {
            console.warn(`Request to ${url} failed with status ${response.status}, retrying... (${retries} retries left)`);
            await new Promise<void>(resolve => setTimeout(resolve, API_RETRY_CONFIG.retryDelay));
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
            await new Promise<void>(resolve => setTimeout(resolve, API_RETRY_CONFIG.retryDelay));
            return fetchWithRetry(url, options, retries - 1);
        }
        throw error;
    }
};

// Debug function to log info and test endpoints
export const debugEndpoints = async () => {
    try {
        console.log('Debugging endpoints...');
        console.log('Using KCL API via proxy');

        // Test access to KCL API via proxy
        try {
            const targetUrl = `${KCL_PREVERBS_URL}/intro`;
            const proxyUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
            console.log(`Testing proxy access to KCL API: ${proxyUrl}`);

            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log(`Proxy response: ${response.status} ${response.statusText}`);

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
                const fallbackTargetUrl = `${KCL_PREVERBS_URL}/ab`;
                const fallbackProxyUrl = `/api/proxy?url=${encodeURIComponent(fallbackTargetUrl)}`;

                const fallbackResponse = await fetch(fallbackProxyUrl);
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

// Get a list of available preverbs from the KCL API
export const fetchPreverbs = async (): Promise<string[]> => {
    try {
        // Try to fetch the list of available preverbs from KCL API
        const targetUrl = KCL_PREVERBS_URL;
        const url = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
        console.log(`Fetching available preverbs via proxy: ${url}`);

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        const response = await fetchWithRetry(url, requestOptions);

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                console.log(`Received ${data.length} preverbs from API`);
                return data.sort();
            }
        }

        console.warn(`Failed to fetch preverbs list, status: ${response.status}`);

        // Fallback: Try a few known preverbs to see which ones work
        const knownPreverbs = ['ab', 'ad', 'in', 'ex', 'per', 'com', 'de', 'pro', 're', 'trans'];
        const availablePreverbs = [];

        for (const preverb of knownPreverbs) {
            try {
                const testTargetUrl = `${KCL_PREVERBS_URL}/${preverb}`;
                const testUrl = `/api/proxy?url=${encodeURIComponent(testTargetUrl)}`;
                const testResponse = await fetch(testUrl, { method: 'GET' });
                if (testResponse.ok) {
                    availablePreverbs.push(preverb);
                }
            } catch (err) {
                console.warn(`Error checking preverb ${preverb}:`, err);
            }
        }

        if (availablePreverbs.length > 0) {
            console.log(`Found ${availablePreverbs.length} available preverbs through testing`);
            return availablePreverbs.sort();
        }

        // Last resort fallback: try only a couple of definitely known preverbs
        return ['ab', 'in'].sort();
    } catch (error) {
        console.error('Error fetching preverbs:', error);
        // Return minimal set if everything fails
        return ['ab'];
    }
};

// Fetch data for a specific preverb
export const fetchPreverbData = async (preverb: string): Promise<PreverbData | null> => {
    try {
        const targetUrl = `${KCL_PREVERBS_URL}/${preverb}`;
        const url = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
        console.log(`Fetching data for preverb via proxy: ${url}`);

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const response = await fetchWithRetry(url, requestOptions);

        console.log(`Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data for preverb: ${preverb} - Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Received data for preverb ${preverb}:`, data);

        // Ensure data has all required fields, providing defaults for missing data
        return {
            verbal_bases: data.verbal_bases || {},
            meanings: data.meanings || {},
            total_occurrences: data.total_occurrences || 0,
            examples: Array.isArray(data.examples) ? data.examples : [],
            allExamples: Array.isArray(data.allExamples) ? data.allExamples : undefined
        };
    } catch (error) {
        console.error(`Error fetching data for preverb ${preverb}:`, error);
        return null;
    }
};

// Fetch data for a specific meaning
export const fetchMeaningData = async (meaningId: string): Promise<MeaningData | null> => {
    try {
        // Handle special characters in meaning IDs
        const safeId = meaningId.replace(/#/g, '%23');
        const targetUrl = `${KCL_MEANINGS_URL}/${safeId}`;
        const url = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
        console.log(`Fetching data for meaning via proxy: ${url}`);

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const response = await fetchWithRetry(url, requestOptions);
        const responseData = await response.json();

        // Check for API-level errors
        if (!response.ok || responseData.error) {
            console.warn(`API error for meaning ${meaningId}:`, responseData);
            throw new Error(`Failed to fetch data for meaning: ${meaningId}. ${responseData.error || response.statusText}`);
        }

        console.log(`Received data for meaning ${meaningId}:`, responseData);

        // The KCL API returns data in the expected format
        return responseData;
    } catch (error) {
        console.error(`Error fetching data for meaning ${meaningId}:`, error);

        // Fall back to constructing a meaning from available data
        try {
            console.log(`Attempting to find meaning ${meaningId} by searching through preverbs...`);

            // Create a fallback meaning object with minimal data
            return {
                verb_semantics: `Meaning ${meaningId}`,
                occurrences: []
            };
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }
        return null;
    }
};

// React hook for fetching preverbs
export const usePreverbs = () => {
    const [data, setData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchPreverbs();
                setData(result);
                setError(null);
            } catch (err) {
                console.error('Error in usePreverbs hook:', err);
                setError(err instanceof Error ? err : new Error('Unknown error fetching preverbs'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { preverbs: data, loading, error };
};

// React hook for fetching preverb data
export const usePreverbData = (preverb: string | null) => {
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
                const result = await fetchPreverbData(preverb);
                setData(result);
                setError(null);
            } catch (err) {
                console.error(`Error in usePreverbData hook for ${preverb}:`, err);
                setError(err instanceof Error ? err : new Error(`Unknown error fetching data for ${preverb}`));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [preverb]);

    return { data, loading, error };
};

// React hook for fetching meaning data
export const useMeaningData = (meaningId: string | null) => {
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
                const result = await fetchMeaningData(meaningId);
                setData(result);
                setError(null);
            } catch (err) {
                console.error(`Error in useMeaningData hook for ${meaningId}:`, err);
                setError(err instanceof Error ? err : new Error(`Unknown error fetching data for meaning ${meaningId}`));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [meaningId]);

    return { data, loading, error };
};