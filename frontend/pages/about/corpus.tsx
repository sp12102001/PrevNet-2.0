import React from 'react';
import BackButton from '@/components/BackButton';

const Corpus = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Corpus</h1>
            <p className="text-muted-foreground mb-6">
                Information about the text corpus used in the PrevNet project.
            </p>

            <div className="prose max-w-none">
                <p>This page will contain information about the corpus used in the PrevNet project.</p>
                <p>Content coming soon.</p>
            </div>
        </div>
    );
};

export default Corpus;