import React, { useState, useEffect, useRef } from 'react';
import TechSectionBackground from './TechSectionBackground';
import GlassmorphismBackground from './GlassmorphismBackground';
import TechIconsBackground from './TechIconsBackground';
import SectionHeading from './SectionHeading';

interface ExperienceItemProps {
    position: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
    logo?: string;
    current?: boolean;
    achievements?: string[];
    location?: string;
    companyUrl?: string;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
    position,
    company,
    period,
    description,
    technologies,
    logo,
    current = false,
    achievements = [],
    location,
    companyUrl
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    // Function to get tech color based on name
    const getTechColor = (techName: string) => {
        const techColors: Record<string, string> = {
            // Frontend
            "React": { bg: "#61DAFB20", text: "#61DAFB", border: "#61DAFB40" },
            "HTML": { bg: "#E34F2620", text: "#E34F26", border: "#E34F2640" },
            "CSS": { bg: "#1572B620", text: "#1572B6", border: "#1572B640" },
            "JavaScript": { bg: "#F7DF1E20", text: "#F0DB4F", border: "#F7DF1E40" },
            "TypeScript": { bg: "#3178C620", text: "#3178C6", border: "#3178C640" },
            "Tailwind": { bg: "#38B2AC20", text: "#38B2AC", border: "#38B2AC40" },
            "HTML/CSS": { bg: "#E34F2620", text: "#E34F26", border: "#E34F2640" },
            "Bootstrap": { bg: "#7952B320", text: "#7952B3", border: "#7952B340" },
            "jQuery": { bg: "#0769AD20", text: "#0769AD", border: "#0769AD40" },

            // Backend
            "Node.js": { bg: "#33993320", text: "#339933", border: "#33993340" },
            "PHP": { bg: "#777BB420", text: "#777BB4", border: "#777BB440" },
            "Python": { bg: "#3776AB20", text: "#3776AB", border: "#3776AB40" },
            "Laravel": { bg: "#FF2D2020", text: "#FF2D20", border: "#FF2D2040" },
            "WordPress": { bg: "#21759B20", text: "#21759B", border: "#21759B40" },

            // Database
            "MySQL": { bg: "#4479A120", text: "#4479A1", border: "#4479A140" },
            "PostgreSQL": { bg: "#33679120", text: "#336791", border: "#33679140" },
            "Firebase": { bg: "#FFCA2820", text: "#FFCA28", border: "#FFCA2840" },
            "Supabase": { bg: "#3ECF8E20", text: "#3ECF8E", border: "#3ECF8E40" },
            "SQLite": { bg: "#0F80CC20", text: "#0F80CC", border: "#0F80CC40" },

            // AI/ML
            "TensorFlow": { bg: "#FF6F0020", text: "#FF6F00", border: "#FF6F0040" },
            "CNN": { bg: "#FF6F0020", text: "#FF6F00", border: "#FF6F0040" },
            "Computer Vision": { bg: "#26A69A20", text: "#26A69A", border: "#26A69A40" },
            "Predictive Analytics": { bg: "#42A5F520", text: "#42A5F5", border: "#42A5F540" },
            "Generative AI": { bg: "#EC407A20", text: "#EC407A", border: "#EC407A40" },

            // Mobile
            "Flutter": { bg: "#02569B20", text: "#02569B", border: "#02569B40" },
            "React Native": { bg: "#61DAFB20", text: "#61DAFB", border: "#61DAFB40" },

            // DevOps & Tools
            "Git": { bg: "#F0503220", text: "#F05032", border: "#F0503240" },
            "GitHub": { bg: "#18171720", text: "#181717", border: "#18171740" },
            "GitHub Actions": { bg: "#2088FF20", text: "#2088FF", border: "#2088FF40" },
            "Docker": { bg: "#2496ED20", text: "#2496ED", border: "#2496ED40" },
            "AWS": { bg: "#FF990020", text: "#FF9900", border: "#FF990040" },
            "Agile": { bg: "#6D28D920", text: "#6D28D9", border: "#6D28D940" },

            // Design
            "Figma": { bg: "#F24E1E20", text: "#F24E1E", border: "#F24E1E40" },
            "Corel Draw": { bg: "#5FC52E20", text: "#5FC52E", border: "#5FC52E40" },
            "Canva": { bg: "#00C4CC20", text: "#00C4CC", border: "#00C4CC40" },
        };

        // Default color if tech not found
        const defaultColor = { bg: "#64748B20", text: "#64748B", border: "#64748B40" };

        // Find exact match
        if (techColors[techName]) {
            return techColors[techName];
        }

        // Find partial match
        for (const key in techColors) {
            if (techName.includes(key) || key.includes(techName)) {
                return techColors[key];
            }
        }

        return defaultColor;
    };

