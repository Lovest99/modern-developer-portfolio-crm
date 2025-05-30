import { useEffect } from 'react';
import { router } from '@inertiajs/react';

/**
 * Hook to handle mobile navigation cleanup
 * Returns a function that can be used to close mobile menus when navigating
 */
export function useMobileNavigation() {
  // Listen for Inertia navigation events to close mobile menus
  useEffect(() => {
    const handleStart = () => {
      // This is where we would close any open mobile menus
      // when navigation starts
      document.documentElement.classList.add('navigation-in-progress');
    };

    const handleFinish = () => {
      document.documentElement.classList.remove('navigation-in-progress');
    };

    router.on('start', handleStart);
    router.on('finish', handleFinish);

    return () => {
      router.off('start', handleStart);
      router.off('finish', handleFinish);
    };
  }, []);

  // Return a cleanup function that can be called when clicking on navigation items
  return () => {
    // This function can be used in onClick handlers to close menus
    // before navigation happens
  };
}
