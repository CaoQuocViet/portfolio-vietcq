"use client";

import { useState } from "react";
import Dock from "../ui/Dock";
import { HOME_NAVIGATION_ITEMS } from "../../config/navigation";

const MobileMenuToggle = ({ isMenuOpen, setIsMenuOpen, theme }) => (
    <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 ${
            theme === 'dark' 
                ? 'bg-gray-900/80 backdrop-blur-xl border-gray-700/30 hover:bg-gray-800' 
                : 'bg-white/80 backdrop-blur-xl border-gray-300/30 hover:bg-gray-100'
        } border shadow-lg`}
    >
        <div className="w-5 h-5 flex flex-col justify-around">
            <span className={`block h-0.5 w-full transition-all duration-300 ${
                theme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
            } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-full transition-all duration-300 ${
                theme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
            } ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full transition-all duration-300 ${
                theme === 'dark' ? 'bg-gray-300' : 'bg-gray-700'
            } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
    </button>
);

export default function Navigation({ theme, setTheme, activeSection, scrollToSection }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMobileMenuClose = () => setIsMenuOpen(false);

    return (
        <>
            {/* Dock Component - Reusable với navigation items riêng */}
            <Dock 
                theme={theme}
                setTheme={setTheme}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                navigationItems={HOME_NAVIGATION_ITEMS}
            />

            {/* Mobile Menu Toggle (only visible on mobile) */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <MobileMenuToggle 
                    isMenuOpen={isMenuOpen} 
                    setIsMenuOpen={setIsMenuOpen} 
                    theme={theme} 
                />
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
                    theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
                } backdrop-blur-md`}>
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        {/* Simplified mobile menu items */}
                        <div className="pt-4">
                            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                                Theme Toggle
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
