import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const aboutRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const toggleAboutDropdown = () => {
        setAboutDropdownOpen(!aboutDropdownOpen);
        setSearchDropdownOpen(false);
    };

    const toggleSearchDropdown = () => {
        setSearchDropdownOpen(!searchDropdownOpen);
        setAboutDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
                setAboutDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center transform transition-transform hover:scale-105">
                        <Link href="/" className="text-xl font-bold">
                            <span className="text-blue-500">Prev</span><span className="text-foreground">Net</span>
                        </Link>
                    </div>
                </div>
                <nav className="flex items-center gap-8 text-base sm:text-lg">
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
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/40 p-2 flex items-center justify-center transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Navigation;