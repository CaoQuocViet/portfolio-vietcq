export default function ProjectFeatures({ theme, projectData }) {
    return (
        <section className={`py-24 ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Key Features */}
                    {projectData.features && projectData.features.length > 0 && (
                        <div>
                            <h2 className={`text-3xl font-bold mb-8 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                Key Features
                            </h2>
                            <div className="space-y-4">
                                {projectData.features.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                                            theme === 'dark' 
                                                ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                                                : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${
                                            theme === 'dark' ? `bg-${projectData.color.primary}-400` : `bg-${projectData.color.primary}-600`
                                        }`} />
                                        <span className={`${
                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements */}
                    {projectData.achievements && (
                        <div>
                            <h2 className={`text-3xl font-bold mb-8 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                                Results & Achievements
                            </h2>
                            
                            {/* Metrics */}
                            {projectData.achievements.metrics && projectData.achievements.metrics.length > 0 && (
                                <div className="mb-8">
                                    <h4 className={`text-lg font-semibold mb-4 ${
                                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        Key Metrics:
                                    </h4>
                                    <div className="space-y-3">
                                        {projectData.achievements.metrics.map((metric, index) => (
                                            <div 
                                                key={index}
                                                className={`flex items-center gap-3 p-3 rounded-lg ${
                                                    theme === 'dark' 
                                                        ? 'bg-white/5 border border-white/10' 
                                                        : 'bg-gray-50 border border-gray-200'
                                                }`}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${
                                                    theme === 'dark' ? `bg-${projectData.color.primary}-400` : `bg-${projectData.color.primary}-600`
                                                }`} />
                                                <span className={`${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    {metric}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Highlights */}
                            {projectData.achievements.highlights && projectData.achievements.highlights.length > 0 && (
                                <div>
                                    <h4 className={`text-lg font-semibold mb-4 ${
                                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                    }`}>
                                        Technical Highlights:
                                    </h4>
                                    <div className="space-y-3">
                                        {projectData.achievements.highlights.map((highlight, index) => (
                                            <div 
                                                key={index}
                                                className={`flex items-center gap-3 p-3 rounded-lg ${
                                                    theme === 'dark' 
                                                        ? 'bg-white/5 border border-white/10' 
                                                        : 'bg-gray-50 border border-gray-200'
                                                }`}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${
                                                    theme === 'dark' ? `bg-${projectData.color.primary}-400` : `bg-${projectData.color.primary}-600`
                                                }`} />
                                                <span className={`${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    {highlight}
                                                </span>
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
