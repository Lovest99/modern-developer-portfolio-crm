import React from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import ContactSection from '@/components/ContactSection';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Contact() {
    const { auth } = usePage<SharedData>().props;

    // Get service from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');

    return (
        <PortfolioLayout currentPage="contact" auth={auth}>
            <Head title="Bright Cheteni - Contact Me" />
            <ContactSection initialService={serviceParam} />
        </PortfolioLayout>
    );
}
