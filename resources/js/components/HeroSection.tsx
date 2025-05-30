import React from 'react';

interface HeroSectionProps {
    sectionRef: (el: HTMLElement | null) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ sectionRef }) => {
    return (
        <section
            id="hero"
            className="relative overflow-hidden min-h-screen flex items-center"
            ref={sectionRef}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" style={{ WebkitBackgroundClip: 'text' }}></div>

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-5" style={{ WebkitBackgroundSize: 'auto' }}></div>

                {/* Animated Particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 animate-float-particle"
                            style={{
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 10 + 10}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Decorative Gradient Blobs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-3/4 left-2/3 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                {/* Hero Header with Modern Design */}
                <div className="text-center mb-16 relative">
                    {/* Animated Highlight */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl opacity-70 animate-pulse-slow rounded-3xl"></div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                            <span className="block animate-text-reveal" style={{ animationDelay: '0.2s', WebkitAnimationDelay: '0.2s' }}>Full Stack Developer</span>
                            <span
                                className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 animate-text-reveal"
                                style={{
                                    animationDelay: '0.6s',
                                    WebkitAnimationDelay: '0.6s',
                                    WebkitBackgroundClip: 'text !important',
                                    WebkitTextFillColor: 'transparent !important',
                                    backgroundClip: 'text !important',
                                    color: 'transparent !important'
                                }}
                            >&amp; AI Specialist</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 animate-text-reveal" style={{ animationDelay: '1s' }}>
                            Creating elegant, efficient, and user-centered <span className="font-semibold animate-gradient-text">digital experiences</span> with modern technologies and AI integration.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-text-reveal" style={{ animationDelay: '1.4s' }}>
                            <a
                                href="#contact"
                                className="px-8 py-3 rounded-lg text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 dark:from-cyan-500 dark:to-blue-500 dark:hover:from-cyan-600 dark:hover:to-blue-600 font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                            >
                                <span>Get in Touch</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="#projects"
                                className="px-8 py-3 rounded-lg text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                            >
                                <span>View Projects</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </a>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-24 animate-bounce hidden md:block">
                            <a href="#about" className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                                <span className="text-sm font-medium mb-2">Scroll Down</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
