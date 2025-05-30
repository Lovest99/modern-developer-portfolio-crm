import { useState, useEffect } from 'react';

export function useWindowScroll() {
    const [scrollPosition, setScrollPosition] = useState({
        scrollX: typeof window !== 'undefined' ? window.scrollX : 0,
        scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition({
                scrollX: window.scrollX,
                scrollY: window.scrollY,
            });
        };

        // Add event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Call handler right away to update scroll position
        handleScroll();

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty array ensures effect is only run on mount and unmount

    return scrollPosition;
}
