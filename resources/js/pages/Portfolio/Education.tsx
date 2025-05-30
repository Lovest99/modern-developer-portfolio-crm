import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import EducationSection from '@/components/EducationSection';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Education() {
    const { auth } = usePage<SharedData>().props;

    return (
        <PortfolioLayout currentPage="education" auth={auth}>
            <Head title="Bright Cheteni - Education & Certifications" />
            <EducationSection />
        </PortfolioLayout>
    );
}
