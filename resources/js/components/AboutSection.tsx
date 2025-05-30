import React from 'react';
import ModernAboutSection from './ModernAboutSection';

interface AboutSectionProps {
    sectionRef: (el: HTMLElement | null) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ sectionRef }) => {
    return (
        <div ref={sectionRef}>
            <ModernAboutSection />
        </div>
    );
};

export default AboutSection;
