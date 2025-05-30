import React, { useState, useEffect } from 'react';
import TechSectionBackground from './TechSectionBackground';
import GlassmorphismBackground from './GlassmorphismBackground';
import TechIconsBackground from './TechIconsBackground';
import SectionHeading from './SectionHeading';

interface ProjectProps {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link?: string;
    github?: string;
    category: 'web' | 'website' | 'ai' | 'all';
}

const projects: ProjectProps[] = [
    {
        title: "AI Pneumonia Detection System",
        description: "An AI-powered medical diagnostic tool that detects pneumonia from chest X-rays with 92% accuracy. Built as part of my thesis project using convolutional neural networks and deep learning techniques.",
        image: "/images/projects/pneumonia-detector.png",
        technologies: ["Python", "TensorFlow", "Flask", "CNN", "OpenCV", "HTML/CSS", "JavaScript"],
        link: "https://www.webspectit.com",
        github: "https://github.com/brightcheteni/pneumonia-detection",
        category: "ai"
    },
    {
        title: "ZETDC AI-Powered Chatbot",
        description: "An intelligent virtual assistant for Zimbabwe Electricity Transmission & Distribution Company with voice support. Helps customers with billing inquiries, power outage reporting, and service requests.",
        image: "/images/projects/zesa-chatbot.png",
        technologies: ["Python", "Natural Language Processing", "Speech Recognition", "TensorFlow", "Flask", "WebSockets"],
        link: "https://bot.webspectit.com",
        github: "https://github.com/brightcheteni/zetdc-chatbot",
        category: "ai"
    },
    {
        title: "Smart Schools Management ERP",
        description: "A comprehensive school management system with web portal and mobile app. Features include student information management, attendance tracking, grade management, fee collection, and parent communication.",
        image: "/images/projects/smart-schools.png",
        technologies: ["React", "Laravel", "JavaScript", "MySQL", "REST APIs", "Mobile App Development"],
        link: "https://schools.webspectit.com/",
        github: "https://github.com/brightcheteni/smart-schools",
        category: "web"
    },
    {
        title: "Venice Mine Documentation System",
        description: "A document management system for Venice Mine with version control, access permissions, and workflow automation. Streamlines document approval processes and ensures regulatory compliance.",
        image: "/images/projects/venice-document-management-sys.png",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Document Processing"],
        link: "https://veniceminecomplex.cloud/",
        github: "https://github.com/brightcheteni/venice-docs",
        category: "web"
    },
    {
        title: "Pulse Smart Irrigation App",
        description: "A mobile application for automated irrigation control based on soil moisture, weather forecasts, and crop requirements. Helps farmers optimize water usage and improve crop yields.",
        image: "/images/projects/pulse-smart-irrigation.png",
        technologies: ["TypeScript", "React", "Supabase", "IoT Integration", "Weather API", "Mobile Development"],
        link: "https://smartirrigation.webspectit.com/",
        github: "https://github.com/brightcheteni/pulse-irrigation",
        category: "web"
    },
    {
        title: "Advanced POS with ZIMRA Integration",
        description: "A cloud-based point of sale system with ZIMRA fiscalized receipts integration. Features inventory management, sales analytics, customer management, and real-time reporting.",
        image: "/images/projects/coming-soon.jpg",
        technologies: ["Laravel", "HTML", "CSS", "JavaScript", "MySQL", "Fiscal Integration", "Cloud Deployment"],
        link: "https://advanced-pos.example.com",
        github: "https://github.com/brightcheteni/advanced-pos",
        category: "web"
    },
    {
        title: "Smart HR Management System",
        description: "A comprehensive human resources management system with employee onboarding, performance evaluation, leave management, and payroll processing. Streamlines HR operations and improves employee experience.",
        image: "/images/projects/smart-hr-system.png",
        technologies: ["Laravel", "HTML", "CSS", "JavaScript", "MySQL", "Chart.js", "PDF Generation"],
        link: "https://smart-hr.example.com",
        github: "https://github.com/brightcheteni/smart-hr",
        category: "web"
    },
    {
        title: "Smart Rental Management System",
        description: "A tenant management system for property owners and managers. Features rent collection, maintenance requests, tenant communication, and financial reporting.",
        image: "/images/projects/coming-soon.jpg",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Payment Integration"],
        link: "https://smart-rental.example.com",
        github: "https://github.com/brightcheteni/smart-rental",
        category: "web"
    },
    {
        title: "Zesa Tokens Selling Website",
        description: "An e-commerce platform for purchasing electricity tokens online. Features secure payment processing, instant token delivery, and transaction history tracking.",
        image: "/images/projects/coming-soon.jpg",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Payment Gateway Integration"],
        link: "https://zesa-tokens.example.com",
        github: "https://github.com/brightcheteni/zesa-tokens",
        category: "website"
    },
    {
        title: "Task Management System",
        description: "A collaborative task management application for teams with project tracking, task assignment, deadline management, and progress reporting features.",
        image: "/images/projects/task-management.png",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "AJAX"],
        link: "https://task-management.example.com",
        github: "https://github.com/brightcheteni/task-management",
        category: "web"
    },
    {
        title: "Manufacturing Management System",
        description: "A comprehensive solution for manufacturing operations including inventory management, production planning, quality control, and supply chain management.",
        image: "/images/projects/coming-soon.jpg",
        technologies: ["Laravel", "HTML", "CSS", "JavaScript", "Supabase", "PostgreSQL"],
        link: "https://manufacturing-system.example.com",
        github: "https://github.com/brightcheteni/manufacturing-system",
        category: "web"
    },
    {
        title: "Hotel Management System",
        description: "A modern hotel management solution with reservation handling, room management, guest services, billing, and reporting capabilities. Currently under development.",
        image: "/images/projects/coming-soon.jpg",
        technologies: ["Laravel 12", "React", "TypeScript", "MySQL", "REST APIs"],
        link: "https://hotel-management.example.com",
        github: "https://github.com/brightcheteni/hotel-management",
        category: "web"
    },
    {
        title: "Spirit Filled International Ministries",
        description: "A modern, responsive website for a religious organization featuring event calendar, sermon archives, donation system, and community engagement tools.",
        image: "/images/projects/spirit-filled-church-website.png",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Payment Integration"],
        link: "https://bossvinny.webspectit.com/",
        github: "https://github.com/brightcheteni/spirit-filled",
        category: "website"
    },
    {
        title: "Mist Corporate Services",
        description: "A professional corporate website showcasing business services, client portfolio, team profiles, and contact information with a modern, responsive design.",
        image: "/images/projects/mist-corporate-website.png",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Bootstrap"],
        link: "https://mist.co.zw/",
        github: "https://github.com/brightcheteni/mist-corporate",
        category: "website"
    },
    {
        title: "Webspect IT Solutions",
        description: "A technology company website featuring service offerings, case studies, client testimonials, and a blog section with industry insights and company news.",
        image: "/images/projects/coming-soon.jpg",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "jQuery"],
        link: "https://webspect.example.com",
        github: "https://github.com/brightcheteni/webspect",
        category: "website"
    },
    {
        title: "Sichel Technologies",
        description: "A modern tech company website with portfolio showcase, service descriptions, team profiles, and client testimonials. Currently under development.",
        image: "/images/projects/coming-soon.jpg",
        technologies: ["Laravel", "React", "TypeScript", "JavaScript", "MySQL"],
        link: "https://sichel.example.com",
        github: "https://github.com/brightcheteni/sichel-tech",
        category: "website"
    },
    {
        title: "Simrac Website",
        description: "A corporate website for a mining safety and compliance organization featuring regulatory information, training resources, and industry updates.",
        image: "/images/projects/coming-soon.jpg",
        technologies: ["Laravel", "React", "TypeScript", "MySQL", "Tailwind CSS"],
        link: "https://simrac.example.com",
        github: "https://github.com/brightcheteni/simrac",
        category: "website"
    }
];

