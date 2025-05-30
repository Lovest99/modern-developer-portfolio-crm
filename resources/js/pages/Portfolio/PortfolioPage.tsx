import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import SectionHeading from '@/components/SectionHeading';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function PortfolioPage() {
    const { auth } = usePage<SharedData>().props;

    return (
        <PortfolioLayout currentPage="portfolio" auth={auth}>
            <Head title="Bright Cheteni - Portfolio" />

            {/* Portfolio content starts directly with the Projects section */}

            {/* Projects Section */}
            <div className="py-8">
                <ProjectsSection />
            </div>

            {/* Skills Section */}
            <div className="py-8 mt-8">
                <SkillsSection />
            </div>
        </PortfolioLayout>
    );
}
