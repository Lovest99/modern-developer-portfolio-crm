import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import SectionHeading from './SectionHeading';
import LazyImage from './LazyImage';
import LazyLoad from './LazyLoad';

interface Skill {
    name: string;
    level: number;
    color: string;
}

interface SocialLink {
    name: string;
    url: string;
    icon: React.ReactNode;
    color: string;
}

const ModernAboutSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'story' | 'skills' | 'journey'>('story');
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Handle mouse movement for 3D effect
    const handleMouseMove = (e: React.MouseEvent) => {
        if (imageRef.current) {
            const { left, top, width, height } = imageRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            setMousePosition({ x, y });
        }
    };

    // Reset position when mouse leaves
    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

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

    // Categorized skills data - Simplified
    const skillCategories = [
        {
            name: 'Frontend',
            skills: [
                { name: 'React', level: 90, color: '#61DAFB' },
                { name: 'TypeScript', level: 85, color: '#3178C6' },
                { name: 'HTML/CSS', level: 92, color: '#E34F26' },
                { name: 'Tailwind CSS', level: 92, color: '#38B2AC' },
            ]
        },
        {
            name: 'Backend',
            skills: [
                { name: 'Laravel', level: 88, color: '#FF2D20' },
                { name: 'Python', level: 85, color: '#3776AB' },
                { name: 'PHP', level: 80, color: '#777BB4' },
            ]
        },
        {
            name: 'DevOps',
            skills: [
                { name: 'Docker', level: 75, color: '#2496ED' },
                { name: 'CI/CD', level: 70, color: '#4285F4' },
            ]
        },
        {
            name: 'AI & ML',
            skills: [
                { name: 'TensorFlow', level: 78, color: '#FF6F00' },
                { name: 'Generative AI', level: 85, color: '#10B981' },
                { name: 'Prompt Engineering', level: 82, color: '#8B5CF6' },
                { name: 'NLP', level: 72, color: '#3B88C3' },
            ]
        },
        {
            name: 'Automation',
            skills: [
                { name: 'n8n', level: 85, color: '#FF6D00' },
                { name: 'Make (Integromat)', level: 80, color: '#0059B3' },
                { name: 'Zapier', level: 78, color: '#FF4A00' },
            ]
        }
    ];

    // Social links with icons
    const socialLinks: SocialLink[] = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/bright-cheteni-6a2597177/',
            color: '#0A66C2',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
        {
            name: 'GitHub',
            url: 'https://github.com/Lovest99/',
            color: '#181717',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            )
        },
        {
            name: 'WhatsApp',
            url: 'https://wa.link/69rt13',
            color: '#25D366',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            )
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/your_fav_tech_guy/',
            color: '#E4405F',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
            )
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/bright.cheteni/',
            color: '#1877F2',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@lovestonthebeat',
            color: '#FF0000',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            )
        },
        {
            name: 'Threads',
            url: 'https://www.threads.com/@your_fav_tech_guy',
            color: '#000000',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01c-.028-3.581.859-6.477 2.628-8.592C6.005 1.404 8.835.312 12.537.03c3.254-.259 6.506.582 8.92 2.282 2.356 1.662 3.618 4.125 3.543 6.917-.115 4.269-2.28 6.689-6.561 7.351-1.167.18-2.278.106-3.32-.219-1.08-.337-1.922-.918-2.519-1.737-.5.686-1.071 1.268-1.707 1.734-1.135.834-2.403 1.249-3.772 1.233-1.363-.016-2.531-.506-3.476-1.461-1.323-1.339-1.911-3.181-1.656-5.197.268-2.116 1.32-3.695 3.062-4.59 1.79-.919 3.741-.871 5.77.141.18-.818.5-1.668.973-2.534.288-.527.618-1.011.973-1.437.358-.429.729-.804 1.111-1.119-1.167-.632-2.411-.953-3.695-.953h-.395c-3.454.08-6.241 2.869-6.329 6.324-.088 3.509 2.693 6.4 6.202 6.486.801.02 1.584-.106 2.318-.375l.316.754c-.738.303-1.539.458-2.363.458zm.979-14.195c-1.165-.002-2.237.412-3.193 1.23-.952.816-1.703 1.947-2.235 3.36-.139.368-.259.744-.363 1.127.05.012.101.025.152.039 1.289.363 2.361.097 3.205-.793.812-.857 1.438-1.97 1.872-3.313.079-.243.149-.487.21-.732.061-.245.112-.49.153-.732.066-.321.099-.643.099-.965 0-.051-.001-.103-.004-.154.039-.001.075-.002.11-.002l.058.001c.684.016 1.252.29 1.677.814.43.528.643 1.178.635 1.936-.012 1.051-.401 1.928-1.159 2.611-.776.698-1.775 1.058-2.97 1.072h-.09c-1.331-.018-2.439-.486-3.298-1.392-.855-.904-1.266-2.043-1.22-3.387.058-1.692.649-3.138 1.754-4.299 1.103-1.16 2.539-1.82 4.271-1.967.296-.025.593-.038.889-.038 1.725 0 3.337.427 4.78 1.265.193.112.383.231.569.356.185.125.366.257.541.394.176.138.347.28.512.427.164.147.323.298.475.452l.074.077c-.004-.011-.016-.024-.036-.039l-.127-.128c-.452-.447-.948-.847-1.476-1.187-.53-.341-1.094-.635-1.677-.875-.585-.241-1.198-.429-1.828-.559-.63-.13-1.276-.196-1.924-.196zm-1.505 5.788c-.518 1.169-1.074 1.895-1.682 2.195-.607.3-1.301.273-2.093-.078-.02-.008-.039-.018-.057-.027-.012.191-.017.381-.016.569.005.93.306 1.686.9 2.252.6.573 1.36.863 2.273.868 1.596-.007 2.988-.8 4.137-2.363-1.103-.437-2.188-1.335-3.462-3.416z" />
                </svg>
            )
        },
        {
            name: 'X (Twitter)',
            url: 'https://x.com/fav_tech_guy/',
            color: '#000000',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        }
    ];

    // Parallax effect for background
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`py-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} relative overflow-hidden`}
            id="about"
        >
            {/* Parallax Background with multiple layers - using LazyImage */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    transform: `translateY(${scrollPosition * 0.15}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <LazyImage
                    src="/images/backgrounds/about/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                    blurEffect={true}
                    placeholderColor="#f8fafc"
                />
            </div>

            {/* Additional decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-3xl"
                    style={{ transform: `translateY(${scrollPosition * 0.2}px)` }}
                ></div>
                <div
                    className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-500/20 blur-3xl"
                    style={{ transform: `translateY(${scrollPosition * -0.1}px)` }}
                ></div>
            </div>

            {/* Overlay for better readability with background image */}
            <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-75 backdrop-blur-sm z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <SectionHeading
                    title="About Me"
                    titleSize="text-4xl md:text-5xl"
                    marginBottom="mb-8"
                    paddingTop="pt-16"
                    paddingBottom="pb-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column - Content Tabs (Previously Right Column) */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        {/* Interactive Tabs */}
                        <div className="mb-6 flex justify-start">
                            <div className="inline-flex p-1 rounded-xl bg-gray-100 dark:bg-gray-800/80 backdrop-blur-sm relative">
                                {/* Floating Indicator */}
                                <div
                                    className="absolute inset-y-1 transition-all duration-300 rounded-lg bg-white dark:bg-gray-700 shadow-sm z-0"
                                    style={{
                                        left: activeTab === 'story' ? '0.25rem' : activeTab === 'skills' ? '33.33%' : '66.66%',
                                        width: 'calc(33.33% - 0.5rem)'
                                    }}
                                ></div>

                                {[
                                    { id: 'story', label: 'My Story', icon: '📖' },
                                    { id: 'skills', label: 'Skills', icon: '⚡' },
                                    { id: 'journey', label: 'Journey', icon: '🚀' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 relative z-10 flex items-center gap-2 ${
                                            activeTab === tab.id
                                                ? 'text-indigo-600 dark:text-indigo-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                    >
                                        <span className="text-xs">{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content with Smooth Transitions */}
                        <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 border border-gray-200/80 dark:border-gray-700/80 shadow-lg h-[420px]">
                            {/* My Story Tab */}
                            <div
                                className={`transition-all duration-500 ${
                                    activeTab === 'story'
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 absolute inset-0 translate-x-8'
                                }`}
                                style={{ display: activeTab === 'story' ? 'block' : 'none' }}
                            >
                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 mb-4">
                                    The Story Behind My Work
                                </h3>

                                <div className="space-y-4 text-gray-700 dark:text-gray-300 max-h-[320px] overflow-y-auto pr-1">
                                    <p>
                                        I'm a Full Stack Developer and AI Specialist with a passion for creating innovative digital solutions that solve real-world problems. With over 3 years of experience in web development and AI integration, I specialize in building robust, scalable applications that deliver exceptional user experiences.
                                    </p>
                                    <p>
                                        My expertise spans across modern frontend frameworks like React and Vue.js, backend technologies including Node.js and Laravel, and AI/ML frameworks such as TensorFlow and PyTorch. I'm dedicated to writing clean, maintainable code and implementing best practices in software development.
                                    </p>
                                    <p>
                                        When I'm not coding, I enjoy contributing to open-source projects, mentoring aspiring developers, and exploring the latest advancements in AI and machine learning. I'm constantly learning and evolving my skills to stay at the forefront of technology.
                                    </p>

                                    {/* Quote */}
                                    <blockquote className="pl-4 border-l-4 border-indigo-500 italic text-gray-600 dark:text-gray-400 my-6">
                                        "I believe that technology should be accessible, intuitive, and designed with the end-user in mind. My goal is to create solutions that not only meet technical requirements but also enhance the human experience."
                                    </blockquote>
                                </div>
                            </div>

                            {/* Skills Tab */}
                            <div
                                className={`transition-all duration-500 ${
                                    activeTab === 'skills'
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 absolute inset-0 translate-x-8'
                                }`}
                                style={{ display: activeTab === 'skills' ? 'block' : 'none' }}
                            >
                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 mb-4">
                                    Technical Skills & Expertise
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[320px] overflow-y-auto pr-1">
                                    {/* Categorized Skills */}
                                    {skillCategories.map((category, index) => (
                                        <div
                                            key={category.name}
                                            className="space-y-2 p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/50"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex items-center">
                                                    {/* Category icon - Minimal */}
                                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/20 dark:to-purple-400/20 text-indigo-600 dark:text-indigo-400 mr-2">
                                                        {category.name === 'Frontend' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L4.97 9.47a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L6.56 10l1.72-1.72zm3.44-1.06a.75.75 0 10-1.06 1.06L12.44 10l-1.72 1.72a.75.75 0 101.06 1.06l2.25-2.25a.75.75 0 000-1.06l-2.25-2.25z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        {category.name === 'Backend' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        {category.name === 'DevOps' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        {category.name === 'AI & ML' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                                            </svg>
                                                        )}
                                                        {category.name === 'Automation' && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                                                            </svg>
                                                        )}
                                                    </span>
                                                    <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                                        {category.name}
                                                    </h4>
                                                </div>
                                                <div className="h-px flex-grow bg-gradient-to-r from-indigo-300/30 to-transparent dark:from-indigo-600/20"></div>
                                            </div>

                                            <div className="space-y-3">
                                                {category.skills.map((skill) => (
                                                    <div key={skill.name} className="space-y-1">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
                                                        </div>
                                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                                                style={{
                                                                    width: `${skill.level}%`,
                                                                    backgroundColor: skill.color,
                                                                    animation: `growWidth 1.5s ease-out ${index * 0.1}s`,
                                                                    '--skill-level': `${skill.level}%`
                                                                } as React.CSSProperties}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Journey Tab */}
                            <div
                                className={`transition-all duration-500 ${
                                    activeTab === 'journey'
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 absolute inset-0 translate-x-8'
                                }`}
                                style={{ display: activeTab === 'journey' ? 'block' : 'none' }}
                            >
                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 mb-4">
                                    My Professional Journey
                                </h3>

                                <div className="relative pl-10 border-l border-indigo-200 dark:border-indigo-800 space-y-8 max-h-[320px] overflow-y-auto pr-1">
                                    {[
                                        {
                                            period: '2023 - Present',
                                            role: 'Full Stack Developer',
                                            company: 'Sichel Technologies',
                                            description: 'Leading development of web applications and AI solutions, focusing on React, Laravel, and TensorFlow integration.'
                                        },
                                        {
                                            period: '2022 - 2023',
                                            role: 'Web Development Intern',
                                            company: 'Chigs International Co.',
                                            description: 'Developed full-stack web applications and integrated payment systems, focusing on performance optimization and responsive design.'
                                        },
                                        {
                                            period: '2022',
                                            role: 'Creative Designer & IT Support',
                                            company: 'Finnas Consultancy',
                                            description: 'Provided creative design services and IT support for clients, creating marketing materials and resolving technical issues.'
                                        },
                                        {
                                            period: '2020 - 2024',
                                            role: 'BSc Computer Science',
                                            company: 'National University of Science and Technology',
                                            description: 'Thesis: "Deep Learning for Pneumonia Detection in Chest X-Rays" - Built CNN model with 92% accuracy using TensorFlow.'
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="relative">
                                            {/* Timeline Dot */}
                                            <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full border-2 border-indigo-500 bg-white dark:bg-gray-900"></div>

                                            <div className="mb-1 flex items-baseline justify-between">
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.role}</h4>
                                                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full">
                                                    {item.period}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    {item.company}
                                                </p>
                                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Interactive 3D Image and Social Links (Previously Left Column) */}
                    <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                        {/* Interactive 3D Image with Parallax Effect */}
                        <div
                            ref={imageRef}
                            className="relative mx-auto max-w-xs perspective-1000"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Minimalist Frame with Animation */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-violet-500/30 via-indigo-500/30 to-blue-500/30 rounded-xl blur-md animate-pulse-slow"></div>

                            {/* 3D Card Container */}
                            <div
                                className="relative overflow-hidden rounded-xl transition-transform duration-200 ease-out transform-gpu bg-white dark:bg-gray-900 border-0"
                                style={{
                                    transform: `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg) scale3d(1, 1, 1)`,
                                    boxShadow: '0 15px 25px -12px rgba(0, 0, 0, 0.2)'
                                }}
                            >
                                {/* Subtle Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-indigo-500/5 to-blue-500/5 mix-blend-overlay"></div>

                                {/* Image with Square Aspect Ratio */}
                                <div className="relative overflow-hidden aspect-[1/1]">
                                    <img
                                        src="/images/potrait/portrait-hero.jpg"
                                        alt="Bright Cheteni - Full Stack Developer"
                                        className="w-full h-full object-cover object-center"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.parentElement.innerHTML = `
                                                <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                                                    <div class="text-center p-8">
                                                        <div class="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">BC</div>
                                                        <div class="mt-4 text-gray-500 dark:text-gray-400 font-medium">Software Engineer & AI Specialist</div>
                                                    </div>
                                                </div>
                                            `;
                                        }}
                                    />

                                    {/* Modern Info Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                                        <div className="transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-white text-lg font-bold">Bright Cheteni</h3>
                                            <p className="text-gray-200 text-xs">Full Stack Developer & AI Specialist</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Eye-catching Status Badge */}
                            <div className="absolute -top-3 -right-3 z-20 animate-float-slow">
                                <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-white dark:border-gray-800">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                    </span>
                                    <span>Available for Remote Work</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links with Hover Effects */}
                        <div className="space-y-4">
                            <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                                Connect
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2.5 rounded-lg bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/50 hover:border-opacity-0 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700"
                                        style={{
                                            '--hover-color': link.color
                                        } as React.CSSProperties}
                                        title={link.name}
                                    >
                                        <span className="text-gray-500 dark:text-gray-400 group-hover:text-[var(--hover-color)] transition-colors">
                                            {link.icon}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Minimalist Download CV Button */}
                        <div className="relative mt-2">
                            <a
                                href="/download/cv"
                                className="group relative flex items-center justify-center gap-2 w-full py-3 px-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-lg font-medium border border-indigo-100 dark:border-indigo-900/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700/50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">Download Resume</span>
                            </a>

                            {/* Updated Badge */}
                            <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 text-xs font-medium px-2 py-0.5 rounded-full shadow-sm border border-amber-200 dark:border-amber-800/50">
                                <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                                <span>Updated</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernAboutSection;
