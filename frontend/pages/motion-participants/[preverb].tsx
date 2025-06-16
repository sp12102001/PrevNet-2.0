import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useLocalPreverbData } from '@/services/localData';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatCentury } from '@/utils/formatters';
import { getParticipantSemantics, getCloudSemantics } from '@/services/utils';
import WordCloudWrapper from '@/components/WordCloudWrapper';

// Professional color palettes
const figureColors = ['#0d47a1', '#1976d2', '#2196f3', '#64b5f6', '#90caf9'];
const groundColors = ['#004d40', '#00796b', '#009688', '#4db6ac', '#80cbc4'];

// Interface for word cloud words
interface Word {
    text: string;
    value: number;
    lemma?: string;
}

// Interface for motion participant data
interface MotionParticipantOccurrence {
    id: string;
    sentence: string;
    author: string;
    title: string;
    century: string;
    language_period: string;
    morphology: string;
    preverb_semantics: string;
    verb_semantics: string;
    figure_semantics: string;
    ground_semantics: string;
    participant_lemma: string;
    participant_role: string;
    passage?: string;
}

// Interface for figure/ground data
interface ParticipantData {
    lemma: string;
    meaning: string;
    count: number;
}

const MotionParticipantsPage = () => {
    const router = useRouter();
    const { preverb } = router.query;
    const preverbString = Array.isArray(preverb) ? preverb[0] : preverb;

    const { data: preverbData, loading, error } = useLocalPreverbData(preverbString || null);

    const [figureData, setFigureData] = useState<ParticipantData[]>([]);
    const [groundData, setGroundData] = useState<ParticipantData[]>([]);
    const [filteredOccurrences, setFilteredOccurrences] = useState<MotionParticipantOccurrence[]>([]);
    const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState({
        author: '',
        title: '',
        century: '',
        language_period: ''
    });

    // Function to process participant data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const processParticipantData = () => {
        if (!preverbData?.allExamples) return;

        const figureMap = new Map<string, { meaning: string, count: number }>();
        const groundMap = new Map<string, { meaning: string, count: number }>();
        const occurrences: MotionParticipantOccurrence[] = [];

        preverbData.allExamples.forEach((example, index) => {
            // Skip if no participant data
            if (!example.participant_role || !example.participant_lemma ||
                example.participant_role === 'NA' || example.participant_lemma === 'NA') {
                return;
            }

            try {
                // Parse participant roles and lemmas
                const roles = example.participant_role.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);
                const lemmas = example.participant_lemma.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);

                // Get figure and ground semantics
                const figureSemanticsArray = getParticipantSemantics(example.figure_semantics || '');
                const groundSemanticsArray = getParticipantSemantics(example.ground_semantics || '');

                const figureSemanticsForCloud = getCloudSemantics(figureSemanticsArray);
                const groundSemanticsForCloud = getCloudSemantics(groundSemanticsArray);

                const figureSemanticsForTable = figureSemanticsArray.join(' / ');
                const groundSemanticsForTable = groundSemanticsArray.join(' / ');

                // Process each role-lemma pair
                for (let i = 0; i < Math.min(roles.length, lemmas.length); i++) {
                    const role = roles[i].trim();
                    const lemma = lemmas[i].trim();

                    if (role === 'Figure' && figureSemanticsForCloud) {
                        const key = `${lemma}:${figureSemanticsForCloud}`;
                        if (figureMap.has(key)) {
                            figureMap.get(key)!.count++;
                        } else {
                            figureMap.set(key, { meaning: figureSemanticsForCloud, count: 1 });
                        }
                    } else if (role === 'Ground' && groundSemanticsForCloud) {
                        const key = `${lemma}:${groundSemanticsForCloud}`;
                        if (groundMap.has(key)) {
                            groundMap.get(key)!.count++;
                        } else {
                            groundMap.set(key, { meaning: groundSemanticsForCloud, count: 1 });
                        }
                    }
                }

                // Add to occurrences for filtering
                occurrences.push({
                    id: `${index}`,
                    sentence: example.sentence || '',
                    author: example.author || '',
                    title: example.title || '',
                    century: example.century || '',
                    language_period: example.language_period || '',
                    morphology: example.morphology || '',
                    preverb_semantics: example.preverb_semantics || '',
                    verb_semantics: example.verb_semantics || '',
                    figure_semantics: figureSemanticsForTable,
                    ground_semantics: groundSemanticsForTable,
                    participant_lemma: example.participant_lemma || '',
                    participant_role: example.participant_role || '',
                    passage: example.passage
                });

            } catch (error) {
                console.warn('Error processing participant data:', error);
            }
        });

        // Convert maps to arrays
        const figureArray: ParticipantData[] = Array.from(figureMap.entries()).map(([key, data]) => ({
            lemma: key.split(':')[0],
            meaning: data.meaning,
            count: data.count
        }));

        const groundArray: ParticipantData[] = Array.from(groundMap.entries()).map(([key, data]) => ({
            lemma: key.split(':')[0],
            meaning: data.meaning,
            count: data.count
        }));

        setFigureData(figureArray.sort((a, b) => b.count - a.count));
        setGroundData(groundArray.sort((a, b) => b.count - a.count));
        setFilteredOccurrences(occurrences);
    };

    // Handle meaning click
    const handleMeaningClick = (meaning: string) => {
        setSelectedMeaning(meaning);
        setShowModal(true);
    };

    // Apply filters to occurrences
    const applyFilters = (occurrences: MotionParticipantOccurrence[]) => {
        return occurrences.filter(occurrence => {
            const matchesAuthor = !filters.author || occurrence.author.toLowerCase().includes(filters.author.toLowerCase());
            const matchesTitle = !filters.title || occurrence.title.toLowerCase().includes(filters.title.toLowerCase());
            const matchesCentury = !filters.century || occurrence.century.toLowerCase().includes(filters.century.toLowerCase());
            const matchesPeriod = !filters.language_period || occurrence.language_period.toLowerCase().includes(filters.language_period.toLowerCase());
            const matchesMeaning = !selectedMeaning ||
                occurrence.figure_semantics === selectedMeaning ||
                occurrence.ground_semantics === selectedMeaning;

            return matchesAuthor && matchesTitle && matchesCentury && matchesPeriod && matchesMeaning;
        });
    };

    // Get unique values for filters
    const getUniqueValues = (key: keyof MotionParticipantOccurrence) => {
        return Array.from(new Set(filteredOccurrences.map(item => String(item[key])))).filter(Boolean).sort();
    };

    // Generate word cloud data
    const generateWordCloudData = (data: ParticipantData[]) => {
        return data.map(item => ({
            text: item.meaning,
            value: item.count,
            lemma: item.lemma
        }));
    };

    useEffect(() => {
        if (preverbData) {
            processParticipantData();
        }
    }, [preverbData, processParticipantData]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center py-8 text-red-500">Error loading data: {error.message}</div>;
    if (!preverbData) return <div>No data available</div>;

    const modalOccurrences = selectedMeaning ? applyFilters(filteredOccurrences) : [];
    const figureWordCloudData = generateWordCloudData(figureData);
    const groundWordCloudData = generateWordCloudData(groundData);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            {/* Header */}
            <div className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-green-500 to-green-400 p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                    Motion Participants: {preverbString}
                </h1>
                <p className="text-lg sm:text-xl text-white font-light opacity-90">
                    Figure and Ground Analysis
                </p>
            </div>

            {/* Figure Word Cloud */}
            <Card>
                <CardHeader>
                    <CardTitle>Figure Semantics</CardTitle>
                    <CardDescription>Entities performing the motion</CardDescription>
                </CardHeader>
                <CardContent>
                    {figureWordCloudData.length > 0 ? (
                        <div style={{ width: '100%', height: '300px' }}>
                            <WordCloudWrapper
                                data={figureWordCloudData}
                                options={{
                                    colors: figureColors,
                                    rotations: 2,
                                    rotationAngles: [-90, 0],
                                    fontSizes: [20, 60],
                                    padding: 1,
                                }}
                                callbacks={{
                                    onWordClick: (word: Word) => handleMeaningClick(word.text),
                                    getWordTooltip: (word: Word) => `${word.text} (${word.value} occurrences)`,
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No significant figure data to display
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Ground Word Cloud */}
            <Card>
                <CardHeader>
                    <CardTitle>Ground Semantics</CardTitle>
                    <CardDescription>Background locations for the motion</CardDescription>
                </CardHeader>
                <CardContent>
                    {groundWordCloudData.length > 0 ? (
                        <div style={{ width: '100%', height: '300px' }}>
                            <WordCloudWrapper
                                data={groundWordCloudData}
                                options={{
                                    colors: groundColors,
                                    rotations: 2,
                                    rotationAngles: [-90, 0],
                                    fontSizes: [20, 60],
                                    padding: 1,
                                }}
                                callbacks={{
                                    onWordClick: (word: Word) => handleMeaningClick(word.text),
                                    getWordTooltip: (word: Word) => `${word.text} (${word.value} occurrences)`,
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No significant ground data to display
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Figure Examples Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Figure: Examples</CardTitle>
                    <CardDescription>Figure participants with their meanings and frequency</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-auto max-h-[400px] rounded-md border">
                        <Table>
                            <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead>Figure Lemma</TableHead>
                                    <TableHead>Meaning</TableHead>
                                    <TableHead className="w-[80px] text-right">Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {figureData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.lemma}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => handleMeaningClick(item.meaning)}
                                                className="text-primary hover:text-primary/80 hover:underline text-left"
                                            >
                                                {item.meaning}
                                            </button>
                                        </TableCell>
                                        <TableCell className="text-right">{item.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Ground Examples Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Ground: Examples</CardTitle>
                    <CardDescription>Ground participants with their meanings and frequency</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-auto max-h-[400px] rounded-md border">
                        <Table>
                            <TableHeader className="sticky top-0 bg-background z-10">
                                <TableRow>
                                    <TableHead>Ground Lemma</TableHead>
                                    <TableHead>Meaning</TableHead>
                                    <TableHead className="w-[80px] text-right">Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {groundData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.lemma}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => handleMeaningClick(item.meaning)}
                                                className="text-primary hover:text-primary/80 hover:underline text-left"
                                            >
                                                {item.meaning}
                                            </button>
                                        </TableCell>
                                        <TableCell className="text-right">{item.count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Modal for examples */}
            {showModal && selectedMeaning && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-background border border-border rounded-lg shadow-lg max-w-6xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    Examples: &quot;{selectedMeaning}&quot;
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="Close modal"
                                    title="Close modal"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Author</label>
                                    <select
                                        value={filters.author}
                                        onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                        title="Filter by author"
                                    >
                                        <option value="">All Authors</option>
                                        {getUniqueValues('author').map(author => (
                                            <option key={author} value={author}>{author}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <select
                                        value={filters.title}
                                        onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                        title="Filter by title"
                                    >
                                        <option value="">All Titles</option>
                                        {getUniqueValues('title').map(title => (
                                            <option key={title} value={title}>{title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Century</label>
                                    <select
                                        value={filters.century}
                                        onChange={(e) => setFilters(prev => ({ ...prev, century: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                        title="Filter by century"
                                    >
                                        <option value="">All Centuries</option>
                                        {getUniqueValues('century').map(century => (
                                            <option key={century} value={century}>{century}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Language Period</label>
                                    <select
                                        value={filters.language_period}
                                        onChange={(e) => setFilters(prev => ({ ...prev, language_period: e.target.value }))}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                        title="Filter by language period"
                                    >
                                        <option value="">All Periods</option>
                                        {getUniqueValues('language_period').map(period => (
                                            <option key={period} value={period}>{period}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Results Table */}
                            <div className="overflow-auto max-h-[400px] rounded-md border">
                                <Table>
                                    <TableHeader className="sticky top-0 bg-background z-10">
                                        <TableRow>
                                            <TableHead>Sentence</TableHead>
                                            <TableHead>Author</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Century</TableHead>
                                            <TableHead>Period</TableHead>
                                            <TableHead>Translation</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {modalOccurrences.map((occurrence, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="max-w-[300px] truncate">{occurrence.sentence}</TableCell>
                                                <TableCell>{occurrence.author}</TableCell>
                                                <TableCell>{occurrence.title}</TableCell>
                                                <TableCell>{formatCentury(occurrence.century)}</TableCell>
                                                <TableCell>{occurrence.language_period}</TableCell>
                                                <TableCell>
                                                    {occurrence.passage ? (
                                                        <a
                                                            href={occurrence.passage}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:text-primary/80 hover:underline flex items-center gap-1"
                                                        >
                                                            Perseus
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M15 3h6v6"></path>
                                                                <path d="M10 14L21 3"></path>
                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            </svg>
                                                        </a>
                                                    ) : (
                                                        'N/A'
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MotionParticipantsPage;