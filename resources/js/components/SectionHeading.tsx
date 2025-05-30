import React from 'react';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    gradientFrom?: string;
    gradientVia?: string;
    gradientTo?: string;
    darkFrom?: string;
    darkVia?: string;
    darkTo?: string;
    underlineWidth?: string;
    underlineHeight?: string;
    titleSize?: string;
    marginBottom?: string;
    paddingTop?: string;
    paddingBottom?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
    title,
    subtitle,
    gradientFrom = 'violet-600',
    gradientVia = 'indigo-600',
    gradientTo = 'blue-600',
    darkFrom = 'violet-400',
    darkVia = 'indigo-400',
    darkTo = 'blue-400',
    underlineWidth = 'w-40',
    underlineHeight = 'h-1.5',
    titleSize = 'text-3xl md:text-4xl',
    marginBottom = 'mb-12',
    paddingTop = 'pt-8',
    paddingBottom = 'pb-4',
}) => {
    return (
        <div className={`text-center ${marginBottom} ${paddingTop} ${paddingBottom} relative`}>
            {/* Optional background glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-blue-500/20 blur-xl opacity-70 animate-pulse-slow rounded-3xl"></div>

            <div className="relative">
                <h2 className={`${titleSize} font-bold bg-clip-text text-transparent bg-gradient-to-r from-${gradientFrom} via-${gradientVia} to-${gradientTo} dark:from-${darkFrom} dark:via-${darkVia} dark:to-${darkTo} inline-block mb-3`}>
                    {title}
                </h2>

                {/* Animated gradient underline */}
                <div className={`relative ${underlineHeight} ${underlineWidth} mx-auto`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom.replace('-600', '-500')} via-${gradientVia.replace('-600', '-500')} to-${gradientTo.replace('-600', '-500')} rounded-full animate-pulse`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom.replace('-600', '-500')} via-${gradientVia.replace('-600', '-500')} to-${gradientTo.replace('-600', '-500')} rounded-full blur-md animate-glow`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom.replace('-600', '-500')} via-${gradientVia.replace('-600', '-500')} to-${gradientTo.replace('-600', '-500')} rounded-full animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
                </div>

                {/* Optional subtitle */}
                {subtitle && (
                    <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-6 lg:px-0">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SectionHeading;
