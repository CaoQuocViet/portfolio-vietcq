'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

const ProjectShowcase = () => {
    const { theme } = useTheme()

    return (
        <section id="project-showcase" className={`py-24 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        Show Cases
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
                    <div className="grid lg:grid-cols-2 gap-8 p-12">
                        {/* Left: Octocat */}
                        <div className="flex justify-center items-center">
                            <div className="relative group">
                                <Image
                                    src="/img/octocat.png"
                                    alt="GitHub Octocat"
                                    width={300}
                                    height={300}
                                    className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                                    priority
                                />
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                            </div>
                        </div>

                        {/* Right: Project Preview */}
                        <div className="flex justify-center items-center">
                            <div className="relative group">
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <Image
                                        src="/img/gif/showcase.gif"
                                        alt="Project Showcase"
                                        width={600}
                                        height={400}
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        priority
                                    />
                                    
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </div>
                                
                                {/* Border glow */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center pb-12">
                        <Link 
                            href="/gallery"
                            className={`inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 group relative overflow-hidden ${
                                theme === 'dark'
                                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/25'
                                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/25'
                            }`}
                        >
                            {/* Button background animation */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            
                            <span className="relative z-10">Explore All Projects</span>
                            <ExternalLink className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                        
                        <p className={`text-sm mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Discover interactive project galleries and detailed case studies
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectShowcase
