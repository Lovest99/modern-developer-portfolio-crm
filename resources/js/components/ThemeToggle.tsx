import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    const [mounted, setMounted] = useState(false);

    // Update theme when component mounts and when theme changes
    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
        if (storedTheme) {
            setTheme(storedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('system');
        }
    }, []);

    // Update the theme
    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            localStorage.setItem('theme', 'system');
        } else {
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);

    // Listen for system theme changes
    useEffect(() => {
        if (!mounted) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                const root = window.document.documentElement;
                root.classList.remove('light', 'dark');
                root.classList.add(mediaQuery.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <div className="relative inline-block">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                {/* Light mode */}
                <button
                    onClick={() => setTheme('light')}
                    className={`p-2 rounded-full transition-all ${
                        theme === 'light'
                            ? 'bg-white text-yellow-500 shadow-sm'
                            : 'text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400'
                    }`}
                    aria-label="Light mode"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* System mode */}
                <button
                    onClick={() => setTheme('system')}
                    className={`p-2 rounded-full transition-all ${
                        theme === 'system'
                            ? 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    aria-label="System theme"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Dark mode */}
                <button
                    onClick={() => setTheme('dark')}
                    className={`p-2 rounded-full transition-all ${
                        theme === 'dark'
                            ? 'bg-gray-700 text-blue-400 shadow-sm'
                            : 'text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400'
                    }`}
                    aria-label="Dark mode"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
