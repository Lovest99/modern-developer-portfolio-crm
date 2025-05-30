import React from 'react';

interface SimpleLogoScrollProps {
    title?: string;
    subtitle?: string;
}

const SimpleLogoScroll: React.FC<SimpleLogoScrollProps> = ({
    title = "Trusted By",
    subtitle = "Proud to collaborate with these amazing organizations"
}) => {
    // Company logos
    const companies = [
        { name: "Microsoft", logo: "/images/clients/microsoft.svg" },
        { name: "Google", logo: "/images/clients/google.svg" },
        { name: "Amazon", logo: "/images/clients/amazon.svg" },
        { name: "IBM", logo: "/images/clients/ibm.svg" },
        { name: "Oracle", logo: "/images/clients/oracle.svg" },
        { name: "Salesforce", logo: "/images/clients/salesforce.svg" },
        { name: "Adobe", logo: "/images/clients/adobe.svg" },
        { name: "Cisco", logo: "/images/clients/cisco.svg" },
        { name: "Intel", logo: "/images/clients/intel.svg" },
        { name: "SAP", logo: "/images/clients/sap.svg" },
        { name: "Deloitte", logo: "/images/clients/deloitte.svg" },
        { name: "Accenture", logo: "/images/clients/accenture.svg" },
    ];

    return (
        <section className="py-12 relative overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
            {/* Subtle background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.03)_0,rgba(0,0,0,0)_70%)]"></div>

            {/* Section heading */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                            {title}
                        </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Logo container */}
            <div className="relative">
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>

                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none"></div>

                {/* First row of logos */}
                <div className="py-4 overflow-hidden">
                    <div className="flex space-x-12 py-2 animate-scroll-left">
                        {companies.map((company, index) => (
                            <div
                                key={`${company.name}-1-${index}`}
                                className="flex-shrink-0 flex items-center justify-center h-12 sm:h-16 w-32 sm:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 px-4 group"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="max-h-8 sm:max-h-10 max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/images/clients/placeholder-logo.svg';
                                    }}
                                />
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {companies.map((company, index) => (
                            <div
                                key={`${company.name}-1-dup-${index}`}
                                className="flex-shrink-0 flex items-center justify-center h-12 sm:h-16 w-32 sm:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 px-4 group"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="max-h-8 sm:max-h-10 max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/images/clients/placeholder-logo.svg';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second row of logos - reversed */}
                <div className="py-4 overflow-hidden">
                    <div className="flex space-x-12 py-2 animate-scroll-right">
                        {[...companies].reverse().map((company, index) => (
                            <div
                                key={`${company.name}-2-${index}`}
                                className="flex-shrink-0 flex items-center justify-center h-12 sm:h-16 w-32 sm:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 px-4 group"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="max-h-8 sm:max-h-10 max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/images/clients/placeholder-logo.svg';
                                    }}
                                />
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {[...companies].reverse().map((company, index) => (
                            <div
                                key={`${company.name}-2-dup-${index}`}
                                className="flex-shrink-0 flex items-center justify-center h-12 sm:h-16 w-32 sm:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 px-4 group"
                            >
                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="max-h-8 sm:max-h-10 max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null;
                                        target.src = '/images/clients/placeholder-logo.svg';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-cyan-500/5 dark:bg-cyan-400/5 blur-3xl"></div>
            <div className="absolute top-0 right-1/4 w-32 h-32 rounded-full bg-purple-500/5 dark:bg-purple-400/5 blur-3xl"></div>
        </section>
    );
};

export default SimpleLogoScroll;
