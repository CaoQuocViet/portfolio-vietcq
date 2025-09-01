export default function ProjectFeatures({ theme, projectData }) {
    // Use fixed blue gradient instead of project colors
    const gradient = 'from-cyan-400 via-blue-500 to-blue-600';

    return (
        <section className={`py-24 ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Key Features */}
                    {projectData.features && projectData.features.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h2 className={`text-3xl font-bold ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Key Features
                                </h2>
                            </div>
                            
                            <div className="space-y-6">
                                {projectData.features.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:scale-[1.02] ${
                                            theme === 'dark' 
                                                ? 'bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 hover:from-white/10 hover:to-white/15' 
                                                : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 hover:shadow-lg'
                                        }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                        <div className="relative flex items-start gap-4">
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg`}>
                                                <span className="text-white font-bold text-sm">{index + 1}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-base leading-relaxed ${
                                                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                                                }`}>
                                                    {feature}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements */}
                    {projectData.achievements && (
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className={`text-3xl font-bold ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Results & Achievements
                                </h2>
                            </div>
                            
                            {/* Metrics */}
                            {projectData.achievements.metrics && projectData.achievements.metrics.length > 0 && (
                                <div className="mb-10">
                                    <h4 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        Key Metrics
                                    </h4>
                                    <div className="space-y-4">
                                        {projectData.achievements.metrics.map((metric, index) => (
                                            <div 
                                                key={index}
                                                className={`group relative overflow-hidden rounded-xl p-5 transition-all duration-500 hover:scale-[1.02] ${
                                                    theme === 'dark' 
                                                        ? 'bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20' 
                                                        : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 hover:shadow-md'
                                                }`}
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                                <div className="relative flex items-center gap-4">
                                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`} />
                                                    <span className={`text-sm font-medium ${
                                                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                                                    }`}>
                                                        {metric}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Highlights */}
                            {projectData.achievements.highlights && projectData.achievements.highlights.length > 0 && (
                                <div>
                                    <h4 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${
                                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        Technical Highlights
                                    </h4>
                                    <div className="space-y-4">
                                        {projectData.achievements.highlights.map((highlight, index) => (
                                            <div 
                                                key={index}
                                                className={`group relative overflow-hidden rounded-xl p-5 transition-all duration-500 hover:scale-[1.02] ${
                                                    theme === 'dark' 
                                                        ? 'bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20' 
                                                        : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-300 hover:shadow-md'
                                                }`}
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                                <div className="relative flex items-center gap-4">
                                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`} />
                                                    <span className={`text-sm font-medium ${
                                                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                                                    }`}>
                                                        {highlight}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
