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
import { useTranslation } from '../../hooks/useTranslation';
import { useProject } from '../../hooks/use-projects';
import { PROJECT_NAVIGATION_ITEMS } from '../../config/navigation'
import { createScrollFunction } from '../../utils/navigation'

const ProjectPage = () => {
    const params = useParams()
    const { theme, setTheme } = useTheme()
    const { language } = useLanguage()
    const { t } = useTranslation()
    const [activeSection, setActiveSection] = useState("project-overview")
    const [mounted, setMounted] = useState(false)

    const { project: projectData, isLoading: loading, error } = useProject(params.id, language)

    useEffect(() => {
        setMounted(true)
    }, [])

    const scrollToSection = createScrollFunction();

    if (!mounted || loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (error || !projectData) {
        return (
            <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4 text-[var(--text-heading)]">
                        {t('common.projectNotFound')}
                    </h1>
                    <Button
                        href="/gallery"
                        variant="primary"
                        size="md"
                    >
                        {t('common.backToGallery')}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--bg-page)]">
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
