import React from 'react';
import BackButton from '@/components/BackButton';

const Preverbs = () => {
    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold mt-6 mb-2">Preverbs</h1>
            <p className="text-muted-foreground mb-8">
                Understanding preverbs and their linguistic significance.
            </p>

            <div className="prose max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Study Focus</h2>
                    <p>This study focuses on a curated set of 16 preverbs per language, selected to allow a balanced, meaningful comparison between Ancient Greek and Latin. These preverbs were chosen for their semantic richness and cross-linguistic comparability, particularly in spatial and comitative domains.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Selected Preverbs</h2>
                    <p>The following 16 preverbs were chosen for each language, with translations from Haug (2013) for Greek and McGillivray (2009) for Latin. Each preverb is illustrated with two example verbs:</p>

                    <div className="overflow-x-auto my-6">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="border p-2">Ancient Greek</th>
                                    <th className="border p-2">Example Verbs</th>
                                    <th className="border p-2">Latin</th>
                                    <th className="border p-2">Example Verbs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">ana- &apos;up, &apos;back&apos;</td>
                                    <td className="border p-2">anabaínō &apos;go up&apos;<br />anaphérō &apos;bring up/back&apos;</td>
                                    <td className="border p-2">ab- &apos;away&apos;, &apos;from&apos;</td>
                                    <td className="border p-2">abeo &apos;go away&apos;<br />aufero (&lt; *ab-fero) &apos;take away&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">anti- &apos;against&apos;, &apos;opposite&apos;</td>
                                    <td className="border p-2">antibaínō &apos;go against&apos;<br />antibállō &apos;throw against&apos;</td>
                                    <td className="border p-2">ad- &apos;to&apos;, &apos;towards&apos;</td>
                                    <td className="border p-2">adeo &apos;reach&apos;<br />appono (&lt; *ad-pono) &apos;put at&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">apo- &apos;away&apos;, &apos;from&apos;</td>
                                    <td className="border p-2">apobaínō &apos;go away&apos;<br />apophérō &apos;carry away&apos;</td>
                                    <td className="border p-2">ante- &apos;before&apos;</td>
                                    <td className="border p-2">anteeo &apos;go before&apos;<br />antepono &apos;set before&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">dia- &apos;through&apos;, &apos;across&apos;</td>
                                    <td className="border p-2">diabaínō &apos;step across&apos;<br />diaphérō &apos;carry through&apos;</td>
                                    <td className="border p-2">circum- &apos;around&apos;</td>
                                    <td className="border p-2">circumeo &apos;go around&apos;<br />circumfero &apos;carry around&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">eis- &apos;into&apos;</td>
                                    <td className="border p-2">eisbaínō &apos;enter, board&apos;<br />eisphérō &apos;bring in&apos;</td>
                                    <td className="border p-2">con- (&lt; cum-) &apos;with&apos;, &apos;together&apos;</td>
                                    <td className="border p-2">coeo &apos;go together&apos;<br />confero &apos;bring together&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">ek- &apos;out of&apos;</td>
                                    <td className="border p-2">ekbaínō &apos;exit&apos;<br />ekphérō &apos;carry out&apos;</td>
                                    <td className="border p-2">de- &apos;down from&apos;, &apos;away&apos;</td>
                                    <td className="border p-2">defero &apos;take down&apos;<br />depono &apos;lay away&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">en- &apos;in&apos;, &apos;into&apos;</td>
                                    <td className="border p-2">éneimi &apos;be in&apos;<br />embaínō &apos;step in(to), embark&apos;</td>
                                    <td className="border p-2">ex- &apos;out of&apos;</td>
                                    <td className="border p-2">exeo &apos;exit&apos;<br />expono &apos;put out&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">epi- &apos;upon&apos;, &apos;on&apos;, &apos;against&apos;</td>
                                    <td className="border p-2">epibaínō &apos;go upon&apos;<br />epibállō &apos;throw upon&apos;</td>
                                    <td className="border p-2">in- &apos;in&apos;, &apos;on&apos;, &apos;into&apos;</td>
                                    <td className="border p-2">ineo &apos;enter&apos;<br />impono (&lt; *in-pono) &apos;place upon&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">kata- &apos;down&apos;, &apos;against&apos;</td>
                                    <td className="border p-2">katabaínō &apos;go down&apos;<br />kataphérō &apos;carry down&apos;</td>
                                    <td className="border p-2">inter- &apos;between&apos;, &apos;among&apos;</td>
                                    <td className="border p-2">intereo &apos;go among&apos;<br />interpono &apos;put between&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">meta- &apos;among&apos;, &apos;over&apos;</td>
                                    <td className="border p-2">metabaínō &apos;pass over&apos;<br />metaphérō &apos;carry over, transfer&apos;</td>
                                    <td className="border p-2">intro- &apos;within, inside of&apos;</td>
                                    <td className="border p-2">introeo &apos;go in, enter&apos;<br />intromitto &apos;send in, let in&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">para- &apos;beside&apos;</td>
                                    <td className="border p-2">parabaínō &apos;pass by&apos;<br />parabállō &apos;throw beside&apos;</td>
                                    <td className="border p-2">ob- &apos;towards&apos;, &apos;against&apos;</td>
                                    <td className="border p-2">obeo &apos;meet&apos;<br />oppono &apos;set against&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">peri- &apos;around&apos;</td>
                                    <td className="border p-2">peribaínō &apos;go around&apos;<br />peribállō &apos;throw around&apos;</td>
                                    <td className="border p-2">per- &apos;through&apos;</td>
                                    <td className="border p-2">perago &apos;carry through&apos;<br />perfero &apos;bear through&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">pro- &apos;before&apos;, &apos;forward&apos;</td>
                                    <td className="border p-2">probaínō &apos;step forward&apos;<br />prophérō &apos;bring before&apos;</td>
                                    <td className="border p-2">prae- &apos;before&apos;, &apos;ahead&apos;</td>
                                    <td className="border p-2">praeeo &apos;go before&apos;<br />praepono &apos;place in front&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">pros- &apos;towards&apos;, &apos;against&apos;</td>
                                    <td className="border p-2">prosbaínō &apos;approach&apos;<br />prosbállō &apos;dash against&apos;</td>
                                    <td className="border p-2">pro- &apos;for&apos;, &apos;forward&apos;</td>
                                    <td className="border p-2">profero &apos;bring forward&apos;<br />propono &apos;put forward&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">sun- &apos;with&apos;, &apos;together&apos;</td>
                                    <td className="border p-2">sumbállō &apos;throw together&apos;<br />sumphérō &apos;bring together&apos;</td>
                                    <td className="border p-2">sub- &apos;under&apos;</td>
                                    <td className="border p-2">suffero &apos;carry under, bear&apos;<br />suppono &apos;put below&apos;</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">hupo- &apos;under&apos;</td>
                                    <td className="border p-2">hupobaínō &apos;go/come under&apos;<br />hupobállō &apos;throw under&apos;</td>
                                    <td className="border p-2">trans- &apos;across&apos;</td>
                                    <td className="border p-2">transeo &apos;cross&apos;<br />transpono &apos;set over, transfer&apos;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Preverb Categories</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2">1. Spatial Preverbs</h3>
                            <p>These describe spatial relationships and are further classified into:</p>

                            <div className="ml-4 mt-4 space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold">Location (static presence):</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Greek: en-, epi-, peri-, meta-</li>
                                        <li>Latin: in-, circum-, sub-</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold">Source (movement from):</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Greek: apo-, ek-</li>
                                        <li>Latin: ab-, ex-, de-</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold">Goal (movement toward):</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Greek: eis-, pros-, kata-, etc.</li>
                                        <li>Latin: ad-, in-, intro-, pro-</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold">Path (movement along):</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Greek: dia-, meta-</li>
                                        <li>Latin: per-, trans-</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="mt-4">A single preverb may express more than one spatial function depending on verb and context. For example:</p>
                            <ul className="list-disc pl-6 space-y-1 mt-2">
                                <li>Latin in- = &apos;in&apos; (location) or &apos;into&apos; (goal)</li>
                                <li>Greek en- vs eis- = clearly distinguished location vs. goal</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">2. Comitative Preverbs</h3>
                            <p>These express accompaniment or association, especially in motion:</p>

                            <div className="ml-4 mt-4 space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold">Greek sun-:</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Symmetrical – sunérkhomai &apos;come together&apos;</li>
                                        <li>Asymmetrical – sunapothnḗskō &apos;die together&apos;</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold">Latin cum-/con-:</h4>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Symmetrical – coeo</li>
                                        <li>Asymmetrical – commorior</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="mt-4">These can denote either shared destinations or co-movement, which is vital in analyzing event structure and agentivity.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Preverbs;