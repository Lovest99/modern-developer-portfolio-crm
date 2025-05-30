import React, { lazy, Suspense } from 'react';
import { Head, Link } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import SectionHeading from '@/components/SectionHeading';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import LazyLoad from '@/components/LazyLoad';
import LazyImage from '@/components/LazyImage';

// Lazy load heavy components
const HeroSectionFinal = lazy(() => import('@/components/HeroSectionFinal'));
const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const TrustedBySection = lazy(() => import('@/components/TrustedBySection'));
const CallToActionParallax = lazy(() => import('@/components/CallToActionParallax'));

// Loading fallback component
const SectionLoader = () => (
    <div className="w-full py-16 flex justify-center items-center">
        <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-900"></div>
            </div>
        </div>
    </div>
);

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    // Featured sections for the homepage
    const featuredSections = [
        {
            title: 'About Me',
            description: 'Learn about my background, interests, and what drives me as a developer.',
            icon: '👨‍💻',
            link: '/about',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Portfolio',
            description: 'Explore my projects and technical skills in web development, AI/ML, and more.',
            icon: '🚀',
            link: '/portfolio',
            color: 'from-purple-500 to-indigo-500',
        },
        {
            title: 'Resume',
            description: 'View my professional experience, education, and qualifications.',
            icon: '📝',
            link: '/resume',
            color: 'from-green-500 to-teal-500',
        },
        {
            title: 'Contact',
            description: 'Get in touch with me for collaborations, opportunities, or just to say hello.',
            icon: '📧',
            link: '/contact',
            color: 'from-orange-500 to-amber-500',
        },
    ];

    return (
        <PortfolioLayout currentPage="home" auth={auth}>
            <Head title="Bright Cheteni - Home" />

            {/* Hero Section */}
            <Suspense fallback={<SectionLoader />}>
                <HeroSectionFinal />
            </Suspense>

            {/* Featured Sections with Glassmorphism */}
            <div className="relative py-24 overflow-hidden">
                {/* Background image - using LazyImage */}
                <div className="absolute inset-0 w-full h-full">
                    <LazyImage
                        src="/images/backgrounds/navigation/navigation1.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                        blurEffect={true}
                        placeholderColor="#f8fafc"
                    />
                </div>

                {/* Overlay for better readability */}
                <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/60 backdrop-blur-[1px]"></div>

                {/* Additional decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 filter blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 filter blur-3xl"></div>
                    <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 filter blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Glassmorphic section heading */}
                    <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-2xl px-8 py-6 mb-12 border border-white/20 dark:border-gray-700/30 shadow-lg">
                        <SectionHeading
                            title="Explore My Portfolio"
                            subtitle="Navigate through different sections of my portfolio to learn more about my work, skills, and experience."
                            gradientFrom="cyan-600"
                            gradientVia="blue-600"
                            gradientTo="purple-600"
                            darkFrom="cyan-400"
                            darkVia="blue-400"
                            darkTo="purple-400"
                            underlineWidth="w-40"
                            paddingTop="pt-0"
                            paddingBottom="pb-4"
                            marginBottom="mb-0"
                        />
                    </div>

                    <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                        {featuredSections.map((section, index) => (
                            <Link
                                key={index}
                                href={section.link}
                                className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-white/30 dark:border-gray-700/30"
                                style={{
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)'
                                }}
                            >
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${section.color}`}></div>
                                <div className="p-6 relative z-10">
                                    <div className="text-3xl mb-4 bg-white/80 dark:bg-gray-700/80 w-12 h-12 rounded-full flex items-center justify-center shadow-md">{section.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {section.title}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        {section.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-cyan-600 dark:text-cyan-400 font-medium">
                                        <span>Explore</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trusted By Section */}
            <div id="trustedBy" className="relative">
                <LazyLoad transitionType="fade" transitionDuration={800}>
                    <Suspense fallback={<SectionLoader />}>
                        <TrustedBySection
                            title="Trusted By Valued Clients"
                            subtitle="Proud to have delivered exceptional solutions for these organizations"
                        />
                    </Suspense>
                </LazyLoad>
            </div>

            {/* Services Section */}
            <LazyLoad transitionType="slide-up" transitionDuration={800}>
                <Suspense fallback={<SectionLoader />}>
                    <ServicesSection />
                </Suspense>
            </LazyLoad>

            {/* Call to Action Parallax Section */}
            <LazyLoad transitionType="fade" transitionDuration={1000}>
                <Suspense fallback={<SectionLoader />}>
                    <CallToActionParallax
                        title="Let's Build Your Next Digital Experience"
                        subtitle="Ready to transform your ideas into reality? I combine technical expertise with creative problem-solving to deliver exceptional results."
                        buttonText="Start a Project"
                        buttonLink="/contact"
                    />
                </Suspense>
            </LazyLoad>
        </PortfolioLayout>
    );
}
