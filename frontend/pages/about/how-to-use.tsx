import React from 'react';

const HowToUse: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <div className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">How to Use PrevNet</h1>
                <p className="text-lg sm:text-xl text-white font-light opacity-90">Your guide to navigating the platform</p>
            </div>

            <div className="bg-white dark:bg-card rounded-xl shadow-sm p-8 space-y-8">
                <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Choose a Language</h3>
                            <p className="text-gray-600 dark:text-gray-300">Start by selecting Latin or Ancient Greek.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pick a Preverb</h3>
                            <p className="text-gray-600 dark:text-gray-300">Browse the list of preverbs attested in the corpus and select one to explore.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Explore Visualizations</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">Each preverb comes with four interactive charts:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                                <li><strong>Lemma Distribution</strong> – which verbs combine with the preverb.</li>
                                <li><strong>Meaning Distribution</strong> – the range of senses it expresses.</li>
                                <li><strong>Literal vs. Non-Literal</strong> – how often it&apos;s used concretely or metaphorically.</li>
                                <li><strong>Top Verb Categories</strong> – the main semantic domains involved.</li>
                            </ul>
                            <p className="text-gray-600 dark:text-gray-300 mt-3">Hover for details or click to see results by period and author.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">View Examples in Context</h3>
                            <p className="text-gray-600 dark:text-gray-300">Consult example sentences with full metadata (author, work, century, form), plus links to Perseus and PHI for translations and context.</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Dive Deeper</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                                <li><strong>Spatial Relations:</strong> See how the preverb encodes Goal, Source, Path, and Location.</li>
                                <li><strong>Motion Participants:</strong> Explore who/what moves (Figure) and what it moves against (Ground) via interactive word clouds.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">6</div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Follow the Data</h3>
                            <p className="text-gray-600 dark:text-gray-300">Every chart, table, and cloud is linked back to the corpus. Click on any item to retrieve the underlying examples and trace patterns across time, texts, and authors.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400 mt-0.5">
                            <path d="M9 12l2 2 4-4"></path>
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        <div>
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Tip</h4>
                            <p className="text-blue-800 dark:text-blue-200">PrevNet is fully interactive. Hover to get numbers, click to filter, and follow links to read the text in context.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;