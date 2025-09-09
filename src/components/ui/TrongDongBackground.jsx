"use client";

const TrongDongBackground = ({ theme }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Single SVG Background */}
            <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    backgroundImage: 'url(/img/trong-dong-dong-son.svg)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    animation: 'clockwiseRotate 20s linear infinite',
                    filter: theme === 'dark' 
                        ? 'brightness(0.7) saturate(1.5) hue-rotate(35deg)' 
                        : 'brightness(1) saturate(1.2) hue-rotate(20deg)',
                    opacity: theme === 'dark' ? 0.3 : 0.7
                }}
            />

            {/* CSS Styles */}
            <style jsx>{`
                @keyframes clockwiseRotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(-360deg); }
                }
            `}</style>
        </div>
    );
};

export default TrongDongBackground;
