import { NextApiRequest, NextApiResponse } from 'next';

// Map endpoint keys to URLs
const ENDPOINTS = {
    preverbs: 'https://api.csvgetter.com/82Nuk0RE9PM52hY6pZul',
    lg_preverbs: 'https://api.csvgetter.com/ciSlBjZOU5igv0UWp2Ix',
    mock_data: 'https://api.csvgetter.com/8fQIxZDSxvYUtKGPCSIa'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get endpoint type from query
    const { endpoint } = req.query;

    if (!endpoint || typeof endpoint !== 'string' || !ENDPOINTS[endpoint as keyof typeof ENDPOINTS]) {
        return res.status(400).json({ error: 'Invalid endpoint parameter. Use "preverbs", "lg_preverbs", or "mock_data".' });
    }

    try {
        const targetUrl = ENDPOINTS[endpoint as keyof typeof ENDPOINTS];
        console.log(`Proxying request to: ${targetUrl}`);

        const response = await fetch(targetUrl);

        if (!response.ok) {
            throw new Error(`CSV Getter API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch data from CSV Getter API' });
    }
}