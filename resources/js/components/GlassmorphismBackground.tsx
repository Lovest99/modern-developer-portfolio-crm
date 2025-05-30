import React from 'react';

interface GlassmorphismBackgroundProps {
  variant?: 'blue' | 'purple' | 'cyan' | 'emerald' | 'amber';
  intensity?: 'low' | 'medium' | 'high';
  pattern?: 'dots' | 'lines' | 'circles' | 'waves';
  showNoise?: boolean;
}

const GlassmorphismBackground: React.FC<GlassmorphismBackgroundProps> = ({
  variant = 'blue',
  intensity = 'medium',
  pattern = 'dots',
  showNoise = true
}) => {
  // Define color variations based on variant
  const getColors = () => {
    switch (variant) {
      case 'blue':
        return {
          primary: 'rgba(59, 130, 246, 0.15)',
          secondary: 'rgba(37, 99, 235, 0.1)',
          accent: 'rgba(96, 165, 250, 0.05)'
        };
      case 'purple':
        return {
          primary: 'rgba(139, 92, 246, 0.15)',
          secondary: 'rgba(124, 58, 237, 0.1)',
          accent: 'rgba(167, 139, 250, 0.05)'
        };
      case 'cyan':
        return {
          primary: 'rgba(6, 182, 212, 0.15)',
          secondary: 'rgba(8, 145, 178, 0.1)',
          accent: 'rgba(34, 211, 238, 0.05)'
        };
      case 'emerald':
        return {
          primary: 'rgba(16, 185, 129, 0.15)',
          secondary: 'rgba(5, 150, 105, 0.1)',
          accent: 'rgba(52, 211, 153, 0.05)'
        };
      case 'amber':
        return {
          primary: 'rgba(245, 158, 11, 0.15)',
          secondary: 'rgba(217, 119, 6, 0.1)',
          accent: 'rgba(251, 191, 36, 0.05)'
        };
      default:
        return {
          primary: 'rgba(59, 130, 246, 0.15)',
          secondary: 'rgba(37, 99, 235, 0.1)',
          accent: 'rgba(96, 165, 250, 0.05)'
        };
    }
  };

  // Adjust opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'low':
        return 0.7;
      case 'medium':
        return 1;
      case 'high':
        return 1.3;
      default:
        return 1;
    }
  };

  // Get pattern background
  const getPatternStyle = () => {
    switch (pattern) {
      case 'dots':
        return {
          backgroundImage: `radial-gradient(${getColors().accent} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        };
      case 'lines':
        return {
          backgroundImage: `linear-gradient(to right, ${getColors().accent} 1px, transparent 1px),
                           linear-gradient(to bottom, ${getColors().accent} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        };
      case 'circles':
        return {
          backgroundImage: `radial-gradient(circle at 50% 50%, ${getColors().accent} 0%, transparent 25%)`,
          backgroundSize: '60px 60px'
        };
      case 'waves':
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.24.19 1.64.39 1.85.39h1.87c.698-.0.088-.09.923-.51 1.548-.99 1.54-.99 2.67-.99 1.134.0 1.83-.09 2.58-.09 1.24.0 1.68.14 1.82.14.14.0.49.05.89-.14 1.07-.54 1.33-.54 1.78-.54 1.37.0 1.74.14 2.02.14.37.0.92-.14 1.72-.4.177-.05.37-.04.53-.04 1.25.0 1.65.19 1.85.19.17.0.36-.05.53-.19.36-.14.72-.29.89-.29.17.0.71.05 1.67.2.97.14 1.31.14 1.48.14.27.0.53-.05.89-.19.8-.24 1.34-.39 1.67-.39.36.0.89.14 1.42.24.54.1.89.19 1.25.19.36.0.88-.09 1.43-.29 1.07-.39 1.6-.59 1.96-.59.37.0.88.19 1.25.19.37.0.74-.09 1.07-.29.36-.19.88-.39 1.43-.39.54.0 1.07.19 1.6.19.54.0 1.07-.19 1.78-.59.7-.39 1.24-.59 1.6-.59.36.0.71.19 1.07.19.35.0.88-.19 1.42-.39.55-.19 1.07-.39 1.43-.39.36.0.88.19 1.25.19.37.0.88-.19 1.43-.39.54-.19 1.07-.39 1.42-.39.36.0.89.19 1.25.19.37.0.88-.19 1.43-.39.54-.19 1.07-.39 1.43-.39.35.0.88.19 1.24.19.36.0.71-.19 1.07-.39.36-.19.88-.39 1.43-.39.54.0 1.07.19 1.42.19.36.0.89-.19 1.43-.39.54-.19 1.07-.39 1.43-.39.35.0.88.19 1.24.19.37.0.88-.19 1.43-.39.54-.19 1.07-.39 1.43-.39.35.0.88.19 1.24.19.36.0.89-.19 1.43-.39.54-.19 1.07-.39 1.42-.39.36.0.89.19 1.25.19.37.0.88-.19 1.43-.39.54-.19 1.07-.39 1.42-.39.36.0.89.19 1.25.19.37.0.88-.19 1.43-.39.54-.19 1.07-.39 1.43-.39.35.0.88.19 1.24.19.36.0.89-.19 1.43-.39.54-.19 1.07-.39 1.43-.39.34.0.88.19 1.24.19z' fill='${encodeURIComponent(getColors().accent)}' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px'
        };
      default:
        return {
          backgroundImage: `radial-gradient(${getColors().accent} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        };
    }
  };

  const colors = getColors();
  const opacity = getOpacity();
  const patternStyle = getPatternStyle();

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Base glassmorphism layer */}
      <div
        className="absolute inset-0 backdrop-blur-[80px]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
          backdropFilter: 'blur(80px)'
        }}
      ></div>

      {/* Color gradient layers */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${colors.primary}, transparent 40%)`,
          opacity: opacity
        }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at 80% 80%, ${colors.secondary}, transparent 40%)`,
          opacity: opacity
        }}
      ></div>

      {/* Pattern overlay */}
      <div
        className="absolute inset-0"
        style={patternStyle}
      ></div>

      {/* Noise texture (optional) */}
      {showNoise && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        ></div>
      )}

      {/* Light reflections */}
      <div
        className="absolute top-[10%] left-[5%] w-[30%] h-[20%] rounded-full"
        style={{
          background: `linear-gradient(135deg, ${colors.accent}, transparent)`,
          opacity: 0.5,
          filter: 'blur(40px)'
        }}
      ></div>
      <div
        className="absolute bottom-[20%] right-[10%] w-[25%] h-[15%] rounded-full"
        style={{
          background: `linear-gradient(135deg, ${colors.accent}, transparent)`,
          opacity: 0.4,
          filter: 'blur(40px)'
        }}
      ></div>
    </div>
  );
};

export default GlassmorphismBackground;
