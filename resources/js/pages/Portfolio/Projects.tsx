import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import ProjectsSection from '@/components/ProjectsSection';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Projects() {
    const { auth } = usePage<SharedData>().props;

    return (
        <PortfolioLayout currentPage="projects" auth={auth}>
            <Head title="Bright Cheteni - Projects" />
            <ProjectsSection />
        </PortfolioLayout>
    );
}
