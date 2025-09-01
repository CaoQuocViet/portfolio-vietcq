'use client'
import { useState, useEffect } from 'react'
import { FaCode, FaChartLine, FaNetworkWired, FaServer, FaFileAlt, FaTachometerAlt, FaCogs, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws, FaPython, FaLinux, FaPalette, FaBug } from 'react-icons/fa'
import { SiRedis, SiPostgresql, SiTailwindcss, SiNextdotjs, SiTypescript } from 'react-icons/si'

const Services = ({ theme }) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <section id="services" className={`py-24 relative overflow-hidden ${
            theme === 'dark' ? 'bg-gray-950' : 'bg-white'
        }`}>
            {/* Multiple Ripple Effect Layers */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Large outer ripples */}
                <div className={`w-[800px] h-[800px] rounded-full animate-[ripple_6s_ease-out_infinite] ${
                    theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-100/20'
                }`}></div>
                <div className={`absolute w-[600px] h-[600px] rounded-full animate-[ripple_6s_ease-out_1s_infinite] ${
                    theme === 'dark' ? 'bg-blue-800/15' : 'bg-blue-200/25'
                }`}></div>
                
                {/* Medium ripples */}
                <div className={`absolute w-[400px] h-[400px] rounded-full animate-[ripple_5s_ease-out_0.5s_infinite] ${
                    theme === 'dark' ? 'bg-blue-700/20' : 'bg-blue-300/30'
                }`}></div>
                <div className={`absolute w-[300px] h-[300px] rounded-full animate-[ripple_5s_ease-out_1.5s_infinite] ${
                    theme === 'dark' ? 'bg-blue-600/25' : 'bg-blue-400/35'
                }`}></div>
                
                {/* Small ripples */}
                <div className={`absolute w-[200px] h-[200px] rounded-full animate-[ripple_4s_ease-out_1s_infinite] ${
                    theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-500/40'
                }`}></div>
                <div className={`absolute w-[150px] h-[150px] rounded-full animate-[ripple_4s_ease-out_2s_infinite] ${
                    theme === 'dark' ? 'bg-blue-400/35' : 'bg-blue-600/45'
                }`}></div>
                
                {/* Core ripples */}
                <div className={`absolute w-[100px] h-[100px] rounded-full animate-[ripple_3s_ease-out_0.5s_infinite] ${
                    theme === 'dark' ? 'bg-blue-300/40' : 'bg-blue-700/50'
                }`}></div>
                <div className={`absolute w-[50px] h-[50px] rounded-full animate-[ripple_3s_ease-out_1s_infinite] ${
                    theme === 'dark' ? 'bg-blue-200/50' : 'bg-blue-800/60'
                }`}></div>
            </div>

            {/* Additional floating ripple elements */}
            <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full animate-[rippleFloat_8s_ease-out_infinite] ${
                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/30'
            }`}></div>
            <div className={`absolute top-3/4 right-1/4 w-24 h-24 rounded-full animate-[rippleFloat_7s_ease-out_1s_infinite] ${
                theme === 'dark' ? 'bg-blue-500/25' : 'bg-blue-500/35'
            }`}></div>
            <div className={`absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full animate-[rippleFloat_9s_ease-out_2s_infinite] ${
                theme === 'dark' ? 'bg-blue-700/15' : 'bg-blue-300/25'
            }`}></div>
            <div className={`absolute top-1/2 right-1/3 w-28 h-28 rounded-full animate-[rippleFloat_6s_ease-out_1.5s_infinite] ${
                theme === 'dark' ? 'bg-blue-400/30' : 'bg-blue-600/40'
            }`}></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
                {/* What I Do Section */}
                <div className="mb-24 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
                    <h1 className={`text-6xl md:text-7xl font-bold mb-4 text-center opacity-0 animate-[slideInLeft_1s_ease-out_forwards] bg-gradient-to-r ${
                        theme === 'dark' 
                            ? 'from-white via-blue-100 to-blue-200' 
                            : 'from-gray-900 via-blue-900 to-blue-800'
                    } bg-clip-text text-transparent drop-shadow-2xl ${
                        theme === 'dark' ? 'drop-shadow-blue-500/50' : 'drop-shadow-blue-900/30'
                    }`}>
                        What I Do
                    </h1>
                    <p className={`text-2xl md:text-3xl font-light text-center opacity-0 animate-[slideInLeft_1s_ease-out_0.3s_forwards] ${
                        theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
                    }`}>
                        Services & Expertise
                    </p>
                    
                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaCode className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    AI-powered web system
                                </h3>
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaChartLine className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    Business Analysis
                                </h3>
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaNetworkWired className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    System Design
                                </h3>
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaServer className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    API Design
                                </h3>
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaFileAlt className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    Documentation
                                </h3>
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaTachometerAlt className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    Performance & Caching
                                </h3>
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaCogs className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    DevOps
                                </h3>
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaPalette className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    UI/UX Design
                                </h3>
                            </div>
                        </div>

                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <div className="flex items-center mb-4">
                                <FaBug className={`text-3xl mr-4 ${
                                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                                <h3 className={`text-xl font-bold ${
                                    theme === 'dark' ? 'text-blue-100' : 'text-blue-800'
                                }`}>
                                    Testing & QA
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Section */}
                <div className="mt-24 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                    <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Tech Stack</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Frontend */}
                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <h4 className={`text-lg font-semibold mb-4 ${
                                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                            }`}>Frontend</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FaReact className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>React.js</span>
                                </div>
                                <div className="flex items-center">
                                    <SiNextdotjs className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-white' : 'text-black'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Next.js</span>
                                </div>
                                <div className="flex items-center">
                                    <SiTailwindcss className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Tailwind CSS</span>
                                </div>
                                <div className="flex items-center">
                                    <SiTypescript className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>TypeScript</span>
                                </div>
                            </div>
                        </div>

                        {/* Backend */}
                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <h4 className={`text-lg font-semibold mb-4 ${
                                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                            }`}>Backend & Database</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FaNodeJs className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Node.js</span>
                                </div>
                                <div className="flex items-center">
                                    <FaPython className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Python</span>
                                </div>
                                <div className="flex items-center">
                                    <SiPostgresql className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>PostgreSQL</span>
                                </div>
                                <div className="flex items-center">
                                    <SiRedis className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Redis</span>
                                </div>
                            </div>
                        </div>

                        {/* Tools */}
                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70'
                        }`}>
                            <h4 className={`text-lg font-semibold mb-4 ${
                                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                            }`}>Tools & DevOps</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FaGitAlt className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Git & GitHub</span>
                                </div>
                                <div className="flex items-center">
                                    <FaDocker className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Docker</span>
                                </div>
                                <div className="flex items-center">
                                    <FaAws className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>AWS</span>
                                </div>
                                <div className="flex items-center">
                                    <FaLinux className={`text-2xl mr-3 ${
                                        theme === 'dark' ? 'text-white' : 'text-black'
                                    }`} />
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Linux</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyframes */}
            <style jsx global>{`
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
                
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes ripple {
                    0% {
                        transform: scale(0.8);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.2);
                        opacity: 0;
                    }
                }
                
                @keyframes rippleFloat {
                    0%, 100% {
                        transform: translateY(0px) scale(1);
                        opacity: 0.7;
                    }
                    50% {
                        transform: translateY(-20px) scale(1.1);
                        opacity: 0.4;
                    }
                }
            `}</style>
        </section>
    )
}

export default Services
