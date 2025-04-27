import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
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
import { usePreverbs, usePreverbData } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorFallback from '@/components/ErrorFallback';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PreverbDashboard = () => {
  const [selectedPreverb, setSelectedPreverb] = useState<string | null>(null);
  const { preverbs = [], loading: preverbsLoading, error: preverbsError } = usePreverbs();
  const { data: preverbData, loading: preverbDataLoading, error: preverbDataError } = usePreverbData(selectedPreverb);
  const [apiChecked, setApiChecked] = useState<boolean>(false);

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
      setApiChecked(true);
    }
  }, [preverbs, preverbsLoading, preverbsError, selectedPreverb, preverbData, preverbDataLoading, preverbDataError]);

  const prepareChartData = (data: { [key: string]: number } = {}) => {
    if (!data || Object.keys(data).length === 0) {
      return [];
    }
    return Object.entries(data).map(([name, value]) => ({
      name,
      value
    }));
  };

  const retryFetchingData = () => {
    window.location.reload();
  };

  // Check if chart data is empty
  const hasVerbalBasesData = preverbData && Object.keys(preverbData.verbal_bases || {}).length > 0;
  const hasMeaningsData = preverbData && Object.keys(preverbData.meanings || {}).length > 0;

  // Display error fallback if API is completely unreachable
  if (apiChecked && preverbsError && preverbs.length === 0) {
    return (
      <ErrorFallback
        error={preverbsError}
        resetError={retryFetchingData}
        customMessage="We're having trouble connecting to the preverbs API. This might be due to network issues or the API being down."
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
          <p>No preverbs found. Please check your connection to the KCL API.</p>
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
                  className={`p-2 rounded-md transition-colors ${selectedPreverb === preverb
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Verbal Bases Distribution</CardTitle>
                    <CardDescription>
                      Most common verbal bases used with &quot;{selectedPreverb}&quot;
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {hasVerbalBasesData ? (
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={prepareChartData(preverbData.verbal_bases)}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              label
                            >
                              {prepareChartData(preverbData.verbal_bases).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-[300px] text-muted-foreground">
                        No verbal bases data available
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Meanings Distribution</CardTitle>
                    <CardDescription>
                      Different meanings associated with &quot;{selectedPreverb}&quot;
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {hasMeaningsData ? (
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={prepareChartData(preverbData.meanings)}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              label
                            >
                              {prepareChartData(preverbData.meanings).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-[300px] text-muted-foreground">
                        No meanings data available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle>Examples</CardTitle>
                  <CardDescription>
                    Total occurrences: {preverbData.total_occurrences || 0}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {preverbData.examples && preverbData.examples.length > 0 ? (
                    <div className="overflow-auto rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[120px]">Verbal Base</TableHead>
                            <TableHead>Meaning</TableHead>
                            <TableHead className="w-[80px] text-right">Count</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {preverbData.examples.map((example, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{example.lemma || 'Unknown'}</TableCell>
                              <TableCell>
                                {example.meaning_id ? (
                                  <Link
                                    href={`/meaning/${encodeURIComponent(example.meaning_id)}`}
                                    className="text-primary hover:text-primary/80 hover:underline flex items-center gap-1 cursor-pointer relative group"
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
                              <TableCell className="text-right">{example.count || 0}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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