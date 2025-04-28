import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Array<{title: string, path: string}>>([]);
    const aboutRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Define available pages for suggestions
    const availablePages = [
        { title: 'Home', path: '/', keywords: ['home', 'main', 'start'] },
        { title: 'Latin Search', path: '/search/latin', keywords: ['latin', 'search', 'preverb', 'preverbs'] },
        { title: 'Greek Search', path: '/search/greek', keywords: ['greek', 'search', 'ancient greek'] },
        { title: 'Output', path: '/output', keywords: ['output', 'results', 'data'] },
        { title: 'About - Project', path: '/about/project', keywords: ['about', 'project', 'info'] },
        { title: 'About - Corpus', path: '/about/corpus', keywords: ['about', 'corpus', 'text'] },
        { title: 'About - Preverbs', path: '/about/preverbs', keywords: ['about', 'preverbs', 'prefixes'] },
        { title: 'About - Verbs', path: '/about/verbs', keywords: ['about', 'verbs', 'words'] },
        { title: 'About - Annotation', path: '/about/annotation', keywords: ['about', 'annotation', 'tagging'] },
        { title: 'About - Acknowledgments', path: '/about/acknowledgments', keywords: ['about', 'acknowledgments', 'thanks', 'credits'] },
    ];

    const toggleAboutDropdown = () => {
        setAboutDropdownOpen(!aboutDropdownOpen);
        setSearchDropdownOpen(false);
    };

    const toggleSearchDropdown = () => {
        setSearchDropdownOpen(!searchDropdownOpen);
        setAboutDropdownOpen(false);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
        if (!searchOpen) {
            setSearchQuery('');
            setSuggestions([]);
        }
    };

    // Update suggestions as user types
    const updateSuggestions = (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        const queryLower = query.toLowerCase();
        const filteredSuggestions = availablePages.filter(page => {
            // Match by title or keywords
            return page.title.toLowerCase().includes(queryLower) ||
                   page.keywords.some(keyword => keyword.includes(queryLower));
        });

        setSuggestions(filteredSuggestions);
    };

    // Navigate to a suggestion
    const navigateToSuggestion = (path: string) => {
        router.push(path);
        setSearchOpen(false);
        setSearchQuery('');
        setSuggestions([]);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
                setAboutDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchDropdownOpen(false);
            }
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-8">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transform transition-transform hover:scale-105">
                        <Link href="/" className="text-xl font-bold">
                            <span className="text-blue-500">Prev</span><span className="text-foreground">Net</span>
                        </Link>
                    </div>
                </div>
                <nav className="flex items-center gap-10 text-base sm:text-lg">
                    <Link
                        href="/"
                        className={`relative font-medium transition-colors hover:text-blue-500 ${
                            router.pathname === '/'
                                ? 'text-blue-500 after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:rounded-full'
                                : 'text-card-foreground'
                        }`}
                    >
                        Home
                    </Link>
                    <div className="relative" ref={aboutRef}>
                        <span
                            onClick={toggleAboutDropdown}
                            className={`relative cursor-pointer font-medium transition-colors hover:text-blue-500 ${
                                router.pathname.startsWith('/about')
                                    ? 'text-blue-500 after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:rounded-full'
                                    : 'text-card-foreground'
                            }`}
                        >
                            About
                        </span>
                        {aboutDropdownOpen && (
                            <div className="absolute top-8 left-0 bg-card border border-border rounded-lg shadow-lg min-w-[200px] z-10 overflow-hidden animate-fadeIn">
                                <div className="py-1">
                                    <Link href="/about/corpus"
                                        className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-colors hover:text-blue-500">
                                        Corpus
                                    </Link>
                                    <Link href="/about/preverbs"
                                        className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-colors hover:text-blue-500">
                                        Preverbs
                                    </Link>
                                    <Link href="/about/verbs"
                                        className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-colors hover:text-blue-500">
                                        Verbs
                                    </Link>
                                    <Link href="/about/annotation"
                                        className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-colors hover:text-blue-500">
                                        Annotation
                                    </Link>
                                    <Link href="/about/project"
                                        className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-colors hover:text-blue-500">
                                        Project
                                    </Link>
                                    <Link href="/about/acknowledgments"
                                        className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-colors hover:text-blue-500">
                                        Acknowledgments
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative" ref={searchRef}>
                        <span
                            onClick={toggleSearchDropdown}
                            className={`relative cursor-pointer font-medium transition-colors hover:text-blue-500 ${
                                router.pathname.startsWith('/search')
                                    ? 'text-blue-500 after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:rounded-full'
                                    : 'text-card-foreground'
                            }`}
                        >
                            Search
                        </span>
                        {searchDropdownOpen && (
                            <div className="absolute top-8 left-0 bg-card border border-border rounded-lg shadow-lg min-w-[200px] z-10 overflow-hidden animate-fadeIn">
                                <div className="py-1">
                                    <Link href="/search/latin"
                                        className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-colors hover:text-blue-500">
                                        Latin
                                    </Link>
                                    <Link href="/search/greek"
                                        className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-colors hover:text-blue-500">
                                        Ancient Greek
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link
                        href="/output"
                        className={`relative font-medium transition-colors hover:text-blue-500 ${
                            router.pathname === '/output'
                                ? 'text-blue-500 after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:rounded-full'
                                : 'text-card-foreground'
                        }`}
                    >
                        Output
                    </Link>
                </nav>
            </div>
            <div className="flex items-center gap-5">
                <ThemeToggle />
                <div
                    onClick={toggleSearch}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleSearch();
                        }
                    }}
                    className="rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/40 p-2 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Search pages"
                    role="button"
                    tabIndex={0}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>

            {/* Search overlay */}
            {searchOpen && (
                <div
                    ref={searchBarRef}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-start justify-center z-50 pt-20 px-4 animate-fadeIn"
                >
                    <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-lg p-4 animate-slideDown">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Search Pages</h3>
                            <button
                                onClick={toggleSearch}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search for pages (latin, greek, about, etc.)"
                                value={searchQuery}
                                onChange={(e) => updateSuggestions(e.target.value)}
                                autoFocus
                            />
                        </div>

                        {suggestions.length > 0 && (
                            <div className="mt-2 max-h-60 overflow-y-auto border border-border rounded-lg">
                                <ul className="py-1">
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index}
                                            className="px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                                            onClick={() => navigateToSuggestion(suggestion.path)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                                </svg>
                                                <span className="text-card-foreground font-medium">{suggestion.title}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                                Try searching for: Latin, Greek, About, Project, Corpus, etc.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navigation;