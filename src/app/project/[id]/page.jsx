'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import Gallery from '../../../components/Gallery'
import Button from '../../../components/ui/Button'
import Dock from '../../../components/layout/dock/Dock'
import Footer from '../../../components/layout/Footer'
import { PROJECT_NAVIGATION_ITEMS } from '../../../config/navigation'
import { createScrollFunction } from '../../../utils/navigation'
import { generateProjectsData } from '../../../utils/projectImageGenerator'
import { Github, ExternalLink } from 'lucide-react'

export default function ProjectDetailPage() {
    const { theme, setTheme } = useTheme()
    const params = useParams()
    const [projectData, setProjectData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [mounted, setMounted] = useState(false)

    // Get project images for gallery (client-side compatible)
    const projects = generateProjectsData()

    useEffect(() => {
        setMounted(true)
    }, [])

    const scrollToSection = createScrollFunction();

    useEffect(() => {
        const loadProjectData = async () => {
            try {
                const response = await fetch(`/data/projects/${params.id}.json`)
                if (!response.ok) throw new Error('Project not found')
                
                const data = await response.json()
                setProjectData(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            loadProjectData()
        }
    }, [params.id])

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        )
    }

    if (loading) {
        return (
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'} flex items-center justify-center`}>
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                    theme === 'dark' ? 'border-cyan-400' : 'border-blue-600'
                }`} />
            </div>
        )
    }

    if (error || !projectData) {
        return (
            <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'} flex items-center justify-center`}>
                <div className="text-center">
                    <h1 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Project Not Found
                    </h1>
                    <Button 
                        href="/gallery"
                        variant="primary"
                        size="md"
                    >
                        Back to Gallery
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            {/* Dock Navigation - chỉ logo + home + gallery + theme */}
            <Dock 
                theme={theme}
                setTheme={setTheme}
                activeSection={null} // Không track active section
                scrollToSection={scrollToSection}
                navigationItems={PROJECT_NAVIGATION_ITEMS}
            />

            {/* Main Content */}
            <main className="pb-20">{/* Add bottom padding for dock */}
                {/* Hero Section */}
                <section id="overview" className={`py-24 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900' : 'bg-white'}`}>
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

                {/* Project Details */}
                <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
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

                {/* Features & Achievements */}
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

                {/* Project Gallery */}
                <section id="gallery" className={`py-20 ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                    <Gallery projects={projects} projectFilter={projectData.id} showDock={false} />
                </section>
            </main>

            {/* Footer */}
            <Footer theme={theme} />
        </div>
    )
}
