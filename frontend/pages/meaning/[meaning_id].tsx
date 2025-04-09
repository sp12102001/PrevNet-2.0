import { useRouter } from 'next/router';
import { useMeaningData } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import ErrorFallback from '@/components/ErrorFallback';

export default function MeaningPage() {
  const router = useRouter();
  const { meaning_id } = router.query;

  // Use our custom hook to fetch data
  const { data, loading, error } = useMeaningData(meaning_id as string);

  if (loading || !meaning_id) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Link href="/" className="inline-block mb-4 text-blue-500 hover:underline">
          ← Back to Dashboard
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
    return (
      <div className="container mx-auto p-4">
        <Link href="/" className="inline-block mb-4 text-blue-500 hover:underline">
          ← Back to Dashboard
        </Link>

        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded my-4">
          <p className="font-bold">No data found</p>
          <p>Could not find any data for meaning ID: {meaning_id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="inline-block mb-4 text-blue-500 hover:underline">
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-4">Meaning: &quot;{data.verb_semantics}&quot;</h1>

      {data.occurrences.map((item, idx) => (
        <div key={idx} className="mb-4 border border-gray-200 p-2 rounded">
          <p><strong>Preverb:</strong> {item.preverb}</p>
          <p><strong>Lemma:</strong> {item.lemma}</p>
          <p>
            <strong>Sentence:</strong>{' '}
            {(item.sentence.split(new RegExp(`(${item.token})`, 'gi')) as string[]).map((part, i) =>
              part.toLowerCase() === item.token.toLowerCase() ? (
                <b key={i}>{part}</b>
              ) : (
                part
              )
            )}
          </p>

          <p>
            <strong>Location:</strong>{' '}
            {item.location_url ? (
              <a
                href={item.location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {item.location_url}
              </a>
            ) : (
              <span className="text-gray-500">No location available</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}