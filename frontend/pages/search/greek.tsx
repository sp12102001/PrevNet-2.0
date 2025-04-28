import React from 'react';
import BackButton from '@/components/BackButton';

const GreekSearch = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Ancient Greek Preverbs Search</h1>
            <p className="text-muted-foreground mb-6">
                Explore Ancient Greek preverbs and their linguistic properties.
            </p>

            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                <p className="font-bold">Coming Soon</p>
                <p>The Ancient Greek search functionality is currently in development and will be available in a future update.</p>
            </div>
        </div>
    );
};

export default GreekSearch;