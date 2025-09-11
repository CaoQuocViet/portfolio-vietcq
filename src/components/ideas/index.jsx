'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaLightbulb, FaRocket, FaClock, FaCode, FaBrain, FaHome, FaEye } from 'react-icons/fa'
import GridBackground from '../ui/GridBackground'
import Dock from '../dock/Dock'
import Footer from '../layout/Footer'
import WaveBackground from '../ui/WaveBackground'
import { IDEAS_NAVIGATION_ITEMS } from '../../config/navigation'

export default function IdeasPageClient() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'idea': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-400/20'
            case 'planning': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-400/20'
            case 'researching': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-400/20'
            default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-400/20'
        }
    }

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return <FaRocket className="text-red-500" />
            case 'medium': return <FaClock className="text-yellow-500" />
            case 'low': return <FaCode className="text-green-500" />
            default: return <FaLightbulb className="text-gray-500" />
        }
    }

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        )
    }

    return (
        <>
            {/* Ideas Page Section */}
            <div className="relative min-h-screen bg-gray-100 dark:bg-gray-950 overflow-x-hidden">
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
                            <FaLightbulb className="text-4xl text-amber-500 dark:text-amber-400" />
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                                Future Ideas
                            </h1>
                        </div>
                        <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
                            ✨ Exploring innovative concepts and upcoming project possibilities
                        </p>
                    </div>

                    {/* Ideas Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Digital Art Store */}
                        <div className="group rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl bg-white shadow-md dark:bg-gray-900 dark:shadow-2xl flex flex-col min-h-[500px]">
                            <div className="flex items-start justify-between mb-4 md:mb-6 min-h-[80px]">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 dark:bg-purple-900/50 transition-all duration-300 group-hover:scale-110">
                                            🎨
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            ArtVault Digital Store
                                        </h3>
                                        <p className="text-sm text-purple-600 dark:text-purple-400">
                                            Print on Demand • Digital Downloads • E-commerce
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                                    Concept
                                </span>
                            </div>

                            <div className="flex-1 mb-4 md:mb-6">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                    <strong>Digital art marketplace platform</strong> with integrated print-on-demand and instant digital downloads. Optimized SEO system, modern UI/UX design.
                                </p>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Core Features</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Artist portfolio management, watermark protection, payment integration, automated delivery</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Print Services</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Canvas, poster, sticker printing, size customization, shipping integration</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-yellow-500 text-white font-semibold">Python FastAPI</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-black text-white">Next.js</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">Stripe API</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-orange-500 text-white">AWS S3</span>
                            </div>
                        </div>

                        {/* Language Testing Hub */}
                        <div className="group rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl bg-white shadow-md dark:bg-gray-900 dark:shadow-2xl flex flex-col min-h-[500px]">
                            <div className="flex items-start justify-between mb-4 md:mb-6 min-h-[80px]">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 transition-all duration-300 group-hover:scale-110">
                                            🌐
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            LinguaCert Testing Hub
                                        </h3>
                                        <p className="text-sm text-blue-600 dark:text-blue-400">
                                            Multi-Language Certification • Enterprise Scale • Global Standards
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                                    Enterprise
                                </span>
                            </div>

                            <div className="flex-1 mb-4 md:mb-6">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                    <strong>Testing hub system</strong> for 50+ international language certifications. Complex microservices architecture, high performance, scalable infrastructure.
                                </p>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Testing Engine</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered question generation, adaptive testing, real-time scoring, proctoring system</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Architecture</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Microservices, micro frontends, event-driven design, CQRS pattern, containerized deployment</p>
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