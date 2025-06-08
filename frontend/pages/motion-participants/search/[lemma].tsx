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
import { useLocalMotionParticipantSearch } from '@/services/localData';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatCentury } from '@/utils/formatters';

// Interface for motion participant search data
interface MotionParticipantSearchOccurrence {
    id: string;
    preverb: string;
    sentence: string;
    author: string;
    title: string;
    century: string;
    language_period: string;
    morphology: string;
    verb_class: string;
    preverb_semantics: string;
    verb_semantics: string;
    figure_semantics: string;
    ground_semantics: string;
    participant_role: string;
    participant_lemma: string;
    passage?: string;
}

const MotionParticipantSearchPage = () => {
    const router = useRouter();
    const { lemma } = router.query;
    const lemmaString = Array.isArray(lemma) ? lemma[0] : lemma;

    const { data: searchData, loading, error } = useLocalMotionParticipantSearch(lemmaString || null);

    const [filteredOccurrences, setFilteredOccurrences] = useState<MotionParticipantSearchOccurrence[]>([]);
    const [filters, setFilters] = useState({
        preverb: '',
        author: '',
        title: '',
        century: '',
        language_period: '',
        participantRole: ''
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);

    // Process search data when it changes
    useEffect(() => {
        if (searchData) {
            setFilteredOccurrences(searchData as MotionParticipantSearchOccurrence[]);
        }
    }, [searchData]);

    // Apply filters to occurrences
    const applyFilters = (occurrences: MotionParticipantSearchOccurrence[]) => {
        return occurrences.filter(occurrence => {
            const matchesPreverb = !filters.preverb || occurrence.preverb.toLowerCase().includes(filters.preverb.toLowerCase());
            const matchesAuthor = !filters.author || occurrence.author.toLowerCase().includes(filters.author.toLowerCase());
            const matchesTitle = !filters.title || occurrence.title.toLowerCase().includes(filters.title.toLowerCase());
            const matchesCentury = !filters.century || occurrence.century.toLowerCase().includes(filters.century.toLowerCase());
            const matchesPeriod = !filters.language_period || occurrence.language_period.toLowerCase().includes(filters.language_period.toLowerCase());
            const matchesRole = !filters.participantRole || occurrence.participant_role.toLowerCase().includes(filters.participantRole.toLowerCase());

            return matchesPreverb && matchesAuthor && matchesTitle && matchesCentury && matchesPeriod && matchesRole;
        });
    };

    // Sort occurrences by century
    const centuryOrder = [
        'cent. 3 BCE', 'cent. 2 BCE', 'cent. 1 BCE',
        'cent. 1 CE', 'cent. 2 CE', 'cent. 3 CE',
        'cent. 4 CE', 'cent. 5 CE', 'cent. 6 CE'
    ];

    const sortByCentury = (occurrences: MotionParticipantSearchOccurrence[]) => {
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
    const getUniqueValues = (key: keyof MotionParticipantSearchOccurrence) => {
        return Array.from(new Set(filteredOccurrences.map(occ => occ[key]))).filter(Boolean).sort();
    };

    // Determine participant role for display
    const getParticipantRole = (occurrence: MotionParticipantSearchOccurrence) => {
        if (!occurrence.participant_role || occurrence.participant_role === 'NA') return 'Unknown';

        try {
            const roles = occurrence.participant_role.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);
            const lemmas = occurrence.participant_lemma.replace(/^\[|\]$/g, '').replace(/'/g, '').split(/,\s*/);

            // Find the role for our specific lemma
            const lemmaIndex = lemmas.findIndex(l => l.trim().toLowerCase() === lemmaString?.toLowerCase());
            if (lemmaIndex !== -1 && roles[lemmaIndex]) {
                return roles[lemmaIndex].trim();
            }

            return roles[0] || 'Unknown';
        } catch {
            return 'Unknown';
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;
    if (!lemmaString) return <div>No lemma specified</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Motion Participants Search</h1>
                <p className="text-muted-foreground">
                    Showing motion participant occurrences for lemma: <span className="font-medium">&quot;{lemmaString}&quot;</span>
                </p>
                {searchData && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Total: {filteredAndSorted.length} occurrences across {getUniqueValues('preverb').length} preverbs
                    </p>
                )}
            </div>

            {searchData && searchData.length > 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Motion Participant Occurrences</CardTitle>
                        <CardDescription>
                            Examples where &quot;{lemmaString}&quot; appears as a motion participant (Figure or Ground)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6 p-4 bg-muted rounded-lg">
                            <div>
                                <label className="block text-sm font-medium mb-1">Preverb</label>
                                <select
                                    value={filters.preverb}
                                    onChange={(e) => setFilters({ ...filters, preverb: e.target.value })}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    title="Filter occurrences by preverb"
                                >
                                    <option value="">All Preverbs</option>
                                    {getUniqueValues('preverb').map(preverb => (
                                        <option key={preverb} value={preverb}>{preverb}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <select
                                    value={filters.participantRole}
                                    onChange={(e) => setFilters({ ...filters, participantRole: e.target.value })}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    title="Filter occurrences by participant role"
                                >
                                    <option value="">All Roles</option>
                                    <option value="Figure">Figure</option>
                                    <option value="Ground">Ground</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Author</label>
                                <select
                                    value={filters.author}
                                    onChange={(e) => setFilters({ ...filters, author: e.target.value })}
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
                                    value={filters.title}
                                    onChange={(e) => setFilters({ ...filters, title: e.target.value })}
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
                                    value={filters.century}
                                    onChange={(e) => setFilters({ ...filters, century: e.target.value })}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    title="Filter occurrences by century"
                                >
                                    <option value="">All Centuries</option>
                                    {getUniqueValues('century').map(century => (
                                        <option key={century} value={century}>{formatCentury(century || 'N/A')}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Period</label>
                                <select
                                    value={filters.language_period}
                                    onChange={(e) => setFilters({ ...filters, language_period: e.target.value })}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                                    title="Filter occurrences by language period"
                                >
                                    <option value="">All Periods</option>
                                    {getUniqueValues('language_period').map(period => (
                                        <option key={period} value={period}>{period}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results Table */}
                        <div className="overflow-auto max-h-[500px] rounded-md border">
                            {paginatedOccurrences.length > 0 ? (
                                <Table>
                                    <TableHeader className="sticky top-0 bg-background z-10">
                                        <TableRow>
                                            <TableHead>Preverb</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Sentence</TableHead>
                                            <TableHead>Author</TableHead>
                                            <TableHead>Work</TableHead>
                                            <TableHead>Century</TableHead>
                                            <TableHead>Period</TableHead>
                                            <TableHead>Translation</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedOccurrences.map((occurrence) => (
                                            <TableRow key={occurrence.id}>
                                                <TableCell className="font-medium">
                                                    <button
                                                        onClick={() => router.push(`/motion-participants/${occurrence.preverb}`)}
                                                        className="text-primary hover:text-primary/80 hover:underline"
                                                        title={`View motion participants for ${occurrence.preverb}`}
                                                    >
                                                        {occurrence.preverb}
                                                    </button>
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                        getParticipantRole(occurrence) === 'Figure'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {getParticipantRole(occurrence)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="max-w-[300px] truncate">{occurrence.sentence || 'N/A'}</TableCell>
                                                <TableCell>{occurrence.author || 'N/A'}</TableCell>
                                                <TableCell>{occurrence.title || 'N/A'}</TableCell>
                                                <TableCell>{formatCentury(occurrence.century || 'N/A')}</TableCell>
                                                <TableCell>{occurrence.language_period || 'N/A'}</TableCell>
                                                <TableCell>
                                                    {occurrence.passage ? (
                                                        <a
                                                            href={occurrence.passage}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:text-primary/80 hover:underline flex items-center gap-1"
                                                            aria-label="View translation on Perseus"
                                                        >
                                                            Perseus
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M15 3h6v6"></path>
                                                                <path d="M10 14L21 3"></path>
                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2h6"></path>
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
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                                    <div className="text-3xl mb-3">🔍</div>
                                    <p className="text-lg font-medium">No occurrences found</p>
                                    <p className="text-sm mt-2 text-center">
                                        No examples found for &quot;{lemmaString}&quot; with the current filters
                                    </p>
                                    <p className="text-xs mt-2 text-center">Try adjusting your filters or check back later as more data is added.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-4">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border border-border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                            <div className="text-4xl mb-4">🔍</div>
                            <p className="text-lg font-medium">No motion participant data found</p>
                            <p className="text-sm mt-2 text-center">
                                No examples found for lemma &quot;{lemmaString}&quot; as a motion participant
                            </p>
                            <p className="text-xs mt-2 text-center">
                                This lemma may not appear as a Figure or Ground in the corpus, or the data may still be processing.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default MotionParticipantSearchPage;