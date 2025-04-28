import React from 'react';
import PreverbDashboard from '../preverbs';
import BackButton from '@/components/BackButton';

const LatinSearch = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Latin Preverbs Search</h1>
            <p className="text-muted-foreground mb-6">
                Browse and analyze Latin preverbs and their linguistic properties.
            </p>

            <PreverbDashboard />
        </div>
    );
};

export default LatinSearch;