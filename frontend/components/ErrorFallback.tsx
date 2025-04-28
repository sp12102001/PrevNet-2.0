import React from 'react';

interface ErrorFallbackProps {
    error: Error;
    resetError: () => void;
    customMessage?: string | React.ReactNode;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError, customMessage }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-card border border-border p-8 rounded-xl shadow-md w-full max-w-2xl animate-fadeIn">
                <div className="flex items-center gap-3 mb-6 text-card-foreground">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Something went wrong</h2>
                </div>

                {customMessage && (
                    <div className="mb-6 text-card-foreground text-lg">{customMessage}</div>
                )}

                <div className="bg-muted/50 p-5 rounded-lg mb-6 overflow-auto max-h-60 border border-border/50">
                    <pre className="font-mono text-sm text-muted-foreground whitespace-pre-wrap break-words">
                        {error.message || 'Unknown error'}
                    </pre>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={resetError}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 font-medium shadow-sm hover:shadow"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M8 16H3v5" />
                        </svg>
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;
