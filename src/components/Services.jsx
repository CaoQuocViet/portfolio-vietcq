'use client'
import { useState, useEffect } from 'react'

export default function SamplePage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">
            {/* Multiple Ripple Effect Layers */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Large outer ripples */}
                <div className="w-[800px] h-[800px] rounded-full bg-blue-900/10 animate-[ripple_6s_ease-out_infinite]"></div>
                <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-800/15 animate-[ripple_6s_ease-out_1s_infinite]"></div>
                
                {/* Medium ripples */}
                <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-700/20 animate-[ripple_5s_ease-out_0.5s_infinite]"></div>
                <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-600/25 animate-[ripple_5s_ease-out_1.5s_infinite]"></div>
                
                {/* Small ripples */}
                <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/30 animate-[ripple_4s_ease-out_1s_infinite]"></div>
                <div className="absolute w-[150px] h-[150px] rounded-full bg-blue-400/35 animate-[ripple_4s_ease-out_2s_infinite]"></div>
                
                {/* Core ripples */}
                <div className="absolute w-[100px] h-[100px] rounded-full bg-blue-300/40 animate-[ripple_3s_ease-out_0.5s_infinite]"></div>
                <div className="absolute w-[50px] h-[50px] rounded-full bg-blue-200/50 animate-[ripple_3s_ease-out_1s_infinite]"></div>
            </div>

            {/* Additional floating ripple elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-600/20 animate-[rippleFloat_8s_ease-out_infinite]"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-blue-500/25 animate-[rippleFloat_7s_ease-out_1s_infinite]"></div>
            <div className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-blue-700/15 animate-[rippleFloat_9s_ease-out_2s_infinite]"></div>
            <div className="absolute top-1/2 right-1/3 w-28 h-28 rounded-full bg-blue-400/30 animate-[rippleFloat_6s_ease-out_1.5s_infinite]"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
                {/* Title Section */}
                <div className="mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
                    <h1 className="text-6xl md:text-7xl font-bold mb-4 opacity-0 animate-[slideInLeft_1s_ease-out_forwards] bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl drop-shadow-blue-500/50">
                        Tech Stack
                    </h1>
                    <p className="text-2xl md:text-3xl text-blue-200 font-light opacity-0 animate-[slideInLeft_1s_ease-out_0.3s_forwards]">
                        Technologies & Tools
                    </p>
                </div>

                {/* Tech Stack Grid */}
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Frontend Technologies */}
                    <div className="space-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                            <h3 className="text-2xl font-bold text-blue-300 mb-4">Frontend Development</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">React.js</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Next.js</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-22 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">TypeScript</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-18 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Tailwind CSS</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                            <h3 className="text-2xl font-bold text-blue-300 mb-4">UI/UX Design</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Figma</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-19 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Adobe XD</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Sketch</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-14 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/40">
                            <p className="text-2xl font-bold text-white">
                                Modern Web Standards
                            </p>
                        </div>
                    </div>

                    {/* Backend & Tools */}
                    <div className="space-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]">
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                            <h3 className="text-2xl font-bold text-blue-300 mb-4">Backend & Database</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Node.js</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-18 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Express.js</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-17 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">MongoDB</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-15 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">PostgreSQL</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-13 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
                            <h3 className="text-2xl font-bold text-blue-300 mb-4">DevOps & Tools</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Git & GitHub</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-21 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Docker</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-14 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">AWS</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-100">Vercel</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                                        <div className="w-20 h-2 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/40">
                            <p className="text-2xl font-bold text-white">
                                Continuous Learning
                            </p>
                        </div>
                    </div>
                </div>

                {/* What I Do Section */}
                <div className="mt-24 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            What I Do
                        </h2>
                        <div className="w-24 h-1 mx-auto rounded-full bg-blue-400"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Web Development */}
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 group">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-8 h-8 bg-blue-400 rounded-lg"></div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Web Development</h3>
                            <p className="text-blue-100 leading-relaxed">
                                Building responsive and scalable web applications using modern frameworks and best practices. Creating seamless user experiences with clean, maintainable code.
                            </p>
                        </div>

                        {/* Frontend Development */}
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 group">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-8 h-8 bg-blue-400 rounded-lg"></div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Frontend Development</h3>
                            <p className="text-blue-100 leading-relaxed">
                                Creating beautiful and intuitive user interfaces with attention to detail and user experience. Focused on performance, accessibility, and modern design principles.
                            </p>
                        </div>

                        {/* Mobile-First Design */}
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 group">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-8 h-8 bg-blue-400 rounded-lg"></div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Mobile-First Design</h3>
                            <p className="text-blue-100 leading-relaxed">
                                Designing and developing mobile-responsive applications that work seamlessly across all devices. Prioritizing mobile experience while maintaining desktop excellence.
                            </p>
                        </div>
                    </div>

                    {/* Additional Services */}
                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        {/* API Development */}
                        <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:scale-105">
                            <h4 className="text-lg font-semibold text-blue-200 mb-3">API Development</h4>
                            <p className="text-blue-100 text-sm">
                                Building robust RESTful APIs and GraphQL endpoints with proper authentication, validation, and documentation.
                            </p>
                        </div>

                        {/* Performance Optimization */}
                        <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:scale-105">
                            <h4 className="text-lg font-semibold text-blue-200 mb-3">Performance Optimization</h4>
                            <p className="text-blue-100 text-sm">
                                Optimizing applications for speed, efficiency, and user experience. Implementing best practices for loading times and responsiveness.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Subtle floating elements */}
                <div className="absolute top-20 left-20 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-40 w-2 h-2 bg-blue-300/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-40 left-40 w-4 h-4 bg-blue-500/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
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
        </div>
    )
}
