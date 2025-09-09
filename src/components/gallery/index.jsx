'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Gallery from '../Gallery'
import ProjectCards from './ProjectCards'
import { useGallery } from '../../hooks/useGallery'

export default function GalleryPageClient() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    
    // Fetch all gallery items to extract unique projects
    const { images: galleryItems, loading } = useGallery(null)
    
    // Extract unique projects for cards
    const uniqueProjects = galleryItems ? 
        [...new Set(galleryItems.map(item => item.project))].map(projectName => {
            return {
                name: projectName,
                count: galleryItems.filter(item => item.project === projectName).length
            }
        }) : []

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="min-h-screen bg-gray-950" />
    }

    return (
        <div 
            className="min-h-screen"
            style={{
                margin: 0,
                background: theme === 'dark' 
                    ? 'linear-gradient(135deg, #1f2937, #374151, #4b5563)' 
                    : 'linear-gradient(135deg, #0026bd, #b9a700, #460096)',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
        >
            {/* Project Cards - 32px from top of screen */}
            {!loading && (
                <div style={{
                    position: 'fixed',
                    top: '36px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 5,
                    width: '100%'
                }}>
                    <ProjectCards projects={uniqueProjects} />
                </div>
            )}
            
            {/* Gallery Component - unchanged layout */}
            <Gallery />
        </div>
    )
}
