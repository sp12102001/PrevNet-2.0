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
                <h2>About PrevNet</h2>
                <p>PrevNet (Preverbs in Network) is an innovative digital research initiative that explores how preverbs interact with motion verbs in Latin and Ancient Greek. The project serves as both a linguistic investigation and an open-access digital resource, offering systematic documentation and analysis of preverbal constructions.</p>

                <h2>Project Origin</h2>
                <p>PrevNet is part of the PhD research conducted by Andrea Farina at King's College London (2022–2026), funded by UKRI through the <a href="https://gtr.ukri.org/projects?ref=studentship-2749398" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">London Arts & Humanities Partnership (LAHP)</a>. The project takes a comparative and diachronic approach to analyze how motion and spatial concepts are encoded through preverb-verb combinations in two major Indo-European languages.</p>

                <h2>What Are Preverbs?</h2>
                <p>Preverbs are prepositional or adverbial elements that attach to verbal bases, modifying their meanings to express nuances of motion, location, direction, or aspect. In both Latin and Ancient Greek, preverbs are critical tools for expressing spatial relations, making them ideal candidates for cross-linguistic study.</p>

                <h2>Project Goals</h2>
                <ul>
                    <li>To create a curated, extensible database of preverbed motion verbs in Latin and Ancient Greek.</li>
                    <li>To offer linguistic, semantic, and syntactic analysis of preverb-verb combinations.</li>
                    <li>To support further research in historical linguistics, corpus linguistics, and digital humanities through open, reproducible resources.</li>
                </ul>

                <h2>The Team</h2>
                <p>The PrevNet project is a collaborative effort, with contributions from a team of experts at King's College London and beyond. The team includes:</p>

                <div className="space-y-4 mt-4">
                    <div>
                        <h3 className="font-bold">Andrea Farina (Principal Investigator / PhD Candidate)</h3>
                        <p>Leads the project design, data curation, and linguistic analysis. <a href="https://www.kcl.ac.uk/people/andrea-farina" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">More about Andrea</a></p>
                    </div>

                    <div>
                        <h3 className="font-bold">Barbara McGillivray (Primary Supervisor)</h3>
                        <p>Expert in corpus linguistics and digital humanities. Guides methodological frameworks and linguistic interpretation. <a href="https://www.kcl.ac.uk/people/barbara-mcgillivray" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">More about Barbara</a></p>
                    </div>

                    <div>
                        <h3 className="font-bold">Andrea Ballatore (Second Supervisor)</h3>
                        <p>Specialist in digital humanities and spatial analysis. Ensures methodological rigor in digital approaches. <a href="https://www.kcl.ac.uk/people/andrea-ballatore" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">More about Andrea</a></p>
                    </div>

                    <div>
                        <h3 className="font-bold">Stephen Colvin (Third Supervisor)</h3>
                        <p>Provides key insights into Ancient Greek and Latin linguistics and historical grammar. <a href="https://profiles.ucl.ac.uk/4925-stephen-colvin" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">More about Stephen</a></p>
                    </div>

                    <div>
                        <h3 className="font-bold">Zsolt Balla (Technical Lead)</h3>
                        <p>Oversees technical implementation and website infrastructure. <a href="https://www.kcl.ac.uk/people/zsolt-balla" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">More about Zsolt</a></p>
                    </div>

                    <div>
                        <h3 className="font-bold">Sanjana Prabhakar (Research Assistant / Web Developer)</h3>
                        <p>Developed PrevNet application; manages end-to-end maintenance of infrastructure and user functionality.<a href="https://www.kcl.ac.uk/people/sanjana-prabhakar" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">More about Sanjana</a></p>
                    </div>
                </div>

                <h2 className="mt-6">Resources</h2>
                <ul>
                    <li><a href="http://perseusdl.github.io/treebank_data/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Perseus Digital Library Treebank Data</a></li>
                    <li><a href="https://lindat.mff.cuni.cz/repository/xmlui/handle/11372/LRT-5870" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">PROIEL Treebank</a></li>
                    <li><a href="https://figshare.com/articles/data_management_plan/Guidelines_for_a_linguistic_annotation_of_preverbed_verbs_of_motion/25055573?file=48565396" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Guidelines for a linguistic annotation of preverbed verbs of motion</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Project;