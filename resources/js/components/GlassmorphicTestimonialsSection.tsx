import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import SectionHeading from './SectionHeading';
import LazyImage from './LazyImage';
import LazyLoad from './LazyLoad';

// Define keyframe animations
const testimonialAnimationStyles = `
@keyframes testimonialFadeIn {
  0% {
    opacity: 0.7;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
`;

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    company_logo: string;
    profile_image: string;
    content: string;
    rating: number;
    is_active?: boolean;
    display_order?: number;
    created_at?: string;
    updated_at?: string;
}

const GlassmorphicTestimonialsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Fetch testimonials from API
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/public/testimonials');

                if (!response.ok) {
                    throw new Error(`Failed to fetch testimonials: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                // Log testimonial data for debugging
                console.log('Testimonials data:', data);

                // Check image URLs
                data.forEach((testimonial: any) => {
                    console.log(`Testimonial ${testimonial.id} - ${testimonial.name}:`);
                    console.log(`  Profile image: ${testimonial.profile_image}`);
                    console.log(`  Company logo: ${testimonial.company_logo}`);
                });

                setTestimonials(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setError('Failed to load testimonials. Please try again later.');

                // Fallback to sample data if API fails
                setTestimonials([
                    {
                        id: 1,
                        name: "McDonald Siriza",
                        role: "CEO & Director",
                        company: "Mist Corporate Services",
                        company_logo: "https://ui-avatars.com/api/?name=Mist+Corporate&background=0D8ABC&color=fff&format=svg",
                        profile_image: "https://ui-avatars.com/api/?name=McDonald+Siriza&background=0D8ABC&color=fff",
                        content: "Working with Bright was a game-changer for our web presence. His attention to detail and innovative approach to problem-solving resulted in a platform that exceeded our expectations. Not only did he deliver on time, but he also provided valuable insights that improved our overall digital strategy.",
                        rating: 5
                    },
                    {
                        id: 2,
                        name: "Michael Chen",
                        role: "CTO",
                        company: "Innovate Solutions",
                        company_logo: "https://ui-avatars.com/api/?name=Innovate+Solutions&background=4F46E5&color=fff&format=svg",
                        profile_image: "https://ui-avatars.com/api/?name=Michael+Chen&background=4F46E5&color=fff",
                        content: "Bright's expertise in both frontend and backend technologies made him the perfect developer for our complex project. He quickly understood our requirements and implemented solutions that were both elegant and efficient. His knowledge of AI integration was particularly valuable for our data-driven application.",
                        rating: 5
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        if (testimonials.length > 0 && !isLoading) {
            startAutoRotation();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [testimonials.length, isLoading]);

    const startAutoRotation = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 8000); // Change testimonial every 8 seconds
    };

    // Reset interval when manually changing testimonial
    const handleDotClick = (index: number) => {
        setActiveIndex(index);
        startAutoRotation();
    };

    // Touch/mouse events for swipe functionality
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        if ('touches' in e) {
            setStartX(e.touches[0].clientX);
        } else {
            setStartX(e.clientX);
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;

        let currentX;
        if ('touches' in e) {
            currentX = e.touches[0].clientX;
        } else {
            currentX = e.clientX;
        }

        const diff = currentX - startX;
        setCurrentTranslate(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);

        // If dragged more than 100px, change slide
        if (Math.abs(currentTranslate) > 100) {
            if (currentTranslate > 0) {
                // Dragged right - go to previous
                setActiveIndex((prevIndex) =>
                    (prevIndex - 1 + testimonials.length) % testimonials.length
                );
            } else {
                // Dragged left - go to next
                setActiveIndex((prevIndex) =>
                    (prevIndex + 1) % testimonials.length
                );
            }
        }

        setCurrentTranslate(0);
        startAutoRotation();
    };

    // Intersection observer for animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Render stars based on rating with animated gradient
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${
                    index < rating
                        ? 'text-transparent'
                        : 'text-gray-300 dark:text-gray-600'
                }`}
                style={index < rating ? {
                    fill: 'url(#starGradient)'
                } : {}}
                viewBox="0 0 20 20"
            >
                <defs>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                </defs>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    // Generate a random gradient for each testimonial
    const getGradientStyle = (id: number) => {
        const gradients = [
            'from-blue-400 to-indigo-500',
            'from-purple-400 to-pink-500',
            'from-cyan-400 to-teal-500',
            'from-amber-400 to-orange-500'
        ];

        return gradients[id % gradients.length];
    };

    return (
        <div
            ref={sectionRef}
            className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } py-16 relative overflow-hidden`}
            id="testimonials"
        >
            {/* Add animation styles */}
            <style dangerouslySetInnerHTML={{ __html: testimonialAnimationStyles }} />
            {/* Background image - using LazyImage */}
            <div className="absolute inset-0 w-full h-full">
                <LazyImage
                    src="/images/backgrounds/testimonials/testimonials-bg4.jpg"
                    alt="Testimonials Background"
                    className="w-full h-full object-cover"
                    blurEffect={true}
                    placeholderColor="#f8fafc"
                />
            </div>

            {/* Overlay for better readability - subtle for light mode, darker for dark mode */}
            <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/75 backdrop-blur-[1px] dark:backdrop-blur-[2px]"></div>

            {/* Additional decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 filter blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Glassmorphic section heading */}
                <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-2xl px-8 py-6 mb-12 border border-white/20 dark:border-gray-700/30 shadow-lg">
                    <SectionHeading
                        title="Client Testimonials"
                        subtitle="Hear what clients and collaborators have to say about working with me"
                        underlineWidth="w-32"
                        marginBottom="mb-4"
                        paddingTop="pt-2"
                        paddingBottom="pb-2"
                    />
                </div>

                {/* Testimonials Carousel */}
                <div
                    className="relative max-w-5xl mx-auto backdrop-blur-xl bg-white/40 dark:bg-gray-800/30 rounded-3xl p-8 mb-8 border border-white/20 dark:border-gray-700/30 shadow-xl"
                    ref={carouselRef}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="w-12 h-12 rounded-full border-4 border-gray-300 dark:border-gray-600 border-t-indigo-500 dark:border-t-indigo-400 animate-spin"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading testimonials...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg className="w-12 h-12 text-red-500 dark:text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-red-600 dark:text-red-400 font-medium mb-2">{error}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Using fallback testimonials instead.</p>
                        </div>
                    )}

                    {/* Testimonial Cards */}
                    {!isLoading && testimonials.length > 0 && (
                        <div className="relative overflow-hidden rounded-2xl">
                            <div
                                className={`transition-all duration-700 ease-in-out ${isDragging ? 'transition-none' : ''}`}
                                style={{
                                    transform: `translateX(calc(-${activeIndex * 100}% + ${currentTranslate}px))`,
                                    display: 'flex',
                                    willChange: 'transform', /* Performance optimization */
                                }}
                            >
                                {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="w-full flex-shrink-0 px-4 py-6"
                                >
                                    <div
                                        className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 relative overflow-hidden border border-white/30 dark:border-gray-700/30 transition-all duration-700 transform"
                                        style={{
                                            backdropFilter: 'blur(16px)',
                                            WebkitBackdropFilter: 'blur(16px)',
                                            animation: activeIndex === testimonial.id - 1 ? 'testimonialFadeIn 0.7s ease-out forwards' : 'none'
                                        }}
                                    >
                                        {/* Background gradient */}
                                        <div className="absolute inset-0 opacity-5 dark:opacity-10">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${getGradientStyle(testimonial.id)}`}></div>
                                        </div>

                                        {/* Decorative elements */}
                                        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 blur-xl"></div>
                                        <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 dark:from-cyan-500/10 dark:to-blue-500/10 blur-xl"></div>

                                        {/* Quote Icon */}
                                        <div className="absolute -top-4 -left-4 rounded-full p-3 z-10">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-90 blur-sm"></div>
                                                <div className="relative bg-white dark:bg-gray-800 rounded-full p-3">
                                                    <svg
                                                        className="w-6 h-6 text-indigo-500 dark:text-indigo-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rating Stars */}
                                        <div className="flex mb-4 justify-end">
                                            {renderStars(testimonial.rating)}
                                        </div>

                                        {/* Testimonial Content */}
                                        <p className="text-gray-700 dark:text-gray-200 mb-8 italic text-lg leading-relaxed relative z-10">
                                            "{testimonial.content}"
                                        </p>

                                        {/* Client Info */}
                                        <div className="flex items-center justify-between mt-8 relative z-10">
                                            <div className="flex items-center">
                                                {/* Profile Image with gradient border */}
                                                <div className="relative group">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 mr-4">
                                                        <LazyImage
                                                            src={testimonial.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0D8ABC&color=fff`}
                                                            alt={testimonial.name}
                                                            className="w-full h-full object-cover"
                                                            width={56}
                                                            height={56}
                                                            blurEffect={true}
                                                            onError={() => {
                                                                console.log(`Failed to load image for ${testimonial.name}: ${testimonial.profile_image}`);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {testimonial.role}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Company Logo with glassmorphism */}
                                            <div className="h-10 w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-200/50 dark:border-gray-700/30">
                                                <LazyLoad transitionType="fade" transitionDuration={500}>
                                                    <LazyImage
                                                        src={testimonial.company_logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.company)}&background=0D8ABC&color=fff&format=svg`}
                                                        alt={testimonial.company}
                                                        className="h-full object-contain dark:filter dark:brightness-90"
                                                        width={80}
                                                        height={40}
                                                        blurEffect={true}
                                                        onError={() => {
                                                            console.log(`Failed to load company logo for ${testimonial.company}: ${testimonial.company_logo}`);
                                                        }}
                                                    />
                                                </LazyLoad>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}

                    {/* Navigation Dots with gradient effect - only show when testimonials are loaded */}
                    {!isLoading && testimonials.length > 0 && (
                        <div className="flex items-center justify-center mt-10">
                            <div className="backdrop-blur-xl bg-white/50 dark:bg-gray-800/40 py-3 px-6 rounded-full flex space-x-2 border border-white/20 dark:border-gray-700/30 shadow-md">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`h-3 rounded-full transition-all duration-300 relative ${
                                        activeIndex === index ? 'w-10' : 'w-3'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-50 dark:opacity-30 blur-sm"></span>
                                    <span className={`absolute inset-0 rounded-full ${
                                        activeIndex === index
                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                            : 'bg-gray-400 dark:bg-gray-600'
                                    }`}></span>
                                </button>
                            ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation Arrows with glassmorphism - only show when testimonials are loaded */}
                    {!isLoading && testimonials.length > 0 && (
                        <>
                            <button
                                onClick={() => handleDotClick((activeIndex - 1 + testimonials.length) % testimonials.length)}
                                className="absolute top-1/2 -left-5 md:-left-10 transform -translate-y-1/2 backdrop-blur-xl bg-white/60 dark:bg-gray-800/50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none border border-white/20 dark:border-gray-700/30 group"
                                aria-label="Previous testimonial"
                                style={{
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDotClick((activeIndex + 1) % testimonials.length)}
                                className="absolute top-1/2 -right-5 md:-right-10 transform -translate-y-1/2 backdrop-blur-xl bg-white/60 dark:bg-gray-800/50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none border border-white/20 dark:border-gray-700/30 group"
                                aria-label="Next testimonial"
                                style={{
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlassmorphicTestimonialsSection;
