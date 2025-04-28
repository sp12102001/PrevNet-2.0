import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
            <header className="sticky top-0 z-30 border-b border-border py-3 bg-card/90 backdrop-blur-md shadow-sm">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                    <Navigation />
                </div>
            </header>

            <main className="container max-w-7xl mx-auto px-4 sm:px-6 flex-grow transition-colors pt-8 pb-16">
                {children}
            </main>

            <footer className="mt-auto py-6 border-t border-border bg-muted">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                © {new Date().getFullYear()} PrevNet - A new network of preverbs
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">Privacy</a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">Terms</a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;