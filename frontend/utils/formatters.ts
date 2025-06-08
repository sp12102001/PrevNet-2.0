/**
 * Utility functions for formatting data display
 */

/**
 * Format century by removing "cent." prefix
 * @param century - The century string (e.g., "cent. 3 BCE")
 * @returns Formatted century (e.g., "3 BCE")
 */
export const formatCentury = (century: string): string => {
    if (!century) return "Unknown";
    return century.replace(/^cent\.\s*/i, '');
};

/**
 * Get clean century values for sorting and filtering
 * @param centuries - Array of century strings with "cent." prefix
 * @returns Array of clean century strings
 */
export const getCleanCenturies = (centuries: string[]): string[] => {
    return centuries.map(formatCentury);
};