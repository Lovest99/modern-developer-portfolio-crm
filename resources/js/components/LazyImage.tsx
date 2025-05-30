import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholderColor?: string;
    width?: number | string;
    height?: number | string;
    threshold?: number;
    rootMargin?: string;
    blurEffect?: boolean;
    loadingAnimation?: boolean;
    onLoad?: () => void;
    onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    placeholderColor = '#f3f4f6',
    width,
    height,
    threshold = 0.1,
    rootMargin = '100px',
    blurEffect = true,
    loadingAnimation = true,
    onLoad,
    onError,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [threshold, rootMargin]);

    const handleImageLoad = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
    };

    const handleImageError = () => {
        setError(true);
        console.error(`Failed to load image: ${src}`);
        if (onError) onError();
    };

    // Generate a low-quality placeholder
    const generatePlaceholder = () => {
        if (typeof width === 'number' && typeof height === 'number') {
            return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${placeholderColor.replace('#', '%23')}'/%3E%3C/svg%3E`;
        }
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='${placeholderColor.replace('#', '%23')}'/%3E%3C/svg%3E`;
    };

    // Placeholder for error state
    const errorPlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f87171'%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z'/%3E%3C/svg%3E`;

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{
                width: width || 'auto',
                height: height || 'auto',
                backgroundColor: placeholderColor,
            }}
        >
            {/* Loading animation */}
            {!isLoaded && loadingAnimation && isInView && !error && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            {/* The actual image */}
            <img
                ref={imgRef}
                src={isInView ? src : generatePlaceholder()}
                data-src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                } ${blurEffect && !isLoaded ? 'blur-sm' : 'blur-0'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
            />

            {/* Error state */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20">
                    <img src={errorPlaceholder} alt="Error loading image" className="w-12 h-12 mb-2" />
                    <p className="text-sm text-red-500 dark:text-red-400">Failed to load image</p>
                    <p className="text-xs text-red-400 dark:text-red-300 mt-1 max-w-[90%] text-center overflow-hidden text-ellipsis">
                        {src && src.length > 30 ? `${src.substring(0, 30)}...` : src}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LazyImage;
