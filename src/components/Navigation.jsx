import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

export default function Navigation({ theme, setTheme, activeSection, scrollToSection }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            theme === 'dark' 
                ? 'bg-gray-950/80 backdrop-blur-md border-gray-800/50' 
                : 'bg-white/80 backdrop-blur-md border-gray-200/50'
        } border-b`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={`text-2xl font-bold transition-colors ${
                                theme === 'dark' ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                            }`}
                            style={{
                                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                            }}
                        >
                            VC
                            <span className="inline-block ml-1" style={{
                                animation: 'float 3s ease-in-out infinite'
                            }}>.</span>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {[
                                { id: 'hero', label: 'Home' },
                                { id: 'about', label: 'About' },
                                { id: 'services', label: 'Services' },
                                { id: 'projects', label: 'Projects' },
                                { id: 'contact', label: 'Contact' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative ${
                                        activeSection === item.id
                                            ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-600')
                                            : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                                    }`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                                            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                                        }`} style={{
                                            animation: 'slideIn 0.3s ease-out'
                                        }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                theme === 'dark' 
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                                theme === 'dark' 
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
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
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className={`md:hidden transition-all duration-300 ${
                        theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
                    } backdrop-blur-md border-t ${
                        theme === 'dark' ? 'border-gray-800/50' : 'border-gray-200/50'
                    }`}>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {[
                                { id: 'hero', label: 'Home' },
                                { id: 'about', label: 'About' },
                                { id: 'services', label: 'Services' },
                                { id: 'projects', label: 'Projects' },
                                { id: 'contact', label: 'Contact' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        scrollToSection(item.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block w-full text-left px-3 py-2 text-base font-medium transition-all duration-200 ${
                                        activeSection === item.id
                                            ? (theme === 'dark' ? 'text-blue-400 bg-gray-800/50' : 'text-blue-600 bg-blue-50')
                                            : (theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50')
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
