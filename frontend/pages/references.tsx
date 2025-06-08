import React from 'react';

const References: React.FC = () => {
    const references = [
        "Acedo-Matellán, Víctor. 2021. Goal, Source, and Route Preverbs in Latin: Their Interaction with Spatial Datives. The Linguistic Review 38 (2): 233–66. https://doi.org/10.1515/tlr-2021-2064.",
        "Ackerman, Farrell. 2003. Aspectual Contrasts and Lexeme Derivation in Estonian: A Realization-Based Morphological Perspective. In Geert Booij and Jaap van Marle (eds.), Yearbook of Morphology, 13–31. Dordrecht: Kluwer.",
        "Ackerman, Farrell, and Gerth Webelhuth. 1998. A Theory of Complex Predicates. Stanford: CSLI.",
        "Antelmi, Donatella. 2002. Il Verbo Senza Significato: Possibilità Di Slittamento Del Contenuto Lessicale Su Elementi Di Tipo Nominale. Rivista Italiana Di Linguistica e Di Dialettologia 4:97–117.",
        "Bader, François. 1997. Prépositions Dans Les Langues Indo-Européennes Anciennes. Faits de Langues 84:49–61.",
        "Baldi, Philip. 1979. Typology and the Indo-European Prepositions. Indogermanische Forschungen 84:49–61.",
        "Bartolotta, Annamaria. 2016. Deissi Spaziale e Verbi Di Movimento in Vedico. In Francesco Dedè (ed.) Categorie Grammaticali e Classi Di Parole. Statuto e Riflessi Metalinguistici, 19–38. Rome: Il Calamo.",
        "Bartolotta, Annamaria. 2018. Spatial Cognition and Frames of Reference in Indo-European. In Domenica Romagno, Francesco Rovai, Michele Bianconi, and Marta Capano (eds.), Variation, Contact, and Reconstruction in the Ancient Indo-European Languages, 179–209. Boston / Leiden: Brill.",
        "Benveniste, Émile. 1949. Le Système Sublogique Des Prépositions En Latin. Travaux Du Cercle Linguistique de Copenhague V. Recherches Structurales, 177–84.",
        "Bertocci, Davide. 2017. 'Intensive' Verbal Prefixes in Archaic Latin. In Rosanna Benacchio, Alessio Muro, and Svetlana Slavkova (eds.), Biblioteca Di Studi Slavistici, 39, 41–58. Florence: Firenze University Press.",
        "Biagetti, Erica, Chiara Zanchi, and William Michael Short. 2021. Toward the creation of WordNets for ancient Indo-European languages. In Proceedings of the 11th Global Wordnet Conference, University of South Africa (UNISA), 258–266.",
        "Boley, Jaqueline. 2004. Tmesis in Proto-Indo-European Syntax. Innsbruck: Innsbrucker Beiträge zur Sprachwissenschaft.",
        "Booij, Geert, and Ans Van Kemenade. 2003. Preverbs: An Introduction. In Geert Booij and Jaap van Marle (eds.), Yearbook of Morphology 2003, 1–11. Dordrecht: Kluwer.",
        "Bortolussi, Bernard. 2005. Le Double Accusatif Aver Le Verbes Préfixés En Circum- et Trans. In Claude Moussy (ed.), La Composition et La Préverbation En Latin, 277–92. Paris: Presses de l'Université Paris-Sorbonne.",
        "Bortone, Pietro. 2000. Aspects of the history of the Greek prepositions. Hilary Term: University of Oxford.",
        "Boullosa, Beto, Richard Eckart de Castilho, Naveen Kumar, Jan-Christoph Klie, and Iryna Gurevych. 2018. Integrating Knowledge-Supported Search into the INCEpTION Annotation Platform. In Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing (EMNLP), 127–132.",
        "Brachet, Jean-Paul. 2000. Recherches Sur Les Préverbes De- et Ex- Du Latin. Bruxelles: Latomus.",
        "Brachet, Jean-Paul. 2005. Préverbes En Intro En Cours de Constitution Chez Plaute et Térence. In Claude Moussy (ed.), La Composition et La Préverbation En Latin, 309–20. Paris: Presses de l'Université Paris-Sorbonne.",
        "Brinton, Laurel J., and Elizabeth C. Traugott. 2005. Lexicalization and language change. Cambridge: Cambridge University Press.",
        "Brucale, Luisa, and Egle Mocciaro. 2016. Paths of Grammaticalization of Early Latin per/per-: A Cognitive Hypothesis. In Daniel Olmen, Hubert Cuyckens, and Lobke Ghesquière (eds.), Aspects of Grammaticalization, 199–236. Berlin: De Gruyter.",
        "Brugmann, Karl. 1890. Griechische Und Lateinische Sprachwissenschaft. Munich: Beck.",
        "Budd, Noella. 2008. Prepositions and Preverbs in Hellenistic Greek. University of Sydney: BA Thesis.",
        "Castilho, Richard Eckart de, Jan-Christoph Klie, Naveen Kumar, Beto Boullosa, and Iryna Gurevych. 2018a. INCEpTION - Corpus-Based Data Science from Scratch. Digital Infrastructures for Research (DI4R) 2018, 9-11 October 2018, Lisbon, Portugal.",
        "Castilho, Richard Eckart de, Jan-Christoph Klie, Naveen Kumar, Beto Boullosa, and Iryna Gurevych. 2018b. Linking Text and Knowledge Using the INCEpTION Annotation Platform. In Proceedings of the 14th eScience IEEE International Conference, Amsterdam, Netherlands.",
        "Celano, Giuseppe. 2019. The Dependency Treebanks for Ancient Greek and Latin. In Digital Classical Philology, 279-298.",
        "Chantraine, Pierre. 1942. Le Rôle et La Valeur de Ἐν- Dans La Composition. Revue de Philologie, de Littérature et d'histoire 68:115–25.",
        "Chantraine, Pierre. 1953. Grammaire Homérique. Tome 2: Syntaxe. Paris: Klincksieck.",
        "Citraro, Cinzia. 2014. Compound Verbs' Meaning in Homer: The Case for Ἀνά/Ἐπί/(Ὑπέρ). In Annamaria Bartolotta (ed.), The Greek Verb. Morphology, Syntax and Semantics. Proceedings of the 8th International Meeting on Greek Linguistics, 53–70. Louvain: Peeters.",
        "Croft, William, Jóhana Barðal, Willem Hollmann, Violeta Sotirova, and Chiaki Taoka. 2010. Revising Talmy's Typological Classification of Complex Events. In Hans C. Boas (ed.), Contrastive Construction Grammar, 201–36. Amsterdam: John Benjamins.",
        "Cuzzolin, Pierluigi. 1995. A Proposito Di Sub Vos Placo e Della Grammaticalizzazione Delle Preposizioni. Archivio Glottologico Italiano 80(1–2). 12–143.",
        "Cuzzolin, Pierluigi, Ignazio Putzu, and Paolo Ramat. 2006. The Indo-European Adverb in Diachronic and Typological Perspective. Indogermanische Forschungen 111:1–38.",
        "Cuzzolin, Pierluigi, and Gerd V. M. Haverling. 2009. Syntax, Sociolinguistics, and Literary Genres. In Philip Baldi and Pierluigi Cuzzolin (eds.), New Perspectives on Historical Latin Syntax, 19–63. Berlin / New York: Mouton de Gruyter.",
        "Danesi, Serena. 2013. Particle-Verb Constructions in Vedic: The Case of Ápa. Studi e Saggi Liguistici 51(2). 57–100.",
        "De Pasquale, Noemi. 2017. Motion event encoding in Ancient Greek. A typological corpus-based study of Path and Manner expression. Università degli Studi di Salerno: PhD Thesis.",
        "Del Mar Puebla Manzanos, María. 2001. Valores de Los Proverbios Latinos En Los Compuestos de 'Pugno, -Are.' Faventia 23(1). 71–85.",
        "Dunkel, George E. 1976. Repetition and Deletion of Preverbs and Verbs in Early Indic and Greek. University of Pennsylvania (Philadelphia, PA), Ph.D. thesis.",
        "Echarte Cossío, Maria Jose. 1998. Preposiciones y Casos En Latín: Propuesta de Un Sistema Conjuncto. In Benjamin García-Hernández (ed.), Estudios de Lingüística Latina. Actas Del IX Coloquio Internacional de Lingüística Latina. Universidad Autónoma de Madrid, 1997, 309–23. Madrid: Ediciones Clásicas.",
        "Farina, Andrea. 2021. Aquamotion Verbs in Ancient Greek. A Study on Pléō and Its Compounds. University of Pavia: MA Thesis.",
        "Farina, Andrea. 2024. Guidelines for a linguistic annotation of preverbed verbs of motion. King's College London. Figshare. https://doi.org/10.18742/25055573.",
        "Farina, Andrea, Barbara McGillivray, and Stephen Colvin. 2023. Motion and Preverbation in Latin. The Relation between the Preverbs Ab- and Ad- and the Verbal Bases Eo and Venio. International Colloquium on Latin Linguistics, June 19-23, 2023, Prague (Czechia).",
        "Fellbaum, Christiane. 1998. WordNet: An Electronic Lexical Database. Cambridge (MA): Mit Press.",
        "Fortson, Benjamin W. 2004. Indo-European Language and Culture: An Introduction. Oxford: Blackwell.",
        "Fruyt, Michèle. 2011. Grammaticalization in Latin. In Philip Baldi and Pierluigi Cuzzolin (eds.), New Perspectives on Historical Latin Syntax. 4. Complex Sentences, Grammaticalization, Typology, 661–864. Berlin: De Gruyter Mouton.",
        "García Sánchez, Jairo Javier. 2018. El Preverbio Ex-: Morfología Léxica, Continuidad y Variación Del Latín al Español. Estudios de Lingüística Del Español 39. 31–53.",
        "Goetze, Albrecht. 1963. Postposition and Preverb in Hittite. Journal of Cuneiform Studies 17(3):98–101.",
        "Grecucci, Marianna. 2015. Funzione Dei Preverbi Nel Latino Di Plauto. University of Padova: MA Thesis.",
        "Harris, Alice. 2003. Preverbs and Their Origin in Georgian and Udi. In Geert Booij and Jaap van Marle (eds.), Yearbook of Morphology, 61–78. Dordrecht: Kluwer.",
        "Haverling, Gerd V. M. 2000. On Sco-Verbs, Prefixes and Semantic Functions. A Study in the Development of Prefixed and Unprefixed Verbs from Early to Late Latin. Studia Graeca et Latina Gothoburgensia 64. 356–357.",
        "Hewson, John, and Vit Bubenik. 2006. From Case to Adposition. The Development of Configurational Syntax in Indo-European Languages. Amsterdam: Benjamins.",
        "Hoenigswald, Henry. 1998. Greek. In Anna Giacalone Ramat and Paolo Ramat (eds.), The Indo-European Languages, 228–60. London: Routledge.",
        "Hopper, Paul J., and Sandra Thompson. 1980. Transitivity in Grammar and Discourse. Language 56:251–99.",
        "Iacobini, Claudio, Luisa Corona, Noemi De Pasquale, and Alfonsina Buoniconto. 2017. How Should a 'Classical' Satellite-Framed Language Behave?: Path Encoding Asymmetries in Ancient Greek and Latin. In Silvia Luraghi, Tatiana Nikitina and Chiara Zanchi (eds.), Space in Diachrony, 95–118. Amsterdam/Philadelphia: John Benjamins.",
        "Iacobini, Claudio, and Francesca Masini. 2006. The Emergence of Verb-Particle Constructions in Italian: Locative and Actional Meanings. Morphology 16:155–88.",
        "Ikegami, Yoshiniko. 1987. 'Source' vs. 'Goal': A Case of Linguistic Dissymmetry. In René Driven and Günter Radden (eds.), Concepts of Case, 122–46. Tübingen: Narr.",
        "Imbert, Caroline. 2008. Systems Dynamics and Functional Motivations in Path Coding. A Typological Description of Homeric Greek and Old English. CNRS / University of Lyon 2: PhD Thesis.",
        "Jansen, Hanne. 2004. La 'Particella Spaziale' e Il Suo Combinarsi Con Verbi Di Movimento Nell'italiano Contemporaneo. In Paolo D'Achille (ed.), Generi, Architetture e Forme Testuali, Atti Del VII Convegno SILFI, Roma, 1-5 Ottobre 2002. Firenze: Franco Cesati Editore.",
        "Jenset, Gard B., and Barbara McGillivray. 2017. Quantitative Historical Linguistics. A Corpus Framework. Oxford: Oxford University Press.",
        "Jezek, Elisabetta. 2002. Lo Sfondamento Di Un Confine Tipologico. Il Caso Dei Verbi Complessi Nell'italiano. In Patrizia Cordin, Rita Franceschini and Gudrun Held (eds.), Parallela 8. Lingue Di Confine, Confini Di Fenomeni Linguistici, Atti Dell'ottavo Incontro Italo-Austriaco Dei Linguisti, Trento, 8-10 Ottobre 1998, 289–308. Roma: Bulzoni.",
        "Klie, Jan-Christoph. 2018. INCEpTION: Interactive Machine-Assisted Annotation. In Proceedings of the First Biennial Conference on Design of Experimental Search & Information Retrieval Systems (DESIRES), Bertinoro, Italy.",
        "Klie, Jan-Christoph, Michael Bugert, Beto Boullosa, Richard Eckart de Castilho, and Iryna Gurevych. 2018. The INCEpTION Platform: Machine-Assisted and Knowledge-Oriented Interactive Annotation. Proceedings of System Demonstrations of the 27th International Conference on Computational Linguistics (COLING 2018), Santa Fe, New Mexico, USA, 5–9.",
        "Klie, Jan-Christoph, Richard Eckart de Castilho, and Iryna Gurevych. 2020. From Zero to Hero: Human-In-The-Loop Entity Linking in Low Resource Domains. The 58th Annual Meeting of the Association for Computational Linguistics (ACL 2020), Virtual Conference.",
        "Krisch, Thomas. 1984. Konstruktionsmuster Und Bedeutungswandel Indogermanischer Verben. Anwendungsversuche von Valenztheorie Und Kasusgrammatik Auf Diachronie Und Rekonstruktion. Frankfurt am Main: Lang.",
        "Lehmann, Christian. 1974. Proto-Indoeuropean Syntax. Austin/London: University of Texas Press.",
        "Lehmann, Christian. 1983. Latin Preverbs and Cases. In Harm Pinkster (ed.), New Studies in Latin Linguistics: Selected Papers from the International Colloquium on Latin Linguistics, 1981. Amsterdam/Philadelphia: John Benjamins.",
        "López Moreda, Santiago. 1998. Interferencias Semántico-Sintácticas Entre Preverbios y Preposiciones. In Benjamin García-Hernández (ed.), Estudios de Lingüística Latina. Actas Del IX Coloquio Internacional de Lingüística Latina. Universidad Autónoma de Madrid, 1997, 953–69. Madrid: Ediciones Clásicas.",
        "Luraghi, Silvia. 2001. The Development of Local Particles and Adverbs in Anatolian as a Grammaticalization Process. Diachronica 28(1):31–58.",
        "Luraghi, Silvia. 2003. On the Meaning of Prepositions and Cases. Amsterdam/Philadelphia: John Benjamins.",
        "Luraghi, Silvia. 2009. The Internal Structure of Adpositional Phrases and the Notion of Government. In Johannes Helmbrecht, Yoko Nishina, Zong-Min Shin, Stavros Skopeteas, and Elisabeth Verhoeven (eds), Form and Function in Language Research: Papers in Honor of Christian Lehmann, 231–46. Berlin: De Gruyter.",
        "Lyutikova, Ekaterina A., and Andrei Sideltsev. 2021. Deriving Preverbal Position in a Verb-Final Language: The Case of Hittite. Glossa: A Journal of General Linguistics 6(1)(49): 1–30.",
        "MacDonell, Arthur Anthony. 1953. A Vedic Grammar for Students. Bombay/Calcutta/Madras: Oxford University.",
        "Makharoblidze, Tamar. 2018. On Georgian Preverbs. Open Linguistics 4:163–83.",
        "Masini, Francesca. 2005. Multi-Word Expressions between Syntax and the Lexicon: The Case of Italian Verb-Particle Constructions. SKY Journal of Linguistics, 145–73.",
        "Masini, Francesca. 2006. Diacronia Dei Verbi Sintagmatici in Italiano. Archivio Glottologico Italiano 91(1):67–105.",
        "McCone, Kim. 1997. The Early Irish Verb. Maynooth: Department of Old Irish, National University of Ireland, Maynooth.",
        "McCone, Kim. 2006. The Origins and Development of the Insular Celtic Verbal Complex. Maynooth: Department of Old Irish, National University of Ireland, Maynooth.",
        "McGillivray, Barbara. 2009. A Computational Approach to Latin Verbs: New Resources and Methods. University of Pisa: PhD Thesis.",
        "McGillivray, Barbara. 2014. Methods in Latin Computational Linguistics. Leiden: Brill.",
        "Meillet, Antoine. 1903. Introduction à l'étude Comparative Des Langues Indoeuropéennes. Paris: Hachette.",
        "Meillet, Antoine, and Joseph Vendryes. 1924. Grammaire Comparée Des Langues Classiques. Paris: Champion.",
        "Meini, Linda, and Barbara McGillivray. 2010. Between Semantics and Syntax: Spatial Verbs and Prepositions in Latin. Proceedings of the Space in Language Conference, Pisa (Italy), 8-10 October 2009.",
        "Mellado Rodríguez, Joaquín. 2001. Determinación Sintáctica y Determinación Semántica: Diferencias y Repercusión En Algunas Proposiciones Latinas. In De Lingua Latina Novae Quaestiones. Actes Du X Colloque International de Linguistique Latine. Paris-Sèvres, 1999, 459–72. Peeters.",
        "Muro, Alessio. 2017. Cross-Linguistic Considerations on Preverb Stacking (with Special Reference to Bulgarian). In Rosanna Benacchio, Alessio Muro, and Svetlana Slavkova (eds.), Biblioteca Di Studi Slavistici, 39:137–52. Florence: Firenze University Press.",
        "Nuti, Andrea. 2016. A Matter of Perspective: Aspect, Deixis, and Textual Exploitation in the Prototype Semantics of Eo and Venio. In William Michael Short (ed.), Studies in Language Companion Series, 174:15–56. Amsterdam: John Benjamins Publishing Company.",
        "Papanastassiou, Georgios. 2011. The Preverb Ἀπό in Ancient Greek. Proceedings of the 9th International Conference on Greek Linguistics, 29th-31st October 2009, 97–111.",
        "Petit, Daniel. 2007. L'anastrophe Verbale En Grec Archaïque. Entre Syntaxe et Poétique. In Alain Blanc et Emmanuel Dupraz (eds.), Procédés Synchroniques de La Langue Poétique En Grec et En Latin (Langues et Cultures Anciennes 9), 9 Bruxelles:191–214.",
        "Pompei, Anna. 2010. De l'expression de l'espace à l'expression Du Temps (et de l'aspect) En Latin: Le Cas Des Préverbs. De Lingua Latina 3(10).",
        "Regier, Terry, and Mingyu Zheng. 2007. Attention to Endpoints: A Cross-Linguistic Constraint on Spatial Meaning. Cognitive Science 31:705–19.",
        "Reinöhl, Uta. 2016. Grammaticalization and the Rise of Configurationality in Indo-Aryan. Oxford: Oxford University Press.",
        "Revuelta Puigdollers, Antonio Ramón. 1994. Los Preverbios Ἀνα- y Κατα- y La Expresión Del Regreso En Griego Clásico. Actas Del VIII Congreso Español de Estudios Clásicos 1:229–36.",
        "Revuelta Puigdollers, Antonio Ramón. 2007. Morfolgía y Sintaxis: Los Compuestos Verbales de Συν- En Griego Antiguo. In M. Esperanza Torrego, José M Baños, Concepción Cabrillana, and Julian Méndez Dosuna (eds.), Praedicativa II: Esquemas de Complementación Verbal En Griego Antiguo y Latín, 180–209. Zaragoza: Prensas de la Universidad de Zaragoza.",
        "Revuelta Puigdollers, Antonio Ramón. 2014. Some Verbs Prefixed by Περι- in Ancient Greek. In Annamaria Bartolotta (ed.), The Greek Verb. Morphology, Syntax and Semantics. Proceedings of the 8th International Meeting on Greek Linguistics, 291–309. Louvain: Peeters.",
        "Revuelta Puigdollers, Antonio Ramón. 2016. A Cognitive-Functional Study of the Prefix Circum-: Some Non-Prototypical Cases. In Paolo Poccetti (ed.), Latinitatis Rationes: Descriptive and Historical Accounts for the Latin Language, 127–46. Berlin/Boston: De Gruyter.",
        "Revuelta Puigdollers, Antonio Ramón. 2017. Dis- Compounds and Reciprocal Inter Se in Latin. Pallas 103:115–27.",
        "Revuelta Puigdollers, Antonio Ramón. 2019. The Preverb Ὑπερ- in Ancient Greek. Studies in Greek Linguistics 39:835–50.",
        "Revuelta Puigdollers, Antonio Ramón. 2020. The Preverb Μετα-: A Cognitive and Constructionist Analysis. Proceedings of the Ninth International Colloquium on Ancient Greek Linguistics (ICAGL 9), 30 August – 1 September 2018, Helsinki, 353–82.",
        "Rissanen, Matti. 1989. Three Problems Connected with the Use of Diachronic Corpora. ICAME Journal 13. 16–19.",
        "Romagno, Domenica. 2004. Ancora su preverbazione e sistemi verbali. Il caso dei preverbi greci. In Archivio Glottologico Italiano, 89, 2, 165-180.",
        "Rossiter, Trudy. 2004. Verbal Composition in Old Irish with Special Reference to Multi-Preverb Compounds. National University of Ireland (Maynooth, Ireland), Ph.D. thesis.",
        "Rousseau, André. 1995. Les Préverbes Dans Les Langues d'Europe. Introduction à l'étude de La Préverbation. Lille: Presses Universitaires du Septentrion.",
        "Sánchez Salor, Eustaquio. 1977. Observaciones Sobre Las Preposiciones Latinas de, Ex, Ab y Ob, in, AD En Composición. Archivum: Revista de La Facultad de Filosofía y Letras 27–28. 261–292.",
        "Saussure, Ferdinand de. 1922. Recueil Des Publications Scientifiques de F. de Saussure. Charles Bally and Léopold Gautier (eds.). Lausanne and Geneva: Payot.",
        "Sideltsev, Andrei. 2015. Hittite Clause Architecture. Revue d'Assyriologie et d'archéologie Orientale 109:79–112.",
        "Simone, Raffaele. 1997. Esistono Verbi Sintagmatici in Italiano? In Tullio De Mauro and Vincenzo Lo Cascio (eds.), Lessico e Grammatica. Teorie Linguistiche e Applicazioni Lessicografiche. Atti Del XXXVI Congresso Internazionale SLI, Madrid, 21-25 Febbraio 1995, 155–70. Roma: Bulzoni.",
        "Slobin, Dan I. 2004. The Many Ways to Search for a Frog. Linguistic Typology and the Expression of Motion Events. In Sven Strömqvist and Ludo Verhoeven (eds.), Relating Events in Narrative: Typological and Contextual Perspectives, 219–57. Mahwah NJ: Lawrence Erlbaum.",
        "Slobin, Dan I. 2006. What Makes Manner of Motion Salient? Explorations in Linguistic Typology, Discourse and Cognition. In Maya Hickmann and Stéphane Robert (eds.), Space in Language: Linguistic Systems and Cognitive Categories, 60–81. Amsterdam: John Benjamins.",
        "Stolova, Natalya I. 2008. From Satellite-Framed Latin to Verb-Framed Romance: Late Latin as an Intermediate Stage. In Roger Wright (ed.), Latin Vulgaire–Latin Tardif VIII: Actes Du VIIIe Colloque International Sur Le Latin Vulgaire et Tardif, Oxford, 6-9 Septembre 2006, 253–62. Hildesheim/New York:Olms-Weidmann.",
        "Strik Lievers, Francesca, and Elisabetta Jezek. 2009. Verbi Sintagmatici in Italiano Antico e Moderno: Un'analisi Corpus-Based. In Maria Iliescu, Heidi Siller-Runggaldier and Paul Danler (eds.), Tome I-VII: Innsbruck, 3 – 8 Septembre 2007, 7445–54. Berlin/New York: De Gruyter Mouton.",
        "Svorou, Soteria. 1994. The Grammar of Space. Amsterdam: John Benjamins.",
        "Talmy, Leonard. 1975. Figure and Ground in Complex Sentences. In Proceedings of the Annual Meeting of the Berkeley Linguistics Society, 1:419–30.",
        "Talmy, Leonard. 1983. How Herbert L. Pick and Linda P. Acredolo (eds.), Language Structures Space. In Spatial Orientation. Theory, Research, and Application, 225–82. New York: Plenum Press.",
        "Talmy, Leonard. 1985. Lexicalization Patterns: Semantic Structure in Lexical Forms. In Timothy Shopen (ed.), Language Typology and Syntactic Description, III: Grammatical Categories and the Lexicon, 57–149. Cambridge: CUP.",
        "Talmy, Leonard. 2000. Toward a Cognitive Semantics. Vol. 1: Concept Structuring Systems. Cambridge (MA): Mit Press.",
        "Talmy, Leonard. 2009. Main Verb Properties and Equipollent Framing. In Jiansheng Guo et al. (eds.), Crosslinguistic Approaches to the Psychology of Language. Research in the Tradition of Dan Isaac Slobin, 389–402. New York: Taylor & Francis.",
        "Ungerer, Friedrich, and Hans-Jörg Schimdt. 1996. An Introduction to Cognitive Linguistics. London: Longman.",
        "Urso, Anna Maria. 1999. I Preverbi Nel Latino Tardo: Il Caso Di Celio Aureliano. In Roger Wright (ed.), Latin Vulgaire-Latin Tardif VIII: Actes Du VIII Colloque International Sur Le Latin Vulgaire et Tardif, Oxford, 6-9 Septembre, 2006, 292–300.",
        "Van Laer, Sophie. 2010. La Préverbation En Latin. Étude Des Préverbes Ad-, in-, Ob- et per- Dans La Poésie Républicaine et Augustéenne. Brussels: Éditions Latomus.",
        "Van Laer, Sophie. 2019. Les Verbes de Déplacement En Latin : Préverbation et Arguments. In Nigel Holmes, Marijke Ottink, Josine Schrickx, and Maria Selig (eds.), Words and Sounds, 110–132. Berlin: De Gruyter.",
        "Vincent, Nigel. 1999. The Evolution of C-Structure: Prepositions and PPs from Indo-European to Romance. Linguistics 37:1111–54.",
        "Wackernagel, Jakob. 1892. Über Ein Gesetz Der Indogermanischen Wortstellung. Indogermanische Forschungen 1:333–436.",
        "Wackernagel, Jakob. 1924. Vorlesungen Über Syntax. Zweite Reihe. Basel: Emil Birkhäuser.",
        "Wälchli, Bernhard. 2001. A Typology of Displacement (with Special Reference to Latvian). STUF - Language Typology and Universals 54(3):298–323.",
        "Watkins, Calvert. 1963. Preliminaries to a Historical and Comparative Analysis of the Syntax of the Old Irish Verb. Celtica 6:1–49.",
        "Watkins, Calvert. 1964. Preliminaries to the Reconstruction of Indo-European Sentence Structure. In Horace Lunt (ed.), Proceedings of the 9th International Congress of Linguists, 1035–42. The Hague: Mouton.",
        "Whitney, William Dwight. 1989. Sanskrit Grammar. Delhi: Motilal Banarsidass.",
        "Zanchi, Chiara. 2016. La Semantica Della Preposizione Ὑπέρ Nel Greco Omerico. Emerita 84(1). 1–30.",
        "Zanchi, Chiara. 2017. New Evidence for the Source–Goal Asymmetry: Ancient Greek Preverbs. In edited by Silvia Luraghi, Tatiana Nikitina, and Chiara Zanchi, Studies in Language Companion Series, 188:147–78. Amsterdam: John Benjamins Publishing Company.",
        "Zanchi, Chiara. 2019. Multiple Preverbs in Ancient Indo-European Languages. A Comparative Study on Vedic, Homeric Greek, Old Church Slavic, and Old Irish. Tübingen: Narr Francke Attempto Verlag."
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Header */}
                <div className="rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">References</h1>
                    <p className="text-lg sm:text-xl text-blue-100 font-light opacity-90">Bibliography on Preverbs</p>
                </div>

                {/* Disclaimer */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        <strong className="font-semibold text-slate-900 dark:text-slate-100">
                            The following list is not intended to be exhaustive and may not include all sources consulted during the development of this project; it is provided for general reference purposes only.
                        </strong>
                    </p>
                </div>

                {/* References List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
                    <div className="space-y-4">
                        {references.map((reference, index) => (
                            <div
                                key={index}
                                className="pb-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0 last:pb-0"
                            >
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                    {reference}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center py-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm border border-blue-200 dark:border-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        Complete bibliography with additional sources available upon request
                    </div>
                </div>
            </div>
        </div>
    );
};

export default References;