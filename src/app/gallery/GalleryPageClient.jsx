'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Gallery from '../../components/gallery/Gallery'
import Dock from '../../components/layout/dock/Dock'
import { GALLERY_NAVIGATION_ITEMS } from '../../config/navigation'
import { createScrollFunction } from '../../utils/navigation'

export default function GalleryPageClient({ projects }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const scrollToSection = createScrollFunction();

    if (!mounted) return null

    return (
        <>
            {/* Dock Navigation - chỉ logo + home + theme */}
            <Dock 
                theme={theme}
                setTheme={setTheme}
                activeSection={null} // Không track active section
                scrollToSection={scrollToSection}
                navigationItems={GALLERY_NAVIGATION_ITEMS}
            />

            {/* Main Content */}
            <div id="gallery" style={{
                margin: 0,
                padding: '20px',
                background: 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}>
                <Gallery projects={projects} />
            </div>
        </>
    )
}
