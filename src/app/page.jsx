"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Import components
import Navigation from "../components/layout/Navigation";
import Hero from "../components/layout/hero/Hero";
import About from "../components/layout/about/About";
import Services from "../components/layout/Services";
import Projects from "../components/layout/Projects";
import Showcase from "../components/layout/Showcase";
import Contact from "../components/layout/Contact";
import Footer from "../components/layout/Footer";

export default function HomePage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        setMounted(true);
        
        // Restore từ URL hash
        const hash = window.location.hash.replace('#', '');
        if (hash && ['hero', 'about', 'services', 'projects', 'contact'].includes(hash)) {
            setActiveSection(hash);
            setTimeout(() => scrollToSection(hash), 100);
        }
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        window.location.hash = sectionId;
    };

    if (!mounted) return null;

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            <Navigation 
                theme={theme} 
                setTheme={setTheme} 
                activeSection={activeSection} 
                scrollToSection={scrollToSection} 
            />
            
            <Hero theme={theme} scrollToSection={scrollToSection} />
            <About theme={theme} />
            <Services theme={theme} />
            <Projects theme={theme} />
            <Showcase theme={theme} />
            <Contact theme={theme} scrollToSection={scrollToSection} />
            <Footer theme={theme} />

            {/* Global Animation Styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes gradientMove {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes slideIn {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                    40%, 43% { transform: translateY(-10px); }
                    70% { transform: translateY(-5px); }
                    90% { transform: translateY(-2px); }
                }

                @keyframes orbitRotate {
                    from {
                        transform: translate(-50%, -50%) rotate(0deg) translateY(-200px) rotate(0deg);
                    }
                    to {
                        transform: translate(-50%, -50%) rotate(360deg) translateY(-200px) rotate(-360deg);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
