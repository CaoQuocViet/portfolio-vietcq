'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import Button from '../ui/Button'
import Dock from '../dock/Dock'
import Footer from '../layout/Footer'
import ProjectOverview from './ProjectOverview'
import ProjectDetails from './ProjectDetails'
import ProjectFeatures from './ProjectFeatures'
import ProjectGallery from './ProjectGallery'
import { LoadingSpinner } from "../ui/loading";
import { useLanguage } from "../../contexts/LanguageContext";
import { PROJECT_NAVIGATION_ITEMS } from '../../config/navigation'
import { createScrollFunction } from '../../utils/navigation'

const ProjectPage = () => {
    const params = useParams()
    const { theme, setTheme } = useTheme()
    const { language } = useLanguage()
    const [activeSection, setActiveSection] = useState("project-overview")
    const [mounted, setMounted] = useState(false)
    const [projectData, setProjectData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        setMounted(true)
    }, [])

    const scrollToSection = createScrollFunction();

    useEffect(() => {
        const loadProjectData = async () => {
            try {
                const response = await fetch(`/data/project-detail/${language}/${params.id}.json`)
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
            setLoading(true)
            loadProjectData()
        }
    }, [params.id, language])

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (error || !projectData) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
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
        <div className="min-h-screen bg-white dark:bg-gray-950">
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
                <ProjectOverview theme={theme} projectData={projectData} projectId={params.id} />
                <ProjectDetails theme={theme} projectData={projectData} />
                <ProjectFeatures theme={theme} projectData={projectData} />
                <ProjectGallery theme={theme} projectData={projectData} />
            </main>

            {/* Footer */}
            <Footer theme={theme} />
        </div>
    )
}

export default ProjectPage
