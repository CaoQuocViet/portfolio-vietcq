'use client'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Gallery from '../../components/Gallery'

export default function GalleryPage() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

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
            <Gallery />
        </div>
    )
}
