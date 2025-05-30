import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import SectionHeading from '@/components/SectionHeading';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function ResumePage() {
    const { auth } = usePage<SharedData>().props;

    return (
        <PortfolioLayout currentPage="resume" auth={auth}>
            <Head title="Bright Cheteni - Resume" />

            <div className="bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        title="My Resume"
                        subtitle="A comprehensive overview of my professional experience, education, and qualifications."
                        gradientFrom="cyan-600"
                        gradientVia="blue-600"
                        gradientTo="purple-600"
                        darkFrom="cyan-400"
                        darkVia="blue-400"
                        darkTo="purple-400"
                        underlineWidth="w-32"
                        paddingTop="pt-12"
                    />

                    {/* Download CV Button */}
                    <div className="text-center mb-16">
                        <a
                            href="/download/cv"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download CV
                        </a>
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            <div className="py-8">
                <ExperienceSection />
            </div>

            {/* Education Section */}
            <div className="py-8 mt-8">
                <EducationSection />
            </div>
        </PortfolioLayout>
    );
}
