"use client";

const WaveBackground = () => {
    return (
        <>
            {/* 4 Wave Lanes with Speed Ratios: 1x, 1.5x, 2x, 2.5x */}
            <div className="absolute bottom-10 left-0 w-full h-20 overflow-hidden">
                {/* Lane 1 - Base Speed (1x) - Sine Wave - Darkest Background */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlow1 24s linear infinite' }}
                >
                    <path 
                        d="M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z" 
                        opacity="1" 
                        fill="#1e40af"
                    />
                </svg>
                {/* Duplicate Lane 1 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlow1 24s linear infinite' }}
                >
                    <path 
                        d="M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z" 
                        opacity="1" 
                        fill="#1e40af"
                    />
                </svg>

                {/* Lane 2 - 1.5x Speed - Sine Wave - Medium Dark */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlow2 16s linear infinite' }}
                >
                    <path 
                        d="M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z" 
                        opacity="0.85" 
                        fill="#3b82f6"
                    />
                </svg>
                {/* Duplicate Lane 2 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlow2 16s linear infinite' }}
                >
                    <path 
                        d="M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z" 
                        opacity="0.85" 
                        fill="#3b82f6"
                    />
                </svg>

                {/* Lane 3 - 2x Speed - Sine Wave - Light */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlow3 12s linear infinite' }}
                >
                    <path 
                        d="M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z" 
                        opacity="0.6" 
                        fill="#60a5fa"
                    />
                </svg>
                {/* Duplicate Lane 3 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlow3 12s linear infinite' }}
                >
                    <path 
                        d="M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z" 
                        opacity="0.6" 
                        fill="#60a5fa"
                    />
                </svg>

                {/* Lane 4 - 2.5x Speed (Fastest) - Sine Wave - Lightest */}
                <svg 
                    className="absolute left-0 w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlow4 9.6s linear infinite' }}
                >
                    <path 
                        d="M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z" 
                        opacity="0.3" 
                        fill="#93c5fd"
                    />
                </svg>
                {/* Duplicate Lane 4 for seamless loop */}
                <svg 
                    className="absolute left-full w-full h-full" 
                    viewBox="0 0 1200 80" 
                    preserveAspectRatio="none"
                    style={{ animation: 'waveFlow4 9.6s linear infinite' }}
                >
                    <path 
                        d="M0,60 L0,60 Q100,20 200,60 Q300,100 400,60 Q500,20 600,60 Q700,100 800,60 Q900,20 1000,60 Q1100,100 1200,60 L1200,60 L1200,80 L0,80 Z" 
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
            `}</style>
        </>
    );
};

export default WaveBackground;
