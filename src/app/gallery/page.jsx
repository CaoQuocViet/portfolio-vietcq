'use client'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProjectGallery from '../../components/ProjectGallery'

export default function GalleryPage() {
    const { theme } = useTheme()

    return (
        <>
            {/* Navigation Button */}
            <div style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: 1000
            }}>
                <Link 
                    href="/"
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Portfolio</span>
                </Link>
            </div>

            {/* Main Content with tmp.html styling */}
            <div style={{
                margin: 0,
                padding: '20px',
                background: 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}>
                <ProjectGallery />
            </div>
        </>
    )
}
