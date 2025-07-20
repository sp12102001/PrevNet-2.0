export type Language = 'latin' | 'greek';

/**
 * Cleans verb semantics strings.
 * This function removes brackets, quotes, and verb-specific "v#" prefixes.
 * e.g., "['v#123 to go']" -> "to go"
 */
export const cleanVerbSemantics = (semantics: string): string => {
    if (!semantics || semantics === 'NA') return '';
    return semantics
        .replace(/^\[|\]$/g, '')
        .replace(/v#\d+\s*/g, '')
        .replace(/'/g, '')
        .trim();
};

/**
 * Parses participant semantics strings (for Figure/Ground).
 * This function handles brackets, quotes, and splitting by 'n#' prefixes (including n#, n#L, n#G),
 * returning an array of cleaned glosses.
 * e.g., "['n#123 apple', 'n#L456 fruit', 'n#G789 vegetable']" -> ["apple", "fruit", "vegetable"]
 */
export const getParticipantSemantics = (semantics: string): string[] => {
    if (!semantics || semantics === 'NA') return [];

    // Remove brackets and quotes, then split by the synset prefix (n#, n#L, or n#G)
    const cleaned = semantics.replace(/^\[|\]$/g, '').replace(/'/g, '');
    const meanings = cleaned.split(/,\s*(?=n#)/);

    // For each meaning, remove the synset ID and trim whitespace
    return meanings.map(meaning => {
        return meaning.replace(/^n#[LG]?\d+\s*/, '').trim();
    }).filter(meaning => meaning); // Filter out any empty strings
};

/**
 * Selects a single, representative semantic meaning for word clouds.
 * From a list of glosses, it prioritizes more general terms like "a human being".
 * If no specific general term is found, it returns the first gloss in the list.
 *
 * @param {string[]} semantics - An array of semantic glosses.
 * @returns {string} A single representative gloss for the word cloud.
 */
export const getCloudSemantics = (semantics: string[]): string => {
    if (semantics.length === 0) return '';

    if (semantics.length > 1) {
        // Prioritize general terms for clarity in the word cloud
        const generalTerms = semantics.filter(m =>
            m.includes('a human being') ||
            m.includes('any supernatural being worshipped as controlling some part of the world')
        );

        if (generalTerms.length > 0) {
            // Return the last found general term if multiple exist
            return generalTerms[generalTerms.length - 1];
        }
    }

    // Default to the first semantic in the list
    return semantics[0];
};