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
    return Object.entries(data || {}).map(([name, value]) => ({
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Preverb Analysis Dashboard</h1>

      {preverbsLoading && <LoadingSpinner />}
      {preverbsError && !preverbsLoading && preverbs.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error loading preverbs:</p>
          <p>{preverbsError.message}</p>
        </div>
      )}

      {!preverbsLoading && preverbs.length === 0 && !preverbsError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>No preverbs found. Please check your connection to the API.</p>
        </div>
      )}

      {preverbs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {preverbs.map(preverb => (
            <button
              key={preverb}
              onClick={() => setSelectedPreverb(preverb)}
              className={`p-2 rounded ${selectedPreverb === preverb
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              {preverb}
            </button>
          ))}
        </div>
      )}

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
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
                <div className="flex justify-center items-center h-[300px] text-gray-500">
                  No verbal bases data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
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
                <div className="flex justify-center items-center h-[300px] text-gray-500">
                  No meanings data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                Total occurrences: {preverbData.total_occurrences}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Verbal Base</TableHead>
                    <TableHead>Meaning</TableHead>
                    <TableHead>Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preverbData.examples.map((example, index) => (
                    <TableRow key={index}>
                      <TableCell>{example.lemma}</TableCell>
                      <TableCell>
                        <Link href={`/meaning/${encodeURIComponent(example.meaning_id)}`}>
                          {example.verb_semantics}
                        </Link>
                      </TableCell>
                      <TableCell>{example.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PreverbDashboard;