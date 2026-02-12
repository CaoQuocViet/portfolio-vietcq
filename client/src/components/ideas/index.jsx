'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaLightbulb } from 'react-icons/fa'
import GridBackground from '../ui/GridBackground'
import Dock from '../dock/Dock'
import Footer from '../layout/Footer'
import WaveBackground from '../ui/WaveBackground'
import { IDEAS_NAVIGATION_ITEMS } from '../../config/navigation'
import { LoadingSpinner } from "../ui/loading"
import { useTranslation } from '../../hooks/useTranslation'

export default function IdeasPageClient() {
    const { theme, setTheme } = useTheme()
    const { t } = useTranslation()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <>
            {/* Ideas Page Section */}
            <div className="relative min-h-screen bg-[var(--bg-section-alt)]">
                {/* Grid Background Component */}
                <GridBackground theme={theme} colorScheme="pink" />

                {/* Dock Navigation */}
                <Dock
                    theme={theme}
                    setTheme={setTheme}
                    activeSection={null}
                    scrollToSection={() => { }}
                    navigationItems={IDEAS_NAVIGATION_ITEMS}
                />

                {/* Main Content */}
                <div className="relative z-20 flex flex-col justify-center px-6 py-8" style={{ minHeight: 'calc(100vh - 120px)' }}>
                    <div className="container max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <FaLightbulb className="text-4xl text-[var(--color-warning)]" />
                                <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-heading)]">
                                    {t('ideas.title')}
                                </h1>
                            </div>
                            <p className="text-xl max-w-3xl mx-auto text-[var(--text-secondary)]">
                                {t('ideas.subtitle')}
                            </p>
                        </div>

                        {/* Ideas Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Digital Art Store */}
                            <div className="group rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl bg-[var(--bg-card)] shadow-md flex flex-col min-h-[500px]">
                                <div className="flex items-start justify-between mb-4 md:mb-6 min-h-[80px]">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-500)]/15 transition-all duration-300 group-hover:scale-110">
                                                🎨
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[var(--text-heading)]">
                                                {t('ideas.artemisTitle')}
                                            </h3>
                                            <p className="text-sm text-[var(--text-link)]">
                                                {t('ideas.artemisSubtitle')}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-500)]/15 text-[var(--color-500)]">
                                        {t('ideas.concept')}
                                    </span>
                                </div>

                                <div className="flex-1 mb-4 md:mb-6">
                                    <p className="text-[var(--text-body)] leading-relaxed mb-4">
                                        {t('ideas.artemisDescription')}
                                    </p>

                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="p-3 rounded-lg bg-[var(--bg-section-alt)]">
                                            <h4 className="font-semibold text-[var(--text-body)] mb-1">{t('ideas.coreFeatures')}</h4>
                                            <p className="text-sm text-[var(--text-secondary)]">{t('ideas.artemisCoreFeatures')}</p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-[var(--bg-section-alt)]">
                                            <h4 className="font-semibold text-[var(--text-body)] mb-1">{t('ideas.printServices')}</h4>
                                            <p className="text-sm text-[var(--text-secondary)]">{t('ideas.artemisPrintServices')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-500 text-white font-semibold">Python FastAPI</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-black text-white">Next.js</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-[var(--color-500)]/15 text-[var(--color-500)]">Stripe API</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-orange-500 text-white">AWS S3</span>
                                </div>
                            </div>

                            {/* Language Testing Hub */}
                            <div className="group rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl bg-[var(--bg-card)] shadow-md flex flex-col min-h-[500px]">
                                <div className="flex items-start justify-between mb-4 md:mb-6 min-h-[80px]">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-500)]/15 transition-all duration-300 group-hover:scale-110">
                                                🌐
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[var(--text-heading)]">
                                                {t('ideas.thithoTitle')}
                                            </h3>
                                            <p className="text-sm text-[var(--text-link)]">
                                                {t('ideas.thithoSubtitle')}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-500)]/15 text-[var(--color-500)]">
                                        {t('ideas.enterprise')}
                                    </span>
                                </div>

                                <div className="flex-1 mb-4 md:mb-6">
                                    <p className="text-[var(--text-body)] leading-relaxed mb-4">
                                        {t('ideas.thithoDescription')}
                                    </p>

                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="p-3 rounded-lg bg-[var(--bg-section-alt)]">
                                            <h4 className="font-semibold text-[var(--text-body)] mb-1">{t('ideas.testingEngine')}</h4>
                                            <p className="text-sm text-[var(--text-secondary)]">{t('ideas.thithoTestingEngine')}</p>
                                        </div>

                                        <div className="p-3 rounded-lg bg-[var(--bg-section-alt)]">
                                            <h4 className="font-semibold text-[var(--text-body)] mb-1">{t('ideas.architecture')}</h4>
                                            <p className="text-sm text-[var(--text-secondary)]">{t('ideas.thithoArchitecture')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-500 text-white font-semibold">Python</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-red-600 text-white">NestJS</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-black text-white">Next.js</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-600 text-white">PHP</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-500 text-white">Docker</span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white">Kubernetes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Wave Background at bottom - Hidden on mobile, visible on tablet+ */}
                <div className="hidden md:block absolute bottom-0 left-0 w-full">
                    {/* Bottom Wave - Sóng lồi lên */}
                    <div className="relative">
                        <WaveBackground />
                    </div>
                    {/* Top Wave - Sóng lồi xuống */}
                    <div className="relative -mt-10">
                        <WaveBackground reversed />
                    </div>
                </div>
            </div>

            {/* Footer Section - Completely separate */}
            <Footer theme={theme} />
        </>
    )
}