const ProjectCard: React.FC<ProjectProps> = ({
    title,
    description,
    image,
    technologies,
    link,
    github,
    category
}) => {
    // Define category-specific colors
    const getCategoryColors = () => {
        switch (category) {
            case 'web':
                return {
                    gradient: 'from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500',
                    badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
                    glow: 'from-cyan-500/20 to-blue-500/20 dark:from-cyan-400/20 dark:to-blue-400/20'
                };
            case 'website':
                return {
                    gradient: 'from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500',
                    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
                    glow: 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-400/20 dark:to-teal-400/20'
                };
            case 'ai':
                return {
                    gradient: 'from-pink-600 to-rose-600 dark:from-pink-500 dark:to-rose-500',
                    badge: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
                    glow: 'from-pink-500/20 to-rose-500/20 dark:from-pink-400/20 dark:to-rose-400/20'
                };
            default:
                return {
                    gradient: 'from-gray-600 to-gray-700 dark:from-gray-500 dark:to-gray-600',
                    badge: 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300',
                    glow: 'from-gray-500/20 to-gray-600/20 dark:from-gray-400/20 dark:to-gray-500/20'
                };
        }
    };

    const colors = getCategoryColors();

    return (
        <div className="group relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 shadow-md hover:shadow-xl transition-all duration-500 h-full transform-gpu hover:-translate-y-1">
            {/* Background Glow Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors.glow} rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-500`}></div>

            {/* Category Badge */}
            <div className="absolute top-4 right-4 z-20">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                    {category === 'web' ? 'Web App' : category === 'website' ? 'Website' : 'AI/ML'}
                </span>
            </div>

            {/* Project image with overlay */}
            <div className="relative h-52 overflow-hidden">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>

                {/* Image */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/400x200?text=Project+Image";
                    }}
                />

                {/* Title Overlay - Only visible on hover for mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 md:hidden">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative">
                {/* Title - Hidden on mobile when hovering */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 md:block hidden">{title}</h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">{description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {technologies.slice(0, 3).map((tech, index) => (
                        <span
                            key={index}
                            className={`px-2.5 py-1 text-xs rounded-md ${colors.badge} transition-all duration-300 hover:scale-105`}
                        >
                            {tech}
                        </span>
                    ))}
                    {technologies.length > 3 && (
                        <span className={`px-2.5 py-1 text-xs rounded-md ${colors.badge} transition-all duration-300 hover:scale-105`}>
                            +{technologies.length - 3} more
                        </span>
                    )}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto">
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-medium bg-gradient-to-r ${colors.gradient} text-white px-4 py-2 rounded-lg flex items-center shadow-sm hover:shadow-md transition-all duration-300`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </a>
                    )}
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                        >
                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd" />
                            </svg>
                            Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ProjectsSection() {
    const [filter, setFilter] = useState<'all' | 'web' | 'ai'>('all');
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading effect
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    // Get category-specific colors for the filter buttons
    const getCategoryButtonStyle = (category: 'all' | 'web' | 'website' | 'ai') => {
        if (filter !== category) {
            return 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white';
        }

        switch (category) {
            case 'web':
                return 'bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white shadow-sm';
            case 'website':
                return 'bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white shadow-sm';
            case 'ai':
                return 'bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-500 dark:to-rose-500 text-white shadow-sm';
            default:
                return 'bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white shadow-sm';
        }
    };

    return (
        <section className="bg-gray-50/50 dark:bg-gray-900/50 relative pb-20" id="projects">
            {/* Background animations removed */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    title="Explore My Portfolio"
                    subtitle="A showcase of my diverse portfolio spanning enterprise systems, AI solutions, and web applications. With over 15 successful projects delivered, I specialize in creating scalable, user-centered solutions that solve real business challenges across multiple industries."
                    gradientFrom="cyan-600"
                    gradientVia="blue-600"
                    gradientTo="purple-600"
                    darkFrom="cyan-400"
                    darkVia="blue-400"
                    darkTo="purple-400"
                    underlineWidth="w-40"
                    paddingTop="pt-24"
                    paddingBottom="pb-12"
                    marginBottom="mb-16"
                />

                {/* Modern Filter Tabs with Gradient Highlights */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 shadow-md">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 mx-1 ${getCategoryButtonStyle('all')}`}
                        >
                            All Projects
                        </button>
                        <button
                            onClick={() => setFilter('web')}
                            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 mx-1 ${getCategoryButtonStyle('web')}`}
                        >
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                                Web Apps
                            </span>
                        </button>

                        <button
                            onClick={() => setFilter('website')}
                            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 mx-1 ${getCategoryButtonStyle('website')}`}
                        >
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                                </svg>
                                Websites
                            </span>
                        </button>

                        <button
                            onClick={() => setFilter('ai')}
                            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 mx-1 ${getCategoryButtonStyle('ai')}`}
                        >
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                AI/ML
                            </span>
                        </button>
                    </div>
                </div>

                {/* Projects Grid with Staggered Animation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className={`opacity-0 ${isLoaded ? 'animate-slide-up' : ''}`}
                            style={{
                                animationDelay: `${0.2 + index * 0.1}s`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>

                {/* Modern "View All" Button with Animation - Updated to use Inertia Link */}
                <div className="text-center mt-24 mb-12">
                    <a
                        href="/portfolio"
                        className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {/* Animated Background Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                        <span className="relative z-10 mr-2">View All Projects</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
