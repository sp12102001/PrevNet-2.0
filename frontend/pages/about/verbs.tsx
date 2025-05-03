import React from 'react';
import BackButton from '@/components/BackButton';

const Verbs = () => {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Verbs</h1>
            <p className="text-muted-foreground mb-6">
                Understanding verbs and their relationship with preverbs.
            </p>

            <div className="prose max-w-none">
                <p className="text-lg">This study examines a diverse set of motion verbs from both Latin and Ancient Greek, deliberately selected from a range of motion domains—including walking, flying, swimming, and sailing. Rather than limiting the analysis to a single subclass, we include verbs that span multiple motion types in order to capture the breadth and variation in how motion is lexically and grammatically encoded across the two languages.</p>

                <p>The goal is to understand how preverbs interact with different types of motion verbs, and how these combinations reflect spatial and dynamic relationships in each language.</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Motion Verb Classifications</h2>

                <p>The selected verbs are grouped into three major motion classes, following Levin (1993) and VerbNet classifications (see UVI Verb Class Search):</p>

                <h3 className="text-xl font-medium mt-6 mb-3">1. Inherently Directed Motion Verbs</h3>
                <p>Verbs that express motion toward or away from a goal by default.<br />
                E.g., &apos;go&apos;, &apos;come&apos;, &apos;flee&apos;</p>

                <h3 className="text-xl font-medium mt-6 mb-3">2. Run-Verbs</h3>
                <p>Verbs denoting self-propelled movement, often rapid or effortful.<br />
                E.g., &apos;run&apos;, &apos;fly&apos;, &apos;swim&apos;</p>

                <h3 className="text-xl font-medium mt-6 mb-3">3. Verbs of Motion Using a Vehicle</h3>
                <p>Verbs describing movement by means of a vehicle or vessel.<br />
                E.g., &apos;sail&apos;</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Verb Comparison Table</h2>

                <div className="overflow-x-auto my-6 rounded-lg border shadow">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Latin</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Ancient Greek</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Meaning</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Levin&apos;s (1993) / VerbNet class</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-4 py-2 text-sm">eo</td>
                                <td className="px-4 py-2 text-sm">eîmi</td>
                                <td className="px-4 py-2 text-sm">&apos;go&apos;</td>
                                <td className="px-4 py-2 text-sm" rowSpan={4}>51.1 Verbs of Inherently Directed Motion / escape-51.1</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">venio</td>
                                <td className="px-4 py-2 text-sm">érkhomai</td>
                                <td className="px-4 py-2 text-sm">&apos;come, go&apos;</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">fugio</td>
                                <td className="px-4 py-2 text-sm">pheúgō</td>
                                <td className="px-4 py-2 text-sm">&apos;flee&apos;</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">gradior</td>
                                <td className="px-4 py-2 text-sm">baínō</td>
                                <td className="px-4 py-2 text-sm">&apos;walk, go&apos;</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">curro</td>
                                <td className="px-4 py-2 text-sm">trékhō</td>
                                <td className="px-4 py-2 text-sm">&apos;run&apos;</td>
                                <td className="px-4 py-2 text-sm" rowSpan={3}>51.3.2, Run-Verbs / run-51.3.2</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">volo</td>
                                <td className="px-4 py-2 text-sm">pétomai</td>
                                <td className="px-4 py-2 text-sm">&apos;fly&apos;</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">no</td>
                                <td className="px-4 py-2 text-sm">néō</td>
                                <td className="px-4 py-2 text-sm">&apos;swim&apos;</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">navigo</td>
                                <td className="px-4 py-2 text-sm">pléō</td>
                                <td className="px-4 py-2 text-sm">&apos;sail&apos;</td>
                                <td className="px-4 py-2 text-sm">51.4.2, Verbs That Are Not Vehicle Names / nonvehicle-51.4.2 (51.4 Verbs of Motion Using a Vehicle)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Why These Verbs?</h2>

                <p>By choosing verbs from across these categories, this study allows for a nuanced analysis of how each language encodes different types of movement, both lexically and through preverb attachment. This cross-domain approach offers a comprehensive basis for comparing spatial semantics, argument structure, and event construal in Latin and Ancient Greek.</p>
            </div>
        </div>
    );
};

export default Verbs;