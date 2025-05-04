import React from 'react';
import BackButton from '@/components/BackButton';

const Verbs = () => {
    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold mt-6 mb-2">Verbs</h1>
            <p className="text-muted-foreground mb-8">
                Understanding verbs and their relationship with preverbs.
            </p>

            <div className="prose max-w-none space-y-8">
                <section>
                    <p>This study examines a diverse set of motion verbs from both Latin and Ancient Greek, deliberately selected from a range of motion domains—including walking, flying, swimming, and sailing. Rather than limiting the analysis to a single subclass, we include verbs that span multiple motion types in order to capture the breadth and variation in how motion is lexically and grammatically encoded across the two languages.</p>

                    <p className="mt-4">The goal is to understand how preverbs interact with different types of motion verbs, and how these combinations reflect spatial and dynamic relationships in each language.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Motion Verb Classifications</h2>

                    <p>The selected verbs are grouped into three major motion classes, following Levin (1993) and VerbNet classifications (see UVI Verb Class Search):</p>

                    <div className="space-y-6 mt-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">1. Inherently Directed Motion Verbs</h3>
                            <p>Verbs that express motion toward or away from a goal by default.<br />
                                E.g., &apos;go&apos;, &apos;come&apos;, &apos;flee&apos;</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">2. Run-Verbs</h3>
                            <p>Verbs denoting self-propelled movement, often rapid or effortful.<br />
                                E.g., &apos;run&apos;, &apos;fly&apos;, &apos;swim&apos;</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">3. Verbs of Motion Using a Vehicle</h3>
                            <p>Verbs describing movement by means of a vehicle or vessel.<br />
                                E.g., &apos;sail&apos;</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Verb Comparison Table</h2>

                    <div className="overflow-x-auto my-6">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="border p-2">Latin</th>
                                    <th className="border p-2">Ancient Greek</th>
                                    <th className="border p-2">Meaning</th>
                                    <th className="border p-2">Levin&apos;s (1993) / VerbNet class</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">eo</td>
                                    <td className="border p-2">eîmi</td>
                                    <td className="border p-2">&apos;go&apos;</td>
                                    <td className="border p-2" rowSpan={4}>51.1 Verbs of Inherently Directed Motion / escape-51.1</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">venio</td>
                                    <td className="border p-2">érkhomai</td>
                                    <td className="border p-2">&apos;come, go&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">fugio</td>
                                    <td className="border p-2">pheúgō</td>
                                    <td className="border p-2">&apos;flee&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">gradior</td>
                                    <td className="border p-2">baínō</td>
                                    <td className="border p-2">&apos;walk, go&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">curro</td>
                                    <td className="border p-2">trékhō</td>
                                    <td className="border p-2">&apos;run&apos;</td>
                                    <td className="border p-2" rowSpan={3}>51.3.2, Run-Verbs / run-51.3.2</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">volo</td>
                                    <td className="border p-2">pétomai</td>
                                    <td className="border p-2">&apos;fly&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">no</td>
                                    <td className="border p-2">néō</td>
                                    <td className="border p-2">&apos;swim&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">navigo</td>
                                    <td className="border p-2">pléō</td>
                                    <td className="border p-2">&apos;sail&apos;</td>
                                    <td className="border p-2">51.4.2, Verbs That Are Not Vehicle Names / nonvehicle-51.4.2 (51.4 Verbs of Motion Using a Vehicle)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Why These Verbs?</h2>

                    <p>By choosing verbs from across these categories, this study allows for a nuanced analysis of how each language encodes different types of movement, both lexically and through preverb attachment. This cross-domain approach offers a comprehensive basis for comparing spatial semantics, argument structure, and event construal in Latin and Ancient Greek.</p>
                </section>
            </div>
        </div>
    );
};

export default Verbs;