    return (
        <div
            ref={itemRef}
            className={`relative transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}
        >
            {/* Timeline connector */}
            <div className="absolute top-0 left-6 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400">
                {/* Animated pulse effect */}
                <div className="absolute top-6 left-1/2 w-8 h-8 bg-cyan-500/20 dark:bg-cyan-400/20 rounded-full transform -translate-x-1/2 animate-pulse"></div>
            </div>

            {/* Timeline dot with animation */}
            <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-white dark:bg-gray-900 border-2 border-cyan-500 dark:border-cyan-400 transform -translate-x-1.5 z-10">
                <div className="absolute inset-0 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping opacity-75"></div>
            </div>

            <div className="relative ml-16 mb-16">
                <div className="relative group">
                    {/* Hover effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

                    <div className="relative p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl">
                        <div className="flex flex-col sm:flex-row gap-6">
                            {logo && (
                                <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600">
                                    <img
                                        src={logo}
                                        alt={company}
                                        className="w-16 h-16 object-contain transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            )}

                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                        {position}
                                        {current && (
                                            <span className="ml-2 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                                Current
                                            </span>
                                        )}
                                    </h3>
                                    <div className="flex items-center mt-2 sm:mt-0">
                                        {location && (
                                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {location}
                                            </span>
                                        )}
                                        <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1 rounded-full">
                                            {period}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    {companyUrl ? (
                                        <a
                                            href={companyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200 flex items-center"
                                        >
                                            {company}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <p className="text-base font-medium text-gray-700 dark:text-gray-300">{company}</p>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{description}</p>

                                {achievements.length > 0 && (
                                    <div className={`mb-4 transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Achievements:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                            {achievements.map((achievement, index) => (
                                                <li key={index}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {technologies.map((tech, index) => {
                                        const techColor = getTechColor(tech);
                                        return (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 hover:shadow-md"
                                                style={{
                                                    backgroundColor: techColor.bg,
                                                    color: techColor.text,
                                                    border: `1px solid ${techColor.border}`
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>

                                {achievements.length > 0 && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors duration-200 flex items-center"
                                    >
                                        {isExpanded ? 'Show less' : 'Show achievements'}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-4 w-4 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ExperienceSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Generate particles for background effect
    const generateParticles = (count: number) => {
        return Array.from({ length: count }).map((_, index) => ({
            id: index,
            size: Math.random() * 3 + 1,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.3 + 0.1,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 20,
        }));
    };

    const particles = generateParticles(25);

    return (
        <div className="bg-gradient-to-b from-gray-50/80 to-white/90 dark:from-gray-900/80 dark:to-gray-800/90 relative overflow-hidden" id="experience" ref={sectionRef}>
            {/* Background animations removed */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <SectionHeading
                        title="Professional Experience"
                        subtitle="My professional journey as a developer and AI/ML engineer, building innovative solutions and continuously expanding my expertise across multiple technologies and domains."
                        gradientFrom="cyan-600"
                        gradientVia="blue-600"
                        gradientTo="purple-600"
                        darkFrom="cyan-400"
                        darkVia="blue-400"
                        darkTo="purple-400"
                        underlineWidth="w-32"
                        underlineHeight="h-1.5"
                        titleSize="text-4xl md:text-5xl"
                        paddingTop="pt-16"
                        paddingBottom="pb-8"
                    />
                </div>

                <div className="relative pt-6">
                    <ExperienceItem
                        position="Lead Software Engineer & Project Manager"
                        company="Sichel Technologies"
                        period="Mid 2024 - Present"
                        description="Leading software development teams and managing enterprise web application projects. Implementing modern development practices, CI/CD pipelines, and mentoring junior developers while architecting scalable solutions."
                        technologies={["HTML", "CSS", "JavaScript", "TypeScript", "React", "Laravel", "CI/CD", "Docker"]}
                        logo="/images/companies/sicheltechnologies-logo.png"
                        current={true}
                        location="Zimbabwe"
                        achievements={[
                            "Spearheaded development of 3+ enterprise web apps, reducing deployment cycles by 40% through Dockerized CI/CD pipelines",
                            "Trained and supervised 2 junior developers from University of Zimbabwe and Midlands State University in Agile practices, improving code review efficiency by 30%",
                            "Architected real-time HR dashboard using WebSockets for Venice Mine Integrated Management System, handling 50+ concurrent user sessions",
                            "Implemented automated testing suite cutting production bugs by 40%"
                        ]}
                    />

                    <ExperienceItem
                        position="Web Development Intern"
                        company="Chigs International Co."
                        period="Mid 2022 - Mid 2023"
                        description="Developed full-stack web applications and integrated payment systems. Focused on performance optimization, security improvements, and responsive design implementation for company websites."
                        technologies={["HTML", "CSS", "JavaScript", "PHP", "MySQL", "REST APIs", "React"]}
                        logo="/images/companies/chigs-logo.png"
                        location="Zimbabwe"
                        achievements={[
                            "Built 4 company websites with React/PHP, improving Google PageSpeed score from 55 → 92",
                            "Engineered Paynow payment gateway integration increasing transaction success rate by 40%",
                            "Conducted vulnerability audits on legacy systems, resolving 10+ critical security flaws",
                            "Reduced average page load time by 35% through image compression and Redis caching"
                        ]}
                    />

                    <ExperienceItem
                        position="Creative Designer & IT Support Specialist"
                        company="Finnas Consultancy"
                        period="2022 - Mid 2022"
                        description="Provided creative design services and IT support for clients. Created marketing materials, resolved hardware and network issues, and developed technical documentation to improve operational efficiency."
                        technologies={["Corel Draw", "Canva", "Figma", "Network Diagnostics", "Technical Documentation"]}
                        logo="/images/companies/finmas-logo.png"
                        location="Zimbabwe"
                        achievements={[
                            "Designed marketing materials for 12+ clients, increasing average customer engagement by 20%",
                            "Resolved 50+ hardware/network issues across 3 office locations, reducing downtime by 40%",
                            "Created technical manuals that decreased onboarding time for new hires by 25%"
                        ]}
                    />
                </div>

                {/* Career Stats Section */}
                <div className={`mt-20 relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">3+</div>
                            <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mb-2 group-hover:scale-110 transition-transform duration-300">40+</div>
                            <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
                            <div className="text-gray-600 dark:text-gray-400">Companies</div>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">∞</div>
                            <div className="text-gray-600 dark:text-gray-400">Learning</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
