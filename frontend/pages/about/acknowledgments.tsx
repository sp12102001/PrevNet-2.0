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
                <p>The PrevNet project would not have been possible without the generous support and guidance of several individuals and institutions.</p>

                <p>I would like to express my sincere gratitude to King&apos;s College London, where this research is being conducted, for providing the resources and academic environment that have been crucial to the success of this project.</p>

                <p>I am particularly thankful for the financial support from the <a href="https://gtr.ukri.org/projects?ref=studentship-2749398" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">London Arts & Humanities Partnership (LAHP)</a>, whose funding has enabled this research as part of my PhD studies.</p>

                <h2>Special Thanks</h2>

                <p>Special thanks go to my supervisors at King&apos;s College London:</p>

                <ul>
                    <li><a href="https://www.kcl.ac.uk/people/barbara-mcgillivray" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Barbara McGillivray</a>, for her invaluable guidance in linguistic analysis and corpus methodologies,</li>
                    <li><a href="https://www.kcl.ac.uk/people/andrea-ballatore" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Andrea Ballatore</a>, for his expertise in digital humanities and spatial analysis,</li>
                    <li><a href="https://profiles.ucl.ac.uk/4925-stephen-colvin" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Stephen Colvin</a>, for his insights into Ancient Greek and linguistic theory.</li>
                </ul>

                <p>I also wish to acknowledge the technical team at King&apos;s College, particularly <a href="https://www.kcl.ac.uk/people/zsolt-balla" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Zsolt Balla</a> and <a href="https://www.kcl.ac.uk/people/sanjana-prabhakar" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Sanjana Prabhakar</a>, whose contributions to the technical setup and website development have been essential for the project&apos;s success.</p>
            </div>
        </div>
    );
};

export default Acknowledgments;