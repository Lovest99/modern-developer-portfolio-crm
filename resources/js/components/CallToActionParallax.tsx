import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

interface CallToActionParallaxProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: string;
}

const CallToActionParallax: React.FC<CallToActionParallaxProps> = ({
    title = "Let's Build Something Amazing Together",
    subtitle = "Ready to transform your ideas into reality? I'm here to help you create exceptional digital experiences.",
    buttonText = "Get in Touch",
    buttonLink = "/contact",
    backgroundImage = "/images/cta-background.jpg" // You'll need to add this image to your public/images folder
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect values
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

    // Mouse parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for mouse movement
    const springConfig = { damping: 25, stiffness: 100 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    // Transform values for floating elements based on mouse position
    const floatingX1 = useTransform(mouseXSpring, [-500, 500], [30, -30]);
    const floatingY1 = useTransform(mouseYSpring, [-500, 500], [30, -30]);
    const floatingX2 = useTransform(mouseXSpring, [-500, 500], [-40, 40]);
    const floatingY2 = useTransform(mouseYSpring, [-500, 500], [-40, 40]);
    const floatingX3 = useTransform(mouseXSpring, [-500, 500], [15, -15]);
    const floatingY3 = useTransform(mouseYSpring, [-500, 500], [-15, 15]);

    // Handle mouse movement
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <motion.section
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden"
            style={{ opacity }}
            onMouseMove={handleMouseMove}
        >
            {/* Background with parallax effect */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                    backgroundColor: !backgroundImage ? '#0f172a' : undefined, // Fallback color if no image
                    y,
                    backgroundSize: 'cover'
                }}
            />

            {/* Overlay with animated gradient */}
            <motion.div
                className="absolute inset-0 backdrop-blur-sm"
                style={{
                    background: 'linear-gradient(to right, rgba(8, 145, 178, 0.85), rgba(37, 99, 235, 0.85), rgba(126, 34, 206, 0.85))'
                }}
                animate={{
                    background: [
                        'linear-gradient(to right, rgba(8, 145, 178, 0.85), rgba(37, 99, 235, 0.85), rgba(126, 34, 206, 0.85))',
                        'linear-gradient(to right, rgba(6, 182, 212, 0.85), rgba(59, 130, 246, 0.85), rgba(147, 51, 234, 0.85))',
                        'linear-gradient(to right, rgba(8, 145, 178, 0.85), rgba(37, 99, 235, 0.85), rgba(126, 34, 206, 0.85))'
                    ]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Tech pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        style={{
                            width: Math.random() * 6 + 2 + 'px',
                            height: Math.random() * 6 + 2 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                        animate={{
                            textShadow: [
                                "0 0 8px rgba(6, 182, 212, 0.3)",
                                "0 0 16px rgba(6, 182, 212, 0.2)",
                                "0 0 8px rgba(6, 182, 212, 0.3)"
                            ]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {title}
                    </motion.h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
                        {subtitle}
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href={buttonLink}
                            className="inline-flex items-center px-8 py-4 rounded-full text-lg font-medium bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300"
                        >
                            {buttonText}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 ml-2"
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatDelay: 1
                                }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </motion.svg>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Floating elements with mouse parallax */}
                <motion.div
                    className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-xl"
                    style={{ x: floatingX1, y: floatingY1 }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-xl"
                    style={{ x: floatingX2, y: floatingY2 }}
                />
                <motion.div
                    className="absolute top-2/3 left-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"
                    style={{ x: floatingX3, y: floatingY3 }}
                />
            </div>
        </motion.section>
    );
};

export default CallToActionParallax;
