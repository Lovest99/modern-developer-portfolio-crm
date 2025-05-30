<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

        {{-- SEO Meta Tags --}}
        <meta name="description" content="Bright Cheteni - Full Stack Developer & AI Specialist. Portfolio showcasing web development, AI projects, and technical expertise.">
        <meta name="keywords" content="Bright Cheteni, Full Stack Developer, AI Specialist, Web Development, Portfolio, Laravel, React">
        <meta name="author" content="Bright Cheteni">

        {{-- Open Graph / Social Media Meta Tags --}}
        <meta property="og:title" content="{{ config('app.name', 'Bright Cheteni - Full Stack Developer & AI Specialist') }}">
        <meta property="og:description" content="Full Stack Developer & AI Specialist. Portfolio showcasing web development, AI projects, and technical expertise.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:image" content="{{ asset('images/og-image.jpg') }}">

        {{-- Twitter Card Meta Tags --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ config('app.name', 'Bright Cheteni - Full Stack Developer & AI Specialist') }}">
        <meta name="twitter:description" content="Full Stack Developer & AI Specialist. Portfolio showcasing web development, AI projects, and technical expertise.">
        <meta name="twitter:image" content="{{ asset('images/og-image.jpg') }}">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                // Safari detection
                const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                if (isSafari) {
                    document.documentElement.classList.add('safari');
                }

                // Safari polyfills - only load if needed
                if (!('CSS' in window) || !CSS.supports || !CSS.supports('color', 'var(--fake-var)')) {
                    // Add a polyfill script for CSS variables for older browsers
                    var cssVarPoly = document.createElement('script');
                    cssVarPoly.src = 'https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2/dist/css-vars-ponyfill.min.js';
                    cssVarPoly.onload = function() {
                        cssVars({
                            include: 'style,link[rel=stylesheet]',
                            onlyLegacy: true,
                            watch: true
                        });
                    };
                    document.head.appendChild(cssVarPoly);
                }

                // Intersection Observer polyfill for Safari - only load if needed
                if (!('IntersectionObserver' in window)) {
                    var polyfill = document.createElement('script');
                    polyfill.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
                    document.head.appendChild(polyfill);
                }

                // Add Safari-specific inline styles
                if (isSafari) {
                    var safariStyles = document.createElement('style');
                    safariStyles.textContent = `
                        .bg-clip-text.text-transparent {
                            -webkit-background-clip: text !important;
                            -webkit-text-fill-color: transparent !important;
                        }
                        .backdrop-blur-md, .backdrop-blur-xl {
                            -webkit-backdrop-filter: blur(12px) !important;
                            backdrop-filter: blur(12px) !important;
                        }
                        .bg-white\\/80, .dark\\:bg-gray-800\\/80 {
                            background-color: rgba(255, 255, 255, 0.8) !important;
                        }
                        .dark .dark\\:bg-gray-800\\/80 {
                            background-color: rgba(31, 41, 55, 0.8) !important;
                        }
                    `;
                    document.head.appendChild(safariStyles);
                }

                // Dark mode detection
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Critical CSS inline for faster rendering --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }

            /* Critical rendering path styles */
            body {
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }

            /* Prevent content layout shifts */
            main {
                flex: 1 0 auto;
            }
        </style>

        <title inertia>{{ config('app.name', 'Bright Cheteni - Full Stack Developer & AI Specialist') }}</title>

        {{-- Preconnect to external domains --}}
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>

        {{-- Preload critical fonts --}}
        <link rel="preload" href="https://fonts.bunny.net/css?family=figtree:400,500,600,700|instrument-sans:400,500,600" as="style">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700|instrument-sans:400,500,600" rel="stylesheet">

        {{-- Favicon --}}
        <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">

        {{-- Cache control headers for static assets --}}
        @if(app()->environment('production'))
        <meta http-equiv="Cache-Control" content="public, max-age=31536000">
        @endif

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        {{-- Safari compatibility script - load asynchronously --}}
        <script src="{{ asset('js/safari-polyfills.js') }}" async defer></script>
    </head>
    <body class="font-sans antialiased">
        @inertia

        {{-- Add noscript fallback for users with JavaScript disabled --}}
        <noscript>
            <div style="padding: 2rem; text-align: center; font-family: system-ui, sans-serif;">
                <h1>JavaScript Required</h1>
                <p>This website requires JavaScript to function properly. Please enable JavaScript in your browser settings.</p>
            </div>
        </noscript>
    </body>
</html>
