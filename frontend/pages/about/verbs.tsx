import React from 'react';
import BackButton from '@/components/BackButton';

const Verbs = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Verbs</h1>
            <p className="text-muted-foreground mb-6">
                Understanding verbs and their relationship with preverbs.
            </p>

            <div className="prose max-w-none">
                <p>This page will contain detailed information about verbs in the PrevNet project, including their relationship with preverbs and linguistic properties.</p>
                <p>Content coming soon.</p>
            </div>
        </div>
    );
};

export default Verbs;