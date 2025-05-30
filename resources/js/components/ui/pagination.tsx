import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/solid';

export function Pagination({ links, className = '' }) {
  // Don't render pagination if there's only 1 page
  if (links.length <= 3) {
    return null;
  }

  return (
    <nav
      className={`relative z-0 inline-flex rounded-md shadow-sm -space-x-px ${className}`}
      aria-label="Pagination"
    >
      {links.map((link, i) => {
        // Previous link
        if (i === 0) {
          return (
            <Link
              key={i}
              href={link.url ?? '#'}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                link.url
                  ? 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                  : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          );
        }

        // Next link
        if (i === links.length - 1) {
          return (
            <Link
              key={i}
              href={link.url ?? '#'}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                link.url
                  ? 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                  : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          );
        }

        // Page links
        return (
          <Link
            key={i}
            href={link.url ?? '#'}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : link.url
                ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        );
      })}
    </nav>
  );
}
