import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAllMotionParticipantLemmas } from '@/services/localData';
import WordCloudWrapper from '@/components/WordCloudWrapper';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorFallback from '@/components/ErrorFallback';

const MotionParticipantSearchIndex = () => {
    const router = useRouter();
    const [lemma, setLemma] = useState('');
    const { data: lemmaData, loading, error, language } = useAllMotionParticipantLemmas();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (lemma.trim()) {
            router.push(`/motion-participants/search/${encodeURIComponent(lemma.trim())}`);
        }
    };

    const handleWordClick = (word: { text: string; value: number }) => {
        router.push(`/motion-participants/search/${encodeURIComponent(word.text)}`);
    };

    const handleExampleClick = (exampleLemma: string) => {
        router.push(`/motion-participants/search/${encodeURIComponent(exampleLemma)}`);
    };

    // Example lemmas that commonly appear as motion participants
    const exampleLemmas = [
        'homo', 'deus', 'rex', 'miles', 'navis', 'equus', 'manus', 'caput',
        'urbs', 'domus', 'terra', 'aqua', 'mons', 'via', 'porta', 'campus'
    ];

    const wordCloudOptions = {
        fontSizes: [20, 60] as [number, number],
        rotations: 2,
        rotationAngles: [-90, 0] as [number, number],
        padding: 2,
        colors: ['#3182CE', '#2B6CB0', '#2C5282', '#2A4365'],
    };

    const wordCloudCallbacks = {
        onWordClick: handleWordClick,
        getWordTooltip: (word: { text: string, value: number }) => `${word.text} (${word.value} occurrences)`,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Motion Participants Search</h1>
                    <p className="text-lg text-muted-foreground mb-2">
                        Search for lemmas that appear as Figure or Ground in motion events
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Enter a lemma to see all occurrences where it appears as a motion participant (Figure or Ground) across different preverbs
                    </p>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Most Common Motion Participants</CardTitle>
                        <CardDescription>
                            This word cloud shows the most frequent lemmas acting as Figure or Ground in the <span className="font-semibold capitalize">{language}</span> corpus. Click a word to search.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading && <LoadingSpinner />}
                        {error && <ErrorFallback error={error} resetError={() => {}} />}
                        {lemmaData && (
                            <div className="h-96">
                                <WordCloudWrapper
                                    data={lemmaData}
                                    options={wordCloudOptions}
                                    callbacks={wordCloudCallbacks}
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Search by Lemma</CardTitle>
                        <CardDescription>
                            Enter a Latin lemma to find all instances where it appears as a motion participant
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div>
                                <label htmlFor="lemma-input" className="block text-sm font-medium mb-2">
                                    Lemma
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        id="lemma-input"
                                        type="text"
                                        value={lemma}
                                        onChange={(e) => setLemma(e.target.value)}
                                        placeholder="Enter a lemma (e.g., homo, deus, urbs...)"
                                        className="flex-1 px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        autoComplete="off"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!lemma.trim()}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Enter the dictionary form of the Latin word you want to search for.
                            </p>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Example Searches</CardTitle>
                        <CardDescription>
                            Click on any lemma below to see example motion participant searches
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                            {exampleLemmas.map((exampleLemma) => (
                                <button
                                    key={exampleLemma}
                                    onClick={() => handleExampleClick(exampleLemma)}
                                    className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors text-center border border-border hover:border-primary"
                                    title={`Search for "${exampleLemma}" as motion participant`}
                                >
                                    {exampleLemma}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-200">What are Motion Participants?</h4>
                            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                                <p>
                                    <strong>Figure:</strong> The entity performing the motion (e.g., person, animal, object moving)
                                </p>
                                <p>
                                    <strong>Ground:</strong> The background location where motion is performed (e.g., city, building, terrain)
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MotionParticipantSearchIndex;