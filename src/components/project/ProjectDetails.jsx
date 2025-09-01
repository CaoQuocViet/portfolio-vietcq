export default function ProjectDetails({ theme, projectData }) {
    return (
        <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Project Timeline & Role */}
                    <div className="space-y-8">
                        {/* Timeline */}
                        {projectData.timeline && (
                            <div>
                                <h2 className={`text-3xl font-bold mb-6 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Timeline & Status
                                </h2>
                                <div className={`p-6 rounded-lg border ${
                                    theme === 'dark' 
                                        ? 'bg-white/5 border-white/10' 
                                        : 'bg-white border-gray-200'
                                }`}>
                                    {projectData.timeline.startDate && (
                                        <div className="flex justify-between items-center mb-4">
                                            <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Duration:
                                            </span>
                                            <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {projectData.timeline.startDate} - {projectData.timeline.endDate || 'Present'}
                                            </span>
                                        </div>
                                    )}
                                    {projectData.timeline.status && (
                                        <div className="flex justify-between items-center">
                                            <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Status:
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                theme === 'dark'
                                                    ? `bg-${projectData.color.primary}-500/20 text-${projectData.color.primary}-300 border border-${projectData.color.primary}-500/30`
                                                    : `bg-${projectData.color.primary}-50 text-${projectData.color.primary}-700 border border-${projectData.color.primary}-200`
                                            }`}>
                                                {projectData.timeline.status}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Role & Responsibilities */}
                        {projectData.role && (
                            <div>
                                <h3 className={`text-2xl font-bold mb-4 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Role & Responsibilities
                                </h3>
                                {projectData.role.position && (
                                    <div className={`mb-4 text-lg font-medium ${
                                        theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`
                                    }`}>
                                        {projectData.role.position}
                                    </div>
                                )}
                                {projectData.role.responsibilities && projectData.role.responsibilities.length > 0 && (
                                    <div className="space-y-3">
                                        {projectData.role.responsibilities.map((responsibility, index) => (
                                            <div 
                                                key={index}
                                                className={`flex items-start gap-3 p-3 rounded-lg ${
                                                    theme === 'dark' 
                                                        ? 'bg-white/5 border border-white/10' 
                                                        : 'bg-white border border-gray-200'
                                                }`}
                                            >
                                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                                    theme === 'dark' ? `bg-${projectData.color.primary}-400` : `bg-${projectData.color.primary}-600`
                                                }`} />
                                                <span className={`${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    {responsibility}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Technologies */}
                    <div>
                        <h2 className={`text-3xl font-bold mb-6 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                            Technologies Used
                        </h2>
                        {projectData.technologies && (
                            <div className="space-y-6">
                                {Object.entries(projectData.technologies).map(([category, techs]) => (
                                    techs && techs.length > 0 && (
                                        <div key={category}>
                                            <h4 className={`text-lg font-semibold mb-3 capitalize ${
                                                theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                                            }`}>
                                                {category.replace(/([A-Z])/g, ' $1').trim()}:
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {techs.map((tech, index) => (
                                                    <span 
                                                        key={index}
                                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                                                            theme === 'dark'
                                                                ? `bg-gradient-to-r from-${projectData.color.primary}-500/20 to-blue-500/20 text-${projectData.color.primary}-300 border border-${projectData.color.primary}-500/30 hover:from-${projectData.color.primary}-500/30 hover:to-blue-500/30`
                                                                : `bg-gradient-to-r from-${projectData.color.primary}-50 to-blue-50 text-${projectData.color.primary}-700 border border-${projectData.color.primary}-200 hover:from-${projectData.color.primary}-100 hover:to-blue-100`
                                                        }`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
