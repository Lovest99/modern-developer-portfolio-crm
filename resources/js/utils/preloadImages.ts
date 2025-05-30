/**
 * Preloads critical images to improve perceived performance
 * This function can be called early in the application lifecycle
 */
export const preloadCriticalImages = () => {
    // List of critical images to preload
    const criticalImages = [
        '/images/backgrounds/about/background.jpg',
        '/images/backgrounds/navigation/navigation1.jpg',
        '/images/backgrounds/testimonials/testimonials-bg4.jpg',
    ];

    // Create image objects to trigger browser preloading
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

/**
 * Preloads images for a specific route/page
 * @param route The current route name
 */
export const preloadRouteImages = (route: string) => {
    // Define images to preload for specific routes
    const routeImages: Record<string, string[]> = {
        'home': [
            '/images/backgrounds/navigation/navigation1.jpg',
            // Add other home page images
        ],
        'about': [
            '/images/backgrounds/about/background.jpg',
            '/images/backgrounds/testimonials/testimonials-bg4.jpg',
            // Add other about page images
        ],
        'portfolio': [
            // Add portfolio page images
        ],
        'contact': [
            // Add contact page images
        ],
    };

    // Preload images for the current route
    const imagesToPreload = routeImages[route] || [];
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

export default {
    preloadCriticalImages,
    preloadRouteImages,
};
