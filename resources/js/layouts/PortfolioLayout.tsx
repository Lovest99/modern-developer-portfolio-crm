import React from 'react';
import { Head } from '@inertiajs/react';
import MainNavigation from '@/components/Navigation/MainNavigation';
import BrowserCompatibilityMeta from '@/components/BrowserCompatibilityMeta';

interface PortfolioLayoutProps {
    children: React.ReactNode;
    title?: string;
    currentPage: string;
    auth: any;
}

export default function PortfolioLayout({ children, title, currentPage, auth }: PortfolioLayoutProps) {
    return (
        <>
            <Head title={title || 'Bright Cheteni - Portfolio'} />
            <BrowserCompatibilityMeta />

            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <MainNavigation currentPage={currentPage} auth={auth} />

                {/* Main Content */}
                <main className="pt-24 pb-16">
                    {children}
                </main>

                {/* Ultra-Enhanced Footer with Maximum Sauce */}
                <footer className="relative bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <div className="absolute -left-16 -top-16 w-32 h-32 rounded-full bg-blue-500/10 dark:bg-blue-500/5"></div>
                    <div className="absolute right-16 bottom-32 w-48 h-48 rounded-full bg-purple-500/10 dark:bg-purple-500/5"></div>

                    {/* Wave SVG Divider */}
                    <div className="absolute top-0 left-0 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white dark:text-gray-800 rotate-180">
                            <path fill="currentColor" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        {/* Newsletter Subscription */}
                        <div className="mb-16 max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stay Updated</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Subscribe to my newsletter for the latest projects, articles, and updates.</p>
                            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* Main Footer Content */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-gray-200 dark:border-gray-700">
                            {/* Brand Section */}
                            <div className="flex flex-col md:col-span-2">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-3">
                                        BC
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bright Cheteni</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                                    Crafting digital experiences with passion and precision. Specializing in modern web development,
                                    UI/UX design, and creating solutions that make a difference. Let's build something amazing together.
                                </p>
                                <div className="flex flex-wrap gap-3 mt-2">
                                    <a href="https://github.com/Lovest99/" target="_blank" rel="noopener noreferrer"
                                       className="group">
                                        <span className="sr-only">GitHub</span>
                                        <div className="p-2 rounded-full bg-blue-500 text-white
                                                      group-hover:bg-blue-600 transform transition-all duration-300
                                                      group-hover:scale-110 group-hover:shadow-md">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="https://www.linkedin.com/in/bright-cheteni-6a2597177/" target="_blank" rel="noopener noreferrer"
                                       className="group">
                                        <span className="sr-only">LinkedIn</span>
                                        <div className="p-2 rounded-full bg-blue-600 text-white
                                                      group-hover:bg-blue-700 transform transition-all duration-300
                                                      group-hover:scale-110 group-hover:shadow-md">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="https://x.com/fav_tech_guy/" target="_blank" rel="noopener noreferrer"
                                       className="group">
                                        <span className="sr-only">Twitter</span>
                                        <div className="p-2 rounded-full bg-blue-400 text-white
                                                      group-hover:bg-blue-500 transform transition-all duration-300
                                                      group-hover:scale-110 group-hover:shadow-md">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </div>
                                    </a>
                                    <a href="https://www.instagram.com/your_fav_tech_guy/" target="_blank" rel="noopener noreferrer"
                                       className="group">
                                        <span className="sr-only">Instagram</span>
                                        <div className="p-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-white
                                                      group-hover:from-purple-700 group-hover:to-pink-600
                                                      transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                            </svg>
                                        </div>
                                    </a>
                                    {/* WhatsApp */}
                                    <a href="https://wa.link/69rt13" target="_blank" rel="noopener noreferrer"
                                       className="group">
                                        <span className="sr-only">WhatsApp</span>
                                        <div className="p-2 rounded-full bg-green-500 text-white
                                                      group-hover:bg-green-600 transform transition-all duration-300
                                                      group-hover:scale-110 group-hover:shadow-md">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </div>
                                    </a>
                                    {/* YouTube */}
                                    <a href="https://www.youtube.com/@lovestonthebeat" target="_blank" rel="noopener noreferrer"
                                       className="group">
                                        <span className="sr-only">YouTube</span>
                                        <div className="p-2 rounded-full bg-red-600 text-white
                                                      group-hover:bg-red-700 transform transition-all duration-300
                                                      group-hover:scale-110 group-hover:shadow-md">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        </div>
                                    </a>

                                    {/* Threads */}
                                    <a href="https://www.threads.com/@your_fav_tech_guy" target="_blank" rel="noopener noreferrer"
                                       className="group">
                                        <span className="sr-only">Threads</span>
                                        <div className="p-2 rounded-full bg-black text-white
                                                      group-hover:bg-gray-800 transform transition-all duration-300
                                                      group-hover:scale-110 group-hover:shadow-md">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.945 14.709c-.413.1-.833.15-1.25.148a5.569 5.569 0 0 1-2.151-.432 4.324 4.324 0 0 1-1.679-1.27 3.39 3.39 0 0 1-.659-2.066c0-.532.12-1.047.351-1.534a3.779 3.779 0 0 1 .981-1.25 4.473 4.473 0 0 1 1.5-.842 5.747 5.747 0 0 1 1.927-.31c.49-.002.978.051 1.456.16.43.1.84.26 1.219.47.347.193.66.44.93.73.26.28.47.6.62.95.15.36.23.74.23 1.13.01.521-.12 1.036-.38 1.49a3.699 3.699 0 0 1-1.039 1.18 4.687 4.687 0 0 1-1.56.77zm.2-7.179a4.57 4.57 0 0 0-1.8-.35 4.58 4.58 0 0 0-1.8.35 4.13 4.13 0 0 0-1.45.99 4.5 4.5 0 0 0-.95 1.5 5.1 5.1 0 0 0-.35 1.9c0 .67.12 1.33.35 1.95.22.59.55 1.13.98 1.58.44.45.97.8 1.55 1.05.61.25 1.25.38 1.9.38.65 0 1.29-.13 1.9-.38.58-.25 1.11-.6 1.55-1.05.44-.45.77-.99.99-1.58.23-.62.35-1.28.35-1.95 0-.67-.12-1.33-.35-1.9-.22-.59-.55-1.12-.99-1.57-.44-.45-.97-.8-1.55-1.05-.61-.25-1.25-.38-1.9-.38zm-1.8 9.179c-.65 0-1.29-.13-1.9-.38-.58-.25-1.11-.6-1.55-1.05-.44-.45-.77-.99-.99-1.58-.23-.62-.35-1.28-.35-1.95 0-.67.12-1.33.35-1.9.22-.59.55-1.12.99-1.57.44-.45.97-.8 1.55-1.05.61-.25 1.25-.38 1.9-.38.65 0 1.29.13 1.9.38.58.25 1.11.6 1.55 1.05.44.45.77.99.99 1.58.23.62.35 1.28.35 1.95 0 .67-.12 1.33-.35 1.9-.22.59-.55 1.12-.99 1.57-.44.45-.97.8-1.55 1.05-.61.25-1.25.38-1.9.38zm0-11.179c-1.01 0-2.01.2-2.95.59-.9.38-1.71.94-2.4 1.65-.69.71-1.24 1.54-1.61 2.46-.38.94-.57 1.94-.57 2.95 0 1.01.19 2.01.57 2.95.37.92.92 1.75 1.61 2.46.69.71 1.5 1.27 2.4 1.65.94.39 1.94.59 2.95.59 1.01 0 2.01-.2 2.95-.59.9-.38 1.71-.94 2.4-1.65.69-.71 1.24-1.54 1.61-2.46.38-.94.57-1.94.57-2.95 0-1.01-.19-2.01-.57-2.95-.37-.92-.92-1.75-1.61-2.46-.69-.71-1.5-1.27-2.4-1.65-.94-.39-1.94-.59-2.95-.59z"/>
                                            </svg>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white relative inline-block">
                                    Quick Links
                                    <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                                </h3>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="/"
                                            className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-blue-500 mr-2 transition-colors duration-300"></span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/about"
                                            className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-blue-500 mr-2 transition-colors duration-300"></span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">About</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/portfolio"
                                            className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-blue-500 mr-2 transition-colors duration-300"></span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Projects</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/resume"
                                            className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-blue-500 mr-2 transition-colors duration-300"></span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Resume</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/contact"
                                            className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-blue-500 mr-2 transition-colors duration-300"></span>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white relative inline-block">
                                    Get In Touch
                                    <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></span>
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-gray-600 dark:text-gray-400 flex items-center group">
                                        <span className="p-2 mr-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                                                      group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </span>
                                        <a href="mailto:contact@brightcheteni.com" className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            brightchetenidev@gmail.com
                                        </a>
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 flex items-center group">
                                        <span className="p-2 mr-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                                                      group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </span>
                                        <span className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            Bulawayo, Zimbabwe
                                        </span>
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 flex items-center group">
                                        <span className="p-2 mr-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                                                      group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </span>
                                        <span className="group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            Available for freelance
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-center">
                            {[
                                { value: '3+', label: 'Years Experience' },
                                { value: '40+', label: 'Projects Completed' },
                                { value: '30+', label: 'Happy Clients' },
                                { value: '100%', label: 'Client Satisfaction' }
                            ].map((stat, index) => (
                                <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:shadow-md transition-shadow duration-300">
                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Section with Copyright and Back to Top */}
                        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="mb-4 md:mb-0 flex flex-wrap items-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mr-4">
                                    © {new Date().getFullYear()} Bright Cheteni. All rights reserved.
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                    <span className="mr-2">Made with</span>
                                    <span className="inline-block animate-pulse text-red-500">❤️</span>
                                    <span className="mx-2">in Zimbabwe 🇿🇼</span>
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <a href="#privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                                    Privacy Policy
                                </a>
                                <span className="text-gray-300 dark:text-gray-700">|</span>
                                <a href="#terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                                    Terms of Service
                                </a>
                                <span className="text-gray-300 dark:text-gray-700">|</span>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="group flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                                    aria-label="Back to top"
                                >
                                    <span className="mr-2">Top</span>
                                    <span className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <svg
                                            className="h-4 w-4 transform group-hover:-translate-y-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
