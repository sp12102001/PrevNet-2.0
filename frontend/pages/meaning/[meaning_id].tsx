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
      console.log('Data source: KCL API');
      setHasLogged(true);
    }
  }, [meaning_id, router.query, hasLogged]);

  // Use KCL API
  const { data, loading, error } = useMeaningData(meaning_id as string);

  // Add debugging for URL encoding issues
  useEffect(() => {
    if (meaning_id && meaning_id.toString().includes('#')) {
      console.log('Warning: Meaning ID contains # character which may cause URL encoding issues:', meaning_id);
      console.log('Encoded meaning ID:', encodeURIComponent(meaning_id.toString()));
    }
  }, [meaning_id]);

  // Helper to highlight tokens in sentences
  const highlightToken = (sentence: string, token: string) => {
    if (!sentence || !token) {
      return <span className="text-muted-foreground">No example sentence available</span>;
    }

    try {
      // Clean up the token and sentence for better matching
      const cleanToken = token.trim().toLowerCase();

      // First, try exact match with the token
      const tokenRegex = new RegExp(`(${cleanToken.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
      const parts = sentence.split(tokenRegex);

      // If we found a match with the full token, return highlighted sentence
      if (parts.length > 1) {
        return parts.map((part, i) => {
          if (part.toLowerCase() === cleanToken) {
            return <span key={i} className="font-bold text-primary">{part}</span>;
          }
          return <span key={i}>{part}</span>;
        });
      }

      // If exact match fails, try to match only the verb part (without preverb)
      // First, try to split the token into preverb and base verb
      const preverbs = [
        'ab', 'ad', 'ante', 'circum', 'com', 'de', 'ex', 'in', 'inter',
        'intro', 'ob', 'per', 'post', 'prae', 'praeter', 'pro', 're',
        'sub', 'super', 'trans'
      ];

      let baseVerb = cleanToken;
      let preverb = '';

      for (const p of preverbs) {
        if (cleanToken.startsWith(p)) {
          preverb = p;
          baseVerb = cleanToken.substring(p.length);
          break;
        }
      }

      // If we identified a preverb, try to match just the base verb
      if (preverb && baseVerb) {
        const baseVerbRegex = new RegExp(`(${baseVerb.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        const baseVerbParts = sentence.split(baseVerbRegex);

        if (baseVerbParts.length > 1) {
          return baseVerbParts.map((part, i) => {
            if (part.toLowerCase() === baseVerb) {
              return <span key={i} className="font-bold text-primary">{part}</span>;
            }
            return <span key={i}>{part}</span>;
          });
        }
      }

      // If base verb also fails, try with first 3-4 characters of the token
      // This helps with different forms of the same verb
      if (cleanToken.length > 3) {
        const wordStart = cleanToken.substring(0, 4);
        const wordStartRegex = new RegExp(`\\b(${wordStart.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\w*)\\b`, 'gi');
        const matches = sentence.match(wordStartRegex);

        if (matches && matches.length > 0) {
          // Replace only the first occurrence
          const firstMatch = matches[0];
          const parts = sentence.split(new RegExp(`(${firstMatch.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'i'));

          if (parts.length > 1) {
            return parts.map((part, i) => {
              if (part.toLowerCase() === firstMatch.toLowerCase()) {
                return <span key={i} className="font-bold text-primary">{part}</span>;
              }
              return <span key={i}>{part}</span>;
            });
          }
        }
      }

      // As a last resort, just return the sentence as plain text
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
        <Link href="/" className="inline-flex items-center gap-2 mb-4 text-primary hover:text-primary/80 hover:underline transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back to Dashboard
        </Link>

        <ErrorFallback
          error={error}
          resetError={() => router.reload()}
          customMessage={
            <div>
              <p>Error fetching meaning data for ID: {meaning_id} from KCL API</p>
              <p className="text-sm mt-2">
                Note: If the meaning ID contains special characters (like #), it may not be supported by the API.
              </p>
              <div className="mt-4 p-3 bg-muted rounded text-xs font-mono overflow-auto text-muted-foreground">
                <p>ID: {meaning_id}</p>
                <p>Encoded: {meaning_id ? encodeURIComponent(meaning_id.toString()) : ''}</p>
              </div>
            </div>
          }
        />
      </div>
    );
  }

  if (!data) {
    console.warn('No data returned for meaning ID:', meaning_id);
    return (
      <div className="container mx-auto p-4">
        <Link href="/" className="inline-flex items-center gap-2 mb-4 text-primary hover:text-primary/80 hover:underline transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back to Dashboard
        </Link>

        <div className="bg-card border border-border px-4 py-3 rounded my-4">
          <p className="font-bold text-card-foreground">No data found</p>
          <p className="text-card-foreground">Could not find any data for meaning ID: {meaning_id}</p>
          <p className="mt-2 text-muted-foreground">Try checking the KCL API endpoint in your browser console.</p>
          <p className="text-xs mt-1 text-muted-foreground">https://prevnet.sites.er.kcl.ac.uk/api/meanings/{meaning_id}</p>
          <button
            onClick={() => {
              console.log('Reloading page for meaning ID:', meaning_id);
              router.reload();
            }}
            className="mt-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Get the verb semantics, providing a fallback if not available
  const verbSemantics = data.verb_semantics || `Meaning ${meaning_id}`;

  // Make sure occurrences is always an array
  const occurrences = Array.isArray(data.occurrences) ? data.occurrences : [];

  return (
    <div className="space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        Back to Dashboard
      </Link>

      <div className="bg-card border border-border rounded-lg shadow-sm p-5 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-card-foreground">Meaning: &quot;{verbSemantics}&quot;</h1>
        <p className="text-muted-foreground">Found {occurrences.length} occurrence{occurrences.length !== 1 ? 's' : ''}</p>
      </div>

      {occurrences.length === 0 ? (
        <div className="bg-card border border-border p-5 sm:p-6 rounded-lg text-card-foreground shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <h2 className="text-xl font-semibold">No occurrences found</h2>
              <p className="text-muted-foreground mt-1">The meaning was recognized, but no occurrences were found in the dataset.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {occurrences.map((item, idx) => (
            <div key={idx} className="border border-border p-4 sm:p-5 rounded-lg shadow-sm hover:shadow transition-shadow duration-200 bg-card text-card-foreground">
              <div className="flex items-center mb-4">
                <div className="bg-primary/15 text-primary rounded-full px-3 py-1 text-sm font-medium mr-2">
                  {item.preverb || '?'}
                </div>
                <div className="text-card-foreground">
                  + <span className="font-medium">{item.lemma || '?'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-md">
                  <span className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wide font-medium">Sentence</span>
                  <div className="text-card-foreground leading-relaxed">
                    {highlightToken(item.sentence || '', item.token || '')}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wide font-medium">Author</span>
                    <div className="mt-1 truncate">{item.author || <span className="text-muted-foreground">Unknown</span>}</div>
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wide font-medium">Work</span>
                    <div className="mt-1 truncate">{item.title || <span className="text-muted-foreground">Unknown</span>}</div>
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wide font-medium">Period</span>
                    <div className="mt-1">{formatCentury(item.century || '') || <span className="text-muted-foreground">Unknown</span>}</div>
                  </div>
                  <div>
                    {item.location_url && (
                      <div className="mt-1">
                        <span className="block text-xs text-muted-foreground uppercase tracking-wide font-medium">Source</span>
                        <a
                          href={item.location_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 hover:underline mt-1"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}