"use client";

const WaveBackgroundReversed = () => {
    return (
        <>
            {/* 4 Wave Lanes with Speed Ratios: 1x, 1.5x, 2x, 2.5x - REVERSED DOWNWARD */}
            <div className="absolute left-0 w-full h-20 overflow-hidden">
                {/* Lane 1 - Base Speed (1x) - Downward Sine Wave - Darkest Background */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlowReversed1 24s linear infinite' }}
                >
                    <path 
                        d="M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z" 
                        opacity="1" 
                        fill="#8b5cf6"
                    />
                </svg>
                {/* Duplicate Lane 1 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlowReversed1 24s linear infinite' }}
                >
                    <path 
                        d="M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z" 
                        opacity="1" 
                        fill="#8b5cf6"
                    />
                </svg>

                {/* Lane 2 - 1.5x Speed - Downward Sine Wave - Medium Dark */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlowReversed2 16s linear infinite' }}
                >
                    <path 
                        d="M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z" 
                        opacity="0.85" 
                        fill="#a78bfa"
                    />
                </svg>
                {/* Duplicate Lane 2 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlowReversed2 16s linear infinite' }}
                >
                    <path 
                        d="M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z" 
                        opacity="0.85" 
                        fill="#a78bfa"
                    />
                </svg>

                {/* Lane 3 - 2x Speed - Downward Sine Wave - Light */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlowReversed3 12s linear infinite' }}
                >
                    <path 
                        d="M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z" 
                        opacity="0.6" 
                        fill="#c4b5fd"
                    />
                </svg>
                {/* Duplicate Lane 3 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlowReversed3 12s linear infinite' }}
                >
                    <path 
                        d="M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z" 
                        opacity="0.6" 
                        fill="#c4b5fd"
                    />
                </svg>

                {/* Lane 4 - 2.5x Speed (Fastest) - Downward Sine Wave - Lightest */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlowReversed4 9.6s linear infinite' }}
                >
                    <path 
                        d="M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z" 
                        opacity="0.3" 
                        fill="#ddd6fe"
                    />
                </svg>
                {/* Duplicate Lane 4 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlowReversed4 9.6s linear infinite' }}
                >
                    <path 
                        d="M0,20 L0,20 Q100,60 200,20 Q300,-20 400,20 Q500,60 600,20 Q700,-20 800,20 Q900,60 1000,20 Q1100,-20 1200,20 L1200,20 L1200,0 L0,0 Z" 
                        opacity="0.3" 
                        fill="#ddd6fe"
                    />
                </svg>
            </div>

            {/* CSS Animations for Reversed Wave Flows - LEFT TO RIGHT */}
            <style jsx>{`
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

export default WaveBackgroundReversed;
