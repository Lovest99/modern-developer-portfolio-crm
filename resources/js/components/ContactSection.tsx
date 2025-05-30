import React, { useState, useEffect } from 'react';
import TechSectionBackground from './TechSectionBackground';
import SectionHeading from './SectionHeading';

interface ContactSectionProps {
    initialService?: string | null;
}

export default function ContactSection({ initialService = null }: ContactSectionProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: initialService ? 'Service Inquiry' : '',
        message: initialService ? `I'm interested in your "${initialService}" service and would like to learn more.` : ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading effect
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');

            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Reset status after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        }, 1500);
    };

    return (
        <section className="bg-gray-50/50 dark:bg-gray-900/50 relative" id="contact">
            {/* Tech-oriented background */}
            <TechSectionBackground variant="tertiary" intensity="medium" showCodeSnippets={true} showAnimations={true} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    title="Get In Touch"
                    subtitle="Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!"
                    gradientFrom="cyan-600"
                    gradientVia="blue-600"
                    gradientTo="purple-600"
                    darkFrom="cyan-400"
                    darkVia="blue-400"
                    darkTo="purple-400"
                    underlineWidth="w-24"
                    paddingTop="pt-16"
                    paddingBottom="pb-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information with Modern Design */}
                    <div className="relative">
                        {/* Animated Background Elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

                        <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-lg h-full transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30 dark:border-cyan-400/30 rounded-tr-xl"></div>
                            <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-purple-500/30 dark:border-purple-400/30 rounded-bl-xl"></div>

                            <div className="relative">
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-8">Contact Information</h3>

                                <div className="space-y-8">
                                    {/* Email with Modern Design */}
                                    <div className="flex items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 dark:from-cyan-400/10 dark:to-blue-400/10 rounded-xl flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 dark:group-hover:from-cyan-400/20 dark:group-hover:to-blue-400/20 transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email</h4>
                                            <a href="mailto:brightchetenidev@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                                                brightchetenidev@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone with Modern Design */}
                                    <div className="flex items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-400/10 dark:to-pink-400/10 rounded-xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 dark:group-hover:from-purple-400/20 dark:group-hover:to-pink-400/20 transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h4>
                                            <a href="tel:+263787679376" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                                +263 78 767 9376
                                            </a>
                                        </div>
                                    </div>

                                    {/* Location with Modern Design */}
                                    <div className="flex items-start group">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-indigo-500/30 dark:group-hover:from-blue-400/20 dark:group-hover:to-indigo-400/20 transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Location</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Bulawayo, Zimbabwe
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Modern Social Media Links */}
                                <div className="mt-12">
                                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-5 flex items-center">
                                        <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 mr-3"></span>
                                        Connect with me
                                    </h4>
                                    <div className="flex space-x-4">
                                        <a
                                            href="https://github.com/Lovest99/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md transition-all duration-300"
                                            aria-label="GitHub"
                                        >
                                            <svg className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/bright-cheteni-6a2597177/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#0A66C2]/30 dark:hover:border-[#0A66C2]/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            aria-label="LinkedIn"
                                        >
                                            <svg className="h-5 w-5 text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://x.com/fav_tech_guy/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#1DA1F2]/30 dark:hover:border-[#1DA1F2]/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            aria-label="Twitter"
                                        >
                                            <svg className="h-5 w-5 text-[#1DA1F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.instagram.com/your_fav_tech_guy/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#E1306C]/30 dark:hover:border-[#E1306C]/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            aria-label="Instagram"
                                        >
                                            <svg className="h-5 w-5 text-[#E1306C] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.facebook.com/bright.cheteni/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#1877F2]/30 dark:hover:border-[#1877F2]/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            aria-label="Facebook"
                                        >
                                            <svg className="h-5 w-5 text-[#1877F2] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://wa.link/69rt13"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#25D366]/30 dark:hover:border-[#25D366]/30 shadow-sm hover:shadow-md transition-all duration-300"
                                            aria-label="WhatsApp"
                                        >
                                            <svg className="h-5 w-5 text-[#25D366] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modern Contact Form with Glassmorphism */}
                    <div className="relative">
                        {/* Animated Background Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-pink-500/10 via-rose-500/5 to-transparent rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

                        <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/80 dark:border-gray-700/80 shadow-lg transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
                            {/* Decorative Elements */}
                            <div className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 border-blue-500/30 dark:border-blue-400/30 rounded-tl-xl"></div>
                            <div className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 border-pink-500/30 dark:border-pink-400/30 rounded-br-xl"></div>

                            <div className="relative">
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-8">Send Me a Message</h3>

                                {submitStatus === 'success' ? (
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-8 text-center">
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold text-green-800 dark:text-green-300 mb-3">Message Sent Successfully!</h4>
                                        <p className="text-green-700 dark:text-green-400 mb-6">
                                            Thank you for reaching out. I'll get back to you as soon as possible.
                                        </p>
                                        <button
                                            onClick={() => setSubmitStatus('idle')}
                                            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transition-all duration-300"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className={`space-y-6 ${initialService ? 'relative' : ''}`}>
                                        {initialService && (
                                            <>
                                                <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-xl animate-pulse-slow pointer-events-none"></div>
                                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl p-4 mb-6">
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-3">
                                                            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">Service Inquiry</h3>
                                                            <div className="mt-1 text-sm text-purple-700 dark:text-purple-400">
                                                                You're inquiring about the <span className="font-semibold">"{initialService}"</span> service. Feel free to modify the message below.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                                    Your Name
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                        placeholder="Bright Cheteni"
                                                    />
                                                </div>
                                            </div>
                                            <div className="group">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                                    Your Email
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                        placeholder="bright@mail.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                                Subject
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <select
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 appearance-none"
                                                >
                                                    <option value="">Select a subject</option>
                                                    <option value="Service Inquiry">Service Inquiry</option>
                                                    <option value="Project Inquiry">Project Inquiry</option>
                                                    <option value="Job Opportunity">Job Opportunity</option>
                                                    <option value="Collaboration">Collaboration</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                                                Message
                                            </label>
                                            <div className="relative">
                                                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={5}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                                    placeholder="Your message here..."
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group relative w-full px-6 py-3.5 text-base font-medium rounded-xl text-white overflow-hidden shadow-lg transition-all duration-300"
                                            >
                                                {/* Button Background with Animation */}
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500"></div>
                                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                                                <span className="relative z-10 flex items-center justify-center">
                                                    {isSubmitting ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                            </svg>
                                                            Send Message
                                                        </>
                                                    )}
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

