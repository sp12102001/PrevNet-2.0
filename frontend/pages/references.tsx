import React from 'react';

const References: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <div className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-400 p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">References</h1>
                <p className="text-lg sm:text-xl text-white font-light opacity-90">Bibliography on Preverbs</p>
            </div>

            <div className="bg-white dark:bg-card rounded-xl shadow-sm p-8 space-y-6">
                <p className="text-lg text-muted-foreground">
                    This section will contain a comprehensive list of references on preverbs.
                    The references will be added soon to provide users with additional resources for understanding preverbs and their functions.
                </p>

                <div className="text-center py-8">
                    <div className="inline-flex items-center px-4 py-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        References will be added soon
                    </div>
                </div>
            </div>
        </div>
    );
};

export default References;