import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import React, { Suspense, useEffect } from 'react';
import { preloadCriticalImages, preloadRouteImages } from './utils/preloadImages';
import { Toaster } from '@/components/ui/toaster';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Loading spinner component for Suspense fallback
const LoadingSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 z-50">
        <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 dark:border-blue-400 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white dark:bg-gray-900"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-t-8 border-b-8 border-purple-500 dark:border-purple-400 animate-spin"></div>
            </div>
        </div>
    </div>
);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');
        return resolvePageComponent(`./pages/${name}.tsx`, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Suspense fallback={<LoadingSpinner />}>
                <>
                    <App {...props} />
                    <Toaster />
                </>
            </Suspense>
        );
    },
    progress: {
        color: '#4B5563',
        delay: 250,
        includeCSS: true,
        showSpinner: true,
    },
});

// This will set light / dark mode on load...
initializeTheme();
