import React from 'react';
import BackButton from '@/components/BackButton';

const Preverbs = () => {
    return (
        <div className="space-y-6">
            <BackButton href="/" label="Back to Home" />

            <h1 className="text-3xl font-bold">Preverbs</h1>
            <p className="text-muted-foreground mb-6">
                Understanding preverbs and their linguistic significance.
            </p>

            <div className="prose max-w-none">
                <h2>Study Focus</h2>
                <p>This study focuses on a curated set of 16 preverbs per language, selected to allow a balanced, meaningful comparison between Ancient Greek and Latin. These preverbs were chosen for their semantic richness and cross-linguistic comparability, particularly in spatial and comitative domains.</p>

                <h2>Selected Preverbs</h2>
                <p>The following 16 preverbs were chosen for each language, with translations from Haug (2013) for Greek and McGillivray (2009) for Latin. Each preverb is illustrated with two example verbs:</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse my-6">
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
                                <td className="border p-2">ana- 'up, 'back'</td>
                                <td className="border p-2">anabaínō 'go up'<br />anaphérō 'bring up/back'</td>
                                <td className="border p-2">ab- 'away', 'from'</td>
                                <td className="border p-2">abeo 'go away'<br />aufero (&lt; *ab-fero) 'take away'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">anti- 'against', 'opposite'</td>
                                <td className="border p-2">antibaínō 'go against'<br />antibállō 'throw against'</td>
                                <td className="border p-2">ad- 'to', 'towards'</td>
                                <td className="border p-2">adeo 'reach'<br />appono (&lt; *ad-pono) 'put at'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">apo- 'away', 'from'</td>
                                <td className="border p-2">apobaínō 'go away'<br />apophérō 'carry away'</td>
                                <td className="border p-2">ante- 'before'</td>
                                <td className="border p-2">anteeo 'go before'<br />antepono 'set before'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">dia- 'through', 'across'</td>
                                <td className="border p-2">diabaínō 'step across'<br />diaphérō 'carry through'</td>
                                <td className="border p-2">circum- 'around'</td>
                                <td className="border p-2">circumeo 'go around'<br />circumfero 'carry around'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">eis- 'into'</td>
                                <td className="border p-2">eisbaínō 'enter, board'<br />eisphérō 'bring in'</td>
                                <td className="border p-2">con- (&lt; cum-) 'with', 'together'</td>
                                <td className="border p-2">coeo 'go together'<br />confero 'bring together'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">ek- 'out of'</td>
                                <td className="border p-2">ekbaínō 'exit'<br />ekphérō 'carry out'</td>
                                <td className="border p-2">de- 'down from', 'away'</td>
                                <td className="border p-2">defero 'take down'<br />depono 'lay away'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">en- 'in', 'into'</td>
                                <td className="border p-2">éneimi 'be in'<br />embaínō 'step in(to), embark'</td>
                                <td className="border p-2">ex- 'out of'</td>
                                <td className="border p-2">exeo 'exit'<br />expono 'put out'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">epi- 'upon', 'on', 'against'</td>
                                <td className="border p-2">epibaínō 'go upon'<br />epibállō 'throw upon'</td>
                                <td className="border p-2">in- 'in', 'on', 'into'</td>
                                <td className="border p-2">ineo 'enter'<br />impono (&lt; *in-pono) 'place upon'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">kata- 'down', 'against'</td>
                                <td className="border p-2">katabaínō 'go down'<br />kataphérō 'carry down'</td>
                                <td className="border p-2">inter- 'between', 'among'</td>
                                <td className="border p-2">intereo 'go among'<br />interpono 'put between'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">meta- 'among', 'over'</td>
                                <td className="border p-2">metabaínō 'pass over'<br />metaphérō 'carry over, transfer'</td>
                                <td className="border p-2">intro- 'within, inside of'</td>
                                <td className="border p-2">introeo 'go in, enter'<br />intromitto 'send in, let in'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">para- 'beside'</td>
                                <td className="border p-2">parabaínō 'pass by'<br />parabállō 'throw beside'</td>
                                <td className="border p-2">ob- 'towards', 'against'</td>
                                <td className="border p-2">obeo 'meet'<br />oppono 'set against'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">peri- 'around'</td>
                                <td className="border p-2">peribaínō 'go around'<br />peribállō 'throw around'</td>
                                <td className="border p-2">per- 'through'</td>
                                <td className="border p-2">perago 'carry through'<br />perfero 'bear through'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">pro- 'before', 'forward'</td>
                                <td className="border p-2">probaínō 'step forward'<br />prophérō 'bring before'</td>
                                <td className="border p-2">prae- 'before', 'ahead'</td>
                                <td className="border p-2">praeeo 'go before'<br />praepono 'place in front'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">pros- 'towards', 'against'</td>
                                <td className="border p-2">prosbaínō 'approach'<br />prosbállō 'dash against'</td>
                                <td className="border p-2">pro- 'for', 'forward'</td>
                                <td className="border p-2">profero 'bring forward'<br />propono 'put forward'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">sun- 'with', 'together'</td>
                                <td className="border p-2">sumbállō 'throw together'<br />sumphérō 'bring together'</td>
                                <td className="border p-2">sub- 'under'</td>
                                <td className="border p-2">suffero 'carry under, bear'<br />suppono 'put below'</td>
                            </tr>
                            <tr>
                                <td className="border p-2">hupo- 'under'</td>
                                <td className="border p-2">hupobaínō 'go/come under'<br />hupobállō 'throw under'</td>
                                <td className="border p-2">trans- 'across'</td>
                                <td className="border p-2">transeo 'cross'<br />transpono 'set over, transfer'</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Preverb Categories</h2>

                <h3>1. Spatial Preverbs</h3>
                <p>These describe spatial relationships and are further classified into:</p>

                <h4>Location (static presence):</h4>
                <ul>
                    <li>Greek: en-, epi-, peri-, meta-</li>
                    <li>Latin: in-, circum-, sub-</li>
                </ul>

                <h4>Source (movement from):</h4>
                <ul>
                    <li>Greek: apo-, ek-</li>
                    <li>Latin: ab-, ex-, de-</li>
                </ul>

                <h4>Goal (movement toward):</h4>
                <ul>
                    <li>Greek: eis-, pros-, kata-, etc.</li>
                    <li>Latin: ad-, in-, intro-, pro-</li>
                </ul>

                <h4>Path (movement along):</h4>
                <ul>
                    <li>Greek: dia-, meta-</li>
                    <li>Latin: per-, trans-</li>
                </ul>

                <p>A single preverb may express more than one spatial function depending on verb and context. For example:</p>
                <ul>
                    <li>Latin in- = 'in' (location) or 'into' (goal)</li>
                    <li>Greek en- vs eis- = clearly distinguished location vs. goal</li>
                </ul>

                <h3>2. Comitative Preverbs</h3>
                <p>These express accompaniment or association, especially in motion:</p>

                <h4>Greek sun-:</h4>
                <ul>
                    <li>Symmetrical – sunérkhomai 'come together'</li>
                    <li>Asymmetrical – sunapothnḗskō 'die together'</li>
                </ul>

                <h4>Latin cum-/con-:</h4>
                <ul>
                    <li>Symmetrical – coeo</li>
                    <li>Asymmetrical – commorior</li>
                </ul>

                <p>These can denote either shared destinations or co-movement, which is vital in analyzing event structure and agentivity.</p>
            </div>
        </div>
    );
};

export default Preverbs;