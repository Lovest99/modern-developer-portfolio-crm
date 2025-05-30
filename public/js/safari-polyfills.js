/**
 * Safari-specific polyfills and fixes
 */

(function() {
    // Detect Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
        console.log('Safari browser detected, applying compatibility fixes');

        // Add safari class to html element
        document.documentElement.classList.add('safari');

        // Fix for backdrop-filter
        const applyBackdropFilterFix = function() {
            const elements = document.querySelectorAll('.backdrop-blur-md, .backdrop-blur-xl, .backdrop-blur-sm, .backdrop-blur-lg, .backdrop-blur');
            elements.forEach(function(el) {
                el.style.webkitBackdropFilter = 'blur(12px)';
                el.style.backdropFilter = 'blur(12px)';
            });

            // Fix for glassmorphism backgrounds
            const glassElements = document.querySelectorAll('.bg-white\\/80, .dark\\:bg-gray-800\\/80');
            glassElements.forEach(function(el) {
                if (document.documentElement.classList.contains('dark')) {
                    el.style.backgroundColor = 'rgba(31, 41, 55, 0.8)';
                } else {
                    el.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                }
            });
        };

        // Fix for gradient text
        const applyGradientTextFix = function() {
            const elements = document.querySelectorAll('.bg-clip-text.text-transparent');
            elements.forEach(function(el) {
                el.style.webkitBackgroundClip = 'text';
                el.style.webkitTextFillColor = 'transparent';
                el.style.backgroundClip = 'text';
                el.style.color = 'transparent';
            });
        };

        // Apply fixes on load and periodically
        window.addEventListener('load', function() {
            applyBackdropFilterFix();
            applyGradientTextFix();

            // Apply fixes periodically to catch dynamically added elements
            setInterval(function() {
                applyBackdropFilterFix();
                applyGradientTextFix();
            }, 1000);
        });

        // Apply fixes on DOM changes
        const observer = new MutationObserver(function() {
            applyBackdropFilterFix();
            applyGradientTextFix();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Fix for CSS variables in Safari
        if (!window.CSS || !window.CSS.supports || !window.CSS.supports('color', 'var(--fake-var)')) {
            console.log('Adding CSS variables polyfill for Safari');
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2/dist/css-vars-ponyfill.min.js';
            script.onload = function() {
                cssVars({
                    include: 'style,link[rel=stylesheet]',
                    onlyLegacy: true,
                    watch: true
                });
            };
            document.head.appendChild(script);
        }
    }
})();
