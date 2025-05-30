import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TrustedByProps {
    title?: string;
    subtitle?: string;
}

const TrustedBySection: React.FC<TrustedByProps> = ({
    title = "Trusted By",
    subtitle = "Proud to collaborate with these amazing organizations"
}) => {
    console.log("TrustedBySection rendering");
    // Reference for the scrolling container
    const scrollerRef = useRef<HTMLDivElement>(null);

    // Actual client companies with PNG format logos
    const companies = [
        { name: "Sichel Technologies", logo: "/images/companies/sicheltechnologies-logo.png" },
        { name: "Mist Corporate", logo: "/images/companies/mist-logo.png" },
        { name: "Golden Hearts Properties", logo: "/images/companies/goldenhearts-logo.png" },
        { name: "Chigs International", logo: "/images/companies/chigs-logo.png" },
        { name: "Finmas Business Consultancy", logo: "/images/companies/finmas-logo.png" },
        { name: "SIMRAC", logo: "/images/companies/simrac-logo.png" },
        { name: "ZIMRA", logo: "/images/companies/zimra-logo.png" },
        { name: "Oriental", logo: "/images/clients/oriental.png" },
        { name: "Venice Mine Complex", logo: "/images/companies/venice-logo.png" },
        { name: "Smart Stay", logo: "/images/companies/smartstay-logo.png" },
        { name: "Rudopos", logo: "/images/companies/rudopos-logo.png" },
        { name: "ManufacturePro", logo: "/images/companies/manufacturepro-logo.png" },
        { name: "HomeLovers", logo: "/images/clients/homelovers.png" },
        { name: "Drop", logo: "/images/clients/drop.png" },
        { name: "Sichel Energies", logo: "/images/companies/sichelenergies-logo.png" },
    ];

    // Duplicate the array for seamless looping
    const duplicatedCompanies = [...companies, ...companies];

    // Set up the infinite scroll animation
    useEffect(() => {
        const setupScroll = (scroller: HTMLDivElement | null, direction: number, speed: number) => {
            if (!scroller) return;

            let scrollPosition = 0;
            let paused = false;
            let animationFrameId: number | null = null;

            const scroll = () => {
                if (!paused) {
                    scrollPosition += direction * speed;

                    // Reset position for seamless loop
                    const scrollWidth = scroller.scrollWidth / 2;
                    if (Math.abs(scrollPosition) >= scrollWidth) {
                        scrollPosition = 0;
                    }

                    scroller.style.transform = `translateX(${scrollPosition}px)`;
                }

                // Always request next frame to keep animation going even after pause
                animationFrameId = requestAnimationFrame(scroll);
            };

            // Start the animation
            animationFrameId = requestAnimationFrame(scroll);

            // Event handlers with named functions for proper cleanup
            const handleMouseEnter = () => { paused = true; };
            const handleMouseLeave = () => { paused = false; };
            const handleTouchStart = () => { paused = true; };
            const handleTouchEnd = () => { paused = false; };

            // Add event listeners
            scroller.addEventListener('mouseenter', handleMouseEnter);
            scroller.addEventListener('mouseleave', handleMouseLeave);
            scroller.addEventListener('touchstart', handleTouchStart);
            scroller.addEventListener('touchend', handleTouchEnd);

            // Clean up
            return () => {
                // Cancel animation frame
                if (animationFrameId !== null) {
                    cancelAnimationFrame(animationFrameId);
                }

                // Remove event listeners with the same function references
                scroller.removeEventListener('mouseenter', handleMouseEnter);
                scroller.removeEventListener('mouseleave', handleMouseLeave);
                scroller.removeEventListener('touchstart', handleTouchStart);
                scroller.removeEventListener('touchend', handleTouchEnd);
            };
        };

        const cleanup = setupScroll(scrollerRef.current, -1, 0.5); // Left to right

        return () => {
            cleanup && cleanup();
        };
    }, []);

    return (
        <section className="py-16 relative overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/backgrounds/navigation/trusted2.jpg')"
                }}
            ></div>

            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/60 backdrop-blur-[1px]"></div>

            {/* Additional decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 filter blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 filter blur-3xl"></div>
            </div>

            {/* Section content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Glassmorphic section heading */}
                <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-2xl px-8 py-6 mb-12 border border-white/20 dark:border-gray-700/30 shadow-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                                {title}
                            </span>
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Glassmorphic logos container */}
                <div className="backdrop-blur-xl bg-white/50 dark:bg-gray-800/30 rounded-xl border border-white/20 dark:border-gray-700/30 shadow-lg p-6 overflow-hidden relative">
                    {/* Left fade gradient */}
                    <div className="absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-white/50 dark:from-gray-800/30 to-transparent pointer-events-none"></div>

                    {/* Right fade gradient */}
                    <div className="absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-white/50 dark:from-gray-800/30 to-transparent pointer-events-none"></div>

                    {/* Single row of logos - scrolling left */}
                    <div className="py-6 overflow-hidden">
                        <div ref={scrollerRef} className="flex space-x-16 py-4">
                            {duplicatedCompanies.map((company, index) => (
                                <div
                                    key={`${company.name}-${index}`}
                                    className="flex-shrink-0 flex items-center justify-center h-16 sm:h-20 w-36 sm:w-48 backdrop-blur-xl bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 border border-white/30 dark:border-gray-700/30 px-4 group"
                                    style={{
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)'
                                    }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} logo`}
                                        className="max-h-10 sm:max-h-12 max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = '/images/clients/placeholder-logo.png';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBySection;
