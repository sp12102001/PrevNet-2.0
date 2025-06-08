import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLocalPreverbData } from '@/services/localData';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorFallback from '@/components/ErrorFallback';
import BackButton from '@/components/BackButton';

// Color palette
const COLORS = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12',
    '#9b59b6', '#1abc9c', '#d35400', '#34495e'
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: Array<Record<string, unknown>> }): React.ReactElement | null => {
    if (active && payload && payload.length) {
        const name = String(payload[0].name || '');
        return (
            <div className="bg-card border border-border shadow-md p-3 rounded-md max-w-[300px]" role="tooltip">
                <p className="font-medium text-base break-words">{name}</p>
                <p className="text-sm mt-1">
                    <span className="font-semibold">Count:</span> {Number(payload[0].value || 0)}
                </p>
            </div>
        );
    }
    return null;
};

// Interface for occurrence data
interface SpatialOccurrence {
    id: string;
    lemma: string;
    sentence: string;
    author: string;
    title: string;
    century: string;
    language_period: string;
    morphology: string;
    verb_class: string;
    preverb_semantics: string;
    spatial_relation_role: string;
    spatial_relation_expression: string;
}

const SpatialRelationsPage = () => {
    const router = useRouter();
    const { preverb } = router.query;
    const [selectedView, setSelectedView] = useState<'preverb' | 'verbs'>('preverb');
    const [selectedRelationType, setSelectedRelationType] = useState<string | null>(null);
    const [selectedExpression, setSelectedExpression] = useState<string | null>(null);
    const [filteredOccurrences, setFilteredOccurrences] = useState<SpatialOccurrence[]>([]);
    const [showOccurrences, setShowOccurrences] = useState(false);

    // Filter states
    const [authorFilter, setAuthorFilter] = useState<string>('');
    const [titleFilter, setTitleFilter] = useState<string>('');
    const [centuryFilter, setCenturyFilter] = useState<string>('');
    const [periodFilter, setPeriodFilter] = useState<string>('');
    const [formFilter, setFormFilter] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);

    const { data: preverbData, loading, error } = useLocalPreverbData(preverb as string);

    // Define century order for sorting
    const centuryOrder = [
        'cent. 3 BCE', 'cent. 2 BCE', 'cent. 1 BCE',
        'cent. 1 CE', 'cent. 2 CE', 'cent. 3 CE',
        'cent. 4 CE', 'cent. 5 CE', 'cent. 6 CE'
    ];

    const prepareSpatialData = (data: { [key: string]: number }) => {
        // Handle undefined or null data gracefully
        if (!data || typeof data !== 'object') {
            return [];
        }

        return Object.entries(data)
            .filter(([_, value]) => value > 0)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    };

    const prepareExpressionData = (expressions: { [key: string]: number }) => {
        // Handle undefined or null expressions gracefully
        if (!expressions || typeof expressions !== 'object') {
            return [];
        }

        return Object.entries(expressions)
            .filter(([_, value]) => value > 0)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    };

    const handleSpatialRelationClick = (relationType: string) => {
        setSelectedRelationType(relationType);
        setSelectedExpression(null);
        setCurrentPage(1);

        if (preverbData?.allExamples && Array.isArray(preverbData.allExamples)) {
            const filtered = preverbData.allExamples.filter(example => {
                // Handle missing or invalid spatial_relation_role data
                if (!example.spatial_relation_role || example.spatial_relation_role === 'NA' || typeof example.spatial_relation_role !== 'string') return false;

                try {
                    const roles = example.spatial_relation_role.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);
                    return roles.some((role: string) => role.trim().toUpperCase() === relationType.toUpperCase());
                } catch (error) {
                    console.warn('Error processing spatial_relation_role data:', error);
                    return false;
                }
            });
            setFilteredOccurrences(filtered.map((example, index) => ({
                id: `${example.meaning_id || 'unknown'}_${index}`,
                ...example
            })));
            setShowOccurrences(true);
        } else {
            // Handle case where allExamples is not available
            setFilteredOccurrences([]);
            setShowOccurrences(true);
        }
    };

    const handleExpressionClick = (relationType: string, expression: string) => {
        setSelectedRelationType(relationType);
        setSelectedExpression(expression);
        setCurrentPage(1);

        if (preverbData?.allExamples && Array.isArray(preverbData.allExamples)) {
            const filtered = preverbData.allExamples.filter(example => {
                // Handle missing or invalid data
                if (!example.spatial_relation_role || example.spatial_relation_role === 'NA' ||
                    !example.spatial_relation_expression || example.spatial_relation_expression === 'NA' ||
                    typeof example.spatial_relation_role !== 'string' || typeof example.spatial_relation_expression !== 'string') {
                    return false;
                }

                try {
                    const roles = example.spatial_relation_role.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);
                    const expressions = example.spatial_relation_expression.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);

                    return roles.some((role: string, index: number) =>
                        role.trim().toUpperCase() === relationType.toUpperCase() &&
                        expressions[index]?.trim() === expression
                    );
                } catch (error) {
                    console.warn('Error processing spatial relation data:', error);
                    return false;
                }
            });
            setFilteredOccurrences(filtered.map((example, index) => ({
                id: `${example.meaning_id || 'unknown'}_${index}`,
                ...example
            })));
            setShowOccurrences(true);
        } else {
            // Handle case where allExamples is not available
            setFilteredOccurrences([]);
            setShowOccurrences(true);
        }
    };

    // Apply filters to occurrences
    const applyFilters = (occurrences: SpatialOccurrence[]) => {
        return occurrences.filter(occurrence => {
            return (
                (authorFilter === '' || occurrence.author.toLowerCase().includes(authorFilter.toLowerCase())) &&
                (titleFilter === '' || occurrence.title.toLowerCase().includes(titleFilter.toLowerCase())) &&
                (centuryFilter === '' || occurrence.century === centuryFilter) &&
                (periodFilter === '' || occurrence.language_period === periodFilter) &&
                (formFilter === '' || occurrence.morphology.toLowerCase().includes(formFilter.toLowerCase()))
            );
        });
    };

    // Sort occurrences by century
    const sortByCentury = (occurrences: SpatialOccurrence[]) => {
        return [...occurrences].sort((a, b) => {
            const indexA = centuryOrder.indexOf(a.century);
            const indexB = centuryOrder.indexOf(b.century);

            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
            }
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.century.localeCompare(b.century);
        });
    };

    const filteredAndSorted = sortByCentury(applyFilters(filteredOccurrences));
    const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
    const paginatedOccurrences = filteredAndSorted.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Get unique values for filter dropdowns
    const getUniqueValues = (key: keyof SpatialOccurrence) => {
        return Array.from(new Set(filteredOccurrences.map(occ => occ[key]))).filter(Boolean).sort();
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorFallback error={error} resetError={() => router.reload()} />;
    if (!preverbData) return <div>No data found for preverb: {preverb}</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <BackButton href="/preverbs" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Spatial Relations: {preverb}
                    </h1>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedView('preverb')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            selectedView === 'preverb'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                    >
                        Preverb Only
                    </button>
                    <button
                        onClick={() => setSelectedView('verbs')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            selectedView === 'verbs'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                    >
                        Preverb + Verbs
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Spatial Relations Frequency */}
                <Card>
                    <CardHeader>
                        <CardTitle>Spatial Relations Frequency</CardTitle>
                        <CardDescription>
                            Distribution of Goal, Source, Path, and Location relations with &quot;{preverb}&quot;
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {preverbData?.spatial_relations && prepareSpatialData(preverbData.spatial_relations).length > 0 ? (
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={prepareSpatialData(preverbData.spatial_relations)}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="value"
                                            fill="#3498db"
                                            onClick={(data) => handleSpatialRelationClick(data.name)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {prepareSpatialData(preverbData.spatial_relations).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                                <div className="text-4xl mb-4">📊</div>
                                <p className="text-lg font-medium">No spatial relations data available</p>
                                <p className="text-sm mt-2">Spatial relations data for this preverb is not yet available or is being processed.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Spatial Expression Encoding */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {preverbData?.spatial_expressions && Object.keys(preverbData.spatial_expressions).length > 0 ? (
                        Object.entries(preverbData.spatial_expressions).map(([type, expressions]) => {
                            const relationType = type.replace('_expression', '').toUpperCase();
                            const data = prepareExpressionData(expressions);

                            if (data.length === 0) return null;

                            return (
                                <Card key={type}>
                                    <CardHeader>
                                        <CardTitle>{relationType} Expressions</CardTitle>
                                        <CardDescription>
                                            Syntactic encoding of {relationType.toLowerCase()} relations
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={data}
                                                    layout="vertical"
                                                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis type="number" />
                                                    <YAxis type="category" dataKey="name" width={70} />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Bar
                                                        dataKey="value"
                                                        fill="#2ecc71"
                                                        onClick={(data) => handleExpressionClick(relationType, data.name)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {data.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="col-span-full">
                            <Card>
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center h-[250px] text-muted-foreground">
                                        <div className="text-4xl mb-4">🔧</div>
                                        <p className="text-lg font-medium">No spatial expression data available</p>
                                        <p className="text-sm mt-2">Spatial expression encoding data for this preverb is not yet available or is being processed.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* If there are expressions but they all result in empty data, show a message */}
                    {preverbData?.spatial_expressions && Object.keys(preverbData.spatial_expressions).length > 0 &&
                     Object.entries(preverbData.spatial_expressions).every(([_, expressions]) => prepareExpressionData(expressions).length === 0) && (
                        <div className="col-span-full">
                            <Card>
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center h-[250px] text-muted-foreground">
                                        <div className="text-4xl mb-4">📋</div>
                                        <p className="text-lg font-medium">No spatial expressions found</p>
                                        <p className="text-sm mt-2">This preverb does not have recorded spatial expression data in the corpus.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>

                {/* Occurrences Table */}
                {showOccurrences && (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>
                                        {selectedExpression
                                            ? `${selectedRelationType} - ${selectedExpression}`
                                            : selectedRelationType
                                        } Occurrences
                                    </CardTitle>
                                    <CardDescription>
                                        Total: {filteredAndSorted.length} occurrences
                                    </CardDescription>
                                </div>
                                <button
                                    onClick={() => setShowOccurrences(false)}
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    ✕ Close
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 bg-muted rounded-lg">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Author</label>
                                    <select
                                        value={authorFilter}
                                        onChange={(e) => setAuthorFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                        title="Filter occurrences by author"
                                    >
                                        <option value="">All Authors</option>
                                        {getUniqueValues('author').map(author => (
                                            <option key={author} value={author}>{author}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Work</label>
                                    <select
                                        value={titleFilter}
                                        onChange={(e) => setTitleFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                        title="Filter occurrences by work"
                                    >
                                        <option value="">All Works</option>
                                        {getUniqueValues('title').map(title => (
                                            <option key={title} value={title}>{title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Century</label>
                                    <select
                                        value={centuryFilter}
                                        onChange={(e) => setCenturyFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                        title="Filter occurrences by century"
                                    >
                                        <option value="">All Centuries</option>
                                        {getUniqueValues('century').map(century => (
                                            <option key={century} value={century}>{century}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Period</label>
                                    <select
                                        value={periodFilter}
                                        onChange={(e) => setPeriodFilter(e.target.value)}
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                        title="Filter occurrences by language period"
                                    >
                                        <option value="">All Periods</option>
                                        {getUniqueValues('language_period').map(period => (
                                            <option key={period} value={period}>{period}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Form</label>
                                    <input
                                        type="text"
                                        value={formFilter}
                                        onChange={(e) => setFormFilter(e.target.value)}
                                        placeholder="Filter by form..."
                                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-auto max-h-[400px] rounded-md border">
                                {paginatedOccurrences.length > 0 ? (
                                    <Table>
                                        <TableHeader className="sticky top-0 bg-background z-10">
                                            <TableRow>
                                                <TableHead>Lemma</TableHead>
                                                <TableHead>Sentence</TableHead>
                                                <TableHead>Author</TableHead>
                                                <TableHead>Work</TableHead>
                                                <TableHead>Century</TableHead>
                                                <TableHead>Period</TableHead>
                                                <TableHead>Form</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedOccurrences.map((occurrence) => (
                                                <TableRow key={occurrence.id}>
                                                    <TableCell className="font-medium">{occurrence.lemma || 'N/A'}</TableCell>
                                                    <TableCell className="max-w-[300px] truncate">{occurrence.sentence || 'N/A'}</TableCell>
                                                    <TableCell>{occurrence.author || 'N/A'}</TableCell>
                                                    <TableCell>{occurrence.title || 'N/A'}</TableCell>
                                                    <TableCell>{occurrence.century || 'N/A'}</TableCell>
                                                    <TableCell>{occurrence.language_period || 'N/A'}</TableCell>
                                                    <TableCell>{occurrence.morphology || 'N/A'}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                                        <div className="text-3xl mb-3">🔍</div>
                                        <p className="text-lg font-medium">No occurrences found</p>
                                        <p className="text-sm mt-2 text-center">
                                            {selectedExpression
                                                ? `No examples found for ${selectedRelationType} with "${selectedExpression}" expression`
                                                : `No examples found for ${selectedRelationType} relations`
                                            }
                                        </p>
                                        <p className="text-xs mt-2 text-center">Try adjusting your filters or check back later as more data is added.</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage <= 1}
                                        className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-muted-foreground">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage >= totalPages}
                                        className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default SpatialRelationsPage;