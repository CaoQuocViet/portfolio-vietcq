'use client'
import { useState, useEffect } from 'react'

export default function Services({ theme }) {
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
                {/* Title Section */}
                <div className="mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
                    <h1 className={`text-6xl md:text-7xl font-bold mb-4 opacity-0 animate-[slideInLeft_1s_ease-out_forwards] bg-gradient-to-r ${
                        theme === 'dark' 
                            ? 'from-white via-blue-100 to-blue-200' 
                            : 'from-gray-900 via-blue-900 to-blue-800'
                    } bg-clip-text text-transparent drop-shadow-2xl ${
                        theme === 'dark' ? 'drop-shadow-blue-500/50' : 'drop-shadow-blue-900/30'
                    }`}>
                        Tech Stack
                    </h1>
                    <p className={`text-2xl md:text-3xl font-light opacity-0 animate-[slideInLeft_1s_ease-out_0.3s_forwards] ${
                        theme === 'dark' ? 'text-blue-200' : 'text-blue-800'
                    }`}>
                        Technologies & Tools
                    </p>
                </div>

                {/* Tech Stack Grid */}
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Frontend Technologies */}
                    <div className="space-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                        <div className={`backdrop-blur-md rounded-2xl p-8 border transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/30' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70 hover:shadow-blue-500/20'
                        }`}>
                            <h3 className={`text-2xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                            }`}>Frontend Development</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>React.js</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Next.js</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-22 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>TypeScript</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-18 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Tailwind CSS</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`backdrop-blur-md rounded-2xl p-8 border transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/30' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70 hover:shadow-blue-500/20'
                        }`}>
                            <h3 className={`text-2xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                            }`}>UI/UX Design</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Figma</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-19 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Adobe XD</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Sketch</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-14 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`rounded-2xl p-6 text-center hover:scale-105 transition-all duration-700 hover:shadow-2xl ${
                            theme === 'dark' 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/40' 
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-blue-600/40'
                        }`}>
                            <p className="text-2xl font-bold text-white">
                                Modern Web Standards
                            </p>
                        </div>
                    </div>

                    {/* Backend & Tools */}
                    <div className="space-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]">
                        <div className={`backdrop-blur-md rounded-2xl p-8 border transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/30' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70 hover:shadow-blue-500/20'
                        }`}>
                            <h3 className={`text-2xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                            }`}>Backend & Database</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Node.js</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-18 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Express.js</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-17 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>MongoDB</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-15 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>PostgreSQL</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-13 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`backdrop-blur-md rounded-2xl p-8 border transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/30' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70 hover:shadow-blue-500/20'
                        }`}>
                            <h3 className={`text-2xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                            }`}>DevOps & Tools</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Git & GitHub</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-21 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Docker</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-14 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>AWS</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`${theme === 'dark' ? 'text-blue-100' : 'text-blue-800'}`}>Vercel</span>
                                    <div className={`w-24 h-2 rounded-full ${
                                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}>
                                        <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`rounded-2xl p-6 text-center hover:scale-105 transition-all duration-700 hover:shadow-2xl ${
                            theme === 'dark' 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/40' 
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-blue-600/40'
                        }`}>
                            <p className="text-2xl font-bold text-white">
                                Continuous Learning
                            </p>
                        </div>
                    </div>
                </div>

                {/* What I Do Section */}
                <div className="mt-24 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
                    <div className="text-center mb-16">
                        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                            What I Do
                        </h2>
                        <div className={`w-24 h-1 mx-auto rounded-full ${
                            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        }`}></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Web Development */}
                        <div className={`backdrop-blur-md rounded-2xl p-8 border transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/30' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70 hover:shadow-blue-500/20'
                        }`}>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
                            }`}>
                                <div className={`w-8 h-8 rounded-lg ${
                                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                                }`}></div>
                            </div>
                            <h3 className={`text-xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Web Development</h3>
                            <p className={`leading-relaxed ${
                                theme === 'dark' ? 'text-blue-100' : 'text-gray-600'
                            }`}>
                                Building responsive and scalable web applications using modern frameworks and best practices. Creating seamless user experiences with clean, maintainable code.
                            </p>
                        </div>

                        {/* Frontend Development */}
                        <div className={`backdrop-blur-md rounded-2xl p-8 border transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/30' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70 hover:shadow-blue-500/20'
                        }`}>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
                            }`}>
                                <div className={`w-8 h-8 rounded-lg ${
                                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                                }`}></div>
                            </div>
                            <h3 className={`text-xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Frontend Development</h3>
                            <p className={`leading-relaxed ${
                                theme === 'dark' ? 'text-blue-100' : 'text-gray-600'
                            }`}>
                                Creating beautiful and intuitive user interfaces with attention to detail and user experience. Focused on performance, accessibility, and modern design principles.
                            </p>
                        </div>

                        {/* Mobile-First Design */}
                        <div className={`backdrop-blur-md rounded-2xl p-8 border transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${
                            theme === 'dark' 
                                ? 'bg-gray-900/60 border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/30' 
                                : 'bg-white/80 border-blue-300/50 hover:border-blue-500/70 hover:shadow-blue-500/20'
                        }`}>
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                                theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
                            }`}>
                                <div className={`w-8 h-8 rounded-lg ${
                                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                                }`}></div>
                            </div>
                            <h3 className={`text-xl font-bold mb-4 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>Mobile-First Design</h3>
                            <p className={`leading-relaxed ${
                                theme === 'dark' ? 'text-blue-100' : 'text-gray-600'
                            }`}>
                                Designing and developing mobile-responsive applications that work seamlessly across all devices. Prioritizing mobile experience while maintaining desktop excellence.
                            </p>
                        </div>
                    </div>

                    {/* Additional Services */}
                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        {/* API Development */}
                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-500 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-gradient-to-r from-blue-100/50 to-blue-200/50 border-blue-300/30 hover:border-blue-500/50'
                        }`}>
                            <h4 className={`text-lg font-semibold mb-3 ${
                                theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
                            }`}>API Development</h4>
                            <p className={`text-sm ${
                                theme === 'dark' ? 'text-blue-100' : 'text-blue-600'
                            }`}>
                                Building robust RESTful APIs and GraphQL endpoints with proper authentication, validation, and documentation.
                            </p>
                        </div>

                        {/* Performance Optimization */}
                        <div className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-500 hover:scale-105 ${
                            theme === 'dark' 
                                ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-blue-500/30 hover:border-blue-400/50' 
                                : 'bg-gradient-to-r from-blue-100/50 to-blue-200/50 border-blue-300/30 hover:border-blue-500/50'
                        }`}>
                            <h4 className={`text-lg font-semibold mb-3 ${
                                theme === 'dark' ? 'text-blue-200' : 'text-blue-700'
                            }`}>Performance Optimization</h4>
                            <p className={`text-sm ${
                                theme === 'dark' ? 'text-blue-100' : 'text-blue-600'
                            }`}>
                                Optimizing applications for speed, efficiency, and user experience. Implementing best practices for loading times and responsiveness.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Subtle floating elements */}
                <div className={`absolute top-20 left-20 w-3 h-3 rounded-full animate-pulse ${
                    theme === 'dark' ? 'bg-blue-400/60' : 'bg-blue-500/40'
                }`}></div>
                <div className={`absolute top-40 right-40 w-2 h-2 rounded-full animate-pulse ${
                    theme === 'dark' ? 'bg-blue-300/60' : 'bg-blue-400/40'
                }`} style={{ animationDelay: '1s' }}></div>
                <div className={`absolute bottom-40 left-40 w-4 h-4 rounded-full animate-pulse ${
                    theme === 'dark' ? 'bg-blue-500/60' : 'bg-blue-600/40'
                }`} style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Global Animation Styles */}
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
                        transform: scale(0.3);
                        opacity: 0.8;
                    }
                    50% { 
                        transform: scale(1.2);
                        opacity: 0.3;
                    }
                    100% { 
                        transform: scale(2.0);
                        opacity: 0;
                    }
                }

                @keyframes rippleFloat {
                    0% { 
                        transform: scale(0.5) translateX(0) translateY(0);
                        opacity: 0.4;
                    }
                    50% { 
                        transform: scale(1.5) translateX(20px) translateY(-20px);
                        opacity: 0.1;
                    }
                    100% { 
                        transform: scale(2.5) translateX(40px) translateY(-40px);
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    )
}
