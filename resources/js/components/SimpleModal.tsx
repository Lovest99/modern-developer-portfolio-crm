import React from 'react';
import { motion } from 'framer-motion';

interface SimpleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: {
        title: string;
        description: string;
    }[];
}

const SimpleModal: React.FC<SimpleModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    icon,
    details
}) => {
    console.log('SimpleModal render:', { isOpen, title });

    if (!isOpen) {
        console.log('SimpleModal not showing - isOpen is false');
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop with subtle blur */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Modal container with improved animation */}
            <motion.div
                className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl mx-auto my-8 z-10"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Header with enhanced gradient */}
                <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                                <div className="h-8 w-8 text-white">
                                    {icon}
                                </div>
                            </div>
                            <h3 className="ml-4 text-xl font-bold text-white">
                                {title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content with improved spacing and scrolling */}
                <div className="px-6 py-6 sm:px-8 max-h-[60vh] overflow-y-auto">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed">
                        {description}
                    </p>

                    <div className="space-y-5">
                        {details.map((detail, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-700/80 p-5 rounded-xl border border-gray-100 dark:border-gray-600/20 hover:shadow-md transition-shadow duration-300"
                            >
                                <h4 className="font-medium text-cyan-600 dark:text-cyan-400 mb-2 text-lg">
                                    {detail.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-base">
                                    {detail.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer with CTA and close button */}
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 sm:px-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 border-t border-gray-100 dark:border-gray-700">
                    {/* CTA Button */}
                    <a
                        href={`/contact?service=${encodeURIComponent(title)}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:from-purple-500 hover:to-indigo-500 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                    >
                        <span>Inquire about {title}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800"
                    >
                        <span>Close</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default SimpleModal;
