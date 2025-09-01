import Button from '../ui/Button'
import { Github, ExternalLink } from 'lucide-react'

export default function ProjectOverview({ theme, projectData }) {
    return (
        <section id="overview" className={`py-24 ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        <span className={`bg-gradient-to-r ${projectData.color.gradient} text-transparent bg-clip-text`}>
                            {projectData.name}
                        </span>
                    </h1>
                    <p className={`text-xl md:text-2xl mb-8 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        {projectData.tagline}
                    </p>
                    <p className={`text-lg max-w-4xl mx-auto mb-12 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                        {projectData.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {projectData.links?.live && (
                            <Button 
                                href={projectData.links.live}
                                target="_blank"
                                variant="primary"
                                size="lg"
                                className="flex items-center gap-2"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Live Demo
                            </Button>
                        )}
                        {projectData.links?.github && (
                            <Button 
                                href={projectData.links.github}
                                target="_blank"
                                variant="outline"
                                size="lg"
                                className="flex items-center gap-2"
                            >
                                <Github className="w-5 h-5" />
                                View Source
                            </Button>
                        )}
                    </div>
                </div>

                {/* Project Stats */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-lg border ${
                    theme === 'dark' 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-white/50 border-white/20'
                }`}>
                    {projectData.timeline?.status && (
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`}`}>
                                {projectData.timeline.status}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Status
                            </div>
                        </div>
                    )}
                    {projectData.timeline?.startDate && (
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`}`}>
                                {projectData.timeline.startDate}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Started
                            </div>
                        </div>
                    )}
                    {projectData.features?.length > 0 && (
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`}`}>
                                {projectData.features.length}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Features
                            </div>
                        </div>
                    )}
                    {projectData.technologies && (
                        <div className="text-center">
                            <div className={`text-2xl font-bold ${theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`}`}>
                                {Object.values(projectData.technologies).flat().length}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Technologies
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
