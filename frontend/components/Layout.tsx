import React from 'react';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground transition-theme flex flex-col">
            <header className="sticky top-0 z-30 border-b border-border py-3 bg-card/80 backdrop-blur-sm shadow-sm">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-lg md:text-xl font-semibold text-card-foreground">
                        PrevNet
                    </h1>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 flex-grow transition-colors pt-6 pb-12">
                {children}
            </main>

            <footer className="mt-auto py-4 border-t border-border bg-muted">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} PrevNet</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;