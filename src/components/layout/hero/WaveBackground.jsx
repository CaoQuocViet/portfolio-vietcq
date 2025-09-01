"use client";

import React from "react";

const WaveBackground = ({ reversed = false }) => {
    // Wave paths - normal (upward) vs reversed (downward)
    const normalPath = "M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z";
    const reversedPath = "M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z";
    
    const wavePath = reversed ? reversedPath : normalPath;
    
    // Container positioning
    const containerClass = reversed 
        ? "absolute left-0 w-full h-20 overflow-hidden"
        : "absolute bottom-10 left-0 w-full h-20 overflow-hidden";
    
    // Animation prefix
    const animPrefix = reversed ? 'waveFlowReversed' : 'waveFlow';

    return (
        <>
            {/* 4 Wave Lanes with Speed Ratios: 1x, 1.5x, 2x, 2.5x */}
            <div className={containerClass}>
                {/* Lane 1 - Base Speed (1x) - Sine Wave - Darkest Background */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: `${animPrefix}1 24s linear infinite` }}
                >
                    <path 
                        d={wavePath}
                        opacity="1" 
                        fill="#1e40af"
                    />
                </svg>
                {/* Duplicate Lane 1 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: `${animPrefix}1 24s linear infinite` }}
                >
                    <path 
                        d={wavePath}
                        opacity="1" 
                        fill="#1e40af"
                    />
                </svg>

                {/* Lane 2 - 1.5x Speed - Sine Wave - Medium Dark */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: `${animPrefix}2 16s linear infinite` }}
                >
                    <path 
                        d={wavePath}
                        opacity="0.85" 
                        fill="#3b82f6"
                    />
                </svg>
                {/* Duplicate Lane 2 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: `${animPrefix}2 16s linear infinite` }}
                >
                    <path 
                        d={wavePath}
                        opacity="0.85" 
                        fill="#3b82f6"
                    />
                </svg>

                {/* Lane 3 - 2x Speed - Sine Wave - Light */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: `${animPrefix}3 12s linear infinite` }}
                >
                    <path 
                        d={wavePath}
                        opacity="0.6" 
                        fill="#60a5fa"
                    />
                </svg>
                {/* Duplicate Lane 3 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: `${animPrefix}3 12s linear infinite` }}
                >
                    <path 
                        d={wavePath}
                        opacity="0.6" 
                        fill="#60a5fa"
                    />
                </svg>

                {/* Lane 4 - 2.5x Speed (Fastest) - Sine Wave - Lightest */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: `${animPrefix}4 9.6s linear infinite` }}
                >
                    <path 
                        d={wavePath}
                        opacity="0.3" 
                        fill="#93c5fd"
                    />
                </svg>
                {/* Duplicate Lane 4 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: `${animPrefix}4 9.6s linear infinite` }}
                >
                    <path 
                        d={wavePath}
                        opacity="0.3" 
                        fill="#93c5fd"
                    />
                </svg>
            </div>

            {/* CSS Animations for Wave Flows */}
            <style jsx>{`
                @keyframes waveFlow1 {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                
                @keyframes waveFlow2 {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                
                @keyframes waveFlow3 {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                
                @keyframes waveFlow4 {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }

                @keyframes waveFlowReversed1 {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                
                @keyframes waveFlowReversed2 {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                
                @keyframes waveFlowReversed3 {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                
                @keyframes waveFlowReversed4 {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
            `}</style>
        </>
    );
};

export default WaveBackground;
