import React, { useEffect } from 'react';
import PreverbDashboard from '../preverbs';
import BackButton from '@/components/BackButton';
import { setCurrentLanguage } from '@/services/localData';

const GreekSearch = () => {
    // Set language to Greek when this page is loaded
    useEffect(() => {
        setCurrentLanguage('greek');
    }, []);

    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Ancient Greek Preverbs Search</h1>
            <p className="text-muted-foreground mb-6">
                Explore Ancient Greek preverbs and their linguistic properties.
            </p>

            <PreverbDashboard />
        </div>
    );
};

export default GreekSearch;