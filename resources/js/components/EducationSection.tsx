import React from 'react';
import TechSectionBackground from './TechSectionBackground';
import GlassmorphismBackground from './GlassmorphismBackground';
import TechIconsBackground from './TechIconsBackground';
import SectionHeading from './SectionHeading';

interface EducationItemProps {
    degree: string;
    institution: string;
    period: string;
    description: string;
    logo?: string;
    type: 'education' | 'certification';
    index: number;
}

const EducationItem: React.FC<EducationItemProps> = ({
    degree,
    institution,
    period,
    description,
    logo,
    type,
    index
}) => {
    // Determine color scheme based on type
    const colorScheme = type === 'education'
        ? 'from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400'
        : 'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400';

    const iconBgColor = type === 'education'
        ? 'bg-blue-500/10 dark:bg-blue-400/10 group-hover:bg-blue-500/20 dark:group-hover:bg-blue-400/20'
        : 'bg-purple-500/10 dark:bg-purple-400/10 group-hover:bg-purple-500/20 dark:group-hover:bg-purple-400/20';

    const borderHoverColor = type === 'education'
        ? 'hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-blue-500/5'
        : 'hover:border-purple-500/30 dark:hover:border-purple-400/30 hover:shadow-purple-500/5';

    const textHoverColor = type === 'education'
        ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
        : 'group-hover:text-purple-600 dark:group-hover:text-purple-400';

    return (
        <div className="relative group">
            {/* Animated Background Glow */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${colorScheme.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl`}></div>

            <div className={`relative flex gap-4 p-6 rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg ${borderHoverColor}`}>
                {/* Left Side - Logo and Type Icon */}
                <div className="flex flex-col items-center space-y-3">
                    {/* Type Icon */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${iconBgColor} transition-colors`}>
                        {type === 'education' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>

                    {/* Logo */}
                    {logo && (
                        <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-600 p-2">
                            <img src={logo} alt={institution} className="w-full h-full object-contain" />
                        </div>
                    )}

                    {/* Vertical Line */}
                    <div className={`hidden sm:block h-full w-0.5 bg-gradient-to-b ${colorScheme} rounded-full opacity-30`}></div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white ${textHoverColor} transition-colors`}>
                            {degree}
                        </h3>
                        <div className={`px-3 py-1 text-sm rounded-full bg-gradient-to-r ${colorScheme} text-white font-medium shadow-sm`}>
                            {period}
                        </div>
                    </div>

                    <div className="flex items-center mb-3">
                        <p className="text-base font-medium text-gray-700 dark:text-gray-300">{institution}</p>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>

                    {/* Decorative Number */}
                    <div className="mt-4 flex justify-end">
                        <div className={`text-4xl font-bold opacity-10 ${textHoverColor}`}>
                            {(index + 1).toString().padStart(2, '0')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function EducationSection() {
    const [filter, setFilter] = React.useState('all');

    const educationItems = [
        {
            degree: "BSc (Hons) Computer Science",
            institution: "National University of Science and Technology (NUST)",
            period: "2020 - 2024",
            description: "Thesis: \"Deep Learning for Pneumonia Detection in Chest X-Rays\" - Built CNN model with 92% accuracy using TensorFlow/Python and deployed as Flask web app with real-time diagnostics. Key Coursework: Machine Learning, Distributed Systems, Web Development. Achievement: Top 15% of cohort in Algorithm Design.",
            logo: "/images/education/nust-logo.png",
            type: 'education' as const
        },
        {
            degree: "Advanced Level (A-Level)",
            institution: "Gutu High School",
            period: "2017 - 2018",
            description: "Computer Science (B): Developed a Truck Management System as final project - a VB.NET desktop app with SQLite database featuring GPS tracking, payroll integration, maintenance scheduling, and employee management.",
            logo: "/images/education/gutu-logo.png",
            type: 'education' as const
        },
        {
            degree: "Advanced Level (A-Level)",
            institution: "Zivavose High School",
            period: "2019",
            description: "Statistics (A), Pure Mathematics (C): Applied statistical modeling to optimize school sportsmen samples and clusters using normal distribution techniques.",
            logo: "/images/education/zivavose-logo.png",
            type: 'education' as const
        },
        {
            degree: "Ordinary Level (O-Level)",
            institution: "Pamushana High School",
            period: "2016",
            description: "Completed 12 Subjects (3As, 9Bs) with STEM Focus: Mathematics (A), Computer Studies (B), Statistics (B), Physical Science (B). Other subjects included English (B), Shona (A), Geography (A), Commerce (B), Agriculture (B), Literature in English (B), and Biology (B).",
            logo: "/images/education/pamushana-logo.png",
            type: 'education' as const
        },
        {
            degree: "Project Management Certification",
            institution: "Merit America University",
            period: "In Progress - 2025",
            description: "Comprehensive certification program covering project management methodologies, team leadership, resource allocation, risk management, and agile practices. Developing skills to effectively plan, execute, and deliver complex projects on time and within budget.",
            logo: "/images/education/meritamerica-logo.png",
            type: 'certification' as const
        },
        {
            degree: "Machine Learning Certification",
            institution: "Stanford University, USA",
            period: "In Progress - 2025",
            description: "Advanced certification in machine learning covering neural networks, deep learning, computer vision, and natural language processing. Developing expertise in designing and implementing ML solutions for complex real-world problems using cutting-edge techniques and frameworks.",
            logo: "/images/education/stanford-logo.png",
            type: 'certification' as const
        }
    ];

    return (
        <div className="bg-gray-50/50 dark:bg-gray-900/50 relative" id="education">
            {/* Background animations removed */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    title="Education & Certifications"
                    subtitle="My comprehensive academic journey from O-Level to university, along with ongoing professional certifications in project management and machine learning. My education combines strong foundations in computer science with continuous learning in advanced fields, always focused on applying theoretical knowledge to solve real-world problems."
                    gradientFrom="blue-600"
                    gradientVia="cyan-600"
                    gradientTo="purple-600"
                    darkFrom="blue-400"
                    darkVia="cyan-400"
                    darkTo="purple-400"
                    underlineWidth="w-24"
                    paddingTop="pt-16"
                    paddingBottom="pb-8"
                />

                {/* Filter Tabs */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                                filter === 'all'
                                    ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('education')}
                            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                                filter === 'education'
                                    ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                            }`}
                        >
                            Education
                        </button>
                        <button
                            onClick={() => setFilter('certification')}
                            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                                filter === 'certification'
                                    ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750'
                            }`}
                        >
                            Certifications
                        </button>
                    </div>
                </div>

                {/* Education Grid with Hover Effects */}
                <div className="grid gap-6 md:grid-cols-2">
                    {educationItems
                        .filter(item => filter === 'all' || item.type === filter)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="animate-fadeIn"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <EducationItem
                                    degree={item.degree}
                                    institution={item.institution}
                                    period={item.period}
                                    description={item.description}
                                    logo={item.logo}
                                    type={item.type}
                                    index={index}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
