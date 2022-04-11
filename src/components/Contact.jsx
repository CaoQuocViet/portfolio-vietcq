import { FaGithub, FaLinkedin, FaYoutube, FaDiscord, FaFacebook } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import Link from "next/link";
import data from "../../data.json";

export default function Contact({ theme, scrollToSection }) {
    return (
        <section id="contact" className={`py-32 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} relative overflow-hidden`}>
            <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
                <h2 className={`text-5xl md:text-6xl font-bold mb-8 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                    Let's Connect
                </h2>
                <div className={`w-24 h-1 mx-auto rounded-full mb-12 ${
                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                }`} />
                
                <p className={`text-xl leading-relaxed mb-20 max-w-2xl mx-auto ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                    Ready to build something amazing together? Let's start the conversation.
                </p>

                {/* Clean Circular Contact Animation */}
                <div className="relative mx-auto mb-20 flex items-center justify-center" style={{ width: '700px', height: '700px' }}>
                    
                    {/* Subtle Background Circle */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full ${
                        theme === 'dark' 
                            ? 'bg-gradient-radial from-blue-500/5 via-transparent to-transparent' 
                            : 'bg-gradient-radial from-blue-400/5 via-transparent to-transparent'
                    }`} style={{
                        animation: 'pulse 4s ease-in-out infinite'
                    }} />

                    {/* Center Logo */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-3 ${
                        theme === 'dark' ? 'border-blue-400/80 bg-gray-900' : 'border-blue-600/80 bg-white'
                    } flex items-center justify-center text-2xl font-black z-20 transition-all duration-300 hover:scale-110`} style={{
                        boxShadow: theme === 'dark' 
                            ? '0 8px 32px rgba(59, 130, 246, 0.3)' 
                            : '0 8px 32px rgba(59, 130, 246, 0.2)'
                    }}>
                        <span className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>VC</span>
                    </div>

                    {/* Orbiting Contact Cards */}
                    {[
                        {
                            icon: <GoMail size={20} />,
                            title: "Email",
                            subtitle: "vietcao10@gmail.com",
                            href: `mailto:${data.email}`,
                            bg: theme === 'dark' ? '#ef4444' : '#f87171',
                            angle: 0,
                            delay: 0
                        },
                        {
                            icon: <FaGithub size={20} />,
                            title: "GitHub", 
                            subtitle: "Check out my code",
                            href: `https://github.com/${data.githubUsername}`,
                            bg: theme === 'dark' ? '#6b7280' : '#9ca3af',
                            angle: 60,
                            delay: 5
                        },
                        {
                            icon: <FaYoutube size={20} />,
                            title: "YouTube",
                            subtitle: "Watch my videos",
                            href: data.social?.youtube || "#",
                            bg: theme === 'dark' ? '#ff0000' : '#ef4444',
                            angle: 120,
                            delay: 10
                        },
                        {
                            icon: <FaDiscord size={20} />,
                            title: "Discord",
                            subtitle: "Join my server",
                            href: data.social?.discord || "#",
                            bg: theme === 'dark' ? '#5865f2' : '#6366f1',
                            angle: 180,
                            delay: 15
                        },
                        {
                            icon: <FaFacebook size={20} />,
                            title: "Facebook",
                            subtitle: "Follow me",
                            href: data.social?.facebook || "#",
                            bg: theme === 'dark' ? '#1877f2' : '#3b82f6',
                            angle: 240,
                            delay: 20
                        },
                        {
                            icon: <FaLinkedin size={20} />,
                            title: "LinkedIn",
                            subtitle: "Professional network", 
                            href: data.social?.linkedin || "#",
                            bg: theme === 'dark' ? '#3b82f6' : '#60a5fa',
                            angle: 300,
                            delay: 25
                        }
                    ].map((contact, index) => (
                        <Link
                            key={contact.title}
                            href={contact.href}
                            target="_blank"
                            className="absolute group"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${contact.angle}deg) translateY(-280px) rotate(-${contact.angle}deg)`,
                                animation: `orbitRotate 30s linear infinite ${contact.delay}s`
                            }}
                        >
                            <div className={`relative w-36 h-36 rounded-2xl ${
                                theme === 'dark' 
                                    ? 'bg-gray-800/90 border border-gray-700/50 hover:border-gray-600' 
                                    : 'bg-white border border-gray-200 hover:border-gray-300'
                            } backdrop-blur-sm transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2 shadow-lg group-hover:shadow-xl`}>
                                
                                {/* Icon Circle */}
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110" style={{
                                    backgroundColor: contact.bg,
                                    boxShadow: `0 4px 16px ${contact.bg}40`
                                }}>
                                    {contact.icon}
                                </div>
                                
                                {/* Text Content */}
                                <div className="absolute bottom-4 left-0 right-0 px-3 text-center">
                                    <h3 className={`text-sm font-bold mb-1 ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        {contact.title}
                                    </h3>
                                    <p className={`text-xs leading-tight ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        {contact.subtitle}
                                    </p>
                                </div>

                                {/* Hover Glow */}
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} style={{
                                    background: `radial-gradient(circle, ${contact.bg}40, transparent 70%)`,
                                    filter: 'blur(8px)'
                                }} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Clean Call to Action */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                    <Link
                        href={`mailto:${data.email}`}
                        className={`flex-1 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                            theme === 'dark'
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        } shadow-lg hover:shadow-xl`}
                    >
                        Get In Touch
                    </Link>
                    
                    <button
                        onClick={() => scrollToSection('hero')}
                        className={`flex-1 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 border-2 hover:scale-105 ${
                            theme === 'dark'
                                ? 'border-gray-700 text-gray-300 hover:border-blue-400 hover:text-blue-400'
                                : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                        }`}
                    >
                        Back to Top
                    </button>
                </div>
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes orbitRotate {
                    from { transform: translate(-50%, -50%) rotate(0deg) translateY(-280px) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg) translateY(-280px) rotate(-360deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `}</style>
        </section>
    );
}
