import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";

export default function Navigation({ theme, setTheme, activeSection, scrollToSection }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
            theme === 'dark' 
                ? 'bg-gray-900/40 backdrop-blur-md border-gray-700/20 shadow-xl shadow-gray-900/10' 
                : 'bg-white/50 backdrop-blur-md border-gray-300/20 shadow-xl shadow-gray-900/5'
        } border rounded-2xl`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="text-2xl font-bold transition-all duration-300 hover:scale-105"
                            style={{
                                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                            }}
                        >
                            <span className={`bg-gradient-to-r ${
                                theme === 'dark' 
                                    ? 'from-cyan-400 via-blue-500 to-purple-600' 
                                    : 'from-cyan-600 via-blue-700 to-purple-800'
                            } bg-clip-text text-transparent`}>
                                vietcq
                            </span>
                            <span className={`inline-block ml-1 ${
                                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                            }`} style={{
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
                                                                                                    className={`px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                                        activeSection === item.id
                                            ? "text-[#2365E3] dark:text-[#ff6100] bg-[#2365E3]/10 dark:bg-[#ff6100]/10"
                                            : "text-gray-600 dark:text-gray-300 hover:text-[#2365E3] dark:hover:text-[#ff6100] hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    }`}
                                >
                                    {item.label}

                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
                        <nav className="container mx-auto px-4 py-6 flex flex-col space-y-2">
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
                                    className={`block px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                                        activeSection === item.id
                                            ? "text-[#2365E3] dark:text-[#ff6100] bg-[#2365E3]/10 dark:bg-[#ff6100]/10"
                                            : "text-gray-600 dark:text-gray-300 hover:text-[#2365E3] dark:hover:text-[#ff6100] hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    }`}
                                >
                                    <strong>{item.label}</strong>
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </nav>
    );
}
