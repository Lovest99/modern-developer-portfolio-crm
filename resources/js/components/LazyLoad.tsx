import React, { useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
    children: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
    className?: string;
    transitionDuration?: number;
    transitionDelay?: number;
    transitionType?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'none';
}

const LazyLoad: React.FC<LazyLoadProps> = ({
    children,
    threshold = 0.1,
    rootMargin = '0px',
    className = '',
    transitionDuration = 800,
    transitionDelay = 0,
    transitionType = 'fade',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true);
                    // Once the element has been observed and animation triggered, we can unobserve it
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, rootMargin, hasAnimated]);

    // Define transition styles based on the transition type
    const getTransitionStyles = () => {
        const baseStyles = {
            opacity: isVisible ? 1 : 0,
            transition: `all ${transitionDuration}ms ease-out ${transitionDelay}ms`,
        };

        if (transitionType === 'none') {
            return {};
        }

        if (transitionType === 'fade') {
            return baseStyles;
        }

        if (transitionType === 'slide-up') {
            return {
                ...baseStyles,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            };
        }

        if (transitionType === 'slide-down') {
            return {
                ...baseStyles,
                transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
            };
        }

        if (transitionType === 'slide-left') {
            return {
                ...baseStyles,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            };
        }

        if (transitionType === 'slide-right') {
            return {
                ...baseStyles,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
            };
        }

        if (transitionType === 'zoom') {
            return {
                ...baseStyles,
                transform: isVisible ? 'scale(1)' : 'scale(0.8)',
            };
        }

        return baseStyles;
    };

    return (
        <div
            ref={ref}
            className={className}
            style={getTransitionStyles()}
        >
            {children}
        </div>
    );
};

export default LazyLoad;
