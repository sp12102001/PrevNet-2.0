import React from 'react';
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
    const hookOptions = {
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
    };
    const { computedWords, isLoading } = useWordCloud(hookOptions);

    const wordMap = new Map(data.map(w => [w.text, w]));

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
                        key={word.text}
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