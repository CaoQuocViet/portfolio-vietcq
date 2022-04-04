'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { ArrowLeft, Home, Github, ExternalLink } from 'lucide-react'
import ProjectGallery from '../../../components/ProjectGallery'

export default function ProjectDetailPage() {
    const { theme } = useTheme()
    const params = useParams()
    const [projectData, setProjectData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
                    <Link 
                        href="/gallery"
                        className={`text-blue-600 hover:underline`}
                    >
                        Back to Gallery
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            {/* Navigation Bar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                theme === 'dark' 
                    ? 'bg-gray-950/80 backdrop-blur-md border-gray-800/50' 
                    : 'bg-white/80 backdrop-blur-md border-gray-200/50'
            } border-b`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Back to Gallery */}
                        <Link 
                            href="/gallery"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                theme === 'dark' 
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Gallery</span>
                        </Link>

                        {/* Project Name */}
                        <h1 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {projectData.name}
                        </h1>

                        {/* Home Icon */}
                        <Link 
                            href="/"
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                theme === 'dark' 
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            <Home className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-16">
                {/* Hero Section */}
                <section className={`py-24 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900' : `bg-gradient-to-br from-gray-50 via-${projectData.color.primary}-50 to-gray-100`}`}>
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
                                <Link 
                                    href={projectData.demo}
                                    target="_blank"
                                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                                        theme === 'dark'
                                            ? `bg-gradient-to-r from-${projectData.color.primary}-500 to-blue-600 text-white hover:from-${projectData.color.primary}-400 hover:to-blue-500 shadow-lg shadow-${projectData.color.primary}-500/25`
                                            : `bg-gradient-to-r from-blue-500 to-${projectData.color.primary}-600 text-white hover:from-blue-400 hover:to-${projectData.color.primary}-500 shadow-lg shadow-blue-500/25`
                                    }`}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Live Demo
                                </Link>
                                <Link 
                                    href={projectData.github}
                                    target="_blank"
                                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 border ${
                                        theme === 'dark'
                                            ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                    }`}
                                >
                                    <Github className="w-5 h-5" />
                                    View Source
                                </Link>
                            </div>
                        </div>

                        {/* Project Stats */}
                        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto p-8 rounded-2xl backdrop-blur-lg border ${
                            theme === 'dark' 
                                ? 'bg-white/5 border-white/10' 
                                : 'bg-white/50 border-white/20'
                        }`}>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`}`}>
                                    {projectData.status}
                                </div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Status
                                </div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`}`}>
                                    {projectData.started}
                                </div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Started
                                </div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`}`}>
                                    {projectData.features.length}
                                </div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Features
                                </div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${theme === 'dark' ? `text-${projectData.color.primary}-400` : `text-${projectData.color.primary}-600`}`}>
                                    {projectData.technologies.length}
                                </div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Technologies
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features & Technologies */}
                <section className={`py-24 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Features */}
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
                                                    : 'bg-white hover:bg-gray-50 border border-gray-200'
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

                            {/* Technologies */}
                            <div>
                                <h2 className={`text-3xl font-bold mb-8 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Technologies Used
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {projectData.technologies.map((tech, index) => (
                                        <span 
                                            key={index}
                                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
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
                        </div>
                    </div>
                </section>

                {/* Project Gallery - Filtered for this project with tmp.html styling */}
                <section style={{
                    margin: 0,
                    padding: '40px 20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}>
                    <ProjectGallery projectFilter={projectData.id} />
                </section>
            </main>
        </div>
    )
}
