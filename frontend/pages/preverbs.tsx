import React, { useState, useEffect } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    LabelList,
    Sector,
    BarChart,
    Bar,
    XAxis,
    YAxis
} from 'recharts';
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
import Link from "next/link";
import { useLocalPreverbs, useLocalPreverbData } from '@/services/localData';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorFallback from '@/components/ErrorFallback';

// Modern color palette - vibrant but professional
const COLORS = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12',
    '#9b59b6', '#1abc9c', '#d35400', '#34495e',
    '#16a085', '#8e44ad', '#27ae60', '#e67e22'
];

// Custom tooltip formatter for the charts
const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: Array<Record<string, unknown>> }): React.ReactElement | null => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border shadow-md p-3 rounded-md" role="tooltip">
                <p className="font-medium text-base">{String(payload[0].name || '')}</p>
                <p className="text-sm mt-1">
                    <span className="font-semibold">Count:</span> {Number(payload[0].value || 0)}
                </p>
                {payload[0].payload && typeof payload[0].payload === 'object' && payload[0].payload !== null &&
                 'percentage' in (payload[0].payload as Record<string, unknown>) &&
                 typeof ((payload[0].payload as Record<string, unknown>).percentage) === 'number' ? (
                    <p className="text-sm mt-1">
                        <span className="font-semibold">Percentage:</span> {(((payload[0].payload as Record<string, unknown>).percentage as number) * 100).toFixed(1)}%
                    </p>
                ) : null}
            </div>
        );
    }

    return null;
};

// Types for the active shape
interface ActiveShapeProps {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: {
        name: string;
    };
    percent: number;
    value: number;
}

// Custom active shape for the pie chart
const renderActiveShape = (props: ActiveShapeProps) => {
    const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value
    } = props;

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 6}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 8}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <text x={cx} y={cy} dy={-15} textAnchor="middle" fill={fill} className="text-sm font-medium">
                {payload.name}
            </text>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#333" className="text-sm">
                {value} ({(percent * 100).toFixed(1)}%)
            </text>
        </g>
    );
};

// Function to wrap activeShape for type compatibility
const activeShapeWrapper = (props: unknown) => {
    return renderActiveShape(props as ActiveShapeProps);
};

// Define an interface for the different example types
interface ExampleBase {
    lemma: string;
    verb_semantics: string;
    meaning_id: string;
}

interface SummaryExample extends ExampleBase {
    count: number;
}

interface DetailedExample extends ExampleBase {
    sentence: string;
    author: string;
    title: string;
    century: string;
}

type Example = SummaryExample | DetailedExample;

