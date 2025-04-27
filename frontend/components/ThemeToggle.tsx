import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    const [mounted, setMounted] = useState(false);

    // Initialize theme
    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
        setTheme(storedTheme);
        applyTheme(storedTheme);
    }, []);

    // Apply theme changes
    const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
        const root = window.document.documentElement;

        // Remove previous classes
        root.classList.remove('light', 'dark');

        // Handle system preference
        if (newTheme === 'system') {
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemPreference);
        } else {
            root.classList.add(newTheme);
        }

        localStorage.setItem('theme', newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    // Don't render during SSR to prevent hydration mismatch
    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-accent transition-colors"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <span className="sr-only">
                {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            </span>

            {/* Sun icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`h-5 w-5 transition-all ${
                    theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                } absolute`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>

            {/* Moon icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`h-5 w-5 transition-all ${
                    theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                } absolute`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        </button>
    );
};

export default ThemeToggle;