"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMeaningData = exports.generatePreverbData = exports.preverbs = void 0;
// Mock data for preverbs
exports.preverbs = [
    "ab",
    "ad",
    "ante",
    "circum",
    "com",
    "contra",
    "de",
    "dis",
    "e",
    "ex",
    "extra",
    "in",
    "inter",
    "intro",
    "ob",
    "per",
    "post",
    "prae",
    "praeter",
    "pro",
    "re",
    "retro",
    "se",
    "sub",
    "super",
    "trans"
];
// Mock data for a specific preverb
const generatePreverbData = (preverb) => {
    const verbalBases = {
        "duco": 15,
        "fero": 12,
        "loquor": 8,
        "mitto": 10,
        "pono": 7,
        "venio": 14,
    };
    const meanings = {
        "directional": 20,
        "completive": 15,
        "intensive": 10,
        "figurative": 8,
        "iterative": 5,
    };
    const examples = [
        {
            count: 20,
            lemma: "duco",
            verb_semantics: "to lead, guide, draw",
            meaning_id: "directional"
        },
        {
            count: 15,
            lemma: "fero",
            verb_semantics: "to bear, carry, bring",
            meaning_id: "completive"
        },
        {
            count: 10,
            lemma: "venio",
            verb_semantics: "to come",
            meaning_id: "intensive"
        },
        {
            count: 8,
            lemma: "pono",
            verb_semantics: "to put, place, set",
            meaning_id: "figurative"
        },
        {
            count: 5,
            lemma: "mitto",
            verb_semantics: "to send, let go",
            meaning_id: "iterative"
        }
    ];
    return {
        verbal_bases: verbalBases,
        meanings: meanings,
        total_occurrences: 58,
        examples: examples
    };
};
exports.generatePreverbData = generatePreverbData;
// Mock data for a specific meaning
const generateMeaningData = (meaningId) => {
    const verbSemantics = {
        "directional": "movement towards or in a specific direction",
        "completive": "completion of an action",
        "intensive": "intensification of the verbal action",
        "figurative": "metaphorical or abstract use",
        "iterative": "repetition of an action"
    }[meaningId] || "Unknown meaning";
    const occurrences = [
        {
            preverb: "ad",
            lemma: "venio",
            sentence: "Caesar ad castra advenit.",
            token: "advenit",
            location_url: "https://example.com/text1"
        },
        {
            preverb: "com",
            lemma: "venio",
            sentence: "Milites in urbem conveniunt.",
            token: "conveniunt",
            location_url: "https://example.com/text2"
        },
        {
            preverb: "in",
            lemma: "venio",
            sentence: "Hostes in agros invenerunt.",
            token: "invenerunt",
            location_url: "https://example.com/text3"
        },
        {
            preverb: "per",
            lemma: "venio",
            sentence: "Ad templum pervenit.",
            token: "pervenit",
            location_url: "https://example.com/text4"
        }
    ];
    return {
        verb_semantics: verbSemantics,
        occurrences: occurrences
    };
};
exports.generateMeaningData = generateMeaningData;
