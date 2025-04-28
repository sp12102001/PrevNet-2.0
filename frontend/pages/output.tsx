import React from 'react';
import BackButton from '@/components/BackButton';

const Output = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Output</h1>
            <p className="text-muted-foreground mb-6">
                Research outputs, publications, and other materials from the PrevNet project.
            </p>

            <div className="prose max-w-none">
                <p>This page will display research outputs, publications, and other materials resulting from the PrevNet project.</p>
                <p>Content coming soon.</p>
            </div>
        </div>
    );
};

export default Output;