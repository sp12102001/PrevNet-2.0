import React from 'react';

interface ErrorFallbackProps {
    error: Error | null;
    resetError?: () => void;
    customMessage?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
    error,
    resetError,
    customMessage = "We're having trouble connecting to the API."
}) => {
    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md mt-10">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
                <p className="text-gray-700 mb-4">{customMessage}</p>

                {error && (
                    <div className="bg-red-50 p-4 rounded-md mb-4 text-left">
                        <p className="font-medium text-red-800">Error details:</p>
                        <p className="text-red-700 mt-1 text-sm whitespace-pre-wrap overflow-auto max-h-40">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="mt-6">
                    <p className="text-gray-600 mb-4">
                        Please check your internet connection and try again.
                        If the problem persists, the API service might be down.
                    </p>

                    {resetError && (
                        <button
                            onClick={resetError}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;
