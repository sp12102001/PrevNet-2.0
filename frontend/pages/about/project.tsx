import React from 'react';
import BackButton from '@/components/BackButton';

const Project = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Project</h1>
            <p className="text-muted-foreground mb-6">
                Details about the PrevNet project goals, methodology, and team.
            </p>

            <div className="prose max-w-none">
                <p>This page will provide detailed information about the PrevNet project, its goals, methodology, and research outcomes.</p>
                <p>Content coming soon.</p>
            </div>
        </div>
    );
};

export default Project;