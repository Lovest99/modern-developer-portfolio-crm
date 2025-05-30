import { useState, useEffect } from 'react';
import TechBackground from './TechBackground';
import CodeGrid from './CodeGrid';
import SectionHeading from './SectionHeading';

export default function HeroSection() {
    return (
        <div className="relative w-full min-h-[85vh] md:h-[72vh] bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden flex items-center justify-center">
            {/* Tech-Oriented Developer Background */}
            <div className="absolute inset-0">
                {/* Base tech pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0,rgba(0,0,0,0)_70%)]"></div>

                {/* Circuit-like grid pattern */}
                <div className="absolute h-full w-full bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 dark:opacity-20"></div>

                {/* Code snippets in background */}
                <CodeGrid />

                {/* Animated tech symbols and binary */}
                <TechBackground />

                {/* Tech glow spots */}
                <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full bg-cyan-500/[0.03] dark:bg-cyan-400/[0.02] blur-3xl"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] rounded-full bg-purple-500/[0.03] dark:bg-purple-400/[0.02] blur-3xl"></div>
            </div>

            {/* Semi-transparent overlay to improve text visibility */}
            <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-[1px] z-[5]"></div>

            <div className="container mx-auto px-4 py-0 relative z-10 h-full flex items-start pt-[3vh] md:pt-[6vh]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center w-full">
                    {/* Portrait Side with Enhanced Creative Elements */}
                    <div className="relative lg:col-span-5 flex justify-center mt-4 md:mt-0">
                        {/* Portrait Frame with Interactive Elements */}
                        <div className="relative group portrait-container">
                            {/* Main Portrait with Animated Border */}
                            <div className="relative z-10 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden bg-white dark:bg-gray-800 shadow-xl transition-all duration-500 group-hover:shadow-cyan-500/20 dark:group-hover:shadow-cyan-400/20">
                                {/* Portrait Container with Gradient Border */}
                                <div className="absolute inset-[3px] rounded-full overflow-hidden p-1 bg-gradient-to-br from-cyan-400 via-purple-400 to-magenta-400 rotate-0 group-hover:rotate-180 transition-all duration-1000">
                                    {/* Portrait image */}
                                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 overflow-hidden">
                                        <img
                                            src="/images/potrait/portrait-hero.jpg"
                                            alt="Bright Cheteni - Full Stack Developer"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                // Replace with a gradient background and initials
                                                target.parentElement.innerHTML = `
                                                    <div class="w-full h-full bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-magenta-400/20 flex items-center justify-center">
                                                        <div class="relative">
                                                            <span class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-magenta-500">BC</span>
                                                            <div class="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-magenta-400 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                `;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Orbital Skill Rings - Reduced size */}
                            <div className="absolute inset-0 w-full h-full rounded-full border-2 border-dashed border-cyan-300/30 dark:border-cyan-700/30 rotate-0 group-hover:rotate-90 transition-all duration-1000"></div>
                            <div className="absolute inset-[-15px] w-[calc(100%+30px)] h-[calc(100%+30px)] rounded-full border-2 border-dashed border-purple-300/20 dark:border-purple-700/20 rotate-45 group-hover:rotate-180 transition-all duration-1500"></div>
                            <div className="absolute inset-[-30px] w-[calc(100%+60px)] h-[calc(100%+60px)] rounded-full border-2 border-dashed border-magenta-300/10 dark:border-magenta-700/10 rotate-90 group-hover:rotate-0 transition-all duration-2000"></div>

                            {/* Orbiting Skill Badges - Smaller size */}
                            <div className="animate-orbit orbit-badge-1 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-blue-500/50 dark:border-blue-600/50 transform transition-all duration-500 hover:scale-110 hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-blue-400/20 dark:hover:shadow-blue-500/20 z-10">
                                <img src="/images/stacklogos/phplogo.png" alt="PHP" />
                            </div>

                            <div className="animate-orbit orbit-badge-2 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-blue-400/50 dark:border-blue-500/50 transform transition-all duration-500 hover:scale-110 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-blue-400/20 dark:hover:shadow-blue-500/20 z-10">
                                <img src="/images/stacklogos/laravellogo.png" alt="Laravel" />
                            </div>

                            <div className="animate-orbit orbit-badge-3 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-gray-700/50 dark:border-gray-800/50 transform transition-all duration-500 hover:scale-110 hover:border-gray-700 dark:hover:border-gray-800 hover:shadow-gray-400/20 dark:hover:shadow-gray-500/20 z-10">
                                <img src="/images/stacklogos/flutterlogo.png" alt="Flutter" />
                            </div>

                            <div className="animate-orbit orbit-badge-4 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-yellow-500/50 dark:border-yellow-600/50 transform transition-all duration-500 hover:scale-110 hover:border-yellow-500 dark:hover:border-yellow-600 hover:shadow-yellow-400/20 dark:hover:shadow-yellow-500/20 z-10">
                                <img src="/images/stacklogos/java-logo.png" alt="MySQL" />
                            </div>

                            <div className="animate-orbit orbit-badge-5 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-blue-600/50 dark:border-blue-700/50 transform transition-all duration-500 hover:scale-110 hover:border-blue-600 dark:hover:border-blue-700 hover:shadow-blue-400/20 dark:hover:shadow-blue-500/20 z-10">
                                <img src="/images/stacklogos/reactjs.png" alt="React" />
                            </div>

                            <div className="animate-orbit orbit-badge-6 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-purple-500/50 dark:border-purple-600/50 transform transition-all duration-500 hover:scale-110 hover:border-purple-500 dark:hover:border-purple-600 hover:shadow-purple-400/20 dark:hover:shadow-purple-500/20 z-10">
                                <img src="/images/stacklogos/pythonlogo.png" alt="Python" />
                            </div>

                            <div className="animate-orbit orbit-badge-7 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-green-500/50 dark:border-green-600/50 transform transition-all duration-500 hover:scale-110 hover:border-green-500 dark:hover:border-green-600 hover:shadow-green-400/20 dark:hover:shadow-green-500/20 z-10">
                                <img src="/images/stacklogos/supabase-logo.png" alt="Supabase" />
                            </div>

                            {/* Node.js Badge */}
                            <div className="animate-orbit orbit-badge-8 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-green-600/50 dark:border-green-700/50 transform transition-all duration-500 hover:scale-110 hover:border-green-600 dark:hover:border-green-700 hover:shadow-green-400/20 dark:hover:shadow-green-500/20 z-10">
                                <img src="/images/stacklogos/agent-development-kit-logo.png" alt="Google ADK" />
                            </div>

                            {/* TypeScript Badge */}
                            <div className="animate-orbit orbit-badge-9 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-blue-500/50 dark:border-blue-600/50 transform transition-all duration-500 hover:scale-110 hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-blue-400/20 dark:hover:shadow-blue-500/20 z-10">
                                <img src="/images/stacklogos/typescript-logonew.png" alt="TypeScript" />
                            </div>

                            {/* ChatGPT Badge */}
                            <div className="animate-orbit orbit-badge-10 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-green-500/50 dark:border-green-600/50 transform transition-all duration-500 hover:scale-110 hover:border-green-500 dark:hover:border-green-600 hover:shadow-green-400/20 dark:hover:shadow-green-500/20 z-10">
                                <img src="/images/stacklogos/chatgpt-logo.png" alt="ChatGPT" />
                            </div>

                            {/* n8n Badge */}
                            <div className="animate-orbit orbit-badge-11 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-orange-500/50 dark:border-orange-600/50 transform transition-all duration-500 hover:scale-110 hover:border-orange-500 dark:hover:border-orange-600 hover:shadow-orange-400/20 dark:hover:shadow-orange-500/20 z-10">
                                <img src="/images/stacklogos/n8n-logo.png" alt="n8n" />
                            </div>

                            {/* JavaScript Badge */}
                            <div className="animate-orbit orbit-badge-12 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-red-600/50 dark:border-red-700/50 transform transition-all duration-500 hover:scale-110 hover:border-red-600 dark:hover:border-red-700 hover:shadow-red-400/20 dark:hover:shadow-red-500/20 z-10">
                                <img src="/images/stacklogos/js-logo-modified.png" alt="JavaScript" />
                            </div>

                            {/* Orbital Path Indicators - Reduced size */}
                            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                                <defs>
                                    <linearGradient id="orbit-path-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(6, 182, 212, 0.05)" />
                                        <stop offset="25%" stopColor="rgba(168, 85, 247, 0.05)" />
                                        <stop offset="50%" stopColor="rgba(236, 72, 153, 0.05)" />
                                        <stop offset="75%" stopColor="rgba(168, 85, 247, 0.05)" />
                                        <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
                                    </linearGradient>
                                </defs>
                                {/* Subtle orbital path indicators - responsive */}
                                <circle cx="50%" cy="50%" r="100" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 md:hidden" />
                                <circle cx="50%" cy="50%" r="110" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 md:hidden" />
                                <circle cx="50%" cy="50%" r="120" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 md:hidden" />
                                <circle cx="50%" cy="50%" r="130" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 md:hidden" />

                                <circle cx="50%" cy="50%" r="130" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 hidden md:block lg:hidden" />
                                <circle cx="50%" cy="50%" r="140" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 hidden md:block lg:hidden" />
                                <circle cx="50%" cy="50%" r="150" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 hidden md:block lg:hidden" />
                                <circle cx="50%" cy="50%" r="160" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 hidden md:block lg:hidden" />

                                <circle cx="50%" cy="50%" r="150" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 hidden lg:block" />
                                <circle cx="50%" cy="50%" r="160" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 hidden lg:block" />
                                <circle cx="50%" cy="50%" r="170" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 hidden lg:block" />
                                <circle cx="50%" cy="50%" r="180" fill="none" stroke="url(#orbit-path-gradient)" strokeWidth="1" strokeDasharray="3,3" className="opacity-15 dark:opacity-10 hidden lg:block" />
                            </svg>
                        </div>
                    </div>

                    {/* Content Side with Enhanced Typography and Animations */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="space-y-3">
                            {/* Enhanced Professional Title - Mobile Optimized */}
                            <div className="overflow-hidden">
                                <div className="animate-slide-up">
                                    <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full
                                        bg-gradient-to-r from-white/25 via-cyan-500/20 to-purple-500/20 dark:from-gray-900/50 dark:via-cyan-900/40 dark:to-purple-900/40
                                        border border-white/40 dark:border-cyan-700/50
                                        shadow-lg shadow-cyan-500/25 dark:shadow-cyan-400/25
                                        backdrop-blur-xl
                                        text-cyan-600 dark:text-cyan-300 text-xs sm:text-sm font-medium mb-2 sm:mb-3
                                        group hover:shadow-xl hover:shadow-cyan-500/40 dark:hover:shadow-cyan-400/40 hover:border-white/50 dark:hover:border-cyan-600/60
                                        hover:bg-gradient-to-r hover:from-white/30 hover:via-cyan-500/25 hover:to-purple-500/25
                                        dark:hover:from-gray-900/60 dark:hover:via-cyan-900/50 dark:hover:to-purple-900/50
                                        transition-all duration-500
                                        relative overflow-hidden
                                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:blur-xl before:opacity-0
                                        hover:before:opacity-100 before:transition-opacity before:duration-1000">

                                        {/* Animated dot indicator */}
                                        <span className="relative w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 dark:from-cyan-300 dark:to-purple-300 mr-1.5 sm:mr-2
                                            before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-cyan-400 dark:before:bg-cyan-300
                                            before:animate-ping before:opacity-75">
                                        </span>

                                        {/* Code bracket icon */}
                                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>

                                        {/* Title with typing effect */}
                                        <span className="font-semibold tracking-wide text-[10px] sm:text-xs">
                                            <span className="text-gray-800 dark:text-white">Full Stack Developer</span> <span className="text-purple-500 dark:text-purple-400">&</span> <span className="relative">
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-magenta-500 to-cyan-500 animate-gradient-text font-bold">AI Specialist</span>
                                                <span className="absolute -right-1 top-0 h-full w-1 bg-purple-500 dark:bg-purple-400 animate-cursor"></span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Heading with Animated Gradient - Mobile Optimized */}
                            <div className="overflow-hidden">
                                <h1 className="animate-slide-up animation-delay-150 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight drop-shadow-sm">
                                    Building <span className="text-transparent bg-clip-text animate-gradient-text bg-gradient-to-r from-cyan-500 via-purple-500 to-magenta-500">digital experiences</span> that make an impact
                                </h1>
                            </div>

                            {/* Description with Animation - Mobile Optimized */}
                            <div className="overflow-hidden">
                                <p className="animate-slide-up animation-delay-300 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 max-w-2xl font-medium">
                                    I'm Bright, a software engineer specializing in building exceptional digital experiences.
                                    Currently, I'm focused on creating accessible, human-centered products at Sichel Technologies.
                                </p>
                            </div>

                            {/* CTA Buttons with Hover Effects - Mobile Optimized */}
                            <div className="overflow-hidden pt-3">
                                <div className="animate-slide-up animation-delay-450 grid grid-cols-2 sm:flex flex-wrap gap-2">
                                    <a
                                        href="/contact"
                                        className="group relative px-3 sm:px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-magenta-500 hover:from-cyan-600 hover:via-purple-600 hover:to-magenta-600 text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center overflow-hidden text-xs sm:text-sm"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Get in Touch
                                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
                                            </svg>
                                        </span>
                                        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    </a>
                                    <a
                                        href="/portfolio"
                                        className="group relative px-3 sm:px-5 py-2.5 bg-transparent border border-gray-300 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden text-xs sm:text-sm"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            View Projects
                                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-1 sm:ml-2 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </span>
                                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-magenta-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </a>
                                    <a
                                        href="/resume"
                                        className="group relative px-3 sm:px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden text-xs sm:text-sm"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            View Resume
                                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 via-magenta-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </a>

                                    <a
                                        href="/download/cv"
                                        className="group relative px-3 sm:px-5 py-2.5 bg-gradient-to-r from-purple-500 to-magenta-500 hover:from-purple-600 hover:to-magenta-600 text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-magenta-500/20 flex items-center justify-center overflow-hidden text-xs sm:text-sm"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Download CV
                                            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-1 sm:ml-2 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </span>
                                        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                    </a>
                                </div>
                            </div>

                            {/* Social Links with Hover Effects - Mobile Optimized */}
                            <div className="overflow-hidden pt-3">
                                <div className="animate-slide-up animation-delay-600">
                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                        <span className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2 md:mb-0">Follow me:</span>

                                        {/* Mobile view: Scrollable row */}
                                        <div className="md:hidden">
                                            <div className="flex overflow-x-auto pb-2 gap-2 snap-x scrollbar-hide">
                                                {/* GitHub Link */}
                                                <a href="https://github.com/Lovest99/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-center w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                    <img src="/images/socials/github1.png" alt="GitHub" className="w-5 h-5" />
                                                </a>
                                                {/* LinkedIn Link */}
                                                <a href="https://www.linkedin.com/in/bright-cheteni-6a2597177" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-center w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                    <img src="/images/socials/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                                                </a>
                                                {/* Instagram Link */}
                                                <a href="https://www.instagram.com/your_fav_tech_guy/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-center w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                    <img src="/images/socials/iglogo.png" alt="Instagram" className="w-5 h-5" />
                                                </a>
                                                {/* Facebook Link */}
                                                <a href="https://www.facebook.com/bright.cheteni/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-center w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                    <img src="/images/socials/fb1.png" alt="Facebook" className="w-5 h-5" />
                                                </a>
                                                {/* WhatsApp Link */}
                                                <a href="https://wa.link/69rt13" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-center w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                    <img src="/images/socials/whatsapplogo.png" alt="WhatsApp" className="w-5 h-5" />
                                                </a>
                                                {/* X (formerly Twitter) Link */}
                                                <a href="https://x.com/fav_tech_guy/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-center w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                    <img src="/images/socials/xlogo.png" alt="Twitter" className="w-5 h-5" />
                                                </a>
                                                {/* Threads Link */}
                                                <a href="https://www.threads.com/@your_fav_tech_guy" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-center w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                    <img src="/images/socials/threads-logo.png" alt="Threads" className="w-5 h-5" />
                                                </a>
                                                {/* YouTube Link */}
                                                <a href="https://www.youtube.com/@lovestonthebeat" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 snap-center w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                    <img src="/images/socials/youtube-play-button.png" alt="YouTube" className="w-5 h-5" />
                                                </a>
                                            </div>
                                            {/* Scroll indicator */}
                                            <div className="flex justify-center mt-2">
                                                <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div className="w-4 h-full bg-cyan-500 dark:bg-cyan-400 rounded-full animate-pulse-slow"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop view: Single row */}
                                        <div className="hidden md:flex flex-row flex-wrap gap-3">
                                            {/* GitHub Link */}
                                            <a href="https://github.com/Lovest99/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                <img src="/images/socials/github1.png" alt="GitHub" className="w-6 h-6" />
                                            </a>
                                            {/* LinkedIn Link */}
                                            <a href="https://www.linkedin.com/in/bright-cheteni-6a2597177" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                <img src="/images/socials/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
                                            </a>
                                            {/* Instagram Link */}
                                            <a href="https://www.instagram.com/your_fav_tech_guy/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                <img src="/images/socials/iglogo.png" alt="Instagram" className="w-6 h-6" />
                                            </a>
                                            {/* Facebook Link */}
                                            <a href="https://www.facebook.com/bright.cheteni/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                <img src="/images/socials/fb1.png" alt="Facebook" className="w-6 h-6" />
                                            </a>
                                            {/* WhatsApp Link */}
                                            <a href="https://wa.link/69rt13" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                <img src="/images/socials/whatsapplogo.png" alt="WhatsApp" className="w-6 h-6" />
                                            </a>
                                            {/* X (formerly Twitter) Link */}
                                            <a href="https://x.com/fav_tech_guy/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                <img src="/images/socials/xlogo.png" alt="Twitter" className="w-6 h-6" />
                                            </a>
                                            {/* Threads Link */}
                                            <a href="https://www.threads.com/@your_fav_tech_guy" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                <img src="/images/socials/threads-logo.png" alt="Threads" className="w-6 h-6" />
                                            </a>
                                            {/* YouTube Link */}
                                            <a href="https://www.youtube.com/@lovestonthebeat" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300">
                                                <img src="/images/socials/youtube-play-button.png" alt="YouTube" className="w-6 h-6" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Arrow Scroll Indicator with Link to About Page - Mobile Optimized */}
            <div className="absolute bottom-2 md:bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <a href="/about" className="group flex flex-col items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-[8px] sm:text-[10px] mb-0.5 font-medium tracking-wider group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">SCROLL</span>
                    <div className="flex flex-col items-center animate-bounce">
                        <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    );
}
