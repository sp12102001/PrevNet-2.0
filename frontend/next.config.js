/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    output: 'standalone',
    // Required for Netlify deployment with Next.js 13+
    images: {
        unoptimized: true,
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: "/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            // KCL API endpoints - these actually work
            {
                source: '/api/kcl/:path*',
                destination: 'https://prevnet.sites.er.kcl.ac.uk/api/:path*'
            },
            // CSV Getter endpoints - not working due to 403 errors
            {
                source: '/api/csv/:path*',
                destination: 'https://api.csvgetter.com/:path*',
            },
            {
                source: '/direct/preverbs',
                destination: 'https://api.csvgetter.com/82Nuk0RE9PM52hY6pZul',
            },
            {
                source: '/direct/lg_preverbs',
                destination: 'https://api.csvgetter.com/ciSlBjZOU5igv0UWp2Ix',
            },
            {
                source: '/direct/mock_data',
                destination: 'https://api.csvgetter.com/8fQIxZDSxvYUtKGPCSIa',
            },
        ];
    },
};

module.exports = nextConfig;