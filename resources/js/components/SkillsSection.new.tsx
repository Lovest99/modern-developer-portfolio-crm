import React, { useState, useEffect, useRef } from 'react';

interface SkillCategory {
    name: string;
    color: string;
    darkColor: string;
    skills: Skill[];
    icon: React.ReactNode;
    emoji: string;
}

interface Skill {
    name: string;
    level: number; // 1-100
    icon?: string;
    color?: string;
}

export default function SkillsSection() {
    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [isInView, setIsInView] = useState(false);
    const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('skills');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Skill icons with brand colors
    const skillIcons = {
        // Frontend
        html: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
            color: '#E34F26'
        },
        css: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
            color: '#1572B6'
        },
        javascript: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            color: '#F7DF1E'
        },
        react: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            color: '#61DAFB'
        },
        typescript: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
            color: '#3178C6'
        },
        tailwind: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
            color: '#38B2AC'
        },

        // Backend
        nodejs: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            color: '#339933'
        },
        php: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg',
            color: '#777BB4'
        },
        python: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            color: '#3776AB'
        },
        laravel: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg',
            color: '#FF2D20'
        },
        api: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
            color: '#009688'
        },
        mvc: {
            icon: 'https://img.icons8.com/color/48/000000/workflow.png',
            color: '#6D28D9'
        },
        microservices: {
            icon: 'https://img.icons8.com/color/48/000000/microservices.png',
            color: '#EC4899'
        },

        // Database
        mysql: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            color: '#4479A1'
        },
        postgresql: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
            color: '#336791'
        },
        firebase: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
            color: '#FFCA28'
        },
        supabase: {
            icon: 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png',
            color: '#3ECF8E'
        },

        // AI/ML
        tensorflow: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
            color: '#FF6F00'
        },
        cv: {
            icon: 'https://img.icons8.com/color/48/000000/cctv.png',
            color: '#26A69A'
        },
        data: {
            icon: 'https://img.icons8.com/color/48/000000/combo-chart--v1.png',
            color: '#42A5F5'
        },
        generative: {
            icon: 'https://img.icons8.com/color/48/000000/artificial-intelligence.png',
            color: '#EC407A'
        },
        cnn: {
            icon: 'https://img.icons8.com/color/48/000000/neural-network.png',
            color: '#FF6F00'
        },
        prompt: {
            icon: 'https://img.icons8.com/color/48/000000/chatbot.png',
            color: '#10B981'
        },

        // Mobile
        flutter: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
            color: '#02569B'
        },
        reactnative: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            color: '#61DAFB'
        },

        // DevOps
        git: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
            color: '#F05032'
        },
        github: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
            color: '#181717'
        },
        docker: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
            color: '#2496ED'
        },
        githubactions: {
            icon: 'https://img.icons8.com/color/48/000000/github-actions.png',
            color: '#2088FF'
        },

        // Design
        figma: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
            color: '#F24E1E'
        },
        canva: {
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',
            color: '#00C4CC'
        },
        corel: {
            icon: 'https://img.icons8.com/color/48/000000/coreldraw.png',
            color: '#5FC52E'
        },
    };

    const skillCategories: SkillCategory[] = [
        {
            name: 'Frontend Development',
            color: 'from-cyan-600 to-blue-600',
            darkColor: 'from-cyan-500 to-blue-500',
            emoji: '🎨',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            ),
            skills: [
                { name: 'HTML5', level: 95, icon: skillIcons.html.icon, color: skillIcons.html.color },
                { name: 'CSS3', level: 92, icon: skillIcons.css.icon, color: skillIcons.css.color },
                { name: 'JavaScript (ES6+)', level: 90, icon: skillIcons.javascript.icon, color: skillIcons.javascript.color },
                { name: 'TypeScript', level: 88, icon: skillIcons.typescript.icon, color: skillIcons.typescript.color },
                { name: 'React', level: 92, icon: skillIcons.react.icon, color: skillIcons.react.color },
                { name: 'Tailwind CSS', level: 94, icon: skillIcons.tailwind.icon, color: skillIcons.tailwind.color },
            ],
        },
        {
            name: 'Backend Development',
            color: 'from-purple-600 to-indigo-600',
            darkColor: 'from-purple-500 to-indigo-500',
            emoji: '⚙️',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
            ),
            skills: [
                { name: 'Node.js', level: 90, icon: skillIcons.nodejs.icon, color: skillIcons.nodejs.color },
                { name: 'PHP', level: 88, icon: skillIcons.php.icon, color: skillIcons.php.color },
                { name: 'Python', level: 85, icon: skillIcons.python.icon, color: skillIcons.python.color },
                { name: 'Laravel', level: 92, icon: skillIcons.laravel.icon, color: skillIcons.laravel.color },
                { name: 'RESTful APIs', level: 94, icon: skillIcons.api.icon, color: skillIcons.api.color },
                { name: 'MVC Architecture', level: 88, icon: skillIcons.mvc.icon, color: skillIcons.mvc.color },
                { name: 'Microservices', level: 82, icon: skillIcons.microservices.icon, color: skillIcons.microservices.color },
            ],
        },
        {
            name: 'Database Systems',
            color: 'from-emerald-600 to-teal-600',
            darkColor: 'from-emerald-500 to-teal-500',
            emoji: '🛢️',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
            ),
            skills: [
                { name: 'MySQL', level: 90, icon: skillIcons.mysql.icon, color: skillIcons.mysql.color },
                { name: 'PostgreSQL', level: 85, icon: skillIcons.postgresql.icon, color: skillIcons.postgresql.color },
                { name: 'Firebase', level: 88, icon: skillIcons.firebase.icon, color: skillIcons.firebase.color },
                { name: 'Supabase', level: 82, icon: skillIcons.supabase.icon, color: skillIcons.supabase.color },
            ],
        },
        {
            name: 'AI & Machine Learning',
            color: 'from-pink-600 to-rose-600',
            darkColor: 'from-pink-500 to-rose-500',
            emoji: '🧠',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            ),
            skills: [
                { name: 'Python for ML', level: 88, icon: skillIcons.python.icon, color: skillIcons.python.color },
                { name: 'TensorFlow', level: 85, icon: skillIcons.tensorflow.icon, color: skillIcons.tensorflow.color },
                { name: 'CNN Architecture', level: 82, icon: skillIcons.cnn.icon, color: skillIcons.cnn.color },
                { name: 'Computer Vision', level: 84, icon: skillIcons.cv.icon, color: skillIcons.cv.color },
                { name: 'Predictive Analytics', level: 86, icon: skillIcons.data.icon, color: skillIcons.data.color },
                { name: 'Generative AI', level: 80, icon: skillIcons.generative.icon, color: skillIcons.generative.color },
                { name: 'Prompt Engineering', level: 85, icon: skillIcons.prompt.icon, color: skillIcons.prompt.color },
            ],
        },
        {
            name: 'Mobile Development',
            color: 'from-blue-600 to-indigo-600',
            darkColor: 'from-blue-500 to-indigo-500',
            emoji: '📱',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
            ),
            skills: [
                { name: 'Flutter', level: 88, icon: skillIcons.flutter.icon, color: skillIcons.flutter.color },
                { name: 'React Native', level: 85, icon: skillIcons.reactnative.icon, color: skillIcons.reactnative.color },
                { name: 'Firebase Integration', level: 90, icon: skillIcons.firebase.icon, color: skillIcons.firebase.color },
            ],
        },
        {
            name: 'DevOps & Tools',
            color: 'from-amber-600 to-orange-600',
            darkColor: 'from-amber-500 to-orange-500',
            emoji: '🔧',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
            ),
            skills: [
                { name: 'Git & GitHub', level: 92, icon: skillIcons.git.icon, color: skillIcons.git.color },
                { name: 'GitHub Actions', level: 85, icon: skillIcons.githubactions.icon, color: skillIcons.githubactions.color },
                { name: 'Docker Basics', level: 80, icon: skillIcons.docker.icon, color: skillIcons.docker.color },
                { name: 'Figma', level: 88, icon: skillIcons.figma.icon, color: skillIcons.figma.color },
                { name: 'Corel Draw', level: 85, icon: skillIcons.corel.icon, color: skillIcons.corel.color },
                { name: 'Canva', level: 90, icon: skillIcons.canva.icon, color: skillIcons.canva.color },
            ],
        },
    ];

    // Function to generate random particles
    const generateParticles = (count: number) => {
        return Array.from({ length: count }).map((_, index) => ({
            id: index,
            size: Math.random() * 4 + 2,
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random() * 0.5 + 0.1,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15,
        }));
    };

    // Function to get skill proficiency label with emoji
    const getSkillProficiencyLabel = (level: number) => {
        if (level >= 90) return { label: 'Expert', emoji: '🔥' };
        if (level >= 80) return { label: 'Advanced', emoji: '💪' };
        if (level >= 70) return { label: 'Proficient', emoji: '👍' };
        if (level >= 60) return { label: 'Intermediate', emoji: '📚' };
        return { label: 'Beginner', emoji: '🌱' };
    };

    const particles = generateParticles(30);

    // Mouse move effect for the 3D card tilt
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.skill-card');
        cards.forEach((card: Element) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
            const intensity = 1 - Math.min(distance / maxDistance, 1);

            if ((card as HTMLElement).matches(':hover')) {
                (card as HTMLElement).style.transform = `
                    perspective(1000px)
                    rotateX(${deltaY * 8 * intensity}deg)
                    rotateY(${-deltaX * 8 * intensity}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
                (card as HTMLElement).style.zIndex = '10';
            }
        });
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.skill-card');
        cards.forEach((card: Element) => {
            (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            (card as HTMLElement).style.zIndex = '1';
        });
    };

    return (
        <section id="skills" className="py-24 bg-gradient-to-b from-gray-50/80 to-white/90 dark:from-gray-900/80 dark:to-gray-800/90 relative overflow-hidden">
            {/* Background Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-float"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            top: `${particle.y}%`,
                            left: `${particle.x}%`,
                            opacity: particle.opacity,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                        }}
                    ></div>
                ))}

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJoNnptLTYgNmMwLTYuNjI3LTUuMzczLTEyLTEyLTEydjZjMy4zMTQgMCA2IDIuNjg2IDYgNmg2eiIgZmlsbD0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-50 dark:opacity-30"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Modern Section Header with Animation */}
                <div className={`text-center mb-20 relative transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl opacity-70 animate-pulse rounded-3xl"></div>

                    <div className="relative">
                        <span className="inline-block text-4xl mb-4">⚡</span>
                        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 inline-block mb-6">
                            Skills & Expertise
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
                            My comprehensive technical skills and areas of expertise across frontend, backend, AI/ML, mobile, and DevOps technologies. I'm constantly expanding my knowledge to stay at the cutting edge of modern development.
                        </p>
                        <div className="mt-8 h-1.5 w-40 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className={`mb-16 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-wrap justify-center gap-4">
                        {skillCategories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(index)}
                                className={`
                                    px-6 py-4 rounded-2xl text-sm md:text-base font-medium transition-all duration-300
                                    flex items-center gap-3 shadow-sm
                                    ${activeCategory === index
                                        ? `bg-gradient-to-r ${category.color} dark:${category.darkColor} text-white shadow-lg scale-105`
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }
                                `}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeCategory === index ? 'bg-white/20' : `bg-gradient-to-r ${category.color} dark:${category.darkColor}`}`}>
                                    <span className="text-lg">{category.emoji}</span>
                                </div>
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Skills Content */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    {skillCategories.map((category, categoryIndex) => (
                        <div
                            key={categoryIndex}
                            className={`transition-all duration-500 ${activeCategory === categoryIndex ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                        >
                            <div className="relative">
                                {/* Category Background Glow */}
                                <div className={`absolute -inset-4 bg-gradient-to-r ${category.color.replace('from-', 'from-').replace('to-', 'to-')}/5 dark:${category.darkColor.replace('from-', 'from-').replace('to-', 'to-')}/5 rounded-3xl blur-xl opacity-70`}></div>

                                <div className="relative">
                                    {/* Skills Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {category.skills.map((skill, skillIndex) => {
                                            const proficiency = getSkillProficiencyLabel(skill.level);
                                            return (
                                                <div
                                                    key={skillIndex}
                                                    className="skill-card relative group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/80 dark:border-gray-700/80 transition-all duration-300 hover:shadow-2xl"
                                                    style={{
                                                        animationDelay: `${skillIndex * 0.1}s`,
                                                        transformStyle: 'preserve-3d',
                                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, z-index 0s 0.3s'
                                                    }}
                                                    onMouseEnter={() => setHoveredSkill(skillIndex)}
                                                    onMouseLeave={() => setHoveredSkill(null)}
                                                >
                                                    {/* Hover Effect */}
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color.replace('from-', 'from-').replace('to-', 'to-')}/10 dark:${category.darkColor.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                                    {/* Skill Card Content */}
                                                    <div className="relative z-10">
                                                        {/* Skill Header */}
                                                        <div className="flex items-center mb-8">
                                                            {skill.icon && (
                                                                <div
                                                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mr-5 shadow-lg group-hover:shadow-xl transition-all duration-300"
                                                                    style={{
                                                                        background: `linear-gradient(135deg, ${skill.color}22, ${skill.color}44)`,
                                                                        border: `2px solid ${skill.color}33`
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={skill.icon}
                                                                        alt={skill.name}
                                                                        className="w-10 h-10 transition-transform duration-500 group-hover:scale-110"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h4>
                                                                <div className="flex items-center mt-1">
                                                                    <span className="text-sm mr-2">{proficiency.emoji}</span>
                                                                    <span
                                                                        className="text-sm font-medium"
                                                                        style={{ color: skill.color }}
                                                                    >
                                                                        {proficiency.label}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Skill Level Circular Progress */}
                                                        <div className="flex items-center justify-between">
                                                            <div className="relative w-20 h-20">
                                                                {/* Background Circle */}
                                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                                    <path
                                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                        fill="none"
                                                                        stroke="#E5E7EB"
                                                                        strokeWidth="2.5"
                                                                        strokeDasharray="100, 100"
                                                                        className="stroke-gray-200 dark:stroke-gray-700"
                                                                    />
                                                                    {/* Progress Circle */}
                                                                    <path
                                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                        fill="none"
                                                                        stroke={skill.color || '#3B82F6'}
                                                                        strokeWidth="2.5"
                                                                        strokeDasharray={`${skill.level}, 100`}
                                                                        strokeLinecap="round"
                                                                        className="transition-all duration-1000 ease-out"
                                                                        style={{
                                                                            strokeDasharray: hoveredSkill === skillIndex ? `${skill.level}, 100` : '0, 100',
                                                                            opacity: hoveredSkill === skillIndex ? 1 : 0.8,
                                                                        }}
                                                                    />
                                                                    {/* Percentage Text */}
                                                                    <text x="18" y="18.5"
                                                                        className="fill-gray-800 dark:fill-white text-center font-bold"
                                                                        textAnchor="middle"
                                                                        dominantBaseline="middle"
                                                                        fontSize="8"
                                                                    >
                                                                        {skill.level}%
                                                                    </text>
                                                                </svg>

                                                                {/* Animated Glow Effect */}
                                                                <div
                                                                    className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                                                                    style={{ backgroundColor: skill.color }}
                                                                ></div>
                                                            </div>

                                                            {/* Skill Description */}
                                                            <div className="flex-1 ml-6">
                                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3 relative">
                                                                    <div
                                                                        className="h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                                                                        style={{
                                                                            width: hoveredSkill === skillIndex ? `${skill.level}%` : '0%',
                                                                            backgroundColor: skill.color || '#3B82F6'
                                                                        }}
                                                                    >
                                                                        {/* Animated Shimmer Effect */}
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                                                    </div>

                                                                    {/* Skill Level Markers */}
                                                                    <div className="absolute inset-0 flex justify-between px-1">
                                                                        {[0, 25, 50, 75, 100].map(mark => (
                                                                            <div
                                                                                key={mark}
                                                                                className="w-0.5 h-1/2 bg-gray-300 dark:bg-gray-600 mt-auto"
                                                                                style={{ opacity: mark <= skill.level ? 0.6 : 0.3 }}
                                                                            ></div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* Experience Level */}
                                                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                                                    <span>Beginner</span>
                                                                    <span>Expert</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Skills Section */}
                <div className={`mt-24 relative transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/30 dark:to-gray-800/30 rounded-3xl blur-xl opacity-70"></div>

                    <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-10 border border-gray-200/80 dark:border-gray-700/80 shadow-xl">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                            <span className="text-3xl mr-3">🛠️</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white">Additional Skills & Tools</span>
                        </h3>

                        <div className="flex flex-wrap gap-4">
                            {[
                                // Version Control & DevOps
                                { name: 'Git', color: '#F05032' },
                                { name: 'GitHub Actions', color: '#2088FF' },
                                { name: 'Docker Basics', color: '#2496ED' },
                                { name: 'Hostinger', color: '#673DE6' },

                                // Testing & Monitoring
                                { name: 'Testing', color: '#C21325' },
                                { name: 'Debugging', color: '#17202C' },
                                { name: 'Performance Optimization', color: '#F59E0B' },
                                { name: 'Deployment', color: '#0EA5E9' },

                                // Architecture & Methodologies
                                { name: 'MVC Architecture', color: '#6D28D9' },
                                { name: 'Microservices', color: '#EC4899' },
                                { name: 'Agile/Scrum', color: '#0891B2' },

                                // Design & Collaboration
                                { name: 'Figma', color: '#F24E1E' },
                                { name: 'Corel Draw', color: '#5FC52E' },
                                { name: 'Canva', color: '#00C4CC' },
                                { name: 'Jira', color: '#0052CC' },

                                // Web Technologies
                                { name: 'Responsive Design', color: '#38B2AC' },
                                { name: 'REST API Design', color: '#0EA5E9' },
                                { name: 'Firebase', color: '#FFCA28' },
                                { name: 'Supabase', color: '#3ECF8E' },
                            ].map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex items-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}30)`,
                                        border: `1px solid ${skill.color}40`,
                                        color: skill.color
                                    }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skill Stats */}
                <div className={`mt-20 relative transition-all duration-1000 delay-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">3+</div>
                            <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 mb-2 group-hover:scale-110 transition-transform duration-300">30+</div>
                            <div className="text-gray-600 dark:text-gray-400">Core Skills</div>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 mb-2 group-hover:scale-110 transition-transform duration-300">88%</div>
                            <div className="text-gray-600 dark:text-gray-400">Avg. Proficiency</div>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                            <div className="text-gray-600 dark:text-gray-400">Learning & Growth</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
