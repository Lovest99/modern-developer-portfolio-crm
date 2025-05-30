import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'about-pattern': "url('../images/backgrounds/about/background.jpg')",
            },
            colors: {
                magenta: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                    950: '#500724',
                },
            },
            animation: {
                'gradient-x': 'gradient-x 10s ease infinite',
                'float1': 'float1 8s ease-in-out infinite',
                'float2': 'float2 12s ease-in-out infinite',
                'float3': 'float3 10s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'matrix': 'matrix 20s linear infinite',
                'glitch': 'glitch 5s ease-in-out infinite',
                'scroll-down': 'scroll-down 2s ease infinite',
                'float-particle': 'float-particle 15s ease-in-out infinite',
                'text-reveal': 'text-reveal 1s ease forwards',
                'slide-up': 'slide-up 0.6s ease forwards',
                'neural-pulse': 'neural-pulse 4s ease-in-out infinite',
                'neural-path': 'neural-path 10s linear infinite',
                'tech-float-1': 'tech-float-1 6s ease-in-out infinite',
                'tech-float-2': 'tech-float-2 8s ease-in-out infinite',
                'tech-float-3': 'tech-float-3 7s ease-in-out infinite',
                'circuit-trace': 'circuit-trace 15s linear infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
                'spin-slow': 'spin 8s linear infinite',
                'morph': 'morph 8s ease-in-out infinite',
                'fade-in-out': 'fade-in-out 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-delay': 'float 7s ease-in-out infinite 1s',
                'particle-1': 'particle 3s ease-in-out infinite',
                'particle-2': 'particle 4s ease-in-out infinite 0.5s',
                'particle-3': 'particle 3.5s ease-in-out infinite 1s',
                'shine': 'shine 1.5s ease-in-out infinite',
                'fadeIn': 'fadeIn 0.5s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'scroll-left': 'scroll-left 30s linear infinite',
                'scroll-right': 'scroll-right 30s linear infinite',
            },
            keyframes: {
                'glow': {
                    '0%': {
                        opacity: 0.5,
                        filter: 'blur(10px)',
                    },
                    '100%': {
                        opacity: 0.8,
                        filter: 'blur(7px)',
                    },
                },
                'gradient-x': {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
                'float1': {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-20px)',
                    },
                },
                'float2': {
                    '0%, 100%': {
                        transform: 'translate(0, 0)',
                    },
                    '25%': {
                        transform: 'translate(10px, -15px)',
                    },
                    '50%': {
                        transform: 'translate(20px, 0)',
                    },
                    '75%': {
                        transform: 'translate(10px, 15px)',
                    },
                },
                'float3': {
                    '0%, 100%': {
                        transform: 'translate(0, 0)',
                    },
                    '33%': {
                        transform: 'translate(-10px, 10px)',
                    },
                    '66%': {
                        transform: 'translate(10px, 20px)',
                    },
                },
                'tech-float-1': {
                    '0%, 100%': {
                        transform: 'translate(0, 0) rotate(0deg)',
                    },
                    '50%': {
                        transform: 'translate(-15px, -15px) rotate(-5deg)',
                    },
                },
                'tech-float-2': {
                    '0%, 100%': {
                        transform: 'translate(0, 0) rotate(0deg)',
                    },
                    '50%': {
                        transform: 'translate(15px, -10px) rotate(5deg)',
                    },
                },
                'tech-float-3': {
                    '0%, 100%': {
                        transform: 'translate(0, 0) rotate(0deg)',
                    },
                    '50%': {
                        transform: 'translate(-10px, 15px) rotate(-3deg)',
                    },
                },
                'circuit-trace': {
                    '0%': {
                        'background-position': '0% 0%',
                    },
                    '100%': {
                        'background-position': '100% 100%',
                    },
                },
                'shimmer': {
                    '0%': {
                        'background-position': '-80vw 0',
                    },
                    '100%': {
                        'background-position': '80vw 0',
                    },
                },
                'morph': {
                    '0%, 100%': {
                        'border-radius': '60% 40% 30% 70%/60% 30% 70% 40%',
                    },
                    '25%': {
                        'border-radius': '30% 60% 70% 40%/50% 60% 30% 60%',
                    },
                    '50%': {
                        'border-radius': '40% 60% 30% 70%/60% 40% 70% 30%',
                    },
                    '75%': {
                        'border-radius': '60% 40% 70% 30%/30% 60% 40% 70%',
                    },
                },
                'fade-in-out': {
                    '0%, 100%': {
                        opacity: '0.3',
                    },
                    '50%': {
                        opacity: '0.8',
                    },
                },
                'matrix': {
                    '0%': {
                        transform: 'translateY(0)',
                    },
                    '100%': {
                        transform: 'translateY(-1000px)',
                    },
                },
                'glitch': {
                    '0%, 100%': {
                        transform: 'translateX(0)',
                    },
                    '5%, 95%': {
                        transform: 'translateX(0)',
                    },
                    '10%': {
                        transform: 'translateX(3px)',
                    },
                    '15%': {
                        transform: 'translateX(-3px)',
                    },
                    '20%': {
                        transform: 'translateX(3px)',
                    },
                    '25%': {
                        transform: 'translateX(-3px)',
                    },
                    '30%': {
                        transform: 'translateX(0)',
                    },
                },
                'scroll-down': {
                    '0%': {
                        transform: 'translateY(0)',
                        opacity: '1',
                    },
                    '25%': {
                        opacity: '1',
                    },
                    '75%': {
                        transform: 'translateY(6px)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '0',
                    },
                },
                'float-particle': {
                    '0%, 100%': {
                        transform: 'translate(0, 0)',
                    },
                    '25%': {
                        transform: 'translate(20px, -30px)',
                    },
                    '50%': {
                        transform: 'translate(40px, 0)',
                    },
                    '75%': {
                        transform: 'translate(20px, 30px)',
                    },
                },
                'text-reveal': {
                    '0%': {
                        transform: 'translateY(20px)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1',
                    },
                },
                'slide-up': {
                    '0%': {
                        transform: 'translateY(30px)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: '1',
                    },
                },
                'neural-pulse': {
                    '0%, 100%': {
                        transform: 'scale(1)',
                        opacity: '0.3',
                    },
                    '50%': {
                        transform: 'scale(1.5)',
                        opacity: '0.7',
                    },
                },
                'neural-path': {
                    '0%': {
                        'stroke-dashoffset': '1000',
                    },
                    '100%': {
                        'stroke-dashoffset': '0',
                    },
                },
                'float': {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                    },
                    '50%': {
                        transform: 'translateY(-10px)',
                    },
                },
                'particle': {
                    '0%, 100%': {
                        transform: 'translateY(0) translateX(0)',
                        opacity: '0',
                    },
                    '25%': {
                        opacity: '1',
                    },
                    '50%': {
                        transform: 'translateY(-20px) translateX(10px)',
                        opacity: '0.5',
                    },
                    '75%': {
                        opacity: '0.2',
                    },
                    '90%': {
                        opacity: '0',
                    }
                },
                'shine': {
                    '0%': {
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        transform: 'translateX(100%)',
                    },
                },
                'fadeIn': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                'scroll-left': {
                    '0%': {
                        transform: 'translateX(0)',
                    },
                    '100%': {
                        transform: 'translateX(-50%)',
                    },
                },
                'scroll-right': {
                    '0%': {
                        transform: 'translateX(-50%)',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                    },
                },
            },
        },
    },

    plugins: [
        forms,
        function({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    /* Firefox */
                    'scrollbar-width': 'none',
                    /* Safari and Chrome */
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            });
        }
    ],
};
