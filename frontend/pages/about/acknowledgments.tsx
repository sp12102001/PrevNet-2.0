import React from 'react';
import BackButton from '@/components/BackButton';

const Acknowledgments = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Acknowledgments</h1>
            <p className="text-muted-foreground mb-6">
                Recognition of individuals and institutions that contributed to the PrevNet project.
            </p>

            <div className="prose max-w-none">
                <p>This page will acknowledge the individuals, institutions, and funding bodies that have contributed to the PrevNet project.</p>
                <p>Content coming soon.</p>
            </div>
        </div>
    );
};

export default Acknowledgments;