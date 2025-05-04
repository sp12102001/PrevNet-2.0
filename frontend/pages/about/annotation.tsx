import React from 'react';
import BackButton from '@/components/BackButton';

const Annotation = () => {
    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold mt-6 mb-2">Annotation</h1>
            <p className="text-muted-foreground mb-8">
                Learn about our annotation methodology and linguistic parameters.
            </p>

            <div className="prose max-w-none space-y-8">
                <section>
                    <p>In PrevNet, annotation is the core process through which we analyze how preverbs interact with motion verbs in Latin and Ancient Greek. Each instance of a preverbed verb in our dataset is manually annotated with the INCEpTION annotation tool, ensuring accuracy and consistency throughout the project. This process allows us to capture detailed linguistic information, revealing how spatial and comitative meanings are conveyed through preverb-verb combinations.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">What Is Annotated?</h2>
                    <p>For every preverbed verb in our study, we annotate:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><strong>Language</strong>: Whether the verb is in Latin or Ancient Greek.</li>
                        <li><strong>Preverb</strong>: The specific preverb attached to the verb (e.g., <em>ab-</em>, <em>ana-</em>, <em>eis-</em>).</li>
                        <li><strong>Verb</strong>: The base verb that the preverb modifies (e.g., <em>eo</em>, <em>gradior</em>, <em>volo</em>).</li>
                        <li><strong>Meaning</strong>: The spatial or comitative meaning indicated by the preverb, including the type of motion (e.g., direction, source, path, or location).</li>
                        <li><strong>Verb Class</strong>: The classification of the verb according to motion type (e.g., inherently directed motion, run-verbs, or verbs using a vehicle).</li>
                        <li><strong>Contextual Information</strong>: Additional details on how the preverb modifies the verb meaning based on specific usages within texts.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">The Annotation Process</h2>
                    <p>The annotation was performed manually using <strong>INCEpTION</strong> (an advanced, web-based tool for linguistic annotation). This tool facilitates precise tagging of linguistic data, allowing for consistent and scalable annotation of our extensive dataset. You can learn more about INCEpTION <a href="https://inception-project.github.io/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">here</a>.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Annotation Guidelines</h2>
                    <p>The annotation process follows the comprehensive guidelines established by Farina (2024), which provide a detailed framework for annotating preverbed motion verbs in both Latin and Ancient Greek. These guidelines ensure that the annotation process is systematic and rigorous, allowing for accurate comparison between the two languages.</p>
                </section>
            </div>
        </div>
    );
};

export default Annotation;