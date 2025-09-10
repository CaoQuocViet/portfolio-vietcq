'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FaLightbulb, FaRocket, FaClock, FaCode, FaBrain, FaHome, FaEye } from 'react-icons/fa'
import Dock from '../dock/Dock'
import Footer from '../layout/Footer'
import { IDEAS_NAVIGATION_ITEMS } from '../../config/navigation'

export default function IdeasPageClient() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const ideas = [
        {
            id: 'ai-code-assistant',
            icon: FaBrain,
            title: 'AI-Powered Code Review Assistant',
            description: 'A tool that automatically reviews code and suggests improvements using advanced AI models',
            status: 'planning',
            priority: 'high',
            technologies: ['TypeScript', 'OpenAI API', 'VS Code Extension'],
            estimatedTime: '3 months',
            category: 'Development Tools'
        },
        {
            id: 'collaborative-whiteboard',
            icon: FaRocket,
            title: 'Real-time Collaborative Whiteboard',
            description: 'Interactive whiteboard with real-time collaboration, perfect for remote teams',
            status: 'researching',
            priority: 'medium',
            technologies: ['React', 'Socket.io', 'Canvas API', 'Node.js'],
            estimatedTime: '2 months',
            category: 'Collaboration'
        },
        {
            id: 'smart-dashboard',
            icon: FaCode,
            title: 'Smart Home Dashboard',
            description: 'Central dashboard to control and monitor all smart home devices',
            status: 'idea',
            priority: 'low',
            technologies: ['Next.js', 'IoT', 'MQTT', 'Raspberry Pi'],
            estimatedTime: '4 months',
            category: 'IoT & Hardware'
        },
        {
            id: 'expense-tracker',
            icon: FaClock,
            title: 'Expense Tracker with AI Insights',
            description: 'Track expenses and get AI-powered insights on spending patterns',
            status: 'planning',
            priority: 'high',
            technologies: ['React Native', 'Machine Learning', 'Python'],
            estimatedTime: '2.5 months',
            category: 'FinTech'
        }
    ]

    const getStatusColor = (status) => {
        switch(status) {
            case 'idea': return theme === 'dark' ? 'text-yellow-400 bg-yellow-400/20' : 'text-yellow-600 bg-yellow-100'
            case 'planning': return theme === 'dark' ? 'text-blue-400 bg-blue-400/20' : 'text-blue-600 bg-blue-100'
            case 'researching': return theme === 'dark' ? 'text-purple-400 bg-purple-400/20' : 'text-purple-600 bg-purple-100'
            default: return theme === 'dark' ? 'text-gray-400 bg-gray-400/20' : 'text-gray-600 bg-gray-100'
        }
    }

    const getPriorityIcon = (priority) => {
        switch(priority) {
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
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
            {/* Dock Navigation */}
            <Dock 
                theme={theme}
                setTheme={setTheme}
                activeSection={null}
                scrollToSection={() => {}}
                navigationItems={IDEAS_NAVIGATION_ITEMS}
            />

            {/* Main Content */}
            <main className="container mx-auto px-6 pt-32 pb-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <FaLightbulb className={`text-4xl ${
                            theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
                        }`} />
                        <h1 className={`text-4xl md:text-6xl font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                            Future Ideas
                        </h1>
                    </div>
                    <p className={`text-xl max-w-3xl mx-auto ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Exploring innovative concepts and upcoming project possibilities for the future
                    </p>
                </div>

                {/* Ideas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {ideas.map((idea) => {
                        const Icon = idea.icon
                        return (
                            <div
                                key={idea.id}
                                className={`
                                    p-8 rounded-2xl border-2 transition-all duration-300
                                    hover:scale-[1.02] hover:shadow-xl cursor-pointer
                                    ${theme === 'dark' 
                                        ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' 
                                        : 'bg-white border-gray-200 hover:border-gray-300'
                                    }
                                `}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {getPriorityIcon(idea.priority)}
                                        <div>
                                            <h3 className={`text-xl font-bold ${
                                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {idea.title}
                                            </h3>
                                            <p className={`text-sm ${
                                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                {idea.category}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`
                                        px-3 py-1 rounded-full text-xs font-medium capitalize
                                        ${getStatusColor(idea.status)}
                                    `}>
                                        {idea.status}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className={`mb-6 leading-relaxed ${
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    {idea.description}
                                </p>

                                {/* Technologies */}
                                <div className="mb-4">
                                    <p className={`text-sm font-medium mb-2 ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                        Technologies:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {idea.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className={`
                                                    px-3 py-1 rounded-lg text-sm font-medium
                                                    ${theme === 'dark' 
                                                        ? 'bg-blue-500/20 text-blue-400' 
                                                        : 'bg-blue-100 text-blue-600'
                                                    }
                                                `}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div className="flex items-center gap-2">
                                        <FaClock className={`text-sm ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }`} />
                                        <span className={`text-sm ${
                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }`}>
                                            {idea.estimatedTime}
                                        </span>
                                    </div>
                                    <div className={`
                                        px-3 py-1 rounded-lg text-xs font-medium
                                        ${idea.priority === 'high' 
                                            ? 'bg-red-500/20 text-red-400'
                                            : idea.priority === 'medium'
                                            ? 'bg-yellow-500/20 text-yellow-400'
                                            : 'bg-green-500/20 text-green-400'
                                        }
                                    `}>
                                        {idea.priority} priority
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Call to Action */}
                <div className={`
                    text-center mt-16 p-8 rounded-2xl
                    ${theme === 'dark' 
                        ? 'bg-gray-900/30 border border-gray-800' 
                        : 'bg-gray-50 border border-gray-200'
                    }
                `}>
                    <h3 className={`text-2xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                        Have an idea for collaboration?
                    </h3>
                    <p className={`text-lg mb-6 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Let's discuss your project concepts and bring innovative solutions to life
                    </p>
                    <button 
                        onClick={() => window.location.href = '/#contact'}
                        className={`
                            px-8 py-3 rounded-lg font-medium transition-all duration-300
                            ${theme === 'dark' 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }
                            hover:scale-105 hover:shadow-lg
                        `}
                    >
                        Get In Touch
                    </button>
                </div>
            </main>

            {/* Footer */}
            <Footer theme={theme} />
        </div>
    )
}
