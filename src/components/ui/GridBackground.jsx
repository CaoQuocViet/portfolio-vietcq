"use client";

import { useEffect, useState } from 'react';

function GridBackground({ children, theme = 'dark', colorScheme = 'blue' }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Color configuration based on scheme
    const colors = {
        blue: {
            main: { light: 'rgba(59, 130, 246, 0.25)', dark: 'rgba(59, 130, 246, 0.25)' },
            secondary: { light: 'rgba(139, 92, 246, 0.3)', dark: 'rgba(139, 92, 246, 0.3)' },
            spotlight: { 
                light: 'rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.06), transparent 70%',
                dark: 'rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.08), transparent 70%'
            },
            dots: 'bg-blue-600/50 dark:bg-blue-400/40'
        },
        pink: {
            main: { light: 'rgba(236, 72, 153, 0.25)', dark: 'rgba(239, 68, 68, 0.25)' },
            secondary: { light: 'rgba(219, 39, 119, 0.3)', dark: 'rgba(220, 38, 38, 0.3)' },
            spotlight: { 
                light: 'rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.06), transparent 70%',
                dark: 'rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.08), transparent 70%'
            },
            dots: 'bg-pink-600/50 dark:bg-red-600/50'
        }
    };

    const currentColors = colors[colorScheme] || colors.blue;

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={children ? "relative" : "absolute inset-0 overflow-hidden pointer-events-none"}>
            {/* Background Layer */}
            <div className={children ? "absolute inset-0 overflow-hidden pointer-events-none" : ""}>
                {/* Main Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, ${theme === 'dark' ? currentColors.main.dark : currentColors.main.light} 1px, transparent 1px),
                            linear-gradient(to bottom, ${theme === 'dark' ? currentColors.main.dark : currentColors.main.light} 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        animation: 'gridMove 20s linear infinite'
                    }}
                />

                {/* Secondary Grid Pattern - Smaller */}
                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, ${theme === 'dark' ? currentColors.secondary.dark : currentColors.secondary.light} 1px, transparent 1px),
                            linear-gradient(to bottom, ${theme === 'dark' ? currentColors.secondary.dark : currentColors.secondary.light} 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        animation: 'gridMove 30s linear infinite reverse'
                    }}
                />

                {/* Mouse Follow Spotlight */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
                            theme === 'dark' ? currentColors.spotlight.dark : currentColors.spotlight.light
                        })`,
                        width: '100%',
                        height: '100%',
                        transition: 'all 0.3s ease'
                    }}
                />

                {/* Floating Dots */}
                <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full ${currentColors.dots}`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content Layer - Only render if there are children */}
            {children && (
                <div className="relative z-10">
                    {children}
                </div>
            )}

            {/* CSS Styles */}
            <style jsx>{`
                @keyframes gridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }

                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) scale(1);
                        opacity: 0.3;
                    }
                    50% { 
                        transform: translateY(-20px) scale(1.2);
                        opacity: 0.8;
                    }
                }
            `}</style>
        </div>
    );
};

export default GridBackground;
