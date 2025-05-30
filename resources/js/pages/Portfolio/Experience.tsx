import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import ExperienceSection from '@/components/ExperienceSection';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Experience() {
    const { auth } = usePage<SharedData>().props;

    return (
        <PortfolioLayout currentPage="experience" auth={auth}>
            <Head title="Bright Cheteni - Professional Experience" />
            <ExperienceSection />
        </PortfolioLayout>
    );
}
