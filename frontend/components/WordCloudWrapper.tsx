import React, { useMemo, useState, useEffect } from 'react';
import { useWordCloud } from '@isoterik/react-word-cloud';

interface Word {
    text: string;
    value: number;
    lemma?: string;
}

interface WordCloudOptions {
    colors: string[];
    rotations: number;
    rotationAngles: [number, number];
    fontSizes: [number, number];
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

interface ComputedWord {
    text: string;
    size: number;
    rotate: number;
    x: number;
    y: number;
}

const WordCloudWrapper: React.FC<WordCloudWrapperProps> = ({ data, options, callbacks }) => {
    const [showFallback, setShowFallback] = useState(false);

    // Memoize the hook options to prevent continuous re-rendering
    const hookOptions = useMemo(() => ({
        words: data,
        font: "Inter" as const,
        fontStyle: "italic" as const,
        fontWeight: "bold" as const,
        padding: options.padding,
        rotate: (word: Word) => {
            // Use a deterministic rotation based on the word text to prevent flashing
            const hash = word.text.split('').reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
            return Math.abs(hash) % 2 === 0 ? options.rotationAngles[0] : options.rotationAngles[1];
        },
        fontSize: (word: Word) => {
            const minSize = options.fontSizes[0];
            const maxSize = options.fontSizes[1];
            const values = data.map(w => w.value);
            if (values.length === 0) return minSize;
            const maxVal = Math.max(...values);
            const minVal = Math.min(...values);
            if (maxVal === minVal) return minSize;
            const size = minSize + ((word.value - minVal) / (maxVal - minVal)) * (maxSize - minSize);
            return size;
        },
        height: 400,
        width: 800,
    }), [data, options.padding, options.rotationAngles, options.fontSizes]);

    const { computedWords, isLoading } = useWordCloud(hookOptions);

    // Memoize the word map to prevent unnecessary recalculations
    const wordMap = useMemo(() => new Map(data.map(w => [w.text, w])), [data]);

    // Fallback to grid layout if loading takes too long or causes issues
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) {
                setShowFallback(true);
            }
        }, 3000); // Show fallback after 3 seconds

        return () => clearTimeout(timer);
    }, [isLoading]);

    // Sort data by frequency for fallback display
    const sortedData = useMemo(() =>
        [...data].sort((a, b) => b.value - a.value).slice(0, 50)
    , [data]);

    if (isLoading && !showFallback) {
        return (
            <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Fallback grid layout
    if (showFallback || computedWords.length === 0) {
        return (
            <div className="p-4">
                <div className="mb-4 text-sm text-muted-foreground">
                    Showing motion participants in a simple layout:
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {sortedData.map((word, index) => {
                        const minSize = options.fontSizes[0];
                        const maxSize = options.fontSizes[1];
                        const maxVal = Math.max(...sortedData.map(w => w.value));
                        const minVal = Math.min(...sortedData.map(w => w.value));
                        const normalizedSize = maxVal === minVal ? minSize :
                            minSize + ((word.value - minVal) / (maxVal - minVal)) * (maxSize - minSize);

                        return (
                            <button
                                key={word.text}
                                onClick={() => callbacks.onWordClick(word)}
                                className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors border border-border hover:border-primary"
                                title={callbacks.getWordTooltip(word)}
                                style={{
                                    fontSize: `${Math.min(normalizedSize, 24)}px`,
                                    color: options.colors[index % options.colors.length],
                                    fontWeight: word.value > (maxVal * 0.7) ? 'bold' : 'normal'
                                }}
                            >
                                {word.text}
                                <span className="text-xs text-muted-foreground ml-1">
                                    ({word.value})
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: hookOptions.width, height: hookOptions.height, position: 'relative' }}>
            {computedWords.map((word: ComputedWord, i: number) => {
                const originalWord = wordMap.get(word.text);
                if (!originalWord) return null;

                return (
                    <div
                        key={`${word.text}-${word.x}-${word.y}`}
                        style={{
                            position: 'absolute',
                            left: word.x,
                            top: word.y,
                            fontSize: word.size,
                            transform: `rotate(${word.rotate}deg)`,
                            color: options.colors[i % options.colors.length],
                            cursor: 'pointer'
                        }}
                        onClick={() => callbacks.onWordClick(originalWord)}
                        title={callbacks.getWordTooltip(originalWord)}
                    >
                        {word.text}
                    </div>
                );
            })}
        </div>
    );
};

export default WordCloudWrapper;