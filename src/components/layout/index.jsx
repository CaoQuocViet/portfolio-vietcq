"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useTheme } from "next-themes";
import { useWindowsSound } from "../../hooks/useWindowsSound";

// Import components
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./about/About";
import Services from "./Services";
import Projects from "./Projects";
import Showcase from "./Showcase";
import Contact from "./Contact";
import Footer from "./Footer";
import ClockWidget from "./ClockWidget";

const SECTIONS = ["hero", "about", "services", "projects", "showcase", "contact"];

// CRITICAL: Zero re-render components
const StableClock = memo(ClockWidget, () => true); // Never re-render unless forced

const StableNavigation = memo(Navigation, (prev, next) => (
    prev.theme === next.theme &&
    prev.activeSection === next.activeSection
)); // Remove scrollToSection from comparison to prevent re-render

const StableHero = memo(Hero, (prev, next) => prev.theme === next.theme);
const StableAbout = memo(About, (prev, next) => prev.theme === next.theme);
const StableServices = memo(Services, (prev, next) => prev.theme === next.theme);
const StableProjects = memo(Projects, (prev, next) => prev.theme === next.theme);
const StableShowcase = memo(Showcase, (prev, next) => prev.theme === next.theme);
const StableContact = memo(Contact, (prev, next) => prev.theme === next.theme);
const StableFooter = memo(Footer, (prev, next) => prev.theme === next.theme);

export default function HomePageClient() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    // CRITICAL: Use ONLY refs, NO state for active section to prevent re-renders
    const activeSectionRef = useRef("hero");
    const navActiveRef = useRef("hero"); // Separate ref for navigation
    const observerRef = useRef(null);
    const frameIdRef = useRef(null);
    const setNavSectionRef = useRef(null);
    
    const { playSound } = useWindowsSound();
    
    // PERFORMANCE: Create stable scroll function ONCE
    const scrollToSectionRef = useRef(null);
    
    useEffect(() => {
        scrollToSectionRef.current = (sectionId) => {
            if (SECTIONS.indexOf(sectionId) === -1) return;
            
            activeSectionRef.current = sectionId;
            navActiveRef.current = sectionId;
            
            // Update navigation directly without causing re-render
            if (setNavSectionRef.current) {
                setNavSectionRef.current(sectionId);
            }
            
            requestAnimationFrame(() => {
                document.getElementById(sectionId)?.scrollIntoView({ 
                    behavior: "smooth",
                    block: "start"
                });
            });
            
            window.history.replaceState(null, "", `#${sectionId}`);
        };
    }, []);

    // Mount only
    useEffect(() => {
        setMounted(true);
    }, []);

    // Initial setup - run once
    useEffect(() => {
        if (!mounted) return;
        
        playSound?.();
        
        const hash = window.location.hash.slice(1);
        if (hash && SECTIONS.indexOf(hash) !== -1) {
            activeSectionRef.current = hash;
            navActiveRef.current = hash;
            
            setTimeout(() => {
                document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [mounted, playSound]);

    // ZERO RE-RENDER IntersectionObserver
    useEffect(() => {
        if (!mounted) return;

        let pendingSection = null;
        
        const handleIntersection = (entries) => {
            let bestRatio = 0;
            let bestSection = null;
            
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (!entry.isIntersecting) continue;
                
                const sectionId = entry.target.id;
                if (SECTIONS.indexOf(sectionId) === -1) continue;
                
                if (entry.intersectionRatio > bestRatio) {
                    bestRatio = entry.intersectionRatio;
                    bestSection = sectionId;
                }
            }

            if (!bestSection || bestSection === pendingSection || 
                bestSection === activeSectionRef.current) {
                return;
            }

            pendingSection = bestSection;
            
            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }
            
            frameIdRef.current = requestAnimationFrame(() => {
                pendingSection = null;
                activeSectionRef.current = bestSection;
                navActiveRef.current = bestSection;
                
                // Update navigation directly without causing main component re-render
                if (setNavSectionRef.current) {
                    setNavSectionRef.current(bestSection);
                }
                
                window.history.replaceState(null, "", `#${bestSection}`);
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersection, {
            rootMargin: "-40% 0px -40% 0px",
            threshold: [0.1, 0.5, 0.9]
        });

        for (let i = 0; i < SECTIONS.length; i++) {
            const element = document.getElementById(SECTIONS[i]);
            if (element) {
                observerRef.current.observe(element);
            }
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }
        };
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
            <StableClock theme={theme} />
            
            <StableNavigation
                theme={theme}
                setTheme={setTheme}
                activeSection={navActiveRef.current}
                scrollToSection={scrollToSectionRef.current}
                setNavSectionRef={setNavSectionRef}
            />

            <StableHero theme={theme} scrollToSection={scrollToSectionRef.current} />
            <StableAbout theme={theme} />
            <StableServices theme={theme} />
            <StableProjects theme={theme} />
            <StableShowcase theme={theme} />
            <StableContact theme={theme} scrollToSection={scrollToSectionRef.current} />
            <StableFooter theme={theme} />

            {/* OPTIMIZED CSS */}
            <style jsx>{`
                * {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                
                @keyframes float {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, -10px, 0); }
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate3d(0, 30px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                
                @keyframes gradientMove {
                    0%, 100% { background-position: 0% 0%; }
                    50% { background-position: 100% 100%; }
                }
                
                @keyframes slideIn {
                    from { transform: scaleX(0) translateZ(0); }
                    to { transform: scaleX(1) translateZ(0); }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
                    40%, 43% { transform: translate3d(0, -10px, 0); }
                    70% { transform: translate3d(0, -5px, 0); }
                    90% { transform: translate3d(0, -2px, 0); }
                }

                @keyframes orbitRotate {
                    from { transform: translate(-50%, -50%) rotate(0deg) translateY(-200px) rotate(0deg) translateZ(0); }
                    to { transform: translate(-50%, -50%) rotate(360deg) translateY(-200px) rotate(-360deg) translateZ(0); }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1) translateZ(0); }
                    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05) translateZ(0); }
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                html { scroll-behavior: smooth; }
                img { transform: translateZ(0); }
            `}</style>
        </div>
    );
}
