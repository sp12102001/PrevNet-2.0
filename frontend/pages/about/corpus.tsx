import React from 'react';
import BackButton from '@/components/BackButton';

const Corpus = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Corpus</h1>
            <p className="text-muted-foreground mb-6">
                Information about the text corpus used in the PrevNet project.
            </p>

            <div className="prose max-w-none">
                <p>Building a representative corpus for Ancient Greek and Latin presents unique challenges. PrevNet&apos;s corpus was custom-built to enable detailed, balanced comparisons between the two languages across historical periods and literary genres.</p>

                <p>The corpus includes 35 works by 29 different authors, covering a wide range of genres such as poetry, historiography, theatre, philosophy, oratory, and the novel. Texts span from Early Greek (before the 6th century BCE) and Early Latin (3rd century BCE) to Imperial Greek / Late Latin (2nd century CE), ensuring both diachronic (through time) and diaphasic (across styles) representation.</p>

                <h2>Corpus Composition</h2>
                <p>To guarantee comparability, the corpus contains:</p>
                <ul>
                    <li>50.9% Greek and 49.1% Latin tokens,</li>
                    <li>a balanced mix of prose (around 60%) and poetry (around 40%),</li>
                    <li>and a variety of genres reflecting the richness and diversity of Ancient Greek and Roman literary production.</li>
                </ul>
                <p>Priority was given to existing annotated corpora such as the Ancient Greek and Latin Dependency Treebank, but additional authors and texts were added to fill crucial gaps. Inscriptions were excluded, due to the low frequency of relevant preverbal forms.</p>

                <h2>Ancient Greek Corpus</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse my-6">
                        <thead>
                            <tr className="bg-muted/50">
                                <th className="border p-2">Greek author and text</th>
                                <th className="border p-2">Language period and century</th>
                                <th className="border p-2">Literary genre</th>
                                <th className="border p-2"># tokens</th>
                                <th className="border p-2">%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">Homer, Odyssey 1-12</td>
                                <td className="border p-2">Early Greek (&lt;6th BCE)</td>
                                <td className="border p-2">Poetry, epic</td>
                                <td className="border p-2">46,021</td>
                                <td className="border p-2">16.6</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Pindar, Olympians</td>
                                <td className="border p-2">Early Greek (5th BCE)</td>
                                <td className="border p-2">Poetry, lyric</td>
                                <td className="border p-2">5,953</td>
                                <td className="border p-2">2.2</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Aristophanes, Thesmophoriazusae</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Theatre, comedy</td>
                                <td className="border p-2">7,894</td>
                                <td className="border p-2">2.9</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Aeschylus, Agamemnon</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Theatre, tragedy</td>
                                <td className="border p-2">8,495</td>
                                <td className="border p-2">3.1</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Aeschylus, Prometheus Bound</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Theatre, tragedy</td>
                                <td className="border p-2">6,155</td>
                                <td className="border p-2">2.2</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Sophocles, Antigone</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Theatre, tragedy</td>
                                <td className="border p-2">7,658</td>
                                <td className="border p-2">2.8</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Euripides, Medea</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Theatre, tragedy</td>
                                <td className="border p-2">8,295</td>
                                <td className="border p-2">3.0</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Herodotus, Historiae 1</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Historiography</td>
                                <td className="border p-2">29,081</td>
                                <td className="border p-2">10.5</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Lysias, De caede Erathostenis</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Oratory</td>
                                <td className="border p-2">2,478</td>
                                <td className="border p-2">0.9</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Lysias, In Alcibiadem 1</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Oratory</td>
                                <td className="border p-2">2,591</td>
                                <td className="border p-2">0.9</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Plato, Euthyphro</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Philosophy, dialogue</td>
                                <td className="border p-2">5,417</td>
                                <td className="border p-2">2.0</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Thucydides, Histories 1</td>
                                <td className="border p-2">Classical Greek (5th BCE)</td>
                                <td className="border p-2">Historiography</td>
                                <td className="border p-2">22,308</td>
                                <td className="border p-2">8.1</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Aristotle, Athenian Constitution</td>
                                <td className="border p-2">Classical Greek (4th BCE)</td>
                                <td className="border p-2">Philosophy, treatise</td>
                                <td className="border p-2">16,112</td>
                                <td className="border p-2">5.8</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Apollonius Rhodius, Argonautica 1-3</td>
                                <td className="border p-2">Hellenistic Greek (3rd BCE)</td>
                                <td className="border p-2">Poetry, epic</td>
                                <td className="border p-2">27,066</td>
                                <td className="border p-2">9.8</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Polybius, Histories 1</td>
                                <td className="border p-2">Hellenistic Greek (2nd BCE)</td>
                                <td className="border p-2">Historiography</td>
                                <td className="border p-2">25,658</td>
                                <td className="border p-2">9.3</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Diodorus Siculus, Bibliotheca Historica 11</td>
                                <td className="border p-2">Late Greek, Roman Age (1st BCE)</td>
                                <td className="border p-2">Historiography</td>
                                <td className="border p-2">23,336</td>
                                <td className="border p-2">8.5</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Plutarch, Alcibiades</td>
                                <td className="border p-2">Late Greek, Roman Age (1st-2nd CE)</td>
                                <td className="border p-2">Historiography, biography</td>
                                <td className="border p-2">10,249</td>
                                <td className="border p-2">3.7</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Plutarch, Lycurgus</td>
                                <td className="border p-2">Late Greek, Roman Age (1st-2nd CE)</td>
                                <td className="border p-2">Historiography, biography</td>
                                <td className="border p-2">9,662</td>
                                <td className="border p-2">3.5</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Lucian of Samosata, Vera Historia</td>
                                <td className="border p-2">Late Greek, Roman Age (2nd CE)</td>
                                <td className="border p-2">Novel</td>
                                <td className="border p-2">11,484</td>
                                <td className="border p-2">4.2</td>
                            </tr>
                            <tr className="font-medium">
                                <td className="border p-2">TOTAL</td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2">275,913</td>
                                <td className="border p-2">100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Latin Corpus</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse my-6">
                        <thead>
                            <tr className="bg-muted/50">
                                <th className="border p-2">Latin author and text</th>
                                <th className="border p-2">Language period and century</th>
                                <th className="border p-2">Literary genre</th>
                                <th className="border p-2"># tokens</th>
                                <th className="border p-2">%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">Ennius, Annales</td>
                                <td className="border p-2">Early Latin (3rd BCE)</td>
                                <td className="border p-2">Poetry, epic</td>
                                <td className="border p-2">1,194</td>
                                <td className="border p-2">0.4</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Plautus, Amphitruo</td>
                                <td className="border p-2">Early Latin (3rd BCE)</td>
                                <td className="border p-2">Theatre, comedy</td>
                                <td className="border p-2">9,988</td>
                                <td className="border p-2">3.8</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Plautus, Mostellaria</td>
                                <td className="border p-2">Early Latin (3rd BCE)</td>
                                <td className="border p-2">Theatre, comedy</td>
                                <td className="border p-2">9,780</td>
                                <td className="border p-2">3.7</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Caesar, De bello Gallico 1-4</td>
                                <td className="border p-2">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="border p-2">Historiography</td>
                                <td className="border p-2">20,498</td>
                                <td className="border p-2">7.7</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Cicero, In Catilinam 1-3</td>
                                <td className="border p-2">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="border p-2">Oratory</td>
                                <td className="border p-2">11,625</td>
                                <td className="border p-2">4.4</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Cicero, De amicitia</td>
                                <td className="border p-2">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="border p-2">Philosophy, dialogue</td>
                                <td className="border p-2">9,471</td>
                                <td className="border p-2">3.6</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Sallust, Bellum Catilinae</td>
                                <td className="border p-2">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="border p-2">Historiography</td>
                                <td className="border p-2">10,655</td>
                                <td className="border p-2">4.0</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Livius, Ab Urbe condita, libri 1-2</td>
                                <td className="border p-2">Classical Latin, Golden Age (1st BCE)</td>
                                <td className="border p-2">Historiography</td>
                                <td className="border p-2">39,913</td>
                                <td className="border p-2">15.0</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Virgil, Aeneid</td>
                                <td className="border p-2">Classical Latin, Imperial Age (1st CE)</td>
                                <td className="border p-2">Poetry, epic</td>
                                <td className="border p-2">63,719</td>
                                <td className="border p-2">24.0</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Propertius, Elegiae 1.1-1.22</td>
                                <td className="border p-2">Classical Latin, Imperial Age (1st CE)</td>
                                <td className="border p-2">Poetry, elegy</td>
                                <td className="border p-2">4,384</td>
                                <td className="border p-2">1.6</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Horace, Satires</td>
                                <td className="border p-2">Classical Latin, Imperial Age (1st CE)</td>
                                <td className="border p-2">Poetry, satire</td>
                                <td className="border p-2">7,048</td>
                                <td className="border p-2">2.7</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Seneca, De ira</td>
                                <td className="border p-2">Classical Latin, Imperial Age (1st CE)</td>
                                <td className="border p-2">Philosophy, treatise</td>
                                <td className="border p-2">22,614</td>
                                <td className="border p-2">8.5</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Seneca, Medea</td>
                                <td className="border p-2">Classical Latin, Imperial Age (1st CE)</td>
                                <td className="border p-2">Theatre, tragedy</td>
                                <td className="border p-2">5,639</td>
                                <td className="border p-2">2.1</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Tacitus, Historiae 1</td>
                                <td className="border p-2">Classical Latin, Imperial Age (1st-2nd CE)</td>
                                <td className="border p-2">Historiography</td>
                                <td className="border p-2">11,852</td>
                                <td className="border p-2">4.5</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Suetonius, Life of August</td>
                                <td className="border p-2">Post-Classical/Late Latin (2nd CE)</td>
                                <td className="border p-2">Historiography, biography</td>
                                <td className="border p-2">13,915</td>
                                <td className="border p-2">5.2</td>
                            </tr>
                            <tr>
                                <td className="border p-2">Apuleius, Metamorphoses 1-5</td>
                                <td className="border p-2">Post-Classical/Late Latin (2nd CE)</td>
                                <td className="border p-2">Novel</td>
                                <td className="border p-2">23,358</td>
                                <td className="border p-2">8.8</td>
                            </tr>
                            <tr className="font-medium">
                                <td className="border p-2">TOTAL</td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2">265,707</td>
                                <td className="border p-2">100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Sources and Annotations</h2>
                <p>Texts in this corpus are drawn from:</p>
                <ul>
                    <li>The <a href="http://perseusdl.github.io/treebank_data/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ancient Greek and Latin Dependency Treebank</a></li>
                    <li>The <a href="https://lindat.mff.cuni.cz/repository/xmlui/handle/11372/LRT-5870" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PROIEL Treebank</a></li>
                    <li>Custom annotations created specifically for the PrevNet project</li>
                </ul>

                <p>Where available, syntactically-annotated versions of texts were preferred to enable both lexical and syntactic analysis of preverb-verb combinations.</p>

                <h2>Corpus Balance</h2>
                <p>The following charts illustrate the balanced representation of language periods and literary genres in the corpus:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                    <div>
                        <h3>Greek: Distribution by Period</h3>
                        <ul>
                            <li>Early Greek (&lt;6th-5th BCE): 18.8%</li>
                            <li>Classical Greek (5th-4th BCE): 35.5%</li>
                            <li>Hellenistic Greek (3rd-2nd BCE): 19.1%</li>
                            <li>Late Greek, Roman Age (1st BCE-2nd CE): 19.9%</li>
                            <li>Other/Unknown: 6.7%</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Latin: Distribution by Period</h3>
                        <ul>
                            <li>Early Latin (3rd-2nd BCE): 8.3%</li>
                            <li>Classical Latin (1st BCE): 34.8%</li>
                            <li>Augustan Latin (1st BCE-1st CE): 14.4%</li>
                            <li>Imperial Latin (1st-2nd CE): 34.6%</li>
                            <li>Other/Unknown: 7.9%</li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                    <div>
                        <h3>Greek: Distribution by Genre</h3>
                        <ul>
                            <li>Epic and Lyric Poetry: 28.6%</li>
                            <li>Historiography and Biography: 35.5%</li>
                            <li>Theatre (Tragedy and Comedy): 14.0%</li>
                            <li>Philosophy and Oratory: 9.6%</li>
                            <li>Novel: 4.2%</li>
                            <li>Other/Miscellaneous: 8.1%</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Latin: Distribution by Genre</h3>
                        <ul>
                            <li>Epic and Lyric Poetry: 29.6%</li>
                            <li>Historiography and Biography: 31.5%</li>
                            <li>Theatre (Comedy): 7.0%</li>
                            <li>Philosophy and Oratory: 9.0%</li>
                            <li>Novel: 16.7%</li>
                            <li>Other/Miscellaneous: 6.2%</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Corpus;