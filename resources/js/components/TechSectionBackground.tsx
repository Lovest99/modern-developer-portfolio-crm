import React from 'react';
import CodeGrid from './CodeGrid';
import TechBackground from './TechBackground';

interface TechSectionBackgroundProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  intensity?: 'low' | 'medium' | 'high';
  showCodeSnippets?: boolean;
  showAnimations?: boolean;
}

const TechSectionBackground: React.FC<TechSectionBackgroundProps> = ({
  variant = 'primary',
  intensity = 'medium',
  showCodeSnippets = true,
  showAnimations = false
}) => {
  // Define color variations based on variant
  const colors = {
    primary: {
      main: 'cyan',
      accent: 'purple'
    },
    secondary: {
      main: 'purple',
      accent: 'cyan'
    },
    tertiary: {
      main: 'blue',
      accent: 'emerald'
    }
  };

  // Define opacity based on intensity (reduced for better text visibility)
  const opacities = {
    low: {
      grid: 'opacity-10 dark:opacity-5',
      glow: '[0.01] dark:[0.005]'
    },
    medium: {
      grid: 'opacity-15 dark:opacity-10',
      glow: '[0.015] dark:[0.01]'
    },
    high: {
      grid: 'opacity-20 dark:opacity-15',
      glow: '[0.02] dark:[0.015]'
    }
  };

  const selectedColor = colors[variant];
  const selectedOpacity = opacities[intensity];

  // Get the correct gradient colors based on variant
  const getGridColor = () => {
    if (variant === 'primary') return 'rgba(6,182,212,0.03)';
    if (variant === 'secondary') return 'rgba(124,58,237,0.03)';
    return 'rgba(59,130,246,0.03)';
  };

  // Get the correct glow colors based on variant
  const getGlowStyles = () => {
    const mainColor = variant === 'primary' ? 'cyan' :
                      variant === 'secondary' ? 'purple' : 'blue';
    const accentColor = variant === 'primary' ? 'purple' :
                        variant === 'secondary' ? 'cyan' : 'emerald';
    const opacity = intensity === 'low' ? '0.02' :
                    intensity === 'medium' ? '0.03' : '0.04';
    const darkOpacity = intensity === 'low' ? '0.01' :
                        intensity === 'medium' ? '0.02' : '0.03';

    return {
      mainGlow: {
        backgroundColor: `var(--${mainColor}-500)`,
        opacity: opacity,
        filter: 'blur(60px)',
      },
      mainGlowDark: {
        backgroundColor: `var(--${mainColor}-400)`,
        opacity: darkOpacity,
        filter: 'blur(60px)',
      },
      accentGlow: {
        backgroundColor: `var(--${accentColor}-500)`,
        opacity: opacity,
        filter: 'blur(60px)',
      },
      accentGlowDark: {
        backgroundColor: `var(--${accentColor}-400)`,
        opacity: darkOpacity,
        filter: 'blur(60px)',
      }
    };
  };

  const gridColor = getGridColor();
  const glowStyles = getGlowStyles();

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Base tech pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.02)_0,rgba(0,0,0,0)_70%)]"></div>

      {/* Circuit-like grid pattern */}
      <div className={`absolute h-full w-full bg-[linear-gradient(to_right,${gridColor}_1px,transparent_1px),linear-gradient(to_bottom,${gridColor}_1px,transparent_1px)] bg-[size:40px_40px] ${selectedOpacity.grid}`}></div>

      {/* Code snippets in background (optional) */}
      {showCodeSnippets && <CodeGrid />}

      {/* Animated tech symbols and binary (optional) */}
      {showAnimations && <TechBackground />}

      {/* Tech glow spots - using inline styles for dynamic colors */}
      <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full dark:hidden"
           style={glowStyles.mainGlow}></div>
      <div className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full hidden dark:block"
           style={glowStyles.mainGlowDark}></div>

      <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] rounded-full dark:hidden"
           style={glowStyles.accentGlow}></div>
      <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] rounded-full hidden dark:block"
           style={glowStyles.accentGlowDark}></div>
    </div>
  );
};

export default TechSectionBackground;
