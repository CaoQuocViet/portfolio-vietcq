'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Github, ExternalLink, Star, GitFork } from 'lucide-react'
import { useGitHubRepos } from '../../hooks/useGitHubRepos'

const Projects = () => {
    const { theme } = useTheme()
    const { repos, loading } = useGitHubRepos(12) // Projects page lấy 12 repos

    // Split repos into two rows
    const firstRowRepos = repos.slice(0, Math.ceil(repos.length / 2))
    const secondRowRepos = repos.slice(Math.ceil(repos.length / 2))

    const ProjectCard = ({ repo, index }) => {
        // Calculate popularity score for dynamic styling
        const stars = repo.stargazers_count || 0
        const forks = repo.forks_count || 0
        const popularityScore = stars + (forks * 2) // Forks worth 2x stars

        // Dynamic title color based on popularity
        const getTitleColor = () => {
            if (popularityScore >= 50) return 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text group-hover:from-cyan-300 group-hover:via-blue-400 group-hover:to-purple-500'
            if (popularityScore >= 20) return 'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 text-transparent bg-clip-text group-hover:from-emerald-300 group-hover:via-teal-400 group-hover:to-cyan-500'
            if (popularityScore >= 5) return 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-transparent bg-clip-text group-hover:from-amber-300 group-hover:via-orange-400 group-hover:to-red-400'
            return theme === 'dark' ? 'bg-gradient-to-r from-slate-200 to-slate-400 text-transparent bg-clip-text group-hover:from-slate-100 group-hover:to-slate-300' : 'bg-gradient-to-r from-slate-700 to-slate-900 text-transparent bg-clip-text group-hover:from-slate-600 group-hover:to-slate-800'
        }

        return (
            <div className="flex-shrink-0 w-72 mx-3 group">
                <Link
                    href={repo.html_url || repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <div className={`relative overflow-hidden rounded-xl h-42 transition-all duration-500 
                         group-hover:shadow-2xl cursor-pointer enhanced-card border-2
                         ${theme === 'dark'
                            ? 'bg-gradient-to-br from-gray-900/50 via-blue-950/98 to-gray-900/50 border-transparent group-hover:border-blue-500/70 group-hover:from-gray-900/98 group-hover:via-blue-900 group-hover:to-gray-900/98'
                            : 'bg-gradient-to-br from-slate-50/95 via-blue-50/98 to-slate-50/95 border-gray-50/50 group-hover:border-blue-400/80 group-hover:from-slate-100/98 group-hover:via-blue-100 group-hover:to-slate-100/98'
                        } backdrop-blur-md shadow-lg group-hover:shadow-blue-500/30`}>

                        {/* Content */}
                        <div className="p-3 h-full flex flex-col relative z-10">
                            <h3 className={`font-semibold text-sm mb-2 line-clamp-1 transition-all duration-300 ${getTitleColor()}`}>
                                {(repo.name || repo.title || 'Project').replace(/-/g, ' ').replace(/_/g, ' ')}
                            </h3>

                            <p className={`text-xs mb-4 line-clamp-3 transition-colors duration-300 ${theme === 'dark'
                                    ? 'text-slate-400 group-hover:text-slate-300'
                                    : 'text-slate-600 group-hover:text-slate-700'
                                }`}>
                                {repo.description || 'A modern web project'}
                            </p>

                            {/* Language/Tech & Stats in same row */}
                            <div className="flex items-center justify-between mb-2">
                                {/* Language/Tech */}
                                {(repo.language || repo.tech) && (
                                    <span className={`text-xs px-3 py-1.5 rounded-full transition-all duration-500 font-medium ${theme === 'dark'
                                            ? 'bg-gradient-to-r from-blue-500/40 to-slate-500/40 text-blue-200 border border-blue-400/60 group-hover:from-blue-400/50 group-hover:to-slate-400/50 group-hover:border-blue-300/80 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/40'
                                            : 'bg-gradient-to-r from-blue-500/40 to-slate-500/40 text-blue-700 border border-blue-400/70 group-hover:from-blue-400/50 group-hover:to-slate-400/50 group-hover:border-blue-300/90 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/40'
                                        }`}>
                                        {repo.language || repo.tech}
                                    </span>
                                )}

                                {/* Stats */}
                                {(repo.stargazers_count !== undefined || repo.forks_count !== undefined) && (
                                    <div className={`flex items-center space-x-2 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                        }`}>
                                        {repo.stargazers_count !== undefined && (
                                            <span className="flex items-center space-x-1">
                                                <Star className="w-3 h-3" />
                                                <span>{repo.stargazers_count || 0}</span>
                                            </span>
                                        )}
                                        {repo.forks_count !== undefined && (
                                            <span className="flex items-center space-x-1">
                                                <GitFork className="w-3 h-3" />
                                                <span>{repo.forks_count || 0}</span>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className={`flex justify-between items-center pt-2 mt-auto border-t transition-all duration-500 ${theme === 'dark'
                                    ? 'border-slate-600/50 group-hover:border-blue-500/70 group-hover:border-opacity-80'
                                    : 'border-slate-200/70 group-hover:border-blue-400/80 group-hover:border-opacity-80'
                                }`}>
                                <span className={`text-xs flex items-center gap-1.5 transition-all duration-500 font-medium ${theme === 'dark'
                                        ? 'text-slate-400 group-hover:text-blue-300 group-hover:scale-105'
                                        : 'text-slate-600 group-hover:text-blue-700 group-hover:scale-105'
                                    }`}>
                                    <Github className="w-3 h-3 group-hover:text-blue-400 transition-colors duration-500" />
                                    <span>View</span>
                                </span>

                                <ExternalLink className={`w-3 h-3 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${theme === 'dark'
                                        ? 'text-slate-400 group-hover:text-blue-300 group-hover:drop-shadow-lg group-hover:drop-shadow-blue-400/50'
                                        : 'text-slate-500 group-hover:text-blue-600 group-hover:drop-shadow-lg group-hover:drop-shadow-blue-500/50'
                                    }`} />
                            </div>
                        </div>

                        {/* Animated gradient overlay */}
                        <div className={`absolute inset-0 pointer-events-none transition-all duration-700 
                            group-hover:opacity-100 ${theme === 'dark'
                                ? 'bg-gradient-to-t from-blue-500/15 via-transparent to-transparent opacity-0 group-hover:from-blue-400/25 group-hover:via-blue-500/15 group-hover:to-transparent'
                                : 'bg-gradient-to-t from-blue-400/25 via-transparent to-transparent opacity-0 group-hover:from-blue-300/35 group-hover:via-blue-400/25 group-hover:to-transparent'
                            }`} />

                        {/* Floating particles effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                            <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-slate-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute top-1/2 right-4 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <section id="projects" className={`py-24 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Github Repositories
                    </h2>
                    <div className={`w-24 h-1 mx-auto rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                        }`} />
                    <p className={`text-lg mt-6 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        Explore my latest projects showcasing modern web technologies and innovative solutions.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
                            }`} />
                    </div>
                ) : (
                    <div className="space-y-6 relative">
                        {/* First Row - Sliding Left */}
                        <div className="relative">
                            <div className="overflow-hidden relative">
                                {/* Left Fade - match section background */}
                                <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${theme === 'dark'
                                        ? 'bg-gradient-to-r from-gray-900/50 to-transparent'
                                        : 'bg-gradient-to-r from-gray-50 to-transparent'
                                    }`} />

                                {/* Right Fade - match section background */}
                                <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${theme === 'dark'
                                        ? 'bg-gradient-to-l from-gray-900/50 to-transparent'
                                        : 'bg-gradient-to-l from-gray-50 to-transparent'
                                    }`} />

                                <div
                                    className="flex"
                                    style={{
                                        animation: 'slideLeft 10s linear infinite'
                                    }}
                                >
                                    {/* Duplicate for seamless loop */}
                                    {[...firstRowRepos, ...firstRowRepos].map((repo, index) => (
                                        <ProjectCard key={`first-${repo.id}-${index}`} repo={repo} index={index} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Second Row - Sliding Right */}
                        <div className="relative">
                            <div className="overflow-hidden relative">
                                {/* Left Fade - match section background */}
                                <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${theme === 'dark'
                                        ? 'bg-gradient-to-r from-gray-900/50 to-transparent'
                                        : 'bg-gradient-to-r from-gray-50 to-transparent'
                                    }`} />

                                {/* Right Fade - match section background */}
                                <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${theme === 'dark'
                                        ? 'bg-gradient-to-l from-gray-900/50 to-transparent'
                                        : 'bg-gradient-to-l from-gray-50 to-transparent'
                                    }`} />

                                <div
                                    className="flex"
                                    style={{
                                        animation: 'slideRight 10s linear infinite'
                                    }}
                                >
                                    {/* Duplicate for seamless loop */}
                                    {[...secondRowRepos, ...secondRowRepos].map((repo, index) => (
                                        <ProjectCard key={`second-${repo.id}-${index}`} repo={repo} index={index} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Animations */}
            <style jsx>{`
                @keyframes slideLeft {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                
                @keyframes slideRight {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
                    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2); }
                }
                
                .enhanced-card {
                    animation: float 2s ease-in-out infinite, glow 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    )
}

export default Projects;
