'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Github, ExternalLink, Star, GitFork } from 'lucide-react'

const Projects = () => {
    const { theme } = useTheme()
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // Fetch from GitHub API for live data
                const githubResponse = await fetch('https://api.github.com/users/caoquocviet/repos?sort=updated&per_page=12')
                if (githubResponse.ok) {
                    const githubData = await githubResponse.json()
                    setRepos(githubData.slice(0, 12))
                } else {
                    console.error('GitHub API failed')
                    setRepos([])
                }
            } catch (error) {
                console.error('Error fetching repos:', error)
                setRepos([])
            } finally {
                setLoading(false)
            }
        }

        fetchRepos()
    }, [])

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
                    <div className={`relative overflow-hidden rounded-xl h-44 transition-all duration-300 
                        group-hover:scale-105 group-hover:shadow-xl cursor-pointer enhanced-card
                        ${
                            theme === 'dark' 
                                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50' 
                                : 'bg-gradient-to-br from-white via-slate-50 to-white border-slate-200/60'
                        } backdrop-blur-sm`}>
                        
                        {/* Content */}
                        <div className="p-3 h-full flex flex-col relative z-10">
                            <h3 className={`font-semibold text-sm mb-2 line-clamp-1 transition-all duration-300 ${getTitleColor()}`}>
                                {(repo.name || repo.title || 'Project').replace(/-/g, ' ').replace(/_/g, ' ')}
                            </h3>
                            
                            <p className={`text-xs mb-4 line-clamp-3 transition-colors duration-300 ${
                                theme === 'dark' 
                                    ? 'text-slate-400 group-hover:text-slate-300' 
                                    : 'text-slate-600 group-hover:text-slate-700'
                            }`}>
                                {repo.description || 'A modern web project'}
                            </p>

                            {/* Language/Tech & Stats in same row */}
                            <div className="flex items-center justify-between mb-2">
                                {/* Language/Tech */}
                                {(repo.language || repo.tech) && (
                                    <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                                        theme === 'dark'
                                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                                            : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200'
                                    }`}>
                                        {repo.language || repo.tech}
                                    </span>
                                )}

                                {/* Stats */}
                                {(repo.stargazers_count !== undefined || repo.forks_count !== undefined) && (
                                    <div className={`flex items-center space-x-2 text-xs ${
                                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
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
                            <div className={`flex justify-between items-center pt-1 mt-auto border-t transition-colors duration-300 ${
                                theme === 'dark' 
                                    ? 'border-slate-700/50 group-hover:border-slate-600/50' 
                                    : 'border-slate-200/50 group-hover:border-slate-300/50'
                            }`}>
                                <span className={`text-xs flex items-center gap-1 transition-colors duration-300 ${
                                    theme === 'dark' 
                                        ? 'text-slate-500 group-hover:text-slate-400' 
                                        : 'text-slate-500 group-hover:text-slate-600'
                                }`}>
                                    <Github className="w-3 h-3" />
                                    <span>View</span>
                                </span>
                                
                                <ExternalLink className={`w-3 h-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                                    theme === 'dark' 
                                        ? 'text-slate-500 group-hover:text-cyan-400' 
                                        : 'text-slate-500 group-hover:text-blue-600'
                                }`} />
                            </div>
                        </div>

                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 
                            group-hover:opacity-20 ${
                                theme === 'dark' 
                                    ? 'bg-gradient-to-t from-cyan-900/30 via-transparent to-transparent' 
                                    : 'bg-gradient-to-t from-blue-100/40 via-transparent to-transparent'
                            }`} />
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <section id="projects" className={`py-24 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        Featured Projects
                    </h2>
                    <div className={`w-24 h-1 mx-auto rounded-full ${
                        theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'
                    }`} />
                    <p className={`text-lg mt-6 max-w-2xl mx-auto ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Explore my latest projects showcasing modern web technologies and innovative solutions.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                            theme === 'dark' ? 'border-blue-400' : 'border-blue-600'
                        }`} />
                    </div>
                ) : (
                    <div className="space-y-6 relative">
                        {/* First Row - Sliding Left */}
                        <div className="relative">
                            <div className="overflow-hidden relative">
                                {/* Left Fade - match section background */}
                                <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                                    theme === 'dark' 
                                        ? 'bg-gradient-to-r from-gray-900 via-gray-900 via-gray-900/90 to-transparent' 
                                        : 'bg-gradient-to-r from-gray-50 via-gray-50 via-gray-50/90 to-transparent'
                                }`} />
                                
                                {/* Right Fade - match section background */}
                                <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                                    theme === 'dark' 
                                        ? 'bg-gradient-to-l from-gray-900 via-gray-900 via-gray-900/90 to-transparent' 
                                        : 'bg-gradient-to-l from-gray-50 via-gray-50 via-gray-50/90 to-transparent'
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
                                <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                                    theme === 'dark' 
                                        ? 'bg-gradient-to-r from-gray-900 via-gray-900 via-gray-900/90 to-transparent' 
                                        : 'bg-gradient-to-r from-gray-50 via-gray-50 via-gray-50/90 to-transparent'
                                }`} />
                                
                                {/* Right Fade - match section background */}
                                <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
                                    theme === 'dark' 
                                        ? 'bg-gradient-to-l from-gray-900 via-gray-900 via-gray-900/90 to-transparent' 
                                        : 'bg-gradient-to-l from-gray-50 via-gray-50 via-gray-50/90 to-transparent'
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

            {/* Animations */}
            <style jsx>{`
                @keyframes slideLeft {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                
                @keyframes slideRight {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </section>
    )
}

export default Projects