const PreverbDashboard = () => {
    const [selectedPreverb, setSelectedPreverb] = useState<string | null>(null);
    const { preverbs = [], loading: preverbsLoading, error: preverbsError } = useLocalPreverbs();
    const { data: preverbData, loading: preverbDataLoading, error: preverbDataError } = useLocalPreverbData(selectedPreverb);
    const [dataChecked, setDataChecked] = useState<boolean>(false);

    // For active/hover effects on pie charts
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
    const [activePieIndex, setActivePieIndex] = useState<number>(0); // 0 = lemmas, 1 = preverb meanings, 2 = verb semantics

    // For examples pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [examplesPerPage] = useState(10);
    const [showAllExamples, setShowAllExamples] = useState(false);

    // Handle pie slice hover
    const onPieEnter = (data: unknown, index: number, pieIndex: number) => {
        setActiveIndex(index);
        setActivePieIndex(pieIndex);
    };

    const onPieLeave = () => {
        setActiveIndex(undefined);
    };

    // Debug logging
    useEffect(() => {
        console.log('Current state:', {
            preverbs: preverbs,
            preverbsLoading,
            preverbsError: preverbsError?.message,
            selectedPreverb,
            preverbData,
            preverbDataLoading,
            preverbDataError: preverbDataError?.message
        });

        if (!preverbsLoading) {
            setDataChecked(true);
        }
    }, [preverbs, preverbsLoading, preverbsError, selectedPreverb, preverbData, preverbDataLoading, preverbDataError]);

    const prepareChartData = (data: { [key: string]: number } = {}) => {
        if (!data || Object.keys(data).length === 0) {
            return [];
        }

        // Calculate total for percentages
        const total = Object.values(data).reduce((sum, value) => sum + value, 0);

        return Object.entries(data)
            .map(([name, value]) => ({
                name,
                value,
                percentage: value / total
            }))
            .sort((a, b) => b.value - a.value);
    };

    // Prepare data for the bar chart (for literal vs. non-literal)
    const prepareLiteralData = (data: { [key: string]: number } = {}) => {
        if (!data || Object.keys(data).length === 0) {
            return [];
        }

        const total = Object.values(data).reduce((sum, value) => sum + value, 0);

        return Object.entries(data)
            .map(([name, value], index) => ({
                name,
                value,
                percentage: value / total,
                fill: COLORS[index % COLORS.length]
            }))
            .sort((a, b) => {
                // Ensure LITERAL always comes before NON-LITERAL
                if (a.name === "LITERAL") return -1;
                if (b.name === "LITERAL") return 1;
                return b.value - a.value;
            });
    };

    const retryFetchingData = () => {
        window.location.reload();
    };

    // Check if chart data is empty
    const hasVerbalBasesData = preverbData && Object.keys(preverbData.verbal_bases || {}).length > 0;
    const hasPreverbMeaningsData = preverbData &&
        'preverb_meanings' in preverbData &&
        Object.keys(preverbData.preverb_meanings || {}).length > 0;
    const hasLiteralMeaningsData = preverbData &&
        'literal_meanings' in preverbData &&
        Object.keys(preverbData.literal_meanings || {}).length > 0;
    const hasMeaningsData = preverbData && Object.keys(preverbData.meanings || {}).length > 0;

    // Calculate pagination values for examples
    const totalExamples = showAllExamples && preverbData?.allExamples
        ? preverbData.allExamples.length
        : preverbData?.examples?.length || 0;

    const totalPages = Math.ceil(totalExamples / examplesPerPage);

    const currentExamples = showAllExamples && preverbData?.allExamples
        ? preverbData.allExamples.slice((currentPage - 1) * examplesPerPage, currentPage * examplesPerPage) as DetailedExample[]
        : preverbData?.examples?.slice((currentPage - 1) * examplesPerPage, currentPage * examplesPerPage) as SummaryExample[] || [];

    // Type guard function to determine example type
    const isDetailedExample = (example: Example): example is DetailedExample => {
        return 'sentence' in example;
    };

    // Handle page change
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    // Handle toggle for showing all examples
    const toggleShowAllExamples = () => {
        setShowAllExamples(!showAllExamples);
        setCurrentPage(1); // Reset to first page when toggling
    };

    // Display error fallback if data is completely unreachable
    if (dataChecked && preverbsError && preverbs.length === 0) {
        return (
            <ErrorFallback
                error={preverbsError}
                resetError={retryFetchingData}
                customMessage="We're having trouble loading the local data files. This could be due to missing or corrupted files."
            />
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Preverb Analysis</h1>
            </div>

            {preverbsLoading && <LoadingSpinner />}
            {preverbsError && !preverbsLoading && preverbs.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">Error loading all preverbs:</p>
                    <p>{preverbsError.message}</p>
                    <p className="mt-2">Showing available preverbs only.</p>
                </div>
            )}

            {!preverbsLoading && preverbs.length === 0 && !preverbsError && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    <p>No preverbs found. Please check that the JSON data files are available in public/static/data/.</p>
                </div>
            )}

            {preverbs.length > 0 && (
                <div className="space-y-8">
                    <div className="bg-card border border-border rounded-lg shadow-sm p-5">
                        <h2 className="text-xl font-semibold mb-5 text-card-foreground">Available Preverbs</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3">
                            {preverbs.map(preverb => (
                                <button
                                    key={preverb}
                                    onClick={() => setSelectedPreverb(preverb)}
                                    className={`p-2.5 rounded-md transition-colors ${selectedPreverb === preverb
                                        ? 'bg-primary text-primary-foreground font-medium'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                >
                                    {preverb}
                                </button>
                            ))}
                        </div>
                    </div>

                    {preverbDataLoading && <LoadingSpinner />}

                    {preverbDataError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <p className="font-bold">Error loading preverb data:</p>
                            <p>{preverbDataError.message}</p>
                            <button
                                className="mt-3 bg-red-200 hover:bg-red-300 text-red-800 py-1 px-3 rounded"
                                onClick={() => window.location.reload()}
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {selectedPreverb && preverbData && (
                        <div className="space-y-8">
                            {/* First row of graphs - 2 charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                {/* 1. Graph of the lemmas */}
                                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="pb-2">
                                        <CardTitle>1. Lemma Distribution</CardTitle>
                                        <CardDescription>
                                            Most common verbal bases used with &quot;{selectedPreverb}&quot;
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        {hasVerbalBasesData ? (
                                            <div className="h-[320px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
                                                        <defs>
                                                            {prepareChartData(preverbData.verbal_bases).map((entry, index) => (
                                                                <radialGradient
                                                                    key={`gradient-${index}`}
                                                                    id={`gradient-lemmas-${index}`}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    r="50%"
                                                                    fx="50%"
                                                                    fy="50%"
                                                                >
                                                                    <stop
                                                                        offset="0%"
                                                                        stopColor={COLORS[index % COLORS.length]}
                                                                        stopOpacity={0.8}
                                                                    />
                                                                    <stop
                                                                        offset="100%"
                                                                        stopColor={COLORS[index % COLORS.length]}
                                                                        stopOpacity={1}
                                                                    />
                                                                </radialGradient>
                                                            ))}
                                                        </defs>
                                                        <Pie
                                                            activeIndex={activePieIndex === 0 ? activeIndex : undefined}
                                                            activeShape={activeShapeWrapper}
                                                            data={prepareChartData(preverbData.verbal_bases)}
                                                            dataKey="value"
                                                            nameKey="name"
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={activePieIndex === 0 ? 60 : 40}
                                                            outerRadius={80}
                                                            paddingAngle={2}
                                                            onMouseEnter={(data, index) => onPieEnter(data, index, 0)}
                                                            onMouseLeave={onPieLeave}
                                                            isAnimationActive={true}
                                                            animationDuration={800}
                                                            label={false}
                                                            labelLine={false}
                                                        >
                                                            {prepareChartData(preverbData.verbal_bases).map((entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={`url(#gradient-lemmas-${index})`}
                                                                    stroke={COLORS[index % COLORS.length]}
                                                                    strokeWidth={1}
                                                                />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <Legend
                                                            layout="vertical"
                                                            verticalAlign="middle"
                                                            align="right"
                                                            wrapperStyle={{ fontSize: '12px', paddingLeft: '20px', marginRight: '10px' }}
                                                            iconSize={8}
                                                            iconType="circle"
                                                        />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                                <div className="text-xs text-center text-muted-foreground mt-2">
                                                    Hover over sections for details or click to select
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center h-[300px] text-muted-foreground">
                                                No lemma data available
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* 2. Graph of preverb meaning */}
                                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="pb-2">
                                        <CardTitle>2. Preverb Meaning Distribution</CardTitle>
                                        <CardDescription>
                                            Most common meanings associated with &quot;{selectedPreverb}&quot;
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        {hasPreverbMeaningsData ? (
                                            <div className="h-[320px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
                                                        <defs>
                                                            {prepareChartData(preverbData.preverb_meanings).map((entry, index) => (
                                                                <radialGradient
                                                                    key={`gradient-${index}`}
                                                                    id={`gradient-meanings-${index}`}
                                                                    cx="50%"
                                                                    cy="50%"
                                                                    r="50%"
                                                                    fx="50%"
                                                                    fy="50%"
                                                                >
                                                                    <stop
                                                                        offset="0%"
                                                                        stopColor={COLORS[index % COLORS.length]}
                                                                        stopOpacity={0.8}
                                                                    />
                                                                    <stop
                                                                        offset="100%"
                                                                        stopColor={COLORS[index % COLORS.length]}
                                                                        stopOpacity={1}
                                                                    />
                                                                </radialGradient>
                                                            ))}
                                                        </defs>
                                                        <Pie
                                                            activeIndex={activePieIndex === 1 ? activeIndex : undefined}
                                                            activeShape={activeShapeWrapper}
                                                            data={prepareChartData(preverbData.preverb_meanings)}
                                                            dataKey="value"
                                                            nameKey="name"
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={activePieIndex === 1 ? 60 : 40}
                                                            outerRadius={80}
                                                            paddingAngle={2}
                                                            onMouseEnter={(data, index) => onPieEnter(data, index, 1)}
                                                            onMouseLeave={onPieLeave}
                                                            label={false}
                                                            labelLine={false}
                                                        >
                                                            {prepareChartData(preverbData.preverb_meanings).map((entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={`url(#gradient-meanings-${index})`}
                                                                    stroke={COLORS[index % COLORS.length]}
                                                                    strokeWidth={1}
                                                                />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <Legend
                                                            layout="vertical"
                                                            verticalAlign="middle"
                                                            align="right"
                                                            wrapperStyle={{ fontSize: '12px', paddingLeft: '20px', marginRight: '10px' }}
                                                            iconSize={8}
                                                            iconType="circle"
                                                        />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center h-[300px] text-muted-foreground">
                                                No preverb meaning data available
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Second row of graphs - 2 charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                {/* 3. Graph of literal meanings */}
                                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="pb-2">
                                        <CardTitle>3. Literal vs Non-Literal Distribution</CardTitle>
                                        <CardDescription>
                                            Comparison of literal and figurative usage frequencies
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        {hasLiteralMeaningsData ? (
                                            <div className="h-[320px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart
                                                        data={prepareLiteralData(preverbData.literal_meanings)}
                                                        layout="vertical"
                                                        margin={{ top: 5, right: 55, left: 120, bottom: 30 }}
                                                    >
                                                        <XAxis type="number" />
                                                        <YAxis
                                                            type="category"
                                                            dataKey="name"
                                                            tick={{ fontSize: 14 }}
                                                            width={110}
                                                        />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <Legend
                                                            layout="horizontal"
                                                            verticalAlign="bottom"
                                                            align="center"
                                                            iconSize={10}
                                                            iconType="circle"
                                                            wrapperStyle={{ paddingTop: '15px' }}
                                                        />
                                                        <Bar
                                                            dataKey="value"
                                                            fill="#3498db"
                                                            background={{ fill: "#eee" }}
                                                            radius={[0, 4, 4, 0]}
                                                            animationDuration={1000}
                                                        >
                                                            {prepareLiteralData(preverbData.literal_meanings).map((entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={COLORS[index % COLORS.length]}
                                                                />
                                                            ))}
                                                            <LabelList
                                                                dataKey="value"
                                                                position="right"
                                                                style={{ fill: "#333", fontSize: 14, fontWeight: 500 }}
                                                                formatter={(value: number) => value}
                                                                offset={10}
                                                            />
                                                        </Bar>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                                <div className="text-xs text-center text-muted-foreground mt-2">
                                                    Bar heights represent occurrence count in the corpus
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center h-[300px] text-muted-foreground">
                                                No literal classification data available
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* 4. Graph of verb meanings */}
                                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="pb-2">
                                        <CardTitle>4. Top Verb Semantic Categories</CardTitle>
                                        <CardDescription>
                                            Most frequent verb meanings with &quot;{selectedPreverb}&quot;
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-2">
                                        {hasMeaningsData ? (
                                            <div className="h-[320px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart
                                                        data={prepareChartData(preverbData.meanings).slice(0, 7)} // Top 7 for better visibility
                                                        layout="vertical"
                                                        margin={{ top: 5, right: 55, left: 120, bottom: 30 }}
                                                    >
                                                        <XAxis type="number" />
                                                        <YAxis
                                                            type="category"
                                                            dataKey="name"
                                                            tick={{ fontSize: 14 }}
                                                            width={110}
                                                        />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <Legend
                                                            layout="horizontal"
                                                            verticalAlign="bottom"
                                                            align="center"
                                                            iconSize={10}
                                                            iconType="circle"
                                                            wrapperStyle={{ paddingTop: '15px' }}
                                                        />
                                                        <Bar
                                                            dataKey="value"
                                                            fill="#3498db"
                                                            background={{ fill: "#eee" }}
                                                            radius={[0, 4, 4, 0]}
                                                            animationDuration={1000}
                                                        >
                                                            {prepareChartData(preverbData.meanings).slice(0, 7).map((entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={COLORS[index % COLORS.length]}
                                                                />
                                                            ))}
                                                            <LabelList
                                                                dataKey="value"
                                                                position="right"
                                                                style={{ fill: "#333", fontSize: 14, fontWeight: 500 }}
                                                                formatter={(value: number) => value}
                                                                offset={10}
                                                            />
                                                        </Bar>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                                <div className="text-xs text-center text-muted-foreground mt-2">
                                                    Showing top 7 most frequent semantic categories
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center h-[300px] text-muted-foreground">
                                                No verb semantics data available
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
                                <CardHeader className="pb-3">
                                    <CardTitle>Examples</CardTitle>
                                    <CardDescription>
                                        Total occurrences: {preverbData.total_occurrences || 0}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {((preverbData?.examples && preverbData.examples.length > 0) ||
                                     (preverbData?.allExamples && preverbData.allExamples.length > 0)) ? (
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <button
                                                    onClick={toggleShowAllExamples}
                                                    className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                                                >
                                                    {showAllExamples ? "Show Summary View" : "View All Examples"}
                                                </button>
                                                <div className="text-sm text-muted-foreground">
                                                    Showing {currentExamples.length} of {totalExamples} entries
                                                </div>
                                            </div>
                                            <div className="overflow-auto max-h-[400px] rounded-md border">
                                                <Table>
                                                    <TableHeader className="sticky top-0 bg-background z-10">
                                                        <TableRow>
                                                            <TableHead className="w-[120px]">Verbal Base</TableHead>
                                                            <TableHead>Meaning</TableHead>
                                                            {showAllExamples ? (
                                                                <>
                                                                    <TableHead>Sentence</TableHead>
                                                                    <TableHead>Author</TableHead>
                                                                    <TableHead>Title</TableHead>
                                                                    <TableHead>Century</TableHead>
                                                                </>
                                                            ) : (
                                                                <TableHead className="w-[80px] text-right">Count</TableHead>
                                                            )}
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {currentExamples.map((example, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell className="font-medium">{example.lemma || 'Unknown'}</TableCell>
                                                                <TableCell>
                                                                    {example.meaning_id ? (
                                                                        <Link
                                                                            href={`/meaning/${encodeURIComponent(example.meaning_id)}`}
                                                                            className="text-primary hover:text-primary/80 hover:underline flex items-center gap-1 cursor-pointer relative group"
                                                                            aria-label={`View details for meaning: ${example.verb_semantics || 'Unknown meaning'}`}
                                                                        >
                                                                            <span>{example.verb_semantics || 'Unknown meaning'}</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                                                                <path d="M15 3h6v6"></path>
                                                                                <path d="M10 14L21 3"></path>
                                                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                            </svg>
                                                                            <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-card border border-border text-card-foreground text-xs rounded px-2 py-1 whitespace-nowrap shadow-sm z-10">
                                                                                View meaning ID: {example.meaning_id}
                                                                            </span>
                                                                        </Link>
                                                                    ) : (
                                                                        <span>{example.verb_semantics || 'Unknown meaning'}</span>
                                                                    )}
                                                                </TableCell>
                                                                {showAllExamples ? (
                                                                    <>
                                                                        <TableCell className="max-w-[200px] truncate">
                                                                            {isDetailedExample(example) ? example.sentence : 'N/A'}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {isDetailedExample(example) ? example.author : 'N/A'}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {isDetailedExample(example) ? example.title : 'N/A'}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {isDetailedExample(example) ? example.century : 'N/A'}
                                                                        </TableCell>
                                                                    </>
                                                                ) : (
                                                                    <TableCell className="text-right">
                                                                        {'count' in example ? example.count : 0}
                                                                    </TableCell>
                                                                )}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>

                                            {/* Pagination controls */}
                                            {totalPages > 1 && (
                                                <div className="flex justify-between items-center mt-4">
                                                    <button
                                                        onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : 1)}
                                                        disabled={currentPage <= 1}
                                                        className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Previous
                                                    </button>

                                                    <div className="flex items-center gap-1">
                                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                            // Show pages around current page
                                                            let pageNum;
                                                            if (totalPages <= 5) {
                                                                pageNum = i + 1;
                                                            } else if (currentPage <= 3) {
                                                                pageNum = i + 1;
                                                            } else if (currentPage >= totalPages - 2) {
                                                                pageNum = totalPages - 4 + i;
                                                            } else {
                                                                pageNum = currentPage - 2 + i;
                                                            }

                                                            return (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => goToPage(pageNum)}
                                                                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                                                                        currentPage === pageNum
                                                                            ? 'bg-primary text-primary-foreground'
                                                                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                                                    }`}
                                                                >
                                                                    {pageNum}
                                                                </button>
                                                            );
                                                        })}

                                                        {totalPages > 5 && currentPage < totalPages - 2 && (
                                                            <>
                                                                <span className="px-1">...</span>
                                                                <button
                                                                    onClick={() => goToPage(totalPages)}
                                                                    className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                                                >
                                                                    {totalPages}
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={() => goToPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                                        disabled={currentPage >= totalPages}
                                                        className="px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center text-muted-foreground">
                                            No examples available for this preverb
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PreverbDashboard;