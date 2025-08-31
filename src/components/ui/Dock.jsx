"use client";

import { FaSun, FaMoon } from "react-icons/fa6";
import { DEFAULT_NAVIGATION_ITEMS } from "../../config/navigation";

const NavigationItem = ({ item, activeSection, theme, scrollToSection }) => {
    const IconComponent = item.icon;
    const isActive = activeSection === item.id;
    const isLogo = item.isLogo;
    
    if (isLogo) {
        return (
            <button
                onClick={() => scrollToSection('hero')}
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
                if (item.link) {
                    window.location.href = item.link;
                } else {
                    scrollToSection(item.id);
                }
            }}
            className={`relative group flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 transform ${
                isActive
                    ? `scale-110 ${item.bg} shadow-lg`
                    : `${item.bg} hover:scale-105 active:scale-95 shadow-lg`
            }`}
            title={item.label}
        >
            <IconComponent 
                size={20} 
                className={`transition-all duration-300 ${item.color}`} 
            />
            
            <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive ? "bg-white scale-100" : "bg-transparent scale-0"
            }`} />
            
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
        
        <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden md:block`}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
        </div>
    </button>
);

const Dock = ({ theme, setTheme, activeSection, scrollToSection, navigationItems = DEFAULT_NAVIGATION_ITEMS }) => {
    return (
        <nav className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
            theme === 'dark' 
                ? 'bg-gray-800/70 backdrop-blur-lg border-gray-700/40 shadow-xl shadow-black/20' 
                : 'bg-white/70 backdrop-blur-lg border-gray-200/40 shadow-xl shadow-gray-900/10'
        } border rounded-2xl px-5 py-3`}>
            <div className="flex items-center justify-center space-x-6">
                {navigationItems.map((item, index) => (
                    <div key={item.id} className="flex items-center">
                        <NavigationItem
                            item={item}
                            activeSection={activeSection}
                            theme={theme}
                            scrollToSection={scrollToSection}
                        />
                        
                        {index === 0 && (
                            <div className={`w-px h-6 mx-4 ${
                                theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-300/50'
                            }`} />
                        )}
                    </div>
                ))}
                
                <div className={`w-px h-6 mx-4 ${
                    theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-300/50'
                }`} />
                
                <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
        </nav>
    );
};

export default Dock;
