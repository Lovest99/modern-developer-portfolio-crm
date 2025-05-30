import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import SkillsSection from '@/components/SkillsSection';
import ThemeToggle from '@/components/ThemeToggle';
// Temporarily detached
// import HeroSection from '@/components/HeroSection';
import HeroSectionFinal from '@/components/HeroSectionFinal';
import AboutSection from '@/components/AboutSection';
import GlassmorphicTestimonialsSection from '@/components/GlassmorphicTestimonialsSection';
import TrustedBySection from '@/components/TrustedBySection';
import SimpleTrustedBy from '@/components/SimpleTrustedBy';
import InfiniteLogoScroll from '@/components/InfiniteLogoScroll';
import SimpleLogoScroll from '@/components/SimpleLogoScroll';
import BrowserCompatibilityMeta from '@/components/BrowserCompatibilityMeta';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
        hero: null,
        about: null,
        skills: null,
        experience: null,
        education: null,
        projects: null,
        trustedBy: null,
        testimonials: null,
        contact: null
    });

    // Handle scroll effect for the navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Determine active section based on scroll position
            const scrollPosition = window.scrollY + 100;

            for (const section of Object.keys(sectionRefs.current)) {
                const element = sectionRefs.current[section];
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <BrowserCompatibilityMeta />
            <Head title="Bright Cheteni - Full Stack Developer & AI Specialist | Zimbabwe">
                <meta name="description" content="Bright Cheteni is a Full Stack Developer and AI Specialist based in Zimbabwe, specializing in creating innovative web applications and AI solutions." />
                <meta name="keywords" content="Bright Cheteni, Full Stack Developer, AI Specialist, Zimbabwe, Web Development, Software Engineer" />
                <meta property="og:title" content="Bright Cheteni - Full Stack Developer & AI Specialist" />
                <meta property="og:description" content="Bright Cheteni is a Full Stack Developer and AI Specialist based in Zimbabwe, specializing in creating innovative web applications and AI solutions." />
                <meta property="og:image" content="/images/og-image.jpg" />
                <meta property="og:url" content="https://brightcheteni.com" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
                {/* Navbar with Glassmorphism Effect - 2025+ Edition */}
                <nav
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700/50' : 'bg-transparent'}`}
                    style={isScrolled ? {
                        WebkitBackdropFilter: 'blur(24px) !important',
                        backdropFilter: 'blur(24px) !important',
                        backgroundColor: 'rgba(255, 255, 255, 0.8) !important'
                    } : {}}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                {/* Logo */}
                                <Link href="/" className="flex items-center group">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-70 group-hover:opacity-100 blur-md transition-all duration-300"></div>
                                        <span className="relative flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">BC</span>
                                    </div>
                                    <span className="ml-3 font-medium text-gray-900 dark:text-white">Bright Cheteni</span>
                                </Link>
                            </div>

                            {/* Navigation Links - Desktop */}
                            <div className="hidden md:flex items-center space-x-1">
                                <Link
                                    href="#hero"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === 'hero'
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="#about"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === 'about'
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    About
                                </Link>
                                <Link
                                    href="#experience"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === 'experience'
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    Experience
                                </Link>
                                <Link
                                    href="#education"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === 'education'
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    Education
                                </Link>
                                <Link
                                    href="#projects"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === 'projects'
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    Projects
                                </Link>
                                <Link
                                    href="#trustedBy"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === 'trustedBy'
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    Clients
                                </Link>

                                <Link
                                    href="#testimonials"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === 'testimonials'
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    Testimonials
                                </Link>
                                <Link
                                    href="#contact"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeSection === 'contact'
                                            ? 'text-cyan-600 dark:text-cyan-400'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                >
                                    Contact
                                </Link>


                                <div className="ml-2">
                                    <ThemeToggle />
                                </div>

                                {/* Login/Register Links */}
                                {!auth.user ? (
                                    <div className="ml-4 flex items-center space-x-2">
                                        <Link
                                            href={route('login')}
                                            className="px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-3 py-1.5 rounded-md text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                ) : (
                                    <Link
                                        href={route('dashboard')}
                                        className="ml-4 px-3 py-1.5 rounded-md text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center md:hidden">
                                <ThemeToggle />

                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isMobileMenuOpen ? (
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link
                                    href="#hero"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'hero'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="#about"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'about'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="#experience"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'experience'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Experience
                                </Link>
                                <Link
                                    href="#education"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'education'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Education
                                </Link>
                                <Link
                                    href="#projects"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'projects'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Projects
                                </Link>
                                <Link
                                    href="#trustedBy"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'trustedBy'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Clients
                                </Link>
                                <Link
                                    href="#testimonials"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'testimonials'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Testimonials
                                </Link>
                                <Link
                                    href="#skills"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'skills'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Skills
                                </Link>
                                <Link
                                    href="#contact"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        activeSection === 'contact'
                                            ? 'text-cyan-600 dark:text-cyan-400 bg-gray-100 dark:bg-gray-800'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </div>

                            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                                <div className="px-2 space-y-1">
                                    {!auth.user ? (
                                        <div className="flex flex-col space-y-2 px-3">
                                            <Link
                                                href={route('login')}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-cyan-600 dark:hover:text-cyan-400"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    ) : (
                                        <Link
                                            href={route('dashboard')}
                                            className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main Content */}
                <main className="pt-16">
                    {/* Hero Section Component */}
                    <div id="hero" ref={(el) => sectionRefs.current.hero = el}>
                        <HeroSectionFinal />
                    </div>

                    {/* About Section Component */}
                    <div
                        id="about"
                        ref={(el) => sectionRefs.current.about = el}
                    >
                        <AboutSection sectionRef={(el) => {}} />
                    </div>

                    {/* Skills Section */}
                    <div ref={(el) => sectionRefs.current.skills = el}>
                        <SkillsSection />
                    </div>

                    {/* Experience Section */}
                    <div ref={(el) => sectionRefs.current.experience = el}>
                        <ExperienceSection />
                    </div>

                    {/* Education Section */}
                    <div ref={(el) => sectionRefs.current.education = el}>
                        <EducationSection />
                    </div>

                    {/* Projects Section */}
                    <div ref={(el) => sectionRefs.current.projects = el}>
                        <ProjectsSection />
                    </div>

                    {/* Trusted By Section */}
                    <div id="trustedBy" ref={(el) => sectionRefs.current.trustedBy = el}>
                        <div className="trusted-by-container">
                            <SimpleLogoScroll
                                title="Trusted By Industry Leaders"
                                subtitle="Proud to have collaborated with these amazing organizations"
                            />
                        </div>
                    </div>

                    {/* Spacer to prevent overlap */}
                    <div className="h-24"></div>

                    {/* Testimonials Section */}
                    <div id="testimonials" ref={(el) => sectionRefs.current.testimonials = el}>
                        <GlassmorphicTestimonialsSection />
                    </div>

                    {/* Spacer to prevent overlap */}
                    <div className="h-24"></div>

                    {/* Contact Section */}
                    <div ref={(el) => sectionRefs.current.contact = el}>
                        <ContactSection />
                    </div>
                </main>

                {/* Footer with Minimalist Design */}
                <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-4 md:mb-0">
                                <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} All rights reserved.   Made with ❤️❤️❤️ by Bright Cheteni.</p>
                            </div>
                            <div className="flex space-x-6">
                                <a href="https://github.com/brightcheteni" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/in/brightcheteni" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="https://twitter.com/brightcheteni" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
