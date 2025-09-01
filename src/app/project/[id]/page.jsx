'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import Button from '../../../components/ui/Button'
import Dock from '../../../components/layout/dock/Dock'
import Footer from '../../../components/layout/Footer'
import ProjectOverview from '../../../components/project/ProjectOverview'
import ProjectDetails from '../../../components/project/ProjectDetails'
import ProjectFeatures from '../../../components/project/ProjectFeatures'
import ProjectGallery from '../../../components/project/ProjectGallery'
import { PROJECT_NAVIGATION_ITEMS } from '../../../config/navigation'
import { createScrollFunction } from '../../../utils/navigation'

export default function ProjectDetailPage() {
    const { theme, setTheme } = useTheme()
    const params = useParams()
    const [projectData, setProjectData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const scrollToSection = createScrollFunction();

    useEffect(() => {
        const loadProjectData = async () => {
            try {
                const response = await fetch(`/data/project-detail/${params.id}.json`)
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
            {/* Dock Navigation */}
            <Dock 
                theme={theme}
                setTheme={setTheme}
                activeSection={null}
                scrollToSection={scrollToSection}
                navigationItems={PROJECT_NAVIGATION_ITEMS}
            />

            {/* Main Content */}
            <main className="pb-20">
                <ProjectOverview theme={theme} projectData={projectData} />
                <ProjectDetails theme={theme} projectData={projectData} />
                <ProjectFeatures theme={theme} projectData={projectData} />
                <ProjectGallery theme={theme} projectData={projectData} />
            </main>

            {/* Footer */}
            <Footer theme={theme} />
        </div>
    )
}
