import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

interface ServiceModalProps {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: {
        title: string;
        description: string;
    }[];
}

const ServiceModal: React.FC<ServiceModalProps> = ({
    isOpen,
    closeModal,
    title,
    description,
    icon,
    details
}) => {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={closeModal}
            >
                <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* Overlay without blur */}
                        <Dialog.Overlay className="fixed inset-0 bg-gray-900/75 dark:bg-gray-900/90 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:h-screen sm:align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
                            {/* Modal header with gradient background */}
                            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 px-6 py-5 sm:px-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                                            <div className="h-8 w-8 text-white">
                                                {icon}
                                            </div>
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="ml-4 text-xl font-bold text-white"
                                        >
                                            {title}
                                        </Dialog.Title>
                                    </div>
                                    <button
                                        type="button"
                                        className="rounded-full bg-white/10 p-1 text-white hover:bg-white/20 focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Modal content */}
                            <div className="px-6 py-5 sm:px-8 bg-white dark:bg-gray-800">
                                <p className="text-gray-700 dark:text-gray-300 mb-6">
                                    {description}
                                </p>

                                <div className="space-y-4">
                                    {details.map((detail, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + index * 0.1 }}
                                            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl"
                                        >
                                            <h4 className="font-medium text-cyan-600 dark:text-cyan-400 mb-1">
                                                {detail.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                {detail.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Modal footer */}
                            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 sm:px-8 flex justify-end">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-sm hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300"
                                    onClick={closeModal}
                                    ref={cancelButtonRef}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ServiceModal;
