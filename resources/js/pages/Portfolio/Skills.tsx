import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import SkillsSection from '@/components/SkillsSection';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Skills() {
    const { auth } = usePage<SharedData>().props;

    return (
        <PortfolioLayout currentPage="skills" auth={auth}>
            <Head title="Bright Cheteni - Skills & Expertise" />
            <SkillsSection />
        </PortfolioLayout>
    );
}
