export default function ProjectDetails({ theme, projectData }) {
    // Use fixed blue gradient instead of project colors
    const gradient = 'from-cyan-400 via-blue-500 to-blue-600';

    return (
        <section className="py-24 bg-[var(--bg-section-alt)]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Project Timeline & Role */}
                    <div className="space-y-10">
                        {/* Timeline */}
                        {projectData.timeline && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-[var(--text-heading)]">
                                        Timeline & Status
                                    </h2>
                                </div>
                                
                                <div className="relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--card-shadow)] backdrop-blur-sm">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5`} />
                                    <div className="relative space-y-6">
                                        {projectData.timeline.startDate && (
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${gradient} shadow-lg`} />
                                                    <span className="text-lg font-semibold text-[var(--text-secondary)]">
                                                        Duration
                                                    </span>
                                                </div>
                                                <span className="text-lg font-bold text-[var(--text-heading)]">
                                                    {projectData.timeline.startDate} - {projectData.timeline.endDate || 'Present'}
                                                </span>
                                            </div>
                                        )}
                                        {projectData.timeline.status && (
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${gradient} shadow-lg`} />
                                                    <span className="text-lg font-semibold text-[var(--text-secondary)]">
                                                        Status
                                                    </span>
                                                </div>
                                                <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg bg-gradient-to-r ${gradient} text-white`}>
                                                    {projectData.timeline.status}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Role & Responsibilities */}
                        {projectData.role && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[var(--text-heading)]">
                                        Role & Responsibilities
                                    </h3>
                                </div>
                                
                                {projectData.role.position && (
                                    <div className="mb-6 p-4 rounded-xl text-center bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--card-shadow)]">
                                        <span className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                                            {projectData.role.position}
                                        </span>
                                    </div>
                                )}
                                
                                {projectData.role.responsibilities && projectData.role.responsibilities.length > 0 && (
                                    <div className="space-y-4">
                                        {projectData.role.responsibilities.map((responsibility, index) => (
                                            <div
                                                key={index}
                                                className="group relative overflow-hidden rounded-xl p-5 transition-all duration-500 hover:scale-[1.02] bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--border-hover)] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)]"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                                <div className="relative flex items-start gap-4">
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg`}>
                                                        <span className="text-white font-bold text-sm">{index + 1}</span>
                                                    </div>
                                                    <span className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                                                        {responsibility}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Technologies */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-[var(--text-heading)]">
                                Technologies Used
                            </h2>
                        </div>
                        
                        {projectData.technologies && (
                            <div className="space-y-8">
                                {Object.entries(projectData.technologies).map(([category, techs]) => (
                                    techs && techs.length > 0 && (
                                        <div key={category} className="relative overflow-hidden rounded-2xl p-6 bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--card-shadow)]">
                                            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5`} />
                                            <div className="relative">
                                                <h4 className="text-lg font-bold mb-4 capitalize flex items-center gap-2 text-[var(--text-body)]">
                                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`} />
                                                    {category.replace(/([A-Z])/g, ' $1').trim()}
                                                </h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {techs.map((tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="group relative overflow-hidden px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--border-hover)] shadow-[var(--shadow-sm)]"
                                                        >
                                                            <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                                                            <span className="relative">{tech}</span>
                                                        </span>
                                                    ))}
                                                </div>
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
