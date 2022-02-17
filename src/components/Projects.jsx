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
            className="group block min-w-[320px] mx-4"
            style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
        >
            <div className={`h-full p-6 rounded-3xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:scale-105 ${
                theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/90 hover:to-gray-800/90 border border-gray-700/50 hover:border-blue-500/50'
                    : 'bg-gradient-to-br from-white to-gray-50/80 hover:from-gray-50 hover:to-white shadow-xl hover:shadow-2xl border border-gray-200/50 hover:border-blue-400/50'
            } backdrop-blur-sm relative overflow-hidden`}>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    theme === 'dark' 
                        ? 'bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10' 
                        : 'bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-cyan-400/5'
                }`} />

                {/* Project Header */}
                <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                        theme === 'dark' 
                            ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20' 
                            : 'bg-gradient-to-br from-blue-100 to-purple-100'
                    }`}>
                        <FaCode className={`text-2xl ${
                            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                    </div>
                    
                    <HiOutlineExternalLink className={`text-xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 ${
                        theme === 'dark' ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'
                    }`} />
                </div>

                {/* Project Content */}
                <div className="relative z-10 flex-1">
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
                    }`}>
                        {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        {repo.description || 'A showcase project demonstrating modern web development techniques and best practices with cutting-edge technologies.'}
                    </p>

                    {/* Project Stats */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            {repo.language && (
                                <span className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-300 ${
                                    theme === 'dark'
                                        ? 'bg-gray-700/50 text-gray-300 group-hover:bg-blue-600/20 group-hover:text-blue-400'
                                        : 'bg-gray-100 text-gray-700 group-hover:bg-blue-100 group-hover:text-blue-600'
                                }`}>
                                    {repo.language}
                                </span>
                            )}
                            
                            <div className={`flex items-center space-x-3 text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                <div className="flex items-center space-x-1">
                                    <FaStar size={12} />
                                    <span>{repo.stargazers_count}</span>
                                </div>
                                {repo.watchers_count > 0 && (
                                    <div className="flex items-center space-x-1">
                                        <FaEye size={12} />
                                        <span>{repo.watchers_count}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <span className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                            {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                    </div>

                    {/* GitHub Link */}
                    <div className="flex items-center space-x-2 text-sm">
                        <FaGithub className={`${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <span className={`${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            View on GitHub
                        </span>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-all duration-500 blur-xl ${
                    theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-400/20'
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
