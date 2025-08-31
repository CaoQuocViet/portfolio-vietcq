"use client";

import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import { 
    HomeIcon,
    UserIcon, 
    CogIcon,
    BriefcaseIcon,
    EnvelopeIcon
} from "@heroicons/react/24/solid";

const NAVIGATION_ITEMS = [
    { id: 'logo', label: 'vietcq', isLogo: true },
    { id: 'hero', label: 'Home', icon: HomeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 'about', label: 'About', icon: UserIcon, color: 'text-white', bg: 'bg-gradient-to-br from-green-500 to-green-600' },
    { id: 'services', label: 'Services', icon: CogIcon, color: 'text-white', bg: 'bg-gradient-to-br from-gray-500 to-gray-600' },
    { id: 'projects', label: 'Projects', icon: BriefcaseIcon, color: 'text-white', bg: 'bg-gradient-to-br from-orange-500 to-orange-600' },
    { id: 'contact', label: 'Contact', icon: EnvelopeIcon, color: 'text-white', bg: 'bg-gradient-to-br from-red-500 to-red-600' }
];

const NavigationItem = ({ item, activeSection, theme, scrollToSection, onClick }) => {
    const IconComponent = item.icon;
    const isActive = activeSection === item.id;
    const isLogo = item.isLogo;
    
    // Colorful icons theo Apple style
    const getIconColor = () => {
        if (isActive) return "text-white";
        
        return item.color || "text-gray-500 dark:text-gray-400";
    };
    
    if (isLogo) {
        return (
            <button
                onClick={() => {
                    scrollToSection('hero');
                    onClick?.();
                }}
                className={`relative group flex items-center justify-center h-12 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    activeSection === 'hero'
                        ? "bg-gradient-to-r from-blue-600/20 to-blue-700/20 shadow-lg"
                        : "hover:bg-gray-100/30 dark:hover:bg-gray-800/30"
                }`}
                title="Home"
            >
                <span className={`text-lg font-bold transition-all duration-300 bg-gradient-to-r ${
                    theme === 'dark' 
                        ? 'from-blue-400 via-purple-400 to-blue-400' 
                        : 'from-blue-600 via-purple-600 to-blue-600'
                } bg-clip-text text-transparent`} style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                    vietcq
                </span>
                
                {/* Floating dot */}
                <span className={`inline-block ml-1 text-base transition-all duration-300 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`} style={{
                    animation: 'float 3s ease-in-out infinite'
                }}>.</span>
            </button>
        );
    }
    
    return (
        <button
            onClick={() => {
                scrollToSection(item.id);
                onClick?.();
            }}
            className={`relative group flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 transform ${
                isActive
                    ? `scale-110 ${item.bg} shadow-lg shadow-${item.bg.split('-')[3]}-500/25`
                    : `${item.bg} hover:scale-105 active:scale-95 shadow-lg`
            }`}
            title={item.label}
        >
            <IconComponent 
                size={20} 
                className={`transition-all duration-300 ${item.color}`} 
            />
            
            {/* Active indicator dot */}
            <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive 
                    ? "bg-white scale-100" 
                    : "bg-transparent scale-0"
            }`} />
            
            {/* Clean tooltip */}
            <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:block`}>
                {item.label}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
            </div>
        </button>
    );
};

const ThemeToggle = ({ theme, setTheme }) => (
    <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative group flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 active:scale-95"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
        {theme === 'dark' ? (
            <FaSun size={18} className="text-yellow-600 group-hover:text-yellow-500 transition-colors duration-300" />
        ) : (
            <FaMoon size={18} className="text-slate-600 group-hover:text-slate-500 transition-colors duration-300" />
        )}
        
        {/* Clean tooltip */}
        <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:block`}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
        </div>
    </button>
);

// Component Dock reusable - copy exact từ Navigation
const Dock = ({ theme, setTheme, activeSection, scrollToSection }) => {
    return (
        <nav className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
            theme === 'dark' 
                ? 'bg-gray-800/70 backdrop-blur-lg border-gray-700/40 shadow-xl shadow-black/20' 
                : 'bg-white/70 backdrop-blur-lg border-gray-200/40 shadow-xl shadow-gray-900/10'
        } border rounded-2xl px-5 py-3`}>
            <div className="flex items-center justify-center space-x-6">
                {/* Navigation Items với Logo đầu tiên */}
                {NAVIGATION_ITEMS.map((item, index) => (
                    <div key={item.id} className="flex items-center">
                        <NavigationItem
                            item={item}
                            activeSection={activeSection}
                            theme={theme}
                            scrollToSection={scrollToSection}
                        />
                        
                        {/* Clean separator sau logo */}
                        {index === 0 && (
                            <div className={`w-px h-6 mx-4 ${
                                theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-300/50'
                            }`} />
                        )}
                    </div>
                ))}
                
                {/* Clean separator trước theme toggle */}
                <div className={`w-px h-6 mx-4 ${
                    theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-300/50'
                }`} />
                
                {/* Theme Toggle */}
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
        </nav>
    );
};

export default Dock;
