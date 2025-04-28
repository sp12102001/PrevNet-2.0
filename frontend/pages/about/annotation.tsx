import React from 'react';
import BackButton from '@/components/BackButton';

const Annotation = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Annotation</h1>
            <p className="text-muted-foreground mb-6">
                Learn about our annotation methodology and linguistic parameters.
            </p>

            <div className="prose max-w-none">
                <p>This page will provide information about the annotation methodology and linguistic parameters used in the PrevNet project.</p>
                <p>Content coming soon.</p>
            </div>
        </div>
    );
};

export default Annotation;