'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Button from './ui/Button'

const ProjectShowcase = () => {
    const { theme } = useTheme()

    return (
        <section id="project-showcase" className={`py-24 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        My Projects
                    </h2>
                    <div className={`w-24 h-1 mx-auto rounded-full ${
                        theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                    }`} />
                </div>

                {/* Main Showcase Container */}
                <div className={`relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-lg border transition-all duration-300 ${
                    theme === 'dark' 
                        ? 'bg-black/20 border-white/10 shadow-black/30' 
                        : 'bg-white/30 border-white/20 shadow-gray-500/20'
                }`}>
                    <div className="grid lg:grid-cols-5 gap-8 p-16">
                        {/* Left: Octocat with pointing animation - 2 columns */}
                        <div className="lg:col-span-2 flex justify-center items-center">
                            <div className="relative group">
                                <div className="relative">
                                    <Image
                                        src="/img/octocat.png"
                                        alt="GitHub Octocat"
                                        width={500}
                                        height={500}
                                        className="object-contain transition-all duration-700 group-hover:scale-110 animate-float"
                                        priority
                                    />
                                    
                                    {/* Pointing hand animation - sử dụng Tailwind */}
                                    <div className="absolute top-1/3 right-0 transform translate-x-12 -translate-y-4">
                                        <div className="text-8xl filter drop-shadow-2xl animate-bounce">
                                            👉
                                        </div>
                                    </div>
                                    
                                    {/* Enhanced glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-all duration-700 animate-pulse" />
                                    
                                    {/* Magic sparkles */}
                                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                                        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75" style={{animationDelay: '300ms'}}></div>
                                        <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping opacity-75" style={{animationDelay: '600ms'}}></div>
                                        <div className="absolute top-1/6 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping opacity-75" style={{animationDelay: '900ms'}}></div>
                                        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1200ms'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Enhanced Project Preview - 3 columns */}
                        <div className="lg:col-span-3 flex justify-center items-center">
                            <div className="relative group w-full">
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
                                    <Image
                                        src="/img/gif/showcase.gif"
                                        alt="Project Showcase"
                                        width={1000}
                                        height={700}
                                        className="object-cover w-full transition-all duration-700 group-hover:scale-105"
                                        priority
                                        style={{ minHeight: '600px', maxHeight: '700px' }}
                                    />
                                    
                                    {/* Enhanced overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Multiple shine effects */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 delay-200" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1400 delay-400" />
                                </div>
                                
                                {/* Enhanced border glow with rotation */}
                                <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-cyan-500 via-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-lg animate-spin-slow" />
                                <div className="absolute inset-0 rounded-3xl border-3 border-transparent bg-gradient-to-r from-blue-400 to-purple-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Call to Action */}
                    <div className="text-center pb-16">
                        <Button
                            href="/gallery"
                            variant="gradient"
                            size="lg"
                            className="group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Explore All Projects
                                <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </span>
                        </Button>
                        
                        <p className={`text-sm mt-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Discover interactive project galleries and detailed case studies
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectShowcase
