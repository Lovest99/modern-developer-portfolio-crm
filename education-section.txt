                {/* Education Section */}
                <section id="education" className="relative w-full py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 opacity-5 dark:opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15)_0,rgba(0,0,0,0)_70%)]"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15)_0,rgba(0,0,0,0)_70%)]"></div>
                    </div>

                    {/* Neural Network Animation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full bg-purple-500/20 dark:bg-purple-500/30 animate-neural-pulse"
                                style={{
                                    width: `${Math.random() * 20 + 10}px`,
                                    height: `${Math.random() * 20 + 10}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDuration: `${Math.random() * 8 + 4}s`,
                                    animationDelay: `${Math.random() * 5}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Digital Code Matrix Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5 dark:opacity-10">
                        <div className="absolute inset-0 flex">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="text-xs font-mono text-purple-500 whitespace-nowrap animate-matrix opacity-30"
                                    style={{
                                        animationDuration: `${20 + i * 5}s`,
                                        left: `${i * 20}%`
                                    }}
                                >
                                    {[...Array(50)].map((_, j) => (
                                        <div key={j} className="my-1">
                                            {Math.random().toString(36).substring(2, 14)}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col items-center mb-16">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-400/10 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
                                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                                <span>Education & Academics</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                                Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-magenta-500 to-cyan-500">Credentials</span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-magenta-500 to-cyan-500 rounded-full mb-8"></div>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-px bg-gradient-to-b from-purple-500/50 via-magenta-500/50 to-cyan-500/50"></div>

                            {/* Education Items */}
                            <div className="space-y-12">
                                {/* Education 1 */}
                                <div className="relative flex flex-col md:flex-row items-start">
                                    <div className="flex flex-col items-start md:items-end md:text-right md:w-1/2 md:pr-10 mb-8 md:mb-0">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
                                            2015 - 2019
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Bachelor of Science in Computer Science</h3>
                                        <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">University of Technology</p>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                            Graduated with honors, specializing in software engineering and artificial intelligence. Completed a thesis on machine learning applications in healthcare.
                                        </p>
                                    </div>

                                    {/* Timeline Node */}
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-2 border-purple-500 bg-white dark:bg-gray-900 z-10 flex items-center justify-center shadow-lg">
                                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                                    </div>

                                    <div className="md:w-1/2 md:pl-10 md:mt-0 pl-10 border-l md:border-l-0 border-purple-500/30">
                                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                            <li className="flex items-start">
                                                <span className="text-purple-500 mr-2">•</span>
                                                <span>Algorithms & Data Structures</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-500 mr-2">•</span>
                                                <span>Machine Learning & AI Fundamentals</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-500 mr-2">•</span>
                                                <span>Database Systems & Web Development</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-purple-500 mr-2">•</span>
                                                <span>Software Engineering Principles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Education 2 */}
                                <div className="relative flex flex-col md:flex-row items-start">
                                    <div className="flex flex-col items-start md:items-end md:text-right md:w-1/2 md:pr-10 mb-8 md:mb-0 order-1 md:order-1">
                                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 md:text-right">
                                            <li className="flex items-start md:justify-end">
                                                <span className="text-cyan-500 mr-2 md:order-2 md:ml-2 md:mr-0">•</span>
                                                <span className="md:order-1">Neural Networks & Deep Learning</span>
                                            </li>
                                            <li className="flex items-start md:justify-end">
                                                <span className="text-cyan-500 mr-2 md:order-2 md:ml-2 md:mr-0">•</span>
                                                <span className="md:order-1">Computer Vision & NLP</span>
                                            </li>
                                            <li className="flex items-start md:justify-end">
                                                <span className="text-cyan-500 mr-2 md:order-2 md:ml-2 md:mr-0">•</span>
                                                <span className="md:order-1">Reinforcement Learning</span>
                                            </li>
                                            <li className="flex items-start md:justify-end">
                                                <span className="text-cyan-500 mr-2 md:order-2 md:ml-2 md:mr-0">•</span>
                                                <span className="md:order-1">Advanced Data Analysis</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Timeline Node */}
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-2 border-cyan-500 bg-white dark:bg-gray-900 z-10 flex items-center justify-center shadow-lg">
                                        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
                                    </div>

                                    <div className="md:w-1/2 md:pl-10 order-2 md:order-2 pl-10 border-l md:border-l-0 border-cyan-500/30">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-2">
                                            2020 - 2021
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Master's Certificate in AI & Machine Learning</h3>
                                        <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-3">Tech Institute of Advanced Studies</p>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                            Advanced studies in artificial intelligence, deep learning, and neural networks. Developed practical applications using TensorFlow and PyTorch.
                                        </p>
                                    </div>
                                </div>

                                {/* Education 3 */}
                                <div className="relative flex flex-col md:flex-row items-start">
                                    <div className="flex flex-col items-start md:items-end md:text-right md:w-1/2 md:pr-10 mb-8 md:mb-0">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-magenta-600 dark:text-magenta-400 text-sm font-medium mb-2">
                                            2022
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Advanced Certification in Cloud Architecture</h3>
                                        <p className="text-magenta-600 dark:text-magenta-400 font-medium mb-3">Cloud Solutions Academy</p>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                            Specialized training in cloud infrastructure, microservices, and serverless architecture. Earned certifications in AWS and Azure.
                                        </p>
                                    </div>

                                    {/* Timeline Node with Glowing Effect */}
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-2 border-magenta-500 bg-white dark:bg-gray-900 z-10 flex items-center justify-center shadow-lg">
                                        <div className="w-3 h-3 rounded-full bg-magenta-500 animate-pulse"></div>
                                        <div className="absolute w-12 h-12 rounded-full border border-magenta-500/30 animate-ping"></div>
                                    </div>

                                    <div className="md:w-1/2 md:pl-10 md:mt-0 pl-10 border-l md:border-l-0 border-magenta-500/30">
                                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                            <li className="flex items-start">
                                                <span className="text-magenta-500 mr-2">•</span>
                                                <span>AWS Solutions Architect Certification</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-magenta-500 mr-2">•</span>
                                                <span>Azure Developer Associate</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-magenta-500 mr-2">•</span>
                                                <span>Docker & Kubernetes Fundamentals</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-magenta-500 mr-2">•</span>
                                                <span>CI/CD Pipeline Implementation</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Education 4 */}
                                <div className="relative flex flex-col md:flex-row items-start">
                                    <div className="flex flex-col items-start md:items-end md:text-right md:w-1/2 md:pr-10 mb-8 md:mb-0 order-1 md:order-1">
                                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 md:text-right">
                                            <li className="flex items-start md:justify-end">
                                                <span className="text-purple-500 mr-2 md:order-2 md:ml-2 md:mr-0">•</span>
                                                <span className="md:order-1">Web3 & Blockchain Technologies</span>
                                            </li>
                                            <li className="flex items-start md:justify-end">
                                                <span className="text-purple-500 mr-2 md:order-2 md:ml-2 md:mr-0">•</span>
                                                <span className="md:order-1">AR/VR Development Frameworks</span>
                                            </li>
                                            <li className="flex items-start md:justify-end">
                                                <span className="text-purple-500 mr-2 md:order-2 md:ml-2 md:mr-0">•</span>
                                                <span className="md:order-1">Edge Computing Solutions</span>
                                            </li>
                                            <li className="flex items-start md:justify-end">
                                                <span className="text-purple-500 mr-2 md:order-2 md:ml-2 md:mr-0">•</span>
                                                <span className="md:order-1">Quantum Computing Fundamentals</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Timeline Node */}
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full border-2 border-purple-500 bg-white dark:bg-gray-900 z-10 flex items-center justify-center shadow-lg">
                                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                                    </div>

                                    <div className="md:w-1/2 md:pl-10 order-2 md:order-2 pl-10 border-l md:border-l-0 border-purple-500/30">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">
                                            Ongoing
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Continuous Learning & Professional Development</h3>
                                        <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">Various Platforms</p>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                            Committed to lifelong learning through online courses, workshops, and industry conferences. Regularly updating skills to stay at the forefront of technology.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
