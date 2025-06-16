import React, { useState, useEffect } from 'react';

interface Word {
    text: string;
    value: number;
    lemma?: string;
}

interface WordCloudOptions {
    colors: string[];
    rotations: number;
    rotationAngles: number[];
    fontSizes: number[];
    padding: number;
}

interface WordCloudCallbacks {
    onWordClick: (word: Word) => void;
    getWordTooltip: (word: Word) => string;
}

interface WordCloudWrapperProps {
    data: Word[];
    options: WordCloudOptions;
    callbacks: WordCloudCallbacks;
}

type WordCloudComponent = React.ComponentType<{
    data: Word[];
    options: WordCloudOptions;
    callbacks: WordCloudCallbacks;
}>;

const WordCloudWrapper: React.FC<WordCloudWrapperProps> = ({ data, options, callbacks }) => {
    const [WordCloud, setWordCloud] = useState<WordCloudComponent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadWordCloud = async () => {
            try {
                // Dynamically import react-wordcloud to handle SSR issues
                const wordCloudModule = await import('react-wordcloud');
                setWordCloud(() => wordCloudModule.default);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load WordCloud component:', err);
                setError('WordCloud component failed to load');
                setLoading(false);
            }
        };

        loadWordCloud();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !WordCloud) {
        // Fallback: Simple word list when WordCloud fails
        return (
            <div className="p-4">
                <div className="mb-4 text-sm text-muted-foreground">
                    WordCloud view unavailable. Showing word list instead:
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {data.map((word, index) => (
                        <button
                            key={index}
                            onClick={() => callbacks.onWordClick(word)}
                            className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors text-left border border-border hover:border-primary"
                            title={callbacks.getWordTooltip(word)}
                            style={{
                                fontSize: `${Math.min(16 + word.value * 2, 24)}px`,
                                color: options.colors[index % options.colors.length]
                            }}
                        >
                            {word.text}
                            <span className="text-xs text-muted-foreground ml-2">
                                ({word.value})
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    try {
        return (
            <WordCloud
                data={data}
                options={options}
                callbacks={callbacks}
            />
        );
    } catch (renderError) {
        console.error('WordCloud render error:', renderError);
        // Fallback to word list if rendering fails
        return (
            <div className="p-4">
                <div className="mb-4 text-sm text-muted-foreground">
                    WordCloud rendering failed. Showing word list instead:
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {data.map((word, index) => (
                        <button
                            key={index}
                            onClick={() => callbacks.onWordClick(word)}
                            className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors text-left border border-border hover:border-primary"
                            title={callbacks.getWordTooltip(word)}
                            style={{
                                fontSize: `${Math.min(16 + word.value * 2, 24)}px`,
                                color: options.colors[index % options.colors.length]
                            }}
                        >
                            {word.text}
                            <span className="text-xs text-muted-foreground ml-2">
                                ({word.value})
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }
};

export default WordCloudWrapper;