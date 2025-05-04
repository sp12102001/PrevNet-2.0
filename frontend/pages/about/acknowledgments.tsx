import React from 'react';
import BackButton from '@/components/BackButton';

const Acknowledgments = () => {
    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold mt-6 mb-2">Acknowledgments</h1>
            <p className="text-muted-foreground mb-8">
                Recognition of individuals and institutions that contributed to the PrevNet project.
            </p>

            <div className="prose max-w-none space-y-8">
                <section>
                    <p>The PrevNet project would not have been possible without the generous support and guidance of several individuals and institutions.</p>

                    <p className="mt-4">I would like to express my sincere gratitude to King&apos;s College London, where this research is being conducted, for providing the resources and academic environment that have been crucial to the success of this project.</p>

                    <p className="mt-4">I am particularly thankful for the financial support from the <a href="https://gtr.ukri.org/projects?ref=studentship-2749398" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">London Arts & Humanities Partnership (LAHP)</a>, whose funding has enabled this research as part of my PhD studies.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Special Thanks</h2>

                    <p>Special thanks go to my supervisors at King&apos;s College London:</p>

                    <ul className="list-disc pl-6 space-y-2 mt-4">
                        <li><a href="https://www.kcl.ac.uk/people/barbara-mcgillivray" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Barbara McGillivray</a>, for her invaluable guidance in linguistic analysis and corpus methodologies,</li>
                        <li><a href="https://www.kcl.ac.uk/people/andrea-ballatore" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Andrea Ballatore</a>, for his expertise in digital humanities and spatial analysis,</li>
                        <li><a href="https://profiles.ucl.ac.uk/4925-stephen-colvin" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Stephen Colvin</a>, for his insights into Ancient Greek and linguistic theory.</li>
                    </ul>

                    <p className="mt-4">I also wish to acknowledge the technical team at King&apos;s College, particularly <a href="https://www.kcl.ac.uk/people/zsolt-balla" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Zsolt Balla</a> and <a href="https://www.kcl.ac.uk/people/sanjana-prabhakar" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Sanjana Prabhakar</a>, whose contributions to the technical setup and website development have been essential for the project&apos;s success.</p>
                </section>
            </div>
        </div>
    );
};

export default Acknowledgments;