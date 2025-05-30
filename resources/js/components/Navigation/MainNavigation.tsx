import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import ThemeToggle from '../ThemeToggle';
import { useWindowScroll } from '@/hooks/useWindowScroll';

interface MainNavigationProps {
    currentPage: string;
    auth: any;
}

export default function MainNavigation({ currentPage, auth }: MainNavigationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useWindowScroll();
    const isScrolled = scrollY > 10;

    // Define the navigation items
    const navigationItems = [
        { name: 'Home', href: '/', active: currentPage === 'home' },
        { name: 'About', href: '/about', active: currentPage === 'about' },
        { name: 'Portfolio', href: '/portfolio', active: currentPage === 'portfolio' },
        { name: 'Resume', href: '/resume', active: currentPage === 'resume' },
        { name: 'Contact', href: '/contact', active: currentPage === 'contact' },
    ];

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMobileMenuOpen && !target.closest('#mobile-menu') && !target.closest('#mobile-menu-button')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/20 dark:border-gray-800/20'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo with enhanced styling */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center group">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 transition-all duration-300 group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-purple-500">
                                Bright Cheteni
                            </span>
                        </Link>
                    </div>

                    {/* Desktop navigation with modern styling */}
                    <div className="hidden md:flex items-center justify-center">
                        <div className="flex space-x-4">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                                        item.active
                                            ? 'text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right side items */}
                    <div className="flex items-center space-x-4">
                        {/* Theme toggle with enhanced styling */}
                        <div className="flex items-center">
                            <ThemeToggle />
                        </div>

                        {/* Auth buttons with modern styling */}
                        <div className="hidden md:flex items-center">
                            {!auth.user ? (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 text-white shadow-sm hover:shadow-md hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 dark:hover:from-cyan-300 dark:hover:via-blue-300 dark:hover:to-purple-300 transition-all duration-300"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <Link
                                        href={route('dashboard')}
                                        className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                id="mobile-menu-button"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 focus:outline-none transition-all duration-300"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <div className="relative w-6 h-6">
                                    <span
                                        className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                                            isMobileMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-6px]'
                                        }`}
                                    ></span>
                                    <span
                                        className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                                            isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    ></span>
                                    <span
                                        className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                                            isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[6px]'
                                        }`}
                                    ></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu with modern styling and animations */}
            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-x-0 top-20 z-50 transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-10 opacity-0 pointer-events-none'
                }`}
            >
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-t border-gray-200/50 dark:border-gray-800/50 rounded-b-xl mx-4">
                    <div className="px-4 pt-3 pb-4 space-y-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl ${
                                    item.active
                                        ? 'text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 shadow-sm'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/50'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-4 pb-5 border-t border-gray-200/50 dark:border-gray-800/50">
                        <div className="px-4 space-y-3">
                            {!auth.user ? (
                                <div className="flex flex-col space-y-2">
                                    <Link
                                        href={route('login')}
                                        className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="block px-4 py-3 rounded-full text-base font-medium bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 text-white shadow-sm hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 dark:hover:from-cyan-300 dark:hover:via-blue-300 dark:hover:to-purple-300 transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-2">
                                    <Link
                                        href={route('dashboard')}
                                        className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('profile.edit')}
                                        className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Log out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
