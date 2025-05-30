import React from 'react';

const AboutBioSection: React.FC = () => {
    return (
        <div className="lg:w-7/12">
            {/* Bio Section with Glassmorphism - Background animations removed */}
            <div className="relative group mb-12 perspective-1000">

                {/* Glassmorphism Card */}
                <div
                    className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl"
                    style={{
                        WebkitBackdropFilter: 'blur(8px) !important',
                        backdropFilter: 'blur(8px) !important',
                        backgroundColor: 'rgba(255, 255, 255, 0.8) !important'
                    }}
                >
                    <h2
                        className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400"
                        style={{
                            WebkitBackgroundClip: 'text !important',
                            WebkitTextFillColor: 'transparent !important',
                            backgroundClip: 'text !important',
                            color: 'transparent !important'
                        }}
                    >About Me</h2>

                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <p>
                            I'm a Full Stack Developer and AI Specialist with a passion for creating innovative digital solutions that solve real-world problems. With over 3 years of experience in web development and AI integration, I specialize in building robust, scalable applications that deliver exceptional user experiences.
                        </p>
                        <p>
                            My expertise spans across modern frontend frameworks like React and Vue.js, backend technologies including Node.js and Laravel, and AI/ML frameworks such as TensorFlow and PyTorch. I'm dedicated to writing clean, maintainable code and implementing best practices in software development.
                        </p>
                        <p>
                            When I'm not coding, I enjoy contributing to open-source projects, mentoring aspiring developers, and exploring the latest advancements in AI and machine learning. I'm constantly learning and evolving my skills to stay at the forefront of technology.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modern Stats Cards */}
            <div className="grid grid-cols-2 gap-6 mb-12">
                {/* Experience Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-300 duration-200 hover:shadow-md flex flex-col">
                    <div className="flex items-center mb-1">
                        <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center mr-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">3+</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Years Experience</p>
                    <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: '60%' }} />
                    </div>
                </div>

                {/* Projects Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-300 duration-200 hover:shadow-md flex flex-col">
                    <div className="flex items-center mb-1">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">20+</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Projects Completed</p>
                    <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutBioSection;
