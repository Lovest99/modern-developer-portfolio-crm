import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import GlassmorphicTestimonialsSection from '@/components/GlassmorphicTestimonialsSection';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Testimonials() {
    const { auth } = usePage<SharedData>().props;

    return (
        <PortfolioLayout currentPage="testimonials" auth={auth}>
            <Head title="Bright Cheteni - Client Testimonials" />
            <GlassmorphicTestimonialsSection />
        </PortfolioLayout>
    );
}
