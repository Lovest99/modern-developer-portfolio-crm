import React, { useState, useEffect } from 'react';

export default function MinimalisticAboutSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`lg:w-5/12 flex flex-col transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Profile Image with 3D Effects - Background animations removed */}
            <div className="relative mb-12">

                {/* Modern Image Container with Glassmorphism */}
                <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1.5 border border-white/30 dark:border-gray-700/30 shadow-xl group">
                    {/* Animated Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 dark:from-cyan-400/50 dark:via-blue-400/50 dark:to-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                    <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden aspect-[4/5]">
                        <img
                            src="/images/potrait/portrait-hero.jpg"
                            alt="Bright Cheteni - Full Stack Developer"
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.parentElement.innerHTML = `
                                    <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                                        <div class="text-center p-8">
                                            <div class="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">BC</div>
                                            <div class="mt-4 text-gray-500 dark:text-gray-400 font-medium">Software Engineer & AI Specialist</div>
                                        </div>
                                    </div>
                                `;
                            }}
                        />

                        {/* Enhanced Decorative Elements */}
                        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 dark:border-cyan-400/30 rounded-tr-xl group-hover:border-cyan-500/60 dark:group-hover:border-cyan-400/60 transition-colors duration-300"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-purple-500/30 dark:border-purple-400/30 rounded-bl-xl group-hover:border-purple-500/60 dark:group-hover:border-purple-400/60 transition-colors duration-300"></div>

                        {/* New Corner Accents */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/20 dark:border-blue-400/20 rounded-tl-xl group-hover:border-blue-500/40 dark:group-hover:border-blue-400/40 transition-colors duration-300"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500/20 dark:border-blue-400/20 rounded-br-xl group-hover:border-blue-500/40 dark:group-hover:border-blue-400/40 transition-colors duration-300"></div>

                        {/* Hover Overlay with Subtle Info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white text-xl font-bold">Bright Cheteni</h3>
                                <p className="text-gray-200 text-sm">Full Stack Developer & AI Specialist</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="absolute -top-2 -right-2 z-20">
                    <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        <span className="relative z-10">Available for Remote Work</span>
                        <span className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></span>
                    </div>
                </div>
            </div>

            {/* Social Media Links with Branded Colors - Background animation removed */}
            <div className="mb-12 relative">

                <div className="relative">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-5 flex items-center">
                        <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 mr-3"></span>
                        Connect With Me
                        <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 ml-3"></span>
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {/* WhatsApp */}
                        <a
                            href="https://wa.link/69rt13"  // Replace with your actual WhatsApp link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:shadow-gray-500/5 transition-all duration-300 group"
                        >
                            <img
                                src="/images/socials/whatsapp1.png" // Update with your actual image filename and path
                                alt="WhatsApp Logo"
                                className="w-5 h-5 transition-colors group-hover:shadow-md group-hover:shadow-gray-500/5"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#333] dark:group-hover:text-white transition-colors">WhatsApp</span>
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/your_fav_tech_guy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 hover:border-cyan-500/30 dark:hover:border-cyan-400/30 hover:shadow-md hover:shadow-cyan-500/5 transition-all duration-300 group"
                        >
                            <img
                                src="/images/socials/iglogo.png" // Update with your actual image filename
                                alt="Instagram Logo"
                                className="w-5 h-5 transition-colors group-hover:shadow-md group-hover:shadow-cyan-500/5"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">Insta</span>
                        </a>

                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/in/bright-cheteni-6a2597177/" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 hover:border-[#0A66C2]/30 dark:hover:border-[#0A66C2]/30 hover:shadow-md hover:shadow-[#0A66C2]/5 transition-all duration-300 group">
                            <svg className="w-5 h-5 text-[#0A66C2] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#0A66C2] transition-colors">LinkedIn</span>
                        </a>

                        {/* Facebook */}
                        <a href="https://www.facebook.com/bright.cheteni/" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 hover:border-gray-400/30 dark:hover:border-gray-400/30 hover:shadow-md transition-all duration-300 group">
                            <svg className="w-5 h-5 text-[#3b5998] dark:text-[#3b5998] group-hover:text-black dark:group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.35C0 23.4.6 24 1.325 24h11.49v-9.293H9.693v-3.622h3.121V8.41c0-3.078 1.49-4.79 4.746-4.79 1.305 0 2.685.241 2.685.241v2.939h-1.5c-1.475 0-1.925.916-1.925 1.852v2.073h3.276l-.524 3.622h-2.752V24h5.314c.725 0 1.325-.6 1.325-1.325V1.325C24 .6 23.4 0 22.675 0z"/>
                            </svg>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">Facebook</span>
                        </a>


                    </div>
                </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginTop: '20px' }}>
                {/* View Resume Button */}
                <a href="/resume" className="group relative flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="relative z-10 text-base">View Resume</span>
                </a>

                {/* Download CV Button */}
                <a href="/download/cv" className="group relative flex items-center justify-center gap-3 py-4 px-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-cyan-300 dark:hover:border-cyan-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-5 w-5 group-hover:animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="relative z-10 text-base">Download CV</span>
                </a>

                {/* Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full transform rotate-12 shadow-lg">
                    <span className="relative z-10">Updated!</span>
                </div>
            </div>
        </div>
    );
}
