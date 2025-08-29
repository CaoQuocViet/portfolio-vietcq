"use client";

import { FaGithub, FaLinkedin, FaXTwitter, FaArrowDown } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import Link from "next/link";
import data from "../../data.json";
import WaveBackground from './WaveBackground';
import WaveBackgroundReversed from "./WaveBackgroundReversed";

export default function Hero({ theme, scrollToSection }) {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">


            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 text-center relative z-10">
                <div style={{ animation: 'fadeInUp 1s ease-out' }}>
                    <p className={`text-lg font-medium mb-6 ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`} style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                        Hello, I'm{' '}
                        <span className={`bg-gradient-to-r ${
                            theme === 'dark' 
                                ? 'from-cyan-400 via-blue-500 to-purple-600' 
                                : 'from-cyan-600 via-blue-700 to-purple-800'
                        } bg-clip-text text-transparent font-bold`}>
                            Cao Quốc Việt
                        </span>
                    </p>
                    
                    <h1 className={`text-5xl md:text-7xl font-bold mb-8 leading-tight ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} style={{ 
                        animation: 'fadeInUp 1s ease-out 0.4s both',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                        Full Stack
                        <br />
                        <span className={`bg-gradient-to-r ${
                            theme === 'dark' 
                                ? 'from-blue-400 via-purple-400 to-blue-400' 
                                : 'from-blue-600 via-purple-600 to-blue-600'
                        } bg-clip-text text-transparent`} style={{
                            backgroundSize: '200% 200%',
                            animation: 'gradientMove 3s ease-in-out infinite'
                        }}>
                            Developer
                        </span>
                    </h1>
                    
                    <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`} style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                        I create exceptional digital experiences through clean code, 
                        modern design, and innovative solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16" 
                         style={{ animation: 'fadeInUp 1s ease-out 0.8s both' }}>
                        <button
                            onClick={() => scrollToSection('projects')}
                            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                theme === 'dark'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                            }`}
                        >
                            View My Work
                        </button>
                        
                        <button
                            onClick={() => scrollToSection('contact')}
                            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 border-2 hover:scale-105 ${
                                theme === 'dark'
                                    ? 'border-gray-700 text-gray-300 hover:border-blue-400 hover:text-blue-400'
                                    : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                            }`}
                        >
                            Get In Touch
                        </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6 mb-16" 
                         style={{ animation: 'fadeInUp 1s ease-out 1s both' }}>
                        {[
                            { Icon: FaGithub, href: `https://github.com/${data.githubUsername}`, label: 'GitHub' },
                            { Icon: FaLinkedin, href: data.social.linkedin, label: 'LinkedIn' },
                            { Icon: FaXTwitter, href: data.social.twitter, label: 'Twitter' },
                            { Icon: GoMail, href: `mailto:${data.email}`, label: 'Email' }
                        ].map(({ Icon, href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                    theme === 'dark'
                                        ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                                aria-label={label}
                            >
                                <Icon size={24} />
                            </Link>
                        ))}
                    </div>

                    {/* Scroll Indicator */}
                    <div className="flex justify-center" style={{ animation: 'fadeInUp 1s ease-out 1.2s both' }}>
                        <button
                            onClick={() => scrollToSection('about')}
                            className={`p-2 rounded-full transition-all duration-300 ${
                                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                            style={{ animation: 'bounce 2s infinite' }}
                        >
                            <FaArrowDown size={20} />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Wave Backgrounds at the bottom of Hero */}
            <div className="absolute bottom-0 left-0 w-full">
                {/* Bottom Wave - Sóng lồi lên */}
                <div className="relative">
                    <WaveBackground />
                </div>
                {/* Top Wave - Sóng lồi xuống */}
                <div className="relative -mt-10">
                    <WaveBackgroundReversed />
                </div>
            </div>
        </section>
    );
}
