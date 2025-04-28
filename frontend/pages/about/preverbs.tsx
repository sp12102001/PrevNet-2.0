import React from 'react';
import BackButton from '@/components/BackButton';

const Preverbs = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Preverbs</h1>
            <p className="text-muted-foreground mb-6">
                Understanding preverbs and their linguistic significance.
            </p>

            <div className="prose max-w-none">
                <p>This page will contain detailed information about preverbs, their linguistic features, and usage patterns in ancient languages.</p>
                <p>Content coming soon.</p>
            </div>
        </div>
    );
};

export default Preverbs;