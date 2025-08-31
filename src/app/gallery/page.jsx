'use client'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProjectGallery from '../../components/grallery/Gallery'
import Button from '../../components/ui/Button'

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
                <Button
                    href="/"
                    variant="secondary"
                    size="md"
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Portfolio</span>
                </Button>
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
