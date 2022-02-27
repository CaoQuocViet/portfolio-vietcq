import { useState, useEffect } from "react";
import { FaCode, FaGithub, FaStar, FaEye } from "react-icons/fa6";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "next/link";
import data from "../../data.json";

export default function Projects({ theme }) {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch GitHub repos
        async function fetchRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${data.githubUsername}/repos?sort=updated&per_page=12`);
                const allRepos = await response.json();
                const filteredRepos = allRepos
                    .filter(repo => !repo.fork && repo.stargazers_count >= 0)
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setRepos(filteredRepos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repos:', error);
                setLoading(false);
            }
        }

        fetchRepos();
    }, []);

    // Split repos into two rows
    const firstRowRepos = repos.slice(0, 6);
    const secondRowRepos = repos.slice(6, 12);

    const ProjectCard = ({ repo, index, reverse = false }) => (
        <Link
            href={repo.html_url}
            target="_blank"
            className="group block min-w-[280px] mx-3"
            style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
        >
            <div className={`h-full p-6 rounded-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 relative overflow-hidden ${
                theme === 'dark'
                    ? 'bg-zinc-900/90 hover:bg-zinc-800/95 border border-zinc-800/50 hover:border-zinc-700'
                    : 'bg-white/90 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-gray-300'
            } backdrop-blur-sm`}>
                
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    theme === 'dark' 
                        ? 'bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-cyan-600/10' 
                        : 'bg-gradient-to-br from-purple-400/5 via-blue-400/5 to-cyan-400/5'
                }`} />

                {/* Card Header */}
                <div className="relative z-10 flex justify-between items-start mb-4">
                    <span className={`text-xs duration-300 ${
                        theme === 'dark' 
                            ? 'text-zinc-500 group-hover:text-zinc-400' 
                            : 'text-gray-500 group-hover:text-gray-400'
                    }`}>
                        <time dateTime={new Date(repo.created_at).toISOString()} title="Created">
                            {new Date(repo.created_at).toISOString().substring(0, 10)}
                        </time>
                    </span>
                    
                    <div className={`flex items-center gap-2 text-xs ${
                        theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'
                    }`}>
                        <span className="flex items-center gap-1" title="Total stars">
                            <FaStar className="w-3 h-3" />
                            {Intl.NumberFormat("en-US", { notation: "compact" }).format(repo.stargazers_count)}
                        </span>
                        {repo.watchers_count > 0 && (
                            <span className="flex items-center gap-1" title="Watchers">
                                <FaEye className="w-3 h-3" />
                                {Intl.NumberFormat("en-US", { notation: "compact" }).format(repo.watchers_count)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Project Title */}
                <h3 className={`relative z-10 text-lg font-medium duration-300 mb-3 cursor-pointer ${
                    theme === 'dark' 
                        ? 'text-zinc-200 group-hover:text-white' 
                        : 'text-gray-900 group-hover:text-gray-700'
                }`} title="Click to view the repo">
                    <span className={`transition-all duration-300 ${
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-blue-400'
                            : 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600'
                    } text-transparent bg-clip-text`}>
                        {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </h3>

                {/* Description */}
                <p className={`relative z-10 text-sm duration-300 mb-4 line-clamp-2 ${
                    theme === 'dark' 
                        ? 'text-zinc-400 group-hover:text-zinc-300' 
                        : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                    {repo.description || 'A showcase project demonstrating modern web development techniques and best practices.'}
                </p>

                {/* Tech Stack */}
                {repo.language && (
                    <div className="relative z-10 mb-4">
                        <span className={`text-xs px-3 py-1 rounded-full transition-all duration-300 ${
                            theme === 'dark'
                                ? 'bg-zinc-800/50 text-zinc-300 group-hover:bg-purple-600/20 group-hover:text-purple-400'
                                : 'bg-gray-100 text-gray-700 group-hover:bg-purple-100 group-hover:text-purple-600'
                        }`}>
                            {repo.language}
                        </span>
                    </div>
                )}

                {/* Footer */}
                <div className={`relative z-10 flex justify-between items-center pt-4 mt-auto border-t transition-colors duration-300 ${
                    theme === 'dark' 
                        ? 'border-zinc-800/50 group-hover:border-zinc-700/50' 
                        : 'border-gray-200/50 group-hover:border-gray-300/50'
                }`}>
                    <span className={`text-xs flex items-center gap-1 transition-colors duration-300 ${
                        theme === 'dark' 
                            ? 'text-zinc-500 group-hover:text-zinc-400' 
                            : 'text-gray-500 group-hover:text-gray-600'
                    }`} title="GitHub repository">
                        <FaGithub className="w-3 h-3" />
                        <span className="hover:text-blue-500">View Code</span>
                    </span>
                    
                    <HiOutlineExternalLink className={`w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                        theme === 'dark' 
                            ? 'text-zinc-500 group-hover:text-blue-400' 
                            : 'text-gray-500 group-hover:text-blue-600'
                    }`} />
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl ${
                    theme === 'dark' ? 'bg-purple-500/30' : 'bg-purple-400/20'
                }`} />
            </div>
        </Link>
    );

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
                    <div className="space-y-8">
                        {/* First Row - Sliding Left */}
                        <div className="relative">
                            <div 
                                className="flex animate-slide-left"
                                style={{
                                    animation: 'slideLeft 30s linear infinite'
                                }}
                            >
                                {[...firstRowRepos, ...firstRowRepos].map((repo, index) => (
                                    <ProjectCard 
                                        key={`${repo.id}-${index}`} 
                                        repo={repo} 
                                        index={index} 
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Second Row - Sliding Right */}
                        <div className="relative">
                            <div 
                                className="flex animate-slide-right"
                                style={{
                                    animation: 'slideRight 30s linear infinite'
                                }}
                            >
                                {[...secondRowRepos, ...secondRowRepos].map((repo, index) => (
                                    <ProjectCard 
                                        key={`${repo.id}-${index}`} 
                                        repo={repo} 
                                        index={index} 
                                        reverse={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center mt-16">
                    <Link
                        href={`https://github.com/${data.githubUsername}`}
                        target="_blank"
                        className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                            theme === 'dark'
                                ? 'border-2 border-gray-700 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10'
                                : 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                        <FaGithub className="mr-2" />
                        View All Projects
                        <HiOutlineExternalLink className="ml-2" />
                    </Link>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes slideLeft {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes slideRight {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-slide-left:hover,
                .animate-slide-right:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
