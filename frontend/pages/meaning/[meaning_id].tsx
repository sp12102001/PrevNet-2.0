import { useRouter } from 'next/router';
import { useMeaningData } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import ErrorFallback from '@/components/ErrorFallback';
import { useEffect, useState } from 'react';

export default function MeaningPage() {
  const router = useRouter();
  const { meaning_id } = router.query;
  const [hasLogged, setHasLogged] = useState(false);

  // Add debugging for the meaning_id
  useEffect(() => {
    if (meaning_id && !hasLogged) {
      console.log('Viewing meaning page for ID:', meaning_id);
      console.log('Query params:', router.query);
      setHasLogged(true);
    }
  }, [meaning_id, router.query, hasLogged]);

  // Use our custom hook to fetch data
  const { data, loading, error } = useMeaningData(meaning_id as string);

  // Helper to highlight tokens in sentences
  const highlightToken = (sentence: string, token: string) => {
    if (!sentence || !token) {
      return <span className="text-gray-400">No example sentence available</span>;
    }

    try {
      // Try to find the token in the sentence using case-insensitive matching
      const tokenRegex = new RegExp(`(${token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
      const parts = sentence.split(tokenRegex);

      // If we couldn't split the sentence (token not found), try with just the preverb + first part of lemma
      if (parts.length <= 1 && token.length > 2) {
        const simplifiedToken = token.substring(0, token.length > 3 ? 3 : token.length);
        const simplifiedRegex = new RegExp(`(${simplifiedToken.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        const simplifiedParts = sentence.split(simplifiedRegex);

        if (simplifiedParts.length > 1) {
          return simplifiedParts.map((part, i) => {
            if (part.toLowerCase().includes(simplifiedToken.toLowerCase())) {
              return <span key={i} className="font-bold text-blue-700">{part}</span>;
            }
            return <span key={i}>{part}</span>;
          });
        }
      }

      // Return the highlighted parts if we found a match
      if (parts.length > 1) {
        return parts.map((part, i) => {
          if (part.toLowerCase() === token.toLowerCase()) {
            return <span key={i} className="font-bold text-blue-700">{part}</span>;
          }
          return <span key={i}>{part}</span>;
        });
      }

      // If no matches, just return the sentence as is
      return <span>{sentence}</span>;
    } catch (e) {
      console.error('Error highlighting token:', e);
      return <span>{sentence}</span>;
    }
  };

  // Format century by removing "cent." prefix
  const formatCentury = (century: string) => {
    if (!century) return "Unknown";
    return century.replace(/^cent\.\s*/i, '');
  };

  useEffect(() => {
    if (data) {
      console.log('Meaning data loaded:', data);
    }
  }, [data]);

  if (loading || !meaning_id) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Error on meaning page:', error);
    return (
      <div className="container mx-auto p-4">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back to Dashboard
        </Link>

        <ErrorFallback
          error={error}
          resetError={() => router.reload()}
          customMessage={`Error fetching meaning data for ID: ${meaning_id}`}
        />
      </div>
    );
  }

  if (!data) {
    console.warn('No data returned for meaning ID:', meaning_id);
    return (
      <div className="container mx-auto p-4">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back to Dashboard
        </Link>

        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded my-4">
          <p className="font-bold">No data found</p>
          <p>Could not find any data for meaning ID: {meaning_id}</p>
          <p className="mt-2">Try checking the API endpoint in your browser console.</p>
          <p className="text-xs mt-1">https://prevnet.sites.er.kcl.ac.uk/api/meanings/{meaning_id}</p>
          <button
            onClick={() => {
              console.log('Reloading page for meaning ID:', meaning_id);
              router.reload();
            }}
            className="mt-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="inline-flex items-center gap-2 mb-4 text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-2">Meaning: &quot;{data.verb_semantics}&quot;</h1>
      <p className="text-gray-500 mb-6">Found {data.occurrences.length} occurrence{data.occurrences.length !== 1 ? 's' : ''}</p>

      {data.occurrences.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
          <p className="font-bold">No occurrences found</p>
          <p>The meaning was recognized, but no occurrences were found in the dataset.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.occurrences.map((item, idx) => (
            <div key={idx} className="border border-gray-200 p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                  {item.preverb || '?'}
                </div>
                <div className="text-gray-700">
                  + <span className="font-medium">{item.lemma || '?'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="bg-gray-50 p-2 rounded">
                  <span className="block text-xs text-gray-500 mb-1">Sentence:</span>
                  {highlightToken(item.sentence, item.token)}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="block text-xs text-gray-500">Author:</span>
                    {item.author || <span className="text-gray-400">Unknown</span>}
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500">Work:</span>
                    {item.title || <span className="text-gray-400">Unknown</span>}
                  </div>
                  <div className={item.location_url ? "col-span-1" : "col-span-2"}>
                    <span className="block text-xs text-gray-500">Century:</span>
                    {item.century ? formatCentury(item.century) : <span className="text-gray-400">Unknown</span>}
                  </div>
                  {item.location_url && (
                    <div>
                      <span className="block text-xs text-gray-500">Location:</span>
                      <a
                        href={item.location_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline inline-flex items-center gap-1"
                      >
                        View
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}