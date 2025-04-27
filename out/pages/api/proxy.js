"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// Map endpoint keys to URLs
const ENDPOINTS = {
    preverbs: 'https://api.csvgetter.com/82Nuk0RE9PM52hY6pZul',
    lg_preverbs: 'https://api.csvgetter.com/ciSlBjZOU5igv0UWp2Ix',
    mock_data: 'https://api.csvgetter.com/8fQIxZDSxvYUtKGPCSIa'
};
async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL parameter is required' });
    }
    try {
        // Decode the URL parameter
        const decodedUrl = decodeURIComponent(url);
        // Make sure we're only proxying requests to the KCL API
        if (!decodedUrl.startsWith('https://prevnet.sites.er.kcl.ac.uk/api/')) {
            return res.status(403).json({ error: 'Only KCL API requests are allowed' });
        }
        // Handle meaning IDs with # characters correctly
        const finalUrl = decodedUrl.replace(/#/g, '%23');
        // Forward the request to the KCL API
        console.log(`Proxying request to: ${finalUrl}`);
        const response = await fetch(finalUrl);
        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            // Parse as JSON
            const data = await response.json();
            return res.status(response.status).json(data);
        }
        else {
            // For non-JSON responses, return a structured error
            const text = await response.text();
            console.log(`Received non-JSON response (${contentType}): ${text.substring(0, 150)}...`);
            return res.status(response.status).json({
                error: 'Non-JSON response from API',
                status: response.status,
                contentType,
                preview: text.substring(0, 150)
            });
        }
    }
    catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch from KCL API' });
    }
}
