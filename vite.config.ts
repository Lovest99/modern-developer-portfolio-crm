import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
    const isProduction = command === 'build';

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react({
                include: ['**/*.tsx', '**/*.jsx'],
            }),
            tailwindcss(),
        ],
        esbuild: {
            jsx: 'automatic',
            // Enable minification in production
            minify: isProduction,
            // Drop console logs in production
            drop: isProduction ? ['console', 'debugger'] : [],
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            },
        },
        css: {
            devSourcemap: !isProduction,
        },
        build: {
            target: ['es2015', 'edge18', 'firefox60', 'chrome61', 'safari11'],
            cssTarget: ['chrome61', 'safari11', 'firefox60', 'edge18'],
            // Enable chunk splitting for better caching
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: [
                            'react',
                            'react-dom',
                            '@inertiajs/react',
                            'framer-motion',
                        ],
                        ui: [
                            '@radix-ui/react-avatar',
                            '@radix-ui/react-checkbox',
                            '@radix-ui/react-collapsible',
                            '@radix-ui/react-dialog',
                            '@radix-ui/react-dropdown-menu',
                            '@radix-ui/react-label',
                            '@radix-ui/react-navigation-menu',
                            '@radix-ui/react-select',
                            '@radix-ui/react-separator',
                            '@radix-ui/react-slot',
                            '@radix-ui/react-toggle',
                            '@radix-ui/react-toggle-group',
                            '@radix-ui/react-tooltip',
                            '@headlessui/react',
                        ],
                    },
                },
            },
            // Enable source maps only in development
            sourcemap: !isProduction,
        },
    };
});
