import React, { lazy, Suspense } from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import LazyLoad from '@/components/LazyLoad';

// Lazy load components
const AboutSection = lazy(() => import('@/components/AboutSection'));
const GlassmorphicTestimonialsSection = lazy(() => import('@/components/GlassmorphicTestimonialsSection'));

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

export default function About() {
    const { auth } = usePage<SharedData>().props;

    return (
        <PortfolioLayout currentPage="about" auth={auth}>
            <Head title="Bright Cheteni - About Me" />

            {/* About Section with LazyLoad */}
            <LazyLoad
                transitionType="slide-up"
                transitionDuration={800}
                className="w-full"
            >
                <Suspense fallback={<SectionLoader />}>
                    <AboutSection sectionRef={() => {}} />
                </Suspense>
            </LazyLoad>

            {/* Testimonials Section with LazyLoad */}
            <LazyLoad
                transitionType="fade"
                transitionDuration={1000}
                transitionDelay={200}
                className="py-8 mt-8 w-full"
            >
                <Suspense fallback={<SectionLoader />}>
                    <GlassmorphicTestimonialsSection />
                </Suspense>
            </LazyLoad>
        </PortfolioLayout>
    );
}
