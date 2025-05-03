import React from 'react';
import BackButton from '@/components/BackButton';

const Corpus = () => {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Corpus</h1>
            <p className="text-muted-foreground mb-6">
                Information about the text corpus used in the PrevNet project.
            </p>

            <div className="prose max-w-none">
                <p className="text-lg">Building a representative corpus for Ancient Greek and Latin presents unique challenges. PrevNet&apos;s corpus was custom-built to enable detailed, balanced comparisons between the two languages across historical periods and literary genres.</p>

                <p>The corpus includes 35 works by 29 different authors, covering a wide range of genres such as poetry, historiography, theatre, philosophy, oratory, and the novel. Texts span from Early Greek (before the 6th century BCE) and Early Latin (3rd century BCE) to Imperial Greek / Late Latin (2nd century CE), ensuring both diachronic (through time) and diaphasic (across styles) representation.</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Corpus Composition</h2>
                <p>To guarantee comparability, the corpus contains:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>50.9% Greek and 49.1% Latin tokens,</li>
                    <li>a balanced mix of prose (around 60%) and poetry (around 40%),</li>
                    <li>and a variety of genres reflecting the richness and diversity of Ancient Greek and Roman literary production.</li>
                </ul>
                <p>Priority was given to existing annotated corpora such as the Ancient Greek and Latin Dependency Treebank, but additional authors and texts were added to fill crucial gaps. Inscriptions were excluded, due to the low frequency of relevant preverbal forms.</p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Ancient Greek Corpus</h2>
                <div className="overflow-x-auto my-6 rounded-lg border shadow">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Greek author and text</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Language period and century</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Literary genre</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900"># tokens</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">%</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-4 py-2 text-sm">Homer, Odyssey 1-12</td>
                                <td className="px-4 py-2 text-sm">Early Greek (&lt;6th BCE)</td>
                                <td className="px-4 py-2 text-sm">Poetry, epic</td>
                                <td className="px-4 py-2 text-sm">46,021</td>
                                <td className="px-4 py-2 text-sm">16.6</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Pindar, Olympians</td>
                                <td className="px-4 py-2 text-sm">Early Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Poetry, lyric</td>
                                <td className="px-4 py-2 text-sm">5,953</td>
                                <td className="px-4 py-2 text-sm">2.2</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Aristophanes, Thesmophoriazusae</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Theatre, comedy</td>
                                <td className="px-4 py-2 text-sm">7,894</td>
                                <td className="px-4 py-2 text-sm">2.9</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Aeschylus, Agamemnon</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Theatre, tragedy</td>
                                <td className="px-4 py-2 text-sm">8,495</td>
                                <td className="px-4 py-2 text-sm">3.1</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Aeschylus, Prometheus Bound</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Theatre, tragedy</td>
                                <td className="px-4 py-2 text-sm">6,155</td>
                                <td className="px-4 py-2 text-sm">2.2</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Sophocles, Antigone</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Theatre, tragedy</td>
                                <td className="px-4 py-2 text-sm">7,658</td>
                                <td className="px-4 py-2 text-sm">2.8</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Euripides, Medea</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Theatre, tragedy</td>
                                <td className="px-4 py-2 text-sm">8,295</td>
                                <td className="px-4 py-2 text-sm">3.0</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Herodotus, Historiae 1</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Historiography</td>
                                <td className="px-4 py-2 text-sm">29,081</td>
                                <td className="px-4 py-2 text-sm">10.5</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Lysias, De caede Erathostenis</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Oratory</td>
                                <td className="px-4 py-2 text-sm">2,478</td>
                                <td className="px-4 py-2 text-sm">0.9</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Lysias, In Alcibiadem 1</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Oratory</td>
                                <td className="px-4 py-2 text-sm">2,591</td>
                                <td className="px-4 py-2 text-sm">0.9</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Plato, Euthyphro</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Philosophy, dialogue</td>
                                <td className="px-4 py-2 text-sm">5,417</td>
                                <td className="px-4 py-2 text-sm">2.0</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Thucydides, Histories 1</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (5th BCE)</td>
                                <td className="px-4 py-2 text-sm">Historiography</td>
                                <td className="px-4 py-2 text-sm">22,308</td>
                                <td className="px-4 py-2 text-sm">8.1</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Aristotle, Athenian Constitution</td>
                                <td className="px-4 py-2 text-sm">Classical Greek (4th BCE)</td>
                                <td className="px-4 py-2 text-sm">Philosophy, treatise</td>
                                <td className="px-4 py-2 text-sm">16,112</td>
                                <td className="px-4 py-2 text-sm">5.8</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Apollonius Rhodius, Argonautica 1-3</td>
                                <td className="px-4 py-2 text-sm">Hellenistic Greek (3rd BCE)</td>
                                <td className="px-4 py-2 text-sm">Poetry, epic</td>
                                <td className="px-4 py-2 text-sm">27,066</td>
                                <td className="px-4 py-2 text-sm">9.8</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Polybius, Histories 1</td>
                                <td className="px-4 py-2 text-sm">Hellenistic Greek (2nd BCE)</td>
                                <td className="px-4 py-2 text-sm">Historiography</td>
                                <td className="px-4 py-2 text-sm">25,658</td>
                                <td className="px-4 py-2 text-sm">9.3</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Diodorus Siculus, Bibliotheca Historica 11</td>
                                <td className="px-4 py-2 text-sm">Late Greek, Roman Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Historiography</td>
                                <td className="px-4 py-2 text-sm">23,336</td>
                                <td className="px-4 py-2 text-sm">8.5</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Plutarch, Alcibiades</td>
                                <td className="px-4 py-2 text-sm">Late Greek, Roman Age (1st-2nd CE)</td>
                                <td className="px-4 py-2 text-sm">Historiography, biography</td>
                                <td className="px-4 py-2 text-sm">10,249</td>
                                <td className="px-4 py-2 text-sm">3.7</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Plutarch, Lycurgus</td>
                                <td className="px-4 py-2 text-sm">Late Greek, Roman Age (1st-2nd CE)</td>
                                <td className="px-4 py-2 text-sm">Historiography, biography</td>
                                <td className="px-4 py-2 text-sm">9,662</td>
                                <td className="px-4 py-2 text-sm">3.5</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Lucian of Samosata, Vera Historia</td>
                                <td className="px-4 py-2 text-sm">Late Greek, Roman Age (2nd CE)</td>
                                <td className="px-4 py-2 text-sm">Novel</td>
                                <td className="px-4 py-2 text-sm">11,484</td>
                                <td className="px-4 py-2 text-sm">4.2</td>
                            </tr>
                            <tr className="bg-gray-100 font-medium">
                                <td className="px-4 py-2 text-sm">TOTAL</td>
                                <td className="px-4 py-2 text-sm"></td>
                                <td className="px-4 py-2 text-sm"></td>
                                <td className="px-4 py-2 text-sm">275,913</td>
                                <td className="px-4 py-2 text-sm">100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Latin Corpus</h2>
                <div className="overflow-x-auto my-6 rounded-lg border shadow">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Latin author and text</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Language period and century</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Literary genre</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900"># tokens</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">%</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-4 py-2 text-sm">Ennius, Annales</td>
                                <td className="px-4 py-2 text-sm">Early Latin (3rd BCE)</td>
                                <td className="px-4 py-2 text-sm">Poetry, epic</td>
                                <td className="px-4 py-2 text-sm">1,194</td>
                                <td className="px-4 py-2 text-sm">0.4</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Plautus, Amphitruo</td>
                                <td className="px-4 py-2 text-sm">Early Latin (3rd BCE)</td>
                                <td className="px-4 py-2 text-sm">Theatre, comedy</td>
                                <td className="px-4 py-2 text-sm">9,988</td>
                                <td className="px-4 py-2 text-sm">3.8</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Plautus, Mostellaria</td>
                                <td className="px-4 py-2 text-sm">Early Latin (3rd BCE)</td>
                                <td className="px-4 py-2 text-sm">Theatre, comedy</td>
                                <td className="px-4 py-2 text-sm">9,780</td>
                                <td className="px-4 py-2 text-sm">3.7</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Caesar, De bello Gallico 1-4</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Historiography</td>
                                <td className="px-4 py-2 text-sm">20,498</td>
                                <td className="px-4 py-2 text-sm">7.7</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Cicero, In Catilinam 1-3</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Oratory</td>
                                <td className="px-4 py-2 text-sm">11,625</td>
                                <td className="px-4 py-2 text-sm">4.4</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Cicero, De amicitia</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Philosophy, dialogue</td>
                                <td className="px-4 py-2 text-sm">9,471</td>
                                <td className="px-4 py-2 text-sm">3.6</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Sallust, Bellum Catilinae</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Historiography</td>
                                <td className="px-4 py-2 text-sm">10,655</td>
                                <td className="px-4 py-2 text-sm">4.0</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Livius, Ab Urbe condita, libri 1-2</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Historiography</td>
                                <td className="px-4 py-2 text-sm">39,913</td>
                                <td className="px-4 py-2 text-sm">15.0</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Virgil, Aeneid</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Imperial Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Poetry, epic</td>
                                <td className="px-4 py-2 text-sm">63,719</td>
                                <td className="px-4 py-2 text-sm">24.0</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Propertius, Elegiae 1.1-1.22</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Imperial Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Poetry, elegy</td>
                                <td className="px-4 py-2 text-sm">4,384</td>
                                <td className="px-4 py-2 text-sm">1.6</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Horace, Satires</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Imperial Age (1st BCE)</td>
                                <td className="px-4 py-2 text-sm">Poetry, satire</td>
                                <td className="px-4 py-2 text-sm">7,048</td>
                                <td className="px-4 py-2 text-sm">2.7</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Seneca, De ira</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Imperial Age (1st CE)</td>
                                <td className="px-4 py-2 text-sm">Philosophy, treatise</td>
                                <td className="px-4 py-2 text-sm">22,614</td>
                                <td className="px-4 py-2 text-sm">8.5</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Seneca, Medea</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Imperial Age (1st CE)</td>
                                <td className="px-4 py-2 text-sm">Theatre, tragedy</td>
                                <td className="px-4 py-2 text-sm">5,639</td>
                                <td className="px-4 py-2 text-sm">2.1</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Tacitus, Historiae 1</td>
                                <td className="px-4 py-2 text-sm">Classical Latin, Imperial Age (1st-2nd CE)</td>
                                <td className="px-4 py-2 text-sm">Historiography</td>
                                <td className="px-4 py-2 text-sm">11,852</td>
                                <td className="px-4 py-2 text-sm">4.5</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm">Suetonius, Life of August</td>
                                <td className="px-4 py-2 text-sm">Post-Classical/Late Latin (2nd CE)</td>
                                <td className="px-4 py-2 text-sm">Historiography, biography</td>
                                <td className="px-4 py-2 text-sm">13,915</td>
                                <td className="px-4 py-2 text-sm">5.2</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 text-sm">Apuleius, Metamorphoses 1-5</td>
                                <td className="px-4 py-2 text-sm">Post-Classical/Late Latin (2nd CE)</td>
                                <td className="px-4 py-2 text-sm">Novel</td>
                                <td className="px-4 py-2 text-sm">23,358</td>
                                <td className="px-4 py-2 text-sm">8.8</td>
                            </tr>
                            <tr className="bg-gray-100 font-medium">
                                <td className="px-4 py-2 text-sm">TOTAL</td>
                                <td className="px-4 py-2 text-sm"></td>
                                <td className="px-4 py-2 text-sm"></td>
                                <td className="px-4 py-2 text-sm">265,707</td>
                                <td className="px-4 py-2 text-sm">100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Corpus Building Process</h2>

                <h3 className="text-xl font-medium mt-6 mb-3">Challenges in Selecting a Corpus</h3>
                <p>Choosing a corpus that is truly representative of both Ancient Greek and Latin is a complex undertaking. The selection aimed to:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>include a sufficient number of texts to allow for a meaningful analysis,</li>
                    <li>ensure comparability between the two languages, considering both diachronic (historical) development and literary genres.</li>
                </ul>
                <p>However, there are important differences between the body of surviving texts in Ancient Greek and Latin:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>Ancient Greek has a more ancient literary tradition (starting from the 8th–6th centuries BCE), whereas Latin literature begins later, in the 3rd century BCE.</li>
                    <li>Literary genres in the two languages do not correspond perfectly: for instance, Greek tragedy has no real Latin equivalent during the Classical period, and genres like Archaic Greek lyric poetry or Roman satire are unique to their cultures.</li>
                </ul>
                <p>Despite these challenges, the corpus was carefully designed to maximize comparability and representation.</p>

                <h3 className="text-xl font-medium mt-6 mb-3">Existing Corpora and Their Limitations</h3>
                <p>The project first examined available annotated corpora:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>LatinISE was excluded because, at the time when this project started (2022), there was no Greek counterpart.</li>
                    <li>AGDT (Ancient Greek Dependency Treebank) and LDT (Latin Dependency Treebank) were primarily used, as they offer high-quality morpho-syntactic annotation.</li>
                </ul>
                <p>However, limitations remained:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>The AGDT contains 32 Ancient Greek texts by 15 authors.</li>
                    <li>The LDT includes only 12 Latin texts, often partially annotated (e.g., only parts of Caesar&apos;s De Bello Gallico).</li>
                    <li>Key authors (like Plautus and Seneca) and genres (like the novel) were missing.</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">Creating a New Corpus</h3>
                <p>Given these issues, a new corpus was created, building upon and expanding AGDT and LDT. It includes:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>More authors and genres, ensuring broader representation.</li>
                    <li>Additional annotated material, completing partially annotated texts when necessary.</li>
                    <li>Both prose and poetry, balancing the linguistic differences between these forms.</li>
                    <li>Different historical stages, from Early to Late Greek and Latin.</li>
                </ul>
                <p>Inscriptions were excluded because they seldom include relevant preverbal forms, and queries into databases like CLaSSES and EAGLE confirmed their limited usefulness for this study.</p>

                <h3 className="text-xl font-medium mt-6 mb-3">Vertical and Horizontal Consistency</h3>
                <p>The corpus ensures both vertical and horizontal consistency:</p>

                <h4 className="text-lg font-medium mt-4 mb-2">Vertical consistency (across time):</h4>
                <p>Each sub-corpus includes authors from the Early, Classical, and Late periods.</p>

                <h4 className="text-lg font-medium mt-4 mb-2">Horizontal consistency (across styles):</h4>
                <p>The same literary genres (epic, lyric, historiography, theatre, philosophy, oratory, and novel) are represented in both languages wherever possible.</p>
                <p>This double consistency allows meaningful comparative analysis between Greek and Latin.</p>

                <h3 className="text-xl font-medium mt-6 mb-3">Composition of the Final Corpus</h3>
                <p>The final corpus includes:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>16 Greek authors and 13 Latin authors,</li>
                    <li>19 Greek texts and 16 Latin texts,</li>
                    <li>for a total of 35 works.</li>
                </ul>

                <p className="font-medium mt-4 mb-2">Genre Distribution:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>Historiography is the most represented (43.6% in Greek, 36.4% in Latin),</li>
                    <li>Followed by poetry (28.6% Greek, 28.7% Latin),</li>
                    <li>Then theatre, philosophy, novel, and oratory.</li>
                </ul>
                <p>Texts were selected according to both the importance of the genre and the relative literary productivity of the authors. For prolific authors (e.g., Plutarch, Cicero), multiple works are included, though always considering balance across genres.</p>

                <h3 className="text-xl font-medium mt-6 mb-3">Balance Between Greek and Latin</h3>
                <p>The corpus achieves a near-equal division:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>50.9% Greek and 49.1% Latin tokens.</li>
                </ul>

                <p>Prose slightly predominates:</p>
                <ul className="list-disc pl-6 my-4">
                    <li>57.4% prose in the Greek sub-corpus,</li>
                    <li>61.7% prose in the Latin sub-corpus.</li>
                </ul>
            </div>
        </div>
    );
};

export default Corpus;