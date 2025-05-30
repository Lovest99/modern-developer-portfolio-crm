import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import SimpleModal from './SimpleModal';
import { motion } from 'framer-motion';

interface ServiceProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    delay: number;
    details: {
        title: string;
        description: string;
    }[];
    onLearnMore: () => void;
}

const Service: React.FC<ServiceProps> = ({ title, description, icon, delay, details, onLearnMore }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -5,
                transition: { duration: 0.2 }
            }}
            onClick={(e) => {
                e.stopPropagation();
                console.log('Service card clicked');
                onLearnMore();
            }}
            className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/60 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-white/30 dark:border-gray-700/30 cursor-pointer"
            style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
            }}
        >
            {/* Colored top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400"></div>

            {/* Content */}
            <div className="p-6 relative z-10 flex flex-col items-center">
                <div className="text-3xl mb-4 bg-white/80 dark:bg-gray-700/80 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                    <motion.div
                        className="text-cyan-600 dark:text-cyan-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        {icon}
                    </motion.div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>
                <p className="text-center text-gray-700 dark:text-gray-300">
                    {description}
                </p>

                {/* Learn more indicator */}
                <div className="mt-4 flex items-center text-cyan-600 dark:text-cyan-400 font-medium">
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        </motion.div>
    );
};

const ServicesSection: React.FC = () => {
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (index: number) => {
        console.log('Opening modal for service:', index);
        try {
            setSelectedService(index);
            setIsModalOpen(true);
            console.log('Modal state updated:', { index, isOpen: true });
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Define services with their icons and detailed information
    const services = [
        {
            title: "Web Development",
            description: "Enterprise-grade websites & web apps—secure, scalable, and optimized for performance.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
            ),
            details: [
                {
                    title: "Frontend Development",
                    description: "Modern, responsive interfaces built with React, with a focus on performance and user experience."
                },
                {
                    title: "Backend Development",
                    description: "Robust server-side applications using Node.js, Laravel, Django, or other frameworks to power your business logic."
                },
                {
                    title: "E-commerce Solutions",
                    description: "Custom online stores with secure payment processing, inventory management, and customer account features."
                },
                {
                    title: "Progressive Web Apps",
                    description: "Web applications that work offline, load instantly, and provide a native app-like experience across all devices."
                }
            ]
        },
        {
            title: "Mobile App Development",
            description: "Native & cross-platform apps (iOS/Android) with Flutter & React Native—smooth UX, fast deployment.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
            ),
            details: [
                {
                    title: "Cross-Platform Development",
                    description: "Build once, deploy everywhere with React Native or Flutter, saving time and resources while maintaining a native feel."
                },
                {
                    title: "Native iOS Development",
                    description: "High-performance iOS applications built with Swift for a seamless user experience on Apple devices."
                },
                {
                    title: "Native Android Development",
                    description: "Custom Android applications developed with Kotlin or Java to take full advantage of the Android ecosystem."
                },
                {
                    title: "App Store Optimization",
                    description: "Strategic app store listing optimization to improve visibility and increase downloads on both App Store and Google Play."
                }
            ]
        },
        {
            title: "AI Integration",
            description: "Smart integrations—ML-driven analytics, workflow automation, and AI chatbots for 24/7 customer support.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
            ),
            details: [
                {
                    title: "Natural Language Processing",
                    description: "Implement text analysis, sentiment detection, and language understanding capabilities to extract insights from unstructured data."
                },
                {
                    title: "Computer Vision",
                    description: "Add image recognition, object detection, and visual search features to enhance user experiences and automate visual tasks."
                },
                {
                    title: "Predictive Analytics",
                    description: "Leverage machine learning models to forecast trends, predict user behavior, and make data-driven recommendations."
                },
                {
                    title: "AI-Powered Automation",
                    description: "Streamline workflows and reduce manual tasks with intelligent automation systems that learn and improve over time."
                }
            ]
        },
        {
            title: "UI/UX Design",
            description: "Conversion-focused interfaces—intuitive navigation, brand-aligned visuals, and proven engagement boosters.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
            ),
            details: [
                {
                    title: "User Research",
                    description: "Conduct interviews, surveys, and usability testing to understand user needs, behaviors, and pain points."
                },
                {
                    title: "Interface Design",
                    description: "Create visually appealing, intuitive interfaces with consistent design systems that align with your brand identity."
                },
                {
                    title: "Interaction Design",
                    description: "Design meaningful animations and micro-interactions that guide users and provide feedback for a more engaging experience."
                },
                {
                    title: "Prototyping & Testing",
                    description: "Develop interactive prototypes to validate design decisions and refine the user experience before development."
                }
            ]
        },
        {
            title: "Database Design",
            description: "High-performance SQL/NoSQL systems—structured for security, speed, and seamless scaling. MySQL, PostgresQL, Supabase.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
            ),
            details: [
                {
                    title: "Schema Design",
                    description: "Create efficient, normalized database schemas that balance performance with data integrity for your specific use case."
                },
                {
                    title: "SQL & NoSQL Solutions",
                    description: "Implement the right database technology for your needs, whether relational (MySQL, PostgreSQL) or NoSQL (MongoDB, Firebase)."
                },
                {
                    title: "Performance Optimization",
                    description: "Improve query performance through indexing, caching strategies, and database tuning for faster response times."
                },
                {
                    title: "Data Migration & Integration",
                    description: "Seamlessly migrate data between systems and integrate with third-party services while maintaining data integrity."
                }
            ]
        },
        {
            title: "AI Chatbot",
            description: " Context-aware virtual assistants—multilingual support, sentiment analysis, and seamless human escalation.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
            ),
            details: [
                {
                    title: "Context-Aware Conversations",
                    description: "Advanced natural language understanding that maintains conversation context for more human-like interactions."
                },
                {
                    title: "Multi-Channel Deployment",
                    description: "Deploy chatbots across websites, mobile apps, messaging platforms, and social media for consistent customer engagement."
                },
                {
                    title: "Sentiment Analysis",
                    description: "Real-time emotion detection to adapt responses based on customer mood and escalate to human agents when necessary."
                },
                {
                    title: "Automated Lead Qualification",
                    description: "Identify and qualify potential customers through conversational AI, collecting key information before human follow-up."
                },
                {
                    title: "Seamless Human Handoff",
                    description: "Smooth transition to human support agents when complex issues arise, with full conversation context preserved."
                }
            ]
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Enhanced background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0,rgba(0,0,0,0)_70%)]"></div>
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 dark:opacity-20"></div>

            {/* Additional decorative elements */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 filter blur-3xl"></div>
                <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 filter blur-3xl"></div>
            </div>

            {/* Animated floating elements */}
            <motion.div
                className="absolute top-20 left-[5%] w-64 h-64 rounded-full bg-cyan-500/5 dark:bg-cyan-400/5 blur-3xl"
                animate={{
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "easeInOut"
                }}
            ></motion.div>
            <motion.div
                className="absolute bottom-20 right-[5%] w-72 h-72 rounded-full bg-purple-500/5 dark:bg-purple-400/5 blur-3xl"
                animate={{
                    x: [0, -20, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "easeInOut"
                }}
            ></motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <SectionHeading
                        title="Services"
                        subtitle="Specialized expertise to bring your digital vision to life"
                        centered={true}
                    />
                </motion.div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Service
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            details={service.details}
                            delay={index}
                            onLearnMore={() => openModal(index)}
                        />
                    ))}
                </div>

                {/* Service Modal */}
                {selectedService !== null && (
                    <SimpleModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title={services[selectedService].title}
                        description={services[selectedService].description}
                        icon={services[selectedService].icon}
                        details={services[selectedService].details}
                    />
                )}
            </div>
        </section>
    );
};

export default ServicesSection;
